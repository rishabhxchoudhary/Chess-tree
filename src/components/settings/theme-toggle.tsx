"use client";

import { Button } from "@/components/ui/button";
import { usePreferences } from "@/hooks/use-preferences";
import { SITE_THEMES } from "@/lib/board-themes";

const THEME_LABELS: Record<string, string> = {
	light: "Light",
	dark: "Dark",
	wooden: "Wooden",
	system: "System",
};

export function ThemeToggle() {
	const { preferences, update } = usePreferences();

	return (
		<div>
			<h3 className="mb-3 font-medium">Site Theme</h3>
			<div className="flex gap-2">
				{SITE_THEMES.map((theme) => (
					<Button
						key={theme}
						onClick={() => update({ siteTheme: theme })}
						variant={preferences.siteTheme === theme ? "default" : "outline"}
					>
						{THEME_LABELS[theme]}
					</Button>
				))}
			</div>
		</div>
	);
}
