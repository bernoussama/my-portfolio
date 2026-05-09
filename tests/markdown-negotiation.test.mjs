import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('cloudflare pages function negotiates markdown for root requests from agents', async () => {
	const source = await readFile(new URL('../functions/[[path]].js', import.meta.url), 'utf8');

	assert.match(source, /url\.pathname === '\/'/);
	assert.match(source, /request\.method === 'GET' \|\| request\.method === 'HEAD'/);
	assert.match(source, /mediaType === MARKDOWN_MEDIA_TYPE/);
	assert.match(source, /context\.next\('\/index\.md'\)/);
	assert.match(source, /context\.next\(\)/);
});

test('markdown endpoint keeps markdown-specific response headers', async () => {
	const source = await readFile(new URL('../src/pages/index.md.ts', import.meta.url), 'utf8');

	assert.match(source, /'Content-Type': 'text\/markdown; charset=utf-8'/);
	assert.match(source, /'Vary': 'Accept'/);
	assert.match(source, /'x-markdown-tokens': 'available'/);
});
