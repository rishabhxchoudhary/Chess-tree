# Chess Tree Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-user chess opening repertoire builder with an interactive chessboard, tree visualization, move list, annotations, PGN import, and customizable theming.

**Architecture:** Next.js 15 App Router with tRPC for type-safe API, Drizzle ORM over PostgreSQL for the tree data model, react-chessboard for the board UI, React Flow + dagre for tree visualization, and shadcn/ui for the app shell. User preferences drive all visual customization through a React context provider.

**Tech Stack:** Next.js 15, NextAuth v5 (Google OAuth), PostgreSQL, Drizzle ORM, tRPC, chess.js, react-chessboard v5, @xyflow/react, dagre, shadcn/ui, Tailwind CSS 4

**Spec:** `docs/superpowers/specs/2026-06-02-chess-tree-design.md`

---

## File Structure

```
src/
  app/
    layout.tsx                          — Root layout (ThemeProvider, tRPC provider, session provider)
    page.tsx                            — Dashboard (repertoire list)
    repertoire/[id]/page.tsx            — Repertoire editor page
    settings/page.tsx                   — Settings page
    api/
      auth/[...nextauth]/route.ts       — NextAuth route (existing, modify for Google)
      trpc/[trpc]/route.ts              — tRPC HTTP handler
  components/
    providers.tsx                        — Client providers (session, tRPC, preferences, theme)
    chess-board.tsx                      — Board wrapper (abstracts react-chessboard)
    tree-view.tsx                        — React Flow tree visualization
    move-list.tsx                        — Recursive move list with variations
    details-panel.tsx                    — Note editor, line name, win rate bar
    repertoire-card.tsx                  — Dashboard repertoire card
    create-repertoire-dialog.tsx         — New repertoire form dialog
    import-pgn-dialog.tsx               — PGN import modal
    win-rate-bar.tsx                     — Horizontal white/draw/black bar
    settings/
      board-style-picker.tsx            — Board style visual selector
      piece-set-picker.tsx              — Piece set visual selector
      theme-toggle.tsx                  — Site theme selector
      preferences-section.tsx           — Sound/legal moves toggles
      account-section.tsx               — Plan badge, account info, sign out
  hooks/
    use-preferences.tsx                 — Preferences context + hook
    use-repertoire-store.ts             — Zustand store for editor state (current node, tree, sync)
    use-chess-sounds.ts                 — Sound effect player hook
  lib/
    tree.ts                             — Tree traversal utilities (buildTree, findPath, findSubtree, getSiblings)
    pgn-import.ts                       — PGN parsing and tree merge logic
    authorize.ts                        — Repertoire authorization helper
    board-themes.ts                     — Board style definitions (colors, textures)
    piece-sets.ts                       — Piece set registry and SVG loaders
  server/
    auth/
      config.ts                         — NextAuth config (modify: Discord → Google)
      index.ts                          — Auth exports (existing)
    db/
      index.ts                          — Drizzle client
      schema.ts                         — All table schemas
      migrate.ts                        — Migration runner
    trpc/
      index.ts                          — tRPC initialization + context
      router.ts                         — Root router (merges sub-routers)
      routers/
        repertoire.ts                   — Repertoire CRUD
        node.ts                         — Node CRUD + getTree
        preferences.ts                  — User preferences get/update
        import.ts                       — PGN import
  styles/
    globals.css                         — Global styles + CSS variables for themes
    board-textures.css                  — Board style texture definitions
public/
  pieces/
    kaneo/                              — Kaneo SVGs (wP.svg, wN.svg, ... bK.svg)
    cburnett/                           — Cburnett SVGs
  sounds/
    move.mp3, capture.mp3, check.mp3, castle.mp3, game-end.mp3
drizzle/
  0000_initial.sql                      — Generated migration
drizzle.config.ts                       — Drizzle Kit config
```

---

## Task 1: Install Dependencies and Configure Database

**Files:**
- Modify: `package.json`
- Modify: `src/env.js`
- Modify: `.env.example`
- Create: `drizzle.config.ts`
- Create: `src/server/db/index.ts`
- Create: `src/server/db/schema.ts`

- [ ] **Step 1: Install all required dependencies**

```bash
bun add drizzle-orm postgres @trpc/server @trpc/client @trpc/next @trpc/react-query @tanstack/react-query superjson chess.js react-chessboard @xyflow/react dagre zustand zod
bun add -d drizzle-kit @types/dagre
```

- [ ] **Step 2: Install shadcn/ui dependencies**

```bash
bunx shadcn@latest init -d
bunx shadcn@latest add button card dialog input label textarea tabs separator resizable scroll-area dropdown-menu tooltip avatar badge
```

Follow any prompts — accept defaults. This creates `src/components/ui/` and a `lib/utils.ts` with the `cn()` helper.

- [ ] **Step 3: Update env schema for PostgreSQL and Google OAuth**

Replace the contents of `src/env.js`:

```js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {},
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
```

- [ ] **Step 4: Update `.env.example`**

```
AUTH_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
DATABASE_URL="postgresql://postgres:password@localhost:5432/chess_tree"
```

Also update your local `.env` with real values. You need a running PostgreSQL instance and Google OAuth credentials from Google Cloud Console (APIs & Services → Credentials → OAuth 2.0 Client ID, authorized redirect URI: `http://localhost:3000/api/auth/callback/google`).

- [ ] **Step 5: Create Drizzle config**

Create `drizzle.config.ts`:

```ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

- [ ] **Step 6: Create database client**

Create `src/server/db/index.ts`:

```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });
```

- [ ] **Step 7: Create database schema**

Create `src/server/db/schema.ts`:

```ts
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
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: varchar("token_type", { length: 255 }),
  scope: text("scope"),
  idToken: text("id_token"),
  sessionState: varchar("session_state", { length: 255 }),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
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
  boardStyle: varchar("board_style", { length: 50 }).default("classic").notNull(),
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

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, { fields: [userPreferences.userId], references: [users.id] }),
}));

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
```

- [ ] **Step 8: Generate and run migration**

```bash
bunx drizzle-kit generate
bunx drizzle-kit push
```

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add database schema, Drizzle ORM, and all dependencies"
```

---

## Task 2: Configure Auth (Google OAuth) and tRPC

**Files:**
- Modify: `src/server/auth/config.ts`
- Create: `src/server/trpc/index.ts`
- Create: `src/server/trpc/router.ts`
- Create: `src/server/trpc/routers/repertoire.ts`
- Create: `src/server/trpc/routers/node.ts`
- Create: `src/server/trpc/routers/preferences.ts`
- Create: `src/server/trpc/routers/import.ts`
- Create: `src/app/api/trpc/[trpc]/route.ts`
- Create: `src/lib/authorize.ts`
- Create: `src/components/providers.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Switch auth from Discord to Google**

Replace `src/server/auth/config.ts`:

```ts
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/server/db";
import { accounts, sessions, users, verificationTokens } from "@/server/db/schema";

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
```

Note: Install the Drizzle adapter:

```bash
bun add @auth/drizzle-adapter
```

- [ ] **Step 2: Create the authorization helper**

Create `src/lib/authorize.ts`:

```ts
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
```

- [ ] **Step 3: Create tRPC initialization**

Create `src/server/trpc/index.ts`:

```ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { auth } from "@/server/auth";
import { db } from "@/server/db";

