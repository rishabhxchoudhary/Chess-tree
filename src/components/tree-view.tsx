"use client";

import dagre from "dagre";
import { useCallback, useEffect, useMemo } from "react";
import {
	Background,
	Controls,
	type Edge,
	type Node,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { TreeNode } from "@/lib/tree";

interface TreeViewProps {
	tree: TreeNode | null;
	currentNodeId: string | null;
	onSelectNode: (nodeId: string) => void;
}

function layoutTree(tree: TreeNode): { nodes: Node[]; edges: Edge[] } {
	const g = new dagre.graphlib.Graph();
	g.setDefaultEdgeLabel(() => ({}));
	g.setGraph({ rankdir: "TB", nodesep: 30, ranksep: 50 });

	const rfNodes: Node[] = [];
	const rfEdges: Edge[] = [];

	function traverse(node: TreeNode) {
		const label = node.move ?? "Start";
		g.setNode(node.id, { width: 80, height: 36 });
		rfNodes.push({
			id: node.id,
			data: {
				label,
				move: node.move,
				lineName: node.lineName,
			},
			position: { x: 0, y: 0 },
			type: "default",
		});

		for (const child of node.children) {
			rfEdges.push({
				id: `${node.id}-${child.id}`,
				source: node.id,
				target: child.id,
				type: "smoothstep",
			});
			traverse(child);
		}
	}

	traverse(tree);
	dagre.layout(g);

	for (const rfNode of rfNodes) {
		const pos = g.node(rfNode.id);
		if (pos) {
			rfNode.position = { x: pos.x - 40, y: pos.y - 18 };
		}
	}

	return { nodes: rfNodes, edges: rfEdges };
}

export function TreeView({
	tree,
	currentNodeId,
	onSelectNode,
}: TreeViewProps) {
	const layout = useMemo(() => {
		if (!tree) return { nodes: [], edges: [] };
		return layoutTree(tree);
	}, [tree]);

	const [rfNodes, setNodes, onNodesChange] = useNodesState(layout.nodes);
	const [rfEdges, setEdges, onEdgesChange] = useEdgesState(layout.edges);

	useEffect(() => {
		setNodes(layout.nodes);
		setEdges(layout.edges);
	}, [layout, setNodes, setEdges]);

	useEffect(() => {
		setNodes((nds) =>
			nds.map((n) => ({
				...n,
				style: {
					...n.style,
					background: n.id === currentNodeId ? "#769656" : "#fff",
					color: n.id === currentNodeId ? "#fff" : "#000",
					border: "1px solid #ccc",
					borderRadius: "4px",
					padding: "4px 8px",
					fontSize: "13px",
					fontWeight: n.id === currentNodeId ? "bold" : "normal",
				},
			})),
		);
	}, [currentNodeId, setNodes]);

	const handleNodeClick = useCallback(
		(_: React.MouseEvent, node: Node) => {
			onSelectNode(node.id);
		},
		[onSelectNode],
	);

	return (
		<div className="h-full w-full">
			<ReactFlow
				edges={rfEdges}
				fitView
				nodes={rfNodes}
				onEdgesChange={onEdgesChange}
				onNodeClick={handleNodeClick}
				onNodesChange={onNodesChange}
				proOptions={{ hideAttribution: true }}
			>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
}
