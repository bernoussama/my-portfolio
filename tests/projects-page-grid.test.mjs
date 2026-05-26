import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('projects page grid caps at three columns on large screens', async () => {
	const source = await readFile(new URL('../src/pages/projects.astro', import.meta.url), 'utf8');

	assert.match(
		source,
		/grid-cols-1 md:grid-cols-2 lg:grid-cols-3/,
		'expected the projects grid to use three columns at large breakpoints',
	);
	assert.doesNotMatch(
		source,
		/xl:grid-cols-4/,
		'expected the projects grid not to expand to four columns',
	);
});
