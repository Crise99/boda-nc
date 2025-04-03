import { glob } from "glob";
import { basename, dirname, join } from "node:path";
import sharp from "sharp";

const files = await glob("public/gallery/*.webp", {});

for await (const file of files) {
	console.info(`Converting ${file}`);
	const newFilePath = join(dirname(file), "thumbnails", basename(file));

	const convert = sharp(file).webp({
		lossless: false,
		quality: 25,
	});

	await convert.toFile(newFilePath);
	console.info(`Converted to ${newFilePath}`);
}
