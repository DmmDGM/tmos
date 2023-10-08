// Imports
import chalk from "chalk";
import * as modApps from "../mods/apps.js";
import * as modTerminal from "../mods/terminal.js";

// Creates class
export const description = "App selection menu. (Current process)";
export async function execute(): Promise<void> {
	// Fetch apps
	const fetched = await modApps.fetchAll();
	const sorted = fetched.sort((left: modApps.App, right: modApps.App) => {
		return left.name.localeCompare(right.name);
	});
	

	// Creates pager
	const pagerRange = 10;

	
}
export const identifer = "home";
export const name = "Home";