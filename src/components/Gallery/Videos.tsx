import "@justinribeiro/lite-youtube";
import videos from "@/data/videos-info.json";
import ButtonToTop from "@components/Gallery/ButtonToTop";

export default function Videos() {
	return (
		<section className="max-w-8xl mx-auto px-5 py-20 md:px-20 md:pt-20">
			<div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
				{videos.map((video) => (
					<div key={video.id} className="flex flex-col items-center">
						<article className="aspect-video w-full overflow-hidden rounded-xl bg-black transition-transform hover:scale-103 hover:shadow-2xl">
							{/* @ts-ignore */}
							<lite-youtube videotitle={video.title} videoid={video.videoid}></lite-youtube>
						</article>
					</div>
				))}
			</div>
			<ButtonToTop scrollTo="#categories" />
		</section>
	);
}
