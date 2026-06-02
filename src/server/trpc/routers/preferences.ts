import { eq } from "drizzle-orm";
import { z } from "zod";

import { userPreferences } from "@/server/db/schema";
import { createRouter, protectedProcedure } from "@/server/trpc";

export const preferencesRouter = createRouter({
	get: protectedProcedure.query(async ({ ctx }) => {
		let prefs = await ctx.db.query.userPreferences.findFirst({
			where: eq(userPreferences.userId, ctx.session.user.id),
		});

		if (!prefs) {
			const [created] = await ctx.db
				.insert(userPreferences)
				.values({ userId: ctx.session.user.id })
				.returning();
			prefs = created!;
		}

		return prefs;
	}),

	update: protectedProcedure
		.input(
			z.object({
				boardStyle: z
					.enum(["classic", "wooden", "marble", "tournament", "dark"])
					.optional(),
				pieceSet: z.enum(["kaneo", "cburnett", "staunty", "alpha"]).optional(),
				boardColors: z
					.object({ light: z.string(), dark: z.string() })
					.optional(),
				siteTheme: z.enum(["light", "dark", "wooden", "system"]).optional(),
				soundEnabled: z.boolean().optional(),
				showLegalMoves: z.boolean().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const [updated] = await ctx.db
				.update(userPreferences)
				.set({ ...input, updatedAt: new Date() })
				.where(eq(userPreferences.userId, ctx.session.user.id))
				.returning();
			return updated;
		}),
});
