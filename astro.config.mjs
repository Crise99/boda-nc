import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import icon from "astro-icon";

import react from "@astrojs/react";

export default defineConfig({
	site: "https://www.bodanuriaycristian.es",
	output: "static",
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		}
	}),
	integrations: [AutoImport({
		imports: [
			"@components/Admonition/Admonition.astro",
		],
	}), mdx(), icon({
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
	}), sitemap(), compress({
		HTML: true,
		JavaScript: true,
		CSS: true,
		Image: false,
		SVG: false,
	}), react()],

	vite: {
		plugins: [tailwindcss({
			globalStyle: "./src/styles/global.css",
			applyBaseStyles: false,
		})],
		build: {
			assetsInlineLimit: 0,
		},
	}
});
