"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

import { trpc } from "@/components/providers";
import { BOARD_THEMES } from "@/lib/board-themes";

interface Preferences {
	boardStyle: string;
	pieceSet: string;
	boardColors: { light: string; dark: string };
	siteTheme: string;
	soundEnabled: boolean;
	showLegalMoves: boolean;
}

interface PreferencesContextValue {
	preferences: Preferences;
	isLoading: boolean;
	update: (partial: Partial<Preferences>) => void;
}

const DEFAULT_PREFERENCES: Preferences = {
	boardStyle: "classic",
	pieceSet: "kaneo",
	boardColors: { light: "#EEEED2", dark: "#769656" },
	siteTheme: "system",
	soundEnabled: true,
	showLegalMoves: true,
};

const PreferencesContext = createContext<PreferencesContextValue>({
	preferences: DEFAULT_PREFERENCES,
	isLoading: true,
	update: () => {},
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
	const { data, isLoading } = trpc.preferences.get.useQuery(undefined, {
		staleTime: 1000 * 60 * 5,
		retry: false,
	});

	const utils = trpc.useUtils();
	const mutation = trpc.preferences.update.useMutation({
		onSuccess: () => utils.preferences.get.invalidate(),
	});

	const preferences: Preferences = data
		? {
				boardStyle: data.boardStyle,
				pieceSet: data.pieceSet,
				boardColors: data.boardColors as { light: string; dark: string },
				siteTheme: data.siteTheme,
				soundEnabled: data.soundEnabled,
				showLegalMoves: data.showLegalMoves,
			}
		: DEFAULT_PREFERENCES;

	useEffect(() => {
		const root = document.documentElement;
		root.removeAttribute("data-theme");

		if (preferences.siteTheme === "system") {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)",
			).matches;
			root.setAttribute("data-theme", prefersDark ? "dark" : "light");
		} else {
			root.setAttribute("data-theme", preferences.siteTheme);
		}
	}, [preferences.siteTheme]);

	const update = (partial: Partial<Preferences>) => {
		// Cast needed because Preferences uses broad `string` types for extensibility
		// while tRPC input uses narrow enum literals
		mutation.mutate(partial as Parameters<typeof mutation.mutate>[0]);
	};

	return (
		<PreferencesContext.Provider value={{ preferences, isLoading, update }}>
			{children}
		</PreferencesContext.Provider>
	);
}

export function usePreferences() {
	return useContext(PreferencesContext);
}

export function useBoardColors(preferences: Preferences) {
	const theme = BOARD_THEMES[preferences.boardStyle];
	if (theme) {
		return { light: theme.light, dark: theme.dark };
	}
	return preferences.boardColors;
}
