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
			<div className="font-mono text-sm leading-relaxed">
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
	let needsMoveNumber = true;

	while (current.children.length > 0) {
		const mainChild = current.children[0]!;
		const alternatives = current.children.slice(1);
		const isWhiteMove = mainChild.sideToMove === "black";

		if (isWhiteMove) {
			moves.push(
				<span
					className="mr-1 text-muted-foreground"
					key={`num-${mainChild.id}`}
				>
					{mainChild.moveNumber}.
				</span>,
			);
			needsMoveNumber = false;
		} else if (needsMoveNumber) {
			moves.push(
				<span
					className="mr-1 text-muted-foreground"
					key={`num-${mainChild.id}`}
				>
					{mainChild.moveNumber}...
				</span>,
			);
			needsMoveNumber = false;
		}

		moves.push(
			<MoveSpan
				isCurrent={mainChild.id === currentNodeId}
				key={mainChild.id}
				move={mainChild.move ?? ""}
				onClick={() => onSelectNode(mainChild.id)}
			/>,
		);

		if (isWhiteMove) {
			needsMoveNumber = false;
		} else {
			needsMoveNumber = true;
		}

		for (const alt of alternatives) {
			moves.push(
				<Variation
					currentNodeId={currentNodeId}
					key={`var-${alt.id}`}
					node={alt}
					onSelectNode={onSelectNode}
				/>,
			);
			needsMoveNumber = true;
		}

		current = mainChild;
	}

	return (
		<div className="flex flex-wrap items-start gap-x-1 gap-y-1">
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
	const isWhiteMove = node.sideToMove === "black";
	const moveNum = isWhiteMove
		? `${node.moveNumber}.`
		: `${node.moveNumber}...`;

	return (
		<div className="my-1 w-full rounded-md border-l-2 border-muted-foreground/30 bg-muted/30 py-1 pl-3 pr-1 text-muted-foreground">
			<span className="mr-1 text-xs">{moveNum}</span>
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
			className={`cursor-pointer rounded px-1.5 py-0.5 transition-colors ${
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
