import { answer, question, section } from "../utils.ts";

export default function solution(input: string) {
	const lines = input.split("\n");

	// Part 1
	question("In how many assignment pairs does one range fully contain the other?");

	type Range = [start: number, end: number];

	const assignmentPairs = lines.map(pair => {
		const match = pair.match(/(\d+)-(\d+),(\d+)-(\d+)/);
		if (!match) throw new Error("Invalid input");

		const [,start1, end1, start2, end2] = match;

		return [
			[parseInt(start1), parseInt(end1)] as Range,
			[parseInt(start2), parseInt(end2)] as Range,
		] as [Range, Range];
	});

	const fullyContained = assignmentPairs.filter(([range1, range2]) => {
		const [start1, end1] = range1;
		const [start2, end2] = range2;

		return (start1 <= start2 && end1 >= end2) || (start2 <= start1 && end2 >= end1);
	});

	answer(fullyContained.length);

	// Part 2
	question("In how many assignment pairs do the ranges overlap?");

	const overlapping = assignmentPairs.filter(([range1, range2]) => {
		const [start1, end1] = range1;
		const [start2, end2] = range2;

		return (start1 <= start2 && start2 <= end1) || (start2 <= start1 && start1 <= end2);
	});

	answer(overlapping.length);
}

section("Example");

const example =
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
solution(example);

section("Input");

const input = await Deno.readTextFile("./input.txt");
solution(input);