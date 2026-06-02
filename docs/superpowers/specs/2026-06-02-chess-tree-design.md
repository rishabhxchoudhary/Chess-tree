# Chess Tree — Opening Repertoire Builder

## Overview

A multi-user web application for building, managing, and studying chess opening repertoires. Users create named repertoires, build move trees via an interactive chessboard, annotate positions with notes and statistics, and import PGN files to bootstrap lines.

## Requirements

### Core

- Interactive chessboard with drag-and-drop (Chess.com-like aesthetic)
- Tree visualization of branching opening lines (visual graph)
- Linear move list with indented variations
- Free-form text notes per move/position
- Win rate stats (white %, draw %, black %) per position — manually entered
- Line names per branch (e.g. "Sicilian: Najdorf")
- Multiple named repertoires per user
- PGN file import to bootstrap repertoires
- Multi-user with Google OAuth
- User plan system (free plan by default, extensible to paid tiers)
- Settings page: board style, piece set, color theme, website theme

### Out of Scope (v1) — but designed for future integration

| Future Feature | How the architecture accommodates it |
|---|---|
| Engine analysis | Nodes table has a JSONB `metadata` column from day 1. Engine eval (cp, mate, depth, best line) goes there with zero schema migration. Board component accepts an optional eval bar prop. |
| Training/quiz mode | Tree traversal logic is generic and reusable. Quiz mode = walk the tree, present positions, check user's move against children. Add `lastDrilled` / `drillScore` to metadata later. |
| Evaluation symbols (!, ?, !!, ??) | Nodes table includes a nullable `nag` (Numeric Annotation Glyph) INT column from day 1 — this is the PGN standard encoding. Rendering is just a display concern. |
| Board arrows/highlights | Stored in the `metadata` JSONB column as `{arrows: [{from, to, color}], highlights: [{square, color}]}`. react-chessboard already supports `customArrows` and `customSquareStyles` props — just pipe data through. |
| Sharing repertoires | Repertoire access goes through an `authorize()` helper from day 1 (checks `userId === session.userId`). Sharing = add a `shares` table + extend `authorize()` to check it. No API restructuring needed. |
| Auto-fetched win rates | Win rate columns already exist on nodes. Add a `source` field to metadata (`manual` vs `lichess` vs `masters`) and an API integration layer. Existing UI just reads the same columns. |

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Already scaffolded, server components, API routes |
| Auth | NextAuth v5 + Google OAuth (default UI) | Already scaffolded, zero custom auth UI |
| Database | PostgreSQL + Drizzle ORM | Type-safe, supports recursive CTEs for tree queries |
| API | tRPC | Type-safe client-server, T3 ecosystem |
| Chess logic | chess.js | Move validation, PGN parsing, FEN generation |
| Board UI | react-chessboard v5.x | Native React 19, MIT, deeply customizable |
| Piece set | Kaneo SVGs (github.com/Kadagaden/chess-pieces) | CC-BY-4.0, inspired by Chess.com Neo style |
| Board theme | Custom green/cream palette | Chess.com-like aesthetic without IP infringement |
| Sound effects | Lichess sfx pack (by Enigmahack) | AGPLv3+, traditional chess sounds |
| Tree visualization | @xyflow/react (React Flow) + dagre | Proven combo, expand/collapse, dynamic nodes |
| Move list | Custom recursive React component | No good off-the-shelf option exists |
| UI shell | shadcn/ui + Tailwind CSS 4 | Resizable panels, fits existing stack |

## Data Model

### Users Table (extended from NextAuth)

Standard NextAuth users/accounts/sessions tables, plus:

| Column | Type | Purpose |
|---|---|---|
| plan | ENUM(free, pro) DEFAULT 'free' | User's subscription plan. Free by default. Feature gating checks this column. |

### User Preferences Table

Stores per-user visual customization. One row per user, created on first login with defaults.

| Column | Type | Purpose |
|---|---|---|
| id | UUID (PK) | Primary key |
| userId | FK -> users (unique) | One preferences row per user |
| boardStyle | VARCHAR(50) DEFAULT 'classic' | Board texture: `classic`, `wooden`, `marble`, `tournament`, `dark` |
| pieceSet | VARCHAR(50) DEFAULT 'kaneo' | Piece set: `kaneo`, `cburnett`, `staunty`, `alpha` |
| boardColors | JSONB DEFAULT '{"light":"#EEEED2","dark":"#769656"}' | Custom light/dark square hex colors (overrides boardStyle defaults when user picks custom) |
| siteTheme | VARCHAR(50) DEFAULT 'system' | Website theme: `light`, `dark`, `wooden`, `system` |
| soundEnabled | BOOLEAN DEFAULT true | Toggle sound effects |
| showLegalMoves | BOOLEAN DEFAULT true | Show legal move dots on the board |
| createdAt | TIMESTAMP | |
| updatedAt | TIMESTAMP | |

