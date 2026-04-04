import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage includes a closing CTA before the footer', async () => {
	const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

	assert.match(
		source,
		/<section class="grid grid-cols-12 grid-border-b[^"]*">[\s\S]*Let(?:'|&apos;)s build something useful[\s\S]*Contact Me[\s\S]*Read Resume[\s\S]*<\/section>\s*<\/Layout>/,
		'expected the homepage to end with a closing CTA section before the shared footer',
	);

	assert.match(
		source,
		/<section class="grid grid-cols-12 grid-border-b[^"]*bg-surface-highest[^"]*">[\s\S]*Let(?:'|&apos;)s build something useful/,
		'expected the closing CTA section to use the same surface background as the header',
	);

	assert.match(source, /href="mailto:contact@bernoussama\.com"/, 'expected the closing CTA primary action to email directly');
	assert.match(source, /href="\/resume"/, 'expected the closing CTA secondary action to link to the resume page');
	assert.match(
		source,
		/If you're hiring for someone who can own product work across frontend, backend, automation, and the engineering details underneath it, I'd be glad to talk\./,
		'expected the closing CTA body copy to match the requested hiring-focused message',
	);
	assert.match(
		source,
		/<div class="[^"]*flex-col[^"]*items-stretch[^"]*sm:flex-row[^"]*">/,
		'expected the closing CTA actions to stack on mobile and align inline on larger screens',
	);
});
