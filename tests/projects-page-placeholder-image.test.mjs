import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('projects page uses a placeholder image when a project has no image', async () => {
	const source = await readFile(new URL('../src/pages/projects.astro', import.meta.url), 'utf8');

	assert.match(
		source,
		/const projectCardPlaceholder = 'https:\/\/placehold\.co\/1200x800\/111827\/f3f4f6\?text=Project\+Preview';/,
		'expected the projects page to define a shared placeholder image path',
	);

	assert.match(
		source,
		/src=\{project\.src \?\? projectCardPlaceholder\}/,
		'expected the projects page to pass a placeholder image to cards missing src',
	);
});
