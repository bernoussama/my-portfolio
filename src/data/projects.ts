export type ProjectEntry = {
	src?: string;
	title: string;
	body: string;
	href: string;
	demoUrl?: string;
	projectPage?: string;
	techs?: string[];
	buttonText?: string;
};

const githubUrl = "https://github.com";
export const myGithubUrl = githubUrl + "/bernoussama";

export const projects: ProjectEntry[] = [
	{
		src: "/images/simplinvo-image.webp",
		title: "Simplinvo – Invoicing App",
		body: "Full-stack invoicing app for real business workflows: UI, forms, validation, and backend-driven business logic. Built with Remix and PocketBase so data rules stay close to the product.",
		href: myGithubUrl + "/simplinvo",
		techs: ["React", "Remix", "Tailwind", "PocketBase", "Go", "SPA"],
	},
	{
		src: "/images/lazyshell-demo.gif",
		title: "LazyShell – AI CLI",
		body: "AI CLI that turns natural-language requests into executable shell commands: multi-provider LLM support, interactive confirmation before running, and benchmarking helpers for comparing models.",
		href: myGithubUrl + "/lazyshell",
		techs: ["AI", "CLI", "TypeScript", "Node.js"],
	},
	{
		src: "",
		title: "ConText Tools (Chrome Extension)",
		body: "Browser extension that wires the Gemini API into everyday writing: context-aware rewrites and assists from the right-click menu, without leaving the page you are on.",
		href: myGithubUrl + "/context-tools",
		techs: ["Chrome Extension", "Gemini API", "JavaScript", "Web"],
	},
	{
		src: "/images/yanc-image.webp",
		title: "YANC – Netflix-style UI",
		body: "Streaming-style catalog UI on top of the TMDB API: routing, data fetching, and responsive layout in Next.js—practice shipping a polished, data-driven frontend.",
		href: myGithubUrl + "/yanc",
		techs: ["React", "Next.js", "Tailwind"],
	},
	{
		src: "",
		title: "Trustun – User-Space VPN",
		body: "User-space IP-over-UDP VPN in Rust: async I/O, modern crypto, and a deployment story that avoids kernel modules—strong systems depth that informs how I build networked apps.",
		href: myGithubUrl + "/trustun",
		projectPage: "/projects/trustun",
		techs: ["VPN", "Networking", "Rust", "Systems"],
	},
	{
		src: "/images/dns-image.webp",
		title: "DNS Server (Mercury)",
		body: "Authoritative-style DNS work in Go, evolved from Python prototypes—hands-on parsing, wire format, and protocol behavior for dependable infrastructure thinking.",
		href: myGithubUrl + "/mercury",
		projectPage: "/projects/dns-server",
		techs: ["DNS", "Networking", "Python", "Go", "Systems"],
	},
	{
		src: "/images/httpc-logo.webp",
		title: "Multithreaded HTTP Server",
		body: "HTTP/1.1 server from scratch in C (multithreaded, compression in progress), with an active Rust rewrite—demonstrates protocol-level understanding beyond framework defaults.",
		href: myGithubUrl + "/httpr",
		projectPage: "/projects/http-server",
		techs: ["HTTP", "Networking", "C", "Rust", "Systems"],
	},
	{
		src: "",
		title: "Maze Game",
		body: "3D maze via raycasting in C and SDL2: movement, minimap, and textured walls—classic engine-style programming with a focus on performance and clarity.",
		href: myGithubUrl + "/3D-maze-game",
		techs: ["C", "SDL2", "Raycasting", "Game Dev"],
	},
	{
		src: "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=720&dpr=2",
		title: "More projects…",
		body: "Browse the full list, including experiments and smaller tools.",
		href: "/projects",
		buttonText: "View all",
	},
];
