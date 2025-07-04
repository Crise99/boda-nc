import { rm } from "fs/promises";
import { glob } from "glob";
import { basename, dirname, join } from "node:path";
import sharp from "sharp";

console.info("🗑️ Clearing previous thumbnails");
const filesToRemove = await glob("public/gallery/thumbnails/*", {});
for await (const fileRm of filesToRemove) {
	await rm(fileRm, { force: true });
}
console.info(`🚮 Clear done: ${filesToRemove.length} files removed`);

const files = await glob("public/gallery/*.webp", {});

console.info("🖼️ Creating thumbnails");
for await (const file of files) {
	console.info(`Converting ${file} to thumbnail...`);
	const newFilePath = join(dirname(file), "thumbnails", basename(file));

	const convert = sharp(file).webp({
		lossless: false,
		quality: 25,
	});

	await convert.toFile(newFilePath);
	console.info(`Thumbnail created into ${newFilePath}`);
}
