import type { TreeNode } from "./tree";

interface LayoutNode {
	id: string;
	label: string;
	x: number;
	y: number;
	whiteWinPct: string | null;
	drawPct: string | null;
	blackWinPct: string | null;
	playedPct: string | null;
	isRoot: boolean;
}

interface LayoutEdge {
	id: string;
	source: string;
	target: string;
}

interface LayoutResult {
	nodes: LayoutNode[];
	edges: LayoutEdge[];
	width: number;
	height: number;
}

const NODE_WIDTH = 130;
const NODE_HEIGHT = 70;
const H_SPACING = 20;
const V_SPACING = 50;

/**
 * Custom tree layout algorithm based on Reingold-Tilford principles.
 *
 * Places root at top center. Each node is positioned directly below its parent.
 * Siblings are spread horizontally, centered under their parent.
 * The tree naturally forms a triangular/pyramid shape as branches fan out.
 */
export function layoutTree(tree: TreeNode): LayoutResult {
	const nodes: LayoutNode[] = [];
	const edges: LayoutEdge[] = [];

	// Phase 1: Calculate subtree widths (in node units)
	const widthCache = new Map<string, number>();

	function subtreeWidth(node: TreeNode): number {
		if (widthCache.has(node.id)) return widthCache.get(node.id)!;

		if (node.children.length === 0) {
			widthCache.set(node.id, 1);
			return 1;
		}

		let total = 0;
		for (const child of node.children) {
			total += subtreeWidth(child);
		}
		const width = Math.max(1, total);
		widthCache.set(node.id, width);
		return width;
	}

	subtreeWidth(tree);

	// Phase 2: Position nodes using subtree widths for balanced spacing
	function positionNode(node: TreeNode, centerX: number, depth: number) {
		const y = depth * (NODE_HEIGHT + V_SPACING);
		const label = node.move
			? `${node.moveNumber}${node.sideToMove === "black" ? "." : "..."} ${node.move}`
			: "Start";

		nodes.push({
			id: node.id,
			label,
			x: centerX - NODE_WIDTH / 2,
			y,
			whiteWinPct: node.whiteWinPct,
			drawPct: node.drawPct,
			blackWinPct: node.blackWinPct,
			playedPct: node.playedPct ?? null,
			isRoot: node.parentId === null,
		});

		for (const child of node.children) {
			edges.push({
				id: `${node.id}-${child.id}`,
				source: node.id,
				target: child.id,
			});
		}

		if (node.children.length === 0) return;

		// Calculate total width needed for all children's subtrees
		const childWidths = node.children.map(
			(c) => subtreeWidth(c) * (NODE_WIDTH + H_SPACING),
		);
		const totalWidth = childWidths.reduce((sum, w) => sum + w, 0);

		// Position children centered under parent
		let currentX = centerX - totalWidth / 2;

		for (let i = 0; i < node.children.length; i++) {
			const child = node.children[i]!;
			const childW = childWidths[i]!;
			const childCenterX = currentX + childW / 2;

			positionNode(child, childCenterX, depth + 1);
			currentX += childW;
		}
	}

	const totalW = subtreeWidth(tree) * (NODE_WIDTH + H_SPACING);
	positionNode(tree, totalW / 2, 0);

	// Calculate bounds
	let maxX = 0;
	let maxY = 0;
	for (const n of nodes) {
		maxX = Math.max(maxX, n.x + NODE_WIDTH);
		maxY = Math.max(maxY, n.y + NODE_HEIGHT);
	}

	return { nodes, edges, width: maxX, height: maxY };
}
