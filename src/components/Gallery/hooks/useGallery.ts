import { useRef, useState } from "react";

export const useGallery = () => {
	const offset = 10;
	const first = useRef<HTMLAnchorElement>(null);
	const [isExpanded, setIsExpanded] = useState(false);
};
