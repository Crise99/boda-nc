import { readFile, writeFile } from "fs/promises";
import { glob } from "glob";
import { imageMeta } from "image-meta";
import { join } from "path";

// Types
interface ImageMetadata {
	height: number;
	width: number;
}

// Paths
const galleryPath = "public/gallery/*/*.webp";
const metaPath = "src/data/meta-gallery.json";

// Initialize metadata array
const metaImages: [ImageMetadata[], ImageMetadata[]] = [[], []];

const files = await glob(galleryPath, {});
console.log(`Found ${files.length} files in gallery`);

for await (const file of files) {
	console.log(`Processing file: ${file}`);
	const data = await readFile(file);
	const { height = 0, width = 0 } = imageMeta(Buffer.from(data));

	const imageNumber = Number(file.match(/img-(\d+)/)?.[1] || "");
	const category = Number(file.match(/\/(\d+)\//)?.[1] || "");

	metaImages[category - 1][imageNumber - 1] = { height, width };
}

// Write metadata to JSON file
const outputPath = join(process.cwd(), metaPath);
await writeFile(outputPath, JSON.stringify(metaImages, null, 2));
