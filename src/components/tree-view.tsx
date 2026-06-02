"use client";

import {
	Background,
	Controls,
	type Edge,
	type Node,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import dagre from "dagre";
import { useCallback, useEffect, useMemo } from "react";
import "@xyflow/react/dist/style.css";

import type { TreeNode } from "@/lib/tree";

interface TreeViewProps {
	tree: TreeNode | null;
	currentNodeId: string | null;
	onSelectNode: (nodeId: string) => void;
}

const NODE_WIDTH = 100;
const NODE_HEIGHT = 40;

function layoutTree(tree: TreeNode): { nodes: Node[]; edges: Edge[] } {
	const g = new dagre.graphlib.Graph();
	g.setDefaultEdgeLabel(() => ({}));
	g.setGraph({
		rankdir: "TB",
		nodesep: 40,
		ranksep: 60,
		marginx: 20,
		marginy: 20,
	});

	const rfNodes: Node[] = [];
	const rfEdges: Edge[] = [];

	function traverse(node: TreeNode, depth: number) {
		const label = node.move
			? `${node.moveNumber}${node.sideToMove === "black" ? "." : "..."} ${node.move}`
			: "Start";

		g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
		rfNodes.push({
			id: node.id,
			data: { label, lineName: node.lineName, depth },
			position: { x: 0, y: 0 },
		});

		for (const child of node.children) {
			rfEdges.push({
				id: `${node.id}-${child.id}`,
				source: node.id,
				target: child.id,
				type: "smoothstep",
				style: { stroke: "#769656", strokeWidth: 2 },
			});
			traverse(child, depth + 1);
		}
	}

	traverse(tree, 0);
	dagre.layout(g);

	for (const rfNode of rfNodes) {
		const pos = g.node(rfNode.id);
		if (pos) {
			rfNode.position = {
				x: pos.x - NODE_WIDTH / 2,
				y: pos.y - NODE_HEIGHT / 2,
			};
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
					background: n.id === currentNodeId ? "#769656" : "#1e293b",
					color: n.id === currentNodeId ? "#fff" : "#e2e8f0",
					border:
						n.id === currentNodeId
							? "2px solid #86efac"
							: "1px solid #475569",
					borderRadius: "8px",
					padding: "6px 12px",
					fontSize: "13px",
					fontWeight: n.id === currentNodeId ? "700" : "500",
					fontFamily: "monospace",
					textAlign: "center" as const,
					width: `${NODE_WIDTH}px`,
					cursor: "pointer",
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

	if (!tree) {
		return (
			<div className="flex h-full items-center justify-center text-muted-foreground">
				No moves yet
			</div>
		);
	}

	return (
		<div className="h-full w-full">
			<ReactFlow
				edges={rfEdges}
				fitView
				fitViewOptions={{ padding: 0.3 }}
				nodes={rfNodes}
				onEdgesChange={onEdgesChange}
				onNodeClick={handleNodeClick}
				onNodesChange={onNodesChange}
				proOptions={{ hideAttribution: true }}
				minZoom={0.3}
				maxZoom={2}
			>
				<Background color="#334155" gap={20} />
				<Controls
					showInteractive={false}
					style={{
						background: "#1e293b",
						border: "1px solid #475569",
						borderRadius: "8px",
					}}
				/>
			</ReactFlow>
		</div>
	);
}
