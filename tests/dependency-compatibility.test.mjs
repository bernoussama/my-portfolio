import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function readJson(relativePath) {
	const source = await readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
	return JSON.parse(source);
}

test('Astro uses the Tailwind 4 Vite plugin instead of the deprecated integration', async () => {
	const [packageJson, astroConfig, stylesheet] = await Promise.all([
		readJson('package.json'),
		readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8'),
		readFile(new URL('../style.css', import.meta.url), 'utf8'),
	]);

	assert.equal(packageJson.dependencies?.['@astrojs/tailwind'], undefined);
	assert.match(packageJson.devDependencies?.['@tailwindcss/vite'] ?? '', /^\^?4\./);
	assert.match(packageJson.devDependencies?.tailwindcss ?? '', /^\^?4\./);
	assert.match(astroConfig, /import tailwindcss from '@tailwindcss\/vite';/);
	assert.match(astroConfig, /plugins:\s*\[tailwindcss\(\)\]/);
	assert.doesNotMatch(astroConfig, /@astrojs\/tailwind/);
	assert.match(stylesheet, /@import "tailwindcss";/);
	assert.match(stylesheet, /@config ['"]\.\/tailwind\.config\.js['"];/);
	assert.match(stylesheet, /@plugin ['"]@tailwindcss\/typography['"];/);
});

test('package-lock keeps direct dependencies in sync with package.json', async () => {
	const [packageJson, packageLock] = await Promise.all([
		readJson('package.json'),
		readJson('package-lock.json'),
	]);
	const rootPackage = packageLock.packages?.[''];

	assert.ok(rootPackage, 'expected package-lock.json to declare the root package');
	assert.deepEqual(rootPackage.dependencies ?? {}, packageJson.dependencies ?? {});
	assert.deepEqual(rootPackage.devDependencies ?? {}, packageJson.devDependencies ?? {});
});
