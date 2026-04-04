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
			'Full-stack invoicing app built around real business workflows, covering customer-facing UI, billing flows, data handling, and backend logic in one product.',
		src: '/images/simplinvo-landing.webp',
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
			'AI-assisted CLI that turns natural-language requests into shell commands with confirmation and guardrails, making terminal workflows faster without giving up control.',
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
			'Browser extension that brings Gemini-powered rewriting into the context menu, reducing friction for editing and refining text inside existing workflows.',
		techs: ['Chrome Extension', 'Gemini API', 'JavaScript', 'Web'],
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/context-tools`, external: true, variant: 'primary' },
		],
		featured: true,
	},
	{
		title: 'ClankerOverflow',
		body:
			'Closed-source developer tool for capturing, searching, and reusing practical engineering solutions, backed by Hono and PostgreSQL.',
		src: '/images/clankeroverflow-landing.webp',
		techs: ['TypeScript', 'Hono', 'PostgreSQL', 'Developer Tools'],
		statusLabel: 'Closed source - coming soon',
		featured: true,
	},
	{
		title: 'Trustun - User-Space VPN',
		body:
			'User-space VPN in Rust that exercises secure packet transport, async I/O, and low-level networking without relying on kernel modules.',
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
			'From-scratch DNS server in Go that demonstrates protocol parsing, resolution flow, and packet-level debugging in networked systems.',
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
			'HTTP server built from scratch in C and then reworked in Rust to explore concurrency, protocol handling, and memory-safe systems programming.',
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
			'Streaming UI project built on TMDB data to showcase polished browsing flows, reusable components, and responsive frontend implementation.',
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
			'3D maze game using raycasting in C with SDL2, demonstrating low-level rendering, player movement, and core game loop fundamentals.',
		techs: ['C', 'SDL2', 'Raycasting', 'Game Development'],
		actions: [
			{ label: 'GitHub', href: `${githubProfile}/3D-maze-game`, external: true, variant: 'primary' },
		],
		featured: false,
	},
];

export const featuredProjects = allProjects.filter((project) => project.featured);
