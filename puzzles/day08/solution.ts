import { answer, question, section } from "../utils.ts";

export default function solution(input: string) {
	const layers = input.split("\n").map((layer) => layer.split("").map(height => parseInt(height)));

	// Part 1
	question("How many trees are visible from outside the grid?")

	type Vector2 = [i: number, j: number];

	function countVisibleTrees(layers: number[][]) {
		let visibleTrees = 0;

		for (let i = 0; i < layers.length; i++) {
			const layer = layers[i];
			
			for (let j = 0; j < layer.length; j++) {
				if (isTreeVisible(layers, [i, j])) {
					visibleTrees += 1;
					continue;
				}
			}
		}

		return visibleTrees;
	}

	function isTreeVisible(layers: number[][], tree: Vector2): boolean {
		const [i, j] = tree;

		if (i == 0 || i == layers.length - 1 || j == 0 || j == layers[i].length - 1) {
			return true;
		}

		const treeHeight = layers[i][j];

		const directions: Vector2[] = [
			[-1, 0], [1, 0],
			[0, -1], [0, 1],
		];

		for (const [di, dj] of directions) {
			let [i, j] = tree;
			i += di;
			j += dj;

			let visible = true;

			do {
				if (layers[i][j] >= treeHeight) {
					visible = false;
				}

				i += di;
				j += dj;
			} while (i >= 0 && i < layers.length && j >= 0 && j < layers[i].length);

			if (visible) {
				return true;
			}
		}

		return false;
	}

	answer(countVisibleTrees(layers));

	// Part 2
	question("What is the highest scenic score possible for any tree?");

	function highestScenicScore(layers: number[][]): number {
		let highestScore = 0;

		for (let i = 0; i < layers.length; i++) {
			const layer = layers[i];
			for (let j = 0; j < layer.length; j++) {
				const score = calculateTreeScenicScore(layers, [i, j]);
				if (score > highestScore) {
					highestScore = score;
				}
			}
		}

		return highestScore;
	}

	function calculateTreeScenicScore(layers: number[][], tree: Vector2): number {
		const [i, j] = tree;

		if (i == 0 || i == layers.length - 1 || j == 0 || j == layers[i].length - 1) {
			return 0;
		}

		const treeHeight = layers[i][j];

		const directions: Vector2[] = [
			[-1, 0], [1, 0],
			[0, -1], [0, 1],
		];

		const viewDistances: number[] = [];

		for (const [di, dj] of directions) {
			let [i, j] = tree;
			i += di;
			j += dj;

			let visibleTrees = 0;

			while (i >= 0 && i < layers.length && j >= 0 && j < layers[i].length) {
				visibleTrees += 1;

				if (layers[i][j] >= treeHeight) {
					break;
				}

				i += di;
				j += dj;
			}

			viewDistances.push(visibleTrees);
		}

		return viewDistances.reduce((a, b) => a * b);
	}

	answer(highestScenicScore(layers));
}

const example =
`30373
25512
65332
33549
35390`;
const input = await Deno.readTextFile("./input.txt");

section("Example");
solution(example);

section("Input");
solution(input);