const input = await Deno.readTextFile("./input.txt");

const elves = input
	.split("\n\n")
	.map(inv =>
		inv.split("\n").map(cal => parseInt(cal))
	);

function sum(array: number[]) {
	return array.reduce((a, b) => a + b, 0);
}

// Part 1
console.log("Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?");

const elvesCalories = elves.map(sum);

const elvesCaloriesSorted = elvesCalories.sort((a, b) => b - a);

console.log(elvesCaloriesSorted[0]);

// Part 2
console.log("Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?");

console.log(sum(elvesCaloriesSorted.slice(0, 3)));