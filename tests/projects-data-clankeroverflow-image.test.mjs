import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

test('ClankerOverflow project uses the converted webp image', async () => {
	const source = await readFile(new URL('../src/data/projects.ts', import.meta.url), 'utf8');

	assert.match(
		source,
		/title: 'ClankerOverflow'[\s\S]*src: '\/images\/clankeroverflow-landing\.webp'/,
		'expected ClankerOverflow to point at the converted webp asset',
	);

	await access(new URL('../public/images/clankeroverflow-landing.webp', import.meta.url));
	assert.ok(true);
});
