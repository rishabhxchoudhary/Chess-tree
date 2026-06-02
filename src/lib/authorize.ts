import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { repertoires } from "@/server/db/schema";

export async function authorize(repertoireId: string, userId: string) {
	const repertoire = await db.query.repertoires.findFirst({
		where: eq(repertoires.id, repertoireId),
	});

	if (!repertoire) {
		throw new TRPCError({ code: "NOT_FOUND", message: "Repertoire not found" });
	}

	if (repertoire.userId !== userId) {
		throw new TRPCError({ code: "FORBIDDEN", message: "Not your repertoire" });
	}

	return repertoire;
}
