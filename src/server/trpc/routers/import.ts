import { eq } from "drizzle-orm";
import { z } from "zod";

import { authorize } from "@/lib/authorize";
import { parsePgnToNodes } from "@/lib/pgn-import";
import { nodes } from "@/server/db/schema";
import { createRouter, protectedProcedure } from "@/server/trpc";

export const importRouter = createRouter({
	pgn: protectedProcedure
		.input(
			z.object({
				repertoireId: z.string().uuid(),
				pgn: z.string().min(1),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await authorize(input.repertoireId, ctx.session.user.id);

			const parsed = parsePgnToNodes(input.pgn);

			const existingNodes = await ctx.db.query.nodes.findMany({
				where: eq(nodes.repertoireId, input.repertoireId),
			});

			const indexToId = new Map<number, string>();

			const root = existingNodes.find((n) => n.parentId === null);
			if (root) indexToId.set(0, root.id);

			let importedCount = 0;

			for (let i = 1; i < parsed.length; i++) {
				const pNode = parsed[i]!;
				const parentDbId = indexToId.get(pNode.parentIndex!);
				if (!parentDbId) continue;

				const existing = existingNodes.find(
					(n) => n.parentId === parentDbId && n.move === pNode.move,
				);

				if (existing) {
					indexToId.set(i, existing.id);
				} else {
					const [created] = await ctx.db
						.insert(nodes)
						.values({
							repertoireId: input.repertoireId,
							parentId: parentDbId,
							move: pNode.move,
							fen: pNode.fen,
							moveNumber: pNode.moveNumber,
							sideToMove: pNode.sideToMove,
							note: pNode.note,
							nag: pNode.nag,
							sortOrder: 0,
						})
						.returning();

					if (created) {
						indexToId.set(i, created.id);
						existingNodes.push(created);
						importedCount++;
					}
				}
			}

			return { imported: importedCount };
		}),
});
