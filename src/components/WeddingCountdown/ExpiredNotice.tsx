export default function ExpiredNotice() {
	return (
		<div className="expired-notice flex flex-col items-center gap-4 rounded-xl p-8">
			<span className="text-2xl font-bold">!Que ya nos hemos casado! 💍❤️</span>
			<p className="text-center text-lg">
				Gracias por acompañarnos en este día tan especial.
				<br />
				Ya puedes ver y descargar todas las fotos en la <b>galería</b>.
			</p>
			<a
				href="/archive"
				className="bg-primary-300 hover:bg-primary-400 mt-4 rounded-lg px-6 py-3 font-semibold shadow transition"
			>
				Ver galería de fotos
			</a>
		</div>
	);
}
