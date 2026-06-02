"use client";

import { signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AccountSection() {
	const { data: session } = useSession();

	if (!session?.user) return null;

	return (
		<div className="space-y-4">
			<h3 className="font-medium">Account</h3>
			<div className="flex items-center gap-4">
				<Avatar>
					<AvatarImage src={session.user.image ?? undefined} />
					<AvatarFallback>
						{session.user.name?.[0]?.toUpperCase() ?? "?"}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-medium">{session.user.name}</p>
					<p className="text-muted-foreground text-sm">{session.user.email}</p>
				</div>
				<Badge className="ml-auto" variant="outline">
					Free Plan
				</Badge>
			</div>
			<Button onClick={() => signOut({ callbackUrl: "/" })} variant="outline">
				Sign Out
			</Button>
		</div>
	);
}
