import { answer, question, section } from "../utils.ts";

export default function solution(input: string) {
	const elves = input
		.split("\n\n")
		.map(inv =>
			inv.split("\n").map(cal => parseInt(cal))
		);
	
	function sum(array: number[]) {
		return array.reduce((a, b) => a + b, 0);
	}
	
	// Part 1
	question("Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?");
	
	const elvesCalories = elves.map(sum);
	
	const elvesCaloriesSorted = elvesCalories.sort((a, b) => b - a);
	
	answer(elvesCaloriesSorted[0]);
	
	// Part 2
	question("Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?");
	
	answer(sum(elvesCaloriesSorted.slice(0, 3)));
}

const example =
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;



const input = await Deno.readTextFile("./input.txt");

section("Example");
solution(example);

section("Input");
solution(input);