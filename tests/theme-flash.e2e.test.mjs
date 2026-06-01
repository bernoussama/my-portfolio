import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { chromium } from 'playwright';
import { startStaticServer } from './helpers/static-server.mjs';

const DARK_BG = 'rgb(14, 14, 14)';

/** @type {import('playwright').Browser | undefined} */
let browser;
/** @type {{ baseURL: string; close: () => Promise<void> } | undefined} */
let preview;

test.before(async () => {
	try {
		await access(new URL('../dist/index.html', import.meta.url));
	} catch {
		throw new Error('Run "npm run build" before theme e2e tests (dist/index.html is missing).');
	}

	preview = await startStaticServer();
	browser = await chromium.launch();
});

test.after(async () => {
	await browser?.close().catch(() => {});
	await preview?.close();
});

test('applies data-theme=dark from localStorage before first paint', async () => {
	assert.ok(browser && preview);
	const context = await browser.newContext({ colorScheme: 'light' });

	await context.addInitScript(() => {
		localStorage.setItem('theme', 'dark');
	});

	await context.addInitScript(() => {
		window.__themeSnapshots = [];

		const snap = (label) => {
			const root = document.documentElement;
			window.__themeSnapshots.push({
				label,
				theme: root?.getAttribute('data-theme') ?? null,
				htmlBg: root ? getComputedStyle(root).backgroundColor : null,
				readyState: document.readyState,
			});
		};

		snap('init');

		document.addEventListener(
			'readystatechange',
			() => snap(`readystate:${document.readyState}`),
			{ capture: true },
		);

		requestAnimationFrame(() => snap('first-animation-frame'));
	});

	const page = await context.newPage();
	await page.goto(preview.baseURL, { waitUntil: 'domcontentloaded' });

	const snapshots = await page.evaluate(() => window.__themeSnapshots);
	const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
	const htmlBg = await page.evaluate(() =>
		getComputedStyle(document.documentElement).backgroundColor,
	);
	const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

	assert.equal(theme, 'dark', 'html must use stored dark theme even when OS prefers light');
	assert.equal(htmlBg, DARK_BG, 'html background must be dark on first render');
	assert.equal(bodyBg, DARK_BG, 'body background must be dark on first render');

	const firstFrame = snapshots.find((entry) => entry.label === 'first-animation-frame');
	assert.ok(firstFrame, `missing paint snapshot: ${JSON.stringify(snapshots)}`);
	assert.equal(firstFrame.theme, 'dark', 'data-theme must be dark before first animation frame (pre-paint)');
	assert.equal(firstFrame.htmlBg, DARK_BG, 'html background must stay dark before first paint');

	await context.close();
});

test('system dark preference applies when localStorage is empty', async () => {
	assert.ok(browser && preview);
	const context = await browser.newContext({ colorScheme: 'dark' });

	await context.addInitScript(() => {
		localStorage.removeItem('theme');
	});

	const page = await context.newPage();
	await page.goto(preview.baseURL, { waitUntil: 'domcontentloaded' });

	const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
	const htmlBg = await page.evaluate(() =>
		getComputedStyle(document.documentElement).backgroundColor,
	);

	assert.equal(theme, 'dark');
	assert.equal(htmlBg, DARK_BG);

	await context.close();
});