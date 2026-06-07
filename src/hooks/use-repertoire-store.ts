import { Chess } from "chess.js";
import { create } from "zustand";

import type { NodeRow, TreeNode } from "@/lib/tree";
import { buildTree, findNode, findPath } from "@/lib/tree";

interface AddMoveResult {
	node: NodeRow;
	isNew: boolean;
}

interface RepertoireState {
	repertoireId: string | null;
	flatNodes: NodeRow[];
	tree: TreeNode | null;
	currentNodeId: string | null;
	lastMove: { from: string; to: string } | null;

	setRepertoireData: (id: string, nodes: NodeRow[]) => void;
	selectNode: (nodeId: string) => void;
	/**
	 * Adds a move as a child of the given parent, or returns the existing
	 * child if the move already exists. Runs SYNCHRONOUSLY against client
	 * state — no server round-trip — so consecutive moves always validate
	 * against the latest position. Returns the node and whether it was new.
	 */
	addMove: (args: {
		parentId: string;
		move: string;
		fen: string;
		moveNumber: number;
		sideToMove: "white" | "black";
	}) => AddMoveResult;
	updateNode: (nodeId: string, updates: Partial<NodeRow>) => void;
	removeNode: (nodeId: string) => void;
	getCurrentNode: () => TreeNode | null;
	getPath: () => TreeNode[];
	navigateForward: () => void;
	navigateBack: () => void;
}

function computeLastMove(
	flatNodes: NodeRow[],
	nodeId: string,
): { from: string; to: string } | null {
	const node = flatNodes.find((n) => n.id === nodeId);
	const parent = node?.parentId
		? flatNodes.find((n) => n.id === node.parentId)
		: null;

	if (node?.move && parent?.fen) {
		try {
			const chess = new Chess(parent.fen);
			const moveResult = chess.move(node.move);
			if (moveResult) {
				return { from: moveResult.from, to: moveResult.to };
			}
		} catch {
			// Invalid position/move — skip highlight
		}
	}
	return null;
}

export const useRepertoireStore = create<RepertoireState>((set, get) => ({
	repertoireId: null,
	flatNodes: [],
	tree: null,
	currentNodeId: null,
	lastMove: null,

	setRepertoireData: (id, nodes) => {
		const tree = buildTree(nodes);
		const state = get();

		// Preserve the current selection if that node still exists in the new
		// data (e.g. after a background refetch or PGN import). Only fall back
		// to root when switching repertoires or the node was deleted.
		const keepCurrent =
			state.repertoireId === id &&
			state.currentNodeId &&
			nodes.some((n) => n.id === state.currentNodeId);

		const currentNodeId = keepCurrent
			? state.currentNodeId
			: (tree?.id ?? null);

		set({
			repertoireId: id,
			flatNodes: nodes,
			tree,
			currentNodeId,
			lastMove: currentNodeId
				? computeLastMove(nodes, currentNodeId)
				: null,
		});
	},

	selectNode: (nodeId) => {
		const { flatNodes } = get();
		set({
			currentNodeId: nodeId,
			lastMove: computeLastMove(flatNodes, nodeId),
		});
	},

	addMove: ({ parentId, move, fen, moveNumber, sideToMove }) => {
		const state = get();

		// If this move already exists under the parent, just navigate to it
		const existing = state.flatNodes.find(
			(n) => n.parentId === parentId && n.move === move,
		);
		if (existing) {
			set({
				currentNodeId: existing.id,
				lastMove: computeLastMove(state.flatNodes, existing.id),
			});
			return { node: existing, isNew: false };
		}

		// Determine sort order among siblings
		const siblings = state.flatNodes.filter((n) => n.parentId === parentId);
		const maxSort = siblings.reduce((m, s) => Math.max(m, s.sortOrder), -1);

		// Client-generated UUID — no server round-trip needed
		const newNode: NodeRow = {
			id: crypto.randomUUID(),
			repertoireId: state.repertoireId!,
			parentId,
			move,
			fen,
			moveNumber,
			sideToMove,
			note: null,
			lineName: null,
			whiteWinPct: null,
			drawPct: null,
			blackWinPct: null,
			playedPct: null,
			nag: null,
			metadata: null,
			sortOrder: maxSort + 1,
			createdAt: new Date(),
		};

		const newFlatNodes = [...state.flatNodes, newNode];
		set({
			flatNodes: newFlatNodes,
			tree: buildTree(newFlatNodes),
			currentNodeId: newNode.id,
			lastMove: computeLastMove(newFlatNodes, newNode.id),
		});

		return { node: newNode, isNew: true };
	},

	updateNode: (nodeId, updates) => {
		set((state) => {
			const newFlatNodes = state.flatNodes.map((n) =>
				n.id === nodeId ? { ...n, ...updates } : n,
			);
			return { flatNodes: newFlatNodes, tree: buildTree(newFlatNodes) };
		});
	},

	removeNode: (nodeId) => {
		set((state) => {
			const toRemove = new Set<string>();
			const collect = (nid: string) => {
				toRemove.add(nid);
				for (const n of state.flatNodes) {
					if (n.parentId === nid) collect(n.id);
				}
			};
			collect(nodeId);

			const newFlatNodes = state.flatNodes.filter(
				(n) => !toRemove.has(n.id),
			);
			const newTree = buildTree(newFlatNodes);
			const newCurrentId =
				state.currentNodeId && toRemove.has(state.currentNodeId)
					? (state.flatNodes.find((n) => n.id === nodeId)?.parentId ??
						newTree?.id ??
						null)
					: state.currentNodeId;

			return {
				flatNodes: newFlatNodes,
				tree: newTree,
				currentNodeId: newCurrentId,
				lastMove: newCurrentId
					? computeLastMove(newFlatNodes, newCurrentId)
					: null,
			};
		});
	},

	getCurrentNode: () => {
		const { tree, currentNodeId } = get();
		if (!tree || !currentNodeId) return null;
		return findNode(tree, currentNodeId);
	},

	getPath: () => {
		const { tree, currentNodeId } = get();
		if (!tree || !currentNodeId) return [];
		return findPath(tree, currentNodeId);
	},

	navigateForward: () => {
		const current = get().getCurrentNode();
		if (current && current.children.length > 0) {
			get().selectNode(current.children[0]!.id);
		}
	},

	navigateBack: () => {
		const { currentNodeId, flatNodes, selectNode } = get();
		if (!currentNodeId) return;
		const node = flatNodes.find((n) => n.id === currentNodeId);
		if (node?.parentId) {
			selectNode(node.parentId);
		}
	},
}));
