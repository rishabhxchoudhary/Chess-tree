"use client";

import {
	Background,
	Controls,
	type Edge,
	type Node,
	type NodeTypes,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo } from "react";
import "@xyflow/react/dist/style.css";

import { TreeMoveNode } from "@/components/tree-node";
import { layoutTree } from "@/lib/tree-layout";
import type { TreeNode } from "@/lib/tree";

interface TreeViewProps {
	tree: TreeNode | null;
	currentNodeId: string | null;
	onSelectNode: (nodeId: string) => void;
}

const nodeTypes: NodeTypes = {
	moveNode: TreeMoveNode,
};

export function TreeView({
	tree,
	currentNodeId,
	onSelectNode,
}: TreeViewProps) {
	const layout = useMemo(() => {
		if (!tree) return null;
		return layoutTree(tree);
	}, [tree]);

	const rfNodes = useMemo<Node[]>(() => {
		if (!layout) return [];
		return layout.nodes.map((n) => ({
			id: n.id,
			type: "moveNode",
			data: {
				label: n.label,
				whiteWinPct: n.whiteWinPct,
				drawPct: n.drawPct,
				blackWinPct: n.blackWinPct,
				playedPct: n.playedPct,
				isRoot: n.isRoot,
			},
			position: { x: n.x, y: n.y },
		}));
	}, [layout]);

	const rfEdges = useMemo<Edge[]>(() => {
		if (!layout) return [];
		return layout.edges.map((e) => ({
			id: e.id,
			source: e.source,
			target: e.target,
			type: "smoothstep",
			style: { stroke: "#769656", strokeWidth: 2 },
		}));
	}, [layout]);

	const [nodes, setNodes, onNodesChange] = useNodesState(rfNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(rfEdges);

	useEffect(() => {
		setNodes(rfNodes);
		setEdges(rfEdges);
	}, [rfNodes, rfEdges, setNodes, setEdges]);

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
					padding: "6px 10px",
					width: "130px",
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
				edges={edges}
				fitView
				fitViewOptions={{ padding: 0.4, maxZoom: 1.5 }}
				nodes={nodes}
				nodeTypes={nodeTypes}
				onEdgesChange={onEdgesChange}
				onNodeClick={handleNodeClick}
				onNodesChange={onNodesChange}
				proOptions={{ hideAttribution: true }}
				minZoom={0.1}
				maxZoom={2}
				nodesDraggable={false}
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