export const createTRPCContext = async () => {
  const session = await auth();
  return { db, session };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: { ...ctx, session: { ...ctx.session, user: ctx.session.user } },
  });
});
```

- [ ] **Step 4: Create repertoire router**

Create `src/server/trpc/routers/repertoire.ts`:

```ts
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { authorize } from "@/lib/authorize";
import { nodes, repertoires } from "@/server/db/schema";
import { createRouter, protectedProcedure } from "@/server/trpc";

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

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

      // Create root node
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
```

- [ ] **Step 5: Create node router**

Create `src/server/trpc/routers/node.ts`:

```ts
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

      // Check if this move already exists as a child
      const existing = await ctx.db.query.nodes.findFirst({
        where: and(
          eq(nodes.repertoireId, input.repertoireId),
          eq(nodes.parentId, input.parentId),
          eq(nodes.move, input.move),
        ),
      });

      if (existing) return existing;

      // Find max sortOrder among siblings
      const siblings = await ctx.db.query.nodes.findMany({
        where: and(
          eq(nodes.repertoireId, input.repertoireId),
          eq(nodes.parentId, input.parentId),
        ),
      });
      const maxSort = siblings.reduce((max, s) => Math.max(max, s.sortOrder), -1);

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
        .where(eq(nodes.id, id))
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
      // Cascade delete: DB handles children via a recursive approach
      // We delete the node; children are orphaned but we clean them up
      // Actually, let's collect all descendants first
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

      for (const nodeId of toDelete) {
        await ctx.db.delete(nodes).where(eq(nodes.id, nodeId));
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
          .where(eq(nodes.id, input.nodeIds[i]!));
      }
      return { success: true };
    }),
});
```

- [ ] **Step 6: Create preferences router**

Create `src/server/trpc/routers/preferences.ts`:

```ts
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
        boardStyle: z.enum(["classic", "wooden", "marble", "tournament", "dark"]).optional(),
        pieceSet: z.enum(["kaneo", "cburnett", "staunty", "alpha"]).optional(),
        boardColors: z.object({ light: z.string(), dark: z.string() }).optional(),
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
```

- [ ] **Step 7: Create import router (stub for now, full logic in Task 8)**

Create `src/server/trpc/routers/import.ts`:

```ts
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
      // Implementation in Task 8
      return { imported: 0 };
    }),
});
```

- [ ] **Step 8: Create root router**

Create `src/server/trpc/router.ts`:

```ts
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
```

- [ ] **Step 9: Create tRPC API route**

Create `src/app/api/trpc/[trpc]/route.ts`:

```ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createTRPCContext } from "@/server/trpc";
import { appRouter } from "@/server/trpc/router";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
```

- [ ] **Step 10: Create client providers**

Create `src/components/providers.tsx`:

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import superjson from "superjson";

import type { AppRouter } from "@/server/trpc/router";

export const trpc = createTRPCReact<AppRouter>();

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <SessionProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </SessionProvider>
  );
}
```

- [ ] **Step 11: Update root layout**

Replace `src/app/layout.tsx`:

```tsx
import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Chess Tree",
  description: "Build and study your chess opening repertoire",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable}`} lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 12: Verify the app starts without errors**

```bash
bun run dev
```

Visit `http://localhost:3000` — should render without crashing. Auth and tRPC endpoints should be reachable. Test `/api/auth/signin` shows Google sign-in.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: configure Google OAuth, tRPC routers, and client providers"
```

---

## Task 3: Tree Utility Library and Board Theme Definitions

**Files:**
- Create: `src/lib/tree.ts`
- Create: `src/lib/board-themes.ts`
- Create: `src/lib/piece-sets.ts`

- [ ] **Step 1: Create tree utility library**

Create `src/lib/tree.ts`:

```ts
import type { nodes } from "@/server/db/schema";

export type NodeRow = typeof nodes.$inferSelect;

export interface TreeNode extends NodeRow {
  children: TreeNode[];
}

export function buildTree(flatNodes: NodeRow[]): TreeNode | null {
  const map = new Map<string, TreeNode>();
  let root: TreeNode | null = null;

  for (const node of flatNodes) {
    map.set(node.id, { ...node, children: [] });
  }

  for (const node of flatNodes) {
    const treeNode = map.get(node.id)!;
    if (node.parentId === null) {
      root = treeNode;
    } else {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(treeNode);
      }
    }
  }

  // Sort children by sortOrder
  for (const node of map.values()) {
    node.children.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return root;
}

export function findPath(root: TreeNode, targetId: string): TreeNode[] {
  const path: TreeNode[] = [];

  function walk(node: TreeNode): boolean {
    path.push(node);
    if (node.id === targetId) return true;
    for (const child of node.children) {
      if (walk(child)) return true;
    }
    path.pop();
    return false;
  }

  walk(root);
  return path;
}

export function findNode(root: TreeNode, nodeId: string): TreeNode | null {
  if (root.id === nodeId) return root;
  for (const child of root.children) {
    const found = findNode(child, nodeId);
    if (found) return found;
  }
  return null;
}

export function getSiblings(root: TreeNode, nodeId: string): TreeNode[] {
  function findParent(node: TreeNode): TreeNode | null {
    for (const child of node.children) {
      if (child.id === nodeId) return node;
      const found = findParent(child);
      if (found) return found;
    }
    return null;
  }

  const parent = findParent(root);
  return parent ? parent.children : [];
}

export function getMainLine(root: TreeNode): TreeNode[] {
  const line: TreeNode[] = [root];
  let current = root;
  while (current.children.length > 0) {
    current = current.children[0]!;
    line.push(current);
  }
  return line;
}
```

- [ ] **Step 2: Create board theme definitions**

Create `src/lib/board-themes.ts`:

```ts
export interface BoardTheme {
  key: string;
  name: string;
  light: string;
  dark: string;
  texture?: string;
}

export const BOARD_THEMES: Record<string, BoardTheme> = {
  classic: {
    key: "classic",
    name: "Classic",
    light: "#EEEED2",
    dark: "#769656",
  },
  wooden: {
    key: "wooden",
    name: "Wooden",
    light: "#E8C99B",
    dark: "#A67B5B",
    texture: "wooden",
  },
  marble: {
    key: "marble",
    name: "Marble",
    light: "#E8E8E8",
    dark: "#8B8B8B",
    texture: "marble",
  },
  tournament: {
    key: "tournament",
    name: "Tournament",
    light: "#E8DFC0",
    dark: "#4E7837",
  },
  dark: {
    key: "dark",
    name: "Dark",
    light: "#3A3A3A",
    dark: "#1A1A1A",
  },
};

export const SITE_THEMES = ["light", "dark", "wooden", "system"] as const;
export type SiteTheme = (typeof SITE_THEMES)[number];
```

- [ ] **Step 3: Create piece set registry**

Create `src/lib/piece-sets.ts`:

```ts
export interface PieceSetInfo {
  key: string;
  name: string;
  attribution?: string;
}

export const PIECE_SETS: Record<string, PieceSetInfo> = {
  kaneo: {
    key: "kaneo",
    name: "Kaneo",
    attribution: "Kadagaden, CC-BY-4.0",
  },
  cburnett: {
    key: "cburnett",
    name: "Cburnett",
    attribution: "Colin M.L. Burnett, CC BY-SA 3.0",
  },
  staunty: {
    key: "staunty",
    name: "Staunty",
    attribution: "Staunty design",
  },
  alpha: {
    key: "alpha",
    name: "Alpha",
    attribution: "Eric Bentzen",
  },
};

// Maps piece codes to filenames. react-chessboard uses codes like "wP", "bK", etc.
const PIECE_CODES = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"] as const;
export type PieceCode = (typeof PIECE_CODES)[number];

export function getPieceImageUrl(pieceSet: string, pieceCode: PieceCode): string {
  return `/pieces/${pieceSet}/${pieceCode}.svg`;
}

export function getCustomPieces(pieceSet: string) {
  const pieces: Record<string, (props: { squareWidth: number }) => JSX.Element> = {};
  for (const code of PIECE_CODES) {
    pieces[code] = ({ squareWidth }: { squareWidth: number }) => {
      // Returns an img element — react-chessboard renders this in each square
      const img = document.createElement("img");
      img.src = getPieceImageUrl(pieceSet, code);
      img.style.width = `${squareWidth}px`;
      img.style.height = `${squareWidth}px`;
      // We'll use a React approach in the actual component; this is the shape
      return null as unknown as JSX.Element;
    };
  }
  return pieces;
}
```

Note: The `getCustomPieces` function above is a placeholder shape. The actual React implementation will be in the `chess-board.tsx` component (Task 5) using proper JSX image elements.

- [ ] **Step 4: Commit**

```bash
git add src/lib/tree.ts src/lib/board-themes.ts src/lib/piece-sets.ts
git commit -m "feat: add tree utilities, board themes, and piece set registry"
```

---

## Task 4: Dashboard Page (Repertoire List + Create)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/repertoire-card.tsx`
- Create: `src/components/create-repertoire-dialog.tsx`

- [ ] **Step 1: Create repertoire card component**

Create `src/components/repertoire-card.tsx`:

