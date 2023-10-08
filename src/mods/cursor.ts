// Creates locate function
export function locate(): Promise<[number, number]> {
	return new Promise((resolve, reject) => {
		try {
			const listener = (buffer: Buffer) => {
				const pattern = /\x1B\[(\d+);(\d+)R/;
				const data = buffer.toString();
				if(pattern.test(data)) {
					const position = data.match(pattern);
					if(position === null || position.length < 3) throw new Error("Cursor position is null");
					process.stdin.off("data", listener);
					const column = parseInt(position[1]);
					const row = parseInt(position[2]);
					resolve([column, row]);
				}
			};
			process.stdin.on("data", listener);
			process.stdout.write("\x1B[6n");
		}
		catch(error) {
			reject(error);
		}
	});
}
