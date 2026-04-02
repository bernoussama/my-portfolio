import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage hero CTA stacks full-width buttons on mobile', async () => {
  const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

  assert.match(source, /<div class="[^"]*flex-col[^"]*items-stretch[^"]*sm:flex-row[^"]*"/);

  assert.match(source, /<a class="[^"]*uk-button-primary[^"]*w-full[^"]*sm:w-auto[^"]*" href="\/projects">/);
  assert.match(source, /<a class="[^"]*uk-button-default[^"]*w-full[^"]*sm:w-auto[^"]*" href="\/resume">/);
  assert.match(source, /<a class="[^"]*uk-button-default[^"]*w-full[^"]*sm:w-auto[^"]*" href="mailto:contact@bernoussama\.com">/);
});