```tsx
"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RepertoireCardProps {
  id: string;
  name: string;
  color: "white" | "black";
  nodeCount: number;
  updatedAt: Date;
}

export function RepertoireCard({ id, name, color, nodeCount, updatedAt }: RepertoireCardProps) {
  return (
    <Link href={`/repertoire/${id}`}>
      <Card className="transition-colors hover:bg-accent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant={color === "white" ? "outline" : "default"}>
            {color === "white" ? "♔ White" : "♚ Black"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-muted-foreground text-sm">
            <span>{nodeCount} moves</span>
            <span>{updatedAt.toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: Create repertoire creation dialog**

Create `src/components/create-repertoire-dialog.tsx`:

```tsx
"use client";

import { useState } from "react";

import { trpc } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateRepertoireDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState<"white" | "black">("white");

  const utils = trpc.useUtils();
  const create = trpc.repertoire.create.useMutation({
    onSuccess: () => {
      utils.repertoire.list.invalidate();
      setOpen(false);
      setName("");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Repertoire</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Repertoire</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="e.g. Classical White"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label>Color</Label>
            <div className="mt-2 flex gap-2">
              <Button
                variant={color === "white" ? "default" : "outline"}
                onClick={() => setColor("white")}
              >
                &#9812; White
              </Button>
              <Button
                variant={color === "black" ? "default" : "outline"}
                onClick={() => setColor("black")}
              >
                &#9818; Black
              </Button>
            </div>
          </div>
          <Button
            className="w-full"
            disabled={!name.trim() || create.isPending}
            onClick={() => create.mutate({ name: name.trim(), color })}
          >
            {create.isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 3: Build the dashboard page**

Replace `src/app/page.tsx`:

```tsx
"use client";

import { useSession } from "next-auth/react";

import { CreateRepertoireDialog } from "@/components/create-repertoire-dialog";
import { trpc } from "@/components/providers";
import { RepertoireCard } from "@/components/repertoire-card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6">
        <h1 className="font-bold text-4xl">Chess Tree</h1>
        <p className="text-muted-foreground">Build and study your opening repertoire</p>
        <Button asChild>
          <a href="/api/auth/signin">Sign in with Google</a>
        </Button>
      </main>
    );
  }

  return <AuthenticatedDashboard />;
}

function AuthenticatedDashboard() {
  const { data: repertoires, isLoading } = trpc.repertoire.list.useQuery();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-bold text-3xl">My Repertoires</h1>
        <CreateRepertoireDialog />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading repertoires...</p>
      ) : repertoires?.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mb-4 text-muted-foreground text-xl">No repertoires yet</p>
          <p className="text-muted-foreground">Create your first repertoire to start building your opening tree.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {repertoires?.map((r) => (
            <RepertoireCard
              key={r.id}
              color={r.color}
              id={r.id}
              name={r.name}
              nodeCount={r.nodeCount}
              updatedAt={r.updatedAt}
            />
          ))}
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 4: Test in browser**

```bash
bun run dev
```

1. Visit `http://localhost:3000` — should see sign-in page
2. Sign in with Google
3. Should see empty dashboard with "New Repertoire" button
4. Create a repertoire — card should appear

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/repertoire-card.tsx src/components/create-repertoire-dialog.tsx
git commit -m "feat: add dashboard with repertoire list and creation dialog"
```

---

## Task 5: Chess Board Wrapper Component

**Files:**
- Create: `src/components/chess-board.tsx`
- Create: `src/hooks/use-chess-sounds.ts`

This task sets up the piece assets and sounds too. Before coding, download the assets:

- [ ] **Step 1: Download Kaneo piece SVGs**

```bash
mkdir -p public/pieces/kaneo
cd public/pieces/kaneo
# Download from https://github.com/Kadagaden/chess-pieces
# You need the 12 standard piece SVGs renamed to: wP.svg, wN.svg, wB.svg, wR.svg, wQ.svg, wK.svg, bP.svg, bN.svg, bB.svg, bR.svg, bQ.svg, bK.svg
```

If the Kaneo repo uses different filenames, rename them to match the `wP`/`bK` convention. Also download at least one fallback set:

```bash
mkdir -p public/pieces/cburnett
# Download cburnett SVGs from Wikimedia Commons or Lichess assets
```

- [ ] **Step 2: Download Lichess sound effects**

```bash
mkdir -p public/sounds
# Download from https://github.com/lichess-org/lila/tree/master/public/sound/sfx
# You need: Move.mp3, Capture.mp3, Check.mp3 (and optionally GenericNotify.mp3 for castle, game-end)
# Rename to lowercase: move.mp3, capture.mp3, check.mp3, castle.mp3, game-end.mp3
```

- [ ] **Step 3: Create sound effects hook**

Create `src/hooks/use-chess-sounds.ts`:

```ts
"use client";

import { useCallback, useRef } from "react";

type SoundType = "move" | "capture" | "check" | "castle" | "game-end";

export function useChessSounds(enabled: boolean) {
  const audioCache = useRef<Map<SoundType, HTMLAudioElement>>(new Map());

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;

      let audio = audioCache.current.get(type);
      if (!audio) {
        audio = new Audio(`/sounds/${type}.mp3`);
        audioCache.current.set(type, audio);
      }
      audio.currentTime = 0;
      audio.play().catch(() => {});
    },
    [enabled],
  );

  return { play };
}
```

- [ ] **Step 4: Create the chess board wrapper**

Create `src/components/chess-board.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import type { Piece, Square } from "react-chessboard/dist/chessboard/types";

import type { PieceCode } from "@/lib/piece-sets";
import { getPieceImageUrl } from "@/lib/piece-sets";

interface ChessBoardProps {
  position: string; // FEN
  orientation?: "white" | "black";
  onPieceDrop?: (sourceSquare: Square, targetSquare: Square, piece: Piece) => boolean;
  lightSquareColor: string;
  darkSquareColor: string;
  pieceSet: string;
  showLegalMoves?: boolean;
  lastMove?: { from: Square; to: Square } | null;
}

export function ChessBoard({
  position,
  orientation = "white",
  onPieceDrop,
  lightSquareColor,
  darkSquareColor,
  pieceSet,
  showLegalMoves = true,
  lastMove,
}: ChessBoardProps) {
  const customPieces = useMemo(() => {
    const pieces: Record<string, (props: { squareWidth: number }) => React.ReactElement> = {};
    const codes: PieceCode[] = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

    for (const code of codes) {
      pieces[code] = ({ squareWidth }: { squareWidth: number }) => (
        <Image
          alt={code}
          height={squareWidth}
          src={getPieceImageUrl(pieceSet, code)}
          style={{ pointerEvents: "none" }}
          width={squareWidth}
        />
      );
    }
    return pieces;
  }, [pieceSet]);

  const customSquareStyles = useMemo(() => {
    if (!lastMove) return {};
    return {
      [lastMove.from]: { backgroundColor: "rgba(155, 199, 0, 0.41)" },
      [lastMove.to]: { backgroundColor: "rgba(155, 199, 0, 0.41)" },
    };
  }, [lastMove]);

  const handlePieceDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
      if (onPieceDrop) return onPieceDrop(sourceSquare, targetSquare, piece);
      return false;
    },
    [onPieceDrop],
  );

  return (
    <Chessboard
      animationDuration={200}
      boardOrientation={orientation}
      customBoardStyle={{
        borderRadius: "4px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      }}
      customDarkSquareStyle={{ backgroundColor: darkSquareColor }}
      customLightSquareStyle={{ backgroundColor: lightSquareColor }}
      customPieces={customPieces}
      customSquareStyles={customSquareStyles}
      id="chess-tree-board"
      onPieceDrop={handlePieceDrop}
      position={position}
    />
  );
}
```

- [ ] **Step 5: Verify the board renders**

Temporarily add the board to the dashboard page to test:

```tsx
// Quick test in src/app/page.tsx — remove after verifying
import { ChessBoard } from "@/components/chess-board";
// Add inside AuthenticatedDashboard:
<ChessBoard
  darkSquareColor="#769656"
  lightSquareColor="#EEEED2"
  pieceSet="kaneo"
  position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
/>
```

Verify the board renders with Kaneo pieces and green/cream colors. Then remove the test code.

- [ ] **Step 6: Commit**

```bash
git add src/components/chess-board.tsx src/hooks/use-chess-sounds.ts public/pieces/ public/sounds/
git commit -m "feat: add chess board wrapper with custom pieces and sound effects"
```

---

## Task 6: Preferences Context and Theme Provider

**Files:**
- Create: `src/hooks/use-preferences.tsx`
- Modify: `src/components/providers.tsx`
- Modify: `src/styles/globals.css`
- Create: `src/styles/board-textures.css`

- [ ] **Step 1: Create preferences context**

Create `src/hooks/use-preferences.tsx`:

```tsx
"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

import { trpc } from "@/components/providers";
import { BOARD_THEMES } from "@/lib/board-themes";

interface Preferences {
  boardStyle: string;
  pieceSet: string;
  boardColors: { light: string; dark: string };
  siteTheme: string;
  soundEnabled: boolean;
  showLegalMoves: boolean;
}

interface PreferencesContextValue {
  preferences: Preferences;
  isLoading: boolean;
  update: (partial: Partial<Preferences>) => void;
}

const DEFAULT_PREFERENCES: Preferences = {
  boardStyle: "classic",
  pieceSet: "kaneo",
  boardColors: { light: "#EEEED2", dark: "#769656" },
  siteTheme: "system",
  soundEnabled: true,
  showLegalMoves: true,
};

const PreferencesContext = createContext<PreferencesContextValue>({
  preferences: DEFAULT_PREFERENCES,
  isLoading: true,
  update: () => {},
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = trpc.preferences.get.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
  });

  const utils = trpc.useUtils();
  const mutation = trpc.preferences.update.useMutation({
    onSuccess: () => utils.preferences.get.invalidate(),
  });

  const preferences: Preferences = data
    ? {
        boardStyle: data.boardStyle,
        pieceSet: data.pieceSet,
        boardColors: data.boardColors as { light: string; dark: string },
        siteTheme: data.siteTheme,
        soundEnabled: data.soundEnabled,
        showLegalMoves: data.showLegalMoves,
      }
    : DEFAULT_PREFERENCES;

  // Apply site theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute("data-theme");

    if (preferences.siteTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", preferences.siteTheme);
    }
  }, [preferences.siteTheme]);

  const update = (partial: Partial<Preferences>) => {
    mutation.mutate(partial);
  };

  return (
    <PreferencesContext.Provider value={{ preferences, isLoading, update }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}

export function useBoardColors(preferences: Preferences) {
  const theme = BOARD_THEMES[preferences.boardStyle];
  if (theme) {
    return { light: theme.light, dark: theme.dark };
  }
  return preferences.boardColors;
}
```

- [ ] **Step 2: Add PreferencesProvider to providers**

Update `src/components/providers.tsx` — add the import and wrap inside the tRPC provider:

Add this import at the top:

```tsx
import { PreferencesProvider } from "@/hooks/use-preferences";
```

And wrap the children inside `QueryClientProvider`:

```tsx
<QueryClientProvider client={queryClient}>
  <PreferencesProvider>
    {children}
  </PreferencesProvider>
</QueryClientProvider>
```

Note: PreferencesProvider must be inside tRPC/QueryClient providers since it uses `trpc.preferences.get.useQuery`. But it should only render when the user is authenticated. We'll handle this by making PreferencesProvider gracefully handle unauthenticated state (the query will just fail silently and defaults will be used).

- [ ] **Step 3: Add CSS variables for site themes**

Update `src/styles/globals.css` to include theme CSS variables:

```css
@import "tailwindcss";
@import "./board-textures.css";

:root,
[data-theme="light"] {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --card: #ffffff;
  --card-foreground: #0a0a0a;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --accent: #f5f5f5;
  --accent-foreground: #171717;
  --border: #e5e5e5;
}

[data-theme="dark"] {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #171717;
  --card-foreground: #fafafa;
  --muted: #262626;
  --muted-foreground: #a3a3a3;
  --accent: #262626;
  --accent-foreground: #fafafa;
  --border: #2e2e2e;
}

[data-theme="wooden"] {
  --background: #F5E6C8;
  --foreground: #3E2723;
  --card: #FFF8E7;
  --card-foreground: #3E2723;
  --muted: #E8D5B0;
  --muted-foreground: #6D4C41;
  --accent: #D7C4A0;
  --accent-foreground: #3E2723;
  --border: #C8A96E;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}
```

Note: If shadcn/ui initialized its own CSS variables, merge these with the existing structure. The key is that `data-theme` attributes switch the entire color scheme.

- [ ] **Step 4: Create board texture CSS**

Create `src/styles/board-textures.css`:

```css
/* Board textures applied as background patterns on squares */
/* These are used by the ChessBoard component when boardStyle has a texture */

.board-texture-wooden {
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(139, 90, 43, 0.08) 2px,
    rgba(139, 90, 43, 0.08) 4px
  );
}

.board-texture-marble {
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(200, 200, 200, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(180, 180, 180, 0.1) 0%, transparent 40%);
}
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks/use-preferences.tsx src/components/providers.tsx src/styles/globals.css src/styles/board-textures.css
git commit -m "feat: add preferences context, theme provider, and board textures"
```

---

## Task 7: Repertoire Editor — Zustand Store and Page Shell

**Files:**
- Create: `src/hooks/use-repertoire-store.ts`
- Create: `src/app/repertoire/[id]/page.tsx`

- [ ] **Step 1: Create the editor state store**

Create `src/hooks/use-repertoire-store.ts`:

```ts
import { Chess } from "chess.js";
import { create } from "zustand";

import type { NodeRow, TreeNode } from "@/lib/tree";
import { buildTree, findNode, findPath } from "@/lib/tree";

interface RepertoireState {
  repertoireId: string | null;
  flatNodes: NodeRow[];
  tree: TreeNode | null;
  currentNodeId: string | null;
  lastMove: { from: string; to: string } | null;

  setRepertoireData: (id: string, nodes: NodeRow[]) => void;
  selectNode: (nodeId: string) => void;
  addNode: (node: NodeRow) => void;
  updateNode: (nodeId: string, updates: Partial<NodeRow>) => void;
  removeNode: (nodeId: string) => void;
  getCurrentNode: () => TreeNode | null;
  getPath: () => TreeNode[];
  navigateForward: () => void;
  navigateBack: () => void;
}

export const useRepertoireStore = create<RepertoireState>((set, get) => ({
  repertoireId: null,
  flatNodes: [],
  tree: null,
  currentNodeId: null,
  lastMove: null,

  setRepertoireData: (id, nodes) => {
    const tree = buildTree(nodes);
    set({
      repertoireId: id,
      flatNodes: nodes,
      tree,
      currentNodeId: tree?.id ?? null,
      lastMove: null,
    });
  },

  selectNode: (nodeId) => {
    const { tree, flatNodes } = get();
    if (!tree) return;

    const node = flatNodes.find((n) => n.id === nodeId);
    const parent = node?.parentId ? flatNodes.find((n) => n.id === node.parentId) : null;

    let lastMove: { from: string; to: string } | null = null;
    if (node?.move && parent?.fen) {
      const chess = new Chess(parent.fen);
      const moveResult = chess.move(node.move);
      if (moveResult) {
        lastMove = { from: moveResult.from, to: moveResult.to };
      }
    }

    set({ currentNodeId: nodeId, lastMove });
  },

  addNode: (node) => {
    set((state) => {
      const newFlatNodes = [...state.flatNodes, node];
      const newTree = buildTree(newFlatNodes);
      return { flatNodes: newFlatNodes, tree: newTree };
    });
  },

  updateNode: (nodeId, updates) => {
    set((state) => {
      const newFlatNodes = state.flatNodes.map((n) =>
        n.id === nodeId ? { ...n, ...updates } : n,
      );
      const newTree = buildTree(newFlatNodes);
      return { flatNodes: newFlatNodes, tree: newTree };
    });
  },

  removeNode: (nodeId) => {
    set((state) => {
      const toRemove = new Set<string>();
      const collect = (id: string) => {
        toRemove.add(id);
        for (const n of state.flatNodes) {
          if (n.parentId === id) collect(n.id);
        }
      };
      collect(nodeId);

      const newFlatNodes = state.flatNodes.filter((n) => !toRemove.has(n.id));
      const newTree = buildTree(newFlatNodes);
      const newCurrentId =
        state.currentNodeId && toRemove.has(state.currentNodeId)
          ? state.flatNodes.find((n) => n.id === nodeId)?.parentId ?? newTree?.id ?? null
          : state.currentNodeId;

      return { flatNodes: newFlatNodes, tree: newTree, currentNodeId: newCurrentId };
    });
  },

  getCurrentNode: () => {
    const { tree, currentNodeId } = get();
    if (!tree || !currentNodeId) return null;
    return findNode(tree, currentNodeId);
  },

  getPath: () => {
    const { tree, currentNodeId } = get();
    if (!tree || !currentNodeId) return [];
    return findPath(tree, currentNodeId);
  },

  navigateForward: () => {
    const current = get().getCurrentNode();
    if (current && current.children.length > 0) {
      get().selectNode(current.children[0]!.id);
    }
  },

  navigateBack: () => {
    const { tree, currentNodeId, flatNodes } = get();
    if (!tree || !currentNodeId) return;
    const node = flatNodes.find((n) => n.id === currentNodeId);
    if (node?.parentId) {
      get().selectNode(node.parentId);
    }
  },
}));
```

- [ ] **Step 2: Create the repertoire editor page**

Create `src/app/repertoire/[id]/page.tsx`:

```tsx
"use client";

import { Chess } from "chess.js";
import Link from "next/link";
import { use, useCallback, useEffect } from "react";
import type { Piece, Square } from "react-chessboard/dist/chessboard/types";

import { ChessBoard } from "@/components/chess-board";
import { trpc } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useChessSounds } from "@/hooks/use-chess-sounds";
import { useBoardColors, usePreferences } from "@/hooks/use-preferences";
import { useRepertoireStore } from "@/hooks/use-repertoire-store";

