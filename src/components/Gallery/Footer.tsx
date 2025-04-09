import "@/styles/global.css";

interface Props {
	text: string;
	className?: string;
}

export default function Title({ text, className = "" }: Props) {
	return (
		<div className={`mx-auto max-w-6xl p-4 ${className}`}>
			<p className="pt-2 text-center text-xl">{text}</p>
		</div>
	);
}
