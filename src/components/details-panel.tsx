"use client";

import { useCallback, useEffect, useState } from "react";

import { trpc } from "@/components/providers";
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
		if (!currentNode) return;
		const updates = {
			id: currentNode.id,
			repertoireId,
			note: note || null,
			lineName: lineName || null,
			whiteWinPct: whiteWin || null,
			drawPct: draw || null,
			blackWinPct: blackWin || null,
		};
		updateNode.mutate(updates, {
			onSuccess: (updated) => {
				if (updated) {
					store.updateNode(currentNode.id, updated);
				}
			},
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
		store,
	]);

	if (!currentNode) {
		return (
			<div className="flex h-full items-center justify-center text-muted-foreground">
				Select a move to see details
			</div>
		);
	}

	if (!currentNode.move) {
		return (
			<div className="flex h-full items-center justify-center text-muted-foreground">
				Starting position
			</div>
		);
	}

	return (
		<div className="space-y-4 p-3">
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
					className="mt-1 text-sm"
					id="note"
					onBlur={save}
					onChange={(e) => setNote(e.target.value)}
					placeholder="Ideas, plans, traps..."
					rows={6}
					value={note}
				/>
			</div>
		</div>
	);
}
