import { beforeEach, describe, expect, it } from "vitest";

import type { NodeRow } from "@/lib/tree";
import { useRepertoireStore } from "./use-repertoire-store";

const STARTING_FEN =
	"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function rootNode(): NodeRow {
	return {
		id: "root",
		repertoireId: "rep-1",
		parentId: null,
		move: null,
		fen: STARTING_FEN,
		moveNumber: 0,
		sideToMove: "white",
		note: null,
		lineName: null,
		whiteWinPct: null,
		drawPct: null,
		blackWinPct: null,
		playedPct: null,
		nag: null,
		metadata: null,
		sortOrder: 0,
		createdAt: new Date(),
	};
}

describe("useRepertoireStore.addMove", () => {
	beforeEach(() => {
		useRepertoireStore.getState().setRepertoireData("rep-1", [rootNode()]);
	});

	it("adds a new move synchronously and selects it", () => {
		const store = useRepertoireStore.getState();
		const { node, isNew } = store.addMove({
			parentId: "root",
			move: "e4",
			fen: "after-e4",
			moveNumber: 1,
			sideToMove: "black",
		});

		expect(isNew).toBe(true);
		expect(node.move).toBe("e4");
		// Current node updated synchronously — no await needed
		expect(useRepertoireStore.getState().currentNodeId).toBe(node.id);
		expect(useRepertoireStore.getState().getCurrentNode()?.fen).toBe(
			"after-e4",
		);
	});

	it("generates a client-side UUID for the new node", () => {
		const { node } = useRepertoireStore.getState().addMove({
			parentId: "root",
			move: "e4",
			fen: "after-e4",
			moveNumber: 1,
			sideToMove: "black",
		});
		expect(node.id).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
		);
	});

	it("returns the existing node when the move already exists (no duplicate)", () => {
		const store = useRepertoireStore.getState();
		const first = store.addMove({
			parentId: "root",
			move: "e4",
			fen: "after-e4",
			moveNumber: 1,
			sideToMove: "black",
		});
		const second = store.addMove({
			parentId: "root",
			move: "e4",
			fen: "after-e4",
			moveNumber: 1,
			sideToMove: "black",
		});

		expect(second.isNew).toBe(false);
		expect(second.node.id).toBe(first.node.id);
		expect(useRepertoireStore.getState().flatNodes).toHaveLength(2); // root + e4
	});

	it("supports rapid consecutive moves without stale state", () => {
		const store = useRepertoireStore.getState();
		// e4
		const e4 = store.addMove({
			parentId: "root",
			move: "e4",
			fen: "fen-e4",
			moveNumber: 1,
			sideToMove: "black",
		});
		// e5 immediately, parented to e4 (no server round-trip in between)
		const e5 = store.addMove({
			parentId: e4.node.id,
			move: "e5",
			fen: "fen-e5",
			moveNumber: 1,
			sideToMove: "white",
		});

		expect(e5.node.parentId).toBe(e4.node.id);
		expect(useRepertoireStore.getState().flatNodes).toHaveLength(3);
		expect(useRepertoireStore.getState().currentNodeId).toBe(e5.node.id);
	});

	it("assigns incrementing sortOrder to siblings", () => {
		const store = useRepertoireStore.getState();
		const a = store.addMove({
			parentId: "root",
			move: "e4",
			fen: "f1",
			moveNumber: 1,
			sideToMove: "black",
		});
		const b = store.addMove({
			parentId: "root",
			move: "d4",
			fen: "f2",
			moveNumber: 1,
			sideToMove: "black",
		});
		expect(a.node.sortOrder).toBe(0);
		expect(b.node.sortOrder).toBe(1);
	});
});

describe("useRepertoireStore.setRepertoireData", () => {
	it("preserves current selection on refetch if the node still exists", () => {
		const store = useRepertoireStore.getState();
		store.setRepertoireData("rep-1", [rootNode()]);
		const { node } = store.addMove({
			parentId: "root",
			move: "e4",
			fen: "fen-e4",
			moveNumber: 1,
			sideToMove: "black",
		});
		const selectedId = node.id;

		// Simulate a background refetch that includes the same nodes
		useRepertoireStore.getState().setRepertoireData("rep-1", [
			rootNode(),
			{ ...node },
		]);

		expect(useRepertoireStore.getState().currentNodeId).toBe(selectedId);
	});

	it("resets to root when switching repertoires", () => {
		const store = useRepertoireStore.getState();
		store.setRepertoireData("rep-1", [rootNode()]);
		store.addMove({
			parentId: "root",
			move: "e4",
			fen: "fen-e4",
			moveNumber: 1,
			sideToMove: "black",
		});

		const otherRoot = { ...rootNode(), id: "root2", repertoireId: "rep-2" };
		useRepertoireStore.getState().setRepertoireData("rep-2", [otherRoot]);

		expect(useRepertoireStore.getState().currentNodeId).toBe("root2");
	});
});
