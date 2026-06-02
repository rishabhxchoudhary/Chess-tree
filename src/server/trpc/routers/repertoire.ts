import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { authorize } from "@/lib/authorize";
import { nodes, repertoires } from "@/server/db/schema";
import { createRouter, protectedProcedure } from "@/server/trpc";

const STARTING_FEN =
	"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const repertoireRouter = createRouter({
	list: protectedProcedure.query(async ({ ctx }) => {
		const results = await ctx.db
			.select({
				id: repertoires.id,
				name: repertoires.name,
				color: repertoires.color,
				createdAt: repertoires.createdAt,
				updatedAt: repertoires.updatedAt,
				nodeCount: sql<number>`count(${nodes.id})::int`,
			})
			.from(repertoires)
			.leftJoin(nodes, eq(nodes.repertoireId, repertoires.id))
			.where(eq(repertoires.userId, ctx.session.user.id))
			.groupBy(repertoires.id)
			.orderBy(repertoires.updatedAt);

		return results;
	}),

	get: protectedProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ ctx, input }) => {
			return authorize(input.id, ctx.session.user.id);
		}),

	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1).max(255),
				color: z.enum(["white", "black"]),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [repertoire] = await ctx.db
				.insert(repertoires)
				.values({
					userId: ctx.session.user.id,
					name: input.name,
					color: input.color,
				})
				.returning();

			await ctx.db.insert(nodes).values({
				repertoireId: repertoire!.id,
				parentId: null,
				move: null,
				fen: STARTING_FEN,
				moveNumber: 0,
				sideToMove: "white",
				sortOrder: 0,
			});

			return repertoire;
		}),

	update: protectedProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				name: z.string().min(1).max(255),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await authorize(input.id, ctx.session.user.id);
			const [updated] = await ctx.db
				.update(repertoires)
				.set({ name: input.name, updatedAt: new Date() })
				.where(eq(repertoires.id, input.id))
				.returning();
			return updated;
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string().uuid() }))
		.mutation(async ({ ctx, input }) => {
			await authorize(input.id, ctx.session.user.id);
			await ctx.db.delete(repertoires).where(eq(repertoires.id, input.id));
			return { success: true };
		}),
});
