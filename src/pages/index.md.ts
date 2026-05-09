const markdown = `# Oussama Bernou — Full-Stack Engineer

Portfolio homepage for Oussama Bernou.

## Main sections

- [Projects](/projects)
- [Blog](/blog)
- [Resume](/resume)
- [Contact](/contact)

## Focus

- Product engineering
- Backend systems
- AI-powered tooling
`;

export const GET = () =>
	new Response(markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Vary': 'Accept',
			'x-markdown-tokens': 'available',
		},
	});
