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
