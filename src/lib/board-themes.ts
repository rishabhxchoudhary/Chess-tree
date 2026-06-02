export interface BoardTheme {
	key: string;
	name: string;
	light: string;
	dark: string;
	texture?: string;
}

export const BOARD_THEMES: Record<string, BoardTheme> = {
	classic: {
		key: "classic",
		name: "Classic",
		light: "#EEEED2",
		dark: "#769656",
	},
	wooden: {
		key: "wooden",
		name: "Wooden",
		light: "#E8C99B",
		dark: "#A67B5B",
		texture: "wooden",
	},
	marble: {
		key: "marble",
		name: "Marble",
		light: "#E8E8E8",
		dark: "#8B8B8B",
		texture: "marble",
	},
	tournament: {
		key: "tournament",
		name: "Tournament",
		light: "#E8DFC0",
		dark: "#4E7837",
	},
	dark: {
		key: "dark",
		name: "Dark",
		light: "#3A3A3A",
		dark: "#1A1A1A",
	},
};

export const SITE_THEMES = ["light", "dark", "wooden", "system"] as const;
export type SiteTheme = (typeof SITE_THEMES)[number];
