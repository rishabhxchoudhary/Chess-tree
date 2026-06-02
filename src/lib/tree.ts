import type { nodes } from "@/server/db/schema";

export type NodeRow = typeof nodes.$inferSelect;

export interface TreeNode extends NodeRow {
	children: TreeNode[];
}

export function buildTree(flatNodes: NodeRow[]): TreeNode | null {
	const map = new Map<string, TreeNode>();
	let root: TreeNode | null = null;

	for (const node of flatNodes) {
		map.set(node.id, { ...node, children: [] });
	}

	for (const node of flatNodes) {
		const treeNode = map.get(node.id)!;
		if (node.parentId === null) {
			root = treeNode;
		} else {
			const parent = map.get(node.parentId);
			if (parent) {
				parent.children.push(treeNode);
			}
		}
	}

	for (const node of map.values()) {
		node.children.sort((a, b) => a.sortOrder - b.sortOrder);
	}

	return root;
}

export function findPath(root: TreeNode, targetId: string): TreeNode[] {
	const path: TreeNode[] = [];

	function walk(node: TreeNode): boolean {
		path.push(node);
		if (node.id === targetId) return true;
		for (const child of node.children) {
			if (walk(child)) return true;
		}
		path.pop();
		return false;
	}

	walk(root);
	return path;
}

export function findNode(root: TreeNode, nodeId: string): TreeNode | null {
	if (root.id === nodeId) return root;
	for (const child of root.children) {
		const found = findNode(child, nodeId);
		if (found) return found;
	}
	return null;
}

export function getSiblings(root: TreeNode, nodeId: string): TreeNode[] {
	function findParent(node: TreeNode): TreeNode | null {
		for (const child of node.children) {
			if (child.id === nodeId) return node;
			const found = findParent(child);
			if (found) return found;
		}
		return null;
	}

	const parent = findParent(root);
	return parent ? parent.children : [];
}

export function getMainLine(root: TreeNode): TreeNode[] {
	const line: TreeNode[] = [root];
	let current = root;
	while (current.children.length > 0) {
		current = current.children[0]!;
		line.push(current);
	}
	return line;
}