export default function RepertoireEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { preferences } = usePreferences();
  const boardColors = useBoardColors(preferences);
  const { play } = useChessSounds(preferences.soundEnabled);

  const store = useRepertoireStore();
  const { data: repertoire } = trpc.repertoire.get.useQuery({ id });
  const { data: nodesData } = trpc.node.getTree.useQuery({ repertoireId: id });
  const createNode = trpc.node.create.useMutation();

  useEffect(() => {
    if (nodesData) {
      store.setRepertoireData(id, nodesData);
    }
  }, [nodesData, id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        store.navigateBack();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        store.navigateForward();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentNode = store.getCurrentNode();

  const handlePieceDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square, _piece: Piece): boolean => {
      if (!currentNode) return false;

      const chess = new Chess(currentNode.fen);
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (!move) return false;

      // Determine sound
      if (chess.isCheck()) play("check");
      else if (move.captured) play("capture");
      else if (move.san === "O-O" || move.san === "O-O-O") play("castle");
      else play("move");

      // Check if move already exists
      const existing = currentNode.children.find((c) => c.move === move.san);
      if (existing) {
        store.selectNode(existing.id);
        return true;
      }

      // Create new node
      createNode.mutate(
        {
          repertoireId: id,
          parentId: currentNode.id,
          move: move.san,
          fen: chess.fen(),
          moveNumber: move.color === "w" ? Math.ceil(chess.moveNumber() / 2) : Math.ceil((chess.moveNumber() - 1) / 2),
          sideToMove: chess.turn() === "w" ? "white" : "black",
        },
        {
          onSuccess: (newNode) => {
            if (newNode) {
              store.addNode(newNode);
              store.selectNode(newNode.id);
            }
          },
        },
      );

      return true;
    },
    [currentNode, id, createNode, play],
  );

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b px-4 py-2">
        <Link href="/">
          <Button variant="ghost">&larr; Back</Button>
        </Link>
        <h1 className="font-semibold text-lg">{repertoire?.name ?? "Loading..."}</h1>
        <Link href="/settings">
          <Button size="sm" variant="ghost">
            Settings
          </Button>
        </Link>
      </header>

      {/* Main editor */}
      <ResizablePanelGroup className="flex-1" direction="horizontal">
        {/* Board panel */}
        <ResizablePanel defaultSize={35} minSize={25}>
          <div className="flex h-full items-center justify-center p-4">
            <div className="w-full max-w-[560px]">
              <ChessBoard
                darkSquareColor={boardColors.dark}
                lastMove={store.lastMove as { from: Square; to: Square } | null}
                lightSquareColor={boardColors.light}
                onPieceDrop={handlePieceDrop}
                orientation={repertoire?.color === "black" ? "black" : "white"}
                pieceSet={preferences.pieceSet}
                position={currentNode?.fen ?? "start"}
                showLegalMoves={preferences.showLegalMoves}
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Tree view panel — placeholder, built in Task 9 */}
        <ResizablePanel defaultSize={35} minSize={20}>
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Tree View (Task 9)
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right panel: move list + details */}
        <ResizablePanel defaultSize={30} minSize={20}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Move List (Task 10)
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Details Panel (Task 11)
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