**Board styles** define a texture/background for the squares:
- `classic` — flat colors (default green/cream)
- `wooden` — wood-grain texture on squares, warm brown tones throughout the site
- `marble` — marble texture, cool grey tones
- `tournament` — dark green/buff, traditional OTB feel
- `dark` — dark grey/charcoal squares

**Site themes** control the overall app appearance (sidebar, backgrounds, text):
- `light` — clean white/grey
- `dark` — dark mode
- `wooden` — warm wood-grain backgrounds, parchment-colored panels, feels like a physical chess study
- `system` — follows OS preference for light/dark

### Repertoires Table

| Column | Type | Purpose |
|---|---|---|
| id | UUID (PK) | Primary key |
| userId | FK -> users | Owner |
| name | VARCHAR(255) | e.g. "Classical White", "Anti-Sicilian" |
| color | ENUM(white, black) | Which side this repertoire is for |
| createdAt | TIMESTAMP | |
| updatedAt | TIMESTAMP | |

### Nodes Table (the tree)

| Column | Type | Purpose |
|---|---|---|
| id | UUID (PK) | Primary key |
| repertoireId | FK -> repertoires | Which repertoire this belongs to |
| parentId | FK -> nodes (nullable) | Null = root position (starting FEN) |
| move | VARCHAR(10) (nullable) | SAN notation, e.g. "e4", "Nf3". Null for root |
| fen | VARCHAR(100) | Full FEN after this move |
| moveNumber | INT | Move number in the game |
| sideToMove | ENUM(white, black) | Whose turn after this move |
| note | TEXT (nullable) | Free-form text annotation |
| lineName | VARCHAR(255) (nullable) | Opening name, e.g. "Sicilian: Najdorf" |
| whiteWinPct | DECIMAL(5,2) (nullable) | White win % at this position |
| drawPct | DECIMAL(5,2) (nullable) | Draw % |
| blackWinPct | DECIMAL(5,2) (nullable) | Black win % |
| nag | INT (nullable) | Numeric Annotation Glyph (PGN standard: 1=!, 2=?, 3=!!, 4=??, 5=!?, 6=?!). Not rendered in v1 but stored on PGN import and preserved on export. |
| metadata | JSONB (nullable) | Extensibility column for future features (engine eval, arrows, highlights, drill stats). Not used in v1 but present from day 1 to avoid schema migrations. |
| sortOrder | INT | Ordering among siblings (main line first) |
| createdAt | TIMESTAMP | |

The root node of each repertoire has parentId=null, move=null, and fen set to the standard starting position. Every move branches from there.

FEN is stored on every node for instant board rendering at any position without replaying from root.

## Page Structure

### Dashboard (`/`)

- Lists all user's repertoires as cards
- Each card: name, color icon (white/black), node count, last updated
- "Create New Repertoire" button -> name input + color picker
- Click card -> opens repertoire editor

### Repertoire Editor (`/repertoire/[id]`)

Three-panel layout using shadcn/ui Resizable:

```
+------------------+---------------------+-------------------+
|                  |                     |                   |
|                  |                     |  Move List        |
|   Chessboard     |   Tree View         |  (linear with     |
|   (interactive   |   (React Flow       |   indented         |
|    drag/drop)    |    graph of         |   variations)     |
|                  |    branches)        |                   |
|                  |                     +-------------------+
|                  |                     |                   |
|                  |                     |  Details Panel    |
|                  |                     |  - Line name      |
|                  |                     |  - Win rate bar   |
|                  |                     |  - Text notes     |
+------------------+---------------------+-------------------+
|  Import PGN                                               |
+-----------------------------------------------------------+
```

All three panels stay in sync:
- Click/drag a piece on the board -> adds child node (or navigates if move exists)
- Click a node in tree view -> board + move list update
- Click a move in move list -> board + tree view update

### Settings Page (`/settings`)

**Appearance section:**
- Board style picker — visual preview cards showing each style (classic, wooden, marble, tournament, dark) with a mini chessboard preview
- Piece set picker — shows all 12 pieces for each set side-by-side
- Custom board colors — color pickers for light/dark squares (overrides board style)
- Site theme toggle — light / dark / wooden / system

**Preferences section:**
- Sound effects on/off
- Show legal move indicators on/off

**Account section:**
- Current plan badge (Free / Pro)
- Google account info (email, avatar)
- Sign out

All changes apply instantly (optimistic UI) and save via debounced tRPC mutation.

### Interaction Model

**Adding moves:**
1. User drags a piece on the board
2. chess.js validates the move
3. If move already exists as a child of current node, navigate to it
4. If new, INSERT a new node with the FEN, move, and moveNumber
5. Board, tree, and move list all update

