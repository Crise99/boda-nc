import "@/styles/global.css";

interface Props {
	title: string;
	subtitle: string;
	className?: string;
}

export default function Title({ title, subtitle, className = "" }: Props) {
	return (
		<div className={`mx-auto max-w-6xl p-4 ${className}`}>
			<div className="text-prety mr-auto text-center">
				<h2 className="h2">{title}</h2>
			</div>
			<p className="pt-2 text-center text-xl">{subtitle}</p>
		</div>
	);
}
