import React from "react";

// Define the Masonry type
export type Masonry<T> = T & {
	gap: string;
	maxcolwidth: string;
};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			["masonry-layout"]: Masonry<React.HTMLAttributes<HTMLElement>>;
		}
	}
}
