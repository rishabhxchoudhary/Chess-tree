"use client";

import { signIn, useSession } from "next-auth/react";

import Link from "next/link";

import { CreateRepertoireDialog } from "@/components/create-repertoire-dialog";
import { trpc } from "@/components/providers";
import { RepertoireCard } from "@/components/repertoire-card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p className="text-muted-foreground">Loading...</p>
			</main>
		);
	}

	if (!session) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-center gap-6">
				<h1 className="font-bold text-4xl">Chess Tree</h1>
				<p className="text-muted-foreground">
					Build and study your opening repertoire
				</p>
				<Button onClick={() => signIn()}>Sign in with Google</Button>
			</main>
		);
	}

	return <AuthenticatedDashboard />;
}

function AuthenticatedDashboard() {
	const { data: repertoires, isLoading } = trpc.repertoire.list.useQuery();

	return (
		<main className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="font-bold text-3xl">My Repertoires</h1>
				<div className="flex items-center gap-2">
					<CreateRepertoireDialog />
					<Link href="/settings">
						<Button variant="ghost" size="sm">Settings</Button>
					</Link>
				</div>
			</div>

			{isLoading ? (
				<p className="text-muted-foreground">Loading repertoires...</p>
			) : repertoires?.length === 0 ? (
				<div className="py-20 text-center">
					<p className="mb-4 text-muted-foreground text-xl">
						No repertoires yet
					</p>
					<p className="text-muted-foreground">
						Create your first repertoire to start building your opening tree.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{repertoires?.map((r) => (
						<RepertoireCard
							color={r.color}
							id={r.id}
							key={r.id}
							name={r.name}
							nodeCount={r.nodeCount}
							updatedAt={r.updatedAt}
						/>
					))}
				</div>
			)}
		</main>
	);
}
