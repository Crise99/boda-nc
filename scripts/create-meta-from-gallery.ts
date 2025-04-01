import { readFile, writeFile } from "fs/promises";
import { glob } from "glob";
import { imageMeta } from "image-meta";
import { join } from "path";
import { promisify } from "util";

// Types
interface ImageMetadata {
	height: number;
	width: number;
}

// Promisify glob for async/await usage
const globAsync: (pattern: string, options: object) => Promise<string[]> = promisify(glob);

// Initialize metadata array
const metaImages: ImageMetadata[] = [];

(async () => {
	try {
		// Get all image files from gallery
		const files = await globAsync("public/gallery/*", {});
		console.log(`Found ${files.length} files in gallery`);

		for (const file of files) {
			try {
				// Read file buffer
				const data = await readFile(file);

				// Extract metadata
				const { height = 0, width = 0 } = imageMeta(Buffer.from(data));

				// Get image number from filename (assuming format: img-1.webp, img-2.webp, etc.)
				const imageNumber = Number(file.match(/img-(\d+)/)?.[1] || "");

				if (imageNumber > 0) {
					console.log(`Processing image ${imageNumber}: ${height}x${width}`);
					metaImages[imageNumber - 1] = { height, width };
				}
			} catch (error) {
				console.error(`Error processing file ${file}:`, error);
			}
		}

		// Write metadata to JSON file
		const outputPath = join(process.cwd(), "src/data/meta-gallery.json");
		await writeFile(outputPath, JSON.stringify(metaImages, null, 2));

		console.log(`Metadata written to ${outputPath}`);
	} catch (error) {
		console.error("Script failed:", error);
		process.exit(1);
	}
})();
