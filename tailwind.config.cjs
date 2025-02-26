/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		screens: {
			xs: "400px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			colors: {
				// use any standard tailwind colors from here https://tailwindcss.com/docs/customizing-colors
				// or generate with https://uicolors.app/create
				primary: {
					50: "#f9f6f3",
					100: "#f0ece4",
					200: "#e0d6c8",
					300: "#cdbba4",
					400: "#bba085",
					500: "#a98466",
					600: "#9c745a",
					700: "#825f4c",
					800: "#6a4e42",
					900: "#574137",
					950: "#2e211c",
				},
				base: {
					50: "#f6f6f6",
					100: "#e7e7e7",
					200: "#d1d1d1",
					300: "#b0b0b0",
					400: "#888888",
					500: "#6d6d6d",
					600: "#5d5d5d",
					700: "#4f4f4f",
					800: "#454545",
					900: "#363636",
					950: "#262626",
				},

				info: "#7dd3fc",
				"info-content": "#082f49",
				success: "#6ee7b7",
				"success-content": "#022c22",
				warning: "#fcd34d",
				"warning-content": "#111827",
				error: "#fca5a5",
				"error-content": "#450a0a",
			},
		},
		fontFamily: {
			"heading-1": [
				"Playfair Display Variable",
				...defaultTheme.fontFamily.serif,
			],
			"heading-2": ["Raleway Variable", ...defaultTheme.fontFamily.sans],
			sans: ["Work Sans Variable", ...defaultTheme.fontFamily.sans],
			decorative: [
				"Cinzel Decorative",
				"Playfair Display Variable",
				...defaultTheme.fontFamily.serif,
			],
		},
	},
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
