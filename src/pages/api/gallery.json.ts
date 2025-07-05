export const prerender = false;

import galleryInfo from "@/data/meta-gallery.json";
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ request }) => {
	const { url } = request;
	const searchParams = new URL(url).searchParams;
	const offset = Number(searchParams.get("offset") ?? "0");
	const category = Number(searchParams.get("category") ?? "1");

	const categoryIndex = category - 1;
	const categoryInfo = galleryInfo[categoryIndex];

	return new Response(JSON.stringify(categoryInfo.slice(offset)));
};
