import { createRouter } from "@/server/trpc";
import { importRouter } from "@/server/trpc/routers/import";
import { nodeRouter } from "@/server/trpc/routers/node";
import { preferencesRouter } from "@/server/trpc/routers/preferences";
import { repertoireRouter } from "@/server/trpc/routers/repertoire";

export const appRouter = createRouter({
	repertoire: repertoireRouter,
	node: nodeRouter,
	preferences: preferencesRouter,
	import: importRouter,
});

export type AppRouter = typeof appRouter;
