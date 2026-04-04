import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

function isAstroRemoteHelperWarning(warning) {
	return warning.code === 'UNUSED_EXTERNAL_IMPORT'
		&& warning.message.includes('"@astrojs/internal-helpers/remote"')
		&& warning.message.includes('node_modules/astro/dist/assets/utils/index.js');
}

export default defineConfig({
	markdown: {
		shikiConfig: {
			experimentalThemes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
	},
	vite: {
		plugins: [tailwindcss()],
		build: {
			rollupOptions: {
				onwarn(warning, defaultHandler) {
					if (isAstroRemoteHelperWarning(warning)) {
						return;
					}

					defaultHandler(warning);
				},
			},
		},
	},
});
