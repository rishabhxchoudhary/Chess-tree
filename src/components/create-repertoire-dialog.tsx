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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateRepertoireDialog() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [color, setColor] = useState<"white" | "black">("white");

	const utils = trpc.useUtils();
	const create = trpc.repertoire.create.useMutation({
		onSuccess: () => {
			utils.repertoire.list.invalidate();
			setOpen(false);
			setName("");
		},
	});

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger>
				<Button>New Repertoire</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Repertoire</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g. Classical White"
							value={name}
						/>
					</div>
					<div>
						<Label>Color</Label>
						<div className="mt-2 flex gap-2">
							<Button
								onClick={() => setColor("white")}
								variant={color === "white" ? "default" : "outline"}
							>
								&#9812; White
							</Button>
							<Button
								onClick={() => setColor("black")}
								variant={color === "black" ? "default" : "outline"}
							>
								&#9818; Black
							</Button>
						</div>
					</div>
					<Button
						className="w-full"
						disabled={!name.trim() || create.isPending}
						onClick={() => create.mutate({ name: name.trim(), color })}
					>
						{create.isPending ? "Creating..." : "Create"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
