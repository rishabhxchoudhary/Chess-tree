"use client";

import { usePreferences } from "@/hooks/use-preferences";
import { BOARD_THEMES } from "@/lib/board-themes";

export function BoardStylePicker() {
	const { preferences, update } = usePreferences();

	return (
		<div>
			<h3 className="mb-3 font-medium">Board Style</h3>
			<div className="grid grid-cols-5 gap-3">
				{Object.values(BOARD_THEMES).map((theme) => (
					<button
						className={`rounded-lg border-2 p-2 transition-colors ${
							preferences.boardStyle === theme.key
								? "border-primary"
								: "border-transparent hover:border-muted-foreground/30"
						}`}
						key={theme.key}
						onClick={() => update({ boardStyle: theme.key })}
						type="button"
					>
						<div className="mx-auto grid aspect-square w-full max-w-[80px] grid-cols-4 overflow-hidden rounded">
							{Array.from({ length: 16 }).map((_, i) => {
								const row = Math.floor(i / 4);
								const col = i % 4;
								const isLight = (row + col) % 2 === 0;
								return (
									<div
										key={`${theme.key}-${row}-${col}`}
										style={{
											backgroundColor: isLight ? theme.light : theme.dark,
										}}
									/>
								);
							})}
						</div>
						<p className="mt-1 text-center text-xs">{theme.name}</p>
					</button>
				))}
			</div>
		</div>
	);
}
