import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('blog post prose uses the site foreground color in light mode', async () => {
  const source = await readFile(new URL('../src/layouts/PostLayout.astro', import.meta.url), 'utf8');

  assert.match(source, /\[data-theme='light'\]\s+\.post-content/);
  assert.match(
    source,
    /\.post-content\s*\{[\s\S]*--tw-prose-body:\s*rgb\(var\(--color-fg\)\);[\s\S]*color:\s*rgb\(var\(--color-fg\)\);/,
    'expected light-mode blog prose text to use the same black foreground token as normal site text',
  );
  assert.doesNotMatch(source, /dark:prose-invert/);
});
