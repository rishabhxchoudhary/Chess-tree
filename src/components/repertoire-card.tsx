"use client";

import Link from "next/link";
import { useState } from "react";

import { trpc } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RepertoireCardProps {
	id: string;
	name: string;
	color: "white" | "black";
	nodeCount: number;
	updatedAt: Date;
}

export function RepertoireCard({
	id,
	name,
	color,
	nodeCount,
	updatedAt,
}: RepertoireCardProps) {
	const [renameOpen, setRenameOpen] = useState(false);
	const [newName, setNewName] = useState(name);

	const utils = trpc.useUtils();
	const updateMutation = trpc.repertoire.update.useMutation({
		onSuccess: () => {
			utils.repertoire.list.invalidate();
			setRenameOpen(false);
		},
	});
	const deleteMutation = trpc.repertoire.delete.useMutation({
		onSuccess: () => utils.repertoire.list.invalidate(),
	});

	return (
		<>
			<Card className="group relative transition-colors hover:bg-accent">
				<Link href={`/repertoire/${id}`}>
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<CardTitle className="text-lg">{name}</CardTitle>
							<Badge variant={color === "white" ? "outline" : "default"}>
								{color === "white" ? "♔ White" : "♚ Black"}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between text-muted-foreground text-sm">
							<span>{nodeCount} moves</span>
							<span>{updatedAt.toLocaleDateString()}</span>
						</div>
					</CardContent>
				</Link>
				<div className="flex gap-1 border-t px-3 py-1.5 opacity-0 transition-opacity group-hover:opacity-100">
					<Button
						size="sm"
						variant="ghost"
						className="h-7 px-2 text-xs"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setNewName(name);
							setRenameOpen(true);
						}}
					>
						Rename
					</Button>
					<Button
						size="sm"
						variant="ghost"
						className="h-7 px-2 text-xs text-destructive hover:text-destructive"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (
								confirm(
									`Delete "${name}" and all its moves? This cannot be undone.`,
								)
							) {
								deleteMutation.mutate({ id });
							}
						}}
					>
						Delete
					</Button>
				</div>
			</Card>

			<Dialog open={renameOpen} onOpenChange={setRenameOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Rename Repertoire</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<Label htmlFor="rename">Name</Label>
							<Input
								id="rename"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
							/>
						</div>
						<Button
							className="w-full"
							disabled={!newName.trim() || updateMutation.isPending}
							onClick={() =>
								updateMutation.mutate({
									id,
									name: newName.trim(),
								})
							}
						>
							{updateMutation.isPending ? "Saving..." : "Save"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
