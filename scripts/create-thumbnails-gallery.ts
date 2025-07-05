import { mkdir, rm } from "fs/promises";
import { glob } from "glob";
import { basename, dirname, join } from "node:path";
import sharp from "sharp";

console.info("🗑️ Clearing previous thumbnails");
// Elimina los thumbnails de cada subcarpeta
const thumbsToRemove = await glob("public/gallery/*/thumbnails/*", {});
for await (const fileRm of thumbsToRemove) {
	await rm(fileRm, { force: true });
}
console.info(`🚮 Clear done: ${thumbsToRemove.length} files removed`);

// Busca imágenes en todas las subcarpetas
const files = await glob("public/gallery/*/*.webp", {});

console.info("🖼️ Creating thumbnails");
for await (const file of files) {
	const thumbDir = join(dirname(file), "thumbnails");
	await mkdir(thumbDir, { recursive: true });

	console.info(`Converting ${file} to thumbnail...`);
	const newFilePath = join(thumbDir, basename(file));

	const convert = sharp(file).webp({
		lossless: false,
		quality: 25,
	});

	await convert.toFile(newFilePath);
	console.info(`Thumbnail created into ${newFilePath}`);
}
