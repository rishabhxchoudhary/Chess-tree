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

### Users Table (managed by NextAuth)

Standard NextAuth users/accounts/sessions tables.

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

### Import Router
- `import.pgn` — parse PGN text and merge into repertoire tree

## Board Theming

**Board colors:** Custom green/cream palette (not exact Chess.com hex values)
- Light squares: ~#EEEED2
- Dark squares: ~#769656

**Pieces:** Kaneo SVG set loaded via react-chessboard's `customPieces` prop

**Highlights:**
- Last move: semi-transparent yellow-green overlay
- Selected piece: similar highlight
- Legal move dots (optional, can be toggled)

**Drag behavior:**
- Scale 1.2 on drag
- Ghost piece at origin (0.5 opacity)
- Animation duration ~200ms

**Sounds:** Lichess sfx pack
- move.mp3, capture.mp3, check.mp3, castle.mp3, game-end.mp3

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
