export interface PieceSetInfo {
	key: string;
	name: string;
	attribution?: string;
}

export const PIECE_SETS: Record<string, PieceSetInfo> = {
	kaneo: {
		key: "kaneo",
		name: "Kaneo",
		attribution: "Kadagaden, CC-BY-4.0",
	},
	cburnett: {
		key: "cburnett",
		name: "Cburnett",
		attribution: "Colin M.L. Burnett, CC BY-SA 3.0",
	},
	staunty: {
		key: "staunty",
		name: "Staunty",
		attribution: "Staunty design",
	},
	alpha: {
		key: "alpha",
		name: "Alpha",
		attribution: "Eric Bentzen",
	},
};

const PIECE_CODES = [
	"wP",
	"wN",
	"wB",
	"wR",
	"wQ",
	"wK",
	"bP",
	"bN",
	"bB",
	"bR",
	"bQ",
	"bK",
] as const;
export type PieceCode = (typeof PIECE_CODES)[number];

export { PIECE_CODES };

export function getPieceImageUrl(
	pieceSet: string,
	pieceCode: PieceCode,
): string {
	return `/pieces/${pieceSet}/${pieceCode}.svg`;
}
