import { answer, question, section } from "../utils.ts";

export default function solution(input: string) {
	const lines = input.split("\n");
	
	// Part 1
	question("After the rearrangement procedure completes, what crate ends up on top of each stack?");

	type Stack = Array<string>;
	type Stacks = Array<Stack>

	function getStacks(): Stacks {
		const stacks: Array<Array<string>> = [];

		for (const line of lines) {
			if (line === "") continue;

			if (line.startsWith("[") || line.startsWith(" ")) {
				for (let i = 0; 1 + i * 4 < line.length; i++) {
					const char = line[1 + i * 4];
					
					if (/[A-Z]/.test(char)) {
						if (!stacks[i]) {
							stacks[i] = [];
						}
	
						const stack = stacks[i];
						stack.unshift(char);
					}
				}
			}
		}

		return stacks;
	}

	function moveCM9000(stacks: Stacks): Stacks {
		for (const line of lines) {
			if (line.startsWith("m")) {
				const match = /move (\d+) from (\d+) to (\d+)/.exec(line);
				if (!match) continue;
	
				const amount = parseInt(match[1]);
				const from = parseInt(match[2]) - 1;
				const to = parseInt(match[3]) - 1;
				
				for (let n = 0; n < amount; n++) {
					const item = stacks[from].pop();
					if (!item) continue;
	
					stacks[to].push(item);
				}
			}
		}

		return stacks;
	}

	function getTops(stacks: Stacks): Array<string> {
		const tops: Array<string> = [];
		for (const stack of stacks) {
			const top = stack[stack.length - 1];
			if (top) {
				tops.push(top);
			} else {
				tops.push("_");
			}
		}
		return tops;
	}


	answer(getTops(moveCM9000(getStacks())).join(""));

	// Part 2
	question("After the rearrangement procedure completes, what crate ends up on top of each stack?");


	function moveCM9001(stacks: Stacks): Stacks {
		for (const line of lines) {
			if (line.startsWith("m")) {
				const match = /move (\d+) from (\d+) to (\d+)/.exec(line);
				if (!match) continue;

				const amount = parseInt(match[1]);
				const from = parseInt(match[2]) - 1;
				const to = parseInt(match[3]) - 1;

				const items = stacks[from].splice(stacks[from].length - amount, amount);
				stacks[to].push(...items);
			}
		}

		return stacks;
	}

	answer(getTops(moveCM9001(getStacks())).join(""));
}


const example =
`    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
const input = await Deno.readTextFile("./input.txt");


section("Example");
solution(example);

section("Input");
solution(input);