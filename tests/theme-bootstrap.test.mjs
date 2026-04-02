import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('layout bootstraps dark mode before blocking assets', async () => {
  const source = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

  const themeBootstrapIndex = source.indexOf('const storedTheme = localStorage.getItem("color-theme")');
  const fontPreloadIndex = source.indexOf('<link rel="preload" href="/fonts/geist-font/fonts/GeistVariableVF.woff2"');
  const fontStylesheetIndex = source.indexOf('<link rel="stylesheet" href="/fonts/geist-font/style.css" />');

  assert.notEqual(themeBootstrapIndex, -1, 'expected an inline theme bootstrap script');
  assert.notEqual(fontPreloadIndex, -1, 'expected the font preload link to exist');
  assert.notEqual(fontStylesheetIndex, -1, 'expected the font stylesheet link to exist');
  assert.ok(
    themeBootstrapIndex < fontPreloadIndex,
    'expected the theme bootstrap to run before external font assets can delay first paint',
  );
  assert.ok(
    themeBootstrapIndex < fontStylesheetIndex,
    'expected the theme bootstrap to run before the blocking font stylesheet',
  );
  assert.match(
    source,
    /document\.documentElement\.style\.backgroundColor\s*=\s*isDark\s*\?\s*"hsl\(240 10% 3\.9%\)"\s*:\s*"hsl\(0 0% 100%\)"/,
    'expected the theme bootstrap to set a first-paint-safe background color',
  );
  assert.match(
    source,
    /document\.documentElement\.style\.colorScheme\s*=\s*isDark\s*\?\s*"dark"\s*:\s*"light"/,
    'expected the theme bootstrap to align the browser color-scheme with the chosen theme',
  );
});
