"use client";

import { Chess } from "chess.js";
import dynamic from "next/dynamic";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import type { Square } from "react-chessboard/dist/chessboard/types";
import { toast } from "sonner";

import { ChessBoard } from "@/components/chess-board";
import { ImportPgnDialog } from "@/components/import-pgn-dialog";
import { MoveList } from "@/components/move-list";
import { trpc } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WinRateBar } from "@/components/win-rate-bar";
import { useChessSounds } from "@/hooks/use-chess-sounds";
import { useBoardColors, usePreferences } from "@/hooks/use-preferences";
import { useRepertoireStore } from "@/hooks/use-repertoire-store";

const TreeView = dynamic(
	() => import("@/components/tree-view").then((mod) => mod.TreeView),
	{ ssr: false },
);

type RightTab = "moves" | "tree";

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
		{
			enabled: !!session,
			// Store is the source of truth after initial load. Disable
			// background refetches so an in-flight save isn't clobbered by
			// stale server data.
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			staleTime: Number.POSITIVE_INFINITY,
		},
	);
	const createNode = trpc.node.create.useMutation();
	const updateNode = trpc.node.update.useMutation();
	const deleteNode = trpc.node.delete.useMutation();

	const [flipped, setFlipped] = useState(false);
	const [rightTab, setRightTab] = useState<RightTab>("moves");

	// Inline editing state
	const [note, setNote] = useState("");
	const [lineName, setLineName] = useState("");
	const [whiteWin, setWhiteWin] = useState("");
	const [draw, setDraw] = useState("");
	const [blackWin, setBlackWin] = useState("");
	const [played, setPlayed] = useState("");
	const [dirty, setDirty] = useState(false);

	// Load server data into the store. setRepertoireData preserves the current
	// selection if the node still exists, so refetches/imports don't reset the board.
	useEffect(() => {
		if (nodesData) {
			store.setRepertoireData(id, nodesData);
		}
	}, [nodesData, id, store.setRepertoireData]);

	const currentNode = store.getCurrentNode();

	// Sync form state from the store when the selected node changes
	useEffect(() => {
		if (currentNode) {
			setNote(currentNode.note ?? "");
			setLineName(currentNode.lineName ?? "");
			setWhiteWin(currentNode.whiteWinPct ?? "");
			setDraw(currentNode.drawPct ?? "");
			setBlackWin(currentNode.blackWinPct ?? "");
			setPlayed(currentNode.playedPct ?? "");
			setDirty(false);
		}
	}, [currentNode?.id]);

	// Track dirty state on any field change
	const updateField = useCallback(
		(setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setter(e.target.value);
			setDirty(true);
		},
		[],
	);

	// FIX 2 & 3: Explicit save that updates both DB and store
	const saveDetails = useCallback(() => {
		if (!currentNode) return;
		const updates = {
			note: note || null,
			lineName: lineName || null,
			whiteWinPct: whiteWin || null,
			drawPct: draw || null,
			blackWinPct: blackWin || null,
			playedPct: played || null,
		};
		updateNode.mutate(
			{
				id: currentNode.id,
				repertoireId: id,
				...updates,
			},
			{
				onSuccess: (updated) => {
					// FIX 3: Update the store so tree view reflects changes immediately
					if (updated) {
						store.updateNode(currentNode.id, updated);
					}
					setDirty(false);
					toast.success("Saved", { duration: 1500 });
				},
				onError: () => {
					toast.error("Failed to save", { duration: 2000 });
				},
			},
		);
	}, [currentNode, note, lineName, whiteWin, draw, blackWin, played, id, updateNode, store]);

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
				play("move");
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				const node = store.getCurrentNode();
				if (node && node.children.length > 0) {
					const nextMove = node.children[0]!;
					if (nextMove.move) {
						const chess = new Chess(node.fen);
						try {
							const m = chess.move(nextMove.move);
							if (m && chess.isCheckmate()) play("game-end");
							else if (m?.captured) play("capture");
							else if (m?.san === "O-O" || m?.san === "O-O-O")
								play("castle");
							else play("move");
						} catch {
							play("move");
						}
					}
				}
				store.navigateForward();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [store.navigateForward, store.navigateBack, play, store]);

	const handleMove = useCallback(
		(sourceSquare: Square, targetSquare: Square): boolean => {
			// Read the latest current node from the store directly so rapid
			// consecutive moves never validate against a stale closure value.
			const node = store.getCurrentNode();
			if (!node) return false;

			const chess = new Chess(node.fen);
			let move;
			try {
				move = chess.move({
					from: sourceSquare,
					to: targetSquare,
					promotion: "q",
				});
			} catch {
				const turn = node.sideToMove === "white" ? "White" : "Black";
				toast.error(`${turn} to move`, {
					description: "That move is not legal in this position.",
					duration: 2000,
				});
				return false;
			}

			if (!move) return false;

			if (chess.isCheckmate()) play("game-end");
			else if (move.captured) play("capture");
			else if (move.san === "O-O" || move.san === "O-O-O") play("castle");
			else play("move");

			// Apply to client state SYNCHRONOUSLY — board/tree/movelist update
			// instantly and the next move validates against this new node.
			const { node: added, isNew } = store.addMove({
				parentId: node.id,
				move: move.san,
				fen: chess.fen(),
				moveNumber: Math.ceil(chess.moveNumber() / 2),
				sideToMove: chess.turn() === "w" ? "white" : "black",
			});

			// Persist in the background (fire-and-forget). UI never waits.
			if (isNew) {
				createNode.mutate(
					{
						id: added.id,
						repertoireId: id,
						parentId: node.id,
						move: added.move!,
						fen: added.fen,
						moveNumber: added.moveNumber,
						sideToMove: added.sideToMove,
						sortOrder: added.sortOrder,
					},
					{
						onError: () => {
							toast.error("Move not saved", {
								description:
									"Couldn't reach the server. Check your connection.",
								duration: 3000,
							});
						},
					},
				);
			}

			return true;
		},
		[id, createNode, play, store],
	);

	const boardOrientation = flipped
		? repertoire?.color === "black"
			? "white"
			: "black"
		: repertoire?.color === "black"
			? "black"
			: "white";

	const isAtRoot = currentNode?.parentId === null;

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
				<Button onClick={() => signIn()}>Sign in with Google</Button>
			</div>
		);
	}

	return (
		<div className="flex h-screen flex-col">
			{/* Header */}
			<header className="flex items-center justify-between border-b px-4 py-2">
				<Link href="/">
					<Button variant="ghost" size="sm">
						&larr; Back
					</Button>
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

			{/* Main content: 2-column layout */}
			<div className="flex flex-1 overflow-hidden">
				{/* Left column: Board + toolbar + stats + notes */}
				<div className="flex w-[58%] min-w-0 flex-col border-r">
					{/* Board */}
					<div className="flex flex-1 items-center justify-center p-4">
						<div className="w-full max-w-[600px]">
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
					</div>

					{/* Toolbar */}
					<div className="flex items-center justify-center gap-1 border-t px-4 py-1.5">
						<Button
							size="sm"
							variant="ghost"
							onClick={() => {
								const path = store.getPath();
								if (path.length > 0)
									store.selectNode(path[0]!.id);
							}}
							title="Go to start"
						>
							&#x23EE;
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
						<Button
							size="sm"
							variant="ghost"
							onClick={() => {
								let node = currentNode;
								while (node && node.children.length > 0) {
									node = node.children[0]!;
								}
								if (node) store.selectNode(node.id);
							}}
							title="Go to end"
						>
							&#x23ED;
						</Button>
						<div className="mx-2 h-4 w-px bg-border" />
						<Button
							size="sm"
							variant="ghost"
							onClick={() => setFlipped((f) => !f)}
							title="Flip board"
						>
							&#x21C5; Flip
						</Button>
					</div>

					{/* Details area */}
					<div className="space-y-2 border-t px-4 py-3">
						{/* Stats bar */}
						<div className="flex items-center gap-3 text-sm">
							<Input
								className="h-7 max-w-[200px] text-xs"
								disabled={isAtRoot}
								onChange={updateField(setLineName)}
								placeholder="Opening name..."
								value={lineName}
							/>
							<div className="flex items-center gap-1.5">
								<Input
									className="h-7 w-16 text-center text-xs"
									disabled={isAtRoot}
									onChange={updateField(setPlayed)}
									placeholder="%"
									type="number"
									value={played}
								/>
								<span className="text-muted-foreground text-xs">
									played
								</span>
							</div>
							<div className="flex flex-1 items-center gap-2">
								<div className="min-w-[80px] flex-1">
									<WinRateBar
										black={
											blackWin
												? Number.parseFloat(blackWin)
												: null
										}
										draw={
											draw
												? Number.parseFloat(draw)
												: null
										}
										white={
											whiteWin
												? Number.parseFloat(whiteWin)
												: null
										}
									/>
								</div>
								<div className="flex gap-1">
									<Input
										className="h-7 w-14 text-center text-xs"
										disabled={isAtRoot}
										onChange={updateField(setWhiteWin)}
										placeholder="W"
										type="number"
										value={whiteWin}
									/>
									<Input
										className="h-7 w-14 text-center text-xs"
										disabled={isAtRoot}
										onChange={updateField(setDraw)}
										placeholder="D"
										type="number"
										value={draw}
									/>
									<Input
										className="h-7 w-14 text-center text-xs"
										disabled={isAtRoot}
										onChange={updateField(setBlackWin)}
										placeholder="B"
										type="number"
										value={blackWin}
									/>
								</div>
							</div>
						</div>

						{/* Notes */}
						<Textarea
							className="min-h-[60px] resize-y text-sm"
							onChange={updateField(setNote)}
							placeholder={
								isAtRoot
									? "Add notes about this repertoire..."
									: "Add notes about this position..."
							}
							value={note}
						/>

						{/* Actions row */}
						<div className="flex items-center justify-between">
							<Button
								size="sm"
								variant="ghost"
								className="text-destructive text-xs hover:text-destructive"
								disabled={isAtRoot}
								onClick={() => {
									if (
										!currentNode ||
										!confirm(
											"Delete this move and all continuations?",
										)
									)
										return;
									deleteNode.mutate(
										{
											id: currentNode.id,
											repertoireId: id,
										},
										{
											onSuccess: () =>
												store.removeNode(
													currentNode.id,
												),
										},
									);
								}}
							>
								Delete move
							</Button>
							<Button
								size="sm"
								disabled={!dirty}
								onClick={saveDetails}
							>
								{updateNode.isPending ? "Saving..." : dirty ? "Save" : "Saved"}
							</Button>
						</div>
					</div>
				</div>

				{/* Right column: Tabbed moves/tree */}
				<div className="flex w-[42%] min-w-0 flex-col">
					{/* Tabs */}
					<div className="flex border-b">
						<button
							type="button"
							className={`flex-1 px-4 py-2.5 text-center text-sm font-medium transition-colors ${
								rightTab === "moves"
									? "border-b-2 border-primary text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
							onClick={() => setRightTab("moves")}
						>
							Moves
						</button>
						<button
							type="button"
							className={`flex-1 px-4 py-2.5 text-center text-sm font-medium transition-colors ${
								rightTab === "tree"
									? "border-b-2 border-primary text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
							onClick={() => setRightTab("tree")}
						>
							Tree
						</button>
					</div>

					{/* Tab content */}
					<div className="flex-1 overflow-hidden">
						{rightTab === "moves" ? (
							<MoveList
								currentNodeId={store.currentNodeId}
								onSelectNode={(nodeId) =>
									store.selectNode(nodeId)
								}
								tree={store.tree}
							/>
						) : (
							<TreeView
								currentNodeId={store.currentNodeId}
								onSelectNode={(nodeId) =>
									store.selectNode(nodeId)
								}
								tree={store.tree}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
