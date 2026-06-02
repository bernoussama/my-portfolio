import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const layoutUrl = new URL('../src/layouts/Layout.astro', import.meta.url);
const distIndexUrl = new URL('../dist/index.html', import.meta.url);

test('Layout.astro runs theme script before critical CSS', async () => {
	const source = await readFile(layoutUrl, 'utf8');

	const scriptIdx = source.indexOf('data-cfasync="false"');
	const inlineStyleIdx = source.indexOf('<style is:inline>');

	assert.ok(scriptIdx > 0, 'expected data-cfasync="false" on theme script');
	assert.ok(inlineStyleIdx > 0, 'expected inline critical CSS block');
	assert.ok(
		scriptIdx < inlineStyleIdx,
		'theme script must appear before inline critical CSS so data-theme exists before backgrounds apply',
	);
	assert.match(source, /localStorage\.getItem\('theme'\)/);
	assert.match(source, /document\.documentElement\.dataset\.theme/);
});

test('built index.html keeps theme script before stylesheet', async () => {
	const html = await readFile(distIndexUrl, 'utf8');

	const cfasyncIdx = html.indexOf('data-cfasync="false"');
	const themeScriptIdx = html.indexOf("dataset.theme");
	const stylesheetIdx = html.indexOf('rel="stylesheet"');

	assert.ok(cfasyncIdx > 0, 'built HTML must opt out of Cloudflare Rocket Loader');
	assert.ok(themeScriptIdx > 0, 'built HTML must include theme bootstrap script');
	assert.ok(stylesheetIdx > 0, 'built HTML must link the main stylesheet');
	assert.ok(
		cfasyncIdx < stylesheetIdx && themeScriptIdx < stylesheetIdx,
		'theme script must load before the main stylesheet',
	);
});