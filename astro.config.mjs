// @ts-check
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
	integrations: [
		mdx(),
		react()
	],

	vite: {
		plugins: [tailwindcss()]
	},
	output: "static",
	adapter: cloudflare()
})
