"use client";

import { Chess } from "chess.js";
import dynamic from "next/dynamic";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Square } from "react-chessboard/dist/chessboard/types";

import { ChessBoard } from "@/components/chess-board";
import { DetailsPanel } from "@/components/details-panel";
import { ImportPgnDialog } from "@/components/import-pgn-dialog";
import { MoveList } from "@/components/move-list";
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

const TreeView = dynamic(
	() => import("@/components/tree-view").then((mod) => mod.TreeView),
	{ ssr: false },
);

export default function RepertoireEditorPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const { data: session, status } = useSession();
	const { preferences } = usePreferences();
	const boardColors = useBoardColors(preferences);
	const { play } = useChessSounds(preferences.soundEnabled);

	const store = useRepertoireStore();
	const { data: repertoire } = trpc.repertoire.get.useQuery(
		{ id },
		{ enabled: !!session },
	);
	const { data: nodesData } = trpc.node.getTree.useQuery(
		{ repertoireId: id },
		{ enabled: !!session },
	);
	const createNode = trpc.node.create.useMutation();
	const [flipped, setFlipped] = useState(false);

	useEffect(() => {
		if (nodesData) {
			store.setRepertoireData(id, nodesData);
		}
	}, [nodesData, id, store.setRepertoireData]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			)
				return;
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
	}, [store.navigateForward, store.navigateBack]);

	const currentNode = store.getCurrentNode();

	const handleMove = useCallback(
		(sourceSquare: Square, targetSquare: Square): boolean => {
			if (!currentNode) return false;

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

	const boardOrientation = flipped
		? repertoire?.color === "black"
			? "white"
			: "black"
		: repertoire?.color === "black"
			? "black"
			: "white";

	if (status === "loading") {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-muted-foreground">Loading...</p>
			</div>
		);
	}

	if (!session) {
		return (
			<div className="flex h-screen flex-col items-center justify-center gap-4">
				<p className="text-muted-foreground">
					Sign in to access your repertoire
				</p>
				<a href="/api/auth/signin">
					<Button>Sign in with Google</Button>
				</a>
			</div>
		);
	}

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
				{/* Board */}
				<ResizablePanel defaultSize={30} minSize={25}>
					<div className="flex h-full flex-col items-center justify-center p-4">
						<div className="w-full max-w-[560px]">
							<ChessBoard
								darkSquareColor={boardColors.dark}
								lastMove={store.lastMove}
								lightSquareColor={boardColors.light}
								onMove={handleMove}
								orientation={boardOrientation}
								pieceSet={preferences.pieceSet}
								position={currentNode?.fen ?? "start"}
							/>
						</div>
						<div className="mt-2 flex gap-2">
							<Button
								size="sm"
								variant="ghost"
								onClick={() => setFlipped((f) => !f)}
								title="Flip board"
							>
								&#x21C5; Flip
							</Button>
							<Button
								size="sm"
								variant="ghost"
								onClick={() => store.navigateBack()}
								title="Previous move"
							>
								&#x25C0;
							</Button>
							<Button
								size="sm"
								variant="ghost"
								onClick={() => store.navigateForward()}
								title="Next move"
							>
								&#x25B6;
							</Button>
						</div>
					</div>
				</ResizablePanel>

				<ResizableHandle withHandle />

				{/* Tree */}
				<ResizablePanel defaultSize={40} minSize={25}>
					<div className="flex h-full flex-col">
						<div className="border-b px-3 py-1.5">
							<span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
								Opening Tree
							</span>
						</div>
						<div className="flex-1">
							<TreeView
								currentNodeId={store.currentNodeId}
								onSelectNode={(nodeId) => store.selectNode(nodeId)}
								tree={store.tree}
							/>
						</div>
					</div>
				</ResizablePanel>

				<ResizableHandle withHandle />

				{/* Move list + Details */}
				<ResizablePanel defaultSize={30} minSize={20}>
					<ResizablePanelGroup orientation="vertical">
						<ResizablePanel defaultSize={45}>
							<div className="flex h-full flex-col">
								<div className="border-b px-3 py-1.5">
									<span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
										Moves
									</span>
								</div>
								<div className="flex-1 overflow-hidden">
									<MoveList
										currentNodeId={store.currentNodeId}
										onSelectNode={(nodeId) =>
											store.selectNode(nodeId)
										}
										tree={store.tree}
									/>
								</div>
							</div>
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel defaultSize={55}>
							<div className="flex h-full flex-col">
								<div className="border-b px-3 py-1.5">
									<span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
										Details
									</span>
								</div>
								<div className="flex-1 overflow-hidden">
									<DetailsPanel repertoireId={id} />
								</div>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
