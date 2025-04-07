export const prerender = false; // Not needed in 'server' mode

import "photoswipe/style.css";
import "@components/Gallery/styles/Gallery.css";
import Button from "@components/Gallery/Button";
import { useGallery } from "@components/Gallery/hooks/useGallery";
import "@/styles/global.css";

import { type Masonry } from "./types/gallery";

export default function Gallery() {
	const { first, isExpanded, photos, LoadMore } = useGallery();

	return (
		<section className="max-w-8xl mx-auto px-5 py-20 md:px-20 md:pt-30">
			<h2 className="mx-auto mb-8 text-center text-3xl font-semibold tracking-wide lg:text-6xl">
				Galería
			</h2>
			<p className="text-center text-2xl">Todas las fotos de nuestra boda</p>

			<masonry-layout gap="24" maxColWidth="600" className="mx-4 py-20 lg:mx-auto" id="gallery">
				{photos.map(({ height, width }, index) => (
					<a
						key={`gallery-image-${index + 1}`}
						className="group relative rounded-xl pb-4 transition-all hover:scale-105 hover:contrast-[110%]"
						href={`/gallery/img-${index + 1}.webp`}
						target="_blank"
						data-cropped="true"
						data-pswp-width={width}
						data-pswp-height={height}
						ref={!first.current ? first : undefined}
					>
						<img
							className="h-auto w-full rounded-xl object-cover"
							loading="lazy"
							src={`/gallery/thumbnails/img-${index + 1}.webp`}
							alt="Fotografía de los de la boda de Nuria y Cristian"
						/>
						<img
							className="absolute inset-0 -z-10 object-cover opacity-0 blur-md contrast-150 transition group-hover:opacity-100"
							loading="lazy"
							src={`/gallery/thumbnails/img-${index + 1}.webp`}
							alt="Imagen con efecto blur para hacer de sombra de una fotografía de la boda de Nuria y Cristian"
						/>
					</a>
				))}
			</masonry-layout>

			<div className="mx-auto text-center">
				{!isExpanded && (
					<Button onClick={LoadMore} id="load-more" url="#">
						Descúbrelas todas
					</Button>
				)}
			</div>
		</section>
	);
}
