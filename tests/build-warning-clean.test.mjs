import test from 'node:test';
import assert from 'node:assert/strict';
import { promisify } from 'node:util';
import { execFile as execFileCallback } from 'node:child_process';

const execFile = promisify(execFileCallback);

test('build output does not include the Astro remote helper warning', async () => {
  const { stdout, stderr } = await execFile('bun', ['run', 'build'], {
    cwd: new URL('..', import.meta.url),
    maxBuffer: 10 * 1024 * 1024,
  });

  const output = `${stdout}\n${stderr}`;

  assert.doesNotMatch(
    output,
    /imported from external module "@astrojs\/internal-helpers\/remote" but never used/,
    'expected the build output to be free of the Astro remote-helper unused import warning',
  );
});
