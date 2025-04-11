import { execSync } from "child_process";

async function runScript(scriptName: string, continueOnError: boolean = false): Promise<boolean> {
	const startTime = Date.now();
	try {
		console.log(`📝 Starting script: ${scriptName}`);
		execSync(`pnpm run ${scriptName}`, { stdio: "inherit" });
		const duration = ((Date.now() - startTime) / 1000).toFixed(2);
		console.log(`✅ Finished script: ${scriptName} (${duration}s)`);
		return true;
	} catch (error) {
		const duration = ((Date.now() - startTime) / 1000).toFixed(2);
		console.error(`❌ Error in script: ${scriptName} (${duration}s)`);
		console.error(`Error details: ${error instanceof Error ? error.message : String(error)}`);

		if (!continueOnError) {
			process.exit(1);
		}
		return false;
	}
}

async function main() {
	console.log("🚀 Starting gallery deployment preparation...");
	const totalStartTime = Date.now();

	const scripts = [
		"script:conver-images-remove",
		"script:rename-images",
		"script:create-thumb",
		"script:create-meta",
	];

	let failedScripts = 0;
	for (const script of scripts) {
		const success = await runScript(script, true);
		if (!success) failedScripts++;
	}

	const totalDuration = ((Date.now() - totalStartTime) / 1000).toFixed(2);
	if (failedScripts > 0) {
		console.error(`⚠️ Completed with ${failedScripts} failed scripts (${totalDuration}s)`);
		process.exit(1);
	} else {
		console.log(`✨ Gallery deployment preparation completed successfully! (${totalDuration}s)`);
	}
}

main().catch((error) => {
	console.error("Fatal error:", error);
	process.exit(1);
});
