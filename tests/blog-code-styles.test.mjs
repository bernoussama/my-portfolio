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

test('blog code blocks use github light and dark themes through Astro shiki config', async () => {
  const source = await readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8');

  assert.match(source, /markdown:\s*\{/);
  assert.match(source, /shikiConfig:\s*\{/);
  assert.match(source, /experimentalThemes:\s*\{[\s\S]*light:\s*'github-light'/);
  assert.match(source, /experimentalThemes:\s*\{[\s\S]*dark:\s*'github-dark'/);
});

test('blog post layout leaves code block background and border to the syntax theme defaults', async () => {
  const source = await readFile(new URL('../src/layouts/PostLayout.astro', import.meta.url), 'utf8');

  assert.doesNotMatch(
    source,
    /prose-pre:bg-[^\s"]+/,
    'expected post layout to avoid overriding code block backgrounds through prose utilities',
  );
  assert.doesNotMatch(
    source,
    /prose-pre:border(?:-[^\s"]+)?/,
    'expected post layout to avoid overriding code block borders through prose utilities',
  );
});

test('layout only remaps astro code blocks for dark mode so light mode can use github-light defaults', async () => {
  const source = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /\[data-theme='light'\]\s+\.prose pre\.astro-code/);
  assert.match(
    source,
    /\[data-theme='dark'\]\s+\.prose pre\.astro-code,\s*\[data-theme='dark'\]\s+\.prose pre\.astro-code span\s*\{[\s\S]*color:\s*var\(--shiki-dark\)\s*!important;[\s\S]*background-color:\s*var\(--shiki-dark-bg\)\s*!important;/,
    'expected dark mode to apply github-dark shiki variables while light mode uses the emitted github-light defaults',
  );
});
