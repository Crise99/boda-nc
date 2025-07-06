import { rename } from "fs/promises";
import { glob } from "glob";
import { basename, dirname, join, resolve } from "path";

async function processSubfolderImages(subfolder: string) {
	const files = await glob(join(subfolder, "*.webp"), {});
	if (files.length === 0) return;

	// Recoge los números existentes y los archivos a renombrar
	const numberedFiles: { path: string; num: number }[] = [];
	const unnamedFiles: string[] = [];

	for (const file of files) {
		const match = basename(file).match(/^img-(\d+)\.webp$/);
		if (match) {
			numberedFiles.push({ path: file, num: parseInt(match[1], 10) });
		} else {
			unnamedFiles.push(file);
		}
	}

	// Renombra los archivos sin nombre a img-X.webp
	let nextNumber = 1;
	const usedNumbers = new Set(numberedFiles.map((f) => f.num));
	while (usedNumbers.has(nextNumber)) nextNumber++;

	for (const file of unnamedFiles) {
		const newName = `img-${nextNumber}.webp`;
		const newPath = join(dirname(file), newName);
		await rename(file, newPath);
		console.log(`[${basename(subfolder)}] Renamed ${basename(file)} to ${newName}`);
		usedNumbers.add(nextNumber);
		nextNumber++;
	}

	// Vuelve a obtener todos los archivos y renuméralos secuencialmente
	const allFiles = await glob(join(subfolder, "*.webp"), {});
	const allNumbered = allFiles
		.map((file) => {
			const match = basename(file).match(/^img-(\d+)\.webp$/);
			return match ? { path: file, num: parseInt(match[1], 10) } : null;
		})
		.filter((f): f is { path: string; num: number } => f !== null)
		.sort((a, b) => a.num - b.num);

	for (let i = 0; i < allNumbered.length; i++) {
		const file = allNumbered[i];
		const newNumber = i + 1;
		if (file.num !== newNumber) {
			const newName = `img-${newNumber}.webp`;
			const newPath = join(dirname(file.path), newName);
			await rename(file.path, newPath);
			console.log(`[${basename(subfolder)}] Reordered ${basename(file.path)} to ${newName}`);
		}
	}
}

async function main() {
	const subfolders = await glob("public/gallery/*/", {});
	if (subfolders.length === 0) {
		console.log("No subfolders found in public/gallery/");
		return;
	}
	for (const subfolder of subfolders) {
		await processSubfolderImages(resolve(subfolder));
	}
	console.log("\nAll images in all subfolders have been renamed and reordered!");
}

main();
