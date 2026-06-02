import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { authorize } from "@/lib/authorize";
import { nodes } from "@/server/db/schema";
import { createRouter, protectedProcedure } from "@/server/trpc";

export const nodeRouter = createRouter({
	getTree: protectedProcedure
		.input(z.object({ repertoireId: z.string().uuid() }))
		.query(async ({ ctx, input }) => {
			await authorize(input.repertoireId, ctx.session.user.id);
			return ctx.db.query.nodes.findMany({
				where: eq(nodes.repertoireId, input.repertoireId),
				orderBy: nodes.sortOrder,
			});
		}),

	create: protectedProcedure
		.input(
			z.object({
				repertoireId: z.string().uuid(),
				parentId: z.string().uuid(),
				move: z.string().min(1).max(10),
				fen: z.string(),
				moveNumber: z.number().int().min(0),
				sideToMove: z.enum(["white", "black"]),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await authorize(input.repertoireId, ctx.session.user.id);

			const existing = await ctx.db.query.nodes.findFirst({
				where: and(
					eq(nodes.repertoireId, input.repertoireId),
					eq(nodes.parentId, input.parentId),
					eq(nodes.move, input.move),
				),
			});

			if (existing) return existing;

			const siblings = await ctx.db.query.nodes.findMany({
				where: and(
					eq(nodes.repertoireId, input.repertoireId),
					eq(nodes.parentId, input.parentId),
				),
			});
			const maxSort = siblings.reduce(
				(max, s) => Math.max(max, s.sortOrder),
				-1,
			);

			const [created] = await ctx.db
				.insert(nodes)
				.values({
					repertoireId: input.repertoireId,
					parentId: input.parentId,
					move: input.move,
					fen: input.fen,
					moveNumber: input.moveNumber,
					sideToMove: input.sideToMove,
					sortOrder: maxSort + 1,
				})
				.returning();

			return created;
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				repertoireId: z.string().uuid(),
				note: z.string().nullable().optional(),
				lineName: z.string().max(255).nullable().optional(),
				whiteWinPct: z.string().nullable().optional(),
				drawPct: z.string().nullable().optional(),
				blackWinPct: z.string().nullable().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await authorize(input.repertoireId, ctx.session.user.id);
			const { id, repertoireId, ...updates } = input;
			const [updated] = await ctx.db
				.update(nodes)
				.set(updates)
				.where(and(eq(nodes.id, id), eq(nodes.repertoireId, repertoireId)))
				.returning();
			return updated;
		}),

	delete: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				repertoireId: z.string().uuid(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await authorize(input.repertoireId, ctx.session.user.id);

			const allNodes = await ctx.db.query.nodes.findMany({
				where: eq(nodes.repertoireId, input.repertoireId),
			});

			const toDelete = new Set<string>();
			const collectDescendants = (parentId: string) => {
				toDelete.add(parentId);
				for (const node of allNodes) {
					if (node.parentId === parentId) {
						collectDescendants(node.id);
					}
				}
			};
			collectDescendants(input.id);

			if (!allNodes.some((n) => n.id === input.id)) {
				return { deleted: 0 };
			}

			for (const nodeId of toDelete) {
				await ctx.db
					.delete(nodes)
					.where(
						and(
							eq(nodes.id, nodeId),
							eq(nodes.repertoireId, input.repertoireId),
						),
					);
			}

			return { deleted: toDelete.size };
		}),

	reorder: protectedProcedure
		.input(
			z.object({
				repertoireId: z.string().uuid(),
				nodeIds: z.array(z.string().uuid()),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await authorize(input.repertoireId, ctx.session.user.id);
			for (let i = 0; i < input.nodeIds.length; i++) {
				await ctx.db
					.update(nodes)
					.set({ sortOrder: i })
					.where(
						and(
							eq(nodes.id, input.nodeIds[i]!),
							eq(nodes.repertoireId, input.repertoireId),
						),
					);
			}
			return { success: true };
		}),
});
