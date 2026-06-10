# The King's Gambit — A Complete Study

> **How to use this document.** This is built so that at *any* position you can answer the five orientation questions:
> 1. What is each piece trying to do?
> 2. What is the pawn structure telling me?
> 3. Where is the enemy weakness, and where is mine?
> 4. What is my opponent threatening *right now*?
> 5. What is my plan if nothing forcing is happening?
>
> Every major line below ends with a **"The Five Questions"** box that answers exactly these, for both colours. Part 5 is a pure trap reference. Part 8 is a "what to do after move 10" plan bank.
>
> **Notation reminder:** `+` = check, `#` = mate, `!` good, `?` mistake, `?!` dubious, `!?` interesting/double-edged, `=` equal, `⩲` slight White edge, `∞` unclear.

---

## Table of Contents

- [Part 0 — The Big Picture (read this first)](#part-0--the-big-picture)
- [Part 1 — The Starting Position & Move 2 Crossroads](#part-1--the-starting-position--move-2-crossroads)
- [Part 2 — King's Gambit Accepted: 3.Nf3 Main Roads](#part-2--kings-gambit-accepted-3nf3)
  - [2A — The Classical 3...g5 complex](#2a--the-classical-3g5-complex)
  - [2B — Kieseritzky Gambit (4.h4 g4 5.Ne5)](#2b--kieseritzky-gambit)
  - [2C — Allgaier Gambit (5.Ng5)](#2c--allgaier-gambit)
  - [2D — Fischer Defense (3...d6)](#2d--fischer-defense-3d6)
  - [2E — Modern / Abbazia Defense (3...d5)](#2e--modern--abbazia-defense-3d5)
  - [2F — Cunningham Defense (3...Be7)](#2f--cunningham-defense-3be7)
  - [2G — Schallopp Defense (3...Nf6)](#2g--schallopp-defense-3nf6)
- [Part 3 — Bishop's Gambit (3.Bc4) and the Muzio family](#part-3--bishops-gambit-and-the-muzio-family)
  - [3A — Bishop's Gambit proper](#3a--bishops-gambit-proper)
  - [3B — Muzio Gambit (4.Bc4 g4 5.O-O)](#3b--muzio-gambit)
  - [3C — Muzio relatives: Ghulam-Kassim, McDonnell, Lolli, Salvio](#3c--muzio-relatives)
- [Part 4 — Declining the Gambit](#part-4--declining-the-gambit)
  - [4A — Classical KGD (2...Bc5)](#4a--classical-kgd-2bc5)
  - [4B — Falkbeer Countergambit (2...d5)](#4b--falkbeer-countergambit-2d5)
  - [4C — Minor declines: 2...Nc6, 2...d6, 2...Nf6](#4c--minor-declines)
- [Part 5 — The Trap Encyclopedia (the anti-blunder section)](#part-5--the-trap-encyclopedia)
- [Part 6 — Pawn Structures Decoded](#part-6--pawn-structures-decoded)
- [Part 7 — Piece Job Descriptions](#part-7--piece-job-descriptions)
- [Part 8 — "After Move 10" Plan Bank](#part-8--after-move-10-plan-bank)
- [Part 9 — Study Roadmap & Move-Order Cheat Sheet](#part-9--study-roadmap--cheat-sheet)

---

## Part 0 — The Big Picture

**The moves:** `1.e4 e5 2.f4`

White offers the f-pawn. The point is **not** the pawn — it is what the pawn buys:

1. **A central pawn majority.** If White gets in `d4` later, White owns a big `d4+e4` centre while Black has traded away the e5-pawn. White dreams of the setup `pawns d4/e4`, `Bc4`, `Bxf4`, knights centralised.
2. **The half-open f-file.** After the f-pawn leaves, the f-file becomes White's attacking highway, pointing straight at **f7** — Black's most vulnerable square (defended only by the king at the start).
3. **A lead in development / the initiative.** White is willing to be down a pawn for fast, aggressive piece play while the position is open.

**The price White pays:**

- The move `f4` **weakens White's own king**, especially the `e1–h4` diagonal and the `g1–a7` diagonal. The first thing Black checks in countless lines is `...Qh4+`.
- If Black consolidates and survives the attack, **the extra pawn often wins the endgame.**

**The single most important tactical fact in the whole opening:**
> After `2.f4 exf4`, White **cannot** play `3.d4?` immediately because of `3...Qh4+!`. The king must move (`4.Ke2??` loses to `...Qxe4+`; `4.g3 fxg3` opens lines), and White is in trouble. **This is why `3.Nf3` is played first** — the knight covers h4 and stops the check. Remember this and you understand 80% of the move-orders in this opening.

**Modern verdict (engines + GM practice):** The King's Gambit is **objectively not quite sound** — with precise play Black equalises in several lines (especially the Modern/Abbazia `3...d5` and well-handled Fischer `3...d6`). But it remains a *devastating practical weapon*: the positions are sharp, the traps are lethal, and a defender who doesn't know exactly what they're doing gets crushed. It is a surprise weapon at GM level and a genuinely dangerous mainstay at club level.

**Who should play it as White?** Aggressive, tactical players who enjoy initiative and are comfortable with king exposure. **As Black?** You don't choose to "play the King's Gambit" as Black — you choose a *defense*. This study gives you a complete, low-theory, sound repertoire as Black (the **Modern/Abbazia `...d5`** approach) plus understanding of everything else.

---

## Part 1 — The Starting Position & Move 2 Crossroads

Position after `1.e4 e5 2.f4`:

```
Black to move
8  r n b q k b n r
7  p p p p . p p p
6  . . . . . . . .
5  . . . . p . . .
4  . . . . P P . .
3  . . . . . . . .
2  P P P P . . P P
1  R N B Q K B N R
      a b c d e f g h
```

Black has **four philosophies**:

| # | Move | Name | Philosophy |
|---|------|------|------------|
| 1 | **2...exf4** | King's Gambit **Accepted** | Take the pawn, make White prove the sacrifice. The main and most testing reply. |
| 2 | **2...d5** | **Falkbeer** Countergambit | Counter-strike the centre immediately, ignore the f-pawn, exploit White's loosened kingside. |
| 3 | **2...Bc5** | **Classical** Declined | Develop with tempo, plant the bishop on the a7–g1 diagonal so White can *never* castle kingside comfortably. |
| 4 | **2...Nc6 / 2...d6 / 2...Nf6** | Minor declines | Various; mostly transpose or are slightly passive. |

> **The novice trap that defines move 2:** After `2.f4`, White is **NOT** yet threatening `fxe5`. If `2...(anything) 3.fxe5?? Qh4+!` and White either gets mated (`4.Ke2?? Qxe4#`) or loses the h1-rook (`4.g3 Qxe4+` forking king and rook). So Black need not rush to defend e5. *Even Magnus Carlsen has blundered `fxe5??` in a blitz game.*

We'll cover the Accepted first (Parts 2–3), then the Declined (Part 4).

---

## Part 2 — King's Gambit Accepted: 3.Nf3

`1.e4 e5 2.f4 exf4 3.Nf3`

```
Black to move
8  r n b q k b n r
7  p p p p . p p p
6  . . . . . . . .
5  . . . . . . . .
4  . . . . P p . .
3  . . . . . N . .
2  P P P P . . P P
1  R N B Q K B . R
      a b c d e f g h
```

**Why 3.Nf3 (the King's Knight's Gambit):** It develops, and — critically — **it covers h4**, killing the `...Qh4+` resource. Only *now* can White dream of `d4` and `Bxf4`. This is by far White's main move (≈the standard).

Black's menu after 3.Nf3:
- **3...g5** — hold the extra pawn by force (sharpest; Parts 2A–2C).
- **3...d6** — Fischer Defense; prepare `...g5` *after* taking e5 away from White's knight (Part 2D).
- **3...d5** — Modern/Abbazia; give the pawn back for free development (Part 2E) — **recommended sound repertoire for Black.**
- **3...Be7** — Cunningham; threatens `...Bh4+` (Part 2F).
- **3...Nf6** — Schallopp; provocative (Part 2G).

---

### 2A — The Classical 3...g5 complex

`1.e4 e5 2.f4 exf4 3.Nf3 g5`

```
Black to move just played ...g5
8  r n b q k b n r
7  p p p p . p . p
6  . . . . . . . .
5  . . . . . . p .
4  . . . . P p . .
3  . . . . . N . .
2  P P P P . . P P
1  R N B Q K B . R
      a b c d e f g h
```

**Black's idea:** The pawn on g5 *defends f4*. Black wants to follow with `...g4` kicking the f3-knight, then `...Qh4+` is back on the menu with the f3-square no longer covered. Black is greedily trying to **keep the extra pawn and build a kingside pawn phalanx** (g5/f4, sometimes h6 first).

**The structural danger for Black:** those advanced kingside pawns (g5, f4, often h6) are **loose and over-extended**. If White breaks the chain (typically with `h4!`), Black's pawns can fall and Black's king — still in the centre — gets exposed down the newly opened files.

White's three main tries against 3...g5:

| White move | Name | Idea |
|---|---|---|
| **4.h4** | Paris Attack / gateway to **Kieseritzky** | Smash the g5/f4 chain at once. After `4...g4`, the knight goes to **e5** (Kieseritzky) or g5 (Allgaier). **Main line.** |
| **4.Bc4** | Gateway to **Muzio / Hanstein / Philidor** | Develop, eye f7, prepare `O-O` and a possible knight sac on f3 (Muzio). Covered in Part 3. |
| **4.Nc3** | **Quaade** Gambit | Modern, flexible (GM John Shaw's recommendation); keeps options, prepares d4/Bc4, less forcing. |

**The Classical Variation "proper"** is sometimes defined narrowly as positions after `3...g5 4.h4` etc. Let's drill the most important: the Kieseritzky.

#### The Five Questions — generic 3...g5 positions

- **Each piece's job (White):** `Nf3`→ heads for e5 (a monster outpost hitting f7, d7, g4, c6); `Bc4`→ aims at f7; `h-pawn`→ a battering ram to open the h-file and break g5; queen often → e1/e2 then h-file or to f3; rooks → f-file and h-file.
- **Each piece's job (Black):** the g5/f4 pawns → keep lines closed and hold the extra material; `Bg7` (if played) → rake the long dark diagonal; `...Qh4+`/`...Qe7` → harass; the knight on f6 → blockade and hit e4; the king → *get to safety*, which is the whole problem.
- **Pawn structure:** Black has a kingside pawn majority but it's advanced and brittle. White has the central majority and the half-open f-file. **The thematic break is White's `h4`** (and sometimes `g3`); Black's counter-breaks involve `...d5` (freeing pieces) and `...f3` (locking White's king in and keeping the diagonal closed).
- **Weaknesses:** Black's f7 and the open lines toward the black king (h-file, e-file, the a2–g8 and h5–e8 diagonals). White's e1–h4 diagonal and the sacrificed material.
- **Opponent's immediate threat:** almost always something on **f7** or a pawn-break that opens a file toward your uncastled king. *Always recheck f7 and h4/e8 before relaxing.*
- **Plan if quiet (White):** complete development (Bc4, O-O, Nc3, d4), open a file, pile on f7/the king. **Plan if quiet (Black):** return some material to **finish development and castle/king-walk to safety**, then convert the extra pawn or the better structure in an endgame.

---

### 2B — Kieseritzky Gambit

`1.e4 e5 2.f4 exf4 3.Nf3 g5 4.h4 g4 5.Ne5`

```
Black to move — knight lands on e5
8  r n b q k b n r
7  p p p p . p . p
6  . . . . . . . .
5  . . . . N . . .
4  . . . . P p p P
3  . . . . . . . .
2  P P P P . . P .
1  R N B Q K B . R
      a b c d e f g h
```

This is regarded by modern authors (Shaw, Gallagher) as **the main line** against 3...g5. Steinitz used it; **Spassky famously beat Fischer with it** at Mar del Plata 1960.

**Why Ne5 and not Ng5?** On **e5** the knight is superbly placed: it attacks **f7, d7, c6, g4**, supports a future Bc4 battery on f7, and sits on a square Black can't easily challenge. (`5.Ng5` is the Allgaier — see 2C — which immediately sacrifices on f7 and is dubious.) The `h4` pawn has done its job: it forced `...g4`, undermining Black's chain so Black can never build the stable `h6+g5` wall.

**Black's main replies:**

- **5...Nf6** — the **Berlin Defense**, Black's main and best. Develops, hits e4.
- **5...d6** — the **Kolisch Defense**, the main sound alternative. Kicks the e5-knight; after `6.Nxg4` Black gets `...Nf6` with quick development.
- **5...h5** — the **Long Whip**; props up g4. White plays `6.Nxg4` (or Bc4) regaining material with a good game.
- **5...Bg7** — Paulsen Defense; solid-ish, slightly passive.

#### Main line: 5...Nf6 (Berlin Defense)

`...6.Bc4 d5 7.exd5 Bd6` (the **Anderssen Defense**), then a long, well-mapped path:
`8.d4 Nh5 9.O-O Qxh4 10.Qe1! Qxe1 11.Rxe1 O-O 12.Bb3 Bf5` reaching a roughly balanced middlegame/endgame.

White's main alternatives at move 6:
- **6.d4** — the **Rubinstein Variation**; `6...d6 7.Nd3 Nxe4 8.Bxf4` is the tabiya. White regains the f-pawn, owns the centre, and has easy development for the pawn.
- **6.Nxg4** — leads to the wild forcing line `6...Nxe4 7.d3 Ng3 8.Bxf4 Nxh1 9.Qe2+ Qe7 10.Nf6+ Kd8 11.Bxc7+! Kxc7 12.Nd5+ Kd8 13.Nxe7 Bxe7` — White ends up with **rook+bishop+knight vs queen+pawn** in a totally imbalanced position. Know it exists; don't wander in unprepared.

> **Black trap to avoid (Kieseritzky "hanging knight"):** after the Berlin, the knight that goes to h5 (or h1) can get *stranded*. Don't grab material with a knight that has no way home while your king sits in the centre. Count escape squares before you snatch.

> **The Kieseritzky Queen Trap (Black beware):** in several `...Qh4+`-then-`...Qxh4`-grabbing lines, White plays `Qe1!` (as in the main line move 10) trading or trapping the adventurous black queen on the h-file. If your queen is deep in White's kingside grabbing pawns, make sure it isn't about to be hit by `Qe1`, `Be2–h5`, or `g3`.

#### The Five Questions — Kieseritzky main line

- **White pieces:** `Ne5` = the hero (f7/g4/d7 pressure); `Bc4`→ f7 battery; pawn `h4`→ already opened lines, now the h-file is a resource; `d4`→ claims centre and opens the c1-bishop; queen→ e1/e2 (note the `Qe1` trick vs the black queen). **Goal:** open f7 and the centre faster than Black can castle.
- **Black pieces:** `Nf6`→ hits e4, heads to h5 to defend f4/attack; `Bd6`→ defends f4 and eyes h2; `...d5`→ the freeing break (returns the pawn, opens lines for *Black's* pieces, hits the Bc4). `...Qxh4` grabs but is risky. **Goal:** complete development, neutralise via `...d5`, castle, and reach an endgame where the structure/extra material tells.
- **Pawn structure:** White's `d4+` central mass vs Black's `f4+g4` advanced duo. **White's break = `d4` and prying with the h-file; Black's break = `...d5`.** The `f4` pawn is Black's pride (cramps White) and Black's burden (target).
- **Weaknesses:** Black — f7, the still-uncastled king, the loose g4/f4 pawns. White — the missing kingside pawns, slightly airy king after `O-O` into a half-open position.
- **Immediate threats to watch:** `Bxf7+` ideas; `Nxg4` regaining material and opening the g-file; for Black, `...Qh4+`/`...Bxe5` resources and the `...d5` lever.
- **Quiet plan:** White — `Nc3`, `d4`, `Bxf4`, double on the f-file. Black — get the king off the e-file (`...O-O` once `...d5` has freed things), trade queens (the `Qxe1`/`Qe1` swap), and grind the endgame.

---

### 2C — Allgaier Gambit

`1.e4 e5 2.f4 exf4 3.Nf3 g5 4.h4 g4 5.Ng5`

Instead of the solid e5, White plays `5.Ng5?!` intending the **piece sacrifice `5...h6 6.Nxf7! Kxf7`**. White rips open the f-file and chases the black king into the open with `7.d4` (Thorold), `7.Bc4+` (Walker/Urusov), or `7.Nc3` (Blackburne).

**Verdict: objectively unsound** but ferociously tricky — a classic blitz/club weapon. After `6.Nxf7 Kxf7 7.Bc4+ d5! 8.Bxd5+ Kg7` Black consolidates and the king tucks away on g7/h7; with accurate defense Black is winning.

> **The Allgaier Trap (for the *White* attacker to know, and Black to avoid):** if Black defends carelessly after `Nxf7`, motifs like `Bxf4+`, `d4+`, `Bc4+` followed by `Be5/Ne4–f6` produce quick mates against the wandering king. Black's antidote is the precise `...d5!` counter-sac to block the c4-bishop's check and buy time to run the king to g7.

#### The Five Questions — Allgaier

- **White:** every piece is an attacker the instant the f7-knight gives itself up — `Bc4`(checks), `d4`(opens c1-bishop with tempo via `Bxf4`), queen swings to f3/g4/e2, rook to f1. **The king on f7/g7 is the only target that matters.**
- **Black:** the **extra knight** must be made to count — return *some* material with `...d5` to kill the attack, finish development (`...Nf6`, `...Bg7`, `...Qf6/...Qe7`), shepherd the king to g7/h7. **Don't be greedy; survive and you win.**
- **Pawn structure:** irrelevant compared to king safety in the short term; long-term Black's extra piece + White's broken pawns favor Black if Black survives.
- **Weakness:** Black's exposed king *now*; White's missing piece *later*.
- **Threat right now:** mate. Always. Check every check.
- **Quiet plan (if Black survives the storm):** trade pieces, consolidate the king, win with the material.

---

### 2D — Fischer Defense (3...d6)

`1.e4 e5 2.f4 exf4 3.Nf3 d6`

```
Black to move just played ...d6
8  r n b q k b n r
7  p p p . . p p p
6  . . . p . . . .
5  . . . . . . . .
4  . . . . P p . .
3  . . . . . N . .
2  P P P P . . P P
1  R N B Q K B . R
      a b c d e f g h
```

**Bobby Fischer's idea** (after losing to Spassky's Kieseritzky): play `...d6` **first**, to take the **e5-square away from White's knight**, *then* play `...g5` to hold f4. This sidesteps the whole Kieseritzky/Ne5 monster.

Main line: `4.d4 g5 5.h4 g4 6.Ng1!` (the knight retreats — it has no e5 — and reroutes via e2/h3) `...Bh6` / `...f3` etc., or `4.Bc4` transposing to Hanstein/Philidor setups (`4...g5 5.h4 h6` = Philidor; `4...g5 5.O-O Bg7` = Hanstein).

**Assessment:** Solid and a recurring choice; Black keeps the pawn with less risk than 3...g5 because White's knight is denied e5. White still has development and the centre for the pawn.

#### The Five Questions — Fischer Defense

- **White:** `d4`→ grabs the big centre Black conceded; `Bc4`→ f7; the knight must take the *long route* (`Ng1–e2` or `Nh3`) since e5 is off-limits — this loss of time is exactly what Black bought with `...d6`. Plan: open the centre and f-file before Black coordinates.
- **Black:** `...d6` (already played) = anti-Ne5 prophylaxis; `...g5/...f4` hold the pawn and gain kingside space; `...Bg7` rakes the long diagonal; `...Bh6` defends f4 from the side; `...Nc6/...Ne7` develop. Plan: keep f4, develop the dark-squared bishop actively, castle (often kingside behind the pawns, or stay flexible).
- **Pawn structure:** Black's `d6+f4(+g5)` vs White's `d4+e4`. Black's break: `...d5` later, or holding with `...f3`. White's break: `e5` or prying the kingside with `h4`/`g3`.
- **Weakness:** Black's kingside pawns and king; White's e1–h4 diagonal and the f4-pawn it can't easily win back.
- **Immediate threat:** watch `h4` undermining g5, `Bxf7+` shots, and `e5` central breaks.
- **Quiet plan:** Black consolidates and nurses the extra pawn; White completes development and looks for the f-file/centre rupture.

---

### 2E — Modern / Abbazia Defense (3...d5) — *recommended for Black*

`1.e4 e5 2.f4 exf4 3.Nf3 d5!`

```
White to move — Black strikes the centre
8  r n b q k b n r
7  p p p . . p p p
6  . . . . . . . .
5  . . . p . . . .
4  . . . . P p . .
3  . . . . . N . .
2  P P P P . . P P
1  R N B Q K B . R
      a b c d e f g h
```

**The clean, low-theory, sound equalizer.** Black says: *"Keep your gambit pawn back — I'll take the e4-pawn instead, get fast development, castle, and exploit your weakened kingside."* This is the same idea as the Falkbeer and can transpose (`2...d5 3.exd5 exf4` reaches the same family).

Main line: `4.exd5 Nf6!` (better than rushing `4...Qxd5 5.Nc3` which loses a tempo) `5.Bc4` (or 5.Bb5+, 5.c4) `...Nxd5 6.O-O Be7` / `...Be6` with easy, harmonious development.

**Why this is so pleasant for Black:**
- Black develops **naturally and fast** (`...Nf6`, `...Bd6/Be7`, `...O-O`, `...Bg4/Be6`).
- The f4-pawn is given back, so Black isn't burdened defending it — instead **Black often regains it later** under good circumstances, or simply gets full equality.
- White's kingside is loosened and White's "central majority" is neutralised because Black got the d5/e-file counterplay.

Endgame note: White retains a *nominal* extra central pawn / piece activity edge in some lines, but practically Black is comfortable and scores well.

#### The Five Questions — Modern/Abbazia

- **Black pieces:** light-squared bishop → `g4` (pinning Nf3) or `e6` (hitting White's centre/c4-bishop); `Nf6`→ recaptures on d5, hits e4-ideas, supports `...f4` stuff; dark-squared bishop → `d6` (eyeing h2/f4) or `e7`; queen → `...Qxd5` only with tempo or after `...Nf6`; rooks → the **e-file** (open after the centre clears) pointing at White's king. **Job summary: rapid development + pressure down the e-file and the c8–h3 diagonal at White's airy king.**
- **White pieces:** `Nf3`→ blockade/king cover, but it's *pinnable* by `...Bg4`; `Bc4`→ f7, but it gets hit by `...d5`/`...Nd5`; `d4`→ wanted for the centre; the king → needs to castle quickly because the f-file cuts both ways. **Job: untangle, neutralise the e-file, hold the slight central edge.**
- **Pawn structure:** symmetrical-ish after the dust settles; the key feature is the **half-open e-file (Black's) vs half-open f-file (White's)** — a race of who attacks whose king first. Black's d-pawn vs White's d-pawn; Black's typical lever is `...c6`/`...f4`-related play; White's is `c4`/`d4`.
- **Weaknesses:** White's king and the e1–h4 diagonal are the long-term scars of `f4`. Black has no structural weakness if developed cleanly — that's the whole appeal.
- **Immediate threat to watch:** `Bb5+`/`Qe2+` check tricks before you've castled; `Ne5` hops; pins on your Nf6. As Black, get the king castled and the e-file working.
- **Quiet plan:** Black — `...O-O`, `...Re8`, `...Bg4`/`...Be6`, pressure e-file & White's king, regain f4 or trade into a good ending. White — castle, play `d4`+`c4` for the centre, blunt the e-file with `Qe1`/`Re1`, trade down the initiative.

---

### 2F — Cunningham Defense (3...Be7)

`1.e4 e5 2.f4 exf4 3.Nf3 Be7!?`

**Idea:** threaten **`4...Bh4+`**, a check that (because there's a knight on f3 covering... wait — h4 is *not* covered by Nf3) forces `5.g3` weakening White, or drives the king to `f1`/`e2` permanently denying castling.

- **Sharp main try:** `4...Bh4+ 5.g3 fxg3 6.O-O!?` (the **Bertin/Three-Pawns** spirit) `gxh2+ 7.Kh1` with a raging attack for two pawns — White's rook on f-file and bishop on c4 hunt f7. Dangerous for both.
- **Modern, calmer:** `4.Bc4` and if `4...Bh4+ 5.Kf1` White keeps an edge with the bishop already developed; Black's check has cost time.

**Assessment:** Respectable but concrete; the `...Bh4+` lines are tactical. Less popular than 3...d5/3...d6 but a fine surprise.

#### The Five Questions — Cunningham

- **Black:** `Be7→h4` = the whole point (provoke g3 / stop castling); then develop normally and try to keep f4 or open lines at the loosened white king. **Job: exploit the e1–h4 diagonal directly.**
- **White:** `Bc4`(f7) + `Nf3`(centre) + quick `O-O` or `Kf1`; if Black grabs pawns on g3/h2, White's open f-file and bishop generate a real attack. **Job: turn Black's pawn-grabbing on the kingside into open lines for a sacrifice.**
- **Pawn structure:** if `...fxg3` happens, White's kingside pawns vanish but the f-file rips open — material vs initiative again.
- **Weakness:** White's king (Black's target) vs Black's f7 and slow development if Black gets greedy.
- **Threat now:** `...Bh4+` for Black; `Bxf7+`/f-file shots for White.
- **Quiet plan:** Black consolidates the dark-squared bishop and extra pawn; White attacks f7 down the open file.

---

### 2G — Schallopp Defense (3...Nf6)

`1.e4 e5 2.f4 exf4 3.Nf3 Nf6`

**Idea:** hit e4 immediately; after `4.e5 Nh5` the knight defends f4 from h5. Provocative — that h5-knight is offside. Famous moment: **Ding Liren beat Carlsen** with this in the 2020 online Magnus Carlsen Invitational.

> **Schallopp trap (Black beware):** the h5-knight is loose. `4.e5 Nh5 5.d4 d6 6.Qe2 Be7? 7.exd6 Qxd6 8.Qb5+!` wins the h5-knight. **Correct is `6...d5! =`** keeping things together. Lesson: don't let your offside knight get hit by a tempo-check.

#### The Five Questions — Schallopp

- **Black:** `Nf6→h5` defends f4 but is offside (must be careful); plan `...d6`/`...d5`, `...Be7`, `...g6` to support h5 and castle. **Job: hold f4 while solving the awkward knight.**
- **White:** `e5` gains space and kicks the knight; `d4` centre; `Qe2`/`Qb5+` exploit the loose Nh5; `Bxf4` regains the pawn. **Job: punish the offside knight and dominate the centre.**
- **Pawn structure:** White's `d4/e5` wedge vs Black's `f4` straggler — White has space, Black has the extra (loose) pawn.
- **Weakness:** Black's h5-knight and dark squares; White's e1–h4 diagonal.
- **Threat now:** tempo-checks (`Qb5+`) and `g4` trapping the h5-knight.
- **Quiet plan:** Black untangles with `...d5/...g6`; White expands and targets f4/h5.

---

## Part 3 — Bishop's Gambit and the Muzio family

### 3A — Bishop's Gambit proper

`1.e4 e5 2.f4 exf4 3.Bc4`

```
Black to move
8  r n b q k b n r
7  p p p p . p p p
6  . . . . . . . .
5  . . . . . . . .
4  . . B . P p . .
3  . . . . . . . .
2  P P P P . . P P
1  R N B Q K . N R
      a b c d e f g h
```

**White's concept:** develop the bishop to its best square (eyeing f7) **before** Nf3, deliberately *allowing* `3...Qh4+ 4.Kf1`. White gives up castling rights but:
- the king on **f1 is actually quite safe**, and
- after the inevitable `Nf3`, White **gains tempo on the black queen** and develops fast.
- Bonus: there's **no knight on f3 yet**, so White's queen can use the `d1–h5` diagonal (e.g. `Qf3`, `Qe1–h4`). This was the opening of the **Immortal Game** (Anderssen–Kieseritzky 1851). Some strong players consider 3.Bc4 *better* than 3.Nf3.

**Black's main replies:**
- **3...Nf6** — the **modern main line / best.** Hits e4. `4.Nc3 c6 5.Bb3 d5` with a sound game. White can't easily exploit anything.
- **3...d5!** — the **Bledow**, a clean equalizing return of the pawn: `4.Bxd5` (avoiding self-block) `...Nf6` (Morphy Variation) `5.Nc3 Bb4 6.Nf3 O-O 7.O-O` — Black is fine; the knight on d5 vs bishop pair is balanced. (`4.exd5 Qh4+ 5.Kf1 Bd6` is the other branch.)
- **3...Qh4+ 4.Kf1** — the **Classical**; still popular, resurgent in the 21st century. `4...d6` (Cozio) is highly regarded; `4...Nc6`, `4...g5`, `4...Nf6` are all played. White will play `Nf3` hitting the queen, then `d4`, `Nc3`, and attack.

> **Sharp White idea (Williams/McDonnell Attack):** instead of `Nf3`, White plays `g3!?` hitting f4 — if `...fxg3` then `Kg2!` and the open f/g-files plus `Qf3` give a strong attack on f7. Double-edged and fun.

#### The Five Questions — Bishop's Gambit

- **White:** `Bc4` = the star, glued to the a2–g8 diagonal at f7; king on f1 is safe and out of checks; `Nf3` comes *with tempo* on the queen; queen enjoys the open `d1–h5` diagonal (`Qf3`/`Qe1–h4`); `d4`+`Nc3` build the centre. **Job: rapid development + f7 pressure, using the queen's extra freedom.**
- **Black:** `...Qh4+` grabs the diagonal but the queen becomes a *target* (loses time to Nf3); `...d5` is the clean equalizer (returns the pawn, opens lines, hits Bc4); `...Nf6` hits e4 and develops. **Job: neutralise via `...d5`/`...Nf6`, develop, and target White's slightly displaced king (no castling).**
- **Pawn structure:** White central majority + half-open f-file vs Black's extra f4-pawn (if kept) and the e1–h4 diagonal. After `...d5`, structure is near-symmetric and White's king-on-f1 is the talking point.
- **Weakness:** White — no castling, the e1–h4 diagonal, the f4-pawn it must work to regain. Black — f7, and the loose queen if it ventures to h4.
- **Threat right now:** `Bxf7+` motifs; `Nf3` (hitting a queen on h4); for Black, `...Qh4+`/`...d5`.
- **Quiet plan:** White — `Nf3`(tempo), `d4`, `Nc3`, double f-file, attack f7. Black — `...d5`, `...Nf6`, `...Be7/Bd6`, `...O-O`, pressure the f1-king and the e-file.

---

### 3B — Muzio Gambit

`1.e4 e5 2.f4 exf4 3.Nf3 g5 4.Bc4 g4 5.O-O!`

```
Black to move — White just CASTLED into the attack
8  r n b q k b n r
7  p p p p . p . p
6  . . . . . . . .
5  . . . . . . . .
4  . . B . P p p .
3  . . . . . N . .
2  P P P P . . P P
1  R N B Q . R K .
      a b c d e f g h
```

**The most romantic sacrifice in chess.** After `5...gxf3 6.Qxf3`, White is **down a whole knight** but has **three pieces (Qf3, Bc4, Rf1) screaming at f7** and a colossal lead in development.

```
After 5...gxf3 6.Qxf3 — White is a knight down
8  r n b q k b n r
7  p p p p . p . p
6  . . . . . . . .
5  . . . . . . . .
4  . . B . P p . .
3  . . . . . Q . .
2  P P P P . . P P
1  R N B . . R K .
      a b c d e f g h
```

**Main line:** `6...Qf6` (Black defends f7 and blockades f4) `7.e5! Qxe5 8.Bxf7+!?` (the **Double Muzio** — a *second* piece!) `8...Kxf7 9.d4 Qxd4+ 10.Be3 Qf6 11.Bxf4` (or `11.Nc3`) — White has two pieces fewer but a murderous initiative; some masters assess it as roughly equal, and **in practice White's attack is far easier to play.**

Other Black tries: `6...Qe7` (Kling & Horwitz), `5...d5?!` (Brentano — White answers `6.exd5` or `6.Bxd5` with a strong attack), `5...Qe7`.

> **Greco's Trap / f7 motifs:** in many Muzio/Salvio lines, if Black grabs greedily or misplaces the queen, White wins with `Bxf7+ Kxf7 Qxf4+`/`Qh5+` forks, or `Ne5+`/`d4` discovered hits. The defender must return material and *develop the queenside fast* (`...Nc6`, `...Qf6`, `...Bxf4` to trade attackers).

**Verdict:** Engines say dubious/losing for White with perfect defense — but it's one of the deadliest practical weapons in blitz/rapid and against the unprepared. Know it cold from *both* sides.

#### The Five Questions — Muzio

- **White:** `Qf3`(f7 + f-file), `Bc4`(f7), `Rf1`(f-file, opened by the sac), `d4`(opens c1-bishop with tempo via `Bxf4`, grabs centre), `Nc3`(joins fast). **Job: the most ruthless f7/king-hunt in the opening; every piece is an attacker.**
- **Black:** the **extra knight (later two)** must justify itself; `...Qf6` defends f7 and bolsters f4; `...Bxf4` or `...Qxf4` trades off an attacker and the dangerous pawn; `...Nc6/...Ne7`, `...d6/...d5` to develop and blunt the bishop; **the king must find shelter.** **Job: give material back at the right moment, trade attackers, consolidate.**
- **Pawn structure:** White sacrifices structure and material wholesale for time; if Black survives to an endgame the extra piece(s) win. Short-term, structure is irrelevant — only king safety and initiative matter.
- **Weakness:** Black's f7 + uncastled king *now*; White's missing pieces *if Black survives*.
- **Threat right now:** mate/decisive material on f7. **Recheck f7 every single move.**
- **Quiet plan (Black, post-storm):** trade queens and attackers, march the king to safety, win with the material. (White has no "quiet plan" — quiet = White is just lost; White *must* keep attacking.)

---

### 3C — Muzio relatives

All start `1.e4 e5 2.f4 exf4 3.Nf3 g5 4.Bc4 g4` and then choose **not** to castle:

| Move | Name | Idea & verdict |
|---|---|---|
| **5.d4** | **Ghulam-Kassim** Gambit | Open the centre/c1-bishop instead of castling. Inferior to Muzio (no f-file rook lift), but tricky. |
| **5.Nc3** | **McDonnell** Gambit | Sac the knight via a different route; lacks the f-file punch of Muzio. |
| **5.Bxf7+?!** | **Lolli** Gambit | Immediate bishop sac: `5...Kxf7 6.Ne5+` chasing the king. Romantic; **Marshall once fell into a Lolli trap.** Unsound but dangerous. |
| **5.Ne5** | **Salvio** Gambit | Knight to e5 *without* h4 prep. Almost extinct because **`5...Qh4+!`** hits the king and gives Black an easy game. |

> **Salvio annoyance (for White):** because `5...Qh4+` is so strong (forcing `6.Kf1`/`6.g3`), many King's-Gambiteers avoid the whole `4.Bc4 g4 5.Ne5` route. This is *why* the Muzio (`5.O-O`) and the modern `4.Nc3` Quaade exist.

#### The Five Questions — Muzio relatives (shared)

- **White:** identical attacking pieces (Bc4→f7, queen→f-file/diagonal, rook→f1 if castled, d4→centre), but **fewer attackers or a less open f-file** than the pure Muzio, so the sacrifices are objectively worse.
- **Black:** same defensive recipe — `...Qh4+` where available (Salvio!), return material, trade attackers, consolidate the king, win on material.
- **Pawn structure / weakness / threats / quiet plan:** as in the Muzio section — king safety dominates; f7 is the eternal target; survive and the extra material decides.

---

## Part 4 — Declining the Gambit

### 4A — Classical KGD (2...Bc5)

`1.e4 e5 2.f4 Bc5`

```
White to move
8  r n b q k . n r
7  p p p p . p p p
6  . . . . . . . .
5  . . b . p . . .
4  . . . . P P . .
3  . . . . . . . .
2  P P P P . . P P
1  R N B Q K B N R
      a b c d e f g h
```

**Black's concept:** refuse the pawn; instead drop the bishop on `c5`, hitting the **a7–g1 diagonal** and the `g1`/`f2` squares. The point: **White can never comfortably castle kingside** while this bishop glares at g1, and `f2` is permanently tender. Black keeps a sound, classical position and lets White's `f4` advance be a *weakness* rather than a battering ram.

> **The defining trap:** `3.fxe5?? Qh4+!` and White is lost — `4.g3 Qxe4+` forks king and h1-rook, or `4.Ke2 Qxe4#` is mate. So **White must not take e5**, and indeed White isn't threatening to.

**Main line:** `3.Nf3 d6 4.Nc3 Nf6 5.Bc4 Nc6 6.d3` (a quiet, Italian-like structure) with the further plan `...a6`, `...O-O`, and for White the awkward task of dealing with the c5-bishop — often via **`Na4`** (to trade it) or `Bd2`/`Qe1–g3` maneuvers, sometimes spending two tempi (`Nc3–a4xc5`) just to remove the annoying bishop so White can castle.

White's sharper option: `3.Nf3 d6 4.b4!?` (gaining queenside space, hitting the bishop) or `4.c3` preparing `d4`.

#### The Five Questions — Classical KGD

- **Black:** `Bc5` = the star — freezes White's king in the centre, pressures f2/g1; `...d6`+`...Nf6`+`...Nc6` = solid classical development; `...a6`/`...a5` to keep the bishop's diagonal (meet b4 with `...a5` or `...Bb6`); king often castles **kingside** safely because *White's* king is the stuck one. **Job: exploit the f4-weakening by keeping White's king in the centre and the f2-square sore.**
- **White:** `Nf3`(covers h4, develops), `Nc3`(develops, eyes d5/Na4-to-trade-the-bishop), `Bc4`(Italian diagonal), `d3`(solid centre) — White wants to neutralise the c5-bishop (via `Na4` or `Be3`/`Bd2`) and *then* castle; the f-file is still a long-term asset if White ever plays `fxe5` under good conditions. **Job: untangle the king, trade off the c5-bishop, use the f-file later.**
- **Pawn structure:** classical `d6/e5` vs `d3/e4` with White's f4 vs Black's e5 tension. **Levers:** White's `fxe5` (only when safe) or `d4`; Black's `...exf4` (opening the e-file toward White's stuck king) or `...d5`.
- **Weakness:** White's king (can't castle easily), f2, the e1–h4 diagonal. Black is rock-solid; main concern is the slightly loose e5/kingside if White ever gets `fxe5` in safely.
- **Immediate threat:** mostly positional; watch `b4` hitting the bishop, `Na4` trading it, and any `fxe5` that's actually safe. Black watches for `Ng5` shots at f7 once developed.
- **Quiet plan:** Black — complete development, keep the bishop on its diagonal, consider `...exf4` to open the e-file at the right moment, pressure f2/e-file. White — `Na4`/`Be3` to trade the bishop, achieve `O-O` or `O-O-O`, then use the half-open f-file.

---

### 4B — Falkbeer Countergambit (2...d5)

`1.e4 e5 2.f4 d5`

```
White to move
8  r n b q k b n r
7  p p p . . p p p
6  . . . . . . . .
5  . . . p p . . .
4  . . . . P P . .
3  . . . . . . . .
2  P P P P . . P P
1  R N B Q K B N R
      a b c d e f g h
```

**Black's concept:** *answer a gambit with a gambit.* Strike `d5` to blow open the centre while White's kingside is loose, betting that **rapid development + White's weakened king** outweigh a pawn. White almost always takes: `3.exd5`.

> **The famous blunder:** `3.fxe5?? Qh4+!` again wins for Black (rook or mate, as above). White must play `3.exd5`.

After `3.exd5`, Black's three roads:

1. **3...exf4** — **transpose to the Modern/Abbazia** (Part 2E) — *the rock-solid, recommended choice.* Black will round up the d5-pawn or get full equality with easy development (`...Nf6`, `...Bd6`, `...O-O`). This is the practical, low-risk Falkbeer.
2. **3...c6!?** — the **Nimzowitsch–Marshall Countergambit** (modern, John Nunn's choice): offer *another* pawn to rip open lines. `4.Nc3` (best; `4.Qe2` is "greedy and clumsy" per Shaw but keeps a pawn) `4...exf4 5.Nf3 Bd6` with active piece play and pressure for the pawn. Black must know many lines.
3. **3...e4** — the **old main line**: push past instead of recapturing, gaining space and a protected passed-ish e-pawn, but it can become weak. `4.d3!` (challenge it at once; `4.Nc3 Nf6` lets Black castle faster) `4...Nf6 5.dxe4 Nxe4 6.Nf3` and now Boris Alterman's `6...c6!?` — playable but **modern theory and engines consider this slightly better for White**: the e4-advance commits Black and White's extra structure tells.

> **Falkbeer Queen Trap (Black beware):** in `3...e4 4.d3` lines, careless recaptures or an early `...Qxd5`/`...Bf5` can run into `Nc3`/`Bb5+`/`Qe2` tactics that win the queen or a piece. Develop with checks/threats *neutralised* before grabbing.

**Overall verdict:** With `3...exf4` (→ Abbazia) Black is comfortable and this is the recommendation. `3...c6` is fully playable but theory-heavy. `3...e4` is the romantic old main line but objectively a touch worse for Black.

#### The Five Questions — Falkbeer

- **Black:** `...d5` lever = open the centre vs the loosened king; in the `...e4` line the **e4-pawn** cramps White (a thorn) but needs constant support; pieces flood out — `...Nf6`, `...Bd6/Bc5`, `...Bf5/Bg4`, `...O-O`, `...Re8` hammering the **e-file** at White's king. **Job: convert the lead in development + White's king weakness into an attack before White consolidates the extra pawn.**
- **White:** `exd5` bags a pawn; then **return it or hold it while developing** — `d3`/`Nc3` challenge Black's e4-thorn, `Nf3` blockades, `Bb5+`/`Qe2` hit loose Black pieces, castle and consolidate. **Job: blunt Black's initiative, keep the extra/central pawn, reach a safe position where material tells.**
- **Pawn structure:** the battle is the **e4-pawn (Black's, in the ...e4 line) vs White's d3/f-pawns**, and the **half-open e-file (Black) vs half-open f-file (White)** — mirror-image king-attacks. In the `...exf4`/Abbazia route it's the comfortable near-symmetry described in 2E.
- **Weakness:** White's king & e1–h4 diagonal (Black's targets) vs Black's e4-pawn / slightly loose centre (White's target).
- **Immediate threat:** for White, `Bb5+`/`Qe2+` and rounding up e4; for Black, `...e4–e3` cramps, `...Bb4+`/`...Re8` pins and pressure. **Both sides: watch the early `Qh4+`/`Qe2+`/`Bb5+` check-tactics.**
- **Quiet plan:** Black — finish development, pile on the e-file, keep White's king stuck; White — trade off Black's active pieces and the e4-thorn, castle, convert the pawn.

---

### 4C — Minor declines

| Move | Name | Key idea / line | Verdict |
|---|---|---|---|
| **2...Nc6** | Queen's-Knight Defense / **Adelaide** (with ...f5) | `3.Nf3` then `3...f5!?` (Tony Miles's Adelaide) `4.exf5 e4 5.Ne5` — sharp; or `3...d5 4.exd5 Qxd5 5.Nc3⩲` losing a tempo. Often transposes to Hanstein/Cozio after `...g5`. | Playable, offbeat; White gets typical KG complications. |
| **2...d6** | Nordwalde / "old" | `3.Nf3 exf4` reaches a **Fischer Defense** (good); but `2...d6` also lets White play `3.d4!` with a strong centre, and if Black doesn't take f4 it's a passive KGD with the f8-bishop boxed in. | OK only if Black intends `...exf4`. |
| **2...Nf6** | — | `3.fxe5 Nxe4 4.Nf3 Ng5!` and play gets sharp; or `4...d5`. | Tactical, rarer. |
| **2...Qh4+?!** | — | `3.g3! Qe7` (or Qh5/Qh6) and the queen has just wasted time; White is happy. | Premature — *don't* check yet (see Part 0). |

---

## Part 5 — The Trap Encyclopedia

> *This is the question-4 section: "What is my opponent threatening right now?" Internalise these patterns and you stop losing to tricks — and start winning with them.*

### Traps that punish WHITE (Black to exploit)

1. **The `fxe5??` catastrophe (move 2–3).** In *any* line where White grabs e5 while the e1–h4 diagonal is open and h4 is not covered: `...Qh4+!` wins. `g3 Qxe4+` forks king + h1-rook; `Ke2 Qxe4#` mates. Appears vs `2...Bc5`, `2...d5`, and after careless move-orders. **Carlsen has fallen for this in blitz.**

2. **Salvio `5.Ne5? Qh4+!`** (`3.Nf3 g5 4.Bc4 g4 5.Ne5`). The check on h4 hits the king *and* eyes e4; Black gets an easy, pleasant game and White's whole attack misfires.

3. **Premature `d4` (move 3).** `2...exf4 3.d4?` `...Qh4+!` — the entire reason `Nf3` must come first. Same idea wrecks White if the knight ever leaves f3 with the diagonal open.

4. **Greedy `4.Qe2` in the Nimzowitsch Falkbeer.** `2...d5 3.exd5 c6 4.Qe2?!` ("greedy and clumsy") — Black gets full play for the pawn; the classic illustration is **Johner–Alekhine, Carlsbad 1911**, where a young Alekhine was actually *beaten*, but modern theory shows Black is doing well after accurate play.

### Traps that punish BLACK (White to exploit)

5. **Schallopp loose-knight:** `3...Nf6 4.e5 Nh5 5.d4 d6 6.Qe2 Be7? 7.exd6 Qxd6 8.Qb5+!` wins the h5-knight. **Antidote: `6...d5!`**

6. **The Kieseritzky Queen Trap:** after Black's queen goes pawn-hunting (`...Qxh4`, …deep on the kingside), White's **`Qe1!`** (main line move 10) or `Be2–h5`/`g3` nets or trades the overextended queen. Don't send your queen souvenir-hunting with your king in the centre.

7. **Hanging-knight in the Kieseritzky:** the `...Nh5`/`...Nxh1` knights can be **trapped in the corner**. White plays `Qe2`/`Be2`/`g3` and the knight never escapes. *Count the knight's exits before grabbing the h1-rook.*

8. **Allgaier mating nets:** after `4.h4 g4 5.Ng5 h6 6.Nxf7 Kxf7 7.Bc4+` (or `7.d4`, `7.Nc3`), careless king moves walk into `Bxf4+`/`Be5+`/`Nd5–f6` mating ideas. **Antidote: `7...d5!`** blocking the bishop and giving the king luft to run to g7.

9. **Muzio / Double-Muzio f7 storms:** down a piece (or two!), White's `Qf3`+`Bc4`+`Rf1` mate on or around f7 if Black grabs more or castles into it. **Antidote:** return material with `...Qf6` and `...Bxf4`/`...Qxf4`, develop the queenside, *do not be greedy*.

10. **Greco's Trap (Salvio/Bishop's Gambit family):** `Bxf7+ Kxf7 Qxf4+`/`Ne5+` forks recover the piece with interest when Black's king or queen is exposed. Watch every `Bxf7+`.

11. **Morphy's Trap (Bishop's Gambit, `Bxd5` lines):** after `3.Bc4 d5 4.Bxd5`, if Black mishandles the recapture/development, White's `Nc3`+`Nf3`+`O-O` and a `Qe1–h4`/`Re1` build-up exploit the half-open files and the d5-knight to win material or mate. Keep development sound; don't snatch the d5-bishop and fall behind.

12. **The Lolli that caught Marshall:** `4.Bc4 g4 5.Bxf7+!? Kxf7 6.Ne5+` — even strong players have walked the king into trouble here. **Antidote:** precise king-walk + early material return.

> **The universal rule (memorise):** in *every* Accepted line, before you (Black) make a non-forcing move, **look at f7, look at e8/the e-file, look at the h5–e8 and a2–g8 diagonals, and look at whether your king can still reach safety.** In *every* line as White, before relaxing, **check `...Qh4+`/`...Qe7+` and whether your king on e1/f1 is about to be opened up.**

---

## Part 6 — Pawn Structures Decoded

Understanding these tells you the answer to **questions 2 and 5** automatically.

### Structure A — "White's classical centre" (the dream)
White has pawns on **d4 + e4** (Black having traded the e5-pawn). Often with `Bc4` and a recaptured pawn on f4 (via `Bxf4`).
- **Space:** White, in the centre. **Break that helps White:** `e5` (gaining space, opening lines toward Black's king) or simply building up before opening the f-file.
- **Black's counter-break:** `...d5` (the universal freeing lever) or `...c5` to hit d4.
- **Plan:** White attacks down the f-file / in the centre; Black breaks with `...d5` and seeks the endgame.

### Structure B — "Black's advanced kingside pawns" (g5/f4, sometimes h6)
Arises in the `3...g5` complex.
- **Space:** Black, on the kingside — but the pawns are **brittle/over-extended**.
- **Break that helps White:** `h4!` (crack the chain) and sometimes `g3`.
- **Break that helps Black:** `...f3` (lock White's king in, freeze the kingside) and `...d5` (free the pieces, return the pawn).
- **Plan:** White pries the kingside open and targets the uncastled king; Black either locks it with `...f3` and consolidates, or returns the pawn via `...d5` and castles.

### Structure C — "Mutual half-open files" (Modern/Abbazia & Falkbeer)
After early `...d5`/`exd5`/`exf4`, you typically get **Black with the half-open e-file, White with the half-open f-file**, near-symmetrical pawns.
- **Space:** roughly balanced. **It's a king-attack race.**
- **Break that helps Black:** `...f4`-related ideas and piling on the e-file (`...Re8`) while White's king is loose.
- **Break that helps White:** `c4`/`d4` for the centre and using the f-file at f7.
- **Plan:** whoever attacks the *enemy king* faster wins; Black's structural soundness + White's looser king make this comfortable for Black.

### Structure D — "Black's e4-thorn" (Falkbeer `3...e4`)
Black has a pawn on **e4** cramping White.
- **Space:** Black, but the e4-pawn is a **target** as much as a thorn.
- **Break that helps White:** `d3!` undermining e4. **Break that helps Black:** `...f5`/`...Re8` supporting e4 and opening lines.
- **Plan:** White rounds up or neutralises e4 and converts the extra pawn; Black uses the cramped white position to attack before it falls.

### Structure E — "Classical KGD lock" (2...Bc5, ...d6/...Nf6 vs d3/e4 with f4 vs e5 tension)
- **Space:** balanced; the story is **White's stuck king** vs the central tension.
- **Break that helps Black:** `...exf4` opening the e-file at White's king, or `...d5`.
- **Break that helps White:** a *safe* `fxe5`, or `d4`.
- **Plan:** Black keeps White's king in the centre and pressures f2/e-file; White trades the c5-bishop and castles, then uses the f-file.

---

## Part 7 — Piece Job Descriptions

Quick reference for **question 1** ("what is each piece trying to do?"). 

### White's pieces in the King's Gambit

- **King's Bishop (f1→c4):** The crown jewel. It belongs on **c4** (or b3), drilling into **f7**. In the Bishop's Gambit it goes there *before* the knight. Almost every White attack runs through this bishop. *Trade it only if you get f7 or the king in return.*
- **King's Knight (g1→f3→e5):** Develops to **f3** (covering h4, killing `...Qh4+`), then dreams of **e5** — an outpost hitting f7/d7/g4/c6. In the Fischer Defense, denied e5, it reroutes **Ng1–e2** or **Nh3–f4/g3** (note the time lost — that's what `...d6` costs White). In the Muzio it is *sacrificed* for the f-file.
- **Queen's Knight (b1→c3):** Develops to **c3**, eyeing **d5** and supporting `e4/e5`. In the KGD vs `Bc5` it often detours **Nc3–a4** to trade the annoying c5-bishop so White can castle.
- **Dark-squared Bishop (c1):** Springs to life after **`Bxf4`** (recapturing the gambit pawn and sitting on a fine diagonal hitting c7/b8) once `d4` opens its path; or to **e3/g5/d2**.
- **Queen (d1):** Loves **e1/e2** (defending, then swinging to the h-file or e-file) and — *especially in the Bishop's Gambit where no knight blocks f3* — the **`d1–h5` diagonal** (`Qf3`, `Qh5`, `Qe1–h4`) for direct f7/king attacks.
- **Rooks:** The **f1-rook** is the star — the half-open **f-file** points at f7 (and gets fully opened in the Muzio). The other rook supports with `Re1` (e-file) or joins a kingside pawn-storm via the **h-file** (after `h4`).
- **The f4/h4 pawns:** `f4` is the gambit pawn (its absence = the f-file). `h4` is the **battering ram** that cracks Black's `...g5`.

### Black's pieces (Accepted / Modern setups)

- **Light-squared Bishop (c8→g4 or e6):** **g4** to pin the f3-knight (removing the f7-defender and the e5-jumper), or **e6** to hit White's c4-bishop and bolster d5. A key attacker against White's king.
- **Dark-squared Bishop (f8→d6, e7, g7, h6, or c5):** **d6** (eyeing h2/f4) and **e7** in the Modern; **g7** (long diagonal) in `...g5`/Fischer setups; **h6** to defend f4 from the side; **c5** in the KGD to *freeze White's king*.
- **King's Knight (g8→f6):** To **f6**, hitting e4 and supporting `...d5`; sometimes **Nf6–h5** to defend f4 (but beware the offside-knight traps).
- **Queen's Knight (b8→c6):** To **c6**, developing and eyeing d4/e5; in the Adelaide it supports a quick `...f5`.
- **Queen (d8):** `...Qh4+` is the recurring harassment (only when h4 isn't covered!) — but **don't let it get trapped** pawn-hunting (Kieseritzky `Qe1!`). `...Qe7`/`...Qf6` are solid squares that defend f7 and support `...f4`/development.
- **Rooks:** the **e8-rook** on the (half-)open **e-file** is Black's main attacker against White's stuck king in the Modern/Falkbeer; the other supports `...d5`/queenside.
- **The f4/g5 pawns (when kept):** f4 cramps White and is the extra material; g5 defends it but is brittle. **`...f3`** is the thematic "freeze White's king" lever; **`...d5`** is the "give it back and develop" lever.

---

## Part 8 — "After Move 10" Plan Bank

> *This is question 5, scaled up: concrete plans so you're never clueless once theory ends. Find your structure, follow the plan.*

### As WHITE

**If you reached Structure A (d4+e4 classical centre):**
1. Recapture f4 with the bishop (`Bxf4`) so all pieces are active.
2. Castle (`O-O`) — your king belongs on g1 behind the g/h-pawns.
3. Double rooks on the **f-file** (`Rf1`, `Raf1` or `Re1+Rf1`).
4. Reroute a knight to **e5** or **g5**; play `Qe1–h4`/`Qe2` toward the king.
5. Break with **`e5`** (or `d5`) to blast open lines toward f7/the black king.
6. *If Black has castled kingside:* consider `g4–g5`/`h4–h5` pawn-storm with the king already safe.

**If you reached Structure B (Black's g5/f4 wall):**
1. Play **`h4`** (if not already) to fracture the chain.
2. Open the **h-file**; bring a rook to h1 and the queen toward h5/h4.
3. Keep the **e5-knight** (Kieseritzky) glued there; support with `d4`.
4. If Black plays `...d5`, recapture and target the resulting open lines and f7.
5. Don't panic about the pawn — your **initiative + development** is the compensation; keep making threats so Black never castles.

**If you reached Structure C (mutual half-open files, you're White):**
1. **Castle immediately** — the f-file cuts both ways; king safety first.
2. Blunt Black's e-file with **`Qe1`/`Re1`** and trade Black's active pieces (especially the bishop on g4 via `h3`/`Be2`, and the d6-bishop).
3. Play **`c4`/`d4`** to mobilise your central majority.
4. Aim for an endgame where your extra/central pawn matters; trade Black's initiative away.

**In the Bishop's Gambit (king on f1):**
1. Play **`Nf3`** hitting any queen on h4 (gain tempo), then `d4`, `Nc3`.
2. Manually "castle by hand" if needed: `Kg1` after `g3`/`Kf2–g1` is sometimes possible, or just keep the king safe on f1/f2 behind pawns.
3. Use the queen's **`d1–h5` freedom** (`Qf3`/`Qe1–h4`) for f7 pressure.
4. Double on the f-file; break with `e5`/`d5`.

**Against the Classical KGD (2...Bc5):**
1. Neutralise the c5-bishop — **`Na4`** (trade it) or `Be3`/`Bd2`, sometimes `c3+d4` to challenge it, or `b4` to hit it (meet `...a5` with `a3`/`b5`).
2. **Then castle** (kingside once the bishop's gone, or queenside `O-O-O`).
3. Once safe, use the half-open **f-file** and look for a well-timed `fxe5` or `d4` break.

### As BLACK

**Your sound default repertoire = Modern/Abbazia (`...d5`).** After move 10 in Structure C:
1. **Castle kingside** (`...O-O`) — get the king off the e-file fast.
2. Put a rook on **e8** (`...Re8`) — the half-open e-file points at White's loose king.
3. Develop the light bishop to **g4** (pin Nf3) or **e6** (hit c4-bishop, guard d5).
4. Bishop to **d6**, eyeing h2; consider **`...Bg4xf3`** to damage White's king cover, then `...Qh4`/`...Qf6` toward the kingside.
5. Look to **regain f4** (if White hasn't) or trade into an endgame where you're at least equal with the better structure.
6. **Levers:** `...c6` (support d5, restrain White's knight) and `...f5`/`...f4`-type ideas to open White's king.

**If you accepted with `...g5` and reached Structure B (defending the extra pawn):**
1. **Decide early: keep or return the pawn.** If under pressure, play **`...d5!`** to return it, open lines, and *castle*.
2. If keeping it, play **`...f3`** at the right moment to lock White's king in and freeze the kingside, then complete development (`...Bg7`, `...Nf6/...Ne7`, `...d6`).
3. Get the **king to safety** — this is your #1 problem; often `...Bg7` + `...O-O`, or a king-walk to g7/h7 in the sac lines.
4. Trade attackers (especially White's **e5-knight** and **c4-bishop**); each trade defuses the attack and brings the extra-pawn endgame closer.
5. *In Muzio/Allgaier/Lolli sac lines:* **return material with `...Qf6`/`...d5`/`...Bxf4`**, consolidate, then convert the extra piece. Do **not** grab more.

**In the Falkbeer (`...d5`), Structure C or D:**
1. Develop with threats: `...Nf6`, `...Bd6`/`...Bc5`, `...Bg4`/`...Bf5`, **`...O-O`**, **`...Re8`**.
2. Keep White's king **stuck in the centre**; pile on the **e-file**.
3. If you have the **e4-thorn**, support it with `...f5`/pieces — but watch that it doesn't just drop to `d3`.
4. Neutralise check-tactics (`Bb5+`, `Qe2+`) by developing the right blocker first; *then* attack.

**In the Classical KGD (`...Bc5`):**
1. Complete development: `...d6`, `...Nf6`, `...Nc6`, `...a6`, **`...O-O`** (your king is the safe one!).
2. **Keep the c5-bishop on its diagonal** — meet `b4` with `...a5`/`...Bb6`, meet `Na4` by retreating to `...Bb6` if you prefer keeping it.
3. Choose your moment for **`...exf4`** to open the **e-file** against White's stuck king, or `...d5` to break the centre.
4. Target **f2** and the e1–h4 diagonal; White's king is your long-term prey.

---

## Part 9 — Study Roadmap & Cheat Sheet

### Suggested study order (don't try to memorise everything at once)

1. **Week 1 — Foundations:** Part 0 + the `fxe5??`/`Qh4+` trap + why `3.Nf3` precedes `d4`. Play the **Modern/Abbazia `...d5`** as Black until it's automatic.
2. **Week 2 — Your White main line:** pick **3.Nf3** and learn the **Kieseritzky** (2B) main line + the **Fischer Defense** response (2D).
3. **Week 3 — Sacrifice literacy:** study the **Muzio** (3B) and **Allgaier** (2C) from *both* sides — these win and lose the most club games.
4. **Week 4 — Declines:** the **Classical KGD `2...Bc5`** (4A) and **Falkbeer** (4B) — both as the side facing them and as Black.
5. **Ongoing — Trap drills:** run through Part 5 weekly until question 4 ("what's the threat?") is reflexive.

### One-screen cheat sheet

```
CORE TRUTHS
- f4 buys: central majority + f-file (→f7) + initiative; costs: weak e1–h4 diagonal & king.
- NEVER fxe5 while e1–h4 is open  → ...Qh4+ wins.
- 3.Nf3 BEFORE d4 (covers h4). d4 first = ...Qh4+!.
- Black's universal equalizer: ...d5 (Modern/Abbazia / Falkbeer-transpose).
- Black's universal "keep the pawn" lever: ...f3 (freeze White's king).
- White's universal "crack the wall" lever: h4. Central blast: e5.
- In sac lines (Muzio/Allgaier/Lolli): Black RETURNS material, trades attackers, survives, wins on material. Don't be greedy.

WHITE WANTS:               BLACK (Modern) WANTS:
 Bc4 → f7                   ...d5 to free & equalize
 Nf3 → e5 outpost           ...O-O fast (off the e-file)
 d4 + Bxf4 (full centre)    ...Re8 on the e-file
 O-O, double f-file         ...Bg4 pin / ...Be6 hit c4
 e5 break at the king       ...Bd6 + ...Qh4/Qf6 at White's king
                            regain f4 / reach a good endgame

ALWAYS-CHECK (Q4 reflex)
 Black to move: is f7 / e8 / the a2–g8 & h5–e8 diagonals safe? Can my king still reach safety?
 White to move: is ...Qh4+/...Qe7+ coming? Is my e1/f1 king about to be opened?
```

### Key named lines index

- **Accepted, 3.Nf3:** Classical `3...g5`; **Kieseritzky** `4.h4 g4 5.Ne5` (Berlin `5...Nf6`, Kolisch `5...d6`, Long Whip `5...h5`); **Allgaier** `5.Ng5`; **Fischer** `3...d6`; **Modern/Abbazia** `3...d5`; **Cunningham** `3...Be7`; **Schallopp** `3...Nf6`; **Quaade** `3...g5 4.Nc3`.
- **Accepted, 3.Bc4 (Bishop's Gambit):** `3...Nf6` (modern main), `3...d5` Bledow (Morphy `4.Bxd5 Nf6`), `3...Qh4+ 4.Kf1` Classical (Cozio `4...d6`).
- **Muzio family (3...g5 4.Bc4 g4):** **Muzio** `5.O-O` (Double Muzio `...Qxe5 8.Bxf7+`); **Ghulam-Kassim** `5.d4`; **McDonnell** `5.Nc3`; **Lolli** `5.Bxf7+`; **Salvio** `5.Ne5`.
- **Hanstein/Philidor (3...g5 4.Bc4 Bg7/...h6):** quiet held-pawn structures (also via Fischer).
- **Declined:** **Classical** `2...Bc5`; **Falkbeer** `2...d5` (`3...exf4`=Abbazia, `3...c6`=Nimzowitsch-Marshall, `3...e4`=old main); **Adelaide** `2...Nc6 3.Nf3 f5`.

---

*Compiled as a complete working study. The evaluations reflect modern engine/GM consensus: the King's Gambit is objectively only equal-ish (Black holds with `...d5` lines and accurate defense), but it remains one of the most dangerous and instructive practical openings in chess. Master the five questions in each section and you will never feel clueless after move 10 — as either colour.*
