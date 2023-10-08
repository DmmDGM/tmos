// Imports
import nodeEvents from "node:events";
import nodeReadline from "node:readline";

// Creates keypress event
export const keypress = new nodeEvents.EventEmitter();

// Creates internal types
export type Data = {
	code: string | undefined;
	ctrl: boolean;
	meta: boolean;
	name: string | undefined;
	sequence: string | undefined;
	shift: boolean;
};
export type Raw = string | undefined;
export type Key = Data & { raw: Raw };

// Emits keypress
nodeReadline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on("keypress", (raw: Raw, data: Data) => {
	const key: Key = Object.assign({}, data, { raw });
	keypress.emit("key", key);
});
