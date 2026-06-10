# The Philidor Defense — A Complete Study

**A full repertoire and understanding guide for both colors**

> *Starting position:* `1.e4 e5 2.Nf3 d6` — ECO code **C41**, named after François-André Danican Philidor (1726–1795).

---

## How To Use This Document

This is not an opening dump. It is built around five questions you should be able to answer at *any* point in a Philidor game:

1. **What is each piece trying to do?** (the job of each minor piece, why a knight sits where it does)
2. **What is the pawn structure telling me?** (space, the right pawn break)
3. **Where is the enemy weakness, and where is mine?**
4. **What is my opponent threatening right now?** (the trap-prevention question — see Part 5)
5. **What is my typical plan if nothing forcing is happening?**

Every major line below ends with an explicit **"Five Questions"** answer key so you are never clueless after move 10. Read Part 1 (ideas) and Part 5 (traps) first — they carry more weight than memorizing moves.

**Notation reminder:** `!` good, `!!` brilliant, `?` weak, `??` blunder, `!?` interesting, `?!` dubious. `±` White is better, `∓` Black is better, `=` equal, `+−` White winning, `−+` Black winning.

---

# PART 1 — THE BIG PICTURE (Read This First)

## 1.1 What Black is actually doing

Black plays `2...d6` to defend the e5-pawn **with a pawn instead of a piece**. Compare this to `2...Nc6` (which ties the knight to defending e5) — Black keeps more flexibility but pays in **space**. The whole opening is a trade: Black accepts a cramped but extremely solid and resilient position, and waits for the moment to strike back with a pawn break.

The Philidor's reputation: solid, hard to crack, low theory compared to the Ruy Lopez or Petroff, but slightly passive. It is the resilient defender's weapon. Petrosian used its defensive logic; modern 2500–2700 GMs like Bacrot and Aronian have used it as a surprise weapon, almost always through the modern move order (see 1.3).

## 1.2 The central tension and the three Black setups

After `1.e4 e5 2.Nf3 d6 3.d4`, White challenges the center immediately. Black has **three philosophies**:

| Setup | First moves | Philosophy |
|---|---|---|
| **Exchange / Antoshin** | `3...exd4` | Release the tension, give up the center, get a clean, easy-to-develop position with active piece play and a `...d5` break later. |
| **Hanham (Strongpoint)** | `3...Nf6` or `3...Nd7` → `...Nbd7, ...Be7, ...c6` | *Keep* the pawn on e5, support it with a knight on d7, stay compact, expand on the queenside with `...c6` and `...b5`. The classic Philidor. |
| **Counter-Gambit** | `3...f5` | Philidor's own romantic idea. **Refuted today** — do not play it. Covered in Part 4 so you can punish it as White. |

## 1.3 The single most important practical point: MOVE ORDER

> **This is everything in the Philidor.** The classic move order `1.e4 e5 2.Nf3 d6` lets White avoid the Hanham entirely and force lines Black does not want (the queenless endgame, or the dangerous `4.Bc4`). Modern strong players reach the Philidor through the **Pirc move order**:

```
1.e4 d6 2.d4 Nf6 3.Nc3 e5
```

**Why this matters:**
- After `3...e5`, if White plays `4.Nf3`, Black gets `4...Nbd7` and reaches the **Improved Hanham** comfortably, sidestepping the `4.Bc4` tactical tricks (see Part 5).
- If White plays `4.dxe5 dxe5 5.Qxd8+ Kxd8`, Black reaches a queenless middlegame that is fully playable (see Part 3.4).
- The cost: you must be willing to meet `4.Nf3` lines *and* know what to do if White avoids `3.Nc3` and you end up in a true Pirc. If you only want the Philidor, you must accept that some White move orders transpose to a Pirc-flavored game.

**Bottom line:** If you are serious about the Philidor as Black, learn the `1...d6` order. If your opponent is White and you want to dodge the modern Philidor, the `4.Bc4` and queen-trade resources are your friends.

## 1.4 The two pieces that define every Philidor middlegame

- **Black's light-squared bishop (c8):** This is the "problem child" in some lines but the hero in others. Its natural routes are `...Be6` (often after a `...d5` break or in the endgame), or `...g6`+`...Bg7` flavors in Pirc-like structures. **Question 1 for Black is almost always "have I solved my c8-bishop?"**
- **Black's dark-squared bishop (f8):** In the Hanham it sits modestly on e7, often rerouting `...Bf8` to defend after `...Re8`, or to `...g6/...Bg7`. In the Exchange it is comfortably on e7. It is *not* a bad bishop the way the d6-pawn would suggest, because Black's structure is fluid.

