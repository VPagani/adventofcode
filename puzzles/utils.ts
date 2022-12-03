export function section(title: string) {
	console.log(`\n| ${title}`);
}

export function question(message: string) {
	console.log("=>", message);
}

export function answer(value: unknown) {
	console.log(" ", value);
}