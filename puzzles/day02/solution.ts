import { answer, question, section } from "../utils.ts";

export default function solution(input: string) {
	// Part 1
	question("What would your total score be if everything goes exactly according to your strategy guide?");
	
	enum Shape {
		Rock,
		Paper,
		Scissors,
	}
	
	enum Outcome {
		Win,
		Lose,
		Draw,
	}
	
	const OPONENT_SHAPE = {
		A: Shape.Rock,
		B: Shape.Paper,
		C: Shape.Scissors,
	}
	
	const MY_SHAPE = {
		X: Shape.Rock,
		Y: Shape.Paper,
		Z: Shape.Scissors,
	}
	
	const SHAPE_SCORE: Record<Shape, number> = {
		[Shape.Rock]: 1,
		[Shape.Paper]: 2,
		[Shape.Scissors]: 3,
	}
	
	const OUTCOME_SCORE: Record<Outcome, number> = {
		[Outcome.Draw]: 3,
		[Outcome.Win]: 6,
		[Outcome.Lose]: 0,
	}
	
	const SHAPE_OUTCOME: Record<Shape, Record<Shape, Outcome>> = {
		[Shape.Rock]: {
			[Shape.Rock]: Outcome.Draw,
			[Shape.Paper]: Outcome.Win,
			[Shape.Scissors]: Outcome.Lose,
		},
		[Shape.Paper]: {
			[Shape.Rock]: Outcome.Lose,
			[Shape.Paper]: Outcome.Draw,
			[Shape.Scissors]: Outcome.Win,
		},
		[Shape.Scissors]: {
			[Shape.Rock]: Outcome.Win,
			[Shape.Paper]: Outcome.Lose,
			[Shape.Scissors]: Outcome.Draw,
		},
	}
	
	type Round = [keyof typeof OPONENT_SHAPE, keyof typeof MY_SHAPE];
	
	const rounds = input.split("\n")
		.map(round => round.split(" ") as Round);
	
	const score = rounds.reduce((score, [oponent, my]) => {
		const oponentShape = OPONENT_SHAPE[oponent];
		const myShape = MY_SHAPE[my];
		const outcome = SHAPE_OUTCOME[oponentShape][myShape];
		const outcomeScore = OUTCOME_SCORE[outcome];
		const shapeScore = SHAPE_SCORE[myShape];
		return score + outcomeScore + shapeScore;
	}, 0);
	
	answer(score);
	
	// Part 2
	question("Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?")
	
	const STRATEGY_OUTCOME = {
		X: Outcome.Lose,
		Y: Outcome.Draw,
		Z: Outcome.Win,
	}
	
	const OUTCOME_SHAPE = {
		[Shape.Rock]: {
			[Outcome.Draw]: Shape.Rock,
			[Outcome.Win]: Shape.Paper,
			[Outcome.Lose]: Shape.Scissors,
		},
		[Shape.Paper]: {
			[Outcome.Draw]: Shape.Paper,
			[Outcome.Win]: Shape.Scissors,
			[Outcome.Lose]: Shape.Rock,
		},
		[Shape.Scissors]: {
			[Outcome.Draw]: Shape.Scissors,
			[Outcome.Win]: Shape.Rock,
			[Outcome.Lose]: Shape.Paper,
		},
	}
	
	const strategyScore = rounds.reduce((score, [oponent, strategy]) => {
		const oponentShape = OPONENT_SHAPE[oponent];
		const outcome = STRATEGY_OUTCOME[strategy];
		const myShape = OUTCOME_SHAPE[oponentShape][outcome];
		const outcomeScore = OUTCOME_SCORE[outcome];
		const shapeScore = SHAPE_SCORE[myShape];
		return score + outcomeScore + shapeScore;
	}, 0);

	answer(strategyScore);
}

const example =
`A Y
B X
C Z`;

const input = await Deno.readTextFile("./input.txt");

section("Example");
solution(example);

section("Input");
solution(input);