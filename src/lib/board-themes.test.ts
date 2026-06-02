import { describe, expect, it } from "vitest";

import { BOARD_THEMES, SITE_THEMES } from "./board-themes";

describe("BOARD_THEMES", () => {
	it("has all 5 expected themes", () => {
		expect(Object.keys(BOARD_THEMES)).toEqual([
			"classic",
			"wooden",
			"marble",
			"tournament",
			"dark",
		]);
	});

	it("each theme has required fields", () => {
		for (const theme of Object.values(BOARD_THEMES)) {
			expect(theme.key).toBeTruthy();
			expect(theme.name).toBeTruthy();
			expect(theme.light).toMatch(/^#[0-9A-Fa-f]{6}$/);
			expect(theme.dark).toMatch(/^#[0-9A-Fa-f]{6}$/);
		}
	});

	it("classic has green/cream colors", () => {
		expect(BOARD_THEMES.classic!.light).toBe("#EEEED2");
		expect(BOARD_THEMES.classic!.dark).toBe("#769656");
	});

	it("wooden and marble have textures", () => {
		expect(BOARD_THEMES.wooden!.texture).toBe("wooden");
		expect(BOARD_THEMES.marble!.texture).toBe("marble");
	});

	it("classic, tournament, dark have no texture", () => {
		expect(BOARD_THEMES.classic!.texture).toBeUndefined();
		expect(BOARD_THEMES.tournament!.texture).toBeUndefined();
		expect(BOARD_THEMES.dark!.texture).toBeUndefined();
	});
});

describe("SITE_THEMES", () => {
	it("has all 4 expected themes", () => {
		expect([...SITE_THEMES]).toEqual(["light", "dark", "wooden", "system"]);
	});
});
