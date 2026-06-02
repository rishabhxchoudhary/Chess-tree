import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const DATABASE_URL =
	process.env.DATABASE_URL ??
	"postgresql://chess:chess@localhost:5432/chess_tree";

const client = postgres(DATABASE_URL);
const db = drizzle(client, { schema });

const TEST_EMAIL = process.env.TEST_USER_EMAIL ?? "test@chesstree.dev";

async function seed() {
	const existing = await db.query.users.findFirst({
		where: eq(schema.users.email, TEST_EMAIL),
	});

	if (existing) {
		console.log(`Test user already exists: ${TEST_EMAIL} (${existing.id})`);
		await client.end();
		return;
	}

	const [user] = await db
		.insert(schema.users)
		.values({
			email: TEST_EMAIL,
			name: "Test User",
		})
		.returning();

	console.log(`Created test user: ${TEST_EMAIL} (${user!.id})`);
	await client.end();
}

seed().catch((err) => {
	console.error("Seed failed:", err);
	process.exit(1);
});
