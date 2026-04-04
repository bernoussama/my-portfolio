import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage hero heading scales down on small screens to avoid clipping', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.match(
    source,
    /<h1 class="[^"]*text-4xl[^"]*sm:text-6xl[^"]*md:text-8xl[^"]*lg:text-9xl[^"]*">/,
    'expected the hero heading to use a smaller base font size before scaling up at larger breakpoints',
  );
});
