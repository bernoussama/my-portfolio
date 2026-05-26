import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage renders the latest three blog posts below projects', async () => {
	const source = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');

	assert.match(
		source,
		/import ProjectCard from '\.\.\/components\/ProjectCard\.astro';/,
		'expected the homepage to reuse the same card component as the projects section',
	);

	assert.match(
		source,
		/import\.meta\.glob<[^>]+>\('\.\/blog\/\*\.md', \{\s*eager: true,\s*import: 'frontmatter'\s*\}\)/,
		'expected the homepage to read blog post frontmatter directly from markdown files',
	);

	assert.match(
		source,
		/\.sort\([\s\S]*dateB - dateA[\s\S]*\)\s*\.slice\(0, 3\)/,
		'expected the homepage to sort posts newest first and keep only three',
	);

	assert.match(
		source,
		/<!-- END: ProjectsSection -->[\s\S]*<!-- BEGIN: WritingsSection -->[\s\S]*<h2[^>]*>Writings<\/h2>[\s\S]*grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4[\s\S]*latestPosts\.map\(\(post, index\) => \([\s\S]*<ProjectCard[\s\S]*buttonText="Read"[\s\S]*hideSecondaryAction/,
		'expected the Writings section to appear after Projects and use the same grid/card layout',
	);
});
