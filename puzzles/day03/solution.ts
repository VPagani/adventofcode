import { question, answer, section } from "../utils.ts";


export default function solution (input: string) {
	const rucksacks = input.split("\n");

	// Part 1
	question("What is the sum of the priorities of those item types?");

	const a_code = "a".charCodeAt(0);
	const z_code = "z".charCodeAt(0);
	const A_code = "A".charCodeAt(0);
	const Z_code = "Z".charCodeAt(0);

	function itemPriority(item: string): number {
		const code = item.charCodeAt(0);

		if (code >= a_code && code <= z_code) {
			return code - a_code + 1;
		} else if (code >= A_code && code <= Z_code) {
			return code - A_code + 27;
		}

		return 0;
	}

	function rucksackItemsInBothCompartments(rucksack: string): Array<string> {
		const half = Math.floor(rucksack.length / 2);
		const compartment1 = new Set(rucksack.slice(0, half));
		const compartment2 = new Set(rucksack.slice(half));

		const bothCompartments = new Set<string>();

		for (const item of compartment1) {
			if (compartment2.has(item)) {
				bothCompartments.add(item);
			}
		}

		return [...bothCompartments.values()];
	}

	const sumPriorities = rucksacks.reduce((sum, rucksack) => {
		const itemsInBoth = rucksackItemsInBothCompartments(rucksack);

		return sum + itemsInBoth.reduce((sum, item) => sum + itemPriority(item), 0);
	}, 0);

	answer(sumPriorities);

	// Part 2
	question("Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?");

	let sumPrioritiesBadges = 0;
	rucksacks: for (let i = 0; i + 3 <= rucksacks.length; i += 3) {
		const rucksack1 = rucksacks[i];
		const rucksack2 = new Set(rucksacks[i + 1]);
		const rucksack3 = new Set(rucksacks[i + 2]);

		for (const item of rucksack1) {
			if (rucksack2.has(item) && rucksack3.has(item)) {
				sumPrioritiesBadges += itemPriority(item);
				continue rucksacks;
			}
		}
	}

	answer(sumPrioritiesBadges);
}

const example =
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const input = await Deno.readTextFile("./input.txt");

section("Example");
solution(example);

section("Input");
solution(input);
