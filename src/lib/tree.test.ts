import { describe, expect, it } from "vitest";

import {
	type NodeRow,
	buildTree,
	findNode,
	findPath,
	getMainLine,
	getSiblings,
} from "./tree";

function makeNode(overrides: Partial<NodeRow> & { id: string }): NodeRow {
	return {
		id: overrides.id,
		repertoireId: "rep-1",
		parentId: overrides.parentId ?? null,
		move: overrides.move ?? null,
		fen: overrides.fen ?? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
		moveNumber: overrides.moveNumber ?? 0,
		sideToMove: overrides.sideToMove ?? "white",
		note: overrides.note ?? null,
		lineName: overrides.lineName ?? null,
		whiteWinPct: overrides.whiteWinPct ?? null,
		drawPct: overrides.drawPct ?? null,
		blackWinPct: overrides.blackWinPct ?? null,
		nag: overrides.nag ?? null,
		metadata: overrides.metadata ?? null,
		sortOrder: overrides.sortOrder ?? 0,
		createdAt: new Date(),
	};
}

describe("buildTree", () => {
	it("returns null for empty array", () => {
		expect(buildTree([])).toBeNull();
	});

	it("builds a single root node", () => {
		const nodes = [makeNode({ id: "root" })];
		const tree = buildTree(nodes);
		expect(tree).not.toBeNull();
		expect(tree!.id).toBe("root");
		expect(tree!.children).toHaveLength(0);
	});

	it("builds a linear tree", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "n1", parentId: "root", move: "e4" }),
			makeNode({ id: "n2", parentId: "n1", move: "e5" }),
		];
		const tree = buildTree(nodes);
		expect(tree!.id).toBe("root");
		expect(tree!.children).toHaveLength(1);
		expect(tree!.children[0]!.id).toBe("n1");
		expect(tree!.children[0]!.children[0]!.id).toBe("n2");
	});

	it("builds a branching tree", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "e4", parentId: "root", move: "e4", sortOrder: 0 }),
			makeNode({ id: "d4", parentId: "root", move: "d4", sortOrder: 1 }),
		];
		const tree = buildTree(nodes);
		expect(tree!.children).toHaveLength(2);
		expect(tree!.children[0]!.move).toBe("e4");
		expect(tree!.children[1]!.move).toBe("d4");
	});

	it("sorts children by sortOrder", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "d4", parentId: "root", move: "d4", sortOrder: 2 }),
			makeNode({ id: "e4", parentId: "root", move: "e4", sortOrder: 0 }),
			makeNode({ id: "c4", parentId: "root", move: "c4", sortOrder: 1 }),
		];
		const tree = buildTree(nodes);
		expect(tree!.children.map((c) => c.move)).toEqual(["e4", "c4", "d4"]);
	});

	it("handles orphan nodes gracefully", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "orphan", parentId: "nonexistent", move: "e4" }),
		];
		const tree = buildTree(nodes);
		expect(tree!.children).toHaveLength(0);
	});
});

describe("findNode", () => {
	it("finds the root", () => {
		const nodes = [makeNode({ id: "root" })];
		const tree = buildTree(nodes)!;
		expect(findNode(tree, "root")?.id).toBe("root");
	});

	it("finds a deep node", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "n1", parentId: "root" }),
			makeNode({ id: "n2", parentId: "n1" }),
			makeNode({ id: "n3", parentId: "n2" }),
		];
		const tree = buildTree(nodes)!;
		expect(findNode(tree, "n3")?.id).toBe("n3");
	});

	it("returns null for missing node", () => {
		const nodes = [makeNode({ id: "root" })];
		const tree = buildTree(nodes)!;
		expect(findNode(tree, "missing")).toBeNull();
	});
});

describe("findPath", () => {
	it("returns path to root (just root)", () => {
		const nodes = [makeNode({ id: "root" })];
		const tree = buildTree(nodes)!;
		const path = findPath(tree, "root");
		expect(path.map((n) => n.id)).toEqual(["root"]);
	});

	it("returns full path to deep node", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "n1", parentId: "root" }),
			makeNode({ id: "n2", parentId: "n1" }),
			makeNode({ id: "n3", parentId: "n2" }),
		];
		const tree = buildTree(nodes)!;
		const path = findPath(tree, "n3");
		expect(path.map((n) => n.id)).toEqual(["root", "n1", "n2", "n3"]);
	});

	it("returns empty array for missing node", () => {
		const nodes = [makeNode({ id: "root" })];
		const tree = buildTree(nodes)!;
		expect(findPath(tree, "missing")).toEqual([]);
	});

	it("finds correct branch in a tree with multiple children", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "e4", parentId: "root" }),
			makeNode({ id: "d4", parentId: "root" }),
			makeNode({ id: "d5", parentId: "d4" }),
		];
		const tree = buildTree(nodes)!;
		const path = findPath(tree, "d5");
		expect(path.map((n) => n.id)).toEqual(["root", "d4", "d5"]);
	});
});

describe("getSiblings", () => {
	it("returns siblings of a child node", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "e4", parentId: "root", sortOrder: 0 }),
			makeNode({ id: "d4", parentId: "root", sortOrder: 1 }),
		];
		const tree = buildTree(nodes)!;
		const siblings = getSiblings(tree, "e4");
		expect(siblings.map((s) => s.id)).toEqual(["e4", "d4"]);
	});

	it("returns empty for root node", () => {
		const nodes = [makeNode({ id: "root" })];
		const tree = buildTree(nodes)!;
		expect(getSiblings(tree, "root")).toEqual([]);
	});
});

describe("getMainLine", () => {
	it("returns just root for tree with no children", () => {
		const nodes = [makeNode({ id: "root" })];
		const tree = buildTree(nodes)!;
		expect(getMainLine(tree).map((n) => n.id)).toEqual(["root"]);
	});

	it("follows first child at each level", () => {
		const nodes = [
			makeNode({ id: "root" }),
			makeNode({ id: "e4", parentId: "root", sortOrder: 0 }),
			makeNode({ id: "d4", parentId: "root", sortOrder: 1 }),
			makeNode({ id: "e5", parentId: "e4", sortOrder: 0 }),
			makeNode({ id: "Nf3", parentId: "e5", sortOrder: 0 }),
		];
		const tree = buildTree(nodes)!;
		expect(getMainLine(tree).map((n) => n.id)).toEqual([
			"root",
			"e4",
			"e5",
			"Nf3",
		]);
	});
});
