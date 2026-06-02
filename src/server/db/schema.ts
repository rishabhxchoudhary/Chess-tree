import { relations } from "drizzle-orm";
import {
	boolean,
	decimal,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const planEnum = pgEnum("plan", ["free", "pro"]);
export const colorEnum = pgEnum("color", ["white", "black"]);
export const sideEnum = pgEnum("side", ["white", "black"]);

// NextAuth tables
export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull().unique(),
	emailVerified: timestamp("email_verified"),
	image: text("image"),
	plan: planEnum("plan").default("free").notNull(),
});

export const accounts = pgTable("accounts", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: varchar("token_type", { length: 255 }),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: varchar("session_state", { length: 255 }),
});

export const sessions = pgTable("sessions", {
	sessionToken: varchar("session_token", { length: 255 })
		.primaryKey()
		.notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull().unique(),
	expires: timestamp("expires").notNull(),
});

// User preferences
export const userPreferences = pgTable("user_preferences", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id")
		.notNull()
		.unique()
		.references(() => users.id, { onDelete: "cascade" }),
	boardStyle: varchar("board_style", { length: 50 })
		.default("classic")
		.notNull(),
	pieceSet: varchar("piece_set", { length: 50 }).default("kaneo").notNull(),
	boardColors: jsonb("board_colors")
		.$type<{ light: string; dark: string }>()
		.default({ light: "#EEEED2", dark: "#769656" })
		.notNull(),
	siteTheme: varchar("site_theme", { length: 50 }).default("system").notNull(),
	soundEnabled: boolean("sound_enabled").default(true).notNull(),
	showLegalMoves: boolean("show_legal_moves").default(true).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Repertoires
export const repertoires = pgTable("repertoires", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	name: varchar("name", { length: 255 }).notNull(),
	color: colorEnum("color").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Nodes (the opening tree)
export const nodes = pgTable("nodes", {
	id: uuid("id").primaryKey().defaultRandom(),
	repertoireId: uuid("repertoire_id")
		.notNull()
		.references(() => repertoires.id, { onDelete: "cascade" }),
	parentId: uuid("parent_id"),
	move: varchar("move", { length: 10 }),
	fen: varchar("fen", { length: 100 }).notNull(),
	moveNumber: integer("move_number").notNull(),
	sideToMove: sideEnum("side_to_move").notNull(),
	note: text("note"),
	lineName: varchar("line_name", { length: 255 }),
	whiteWinPct: decimal("white_win_pct", { precision: 5, scale: 2 }),
	drawPct: decimal("draw_pct", { precision: 5, scale: 2 }),
	blackWinPct: decimal("black_win_pct", { precision: 5, scale: 2 }),
	playedPct: decimal("played_pct", { precision: 5, scale: 2 }),
	nag: integer("nag"),
	metadata: jsonb("metadata"),
	sortOrder: integer("sort_order").default(0).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
	accounts: many(accounts),
	sessions: many(sessions),
	preferences: one(userPreferences),
	repertoires: many(repertoires),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const userPreferencesRelations = relations(
	userPreferences,
	({ one }) => ({
		user: one(users, {
			fields: [userPreferences.userId],
			references: [users.id],
		}),
	}),
);

export const repertoiresRelations = relations(repertoires, ({ one, many }) => ({
	user: one(users, { fields: [repertoires.userId], references: [users.id] }),
	nodes: many(nodes),
}));

export const nodesRelations = relations(nodes, ({ one, many }) => ({
	repertoire: one(repertoires, {
		fields: [nodes.repertoireId],
		references: [repertoires.id],
	}),
	parent: one(nodes, {
		fields: [nodes.parentId],
		references: [nodes.id],
		relationName: "parentChild",
	}),
	children: many(nodes, { relationName: "parentChild" }),
}));
