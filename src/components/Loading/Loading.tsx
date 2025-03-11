interface LoadingProps {
	size?: "small" | "medium" | "large";
	text?: string;
	color?: string;
	className?: string;
}

const Loading = ({
	size = "medium",
	text = "Cargando...",
	color = "#000000",
	className = "",
}: LoadingProps) => {
	const sizeMap = {
		small: "w-4 h-4",
		medium: "w-8 h-8",
		large: "w-12 h-12",
	};

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div
				className={`animate-spin rounded-full border-t-2 border-r-2 border-transparent ${sizeMap[size]}`}
				style={{ borderTopColor: color, borderRightColor: color }}
				role="status"
				aria-label="Loading"
			>
				<span className="sr-only">{text}</span>
			</div>
		</div>
	);
};

export default Loading;
