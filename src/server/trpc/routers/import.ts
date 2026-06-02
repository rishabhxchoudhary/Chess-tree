import { z } from "zod";

import { authorize } from "@/lib/authorize";
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
			// Full implementation in Task 8
			return { imported: 0 };
		}),
});