- [ ] **Step 3: Test in browser**

1. Navigate to dashboard, create a repertoire, click into it
2. Board should render with correct colors and pieces
3. Drag a piece — move should be validated, sound should play, new node created
4. Arrow keys should navigate back and forward
5. Dragging an existing child move should navigate (not duplicate)

- [ ] **Step 4: Commit**

```bash
git add src/hooks/use-repertoire-store.ts src/app/repertoire/
git commit -m "feat: add repertoire editor page with board, state store, and move creation"
```

---

## Task 8: PGN Import Logic

**Files:**
- Create: `src/lib/pgn-import.ts`
- Modify: `src/server/trpc/routers/import.ts`
- Create: `src/components/import-pgn-dialog.tsx`

- [ ] **Step 1: Create PGN import utility**

Create `src/lib/pgn-import.ts`:

```ts
import { Chess } from "chess.js";

export interface ImportedNode {
  parentIndex: number | null;
  move: string | null;
  fen: string;
  moveNumber: number;
  sideToMove: "white" | "black";
  note: string | null;
  nag: number | null;
}

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function parsePgnToNodes(pgn: string): ImportedNode[] {
  const nodes: ImportedNode[] = [
    {
      parentIndex: null,
      move: null,
      fen: STARTING_FEN,
      moveNumber: 0,
      sideToMove: "white",
      note: null,
      nag: null,
    },
  ];

  const chess = new Chess();

  // chess.js can load PGN with variations via loadPgn
  // For multiple games, split by empty lines between games
  const games = pgn.split(/\n\n(?=\[)/).filter((g) => g.trim());

  for (const game of games) {
    chess.loadPgn(game);
    const history = chess.history({ verbose: true });

    let parentIndex = 0; // root
    const tempChess = new Chess();

    for (const move of history) {
      tempChess.move(move.san);
      const fen = tempChess.fen();

      // Check if this move already exists under the parent
      const existingIndex = nodes.findIndex(
        (n) => n.parentIndex === parentIndex && n.move === move.san,
      );

      if (existingIndex !== -1) {
        parentIndex = existingIndex;
      } else {
        const newIndex = nodes.length;
        nodes.push({
          parentIndex,
          move: move.san,
          fen,
          moveNumber: Math.ceil(tempChess.moveNumber() / 2),
          sideToMove: tempChess.turn() === "w" ? "white" : "black",
          note: null,
          nag: null,
        });
        parentIndex = newIndex;
      }
    }

    chess.reset();
  }

  return nodes;
}
```

- [ ] **Step 2: Implement the import tRPC endpoint**

Replace `src/server/trpc/routers/import.ts`:

```ts
import { eq } from "drizzle-orm";
import { z } from "zod";

import { authorize } from "@/lib/authorize";
import { parsePgnToNodes } from "@/lib/pgn-import";
import { nodes } from "@/server/db/schema";
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

      const parsed = parsePgnToNodes(input.pgn);

      // Get existing nodes to merge
      const existingNodes = await ctx.db.query.nodes.findMany({
        where: eq(nodes.repertoireId, input.repertoireId),
      });

      // Map from parsedIndex -> DB node id
      const indexToId = new Map<number, string>();

      // Root node should already exist
      const root = existingNodes.find((n) => n.parentId === null);
      if (root) indexToId.set(0, root.id);

      let importedCount = 0;

      for (let i = 1; i < parsed.length; i++) {
        const pNode = parsed[i]!;
        const parentDbId = indexToId.get(pNode.parentIndex!);
        if (!parentDbId) continue;

        // Check if this move already exists
        const existing = existingNodes.find(
          (n) => n.parentId === parentDbId && n.move === pNode.move,
        );

        if (existing) {
          indexToId.set(i, existing.id);
        } else {
          const [created] = await ctx.db
            .insert(nodes)
            .values({
              repertoireId: input.repertoireId,
              parentId: parentDbId,
              move: pNode.move,
              fen: pNode.fen,
              moveNumber: pNode.moveNumber,
              sideToMove: pNode.sideToMove,
              note: pNode.note,
              nag: pNode.nag,
              sortOrder: 0,
            })
            .returning();

          if (created) {
            indexToId.set(i, created.id);
            existingNodes.push(created);
            importedCount++;
          }
        }
      }

      return { imported: importedCount };
    }),
});
```

