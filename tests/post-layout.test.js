import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

test('blog post links use the design system link treatment', () => {
	const source = readFileSync(new URL('../src/layouts/PostLayout.astro', import.meta.url), 'utf8');
	assert.match(source, /class="post-content prose/);
	assert.match(source, /\.post-content :where\(a\):not\(:where\(\[class~='not-prose'\], \[class~='not-prose'\] \*\)\)/);
	assert.match(source, /\.post-content :where\(a:hover\):not\(:where\(\[class~='not-prose'\], \[class~='not-prose'\] \*\)\)/);
	assert.doesNotMatch(source, /prose-a:hover:/);
});
