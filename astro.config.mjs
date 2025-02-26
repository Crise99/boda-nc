// @ts-check
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), react(), icon()],

	vite: {
		plugins: [tailwindcss()],
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern-compiler",
				},
			},
		},
	},
	output: "static",
	adapter: cloudflare()
})
