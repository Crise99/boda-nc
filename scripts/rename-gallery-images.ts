import { rename } from "fs/promises";
import { glob } from "glob";
import { basename, dirname, join } from "path";

interface GalleryAnalysis {
	existingNumbers: Set<number>;
	unnamedFiles: string[];
	nextNumber: number;
}

async function processGalleryImages(analysis?: GalleryAnalysis): Promise<void> {
	try {
		// Initial analysis if not provided
		if (!analysis) {
			const files = await glob("public/gallery/*.webp", {});
			console.log(`Found ${files.length} files in gallery`);

			analysis = {
				existingNumbers: new Set<number>(),
				unnamedFiles: [],
				nextNumber: 1,
			};

			// First pass: collect existing numbers
			for (const file of files) {
				const match = basename(file).match(/img-(\d+)\.webp$/);
				if (match) {
					const num = parseInt(match[1], 10);
					analysis.existingNumbers.add(num);
				} else {
					analysis.unnamedFiles.push(file);
					console.log(`File needs renaming: ${basename(file)}`);
				}
			}

			// Calculate next available number
			while (analysis.existingNumbers.has(analysis.nextNumber)) {
				analysis.nextNumber++;
			}
		}

		// Base case: no more files to rename
		if (!analysis?.unnamedFiles.length) {
			console.log("\nAll files have been renamed successfully!");
			return;
		}

		// Get the next file to rename
		const fileToRename = analysis.unnamedFiles[0];
		const newName = `img-${analysis.nextNumber}.webp`;
		const newPath = join(dirname(fileToRename), newName);

		// Rename the file
		await rename(fileToRename, newPath);
		console.log(`Renamed ${basename(fileToRename)} to ${newName}`);

		// Update analysis for next iteration
		analysis.existingNumbers.add(analysis.nextNumber);
		analysis.unnamedFiles.shift();
		analysis.nextNumber++;

		// Recursive call with updated analysis
		await processGalleryImages(analysis);
	} catch (error) {
		console.error("Error processing gallery:", error);
		process.exit(1);
	}
}

async function reorderSequentially() {
	// After all unnamed files are processed, reorder all files sequentially
	const allFiles = await glob("public/gallery/*.webp", {});
	const numberedFiles = allFiles
		.map((file) => {
			const match = basename(file).match(/img-(\d+)\.webp$/);
			return match ? { path: file, num: parseInt(match[1], 10) } : null;
		})
		.filter((file): file is { path: string; num: number } => file !== null)
		.sort((a, b) => a.num - b.num);

	// Renumber files sequentially
	for (let i = 0; i < numberedFiles.length; i++) {
		const file = numberedFiles[i];
		const newNumber = i + 1;
		if (file.num !== newNumber) {
			const newName = `img-${newNumber}.webp`;
			const newPath = join(dirname(file.path), newName);
			await rename(file.path, newPath);
			console.log(`Reordered ${basename(file.path)} to ${newName}`);
		}
	}
	console.log("\nAll files have been reordered sequentially!");
}

async function main() {
	// Start the recursive process
	await processGalleryImages();
	// After renaming, reorder all files sequentially
	await reorderSequentially();
}

// Execute main function
main();
