// @ts-check
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import { defineConfig } from "astro/config"

import icon from "astro-icon"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), react(), icon()],
	output: "static",
	adapter: cloudflare(),

	vite: {
		plugins: [tailwindcss()]
	}
})
