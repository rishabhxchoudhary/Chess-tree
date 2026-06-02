"use client";

import { useCallback, useEffect, useState } from "react";

import { trpc } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { WinRateBar } from "@/components/win-rate-bar";
import { useRepertoireStore } from "@/hooks/use-repertoire-store";

interface DetailsPanelProps {
	repertoireId: string;
}

export function DetailsPanel({ repertoireId }: DetailsPanelProps) {
	const store = useRepertoireStore();
	const currentNode = store.getCurrentNode();
	const updateNode = trpc.node.update.useMutation();
	const deleteNode = trpc.node.delete.useMutation();

	const [note, setNote] = useState("");
	const [lineName, setLineName] = useState("");
	const [whiteWin, setWhiteWin] = useState("");
	const [draw, setDraw] = useState("");
	const [blackWin, setBlackWin] = useState("");

	useEffect(() => {
		if (currentNode) {
			setNote(currentNode.note ?? "");
			setLineName(currentNode.lineName ?? "");
			setWhiteWin(currentNode.whiteWinPct ?? "");
			setDraw(currentNode.drawPct ?? "");
			setBlackWin(currentNode.blackWinPct ?? "");
		}
	}, [currentNode?.id]);

	const save = useCallback(() => {
		if (!currentNode || !currentNode.move) return;
		updateNode.mutate({
			id: currentNode.id,
			repertoireId,
			note: note || null,
			lineName: lineName || null,
			whiteWinPct: whiteWin || null,
			drawPct: draw || null,
			blackWinPct: blackWin || null,
		});
	}, [
		currentNode,
		note,
		lineName,
		whiteWin,
		draw,
		blackWin,
		repertoireId,
		updateNode,
	]);

	if (!currentNode || !currentNode.move) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
				<p className="font-medium text-muted-foreground">Starting position</p>
				<p className="text-muted-foreground/60 text-xs">
					Make a move on the board to start building your repertoire
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-3 overflow-y-auto p-3">
			<div className="flex items-center gap-2">
				<span className="rounded bg-primary/10 px-2 py-0.5 font-mono font-bold text-primary text-sm">
					{currentNode.moveNumber}
					{currentNode.sideToMove === "black" ? "." : "..."}{" "}
					{currentNode.move}
				</span>
			</div>

			<div>
				<Label className="text-xs" htmlFor="lineName">
					Opening Name
				</Label>
				<Input
					className="mt-1 h-8 text-sm"
					id="lineName"
					onBlur={save}
					onChange={(e) => setLineName(e.target.value)}
					placeholder="e.g. Sicilian: Najdorf"
					value={lineName}
				/>
			</div>

			<div>
				<Label className="text-xs">Win Rate</Label>
				<WinRateBar
					black={blackWin ? Number.parseFloat(blackWin) : null}
					draw={draw ? Number.parseFloat(draw) : null}
					white={whiteWin ? Number.parseFloat(whiteWin) : null}
				/>
				<div className="mt-1 flex gap-2">
					<Input
						className="h-7 text-xs"
						onBlur={save}
						onChange={(e) => setWhiteWin(e.target.value)}
						placeholder="W%"
						type="number"
						value={whiteWin}
					/>
					<Input
						className="h-7 text-xs"
						onBlur={save}
						onChange={(e) => setDraw(e.target.value)}
						placeholder="D%"
						type="number"
						value={draw}
					/>
					<Input
						className="h-7 text-xs"
						onBlur={save}
						onChange={(e) => setBlackWin(e.target.value)}
						placeholder="B%"
						type="number"
						value={blackWin}
					/>
				</div>
			</div>

			<Separator />

			<div>
				<Label className="text-xs" htmlFor="note">
					Notes
				</Label>
				<Textarea
					className="mt-1 min-h-[120px] text-sm"
					id="note"
					onBlur={save}
					onChange={(e) => setNote(e.target.value)}
					placeholder="Ideas, plans, traps to watch for..."
					value={note}
				/>
			</div>

			<Separator />

			<Button
				className="w-full"
				variant="destructive"
				size="sm"
				onClick={() => {
					if (!confirm("Delete this move and all its continuations?"))
						return;
					deleteNode.mutate(
						{ id: currentNode.id, repertoireId },
						{
							onSuccess: () => {
								store.removeNode(currentNode.id);
							},
						},
					);
				}}
			>
				Delete move
			</Button>
		</div>
	);
}
