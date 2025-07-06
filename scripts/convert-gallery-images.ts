import { rm } from "fs/promises";
import { glob } from "glob";
import { basename, dirname, extname, join } from "node:path";
import sharp from "sharp";

async function convertToWebp() {
	console.info("📐 Convert images to WEBP");

	const files = await glob("public/gallery/*/*.{jpg,jpeg,png}", {});

	const replaceExtWithDot = (newExtWithDot: string, { inFilePath }: { inFilePath: string }) =>
		join(dirname(inFilePath), basename(inFilePath, extname(inFilePath))) + newExtWithDot;
	const shouldRemove = (str: string = "") => str.toLowerCase().startsWith("rm");
	const remove = shouldRemove(process.argv[2]?.toLowerCase());

	for await (const file of files) {
		console.info(`Converting ${file}`);
		const newFilePath = replaceExtWithDot(".webp", { inFilePath: file });
		const convert = sharp(file)
			// Preserve orientation
			.rotate()
			.webp({
				lossless: false,
				quality: 90,
			});

		await convert.toFile(newFilePath);
		console.info(`Converted to ${newFilePath}`);

		if (remove) {
			console.log(`Removing old file ${file}`);
			await rm(file, { force: true });
		}
	}
}

// Run conversion
convertToWebp();
