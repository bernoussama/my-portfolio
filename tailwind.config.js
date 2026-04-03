/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
	],
	theme: {
		extend: {
			colors: {
				brand: 'rgb(var(--color-brand-rgb) / <alpha-value>)',
				terminal: 'rgb(var(--color-terminal) / <alpha-value>)',
				surface: 'rgb(var(--color-surface) / <alpha-value>)',
				'surface-low': 'rgb(var(--color-surface-low) / <alpha-value>)',
				'surface-lowest': 'rgb(var(--color-surface-lowest) / <alpha-value>)',
				'surface-high': 'rgb(var(--color-surface-high) / <alpha-value>)',
				'surface-highest': 'rgb(var(--color-surface-highest) / <alpha-value>)',
				'surface-bright': 'rgb(var(--color-surface-bright) / <alpha-value>)',
				'grid-border': 'rgb(var(--color-grid-border) / <alpha-value>)',
				'on-surface': 'rgb(var(--color-fg) / <alpha-value>)',
				'on-surface-variant': 'rgb(var(--color-on-surface-variant) / <alpha-value>)',
				outline: 'rgb(var(--color-outline) / <alpha-value>)',
				'outline-variant': 'rgb(var(--color-outline-variant) / <alpha-value>)',
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				'primary-dim': 'rgb(var(--color-primary-dim) / <alpha-value>)',
				'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
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
