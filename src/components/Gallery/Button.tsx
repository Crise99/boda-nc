import type { MouseEvent } from "react";
import styles from "@components/Gallery/styles/Button.module.css";

interface Props {
	children?: React.ReactNode;
	onClick?: (e: MouseEvent<HTMLAnchorElement>) => any;
	id?: string;
	className?: string;
	target?: string;
	url: string;
}

export default function Button({ children, onClick, url, target, className, ...rest }: Props) {
	return (
		<a
			href={url}
			target={target ?? "_blank"}
			rel="noopener noreferrer"
			onClick={onClick}
			className={`border-primary-900 bg-primary-500/30 w-fit rounded-full border border-solid px-3 py-3 text-xs font-medium uppercase no-underline md:px-5 md:text-xl lg:text-2xl ${styles.button} ${className ?? ""}`}
			{...rest}
		>
			{children}
		</a>
	);
}
