import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

async function astroFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(entries.map(async (entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return astroFiles(path);
		return entry.isFile() && entry.name.endsWith('.astro') ? [path] : [];
	}));

	return files.flat();
}

test('normal paragraph text defaults to 16px instead of 20px', async () => {
	const files = await astroFiles(fileURLToPath(new URL('../src', import.meta.url)));
	const oversizedParagraphs = [];

	for (const file of files) {
		const source = await readFile(file, 'utf8');
		const paragraphClassMatches = source.matchAll(/<p\s+class="([^"]*)"/g);

		for (const match of paragraphClassMatches) {
			if (match[1].split(/\s+/).includes('text-xl')) {
				oversizedParagraphs.push(`${file}: ${match[0]}`);
			}
		}
	}

	assert.deepEqual(oversizedParagraphs, []);
});
