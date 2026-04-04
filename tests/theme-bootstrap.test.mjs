import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('layout bootstraps dark mode before blocking assets', async () => {
  const source = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

	const themeBootstrapIndex = source.indexOf("const storedTheme = localStorage.getItem('theme')");
	const fontPreloadIndex = source.indexOf('<link rel="preload" href="/fonts/inter/inter-latin-400.woff2"');

  assert.notEqual(themeBootstrapIndex, -1, 'expected an inline theme bootstrap script');
  assert.notEqual(fontPreloadIndex, -1, 'expected the font preload link to exist');
  assert.ok(
    themeBootstrapIndex < fontPreloadIndex,
    'expected the theme bootstrap to run before external font assets can delay first paint',
  );
  assert.match(
    source,
	  /document\.documentElement\.dataset\.theme = storedTheme === 'light' \|\| storedTheme === 'dark'/,
	  'expected the theme bootstrap to resolve the persisted theme before styles load',
  );
  assert.match(
    source,
	  /window\.matchMedia\('\(prefers-color-scheme: dark\)'\)\.matches/,
	  'expected the theme bootstrap to respect the system color-scheme when no preference is stored',
  );
});
