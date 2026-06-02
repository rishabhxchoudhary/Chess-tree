"use client";

import { Label } from "@/components/ui/label";
import { usePreferences } from "@/hooks/use-preferences";

export function PreferencesSection() {
	const { preferences, update } = usePreferences();

	return (
		<div className="space-y-4">
			<h3 className="font-medium">Preferences</h3>
			<div className="flex items-center justify-between">
				<Label htmlFor="sound">Sound effects</Label>
				<input
					checked={preferences.soundEnabled}
					id="sound"
					onChange={(e) => update({ soundEnabled: e.target.checked })}
					type="checkbox"
				/>
			</div>
			<div className="flex items-center justify-between">
				<Label htmlFor="legal">Show legal move indicators</Label>
				<input
					checked={preferences.showLegalMoves}
					id="legal"
					onChange={(e) => update({ showLegalMoves: e.target.checked })}
					type="checkbox"
				/>
			</div>
		</div>
	);
}
