"use client";

import { Handle, Position } from "@xyflow/react";
import { memo } from "react";

interface TreeNodeData {
	label: string;
	whiteWinPct: string | null;
	drawPct: string | null;
	blackWinPct: string | null;
	playedPct: string | null;
	lineName: string | null;
	isRoot: boolean;
}

function MiniWinBar({
	w,
	d,
	b,
}: { w: number; d: number; b: number }) {
	const total = w + d + b;
	if (total === 0) return null;

	const wPct = (w / total) * 100;
	const dPct = (d / total) * 100;
	const bPct = (b / total) * 100;

	return (
		<div className="flex h-[6px] w-full overflow-hidden rounded-sm">
			{wPct > 0 && (
				<div
					className="bg-white"
					style={{ width: `${wPct}%` }}
				/>
			)}
			{dPct > 0 && (
				<div
					className="bg-gray-400"
					style={{ width: `${dPct}%` }}
				/>
			)}
			{bPct > 0 && (
				<div
					className="bg-gray-800"
					style={{ width: `${bPct}%` }}
				/>
			)}
		</div>
	);
}

export const TreeMoveNode = memo(function TreeMoveNode({
	data,
}: { data: TreeNodeData }) {
	const w = data.whiteWinPct ? Number.parseFloat(data.whiteWinPct) : 0;
	const d = data.drawPct ? Number.parseFloat(data.drawPct) : 0;
	const b = data.blackWinPct ? Number.parseFloat(data.blackWinPct) : 0;
	const played = data.playedPct ? Number.parseFloat(data.playedPct) : 0;
	const hasStats = w + d + b > 0 || played > 0;

	return (
		<>
			{!data.isRoot && (
				<Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
			)}
			<div className="text-center">
				<div className="font-mono font-bold text-[12px] leading-tight">
					{data.label}
				</div>
				{data.lineName && (
					<div className="truncate text-[9px] italic opacity-60">
						{data.lineName}
					</div>
				)}
				{hasStats && (
					<div className="mt-1 space-y-0.5">
						{played > 0 && (
							<div className="text-[9px] opacity-70">
								{played}% played
							</div>
						)}
						{w + d + b > 0 && (
							<>
								<MiniWinBar w={w} d={d} b={b} />
								<div className="flex justify-between text-[8px] opacity-60">
									<span>{w}%</span>
									<span>{d}%</span>
									<span>{b}%</span>
								</div>
							</>
						)}
					</div>
				)}
			</div>
			<Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
		</>
	);
});
