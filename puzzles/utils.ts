export function section(title: string) {
	console.log(`\n| ${title}`);
}

export function question(message: string) {
	console.log("=>", message);
}

export function answer(value: unknown) {
	console.log(" ", value);
}

export function sum(values: number[]) {
	return values.reduce((sum, value) => sum + value, 0);
}

export function product(values: number[]) {
	return values.reduce((product, value) => product * value, 1);
}