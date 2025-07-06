import photosInfo from "@/data/meta-gallery.json";
import { useEffect, useMemo, useRef } from "react";

export const useGallery = ({ category, isExpanded }: { category: string; isExpanded: boolean }) => {
	const categoryIndex = Number(category) - 1;
	const totalPhotos = photosInfo[categoryIndex].length;
	const first = useRef<HTMLAnchorElement>(null);

	// Usar useMemo para recalcular las fotos cuando cambian category o isExpanded
	const photos = useMemo(() => {
		if (isExpanded) {
			return photosInfo[categoryIndex];
		}
		return photosInfo[categoryIndex].slice(0, Math.min(10, totalPhotos));
	}, [categoryIndex, isExpanded, totalPhotos]);

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

		// const offset = Math.min(10, totalPhotos);
		// const res = await fetch(`/api/gallery.json?category=${category}&offset=${offset}`);
		// const images = await res.json();

		// const html = images
		// 	.map((img: any, index: number) => {
		// 		const imgIndex = index + offset + 1;
		// 		if (!first.current) return;

		// 		const clone = first.current.cloneNode(true) as HTMLElement;
		// 		if (!clone) return;
		// 		clone.setAttribute("data-pswp-width", img.width);
		// 		clone.setAttribute("data-pswp-height", img.height);
		// 		clone.setAttribute("href", `/gallery/${category}/img-${imgIndex}.webp`);
		// 		clone.classList.add("animate-fade-up");
		// 		clone.classList.add("animate-delay-300");
		// 		clone.classList.add("opacity-0");
		// 		clone
		// 			.querySelector("img:first-child")
		// 			?.setAttribute("src", `/gallery/${category}/thumbnails/img-${imgIndex}.webp`);
		// 		clone
		// 			.querySelector("img:last-child")
		// 			?.setAttribute("src", `/gallery/${category}/thumbnails/img-${imgIndex}.webp`);

		// 		return clone?.outerHTML;
		// 	})
		// 	.join("");
		// document.querySelector("#gallery")?.insertAdjacentHTML("beforeend", html);
		// document.querySelector("masonry-layout")?.scheduleLayout();
	};

	return {
		photos,
		totalPhotos,
		first,
		LoadMore,
	};
};