- [ ] **Step 3: Create PGN import dialog**

Create `src/components/import-pgn-dialog.tsx`:

```tsx
"use client";

import { useState } from "react";

import { trpc } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ImportPgnDialogProps {
  repertoireId: string;
  onSuccess?: () => void;
}

export function ImportPgnDialog({ repertoireId, onSuccess }: ImportPgnDialogProps) {
  const [open, setOpen] = useState(false);
  const [pgn, setPgn] = useState("");

  const utils = trpc.useUtils();
  const importPgn = trpc.import.pgn.useMutation({
    onSuccess: (result) => {
      utils.node.getTree.invalidate({ repertoireId });
      setOpen(false);
      setPgn("");
      onSuccess?.();
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") setPgn(text);
    };
    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Import PGN
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import PGN</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="pgn-file">Upload .pgn file</Label>
            <input
              accept=".pgn"
              className="mt-1 block w-full text-sm"
              id="pgn-file"
              onChange={handleFileUpload}
              type="file"
            />
          </div>
          <div>
            <Label htmlFor="pgn-text">Or paste PGN</Label>
            <Textarea
              className="mt-1 font-mono text-sm"
              id="pgn-text"
              onChange={(e) => setPgn(e.target.value)}
              placeholder="1. e4 e5 2. Nf3 Nc6 ..."
              rows={10}
              value={pgn}
            />
          </div>
          <Button
            className="w-full"
            disabled={!pgn.trim() || importPgn.isPending}
            onClick={() => importPgn.mutate({ repertoireId, pgn })}
          >
            {importPgn.isPending ? "Importing..." : "Import"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 4: Add import button to editor header**

In `src/app/repertoire/[id]/page.tsx`, add the import button to the header. Import the component:

```tsx
import { ImportPgnDialog } from "@/components/import-pgn-dialog";
```

Add in the header section, next to the Settings link:

```tsx
<div className="flex items-center gap-2">
  <ImportPgnDialog
    repertoireId={id}
    onSuccess={() => {
      // Refetch tree data
    }}
  />
  <Link href="/settings">
    <Button size="sm" variant="ghost">Settings</Button>
  </Link>
</div>
```

- [ ] **Step 5: Test PGN import**

1. Open a repertoire
2. Click "Import PGN"
3. Paste: `1. e4 e5 2. Nf3 Nc6 3. Bb5 a6`
4. Click Import — nodes should appear
5. Import again with `1. e4 e5 2. Nf3 Nc6 3. Bc4` — should share the first 2 moves and branch at move 3

- [ ] **Step 6: Commit**

```bash
git add src/lib/pgn-import.ts src/server/trpc/routers/import.ts src/components/import-pgn-dialog.tsx src/app/repertoire/
git commit -m "feat: add PGN import with tree merging and file upload"
```

---

## Task 9: Tree Visualization (React Flow)

**Files:**
- Create: `src/components/tree-view.tsx`
- Modify: `src/app/repertoire/[id]/page.tsx`

- [ ] **Step 1: Create the tree view component**

Create `src/components/tree-view.tsx`:

```tsx
"use client";

import dagre from "dagre";
import { useCallback, useEffect, useMemo } from "react";
import {
  Background,
  Controls,
  type Edge,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { TreeNode } from "@/lib/tree";

interface TreeViewProps {
  tree: TreeNode | null;
  currentNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

function layoutTree(tree: TreeNode): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 30, ranksep: 50 });

  const rfNodes: Node[] = [];
  const rfEdges: Edge[] = [];

  function traverse(node: TreeNode) {
    const label = node.move ?? "Start";
    g.setNode(node.id, { width: 80, height: 36 });
    rfNodes.push({
      id: node.id,
      data: {
        label,
        move: node.move,
        lineName: node.lineName,
      },
      position: { x: 0, y: 0 },
      type: "default",
    });

    for (const child of node.children) {
      rfEdges.push({
        id: `${node.id}-${child.id}`,
        source: node.id,
        target: child.id,
        type: "smoothstep",
      });
      traverse(child);
    }
  }

  traverse(tree);
  dagre.layout(g);

  for (const rfNode of rfNodes) {
    const pos = g.node(rfNode.id);
    if (pos) {
      rfNode.position = { x: pos.x - 40, y: pos.y - 18 };
    }
  }

  return { nodes: rfNodes, edges: rfEdges };
}

export function TreeView({ tree, currentNodeId, onSelectNode }: TreeViewProps) {
  const layout = useMemo(() => {
    if (!tree) return { nodes: [], edges: [] };
    return layoutTree(tree);
  }, [tree]);

  const [rfNodes, setNodes, onNodesChange] = useNodesState(layout.nodes);
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState(layout.edges);

  useEffect(() => {
    setNodes(layout.nodes);
    setEdges(layout.edges);
  }, [layout, setNodes, setEdges]);

  // Highlight current node
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: {
          ...n.style,
          background: n.id === currentNodeId ? "#769656" : "#fff",
          color: n.id === currentNodeId ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "4px 8px",
          fontSize: "13px",
          fontWeight: n.id === currentNodeId ? "bold" : "normal",
        },
      })),
    );
  }, [currentNodeId, setNodes]);

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onSelectNode(node.id);
    },
    [onSelectNode],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        edges={rfEdges}
        fitView
        nodes={rfNodes}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onNodesChange={onNodesChange}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
```

- [ ] **Step 2: Wire tree view into the editor page**

In `src/app/repertoire/[id]/page.tsx`, replace the tree view placeholder panel content.

Add import:

```tsx
import { TreeView } from "@/components/tree-view";
```

Replace the tree view placeholder `<div>`:

```tsx
<ResizablePanel defaultSize={35} minSize={20}>
  <TreeView
    currentNodeId={store.currentNodeId}
    onSelectNode={(nodeId) => store.selectNode(nodeId)}
    tree={store.tree}
  />
</ResizablePanel>
```

- [ ] **Step 3: Test in browser**

1. Open a repertoire with some moves
2. Tree should render as a top-down graph with dagre layout
3. Clicking a node should update the board
4. Making a move on the board should add a node to the tree
5. Current node should be highlighted green

- [ ] **Step 4: Commit**

```bash
git add src/components/tree-view.tsx src/app/repertoire/
git commit -m "feat: add React Flow tree visualization with dagre layout"
```

---

## Task 10: Move List Component

**Files:**
- Create: `src/components/move-list.tsx`
- Modify: `src/app/repertoire/[id]/page.tsx`

- [ ] **Step 1: Create recursive move list**

Create `src/components/move-list.tsx`:

```tsx
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { TreeNode } from "@/lib/tree";

