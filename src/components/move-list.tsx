"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { TreeNode } from "@/lib/tree";

interface MoveListProps {
	tree: TreeNode | null;
	currentNodeId: string | null;
	onSelectNode: (nodeId: string) => void;
}

export function MoveList({ tree, currentNodeId, onSelectNode }: MoveListProps) {
	if (!tree) return null;

	return (
		<ScrollArea className="h-full p-3">
			<div className="font-mono text-sm">
				<MainLine
					currentNodeId={currentNodeId}
					node={tree}
					onSelectNode={onSelectNode}
				/>
			</div>
		</ScrollArea>
	);
}

function MainLine({
	node,
	currentNodeId,
	onSelectNode,
}: {
	node: TreeNode;
	currentNodeId: string | null;
	onSelectNode: (nodeId: string) => void;
}) {
	const moves: React.ReactNode[] = [];
	let current = node;

	while (current.children.length > 0) {
		const mainChild = current.children[0]!;
		const alternatives = current.children.slice(1);

		if (mainChild.sideToMove === "black") {
			moves.push(
				<span
					key={`num-${mainChild.id}`}
					className="mr-1 text-muted-foreground"
				>
					{mainChild.moveNumber}.
				</span>,
			);
		} else if (moves.length === 0 || alternatives.length > 0) {
			moves.push(
				<span
					key={`num-${mainChild.id}`}
					className="mr-1 text-muted-foreground"
				>
					{mainChild.moveNumber}...
				</span>,
			);
		}

		moves.push(
			<MoveSpan
				key={mainChild.id}
				isCurrent={mainChild.id === currentNodeId}
				move={mainChild.move ?? ""}
				onClick={() => onSelectNode(mainChild.id)}
			/>,
		);

		for (const alt of alternatives) {
			moves.push(
				<Variation
					key={`var-${alt.id}`}
					currentNodeId={currentNodeId}
					node={alt}
					onSelectNode={onSelectNode}
				/>,
			);
		}

		current = mainChild;
	}

	return (
		<div className="flex flex-wrap items-start gap-x-1 gap-y-0.5">
			{moves}
		</div>
	);
}

function Variation({
	node,
	currentNodeId,
	onSelectNode,
}: {
	node: TreeNode;
	currentNodeId: string | null;
	onSelectNode: (nodeId: string) => void;
}) {
	return (
		<div className="my-1 w-full rounded border-l-2 border-muted-foreground/30 pl-2 text-muted-foreground">
			<span className="mr-1 text-xs">
				{node.sideToMove === "black"
					? `${node.moveNumber}.`
					: `${node.moveNumber}...`}
			</span>
			<MoveSpan
				isCurrent={node.id === currentNodeId}
				move={node.move ?? ""}
				onClick={() => onSelectNode(node.id)}
			/>
			{node.children.length > 0 && (
				<MainLine
					currentNodeId={currentNodeId}
					node={node}
					onSelectNode={onSelectNode}
				/>
			)}
		</div>
	);
}

function MoveSpan({
	move,
	isCurrent,
	onClick,
}: {
	move: string;
	isCurrent: boolean;
	onClick: () => void;
}) {
	return (
		<button
			className={`cursor-pointer rounded px-1 py-0.5 ${
				isCurrent
					? "bg-primary font-bold text-primary-foreground"
					: "hover:bg-accent"
			}`}
			onClick={onClick}
			type="button"
		>
			{move}
		</button>
	);
}
