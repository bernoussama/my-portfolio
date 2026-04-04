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

	test('blog article keeps the darker reading surface only in dark mode', () => {
	const source = readFileSync(new URL('../src/layouts/PostLayout.astro', import.meta.url), 'utf8');
	const styles = readFileSync(new URL('../style.css', import.meta.url), 'utf8');

	assert.match(source, /<article class="[^"]*post-article-surface[^"]*"/);
	assert.match(styles, /\.post-article-surface\s*\{[\s\S]*background-color:\s*rgb\(var\(--color-surface-highest\)\);/);
	assert.match(styles, /\[data-theme='light'\]\s+\.post-article-surface\s*\{[\s\S]*background-color:\s*rgb\(var\(--color-surface\)\);/);
});