interface MoveListProps {
  tree: TreeNode | null;
  currentNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

export function MoveList({ tree, currentNodeId, onSelectNode }: MoveListProps) {
  if (!tree) return null;

  return (
    <ScrollArea className="h-full p-3">
      <div className="font-mono text-sm">
        <MainLine node={tree} currentNodeId={currentNodeId} onSelectNode={onSelectNode} />
      </div>
    </ScrollArea>
  );
}

function MainLine({
  node,
  currentNodeId,
  onSelectNode,
}: {
  node: TreeNode;
  currentNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}) {
  const moves: React.ReactNode[] = [];
  let current = node;

  while (current.children.length > 0) {
    const mainChild = current.children[0]!;
    const alternatives = current.children.slice(1);

    // Move number prefix for white moves
    if (mainChild.sideToMove === "black") {
      // This move was made by white
      moves.push(
        <span key={`num-${mainChild.id}`} className="mr-1 text-muted-foreground">
          {mainChild.moveNumber}.
        </span>,
      );
    } else if (moves.length === 0 || alternatives.length > 0) {
      // Black move at start of a line or after variation
      moves.push(
        <span key={`num-${mainChild.id}`} className="mr-1 text-muted-foreground">
          {mainChild.moveNumber}...
        </span>,
      );
    }

    // The main move
    moves.push(
      <MoveSpan
        key={mainChild.id}
        isCurrent={mainChild.id === currentNodeId}
        move={mainChild.move ?? ""}
        onClick={() => onSelectNode(mainChild.id)}
      />,
    );

    // Render alternatives as indented variations
    for (const alt of alternatives) {
      moves.push(
        <Variation
          key={`var-${alt.id}`}
          currentNodeId={currentNodeId}
          node={alt}
          onSelectNode={onSelectNode}
        />,
      );
    }

    current = mainChild;
  }

  return <div className="flex flex-wrap items-start gap-x-1 gap-y-0.5">{moves}</div>;
}

function Variation({
  node,
  currentNodeId,
  onSelectNode,
}: {
  node: TreeNode;
  currentNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}) {
  return (
    <div className="my-1 w-full rounded border-l-2 border-muted-foreground/30 pl-2 text-muted-foreground">
      <span className="mr-1 text-xs">
        {node.sideToMove === "black" ? `${node.moveNumber}.` : `${node.moveNumber}...`}
      </span>
      <MoveSpan
        isCurrent={node.id === currentNodeId}
        move={node.move ?? ""}
        onClick={() => onSelectNode(node.id)}
      />
      {node.children.length > 0 && (
        <MainLine
          currentNodeId={currentNodeId}
          node={{ ...node, children: node.children } as TreeNode}
          onSelectNode={onSelectNode}
        />
      )}
    </div>
  );
}

function MoveSpan({
  move,
  isCurrent,
  onClick,
}: {
  move: string;
  isCurrent: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`cursor-pointer rounded px-1 py-0.5 ${
        isCurrent
          ? "bg-primary font-bold text-primary-foreground"
          : "hover:bg-accent"
      }`}
      onClick={onClick}
      type="button"
    >
      {move}
    </button>
  );
}
```

- [ ] **Step 2: Wire into editor page**

In `src/app/repertoire/[id]/page.tsx`, replace the move list placeholder.

Add import:

```tsx
import { MoveList } from "@/components/move-list";
```

Replace the move list placeholder:

```tsx
<ResizablePanel defaultSize={50}>
  <MoveList
    currentNodeId={store.currentNodeId}
    onSelectNode={(nodeId) => store.selectNode(nodeId)}
    tree={store.tree}
  />
</ResizablePanel>
```

- [ ] **Step 3: Test in browser**

1. Import a PGN with variations or make several moves with branches
2. Move list should show main line with move numbers
3. Alternative moves should appear indented with a left border
4. Clicking any move should update board and tree view
5. Current move should be highlighted

- [ ] **Step 4: Commit**

```bash
git add src/components/move-list.tsx src/app/repertoire/
git commit -m "feat: add recursive move list with inline variations"
```

---

## Task 11: Details Panel (Notes, Line Name, Win Rate)

**Files:**
- Create: `src/components/details-panel.tsx`
- Create: `src/components/win-rate-bar.tsx`
- Modify: `src/app/repertoire/[id]/page.tsx`

- [ ] **Step 1: Create win rate bar**

Create `src/components/win-rate-bar.tsx`:

```tsx
"use client";

interface WinRateBarProps {
  white: number | null;
  draw: number | null;
  black: number | null;
}

