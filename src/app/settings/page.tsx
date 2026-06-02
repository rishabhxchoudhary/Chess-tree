"use client";

import { useRouter } from "next/navigation";

import { AccountSection } from "@/components/settings/account-section";
import { BoardStylePicker } from "@/components/settings/board-style-picker";
import { PieceSetPicker } from "@/components/settings/piece-set-picker";
import { PreferencesSection } from "@/components/settings/preferences-section";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
	const router = useRouter();

	return (
		<main className="mx-auto max-w-2xl px-4 py-8">
			<div className="mb-8 flex items-center gap-4">
				<Button variant="ghost" onClick={() => router.back()}>
					&larr; Back
				</Button>
				<h1 className="font-bold text-3xl">Settings</h1>
			</div>

			<div className="space-y-8">
				<BoardStylePicker />
				<Separator />
				<PieceSetPicker />
				<Separator />
				<ThemeToggle />
				<Separator />
				<PreferencesSection />
				<Separator />
				<AccountSection />
			</div>
		</main>
	);
}
