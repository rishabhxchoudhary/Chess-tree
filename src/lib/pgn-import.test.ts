import { describe, expect, it } from "vitest";

import { parsePgnToNodes } from "./pgn-import";

describe("parsePgnToNodes", () => {
	it("returns root node for empty PGN", () => {
		const nodes = parsePgnToNodes("");
		expect(nodes).toHaveLength(1);
		expect(nodes[0]!.move).toBeNull();
		expect(nodes[0]!.parentIndex).toBeNull();
	});

	it("parses a simple game", () => {
		const nodes = parsePgnToNodes("1. e4 e5 2. Nf3 Nc6");
		expect(nodes).toHaveLength(5); // root + 4 moves
		expect(nodes[1]!.move).toBe("e4");
		expect(nodes[1]!.parentIndex).toBe(0);
		expect(nodes[2]!.move).toBe("e5");
		expect(nodes[2]!.parentIndex).toBe(1);
		expect(nodes[3]!.move).toBe("Nf3");
		expect(nodes[3]!.parentIndex).toBe(2);
		expect(nodes[4]!.move).toBe("Nc6");
		expect(nodes[4]!.parentIndex).toBe(3);
	});

	it("deduplicates shared openings across games", () => {
		const pgn = `[Event "Game 1"]

1. e4 e5 2. Nf3 Nc6 3. Bb5

[Event "Game 2"]

1. e4 e5 2. Nf3 Nc6 3. Bc4`;
		const nodes = parsePgnToNodes(pgn);
		// root + e4 + e5 + Nf3 + Nc6 + Bb5 + Bc4 = 7
		// The first 4 moves (e4, e5, Nf3, Nc6) are shared
		expect(nodes).toHaveLength(7);

		// Both Bb5 and Bc4 should have Nc6 (index 4) as parent
		const bb5 = nodes.find((n) => n.move === "Bb5");
		const bc4 = nodes.find((n) => n.move === "Bc4");
		expect(bb5!.parentIndex).toBe(bc4!.parentIndex);
	});

	it("handles PGN with headers", () => {
		const pgn = `[Event "Test"]
[Site "Internet"]
[Date "2024.01.01"]
[White "Player1"]
[Black "Player2"]
[Result "1-0"]

1. d4 d5 2. c4`;
		const nodes = parsePgnToNodes(pgn);
		expect(nodes).toHaveLength(4); // root + 3 moves
		expect(nodes[1]!.move).toBe("d4");
	});

	it("sets correct sideToMove", () => {
		const nodes = parsePgnToNodes("1. e4 e5 2. Nf3");
		// After e4 (white moved), it's black's turn
		expect(nodes[1]!.sideToMove).toBe("black");
		// After e5 (black moved), it's white's turn
		expect(nodes[2]!.sideToMove).toBe("white");
		// After Nf3 (white moved), it's black's turn
		expect(nodes[3]!.sideToMove).toBe("black");
	});

	it("generates valid FEN for each position", () => {
		const nodes = parsePgnToNodes("1. e4 e5");
		// After 1. e4
		expect(nodes[1]!.fen).toContain("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR");
		// After 1... e5
		expect(nodes[2]!.fen).toContain("rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR");
	});

	it("handles invalid PGN gracefully", () => {
		const nodes = parsePgnToNodes("this is not valid pgn");
		// Should still have root, invalid game is skipped
		expect(nodes).toHaveLength(1);
	});

	it("parses a single game without headers", () => {
		const nodes = parsePgnToNodes("1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4");
		expect(nodes).toHaveLength(8); // root + 7 moves
		// nodes[1]=e4, [2]=c5, [3]=Nf3, [4]=d6, ...
		expect(nodes[1]!.move).toBe("e4");
		expect(nodes[4]!.move).toBe("d6");
	});

	it("sets correct move numbers", () => {
		// chess.js moveNumber() returns ply count, Math.ceil(ply/2) gives chess move number
		const nodes = parsePgnToNodes("1. e4 e5 2. Nf3 Nc6 3. Bb5");
		expect(nodes[1]!.moveNumber).toBe(1); // e4: ceil(1/2)=1
		expect(nodes[2]!.moveNumber).toBe(1); // e5: ceil(2/2)=1
		expect(nodes[3]!.moveNumber).toBe(1); // Nf3: ceil(2/2)=1 (moveNumber still 2 after black's reply)
		expect(nodes[4]!.moveNumber).toBe(2); // Nc6: ceil(3/2)=2
		expect(nodes[5]!.moveNumber).toBe(2); // Bb5: ceil(3/2)=2
	});
});
