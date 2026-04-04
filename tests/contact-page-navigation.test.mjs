import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('header connect actions point to the contact page and the route exposes core contact details', async () => {
  const [navSource, contactSource] = await Promise.all([
    readFile(new URL('../src/components/NavBar.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/contact.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(
    navSource,
    /href="\/contact"[\s\S]*?>\s*Connect\s*<\/a>/,
    'expected the desktop header connect CTA to link to /contact',
  );

  assert.match(
    navSource,
    /<a href="\/contact" class="[^"]*">\s*Connect\s*<\/a>/,
    'expected the mobile menu connect CTA to link to /contact',
  );

  assert.match(contactSource, /<h1[^>]*>Contact<\/h1>/, 'expected the contact page to have a Contact heading');
  assert.match(
    contactSource,
    /contact@bernoussama\.com/,
    'expected the contact page to include the primary email address',
  );
  assert.match(contactSource, /href="mailto:contact@bernoussama\.com"/, 'expected the contact page to offer a direct email CTA');
});
