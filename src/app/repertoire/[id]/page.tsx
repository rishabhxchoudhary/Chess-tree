"use client";

import { Chess } from "chess.js";
import Link from "next/link";
import { use, useCallback, useEffect } from "react";
import type { PieceDropHandlerArgs } from "react-chessboard";

import { ChessBoard } from "@/components/chess-board";
import { ImportPgnDialog } from "@/components/import-pgn-dialog";
import { MoveList } from "@/components/move-list";
import { TreeView } from "@/components/tree-view";
import { trpc } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChessSounds } from "@/hooks/use-chess-sounds";
import { useBoardColors, usePreferences } from "@/hooks/use-preferences";
import { useRepertoireStore } from "@/hooks/use-repertoire-store";

export default function RepertoireEditorPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const { preferences } = usePreferences();
	const boardColors = useBoardColors(preferences);
	const { play } = useChessSounds(preferences.soundEnabled);

	const store = useRepertoireStore();
	const { data: repertoire } = trpc.repertoire.get.useQuery({ id });
	const { data: nodesData } = trpc.node.getTree.useQuery({
		repertoireId: id,
	});
	const createNode = trpc.node.create.useMutation();

	useEffect(() => {
		if (nodesData) {
			store.setRepertoireData(id, nodesData);
		}
	}, [nodesData, id]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				store.navigateBack();
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				store.navigateForward();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const currentNode = store.getCurrentNode();

	const handlePieceDrop = useCallback(
		({ sourceSquare, targetSquare }: PieceDropHandlerArgs): boolean => {
			if (!currentNode || !sourceSquare || !targetSquare) return false;

			const chess = new Chess(currentNode.fen);
			const move = chess.move({
				from: sourceSquare,
				to: targetSquare,
				promotion: "q",
			});

			if (!move) return false;

			if (chess.isCheck()) play("check");
			else if (move.captured) play("capture");
			else if (move.san === "O-O" || move.san === "O-O-O") play("castle");
			else play("move");

			const existing = currentNode.children.find(
				(c) => c.move === move.san,
			);
			if (existing) {
				store.selectNode(existing.id);
				return true;
			}

			createNode.mutate(
				{
					repertoireId: id,
					parentId: currentNode.id,
					move: move.san,
					fen: chess.fen(),
					moveNumber: Math.ceil(chess.moveNumber() / 2),
					sideToMove: chess.turn() === "w" ? "white" : "black",
				},
				{
					onSuccess: (newNode) => {
						if (newNode) {
							store.addNode(newNode);
							store.selectNode(newNode.id);
						}
					},
				},
			);

			return true;
		},
		[currentNode, id, createNode, play, store],
	);

	return (
		<div className="flex h-screen flex-col">
			<header className="flex items-center justify-between border-b px-4 py-2">
				<Link href="/">
					<Button variant="ghost">&larr; Back</Button>
				</Link>
				<h1 className="font-semibold text-lg">
					{repertoire?.name ?? "Loading..."}
				</h1>
				<div className="flex items-center gap-2">
					<ImportPgnDialog repertoireId={id} />
					<Link href="/settings">
						<Button size="sm" variant="ghost">
							Settings
						</Button>
					</Link>
				</div>
			</header>

			<ResizablePanelGroup className="flex-1" orientation="horizontal">
				<ResizablePanel defaultSize={35} minSize={25}>
					<div className="flex h-full items-center justify-center p-4">
						<div className="w-full max-w-[560px]">
							<ChessBoard
								darkSquareColor={boardColors.dark}
								lastMove={store.lastMove}
								lightSquareColor={boardColors.light}
								onPieceDrop={handlePieceDrop}
								orientation={
									repertoire?.color === "black" ? "black" : "white"
								}
								pieceSet={preferences.pieceSet}
								position={currentNode?.fen ?? "start"}
							/>
						</div>
					</div>
				</ResizablePanel>

				<ResizableHandle withHandle />

				<ResizablePanel defaultSize={35} minSize={20}>
					<TreeView
						currentNodeId={store.currentNodeId}
						onSelectNode={(nodeId) => store.selectNode(nodeId)}
						tree={store.tree}
					/>
				</ResizablePanel>

				<ResizableHandle withHandle />

				<ResizablePanel defaultSize={30} minSize={20}>
					<ResizablePanelGroup orientation="vertical">
						<ResizablePanel defaultSize={50}>
							<MoveList
								currentNodeId={store.currentNodeId}
								onSelectNode={(nodeId) => store.selectNode(nodeId)}
								tree={store.tree}
							/>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={50}>
							<div className="flex h-full items-center justify-center text-muted-foreground">
								Details Panel (coming next)
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
