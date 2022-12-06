import { answer, question, section } from "../utils.ts";


export default function solution(input: string) {
	// Part 1
	question("How many characters need to be processed before the first start-of-packet marker is detected?");

	function findMarker(input: string, size: number) {
		const marker: Array<string> = [];

		for (let i = 0; i < input.length; i++) {
			const char = input[i];

			const indexOfChar = marker.indexOf(char);
			if (indexOfChar >= 0) {
				marker.splice(0, indexOfChar + 1);
			}

			marker.push(char);

			if (marker.length == size) {
				return i + 1;
			}
		}
	}

	answer(findMarker(input, 4));

	question("How many characters need to be processed before the first start-of-message marker is detected?");

	answer(findMarker(input, 14));
}

const example1 = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`; 
const example2 = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
const example3 = `nppdvjthqldpwncqszvftbrmjlhg`;
const example4 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
const example5 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;
const input = await Deno.readTextFile("./input.txt");


section("Example 1");
solution(example1);

section("Example 2");
solution(example2);

section("Example 3");
solution(example3);

section("Example 4");
solution(example4);

section("Example 5");
solution(example5);

section("Input");
solution(input);