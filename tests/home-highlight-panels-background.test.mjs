import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage status panel matches the header and the command block stays black', async () => {
	const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

	assert.match(
		source,
		/<div class="[^"]*flex-grow[^"]*grid-border-b[^"]*bg-surface-highest[^"]*">[\s\S]*Status: Open to opportunities[\s\S]*Focus: Product \/ Systems \/ AI Tooling[\s\S]*Stack: TypeScript \/ Go \/ Rust[\s\S]*<\/div>/,
		'expected the status panel to use the same surface background as the header',
	);

	assert.match(
		source,
		/<div class="[^"]*items-center[^"]*justify-center[^"]*bg-surface-highest[^"]*">[\s\S]*<div class="[^"]*terminal-block[^"]*bg-surface-lowest[^"]*">[\s\S]*build product --stack react,node,go,rust --mode direct[\s\S]*<\/div>[\s\S]*<\/div>/,
		'expected the command panel to match the header while the inner terminal block explicitly uses the black surface background',
	);
});
