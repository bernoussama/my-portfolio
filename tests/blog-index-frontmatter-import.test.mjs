import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('blog index reads only markdown frontmatter metadata', async () => {
  const source = await readFile(new URL('../src/pages/blog/index.astro', import.meta.url), 'utf8');

  assert.match(
    source,
    /import\.meta\.glob<[^>]+>\('\.\/\*\.md', \{\s*eager: true,\s*import: 'frontmatter'\s*\}\)/,
    'expected the blog index to load only frontmatter from markdown files',
  );

  assert.match(
    source,
    /replace\('\.\/', '\/blog\/'\)\.replace\(/,
    'expected the blog index to derive post URLs from markdown filenames',
  );
});
