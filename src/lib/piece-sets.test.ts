import { describe, expect, it } from "vitest";

import { PIECE_CODES, PIECE_SETS, getPieceImageUrl } from "./piece-sets";

describe("PIECE_SETS", () => {
	it("has all 4 expected sets", () => {
		expect(Object.keys(PIECE_SETS)).toEqual([
			"kaneo",
			"cburnett",
			"staunty",
			"alpha",
		]);
	});

	it("each set has key, name, and attribution", () => {
		for (const set of Object.values(PIECE_SETS)) {
			expect(set.key).toBeTruthy();
			expect(set.name).toBeTruthy();
			expect(set.attribution).toBeTruthy();
		}
	});
});

describe("PIECE_CODES", () => {
	it("has all 12 piece codes", () => {
		expect(PIECE_CODES).toHaveLength(12);
		expect(PIECE_CODES).toContain("wP");
		expect(PIECE_CODES).toContain("wK");
		expect(PIECE_CODES).toContain("bP");
		expect(PIECE_CODES).toContain("bK");
	});
});

describe("getPieceImageUrl", () => {
	it("returns correct URL for kaneo white pawn", () => {
		expect(getPieceImageUrl("kaneo", "wP")).toBe("/pieces/kaneo/wP.svg");
	});

	it("returns correct URL for cburnett black king", () => {
		expect(getPieceImageUrl("cburnett", "bK")).toBe(
			"/pieces/cburnett/bK.svg",
		);
	});
});
