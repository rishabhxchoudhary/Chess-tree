import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/server/db";
import {
	accounts,
	sessions,
	users,
	verificationTokens,
} from "@/server/db/schema";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

export const authConfig = {
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	providers: [GoogleProvider],
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
	},
} satisfies NextAuthConfig;
