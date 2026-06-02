"use client";

import { useCallback, useMemo } from "react";
import {
	Chessboard,
	type PieceDropHandlerArgs,
	type PieceRenderObject,
} from "react-chessboard";

import { PIECE_CODES, type PieceCode, getPieceImageUrl } from "@/lib/piece-sets";

interface ChessBoardProps {
	position: string;
	orientation?: "white" | "black";
	onPieceDrop?: (args: PieceDropHandlerArgs) => boolean;
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
	pieceSet,
	lastMove,
}: ChessBoardProps) {
	const customPieces: PieceRenderObject = useMemo(() => {
		const pieces: PieceRenderObject = {};

		for (const code of PIECE_CODES) {
			pieces[code] = () => (
				<img
					alt={code}
					src={getPieceImageUrl(pieceSet, code as PieceCode)}
					style={{
						pointerEvents: "none",
						width: "100%",
						height: "100%",
					}}
				/>
			);
		}
		return pieces;
	}, [pieceSet]);

	const customSquareStyles = useMemo(() => {
		if (!lastMove) return {};
		return {
			[lastMove.from]: { backgroundColor: "rgba(155, 199, 0, 0.41)" },
			[lastMove.to]: { backgroundColor: "rgba(155, 199, 0, 0.41)" },
		};
	}, [lastMove]);

	const handlePieceDrop = useCallback(
		(args: PieceDropHandlerArgs) => {
			if (onPieceDrop) return onPieceDrop(args);
			return false;
		},
		[onPieceDrop],
	);

	return (
		<Chessboard
			options={{
				id: "chess-tree-board",
				position,
				boardOrientation: orientation,
				pieces: customPieces,
				boardStyle: {
					borderRadius: "4px",
					boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
				},
				darkSquareStyle: { backgroundColor: darkSquareColor },
				lightSquareStyle: { backgroundColor: lightSquareColor },
				squareStyles: customSquareStyles,
				animationDurationInMs: 200,
				onPieceDrop: handlePieceDrop,
			}}
		/>
	);
}
