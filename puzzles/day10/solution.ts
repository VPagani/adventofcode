import { answer, question, section, sum } from "../utils.ts";

export default function solution(input: string) {
	const lines = input.split("\n");

	// Part 1
	question("What is the sum of these six signal strengths?");

	type CPUState = {
		cycle: number;
		registerX: number;
	}

	function computeInstruction(state: CPUState, instruction: string): CPUState {
		const [operation, argument] = instruction.split(" ");
		const value = parseInt(argument);

		switch (operation) {
			case "noop":
				return { ...state, cycle: state.cycle + 1 };
			case "addx":
				return { cycle: state.cycle + 2, registerX: state.registerX + value };
			default:
				return state;
		}
	}


	function sumSignalStrengths(lines: string[]) {
		const initialState: CPUState = { cycle: 0, registerX: 1 };

		const checkCycles = [20, 60, 100, 140, 180, 220];
		let checkCycle = checkCycles.shift();
		
		let cpuState = initialState;
		const signalStrengths: number[] = [];
		for (const instruction of lines) {
			if (checkCycle == undefined) break;

			const cpuStateNext = computeInstruction(cpuState, instruction);

			if (cpuStateNext.cycle >= checkCycle) {
				signalStrengths.push(cpuState.registerX * checkCycle);
				checkCycle = checkCycles.shift();
			}

			cpuState = cpuStateNext;
		}

		console.log(signalStrengths);

		return sum(signalStrengths);
	}

	answer(sumSignalStrengths(lines));

	// Part 2
	question("Render the image given by your program. What eight capital letters appear on your CRT?");

	function renderCRTImage(instructions: string[]) {
		const CRT_WIDTH = 40;
		
		const initialState: CPUState = { cycle: 0, registerX: 1 };

		let cpuState = initialState;

		const crtLines: string[][] = [];
		for (const instruction of instructions) {
			const cpuStateNext = computeInstruction(cpuState, instruction);

			for (let c = cpuState.cycle; c < cpuStateNext.cycle; c++) {
				const spritePosition = cpuState.registerX;
				const position = c % CRT_WIDTH;

				if (spritePosition == position || spritePosition == position + 1 || spritePosition == position - 1) {
					const line = Math.floor(c / CRT_WIDTH);
					if (crtLines[line] == undefined) crtLines[line] = Array(CRT_WIDTH).fill(".");
					crtLines[line][position] = "#";
				}
			}

			cpuState = cpuStateNext;
		}

		const crtImage = crtLines.map(line => line.join("")).join("\n");
		console.log(crtImage);
	}

	renderCRTImage(lines);
}

const example = await Deno.readTextFile("./input_example.txt");
const input = await Deno.readTextFile("./input.txt");

section("Example");
solution(example);

section("Input");
solution(input);