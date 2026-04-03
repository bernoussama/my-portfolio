/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
	],
	theme: {
		extend: {
			colors: {
				brand: 'rgb(var(--color-brand-rgb) / <alpha-value>)',
				terminal: 'var(--color-terminal)',
				surface: '#000000',
				'surface-low': '#121212',
				'surface-lowest': '#000000',
				'surface-high': '#121212',
				'surface-highest': '#121212',
				'surface-bright': '#121212',
				'grid-border': '#222222',
				'on-surface': '#ffffff',
				'on-surface-variant': '#ababab',
				outline: '#757575',
				'outline-variant': '#333333',
				primary: '#2563eb',
				'primary-dim': '#1d4ed8',
				'on-primary': '#ffffff',
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
			},
			letterSpacing: {
				'technical': '0.15em',
				'tight-display': '-0.04em',
			},
			maxWidth: {
				'8xl': '90rem',
			},
			borderRadius: {
				none: '0px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
