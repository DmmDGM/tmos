// Imports
import nodeFs from "node:fs";
import nodePath from "node:path";
import nodeUrl from "node:url";

// Parses apps directory
export const directory = nodePath.resolve(nodeUrl.fileURLToPath(import.meta.url), "../../apps/");

// Creates app type
export type App = {
	description: string;
	execute: (...parameters: unknown[]) => unknown;
	identifier: string;
	name: string;
};

// Creates fetch functions
export async function fetch(file: string): Promise<App> {
	const path = nodePath.resolve(directory, file);
	const url = nodeUrl.pathToFileURL(path).toString();
	const app = (await import(url)) as App;
	return app;
}

// Creates fetch all functions
export async function fetchAll(): Promise<App[]> {
	const files = await nodeFs.promises.readdir(directory);
	const apps: App[] = await Promise.all(
		files.map((file) => {
			return fetch(file);
		})
	);
	return apps;
}

// Creates shutdown function
export function shutdown(message: string): never;
export function shutdown(code: number): never;
export function shutdown(): never;
export function shutdown(parameter?: string | number): never {
	if (typeof parameter === "string") process.stdout.write(parameter + "\n");
	process.exit(typeof parameter === "number" ? parameter : 0);
}
