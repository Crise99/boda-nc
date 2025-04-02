import galleryInfo from "@/data/meta-gallery.json";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	const { url } = request;
	const searchParams = new URL(url).searchParams;
	const offset = Number(searchParams.get("offset") ?? "0");

	return new Response(JSON.stringify(galleryInfo.slice(offset)));
};
