import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage project band uses a heading instead of the Simplinvo image', async () => {
	const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

	assert.match(
		source,
		/<section class="grid grid-cols-12 grid-border-t grid-border-b">[\s\S]*Featured<br \/>Projects[\s\S]*build product --stack react,node,go,rust --mode direct[\s\S]*<\/section>/,
		'expected the landing project band to introduce the featured projects section with a heading',
	);

	assert.doesNotMatch(
		source,
		/src="\/images\/simplinvo-landing\.webp"|alt="Simplinvo interface"/,
		'expected the old Simplinvo image block to be removed from the landing project band',
	);
});