**Annotations:**
- Select any node -> details panel shows note editor, line name field, win rate inputs
- Changes save on blur or after a short debounce

**Sibling ordering:**
- Siblings can be reordered (drag or buttons) to set main line vs alternatives
- sortOrder column controls this

**Navigation:**
- Arrow keys: left/right to move backward/forward in current line
- Tree view: click any node to jump
- Move list: click any half-move to jump

## PGN Import

1. User uploads a .pgn file or pastes PGN text
2. chess.js parses the PGN (supports multiple games, variations, comments)
3. For each move line, walk the existing tree:
   - If the move already exists at that point, follow it
   - If new, create a new child node
4. PGN comments become node notes
5. Multiple games in one PGN merge into the same tree (deduplicating shared lines)

## API Routes (tRPC)

### Repertoire Router
- `repertoire.list` — list all repertoires for current user
- `repertoire.create` — create a new repertoire (name, color)
- `repertoire.get` — get repertoire metadata
- `repertoire.update` — rename repertoire
- `repertoire.delete` — delete repertoire and all its nodes

### Node Router
- `node.getTree` — get all nodes for a repertoire (recursive CTE, returns flat list; client builds tree)
- `node.create` — add a new move (parentId, move, fen, moveNumber, sideToMove)
- `node.update` — update note, lineName, win rates, sortOrder
- `node.delete` — delete a node and all descendants
- `node.reorder` — update sortOrder for siblings

### Preferences Router
- `preferences.get` — get current user's preferences (creates defaults if none exist)
- `preferences.update` — update any preference fields (partial update)

### Import Router
- `import.pgn` — parse PGN text and merge into repertoire tree

## Board Theming

All visual settings are driven by the user's preferences row. A `usePreferences()` hook provides the values to all components via React context.

**Default board colors (classic style):**
- Light squares: #EEEED2
- Dark squares: #769656

**Board styles with default colors:**

| Style | Light Square | Dark Square | Texture |
|---|---|---|---|
| classic | #EEEED2 | #769656 | Flat color |
| wooden | #E8C99B | #A67B5B | Wood-grain CSS texture (repeating-linear-gradient or background image) |
| marble | #E8E8E8 | #8B8B8B | Subtle marble veining |
| tournament | #E8DFC0 | #4E7837 | Flat, traditional OTB |
| dark | #3A3A3A | #1A1A1A | Flat, minimal |

**Pieces:** Loaded via react-chessboard's `customPieces` prop. The active piece set is read from user preferences. Piece SVGs are bundled in `public/pieces/{setName}/`.

**Highlights:**
- Last move: semi-transparent yellow-green overlay
- Selected piece: similar highlight
- Legal move dots: toggled via user preferences

**Drag behavior:**
- Scale 1.2 on drag
- Ghost piece at origin (0.5 opacity)
- Animation duration ~200ms

**Sounds:** Lichess sfx pack, toggled via user preferences
- move.mp3, capture.mp3, check.mp3, castle.mp3, game-end.mp3

**Site theme implementation:** CSS variables on `<html>` element, switched via a `ThemeProvider`. The `wooden` theme uses warm browns (#8B6914 accents), parchment backgrounds (#F5E6C8), and subtle wood-grain textures on panels — making the whole app feel like a physical chess study.

## Architectural Principles (for extensibility)

1. **Props-driven board component.** The chessboard wrapper accepts all display data (position, arrows, highlights, orientation) as props. It has no internal state about what to show. This means any future feature (engine arrows, training highlights) just passes new props — no board component changes.

2. **Authorization as a composable helper.** All tRPC procedures call `authorize(repertoireId, session)` which currently checks `userId === session.userId`. Sharing = extend this one function to also check a `shares` table. No procedure changes needed.

3. **JSONB metadata column for unstructured future data.** Rather than adding columns for every future feature, the `metadata` JSONB column on nodes absorbs engine eval, arrows, drill stats, etc. Typed via Zod schemas that evolve independently of the DB schema.

4. **Tree logic in a shared utility.** Tree traversal (find path to root, find subtree, find siblings) lives in a `lib/tree.ts` utility, not scattered across components. Quiz mode, export, and analysis all reuse the same traversal functions.

5. **PGN import preserves all data.** Even data we don't render in v1 (NAG symbols, comments, variations) is stored faithfully. No information loss on import → re-export round-trip.

6. **Board component is swappable.** The board is wrapped in our own `<ChessBoard>` component that abstracts over react-chessboard's API. If we ever switch to Chessground or another renderer, only this wrapper changes.

## Reference Implementations

- **ChessGraph.net** (github.com/NicoDeGiacomo/chess-graph) — MIT, React 19 + react-chessboard + React Flow + dagre + chess.js. Direct architecture reference for board<->tree sync.
- **Lichess PGN viewer** — reference for move list with variations rendering.
