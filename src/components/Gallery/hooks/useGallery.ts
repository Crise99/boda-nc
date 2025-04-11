import photosInfo from "@/data/meta-gallery.json";
import { useEffect, useRef, useState } from "react";

export const useGallery = () => {
	const totalPhotos = photosInfo.length;
	const offset = totalPhotos < 10 ? totalPhotos : 10;
	const first = useRef<HTMLAnchorElement>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const photos = photosInfo.slice(0, offset);

	useEffect(() => {
		const init = async () => {
			await import("@appnest/masonry-layout");
			const module = await import("photoswipe/lightbox");
			const PhotoSwipeLightbox = module.default;
			const lightbox = new PhotoSwipeLightbox({
				gallery: "#gallery",
				children: "a",
				pswpModule: () => import("photoswipe"),
			});
			lightbox.init();
		};
		init();
	}, []);

	const LoadMore = async (e) => {
		e.preventDefault();

		const res = await fetch(`/api/gallery.json?offset=${offset}`);
		const images = await res.json();

		const html = images
			.map((img: any, index: number) => {
				const imgIndex = index + offset + 1;
				if (!first.current) return;

				const clone = first.current.cloneNode(true) as HTMLElement;
				if (!clone) return;
				clone.setAttribute("data-pswp-width", img.width);
				clone.setAttribute("data-pswp-height", img.height);
				clone.setAttribute("href", `/gallery/img-${imgIndex}.webp`);
				clone.classList.add("animate-fade-up");
				clone.classList.add("animate-delay-300");
				clone.classList.add("opacity-0");
				clone
					.querySelector("img:first-child")
					?.setAttribute("src", `/gallery/thumbnails/img-${imgIndex}.webp`);
				clone
					.querySelector("img:last-child")
					?.setAttribute("src", `/gallery/thumbnails/img-${imgIndex}.webp`);

				return clone?.outerHTML;
			})
			.join("");
		document.querySelector("#gallery")?.insertAdjacentHTML("beforeend", html);
		document.querySelector("masonry-layout")?.scheduleLayout();
		setIsExpanded(true);
	};

	return {
		photos,
		totalPhotos,
		first,
		isExpanded,
		LoadMore,
	};
};
