"use client";

import { Chess } from "chess.js";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import type {
	CustomPieces,
	CustomSquareStyles,
	Piece,
	Square,
} from "react-chessboard/dist/chessboard/types";

import { PIECE_CODES, type PieceCode, getPieceImageUrl } from "@/lib/piece-sets";

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
	onMove?: (sourceSquare: Square, targetSquare: Square) => boolean;
	lightSquareColor: string;
	darkSquareColor: string;
	pieceSet: string;
	lastMove?: { from: string; to: string } | null;
}

function buildCustomPieces(pieceSet: string): CustomPieces {
	const pieces: CustomPieces = {};
	for (const code of PIECE_CODES) {
		const url = getPieceImageUrl(pieceSet, code as PieceCode);
		pieces[code as Piece] = ({ squareWidth }) => (
			<img
				alt={code}
				src={url}
				style={{ width: squareWidth, height: squareWidth, pointerEvents: "none" }}
			/>
		);
	}
	return pieces;
}

export function ChessBoard({
	position,
	orientation = "white",
	onMove,
	lightSquareColor,
	darkSquareColor,
	pieceSet,
	lastMove,
}: ChessBoardProps) {
	const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
	const [legalMoves, setLegalMoves] = useState<Square[]>([]);

	const customPieces = useMemo(() => buildCustomPieces(pieceSet), [pieceSet]);

	const customSquareStyles = useMemo<CustomSquareStyles>(() => {
		const styles: Record<string, Record<string, string | number>> = {};

		if (lastMove) {
			styles[lastMove.from] = { backgroundColor: "rgba(155, 199, 0, 0.41)" };
			styles[lastMove.to] = { backgroundColor: "rgba(155, 199, 0, 0.41)" };
		}

		if (selectedSquare) {
			styles[selectedSquare] = {
				backgroundColor: "rgba(255, 255, 0, 0.4)",
			};
		}

		for (const sq of legalMoves) {
			const existing = styles[sq];
			styles[sq] = {
				...existing,
				background: `${existing?.backgroundColor ?? "transparent"} radial-gradient(circle, rgba(0,0,0,0.25) 25%, transparent 25%)`,
				borderRadius: "50%",
			};
		}

		return styles as CustomSquareStyles;
	}, [lastMove, selectedSquare, legalMoves]);

	const clearSelection = useCallback(() => {
		setSelectedSquare(null);
		setLegalMoves([]);
	}, []);

	const handleSquareClick = useCallback(
		(square: Square) => {
			if (selectedSquare && legalMoves.includes(square)) {
				const success = onMove?.(selectedSquare, square);
				clearSelection();
				return success;
			}

			const chess = new Chess(position);
			const moves = chess.moves({ square, verbose: true });

			if (moves.length > 0) {
				setSelectedSquare(square);
				setLegalMoves(moves.map((m) => m.to as Square));
			} else {
				clearSelection();
			}
		},
		[selectedSquare, legalMoves, position, onMove, clearSelection],
	);

	const handlePieceDrop = useCallback(
		(sourceSquare: Square, targetSquare: Square): boolean => {
			clearSelection();
			if (onMove) return onMove(sourceSquare, targetSquare);
			return false;
		},
		[onMove, clearSelection],
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
			customPieces={customPieces}
			onSquareClick={handleSquareClick}
			onPieceDrop={handlePieceDrop}
		/>
	);
}
