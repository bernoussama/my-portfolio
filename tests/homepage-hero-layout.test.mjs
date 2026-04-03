import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const homepage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

assert.match(
	homepage,
	/min-h-\[calc\(100svh-4\.5rem\)\] md:min-h-\[calc\(100svh-5\.75rem\)\]/,
	'Homepage hero should account for the navbar height so the CTA fits within the first viewport.',
);

assert.match(
	homepage,
	/px-8 py-10 md:px-16 md:py-12 lg:px-24 lg:py-14 flex flex-col justify-center grid-border-r/,
	'Homepage hero should use reduced vertical padding to keep the portfolio CTA visible without scrolling.',
);
