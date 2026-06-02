"use client";

import { useState } from "react";

import { trpc } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ImportPgnDialogProps {
	repertoireId: string;
	onSuccess?: () => void;
}

export function ImportPgnDialog({
	repertoireId,
	onSuccess,
}: ImportPgnDialogProps) {
	const [open, setOpen] = useState(false);
	const [pgn, setPgn] = useState("");

	const utils = trpc.useUtils();
	const importPgn = trpc.import.pgn.useMutation({
		onSuccess: () => {
			utils.node.getTree.invalidate({ repertoireId });
			setOpen(false);
			setPgn("");
			onSuccess?.();
		},
	});

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (ev) => {
			const text = ev.target?.result;
			if (typeof text === "string") setPgn(text);
		};
		reader.readAsText(file);
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger>
				<Button size="sm" variant="outline">
					Import PGN
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>Import PGN</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<Label htmlFor="pgn-file">Upload .pgn file</Label>
						<input
							accept=".pgn"
							className="mt-1 block w-full text-sm"
							id="pgn-file"
							onChange={handleFileUpload}
							type="file"
						/>
					</div>
					<div>
						<Label htmlFor="pgn-text">Or paste PGN</Label>
						<Textarea
							className="mt-1 font-mono text-sm"
							id="pgn-text"
							onChange={(e) => setPgn(e.target.value)}
							placeholder="1. e4 e5 2. Nf3 Nc6 ..."
							rows={10}
							value={pgn}
						/>
					</div>
					<Button
						className="w-full"
						disabled={!pgn.trim() || importPgn.isPending}
						onClick={() => importPgn.mutate({ repertoireId, pgn })}
					>
						{importPgn.isPending ? "Importing..." : "Import"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
