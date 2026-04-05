import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

test('homepage hero preserves room for the main heading at the lg breakpoint', () => {
	const source = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

	assert.match(source, /<section class="col-span-12 lg:col-span-9 xl:col-span-8 px-8 py-10 md:px-16 md:py-12 lg:px-16 xl:px-24 lg:py-14 flex flex-col justify-center grid-border-r">/);
	assert.match(source, /<h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-\[0\.9\] tracking-tight-display uppercase max-w-4xl">/);
	assert.match(source, /<aside class="col-span-12 lg:col-span-3 xl:col-span-4 flex flex-col">/);
});