export function WinRateBar({ white, draw, black }: WinRateBarProps) {
  const w = white ?? 0;
  const d = draw ?? 0;
  const b = black ?? 0;
  const total = w + d + b;

  if (total === 0) {
    return (
      <div className="text-muted-foreground text-xs">No win rate data</div>
    );
  }

  const wPct = (w / total) * 100;
  const dPct = (d / total) * 100;
  const bPct = (b / total) * 100;

  return (
    <div>
      <div className="flex h-5 w-full overflow-hidden rounded text-xs font-medium">
        {wPct > 0 && (
          <div
            className="flex items-center justify-center bg-white text-black"
            style={{ width: `${wPct}%` }}
          >
            {wPct >= 10 && `${Math.round(wPct)}%`}
          </div>
        )}
        {dPct > 0 && (
          <div
            className="flex items-center justify-center bg-gray-400 text-white"
            style={{ width: `${dPct}%` }}
          >
            {dPct >= 10 && `${Math.round(dPct)}%`}
          </div>
        )}
        {bPct > 0 && (
          <div
            className="flex items-center justify-center bg-gray-800 text-white"
            style={{ width: `${bPct}%` }}
          >
            {bPct >= 10 && `${Math.round(bPct)}%`}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create details panel**

Create `src/components/details-panel.tsx`:

```tsx
"use client";

import { useCallback, useEffect, useState } from "react";

import { trpc } from "@/components/providers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { WinRateBar } from "@/components/win-rate-bar";
import { useRepertoireStore } from "@/hooks/use-repertoire-store";

interface DetailsPanelProps {
  repertoireId: string;
}

export function DetailsPanel({ repertoireId }: DetailsPanelProps) {
  const store = useRepertoireStore();
  const currentNode = store.getCurrentNode();
  const updateNode = trpc.node.update.useMutation();

  const [note, setNote] = useState("");
  const [lineName, setLineName] = useState("");
  const [whiteWin, setWhiteWin] = useState("");
  const [draw, setDraw] = useState("");
  const [blackWin, setBlackWin] = useState("");

  // Sync local state when node changes
  useEffect(() => {
    if (currentNode) {
      setNote(currentNode.note ?? "");
      setLineName(currentNode.lineName ?? "");
      setWhiteWin(currentNode.whiteWinPct ?? "");
      setDraw(currentNode.drawPct ?? "");
      setBlackWin(currentNode.blackWinPct ?? "");
    }
  }, [currentNode?.id]);

  const save = useCallback(() => {
    if (!currentNode) return;
    const updates = {
      id: currentNode.id,
      repertoireId,
      note: note || null,
      lineName: lineName || null,
      whiteWinPct: whiteWin || null,
      drawPct: draw || null,
      blackWinPct: blackWin || null,
    };
    updateNode.mutate(updates, {
      onSuccess: (updated) => {
        if (updated) {
          store.updateNode(currentNode.id, updated);
        }
      },
    });
  }, [currentNode, note, lineName, whiteWin, draw, blackWin, repertoireId]);

  if (!currentNode) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Select a move to see details
      </div>
    );
  }

  if (!currentNode.move) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Starting position
      </div>
    );
  }

  return (
    <div className="space-y-4 p-3">
      {/* Line name */}
      <div>
        <Label htmlFor="lineName" className="text-xs">Opening Name</Label>
        <Input
          className="mt-1 h-8 text-sm"
          id="lineName"
          onBlur={save}
          onChange={(e) => setLineName(e.target.value)}
          placeholder="e.g. Sicilian: Najdorf"
          value={lineName}
        />
      </div>

      {/* Win rate */}
      <div>
        <Label className="text-xs">Win Rate</Label>
        <WinRateBar
          black={blackWin ? parseFloat(blackWin) : null}
          draw={draw ? parseFloat(draw) : null}
          white={whiteWin ? parseFloat(whiteWin) : null}
        />
        <div className="mt-1 flex gap-2">
          <Input
            className="h-7 text-xs"
            onBlur={save}
            onChange={(e) => setWhiteWin(e.target.value)}
            placeholder="W%"
            type="number"
            value={whiteWin}
          />
          <Input
            className="h-7 text-xs"
            onBlur={save}
            onChange={(e) => setDraw(e.target.value)}
            placeholder="D%"
            type="number"
            value={draw}
          />
          <Input
            className="h-7 text-xs"
            onBlur={save}
            onChange={(e) => setBlackWin(e.target.value)}
            placeholder="B%"
            type="number"
            value={blackWin}
          />
        </div>
      </div>

      <Separator />

      {/* Notes */}
      <div>
        <Label htmlFor="note" className="text-xs">Notes</Label>
        <Textarea
          className="mt-1 text-sm"
          id="note"
          onBlur={save}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ideas, plans, traps..."
          rows={6}
          value={note}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire into editor page**

In `src/app/repertoire/[id]/page.tsx`, replace the details panel placeholder.

Add import:

```tsx
import { DetailsPanel } from "@/components/details-panel";
```

Replace the details placeholder:

```tsx
<ResizablePanel defaultSize={50}>
  <DetailsPanel repertoireId={id} />
</ResizablePanel>
```

- [ ] **Step 4: Test in browser**

1. Click a move in the tree
2. Details panel should show line name input, win rate bar, and notes textarea
3. Enter a line name like "Sicilian: Najdorf" and blur — should save
4. Enter win rates (e.g. 40, 30, 30) — bar should render with proportional sections
5. Add a note and blur — should persist

- [ ] **Step 5: Commit**

```bash
git add src/components/details-panel.tsx src/components/win-rate-bar.tsx src/app/repertoire/
git commit -m "feat: add details panel with notes, line name, and win rate bar"
```

---

## Task 12: Settings Page

**Files:**
- Create: `src/app/settings/page.tsx`
- Create: `src/components/settings/board-style-picker.tsx`
- Create: `src/components/settings/piece-set-picker.tsx`
- Create: `src/components/settings/theme-toggle.tsx`
- Create: `src/components/settings/preferences-section.tsx`
- Create: `src/components/settings/account-section.tsx`

- [ ] **Step 1: Create board style picker**

Create `src/components/settings/board-style-picker.tsx`:

```tsx
"use client";

import { BOARD_THEMES } from "@/lib/board-themes";
import { usePreferences } from "@/hooks/use-preferences";

export function BoardStylePicker() {
  const { preferences, update } = usePreferences();

  return (
    <div>
      <h3 className="mb-3 font-medium">Board Style</h3>
      <div className="grid grid-cols-5 gap-3">
        {Object.values(BOARD_THEMES).map((theme) => (
          <button
            key={theme.key}
            className={`rounded-lg border-2 p-2 transition-colors ${
              preferences.boardStyle === theme.key
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground/30"
            }`}
            onClick={() => update({ boardStyle: theme.key })}
            type="button"
          >
            {/* Mini board preview: 4x4 grid */}
            <div className="mx-auto grid aspect-square w-full max-w-[80px] grid-cols-4 overflow-hidden rounded">
              {Array.from({ length: 16 }).map((_, i) => {
                const row = Math.floor(i / 4);
                const col = i % 4;
                const isLight = (row + col) % 2 === 0;
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: isLight ? theme.light : theme.dark,
                    }}
                  />
                );
              })}
            </div>
            <p className="mt-1 text-center text-xs">{theme.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create piece set picker**

Create `src/components/settings/piece-set-picker.tsx`:

```tsx
"use client";

import Image from "next/image";

import { usePreferences } from "@/hooks/use-preferences";
import { PIECE_SETS, getPieceImageUrl } from "@/lib/piece-sets";

const PREVIEW_PIECES = ["wK", "wQ", "wR", "wB", "wN", "wP"] as const;

export function PieceSetPicker() {
  const { preferences, update } = usePreferences();

  return (
    <div>
      <h3 className="mb-3 font-medium">Piece Set</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.values(PIECE_SETS).map((set) => (
          <button
            key={set.key}
            className={`rounded-lg border-2 p-3 transition-colors ${
              preferences.pieceSet === set.key
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground/30"
            }`}
            onClick={() => update({ pieceSet: set.key })}
            type="button"
          >
            <div className="flex justify-center gap-1">
              {PREVIEW_PIECES.map((code) => (
                <Image
                  key={code}
                  alt={code}
                  height={36}
                  src={getPieceImageUrl(set.key, code)}
                  width={36}
                />
              ))}
            </div>
            <p className="mt-2 text-center text-sm">{set.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create theme toggle**

Create `src/components/settings/theme-toggle.tsx`:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { usePreferences } from "@/hooks/use-preferences";
import { SITE_THEMES } from "@/lib/board-themes";

const THEME_LABELS: Record<string, string> = {
  light: "Light",
  dark: "Dark",
  wooden: "Wooden",
  system: "System",
};

export function ThemeToggle() {
  const { preferences, update } = usePreferences();

  return (
    <div>
      <h3 className="mb-3 font-medium">Site Theme</h3>
      <div className="flex gap-2">
        {SITE_THEMES.map((theme) => (
          <Button
            key={theme}
            onClick={() => update({ siteTheme: theme })}
            variant={preferences.siteTheme === theme ? "default" : "outline"}
          >
            {THEME_LABELS[theme]}
          </Button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create preferences section**

Create `src/components/settings/preferences-section.tsx`:

```tsx
"use client";

import { Label } from "@/components/ui/label";
import { usePreferences } from "@/hooks/use-preferences";

export function PreferencesSection() {
  const { preferences, update } = usePreferences();

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Preferences</h3>
      <div className="flex items-center justify-between">
        <Label htmlFor="sound">Sound effects</Label>
        <input
          checked={preferences.soundEnabled}
          id="sound"
          onChange={(e) => update({ soundEnabled: e.target.checked })}
          type="checkbox"
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="legal">Show legal move indicators</Label>
        <input
          checked={preferences.showLegalMoves}
          id="legal"
          onChange={(e) => update({ showLegalMoves: e.target.checked })}
          type="checkbox"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create account section**

Create `src/components/settings/account-section.tsx`:

```tsx
"use client";

import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AccountSection() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Account</h3>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={session.user.image ?? undefined} />
          <AvatarFallback>
            {session.user.name?.[0]?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{session.user.name}</p>
          <p className="text-muted-foreground text-sm">{session.user.email}</p>
        </div>
        <Badge className="ml-auto" variant="outline">
          Free Plan
        </Badge>
      </div>
      <Button onClick={() => signOut({ callbackUrl: "/" })} variant="outline">
        Sign Out
      </Button>
    </div>
  );
}
```

- [ ] **Step 6: Create settings page**

Create `src/app/settings/page.tsx`:

```tsx
"use client";

import Link from "next/link";

import { AccountSection } from "@/components/settings/account-section";
import { BoardStylePicker } from "@/components/settings/board-style-picker";
import { PieceSetPicker } from "@/components/settings/piece-set-picker";
import { PreferencesSection } from "@/components/settings/preferences-section";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost">&larr; Back</Button>
        </Link>
        <h1 className="font-bold text-3xl">Settings</h1>
      </div>

      <div className="space-y-8">
        <BoardStylePicker />
        <Separator />
        <PieceSetPicker />
        <Separator />
        <ThemeToggle />
        <Separator />
        <PreferencesSection />
        <Separator />
        <AccountSection />
      </div>
    </main>
  );
}
```

- [ ] **Step 7: Test in browser**

1. Navigate to `/settings`
2. Click different board styles — mini previews should show
3. Switch piece sets — preview should update
4. Toggle site theme — page should restyle instantly
5. Toggle sound and legal moves — should persist
6. Account section should show Google profile info and plan badge

- [ ] **Step 8: Commit**

```bash
git add src/app/settings/ src/components/settings/
git commit -m "feat: add settings page with board style, piece set, theme, and account"
```

---

## Task 13: Final Polish and Integration Testing

**Files:**
- Various minor fixes across existing files

- [ ] **Step 1: Verify full flow end-to-end**

Test the complete user journey:

1. Visit `/` — see landing page
2. Sign in with Google
3. Create a new "Classical White" repertoire
4. Click into it — board, tree, move list, details panel all render
5. Make moves: 1. e4, e5, 2. Nf3, Nc6, 3. Bb5 (Ruy Lopez)
6. Go back to root, play 1. d4 to create a branch
7. Tree view shows two branches from root
8. Move list shows main line with 1. e4 and variation 1. d4
9. Click a move in tree → board updates
10. Click a move in move list → board and tree update
11. Add a line name "Ruy Lopez" to the Bb5 node
12. Add win rates (55, 30, 15) and a note
13. Arrow keys navigate forward/back
14. Import a PGN file with `1. e4 c5 2. Nf3 d6 3. d4` — Sicilian should merge at 1. e4 then branch
15. Go to Settings, change board style to "Wooden"
16. Go back to repertoire — board should show wooden style
17. Change to dark theme — whole app should re-theme
18. Sign out — redirect to landing

- [ ] **Step 2: Fix any issues found**

Address any bugs, layout issues, or type errors discovered during testing.

- [ ] **Step 3: Run type check and lint**

```bash
bun run typecheck
bun run check
```

Fix any errors.

- [ ] **Step 4: Commit final fixes**

```bash
git add -A
git commit -m "fix: address integration testing issues and polish"
```
