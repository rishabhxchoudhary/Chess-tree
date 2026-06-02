"use client";

import { usePreferences } from "@/hooks/use-preferences";
import { getPieceImageUrl, PIECE_SETS } from "@/lib/piece-sets";

const PREVIEW_PIECES = ["wK", "wQ", "wR", "wB", "wN", "wP"] as const;

export function PieceSetPicker() {
	const { preferences, update } = usePreferences();

	return (
		<div>
			<h3 className="mb-3 font-medium">Piece Set</h3>
			<div className="grid grid-cols-2 gap-3">
				{Object.values(PIECE_SETS).map((set) => (
					<button
						className={`rounded-lg border-2 p-3 transition-colors ${
							preferences.pieceSet === set.key
								? "border-primary"
								: "border-transparent hover:border-muted-foreground/30"
						}`}
						key={set.key}
						onClick={() => update({ pieceSet: set.key })}
						type="button"
					>
						<div className="flex justify-center gap-1">
							{PREVIEW_PIECES.map((code) => (
								<img
									alt={code}
									height={36}
									key={code}
									src={getPieceImageUrl(set.key, code)}
									width={36}
								/>
							))}
						</div>
						<p className="mt-2 text-center text-sm">{set.name}</p>
					</button>
				))}
			</div>
		</div>
	);
}
