"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo } from "react";
import type { Square, Piece } from "react-chessboard/dist/chessboard/types";

const Chessboard = dynamic(
	() => import("react-chessboard").then((mod) => mod.Chessboard),
	{
		ssr: false,
		loading: () => (
			<div className="aspect-square w-full animate-pulse rounded bg-muted" />
		),
	},
);

interface ChessBoardProps {
	position: string;
	orientation?: "white" | "black";
	onPieceDrop?: (
		sourceSquare: Square,
		targetSquare: Square,
		piece: Piece,
	) => boolean;
	lightSquareColor: string;
	darkSquareColor: string;
	pieceSet: string;
	lastMove?: { from: string; to: string } | null;
}

export function ChessBoard({
	position,
	orientation = "white",
	onPieceDrop,
	lightSquareColor,
	darkSquareColor,
	lastMove,
}: ChessBoardProps) {
	const customSquareStyles = useMemo(() => {
		if (!lastMove) return {};
		return {
			[lastMove.from]: { backgroundColor: "rgba(155, 199, 0, 0.41)" },
			[lastMove.to]: { backgroundColor: "rgba(155, 199, 0, 0.41)" },
		};
	}, [lastMove]);

	const handlePieceDrop = useCallback(
		(sourceSquare: Square, targetSquare: Square, piece: Piece) => {
			if (onPieceDrop)
				return onPieceDrop(sourceSquare, targetSquare, piece);
			return false;
		},
		[onPieceDrop],
	);

	return (
		<Chessboard
			id="chess-tree-board"
			position={position}
			boardOrientation={orientation}
			animationDuration={200}
			customBoardStyle={{
				borderRadius: "4px",
				boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
			}}
			customDarkSquareStyle={{ backgroundColor: darkSquareColor }}
			customLightSquareStyle={{ backgroundColor: lightSquareColor }}
			customSquareStyles={customSquareStyles}
			onPieceDrop={handlePieceDrop}
		/>
	);
}
