import { Chess } from "chess.js";
import { create } from "zustand";

import type { NodeRow, TreeNode } from "@/lib/tree";
import { buildTree, findNode, findPath } from "@/lib/tree";

interface RepertoireState {
	repertoireId: string | null;
	flatNodes: NodeRow[];
	tree: TreeNode | null;
	currentNodeId: string | null;
	lastMove: { from: string; to: string } | null;

	setRepertoireData: (id: string, nodes: NodeRow[]) => void;
	selectNode: (nodeId: string) => void;
	addNode: (node: NodeRow) => void;
	updateNode: (nodeId: string, updates: Partial<NodeRow>) => void;
	removeNode: (nodeId: string) => void;
	getCurrentNode: () => TreeNode | null;
	getPath: () => TreeNode[];
	navigateForward: () => void;
	navigateBack: () => void;
}

export const useRepertoireStore = create<RepertoireState>((set, get) => ({
	repertoireId: null,
	flatNodes: [],
	tree: null,
	currentNodeId: null,
	lastMove: null,

	setRepertoireData: (id, nodes) => {
		const tree = buildTree(nodes);
		set({
			repertoireId: id,
			flatNodes: nodes,
			tree,
			currentNodeId: tree?.id ?? null,
			lastMove: null,
		});
	},

	selectNode: (nodeId) => {
		const { flatNodes } = get();

		const node = flatNodes.find((n) => n.id === nodeId);
		const parent = node?.parentId
			? flatNodes.find((n) => n.id === node.parentId)
			: null;

		let lastMove: { from: string; to: string } | null = null;
		if (node?.move && parent?.fen) {
			try {
				const chess = new Chess(parent.fen);
				const moveResult = chess.move(node.move);
				if (moveResult) {
					lastMove = { from: moveResult.from, to: moveResult.to };
				}
			} catch {
				// Invalid position or move — skip highlighting
			}
		}

		set({ currentNodeId: nodeId, lastMove });
	},

	addNode: (node) => {
		set((state) => {
			const newFlatNodes = [...state.flatNodes, node];
			const newTree = buildTree(newFlatNodes);
			return { flatNodes: newFlatNodes, tree: newTree };
		});
	},

	updateNode: (nodeId, updates) => {
		set((state) => {
			const newFlatNodes = state.flatNodes.map((n) =>
				n.id === nodeId ? { ...n, ...updates } : n,
			);
			const newTree = buildTree(newFlatNodes);
			return { flatNodes: newFlatNodes, tree: newTree };
		});
	},

	removeNode: (nodeId) => {
		set((state) => {
			const toRemove = new Set<string>();
			const collect = (id: string) => {
				toRemove.add(id);
				for (const n of state.flatNodes) {
					if (n.parentId === id) collect(n.id);
				}
			};
			collect(nodeId);

			const newFlatNodes = state.flatNodes.filter((n) => !toRemove.has(n.id));
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
