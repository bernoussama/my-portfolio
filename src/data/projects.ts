export type ProjectAction = {
	label: string;
	href: string;
	external?: boolean;
	variant?: 'primary' | 'default';
};

export type PortfolioProject = {
	title: string;
	body: string;
	src?: string;
	techs: string[];
	projectPage?: string;
	actions?: ProjectAction[];
	statusLabel?: string;
	featured?: boolean;
};

const githubProfile = 'https://github.com/bernoussama';

export const allProjects: PortfolioProject[] = [
	{
		title: 'Simplinvo - Invoicing App',
		body:
			'Full-stack invoicing app designed for real business workflows, covering client-facing UI, forms, data handling, and backend business logic with Remix, PocketBase, and Tailwind.',
		src: '/images/simplinvo-image.webp',
		techs: ['TypeScript', 'Remix', 'Tailwind', 'PocketBase', 'Go'],
		actions: [
			{ label: 'Live Demo', href: 'https://simplinvo.com', external: true, variant: 'primary' },
			{ label: 'GitHub', href: `${githubProfile}/simplinvo`, external: true, variant: 'default' },
		],
		featured: true,
	},
	{
		title: 'LazyShell - AI CLI',
		body:
			'AI CLI for turning natural-language requests into shell commands, with interactive confirmation and a workflow built to make terminal automation faster and safer.',
		src: '/images/lazyshell-demo.gif',
		techs: ['TypeScript', 'Node.js', 'AI', 'CLI'],
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/lazyshell`, external: true, variant: 'primary' },
		],
		featured: true,
	},
	{
		title: 'ConText Tools',
		body:
			'Browser writing assistant that brings Gemini-powered editing into the right-click menu, helping users rewrite and refine text without leaving their workflow.',
		techs: ['Chrome Extension', 'Gemini API', 'JavaScript', 'Web'],
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/context-tools`, external: true, variant: 'primary' },
		],
		featured: true,
	},
	{
		title: 'ClankerOverflow',
		body:
			'Closed-source product in development for capturing, searching, and reusing practical engineering solutions with a Hono and PostgreSQL backend.',
		techs: ['TypeScript', 'Hono', 'PostgreSQL', 'Developer Tools'],
		statusLabel: 'Closed source - coming soon',
		featured: true,
	},
	{
		title: 'Trustun - User-Space VPN',
		body:
			'User-space VPN in Rust focused on secure packet transport, async I/O, and low-level networking without relying on kernel modules.',
		techs: ['VPN', 'Networking', 'Rust', 'Systems Programming'],
		projectPage: '/projects/trustun',
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/trustun`, external: true, variant: 'default' },
			{ label: 'Details', href: '/projects/trustun', variant: 'primary' },
		],
		featured: true,
	},
	{
		title: 'DNS Server',
		body:
			'DNS server project built to understand protocol design, parsing, and bit-level networking concerns through a from-scratch implementation in Go.',
		src: '/images/dns-image.webp',
		techs: ['DNS', 'Networking', 'Python', 'Go', 'Systems Programming'],
		projectPage: '/projects/dns-server',
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/mercury`, external: true, variant: 'default' },
			{ label: 'Details', href: '/projects/dns-server', variant: 'primary' },
		],
		featured: false,
	},
	{
		title: 'Multithreaded HTTP Server',
		body:
			'HTTP server built from scratch in C and then reworked in Rust to deepen understanding of concurrency, protocol handling, and systems-level backend fundamentals.',
		src: '/images/httpc-logo.webp',
		techs: ['HTTP', 'Networking', 'C', 'Rust', 'Systems Programming'],
		projectPage: '/projects/http-server',
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/httpr`, external: true, variant: 'default' },
			{ label: 'Details', href: '/projects/http-server', variant: 'primary' },
		],
		featured: false,
	},
	{
		title: 'YANC - Yet Another Netflix Clone',
		body:
			'Next.js streaming UI project built around TMDB data, focused on polished browsing flows, reusable components, and responsive frontend work.',
		src: '/images/yanc-image.webp',
		techs: ['React', 'Next.js', 'Tailwind'],
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/yanc`, external: true, variant: 'primary' },
		],
		featured: false,
	},
	{
		title: 'Maze Game',
		body:
			'3D maze game using raycasting in C with SDL2, built to explore low-level rendering, player movement, and game loop fundamentals.',
		techs: ['C', 'SDL2', 'Raycasting', 'Game Development'],
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/3D-maze-game`, external: true, variant: 'primary' },
		],
		featured: false,
	},
];

export const featuredProjects = allProjects.filter((project) => project.featured);
