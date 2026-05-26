import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('DNS Server is included in the homepage featured projects', async () => {
	const source = await readFile(new URL('../src/data/projects.ts', import.meta.url), 'utf8');

	assert.match(
		source,
		/title: 'DNS Server'[\s\S]*featured: true/,
		'expected DNS Server to be marked as featured for the homepage projects grid',
	);
});
