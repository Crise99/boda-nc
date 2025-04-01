// Define the Masonry type
export type Masonry<T> = T & { gap: string; maxcolwidth: string };

// Extend React's IntrinsicElements to include the custom "masonry-layout" element
// declare global {
// 	namespace JSX {
// 		interface IntrinsicElements {
// 			["masonry-layout"]: Masonry<HTMLAttributes<HTMLElement>>;
// 		}
// 	}
// }
