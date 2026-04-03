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
				surface: '#0e0e0e',
				'surface-low': '#131313',
				'surface-lowest': '#000000',
				'surface-high': '#1a1a1a',
				'surface-highest': '#262626',
				'surface-bright': '#2c2c2c',
				'grid-border': '#222222',
				'on-surface': '#ffffff',
				'on-surface-variant': '#ababab',
				outline: '#757575',
				'outline-variant': '#333333',
				primary: '#90abff',
				'primary-dim': '#316bf3',
				'on-primary': '#002873',
			},
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
				grotesk: ['Space Grotesk', 'ui-sans-serif', 'sans-serif'],
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
