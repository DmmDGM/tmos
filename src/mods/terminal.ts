// Imports
import nodeReadline from "node:readline";
import chalk, { ChalkInstance } from "chalk";

// Creates cli
export const cli = nodeReadline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Creates clear function
export function clear(): void {
	process.stdout.write("\x1B[2J\x1B[H");
}

// Creates input function
export function input(query: string = "> ", style: ChalkInstance = chalk): Promise<string> {
	return new Promise((resolve, reject) => {
		try {
			cli.question(style(query), (answer) => {
				resolve(answer);
			});
		} catch (error) {
			reject(error);
		}
	});
}

// Creates output function
export function output(message: string, style: ChalkInstance = chalk): void {
	process.stdout.write(style(message) + "\n");
}
