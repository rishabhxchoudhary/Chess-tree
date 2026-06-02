import crypto from "node:crypto";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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

const testCredentialsProvider =
	process.env.NODE_ENV !== "production" && process.env.TEST_USER_PASSWORD
		? [
				CredentialsProvider({
					name: "Test Account",
					credentials: {
						email: { label: "Email", type: "email" },
						password: { label: "Password", type: "password" },
					},
					async authorize(credentials) {
						if (!credentials?.email || !credentials?.password) return null;

						const email = String(credentials.email);
						const password = String(credentials.password);
						const expectedEmail = process.env.TEST_USER_EMAIL;
						const expectedPassword = process.env.TEST_USER_PASSWORD!;

						if (email !== expectedEmail) return null;

						if (
							password.length !== expectedPassword.length ||
							!crypto.timingSafeEqual(
								Buffer.from(password),
								Buffer.from(expectedPassword),
							)
						)
							return null;

						const user = await db.query.users.findFirst({
							where: eq(users.email, email),
						});

						if (!user) return null;
						return { id: user.id, email: user.email, name: user.name };
					},
				}),
			]
		: [];

export const authConfig = {
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	}),
	session: { strategy: "jwt" },
	providers: [GoogleProvider, ...testCredentialsProvider],
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.id as string,
			},
		}),
	},
} satisfies NextAuthConfig;
