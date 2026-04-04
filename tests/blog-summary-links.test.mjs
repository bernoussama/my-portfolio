import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('blog summaries use design-system CTA styling', async () => {
  const source = await readFile(new URL('../src/components/BlogPost.astro', import.meta.url), 'utf8');

  assert.match(
    source,
    /Read Article/,
    'expected blog summaries to expose an explicit read-article CTA label',
  );

  assert.match(
    source,
    /border border-primary\/40 px-4 py-2 font-mono text-\[10px\] uppercase tracking-widest text-primary/,
    'expected the summary CTA to use the bordered technical button styling from the design system',
  );

  assert.match(
    source,
    /border border-outline-variant\/30 text-on-surface-variant\/40 group-hover:border-primary\/40 group-hover:text-primary/,
    'expected the summary arrow affordance to use the shared outlined interaction treatment',
  );
});
