import { answer, question, section } from "../utils.ts";

export default function solution(input: string) {
	// Part 1
	question("How many positions does the tail of the rope visit at least once?");

	type Direction = "R" | "U" | "L" | "D";
	type RopeMove = {
		direction: Direction;
		steps: number;
	}

	const moves: RopeMove[] = input.split("\n").map(step => {
		const [direction, steps] = step.split(" ");
		return { direction, steps: parseInt(steps) } as RopeMove;
	});

	type Vector2 = [x: number, y: number];
	type RopeKnots = {
		head: Vector2;
		tail: Vector2;
	};

	function moveRope(state: RopeKnots, move: RopeMove): RopeKnots[] {
		let head: Vector2 = state.head;
		let tail: Vector2 = state.tail;

		const states: RopeKnots[] = [];
		for (let i = 0; i < move.steps; i++) {
			head = moveDirection(head, move.direction);

			const diffX = head[0] - tail[0];
			const diffY = head[1] - tail[1];

			if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
				tail = [tail[0] + Math.sign(diffX), tail[1] + Math.sign(diffY)]
			}

			states.push({ head, tail });
		}

		return states;
	}

	function moveDirection(vector: Vector2, direction: Direction, units = 1): Vector2 {
		const [x, y] = vector;
		switch (direction) {
			case "R":
				return [x + units, y];
			case "U":
				return [x, y + units];
			case "L":
				return [x - units, y];
			case "D":
				return [x, y - units];
		}
	}

	function countTailVisitedPositions(moves: RopeMove[]): number {
		const visitedPositions = new Set<string>();
		let state: RopeKnots = { head: [0, 0], tail: [0, 0] };

		for (const move of moves) {
			for (const currentState of moveRope(state, move)) {
				const position = currentState.tail.toString();
				visitedPositions.add(position);
				
				state = currentState;
			}
		}

		return visitedPositions.size;
	}

	answer(countTailVisitedPositions(moves));

	// Part 2
	question("How many positions does the tail of the rope visit at least once?");

	type RopeKnotsN = Vector2[];

	function moveRopeN(knots: RopeKnotsN, move: RopeMove): RopeKnotsN[] {
		const knotsStates: RopeKnotsN[] = [];
		
		let knotsState = knots;
		for (let i = 0; i < move.steps; i++) {
			const newKnots = [moveDirection(knotsState[0], move.direction)];

			for (let k = 1; k < knotsState.length; k++) {
				const prevKnot = newKnots[k - 1];
				const knot = knotsState[k];

				const diffX = prevKnot[0] - knot[0];
				const diffY = prevKnot[1] - knot[1];

				if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
					newKnots.push([knot[0] + Math.sign(diffX), knot[1] + Math.sign(diffY)]);
				} else {
					newKnots.push(knot);
				}

			}

			knotsState = newKnots; 
			knotsStates.push(knotsState);
		}

		return knotsStates;
	}

	function countTailVisitedPositionsN(moves: RopeMove[], knotsAmount: number): number {
		const visitedPositions = new Set<string>();
		let state: RopeKnotsN = Array(knotsAmount).fill([0, 0]);

		for (const move of moves) {
			for (const currentState of moveRopeN(state, move)) {
				const position = currentState[currentState.length - 1].toString();
				visitedPositions.add(position);
				state = currentState;
			}
		}

		return visitedPositions.size;
	}


	answer(countTailVisitedPositionsN(moves, 10));
}

const example1 =
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const example2 =
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const input = await Deno.readTextFile("./input.txt");

section("Example 1");
solution(example1);

section("Example 2");
solution(example2);

section("Input");
solution(input);