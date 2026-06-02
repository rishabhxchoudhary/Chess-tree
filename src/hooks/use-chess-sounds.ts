"use client";

import { useCallback, useRef } from "react";

type SoundType = "move" | "capture" | "castle" | "game-end";

export function useChessSounds(enabled: boolean) {
	const audioCache = useRef<Map<SoundType, HTMLAudioElement>>(new Map());

	const play = useCallback(
		(type: SoundType) => {
			if (!enabled) return;

			let audio = audioCache.current.get(type);
			if (!audio) {
				audio = new Audio(`/sounds/${type}.mp3`);
				audioCache.current.set(type, audio);
			}
			audio.currentTime = 0;
			audio.play().catch(() => {});
		},
		[enabled],
	);

	return { play };
}
