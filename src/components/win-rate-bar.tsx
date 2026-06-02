"use client";

interface WinRateBarProps {
	white: number | null;
	draw: number | null;
	black: number | null;
}

export function WinRateBar({ white, draw, black }: WinRateBarProps) {
	const w = white ?? 0;
	const d = draw ?? 0;
	const b = black ?? 0;
	const total = w + d + b;

	if (total === 0) {
		return (
			<div className="text-muted-foreground text-xs">No win rate data</div>
		);
	}

	const wPct = (w / total) * 100;
	const dPct = (d / total) * 100;
	const bPct = (b / total) * 100;

	return (
		<div className="flex h-5 w-full overflow-hidden rounded font-medium text-xs">
			{wPct > 0 && (
				<div
					className="flex items-center justify-center bg-white text-black"
					style={{ width: `${wPct}%` }}
				>
					{wPct >= 10 && `${Math.round(wPct)}%`}
				</div>
			)}
			{dPct > 0 && (
				<div
					className="flex items-center justify-center bg-gray-400 text-white"
					style={{ width: `${dPct}%` }}
				>
					{dPct >= 10 && `${Math.round(dPct)}%`}
				</div>
			)}
			{bPct > 0 && (
				<div
					className="flex items-center justify-center bg-gray-800 text-white"
					style={{ width: `${bPct}%` }}
				>
					{bPct >= 10 && `${Math.round(bPct)}%`}
				</div>
			)}
		</div>
	);
}
