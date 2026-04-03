import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

test('layout initializes the document theme before the app renders', () => {
	const source = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

	assert.match(source, /document\.documentElement\.dataset\.theme/);
	assert.match(source, /localStorage\.getItem\('theme'\)/);
	assert.match(source, /matchMedia\('\(prefers-color-scheme: dark\)'\)/);
});

test('navbar exposes theme toggles and updates the theme state', () => {
	const source = readFileSync(new URL('../src/components/NavBar.astro', import.meta.url), 'utf8');

	assert.match(source, /data-theme-toggle/);
	assert.match(source, /aria-label="Activate light theme"/);
	assert.match(source, /localStorage\.setItem\('theme', nextTheme\)/);
	assert.match(source, /document\.documentElement\.dataset\.theme = nextTheme/);
});

test('design tokens support both dark and light themes', () => {
	const styles = readFileSync(new URL('../style.css', import.meta.url), 'utf8');
	const tailwindConfig = readFileSync(new URL('../tailwind.config.js', import.meta.url), 'utf8');

	assert.match(styles, /:root\s*\{/);
	assert.match(styles, /\[data-theme='light'\]\s*\{/);
	assert.match(styles, /--color-surface:\s*255 255 255/);
	assert.match(styles, /--color-surface:\s*0 0 0/);
	assert.match(tailwindConfig, /surface: 'rgb\(var\(--color-surface\) \/ <alpha-value>\)'/);
	assert.match(tailwindConfig, /'on-surface': 'rgb\(var\(--color-fg\) \/ <alpha-value>\)'/);
});

test('astro pages import the shared stylesheet instead of linking to a missing public asset', () => {
	const layoutSource = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
	const notFoundSource = readFileSync(new URL('../src/pages/404.astro', import.meta.url), 'utf8');

	assert.match(layoutSource, /import '\.\.\/\.\.\/style\.css';/);
	assert.match(notFoundSource, /import '\.\.\/\.\.\/style\.css';/);
	assert.doesNotMatch(layoutSource, /href="\/style\.css"/);
	assert.doesNotMatch(notFoundSource, /href="\/style\.css"/);
});

test('terminal block uses the lowest surface token for its background', () => {
	const styles = readFileSync(new URL('../style.css', import.meta.url), 'utf8');

	assert.match(styles, /\.terminal-block \{[\s\S]*background-color: rgb\(var\(--color-surface-lowest\)\);/);
});

test('desktop header layout switches at the large breakpoint to match split page sections', () => {
	const source = readFileSync(new URL('../src/components/NavBar.astro', import.meta.url), 'utf8');

	assert.match(source, /desktopNavLinkClass = 'hidden lg:flex lg:col-span-2/);
	assert.match(source, /{navLinks\.map\(\(link\) => \([\s\S]*class=\{`\$\{desktopNavLinkClass\}/);
	assert.match(source, /class="col-span-4 lg:col-span-2 flex items-stretch justify-end lg:justify-stretch/);
	assert.match(source, /hidden lg:flex min-h-16/);
	assert.match(source, /data-theme-toggle[\s\S]*class={`\$\{themeToggleClass\} lg:hidden px-4 grid-border-l`}/);
	assert.match(source, /id="mobile-menu-toggle" type="button" class="lg:hidden p-4/);
});
