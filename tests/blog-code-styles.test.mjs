import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('blog prose code styles avoid leading caret markers', async () => {
  const source = await readFile(new URL('../src/layouts/PostLayout.astro', import.meta.url), 'utf8');

  assert.doesNotMatch(
    source,
    /prose-code:border-l-2/,
    'expected inline code styling to avoid a leading border that renders like a caret',
  );
  assert.match(
    source,
    /prose-code:px-\d/,
    'expected inline code to keep explicit horizontal padding after removing the border marker',
  );
  assert.match(
    source,
    /prose-code:rounded(?:-[^\s"]+)?/,
    'expected inline code to keep a deliberate code-chip shape after removing the border marker',
  );
});

test('blog code blocks use a dedicated darker surface token across themes', async () => {
  const [layoutSource, styles] = await Promise.all([
    readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../style.css', import.meta.url), 'utf8'),
  ]);

  assert.match(
    layoutSource,
    /\.prose pre\.astro-code\s*\{[\s\S]*background-color:\s*rgb\(var\(--color-code-block-surface\)\)\s*!important;/,
    'expected blog code blocks to use a dedicated surface token instead of a generic page surface',
  );
  assert.match(
    styles,
    /:root\s*\{[\s\S]*--color-code-block-surface:\s*18 18 18;/,
    'expected dark mode to keep the existing code block surface depth',
  );
  assert.match(
    styles,
    /\[data-theme='light'\]\s*\{[\s\S]*--color-code-block-surface:\s*36 41 46;/,
    'expected light mode to use a darker code block surface that preserves syntax contrast',
  );
});

test('blog code blocks keep a visible left accent border', async () => {
  const [layoutSource, styles] = await Promise.all([
    readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../style.css', import.meta.url), 'utf8'),
  ]);

  assert.match(
    layoutSource,
    /\.prose pre\.astro-code\s*\{[\s\S]*border-left:\s*2px solid rgb\(var\(--color-code-block-border\)\)\s*!important;/,
    'expected blog code blocks to keep a 2px left accent border so it remains visible on darker backgrounds',
  );
  assert.match(
    styles,
    /\[data-theme='light'\]\s*\{[\s\S]*--color-code-block-border:\s*var\(--color-on-surface-variant\);/,
    'expected light mode to derive the code block border from the article body text token',
  );
});
