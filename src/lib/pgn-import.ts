import { Chess } from "chess.js";

export interface ImportedNode {
	parentIndex: number | null;
	move: string | null;
	fen: string;
	moveNumber: number;
	sideToMove: "white" | "black";
	note: string | null;
	nag: number | null;
}

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function parsePgnToNodes(pgn: string): ImportedNode[] {
	const nodes: ImportedNode[] = [
		{
			parentIndex: null,
			move: null,
			fen: STARTING_FEN,
			moveNumber: 0,
			sideToMove: "white",
			note: null,
			nag: null,
		},
	];

	const games = pgn.split(/\n\n(?=\[)/).filter((g) => g.trim());

	for (const game of games) {
		const chess = new Chess();
		try {
			chess.loadPgn(game);
		} catch {
			continue;
		}
		const history = chess.history({ verbose: true });

		let parentIndex = 0;
		const tempChess = new Chess();

		for (const move of history) {
			tempChess.move(move.san);
			const fen = tempChess.fen();

			const existingIndex = nodes.findIndex(
				(n) => n.parentIndex === parentIndex && n.move === move.san,
			);

			if (existingIndex !== -1) {
				parentIndex = existingIndex;
			} else {
				const newIndex = nodes.length;
				nodes.push({
					parentIndex,
					move: move.san,
					fen,
					moveNumber: Math.ceil(tempChess.moveNumber() / 2),
					sideToMove: tempChess.turn() === "w" ? "white" : "black",
					note: null,
					nag: null,
				});
				parentIndex = newIndex;
			}
		}
	}

	return nodes;
}
