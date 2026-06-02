"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
	return (
		<Link href={`/repertoire/${id}`}>
			<Card className="transition-colors hover:bg-accent">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-lg">{name}</CardTitle>
					<Badge variant={color === "white" ? "outline" : "default"}>
						{color === "white" ? "♔ White" : "♚ Black"}
					</Badge>
				</CardHeader>
				<CardContent>
					<div className="flex justify-between text-muted-foreground text-sm">
						<span>{nodeCount} moves</span>
						<span>{updatedAt.toLocaleDateString()}</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
