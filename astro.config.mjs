import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
	integrations: [tailwind()],
	markdown: {
		shikiConfig: {
			experimentalThemes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
	},
});
