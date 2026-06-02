"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PieceDropHandlerArgs, PieceRenderObject } from "react-chessboard";

import { PIECE_CODES, type PieceCode, getPieceImageUrl } from "@/lib/piece-sets";

const Chessboard = dynamic(
	() => import("react-chessboard").then((mod) => mod.Chessboard),
	{ ssr: false, loading: () => <div className="aspect-square w-full animate-pulse rounded bg-muted" /> },
);

interface ChessBoardProps {
	position: string;
	orientation?: "white" | "black";
	onPieceDrop?: (args: PieceDropHandlerArgs) => boolean;
	lightSquareColor: string;
	darkSquareColor: string;
	pieceSet: string;
	lastMove?: { from: string; to: string } | null;
}

function buildPieceRenderers(pieceSet: string): PieceRenderObject {
	const pieces: PieceRenderObject = {};
	for (const code of PIECE_CODES) {
		const url = getPieceImageUrl(pieceSet, code as PieceCode);
		pieces[code] = () => (
			<div
				style={{
					width: "100%",
					height: "100%",
					backgroundImage: `url(${url})`,
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
				}}
			/>
		);
	}
	return pieces;
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
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const customPieces = useMemo(() => buildPieceRenderers(pieceSet), [pieceSet]);

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

	if (!mounted) return <div className="aspect-square w-full animate-pulse rounded bg-muted" />;

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
