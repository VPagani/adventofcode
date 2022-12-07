import { answer, question, section } from "../utils.ts";

export default function solution(input: string) {
	const lines = input.split("\n");

	// Part 1
	question("What is the sum of the total sizes of those directories?");

	type Entry = Directory | File;

	type File = {
		kind: "file",
		name: string,
		size: number,
	}

	type Directory = {
		kind: "dir",
		name: string,
		size?: number,
		entries: Record<string, Entry>,
	}

	const CMD_CD = "$ cd";
	const CMD_LS = "$ ls";

	function parseCommands(): Directory {
		let currentPath: Array<string> = [];
		const root: Directory = {
			kind: "dir",
			name: "",
			entries: {},
		}

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			if (line.startsWith(CMD_CD)) {
				const path = line.slice(CMD_CD.length + 1);
				switch (path) {
					case "..":
						currentPath.pop();
						break;

					case "/":
						currentPath = [];
						break;

					default:
						currentPath.push(path);
				}
				
			} else if (line.startsWith(CMD_LS)) {
				const entries: Directory["entries"] = {};

				for (i++; i < lines.length && !lines[i].startsWith("$"); i++) {
					const outputLine = lines[i];

					if (outputLine.startsWith("dir")) {
						const name = outputLine.slice("dir ".length);
						entries[name] = { kind: "dir", name, entries: {} };

					} else {
						const match = /(\d+) ([\w\.]+)/.exec(outputLine);
						if (!match) continue;

						const [,size, name] = match;
						entries[name] = { kind: "file", name, size: parseInt(size) };
					}
				}

				i--;

				let currentDir = root;
				for (const dir of currentPath) {
					let nextDir = currentDir.entries[dir];
					if (!nextDir) {
						currentDir.entries[dir] = nextDir = {
							kind: "dir",
							name: dir,
							entries: {},
						};
					}

					if (nextDir && nextDir.kind == "dir") {
						currentDir = nextDir;
					}
				}

				currentDir.entries = entries;
			}
		}
	
		return root;
	}

	function calculateDirSize(dir: Directory): Directory {
		let size = 0;

		for (const entry of Object.values(dir.entries)) {
			switch (entry.kind) {
				case "dir": {
					calculateDirSize(entry);
					size += entry.size!;
					break;
				}

				case "file":
					size += entry.size;
					break;
			}
		}

		dir.size = size;

		return dir;
	}

	function findDirsOfSizeAtMost(dir: Directory, maxSize: number): Array<Directory> {
		let dirs: Array<Directory> = [];

		if (dir.size! < maxSize) {
			dirs.push(dir);
		}

		for (const entry of Object.values(dir.entries)) {
			switch (entry.kind) {
				case "dir": {
					const subdirs = findDirsOfSizeAtMost(entry, maxSize);
					dirs = dirs.concat(subdirs);
					break;
				}

				case "file":
					break;
			}
		}

		return dirs;
	}

	const root = calculateDirSize(parseCommands());
	const dirs = findDirsOfSizeAtMost(root, 100_000);
	const totalSize = dirs.reduce((totalSize, dir) => totalSize + dir.size!, 0);

	answer(totalSize);

	// Part 2
	question("What is the total size of that directory?");

	function findSmallestDirToDelete(root: Directory, sizeNeeded: number) {
		let smallestDir: Directory = root;

		function find(dir: Directory) {
			if (dir.size! < sizeNeeded) {
				return;
			}

			if (dir.size! < smallestDir.size!) {
				smallestDir = dir;
			}

			for (const entry of Object.values(dir.entries)) {
				switch (entry.kind) {
					case "dir":
						find(entry);
	
						break;
				}
			}
		}

		find(root);

		return smallestDir;
	}

	const fsSize = 70_000_000;
	const updateSize = 30_000_000;
	const smallestDir = findSmallestDirToDelete(root, updateSize - (fsSize - root.size!));

	answer(smallestDir.size);
}

const example =
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
const input = await Deno.readTextFile("./input.txt");

section("Example");
solution(example);

section("Input");
solution(input);