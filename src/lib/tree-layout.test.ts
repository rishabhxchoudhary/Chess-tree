import { describe, expect, it } from "vitest";

import { buildTree, type NodeRow } from "./tree";
import { layoutTree } from "./tree-layout";

function makeNode(overrides: Partial<NodeRow> & { id: string }): NodeRow {
	return {
		id: overrides.id,
		repertoireId: "rep-1",
		parentId: overrides.parentId ?? null,
		move: overrides.move ?? null,
		fen: "start",
		moveNumber: overrides.moveNumber ?? 0,
		sideToMove: overrides.sideToMove ?? "white",
		note: null,
		lineName: null,
		whiteWinPct: null,
		drawPct: null,
		blackWinPct: null,
		nag: null,
		metadata: null,
		sortOrder: overrides.sortOrder ?? 0,
		createdAt: new Date(),
	};
}

describe("layoutTree", () => {
	it("places root at top center", () => {
		const tree = buildTree([makeNode({ id: "root" })])!;
		const result = layoutTree(tree);
		expect(result.nodes).toHaveLength(1);
		expect(result.nodes[0]!.y).toBe(0);
	});

	it("places child below parent (not beside)", () => {
		const tree = buildTree([
			makeNode({ id: "root" }),
			makeNode({ id: "e4", parentId: "root", move: "e4" }),
		])!;
		const result = layoutTree(tree);

		const rootNode = result.nodes.find((n) => n.id === "root")!;
		const e4Node = result.nodes.find((n) => n.id === "e4")!;

		// Child must be below parent
		expect(e4Node.y).toBeGreaterThan(rootNode.y);
		// Linear chain: child centered under parent (same x center)
		const rootCenter = rootNode.x + 50;
		const e4Center = e4Node.x + 50;
		expect(e4Center).toBe(rootCenter);
	});

	it("renders a linear chain vertically, not horizontally", () => {
		const tree = buildTree([
			makeNode({ id: "root" }),
			makeNode({ id: "n1", parentId: "root" }),
			makeNode({ id: "n2", parentId: "n1" }),
			makeNode({ id: "n3", parentId: "n2" }),
		])!;
		const result = layoutTree(tree);

		const ys = result.nodes.map((n) => n.y);
		const xs = result.nodes.map((n) => n.x);

		// All nodes should have the same x (vertical line)
		expect(new Set(xs).size).toBe(1);
		// Each node should be lower than the previous
		for (let i = 1; i < ys.length; i++) {
			expect(ys[i]).toBeGreaterThan(ys[i - 1]!);
		}
	});

	it("spreads siblings horizontally under their parent", () => {
		const tree = buildTree([
			makeNode({ id: "root" }),
			makeNode({ id: "e4", parentId: "root", sortOrder: 0 }),
			makeNode({ id: "d4", parentId: "root", sortOrder: 1 }),
			makeNode({ id: "c4", parentId: "root", sortOrder: 2 }),
		])!;
		const result = layoutTree(tree);

		const root = result.nodes.find((n) => n.id === "root")!;
		const e4 = result.nodes.find((n) => n.id === "e4")!;
		const d4 = result.nodes.find((n) => n.id === "d4")!;
		const c4 = result.nodes.find((n) => n.id === "c4")!;

		// All children below root
		expect(e4.y).toBeGreaterThan(root.y);
		expect(d4.y).toBe(e4.y);
		expect(c4.y).toBe(e4.y);

		// Children spread horizontally
		expect(e4.x).toBeLessThan(d4.x);
		expect(d4.x).toBeLessThan(c4.x);

		// Children centered under root
		const childrenCenter = (e4.x + c4.x + 100) / 2;
		const rootCenter = root.x + 50;
		expect(Math.abs(childrenCenter - rootCenter)).toBeLessThan(5);
	});

	it("creates correct edges", () => {
		const tree = buildTree([
			makeNode({ id: "root" }),
			makeNode({ id: "e4", parentId: "root" }),
			makeNode({ id: "e5", parentId: "e4" }),
		])!;
		const result = layoutTree(tree);

		expect(result.edges).toHaveLength(2);
		expect(result.edges).toContainEqual(
			expect.objectContaining({ source: "root", target: "e4" }),
		);
		expect(result.edges).toContainEqual(
			expect.objectContaining({ source: "e4", target: "e5" }),
		);
	});

	it("balances a tree with uneven subtrees", () => {
		const tree = buildTree([
			makeNode({ id: "root" }),
			makeNode({ id: "e4", parentId: "root", sortOrder: 0 }),
			makeNode({ id: "d4", parentId: "root", sortOrder: 1 }),
			makeNode({ id: "e5", parentId: "e4" }),
			makeNode({ id: "Nf3", parentId: "e5" }),
			// d4 has no children — it's a leaf
		])!;
		const result = layoutTree(tree);

		const e4 = result.nodes.find((n) => n.id === "e4")!;
		const d4 = result.nodes.find((n) => n.id === "d4")!;

		// e4 branch is wider (has depth) but both at same depth level
		expect(e4.y).toBe(d4.y);
		// e4 should be to the left of d4
		expect(e4.x).toBeLessThan(d4.x);
	});
});