---

# PART 2 — THE HANHAM / STRONGPOINT (Black's Main Modern Weapon)

This is the heart of a Black Philidor repertoire. Black keeps the e5-pawn, supports it with a knight on d7, and plays for a queenside expansion.

## 2.1 The Improved Hanham main line

**Recommended move order (avoids the traps):**
```
1.e4 d6 2.d4 Nf6 3.Nc3 e5 4.Nf3 Nbd7 5.Bc4 Be7 6.0-0 0-0 7.Re1 c6 8.a4
```
(The same position arises via `7.a4 c6 8.Re1`.)

You can also reach a near-identical structure from the classical order `1.e4 e5 2.Nf3 d6 3.d4 Nf6 4.Nc3 Nbd7` (Tony Kosten's "Improved Hanham"). The point of `3...Nf6` over the old `3...Nd7` is that `3...Nd7` allows `4.Bc4!` with tactics on f7 (Part 5.1). The downside of `3...Nf6`: White can deviate with `4.dxe5` (Part 4.2).

### What each piece is doing here (Black)
- **Pawn on e5:** the strongpoint. The entire setup exists to keep it. It cramps White's center and gives Black a stake in the middle.
- **Knight d7:** supports e5 and is ready to reroute via `...Nf8–Ng6` (a classic maneuver to hit e5/f4/h4 squares and overprotect) or to jump to `...Nc5`/`...Ne5` once lines open.
- **Knight f6:** pressures e4. Often the trigger for the whole fight over the e4-pawn.
- **Bishop e7:** modest but flexible; reroutes to `...Bf8` to overprotect the king and the d6/e5 complex after `...Re8`, or comes to `...g6`+`...Bg7` setups.
- **Bishop c8:** the problem child. Waits for `...b5`+`...Bb7`, or for a `...d5` or `...exd4` break to free `...Be6`.
- **Queen c7:** the standard square — supports e5, eyes the c-file, connects to the queenside expansion.
- **Rooks:** `...Re8` to pile on the e-file/e4-pawn; the a8-rook supports `...b5`.

### Black's typical plan (Question 5 answer)
1. Complete development: `...Be7, ...0-0, ...c6, ...Qc7, ...Re8, ...Bf8`.
2. Reroute the d7-knight: `...Nf8` then `...Ng6` (or `...Ne6` via f8 in some structures).
3. **Queenside expansion: `...a6`/`...b5`**, gaining space and harassing White's c3-knight and c4-bishop.
4. The freeing break is **`...d5`** at the right moment, or **`...exd4`** to open the e-file when it favors Black.

### White's typical plan (Question 5 answer)
1. The `a4` clamp (stopping `...b5`).
2. Pile on the center; consider `Nf1–Ng3` (a Ruy-Lopez-style maneuver) or queenside play.
3. If allowed, `d4–d5` to gain space, or trades that leave Black slightly passive.

### The Five Questions — Improved Hanham main line

1. **What is each piece doing?** See the table above. The signature: knight on d7 = strongpoint support; bishop on c8 = unsolved; the `...Nf8–Ng6` reroute is the maneuver that brings Black to life.
2. **What is the pawn structure telling me?** Black has the e5-strongpoint but the **d6-pawn is potentially backward** on a half-open file if the center opens. Black has *less* space — so Black wants the freeing breaks `...d5` or `...b5`. White has the center majority and space; White wants to keep Black cramped and prevent `...d5`/`...b5`.
3. **Enemy weakness / mine?** White's weakness: the e4-pawn (Black pressures it with `...Nf6` and `...Re8`) and the d4-square if White's center dissolves. Black's weakness: the d6-pawn and the cramped king if Black is too passive.
4. **What's the opponent threatening?** (White) breaking with `d4–d5` to lock Black in, or `dxe5` to open the d-file against d6. (Black) the `...b5` clamp-break and `...d5`.
5. **Plan if nothing forcing?** (Black) `...Nf8–Ng6`, then `...a6/...b5`, aiming for `...d5`. (White) `a4`, `Nf1–g3`, slowly improve and prevent Black's breaks.

## 2.2 The classical Hanham with `Be2` move orders

If White avoids `Bc4` and plays a quieter setup (`Be2`, `0-0`, sometimes `a4`, `Re1`), Black follows the same plan: `...c6, ...Qc7, ...b6 or ...a6/b5, ...Re8, ...Bf8, ...Nf8–g6`. A model maneuvering line: after `...Nbd7, ...0-0, ...c6`, if White plays `f4`, Black answers `...exf4`-style or holds with `...Re8` and `...Bf8`, and the knight reroute `...Nf8–g6` defends f4/e5 squares.

> **Key idea:** In all Hanham lines, **do not rush `...Nc6`**. The c-pawn wants to go to c6 (and later b5). A knight on c6 blocks that and runs into `d4–d5` hitting it. Keep the knight on d7 (or reroute via f8).

---

# PART 3 — THE EXCHANGE / ANTOSHIN VARIATION (Easiest to Play)

```
1.e4 e5 2.Nf3 d6 3.d4 exd4 4.Nxd4 Nf6 5.Nc3 Be7
```
(`6...0-0` follows.) Modern name: the **Antoshin Variation**; Aronian is a modern proponent. This is the line most Philidor games actually reach, and it is the **most beginner-friendly** because development is natural and the plan is clean.

## 3.1 The core structure and plans

Black gives up the center (no more e5-pawn) but gets:
- Easy, harmonious development.
- Pressure on **e4** via `...Nf6` and the `...Re8` rook.
- The freeing break **`...d5`** (the single most important pawn break in this structure — memorize it).
- A backward d6-pawn as the price (so `...d5` solves that too).

**Black's piece jobs:**
- **Knight f6:** hits e4.
- **Bishop e7 → f8:** reroutes via `...Bf8` after `...Re8` to overprotect and prepare `...d5` or `...g6/...Bg7`.
- **Rook e8:** the engine of the plan — pressures e4, supports `...d5`.
- **Knight b8:** the subtle one — **delay `...Nc6`!** Black usually plays `...c5` *first* (hitting White's d4-knight with tempo), and only then `...Nc6`, so the knight doesn't block the c-pawn or run into tactics. Often the knight goes `...Nbd7` instead, supporting a `...e5/...d5` break and rerouting to e5/c5.
- **Bishop c8 → e6:** after `...d5`, this bishop finally breathes.

**The maneuver to know:** `...Be7, ...0-0, ...Re8, ...Bf8` — this frees the e-file pressure and prepares `...d5`. Then `...c6` and `...d5` (or `...c5` + `...Nc6` + `...d5`).

## 3.2 Main line: `6.Be2` (the top-player choice)

```
6.Be2 0-0 7.0-0 Re8 8.f4 Bf8 9.Bf3
```
White defends e4 with the bishop on f3 (the prophylactic point of `Be2`). Now:
```
9...c5 10.Nb3 Nc6
```
Black chases the knight, develops, and plans `...a5–a4` to harass the b3-knight, then `...Nd4`. If White stops `...a4` with `a4` himself, Black gets `...Nb4` instead, supporting the thematic **`...d5`** break.

### The Five Questions — Exchange/Antoshin with 6.Be2

1. **Pieces?** Re8 + Nf6 = e4-pressure team. Bishop reroutes e7→f8. Knight delays to c6 only after `...c5`. c8-bishop waits for `...d5` to reach e6.
2. **Pawn structure?** Black has *no* central pawn but a clean structure with the `...d5` break available; the d6-pawn is backward until `...d5` frees it. White has an e4/f4 pawn duo (space) but e4 needs constant defense.
3. **Weakness?** White's e4-pawn and the d4/c4 squares once the knight is chased; Black's d6-pawn and slightly less space.
4. **Threatening?** (White) `f4–f5` gaining kingside space, or `e4–e5` if Black is careless. (Black) `...d5` freeing everything, and `...Nd4`/`...Nb4` jumps.
5. **Plan if quiet?** (Black) `...c5`, `...Nc6`, `...a5–a4`, then `...d5`. (White) hold e4 with Bf3, expand with f4–f5, keep Black passive.

## 3.3 Other White 6th moves in the Exchange

- **`6.Bf4`** (increasingly popular, aims for opposite-side castling and an attacking race):
  ```
  6.Bf4 0-0 7.Qd2 Nc6 8.0-0-0 Nxd4 9.Qxd4 Be6 (or 9...a6)
  ```
  White plays `f3, g4, h4, h5` storming the kingside; Black counters with `...a6, ...b5` and `...Nd7–Bf6`. A sharp, double-edged race — **know which side you're attacking and don't fall behind in the pawn race.**
- **`6.g3`** (fianchetto): `6...0-0 7.Bg2 Re8 8.0-0 Bf8`, and after `9.h3` White prepares `f4`; Black completes queenside development and looks for `...d5`/`...c6` at the right time. Calm and strategic.
- **`6.Bc4`** is considered harmless here: `6...0-0 7.0-0 c6` and the position is roughly equal — Black is comfortable.

## 3.4 The queenless middlegame (when White trades on move 4–5)

This arises especially via the modern order: `1.e4 d6 2.d4 Nf6 3.Nc3 e5 4.dxe5 dxe5 5.Qxd8+ Kxd8`. Also via `3...exd4 4.Qxd4` (see 4.1) and the old `3.dxe5`.

> **Do not fear this.** Black loses castling rights but the position is solid and *not* worse with correct play. This is a key reason to choose the `1...d6` move order knowingly.

**Black's plan in the endgame:**
- Play **`...f6` and `...c6`** to make the king an active piece — the king walks to e7/e6 and becomes a fighting unit (Moroni's modern treatment: Black's king becomes the dominant piece).
- After `6.Bc4 Be6 7.Bxe6 fxe6`, Black accepts doubled e-pawns and a king that can't castle, but the structure is rock-solid and the endgame is balanced. The interesting alternative `6...Ke8!?` keeps more tension.
- Against `6.f4` (over-aggressive), Black equalizes easily: `6...Bb4!` pressures e4 indirectly; note that by playing `f4` White gave up the `f3` defense of e4, so tactics like `...Nxe4!` appear. `6...Bd6` is also fine.
- Against `6.Bf4`, a flexible modern path: `6...0-0... ` wait — note in the queenless line Black can't castle; instead develop `...Nc6, ...Bd6/...Be7, ...Re8`, and consider `...Nxd4`-style simplifications, e.g. `...Nc6` followed by `...a6` and `...b5` for queenside play.

### The Five Questions — Queenless middlegame

1. **Pieces?** The **king is a piece** — activate it (`...Ke7`). Bishops develop naturally; knights fight for d4/c5/e5 and f4 outposts. No queens means king safety is a non-issue; activity is everything.
2. **Pawn structure?** Symmetrical-ish e-pawn vs e-pawn battle. Watch for doubled e-pawns after a c4-bishop trade — they're solid, not weak, in an endgame. Black's central pawn count is fine.
3. **Weakness?** Black's inability to castle is irrelevant with queens off; the real targets are weak pawns and outpost squares. White's slight edge is purely the first-move tempo.
4. **Threatening?** Mostly nothing tactical — this is a maneuvering endgame. Watch `f4`/`f5` space grabs and knight jumps to d5.
5. **Plan if quiet?** Activate the king, contest open files with rooks, fight for outposts, aim for full equality. Black holds comfortably.

---

# PART 4 — SIDELINES & AGGRESSIVE WHITE TRIES

## 4.1 The Morphy/`4.Qxd4` line (after `3...exd4`)

```
1.e4 e5 2.Nf3 d6 3.d4 exd4 4.Qxd4
```
"Don't bring the queen out early" — but here it's genuinely potent because Black can't harass it with tempo easily. Morphy's handling:
```
4...Nc6 5.Bb5 Bd7 6.Bxc6 Bxc6 7.Nc3 Nf6 8.Bg5
```
followed by `0-0-0` with a pleasant, easy game for White. Black is solid but slightly passive. Black's plan: complete development with `...Be7, ...0-0`, and seek the `...d5` break or piece activity. This is a sensible practical try for White to get a risk-free pull.

## 4.2 `3...Nf6 4.dxe5` (the reason move order matters)

If Black plays the classical `3...Nf6` (instead of the `1...d6` order), White can avoid the Improved Hanham:
```
1.e4 e5 2.Nf3 d6 3.d4 Nf6 4.dxe5 Nxe4 5.Qd5!
```
White regains the pawn with an edge — `5.Qd5` hits the e4-knight and f7. This is exactly why strong players prefer reaching the Philidor via `1.e4 d6 2.d4 Nf6 3.Nc3 e5`, where `...Nf6` is already developed *before* committing to `...e5`, so this `dxe5` trick doesn't bite the same way.

## 4.3 The Shirov Gambit `5.g4`

In the Hanham (`1.e4 d6 2.d4 Nf6 3.Nc3 e5 4.Nf3 Nbd7 5.g4!?`), GM Shirov's aggressive pawn thrust grabs kingside space and prepares `g5` to kick the f6-knight. Black should react in the center and not get rolled on the kingside:
- A known sharp continuation: `5...Nxg4 6.Rg1 Ngf6 7.Bc4 h6 8.Be3 c6 9.dxe5 dxe5` and White has compensation/initiative but Black is holding. White's idea is `Qe2`/`0-0-0` and a kingside pawn storm.
- Practically: if you don't want to memorize the grab, `5...h6` and `5...exd4` are calmer. Respect the gambit — White is playing for an attack.

## 4.4 The Larsen treatment (Black gives up the center and fianchettos)

After `3...exd4 4.Nxd4`, Bent Larsen liked `4...g6` with a kingside fianchetto (`...Bg7`), treating it like a Pirc-flavored setup. Solid but concedes White a comfortable center; not everyone's taste.

## 4.5 `3...Bg4?!` — the Opera Game move (do not play)

```
1.e4 e5 2.Nf3 d6 3.d4 Bg4?!
```
This is the move that lost Morphy's famous **Opera Game** (Morphy vs. Duke Karl / Count Isouard, 1858). Black's problems came from `3...Bg4`, pinning prematurely and falling behind in development while White sacrificed for a crushing attack. **Avoid it.** If you're White and see it, develop quickly, consider `dxe5` and pressure on f7/d-file, and punish slow play.

---

# PART 5 — THE TRAPS (The Trap-Loss Prevention Chapter)

> **This is the most important part for not losing games.** The Philidor is famous for tactical traps based on **`Bxf7+`, `Ng5`, `Ne6`, and pressure on c7/a8**, plus the **Legal Mate**. Question 4 — "what is my opponent threatening right now?" — is what these are about. Know them cold from both sides.

## 5.1 The Hanham `4.Bc4` f7-tactics (why `3...Nd7` is risky)

This is the central reason to prefer the `1...d6` / `3...Nf6` move orders. After:
```
1.e4 e5 2.Nf3 d6 3.d4 Nd7?! 4.Bc4!
```
Black is in immediate danger. Two ways Black loses material:

**Trap A — `4...Ngf6??`:**
```
4...Ngf6 5.dxe5 Nxe5 6.Nxe5 dxe5 7.Bxf7+! Kxf7 8.Qxd8 Bb4+ 9.Qd2 Bxd2+ 10.Nxd2
```
White emerges **a clean pawn up**. The `Bxf7+` deflects the king so `Qxd8` wins the queen; the `...Bb4+` zwischenzug only regains the queen, not the pawn.

**Trap B — `4...Be7??`:**
```
4...Be7 5.dxe5 Nxe5 (5...dxe5?? 6.Qd5! wins immediately) 6.Nxe5 dxe5 7.Qh5!
```
The `Qh5` fork hits e5 and f7 — White wins a pawn.

**Correct for Black after `4.Bc4`:** `4...c6!` is the main defense. But even then White has dangerous tries (see 5.2). **Conclusion: don't enter via `3...Nd7`. Use `1.e4 d6 2.d4 Nf6 3.Nc3 e5` instead.**

## 5.2 The Philidor Queen Trap (`Bxf7+` → `Ne6`)

The most spectacular Philidor trap — it literally traps the queen. Arises in the `3...Nd7 4.Bc4 c6 5.Ng5` line:
```
1.e4 e5 2.Nf3 d6 3.d4 Nd7 4.Bc4 c6 5.Ng5 Nh6 6.a4 Be7?
7.Bxf7+! Nxf7 8.Ne6! 
```
After `8.Ne6!` the **queen has only two squares**, and best play still loses her:
```
8...Qa5+ 9.Bd2 Qb6 10.a5! Qxb2 11.Bc3! 
```
— the queen is **trapped** (Philidor vs. NN, 1795 — Philidor sprang his own trap). The point: `Ne6` forks the queen and c7, and the `a4–a5`/`Bc3` net closes around the queen on b2.

**Defense (Black):** Don't play `6...Be7?`. And again — **avoid the whole `3...Nd7` move order.** If you're White against `3...Nd7`, this is your prize: `4.Bc4`, and if Black stumbles into `...Be7` after `Ng5`, fire `Bxf7+` and `Ne6`.

## 5.3 The `Ng5`/`Bxf7+`/`Ne6`/`Nxc7`/`Nxa8` raid (and its limits)

A recurring motif: White plays `Ng5` hitting f7, then `Bxf7+` (or just `Bxf7+` first), `Ne6` forking the queen, `Nxc7` forking again, and `Nxa8` grabbing the rook. Example from the `3...Nd7` complex:
```
... 6...dxe5 7.Ng5 0-0 8.Bxf7+ Rxf7 9.Ne6 Qe8 10.Nxc7 Qd8 11.Nxa8
```
White wins the exchange (a rook for a bishop+knight investment) — **but this is NOT automatically winning.** The knight on a8 is **trapped in the corner**, and White has removed his own developed pieces from play. If Black gets enough activity, the trapped a8-knight and Black's lead in active pieces can give full compensation.

> **The lesson cuts both ways:** As White, don't grab on a8 reflexively — check whether the knight escapes and whether Black's activity is worth more than the exchange. As Black, if you've blundered the exchange, **don't resign** — head for activity and try to trap the a8-knight.

Also note the simpler `4...h6?` trap in the Hanham:
```
4...h6? 5.dxe5 dxe5 6.Bxf7+! Kxf7 7.Nxe5+! Kf6 (best) 8.Nc3!
```
offering more material for a devastating attack — Black's king is hunted.

## 5.4 The Legal Trap / Legal Mate (the most famous of all)

A queen sacrifice leading to mate with minor pieces. The classic pattern (named after Sire de Légal, 1702–1792):
```
1.e4 e5 2.Nf3 d6 3.Bc4 Bg4?! 4.Nc3 g6?? 5.Nxe5! Bxd1?? 6.Bxf7+ Ke7 7.Nd5#
```
The point: when Black pins the f3-knight with `...Bg4` and then plays carelessly, White plays `Nxe5!` **offering the queen**. If Black takes with `...Bxd1??` (grabbing the queen), the minor pieces deliver mate: `Bxf7+ Ke7 Nd5#`.

A compact Philidor-flavored version often quoted:
```
1.e4 e5 2.Nf3 d6 3.Nc3 Nc6 4.Bc4 Bg4 5.h3 Bh5 6.Nxe5! Bxd1 7.Bxf7+ Ke7 8.Nd5#
```
Here `5.h3 Bh5` keeps the pin; `6.Nxe5!` works because if `6...Bxd1?? 7.Bxf7+ Ke7 8.Nd5#`. (If instead Black plays `6...dxe5`, then White must NOT have an unsound version — `6...Nxe5` is the resource to check; the trap only wins if Black greedily grabs the queen.)

**Defense (Black):** When you pin with `...Bg4`, be alert to `Nxe5!`. If White plays it, **do not automatically take the queen** — calculate `...dxe5` or `...Nxe5` first. The greedy `...Bxd1` walks into mate.

**As White:** the prerequisites are (1) Black has pinned your f3-knight with `...Bg4`, (2) you have a bishop on c4 eyeing f7, (3) you have a knight that can reach d5 or otherwise deliver the net. Then `Nxe5!` is the shot.

## 5.5 The `Ng5`+`Qh5` / `Ng5`+`Bxg5`+`Qh5` motif (winning the bishop pair / f7 mate threat)

In the `3...Nd7 4.Bc4 c6 5.Nc3 Be7 6.dxe5 dxe5 7.Ng5!` line:
```
7...Bxg5 8.Qh5!
```
The `Qh5` double-attacks f7 (mate threat) and g5 (the bishop), winning the **bishop pair** with a big plus — this scores very well for White. A model game continued `8...g6 9.Qxg5 Qxg5 10.Bxg5` and White has a much easier position with the two bishops (Barden–Klein, 1950). And note the raw mate threat in related lines: after `...Ng5` setups, **`Qxf7#`** is a constant danger if Black doesn't watch f7.

## 5.6 The Counter-Gambit refutation (`3...f5`)

If Black plays Philidor's original `3...f5?!`, White is just better quickly:
```
1.e4 e5 2.Nf3 d6 3.d4 f5?! 
```
Lines favor White by move 4–5. One illustrative punish after a `...Nf6/...d5` try: `4...Nf6 5.Ng5 d5 6.exd5 ... 7.dxe5 ...` and White is winning material/initiative. **As Black: don't play `3...f5`. As White: open the center and exploit the weakened e8–h5 diagonal and Black's king.**

## 5.7 The premature `...c5?` tactic (Exchange Variation)

In the Exchange, committing `...c5` too early backfires:
```
1.e4 e5 2.Nf3 d6 3.d4 exd4 4.Nxd4 Nf6 5.Nc3 c5? 6.Bb5+ Bd7 7.Nf5! Nc6 8.Nxd6+! Bxd6 9.Qxd6±
```
The `Bb5+` insertion stops Black's queen from covering d6, then `Nf5` and `Nxd6+` win the d6-pawn with a big edge. **Lesson: in the Exchange, `...c5` is right only *after* you can meet it — usually after `...Be7, ...0-0, ...Re8`, when the knight goes to b3 not f5. Don't play `...c5` on move 5.**

---

# PART 6 — QUICK-REFERENCE PLAYBOOK

## 6.1 If you are BLACK — your repertoire decision tree

1. **Enter via `1.e4 d6 2.d4 Nf6 3.Nc3 e5`** (the modern, safe order).
2. **If `4.Nf3`:** `4...Nbd7` → Improved Hanham (Part 2.1). Plan: `...Be7, ...0-0, ...c6, ...Qc7, ...Re8, ...Bf8, ...Nf8–g6, ...a6/...b5, and ...d5`.
3. **If `4.dxe5 dxe5 5.Qxd8+ Kxd8`:** the queenless middlegame (Part 3.4). Plan: `...f6, ...c6, ...Ke7`, activate the king, equalize.
4. **If you instead get the Exchange (`...exd4`) structure** (or simply prefer it for simplicity): Part 3. Plan: `...Nf6, ...Be7, ...0-0, ...Re8, ...Bf8`, then `...c5/...c6` and the **`...d5`** break.
5. **Against `5.g4` (Shirov):** stay calm, react centrally (Part 4.3).
6. **Never play:** `3...Bg4` (Opera Game), `3...f5` (refuted), early `...c5` in the Exchange, or enter via `3...Nd7` into `4.Bc4` traps.
7. **Always check f7** when White has a bishop on c4 and a knight that can reach g5/e6. Watch for `Bxf7+` and `Ne6`.

## 6.2 If you are WHITE — how to fight the Philidor

1. **Main, ambitious:** `3.d4`. If `3...exd4 4.Nxd4` and play the Exchange with **`6.Be2`** (solid pull) or **`6.Bf4`** (sharp, opposite-castling attack). For a risk-free edge, **`4.Qxd4`** (Morphy) is excellent.
2. **Against `3...Nd7`:** punish with **`4.Bc4!`** — you're aiming at the f7/queen-trap tactics (Parts 5.1–5.2).
3. **Against `3...Nf6`:** consider **`4.dxe5`** with `5.Qd5!` to avoid the Improved Hanham and keep an edge (Part 4.2).
4. **Aggressive vs the Hanham:** the **Shirov `5.g4`** gambit for a kingside attack (Part 4.3).
5. **Always look for:** the `Ng5`/`Bxf7+`/`Ne6`/`Nxc7` raid, `Qh5` forks on e5+f7, the `Ng5`+`Qh5` bishop-pair win, and the Legal Mate when Black pins with `...Bg4`. **But verify the a8-knight isn't trapped before grabbing the exchange (Part 5.3).**
6. **Strategic plan if quiet:** keep the center, play `a4` to stop `...b5`, maneuver `Nf1–g3`, and prevent Black's `...d5`/`...b5` breaks.

## 6.3 The pawn breaks — memorize these

| Break | Who | When / Why |
|---|---|---|
| **`...d5`** | Black | The #1 freeing break in *both* Hanham and Exchange. Equalizes, frees the c8-bishop (`...Be6`), challenges e4. Time it when you have `...Re8`/`...Nf6` support. |
| **`...b5`** | Black (Hanham) | Queenside expansion; harasses White's c3-knight and c4-bishop. Prepare with `...a6`/`...c6`; watch for White's `a4` clamp. |
| **`...exd4`** | Black | Opens the e-file when Black is ready to pressure e4; transitions to Exchange-type play. |
| **`...f5`** | Black | Rare modern resource (NOT the move-3 gambit) to hit e4 in some structures — only when well supported. |
| **`d4–d5`** | White | Gains space, locks Black in, fixes the backward d6-pawn. White's main space-grabbing break. |
| **`dxe5`** | White | Opens the d-file against the d6-pawn; the basis of many tactics. |
| **`f4`/`f4–f5`** | White | Kingside space, especially in the Exchange (`Be2`/`f4` setups) and Bf4 attacking lines. |
| **`e4–e5`** | White | Punishes a careless Black; gains space and opens lines toward the king. |
| **`g4–g5`** | White | The Shirov gambit / attacking storms — kicks the f6-knight. |

---

# PART 7 — MODEL GAMES TO STUDY

- **Morphy vs. Duke Karl / Count Isouard, Paris Opera, 1858** — the most famous Philidor game; a lesson in development and why `3...Bg4` is bad. *(Watch as White's attacking model and Black's cautionary tale.)*
- **Philidor vs. NN, 1795** — the queen trap (`Bxf7+`/`Ne6`/`Bc3`) from Part 5.2.
- **Barden vs. Klein, 1950** — the `Ng5`/`Qh5` bishop-pair line and the resulting two-bishop grind (Part 5.5).
- **Felgaer vs. Jobava, World Cup tiebreaks 2004** — a model of Black's `...h6, ...Re8, ...Nf8, ...Ng6` maneuvering plan in a modern Philidor.
- **Adams vs. Torre, 1920** — a classic `4.Qxd4` treatment.
- Modern **Aronian** and **Bacrot** Philidor games — to see the Antoshin/Improved Hanham handled at elite level.

---

# PART 8 — THE FIVE QUESTIONS, GENERALIZED (Your In-Game Checklist)

Use this on *every* move once theory ends:

1. **Piece jobs:**
   - *My c8-bishop (Black):* Have I solved it? Route is `...Be6` (after `...d5`) or `...Bb7` (after `...b5`). If it's still stuck on c8, that's my priority.
   - *My knights:* d7-knight = strongpoint support and `...Nf8–g6` reroute; don't block my c-pawn with a premature `...Nc6`.
   - *White's pieces:* Is the c4-bishop aiming at my f7? Is a knight ready for g5/e6? **Then f7 is a target — guard it.**

2. **Pawn structure / space:**
   - Black: I have less space → I need a break. Is `...d5` ready? Is `...b5` ready? Is my d6-pawn safe?
   - White: I have the center → keep Black cramped, stop `...d5` and `...b5`, consider `d5`/`f4`/`e5`.

3. **Weaknesses:**
   - White's permanent target: the **e4-pawn** (Black) and the d4-square if the center dissolves.
   - Black's permanent target: the **d6-pawn** (White) and a cramped king if passive.

4. **Opponent's threat RIGHT NOW (trap check):**
   - Any `Bxf7+`? Any `Ng5`+`Ne6`/`Qh5`? Any `Nxe5!` Legal-Mate shot if I've pinned with `...Bg4`? Any `dxe5` opening the d-file on d6? **Answer this before every move — it is the question that prevents trap-losses.**

5. **Plan if nothing forcing:**
   - Black (Hanham): `...Nf8–g6`, `...a6/b5`, then `...d5`.
   - Black (Exchange): `...Re8, ...Bf8, ...c5/c6, ...Nc6`, then `...d5`.
   - White: `a4` clamp, `Nf1–g3`, hold e4, expand with `f4`/`d5`, prevent Black's breaks.

---

### One-paragraph summary to carry into every game

*The Philidor is a trade of space for solidity. As Black, keep the e5-strongpoint (Hanham) or release it for the clean `...d5` plan (Exchange), use the modern `1...d6` move order to dodge the `4.Bc4` traps, reroute the d7-knight via f8 to g6, expand with `...b5`, and free yourself with `...d5`. As White, keep the center, clamp with `a4`, hunt the d6-pawn, and stay alert to the `Bxf7+`/`Ne6`/`Qh5`/Legal-Mate tactics — but never grab the a8-rook without checking the knight can get home. On every move, ask the five questions, and above all ask number four: what is f7 doing right now?*
