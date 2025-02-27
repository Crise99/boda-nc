// @ts-check
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import { defineConfig } from "astro/config"

import icon from "astro-icon"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
	site: "https://www.bodanuriaycristian.com/",
	integrations: [mdx(), react(), icon({
		include: {
			tabler: [
				"bulb",
				"alert-triangle",
				"flame",
				"info-circle",
				"arrow-narrow-left",
				"arrow-narrow-right",
				"menu-2",
				"x",
				"chevron-down",
				"category",
				"calendar-event",
			],
		},
	})],
	output: "static",
	adapter: cloudflare(),

	vite: {
		plugins: [tailwindcss()]
	}
})
