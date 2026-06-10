# Alekhine's Defense — A Complete Study (Both Colors)

> **How to use this document.** This is built so you are never "clueless after move 10." Every major line ends with a **Plan Block** answering your five questions:
> 1. **Piece jobs** — what each piece is *for*.
> 2. **Pawn structure** — where your space is, which break opens things in your favor.
> 3. **Weaknesses** — theirs and yours.
> 4. **What is the opponent threatening right now** (the trap-prevention question).
> 5. **Default plan** when nothing forcing is on the board.
>
> Read the **Part 1 mental model first** — it makes everything else click. Then study the variation you'll actually face most (the **Exchange Variation**, ~50% of your games), then the **Four Pawns** (the critical test), then the **Modern**.

---

## Table of Contents

- [Part 1 — The One Idea Behind the Whole Opening](#part-1)
- [Part 2 — Move Order, ECO Codes, and the Branch Map](#part-2)
- [Part 3 — The Exchange Variation (your bread and butter)](#part-3)
- [Part 4 — The Four Pawns Attack (the critical test)](#part-4)
- [Part 5 — The Modern Variation (4.Nf3)](#part-5)
- [Part 6 — Sidelines & Move-2/Move-3 Alternatives](#part-6)
- [Part 7 — The Trap Encyclopedia (memorize these)](#part-7)
- [Part 8 — Pawn-Structure Cheat Sheet](#part-8)
- [Part 9 — Model Games to Replay](#part-9)
- [Part 10 — Practical Study Plan & Quick-Reference Card](#part-10)

---

<a name="part-1"></a>
## Part 1 — The One Idea Behind the Whole Opening

After **1.e4 Nf6**, Black attacks the e4-pawn on move one with a developed piece. White's only ambitious reply is **2.e5**, kicking the knight. Black plays **2...Nd5**, and now White is tempted to keep gaining time by pushing pawns: **3.d4, 4.c4,** sometimes **5.f4.**

Here is the entire strategic bargain, and you must internalize it:

> **Pawns cannot move backward.** Black *deliberately* lets White build a big pawn center, spending Black's tempi shuffling one knight. In return, every White pawn advance is **permanent** and becomes a **fixed target**. Black's whole game is to undermine that center with the breaks **...d6, ...c5, ...f6,** and piece pressure on **d4 and e5** — the two squares the entire opening revolves around.

**The single most important practical rule for Black:** once your knight has finished being chased, **you may not play passively.** If you don't strike the center, White's space simply suffocates you and the "targets" never materialize. The opening is a *counterattack*, not a fortress. As one coach puts it, the whole premise of the opening is to counterattack — and Black repeatedly uses a **counterattack on d4** to avoid being pushed around.

**The single most important practical rule for White:** your space is an asset *only while your center is coordinated.* Don't grab more than you can defend. If you can consolidate (typically castle, develop, and support d4/e5 with pieces), the extra space is a lasting, low-risk edge — engines rate the whole opening roughly **+0.3 to +0.7** for White, i.e. a pleasant pull, not a refutation.

**The two magic squares: d4 and e5.**
- **e5** is White's spearhead and cramping pawn. Black wants to either capture it (...dxe5) or undermine it (...f6). White wants to keep it defended so it can support a later **d5** break.
- **d4** is White's center pawn and is *usually not defended by another pawn* (the c-pawn went to c4). It must be defended by **pieces**, which makes it the perennial target — that's why Black piles up with ...Nc6, ...Bg4, ...c5, and ...e5.

Keep returning to this: **Black attacks d4 and e5; White defends d4 and e5 and dreams of d5.**

---

<a name="part-2"></a>
## Part 2 — Move Order, ECO Codes, and the Branch Map

```
1.e4 Nf6          (Alekhine's Defense — B02)
2.e5 Nd5
3.d4 d6           (the standard center; reaches B03/B04/B05)
   |
   +-- 4.c4 Nb6
   |      +-- 5.exd6  ........ EXCHANGE VARIATION   (Part 3)  ~50% of games
   |      |       +-- 5...cxd6   (dynamic; faces the Voronezh)
   |      |       +-- 5...exd6   (solid, Exchange-French-like)
   |      |
   |      +-- 5.f4   ......... FOUR PAWNS ATTACK    (Part 4)  the critical test
   |              5...dxe5 6.fxe5 Nc6 ... main line
   |
   +-- 4.Nf3  ............... MODERN VARIATION      (Part 5)  most popular today
          +-- 4...Bg4   (Main Line — pin)
          +-- 4...g6    (Alburt — fianchetto)  ← Fischer's choice vs Spassky
          +-- 4...dxe5  (Larsen — immediate capture)
          +-- 4...c6    (solid)
```

**ECO codes:** B02 = 1.e4 Nf6 and 2nd-move sidelines. B03 = 3.d4 with Exchange + Four Pawns. B04 = Modern without 4...Bg4. B05 = Modern with 4...Bg4.

**Three big move-2/3 sidelines you must also know** (covered in Part 6):
- **2.Nc3** — invites the **Scandinavian/Vienna** structures (2...d5 or 2...e5).
- **3.c4 Nb6 4.c5** — the **Two Pawns / Lasker's Attack** (gambit; contains a famous trap).
- **3.Nc3 / 3.Bc4 / 2.d3** — offbeat tries, mostly harmless if you know the idea.

---

<a name="part-3"></a>
## Part 3 — The Exchange Variation (Your Bread and Butter)

**1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.c4 Nb6 5.exd6**

This is the most common thing you'll meet — expect it in roughly half your Alekhine games. White releases the central tension early, keeps a modest space edge, and tries to *grind*. It is **not** dangerous if you know the plans; Black has full equality with accurate play.

After 5.exd6 Black has a fundamental fork in the road. **This choice defines your whole middlegame**, so understand both:

### 3.1 — The two recaptures

**A) 5...cxd6 — the dynamic, ambitious recapture (main line, ~60% choice)**
- Gives Black a **half-open c-file** and a central pawn majority feel; Black plays for the initiative and to attack the center.
- Downside: invites White's most testing setup, the **Voronezh** (below).

**B) 5...exd6 — the solid recapture (~40%)**
- Produces a structure resembling the **Exchange French** (symmetrical-ish, slightly drawish), but Black has several ways to imbalance it.
- Easier to play safely; chosen by many specifically to dodge the Voronezh.

> **Practical recommendation:** If you want a clean, low-theory life as Black, play **5...exd6** and learn the ...Nc6 / ...Be7–f6 / ...d5 plan below. If you want to fight for a win and have studied the Voronezh, play **5...cxd6.**

---

### 3.2 — 5...cxd6: main development and the Voronezh

**Typical "everything is fine" line:**
`5...cxd6 6.Nf3 g6 7.Be2 Bg7 8.O-O O-O 9.Be3 Nc6` and Black is comfortable, e.g. **10.Nc3 Bg4 11.b3 e5!** striking the center, **12.dxe5 dxe5** is dead equal (engine ≈ +0.3).

**The critical White try — the Voronezh Variation:**
**6.Nc3 g6 7.Be3 Bg7 8.Rc1 O-O 9.b3**

White deliberately **delays kingside development** (no early Nf3, no Bd3). Why? Because those pieces are exactly what Black likes to hit:
- No knight on f3 → nothing for ...Bg4 to pin/trade.
- No bishop on d3 → nothing for ...Nc6–e5 or ...Nb4 to harass.

The b3+Be3+Nc3+Rc1 shell makes the center very hard to assail.

**How Black should meet the Voronezh:** the engine-and-Cox-approved plan is the central break, **not** the natural-looking 9...Nc6.
- **9...Nc6?!** is the common amateur move but after **10.d5 Ne5 11.f4** the knight gets kicked with no target; this has scored poorly for Black.
- **9...e5! 10.dxe5 dxe5 11.Qxd8 Rxd8 12.c5 N6d7** is the main line and adequate for Black. The retreat 12...N6d7 is **forced** (12...Nd5?? 13.Nxd5 loses material to the pin/fork motifs). Black then plays around the c5-pawn and fights for the e5/d-file.

#### Plan Block — Exchange Variation, 5...cxd6 (Black)
1. **Piece jobs.** Dark-squared bishop → **g7**, the engine of the position, eyeing d4/e5 down the long diagonal. Knight from b6 supports ...c5/...e5 breaks and watches c4/d5. Light-squared bishop → **g4** (in non-Voronezh lines) to trade off a defender of d4, or stays home in the Voronezh. Queen's knight → **c6**, pressuring d4 and supporting ...e5. Rooks → **c8** (open/half-open c-file) and **d8/e8**.
2. **Pawn structure.** You have the half-open **c-file** and a healthy kingside majority. Your key break is **...e5** (or **...c5** in some move orders) to dissolve White's d4 and open lines for the g7-bishop. Your space is on the queenside/center after the file opens.
3. **Weaknesses.** *White's:* the unsupported **d4-pawn** and the dark squares around it once pieces come off; an over-extended **c5** if White pushes it. *Yours:* the **d6-pawn** can become backward on a half-open file; the e5-square if you never challenge it.
4. **What is White threatening?** In the Voronezh, **d5** clamping you, followed by **f4** to gain more space and kick a knight off e5. Watch for **c5** hitting your b6-knight. Don't allow a big space bind to form unanswered.
5. **Default plan.** Finish development (...Bg7, ...O-O, ...Nc6), then prepare and play **...e5**. If White locks with d5, reroute via **...Nc8–e7–f5** to hit d4, or play on the c-file. Trade White's good defenders; aim for the moment d4 falls or e5 becomes a strong outpost for *you*.

#### Plan Block — Exchange Variation (White)
1. **Piece jobs.** In the Voronezh: **Be3** guards d4, **Rc1** backs the c-pawn and the c5-break, **Nc3** controls d5/e4, **b3** locks the queenside and frees the bishop. Knight goes to f3 *later* (after Black has committed), to avoid being a ...Bg4 target.
2. **Pawn structure.** You own more space and the queenside majority. Your dream break is **d5** (clamp) and then **c5**, gaining space and creating a protected passer later; **f4** supports e5 and grabs kingside space.
3. **Weaknesses.** *Yours:* d4 if you can't get d5 in; over-extension if you push c5/f4 carelessly. *Black's:* the d6-pawn, and any square (especially d5/e5) you can occupy with a knight.
4. **What is Black threatening?** The **...e5** (or ...c5) break to free the g7-bishop and hit d4; **...Bg4** trading a defender; **...Nc6–e5** landing a strong knight. Prevent or blunt these before expanding.
5. **Default plan.** Complete the shell (Be3, Rc1, b3, Nc3), castle, then play **d5** at the right moment to clamp, follow with **c5/f4** to expand, and grind the space advantage. Keep d4/e5 defended; trade into a favorable endgame where your majority and space tell.

---

### 3.3 — 5...exd6: the solid structure

After **5...exd6**, the pawns are nearly symmetric (an Exchange-French feel). Black equalizes but must play actively to create winning chances. Two rules from theory:

- **Play ...Nc6 against almost anything**, to stop White's ideal **Nc3 + Bd3 + Nge2** setup. If White does set up Bd3, hit it with **...Nb4.**
- **Castle, then maneuver ...Be7–f6**, and after enough prep, strike with **...d5.** If White answers c5, the thematic regrouping is **...Nc8** heading to e7–f5 to attack the weak **d4-pawn.**

> **Watch out:** with the fianchetto move order (...g6/...Bg7), White's **Bg5** can be annoying (e.g. 6.Nc3 g6 7.Nf3 Bg7 8.Bg5), pinning/pressuring along the e7–h4 diagonal. That's exactly why in the 5...exd6 structure Black prefers **...Be7 and ...Bf6** over fianchettoing.

#### Plan Block — Exchange Variation, 5...exd6 (Black)
1. **Piece jobs.** King's bishop → **e7 then f6**, pressuring d4 and avoiding Bg5 pins. Queen's knight → **c6** immediately (anti-Bd3/Nge2). If White plays Bd3, the b6-knight or c6-knight jumps to **b4** to harass it. Rooks to **e8** (open e-file) and **d8**.
2. **Pawn structure.** Symmetric; the position is about *piece activity and the ...d5 break*, not pawn majorities. Whoever uses the open **e-file** and the d5/e5 squares better stands better.
3. **Weaknesses.** *White's:* **d4** after ...Bf6 and ...Nc6 gang up; the d5-square if you get a knight there. *Yours:* same square (d5/e5) for White; a premature ...d5 that just trades into dryness.
4. **What is White threatening?** A comfortable clamp with **Nc3/Bd3/Nge2** and a small but nagging space edge; **Bg5** pins if you've fianchettoed. Nothing tactical usually — the danger is slow suffocation.
5. **Default plan.** ...Nc6, ...Be7–f6, ...O-O, contest the e-file with ...Re8, then break with **...d5** at the right time. Keep the position dynamic; don't let it congeal into a symmetrical nothing where White's extra space slowly grinds you.

---

<a name="part-4"></a>
## Part 4 — The Four Pawns Attack (The Critical Test)

**1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.c4 Nb6 5.f4**

White builds the maximum center: pawns on **c4, d4, e5, f4.** This is the most confrontational line and the *theoretically critical* one — **if it crushed Black, the whole opening would be dubious.** It doesn't. The wall looks terrifying but is brittle, and Black gets the best statistical chances of any anti-Alekhine line here. (It was fashionable after Fischer faced it in 1972, but has since declined because White players fear Black's prepared counterplay.)

### 4.1 — Main line: 5...dxe5 6.fxe5 Nc6

Black immediately strikes and then **attacks d4** with the knight. This d4-pressure is the heartbeat of Black's whole plan.

**7.Be3** is the main move. *(Note: 7.Nf3?! allows 7...Bg4! when the pressure on d4 is very hard to meet — a key point. White avoids putting the knight on f3 while Black can pin it to the loose d4-pawn.)*

**7...Bf5** — develop the light-squared bishop *before* ...e6 (so it doesn't get locked in). **8.Nc3 e6.**

Now **9.Nf3** (finally defending e5, eyeing d5):
- **9...Bg4!?** is still possible, adding pressure to d4, but after **...Bxf3 gxf3** White gets the bishop pair and an even bigger center — a concession.
- **9...Be7** is the main line, preparing **...f6** to blow open White's center. This is the thematic Alekhine break in this structure.

White's responses to the ...f6 plan:
- **Old main line: 10.d5.** White clamps immediately to prevent ...f6 from being strong, leading to sharp, complex play. After **10...exd5 11.cxd5 Nb4** Black hits d5 and gets active piece play.
- **Modern try: 10.Be2 O-O 11.O-O f6 12.exf6 Bxf6 13.Qd2** (connecting rooks, preparing Rad1) **Qe7 14.Rad1 Rad8 15.Kh1!** — a tense, roughly balanced middlegame where Black's piece activity offsets White's space.

> **The recurring Four Pawns theme:** Black repeatedly **counterattacks d4** so that when White tries to kick the b4/c6-knight, Black has a zwischenzug or counter-hit on d4. *Timing the d4-counterattack accurately is the entire art of this line.*

### 4.2 — Important alternatives & sidelines for Black

- **6...Bf5** (instead of 6...Nc6) — develops the bishop first; also fully playable.
- **6...Nc6 7.Be3 Bf5 8.Nc3 e6 9.Be2 Bg4** — pins and pressures; one engine line continues with deep tactics around d4/c5.
- **The Planinc Variation: 5...g5!?** — a wild surprise weapon, undermining f4. The point: **6.fxg5?? dxe5!** wrecks White's center. White must react precisely; venomous but double-edged.
- **6...g5** and **6...c5** (after 5...dxe5 6.fxe5) — sharp tries that increase complications; good surprise weapons but not necessary for a sound repertoire.
- **The Korchnoi line:** 5...dxe5 6.fxe5 Bf5 7.Nc3 e6 8.Nf3 Be7 9.Be2 O-O 10.O-O f6 — Black's standard ...f6 plan, named for its great practitioner.

> **Trap to know in the c4/d4/e5/f4 structure:** in some lines after ...Bxf3 gxf3, Black has the resource **...Qh4+** followed by ...Qf4 hitting White's loose pawns and dark squares. Concretely, a known sequence runs `...Bg4 / Be2 / Bxf3 / gxf3 / Qh4+ / Bf2 / Qf4` pressuring the shattered kingside. White must be ready for the check.

#### Plan Block — Four Pawns Attack (Black)
1. **Piece jobs.** Queen's knight → **c6**, the d4-attacker (sometimes rerouting via b4 to hit c2/d5). Light-squared bishop → **f5** (developed *before* ...e6 so it isn't entombed); sometimes **g4** to pin a knight onto d4. Dark-squared bishop → **e7**, supporting the ...f6 break and eyeing the center/kingside. Rooks → **f8** (after ...f6 opens the f-file) and **d8/c8.**
2. **Pawn structure.** White's c4-d4-e5-f4 chain is huge but *fixed and target-rich.* Your two breaks: **...f6** (the main one — cracks e5 and opens the f-file for your rook) and sometimes **...c5** (hitting the base d4). Your space is on the queenside and along the f-file once it opens.
3. **Weaknesses.** *White's:* the **d4-pawn** (under-defended), the **e5-pawn** (target of ...f6), and the dark squares/lightsquared holes that appear if the center is forced to advance (d5) or is exchanged. *Yours:* you are temporarily cramped; the e6/f7 area can be loose; a mistimed break can leave you worse with no counterplay.
4. **What is White threatening?** The big one: **d5!** at the right moment, clamping you and gaining a huge space bind (often the move that refutes passive play). Also **f4–f5** ideas, and piece play (Nf3, Be2/Bd3, O-O, Qd2, Rad1) to support the center and attack on the kingside. *Always ask before every move: "Can White play d5 favorably, and is my d4-pressure adequate?"*
5. **Default plan.** Develop ...Nc6, ...Bf5, ...e6, ...Be7, castle — *then* break with **...f6.** Keep d4 under fire so White can never comfortably expand. If White plays d5, hit it (...exd5, ...Nb4) and target the new weaknesses. Your model is **Fischer–Spassky 1972, Game 13** (see Part 9).

#### Plan Block — Four Pawns Attack (White)
1. **Piece jobs.** **Be3** defends d4 (and avoids the Nf3-before-Bg4 problem). **Nc3** controls d5/e4. **Nf3** comes *after* Be3 to guard e5 and prepare d5; **Be2** (modest, solid) or **Bd3** then castle. Queen → **d2**, rooks to **d1/f1** to back the center and a kingside push.
2. **Pawn structure.** You have a massive space advantage with the four-pawn front. Your dream is to make it *permanent* by playing **d5** under good circumstances and converting the bind; the e5-pawn cramps Black and the f-file may open in your favor after ...f6/exf6.
3. **Weaknesses.** *Yours:* the whole center is over-extended — **d4** especially, plus **e5** and the dark squares; if Black's breaks land, your wall becomes a heap of weaknesses. *Black's:* cramped pieces, loose e6/f7, the b6-knight that can be kicked with a-pawn/c-pawn or clamped by d5.
4. **What is Black threatening?** The **...f6** break to demolish e5 and open lines; constant **...Nc6/...Bg4 pressure on d4**; the **...c5** hit; tactical shots like **...Qh4+** after a ...Bxf3/gxf3 trade. Don't let d4 fall or e5 get cracked on favorable terms for Black.
5. **Default plan.** Develop solidly (Be3, Nc3, Nf3, Be2, O-O, Qd2, Rad1) and *keep the center defended.* At the right moment play **d5** to clamp, then expand and attack. If you can consolidate the four-pawn front, you're clearly better; if you over-press, you collapse — patience and accurate defense of d4/e5 win this line.

---

<a name="part-5"></a>
## Part 5 — The Modern Variation (4.Nf3)

**1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.Nf3**

White's **most popular** modern choice. Instead of grabbing maximal space, White develops a piece and supports the center with **pieces**, accepting a modest but durable space edge. This is the most *practical* branch for both sides and the best place to learn the opening's ideas without razor-sharp memorization.

Black has four respectable replies:

### 5.1 — 4...Bg4 (the Old Main Line — the pin)

Black pins the f3-knight, a defender of e5/d4. White unpins with **5.Be2.**

**Main line:** `5.Be2 e6 6.O-O Be7 7.c4 Nb6 8.Nc3 O-O 9.h3 Bxf3 10.Bxf3`

Here Black usually **voluntarily gives up the bishop pair** with ...Bxf3, because:
- Black's light-squared bishop **cannot attack e5** anyway (wrong color/diagonal), so it's Black's "worse" bishop.
- Trading it for the strong f3-knight **removes a key defender of the center** and undermines e5/d4.

In return White keeps the **bishop pair** plus space — a small, lasting pull (~+0.4). Black continues to chip at the center with ...Nc6, ...d5 or ...c5 ideas, and ...Bb4 hitting c3.

### 5.2 — 4...g6 (the Alburt Variation — fianchetto)

Black fianchettos the dark-squared bishop to **g7**, where it "breathes fire" on the long diagonal and helps undermine e5/d4. **This was Fischer's choice in the famous Game 13 vs. Spassky.**

Trade-off: it's a touch slower, and White can sometimes get an initiative if Black is careless, but it's strategically rich and thematically pure (the g7-bishop is the ideal Alekhine piece).

### 5.3 — 4...dxe5 (the Larsen Variation — immediate capture)

Black simply takes the e5-occupant. After **5.Nxe5**, White has the center for free with no specific compensation for Black, so this is the least challenging — but solid and simplifying. A typical safe route: Black fianchettos (...g6/...Bg7), plays **...c6** to stop c4–d5, and develops; White plays Bc4–b3 onto active squares and stands a bit better.

### 5.4 — 4...c6 (the solid Scandinavian-style move)

A rock-solid setup. A representative line: `4...c6` (or via 2.Nc3 move orders) `... 6.Nc3 Nc6 7.Nf3 Bg4 8.Be2 Be7 9.b3 O-O 10.O-O d5` and **Black has achieved everything** — a solid center, and he'll trade the light-squared bishop for the f3-knight, reaching a comfortable game ready to meet c5 with ...Nc8/...Bf6/...N8e7.

#### Plan Block — Modern Variation (Black)
1. **Piece jobs.** Light-squared bishop → **g4** to pin/trade the f3-knight (it's your worse bishop and can't hit e5, so trading it for a key central defender is a *good* deal). Dark-squared bishop → **e7** (4...Bg4 lines) or **g7** (4...g6 lines), pressuring the center. Knight from d5 → **b6** (eyeing c4/d5) and the other knight → **c6** hitting d4/e5. Rooks → **e8/d8** and the c- or d-file depending on your break.
2. **Pawn structure.** White has more space; your job is to make it a liability. Your breaks are **...c5** and **...d5** (in 4...c6/...Bg4 setups) or pressure via the g7-bishop + ...c5 (in 4...g6). The d4-pawn is again the soft spot.
3. **Weaknesses.** *White's:* **d4** (often piece-defended only), the **e5-pawn** if you undermine it with ...f6 in some lines, and the squares vacated when White pushes c4/d5. *Yours:* you concede the bishop pair after ...Bxf3; the kingside is missing the f6-knight's defense, so watch your king.
4. **What is White threatening?** Quiet expansion with **c4 + Nc3 + d5** clamping you; sometimes **Bg5** annoyance in fianchetto setups; piece play that converts space into a bind if you go passive. Rarely anything tactical — the threat is positional suffocation.
5. **Default plan.** Pin/trade on f3 to undermine the center, complete development, and break with **...c5** or **...d5** to free your position and expose d4. If you fianchettoed, point the g7-bishop at d4/e5 and time ...c5. Keep generating central pressure — never just shuffle.

#### Plan Block — Modern Variation (White)
1. **Piece jobs.** **Nf3** supports e5/d4 (the whole point of the Modern); **Be2** unpins after ...Bg4; **c4 + Nc3** grab space and control d5; bishop pair (after Black's ...Bxf3) becomes a long-term asset. Rooks to **d1/e1**, queen flexible.
2. **Pawn structure.** Modest, healthy space edge with e5/d4 (and often c4). Your break is **d5** (clamp) when prepared; you keep the structure sound rather than over-extending.
3. **Weaknesses.** *Yours:* **d4** if you can't support it; minimal otherwise — that's the appeal of the Modern. *Black's:* the d6/e6 squares, the missing kingside knight, and the bishop pair you may win.
4. **What is Black threatening?** **...Bxf3** to trade off a defender and hit your center; the **...c5/...d5** breaks against d4; in fianchetto lines, long-diagonal pressure on d4/e5. Keep d4/e5 defended and don't let a break land for free.
5. **Default plan.** Develop naturally (Nf3, Be2, O-O, c4, Nc3, h3 to keep the bishop pair), keep the center solid, and play **d5** at the right moment to clamp. Use the bishop pair and space to press in a low-risk middlegame and a pleasant endgame.

---

<a name="part-6"></a>
## Part 6 — Sidelines & Move-2/Move-3 Alternatives

### 6.1 — 2.Nc3 (transposition tool)
White sidesteps 2.e5. Then:
- **2...d5** → the **Scandinavian/Alekhine hybrid**: 3.exd5 Nxd5 4.Bc4 (now **beware the ...Be6 trap — see Part 7**) and after 4...Nb6 or 4...Nxc3 it's roughly equal; an easy path to equality for Black.
- **2...e5** → transposes to the **Vienna Game** or **Four Knights** — comfortable, well-known structures considered innocuous at top level.

### 6.2 — 3.c4 Nb6 4.c5 — the Two Pawns / Lasker's Attack (a gambit)
White chases the knight again with **c5**, offering a pawn for development and space. **4...Nd5 5.Bc4 e6 6.Nc3.** White has excellent piece activity and a development lead for the pawn. Modern theory: slightly better for White *if Black accepts*, but Black holds with accurate play. Black can also **decline with 4...Ng8!?** (yes, the knight returns home), steering into quieter waters. **This line contains two important traps — see Part 7.**

### 6.3 — Emory Tate line: 3.c4 Nb6 4.a4
White intends **a5** to chase the knight, then a pawn sac (e.g. 4...d6 5.a5 N6d7 6.e6) to wreck Black's development. **Black's antidote: 4...a5**, after which White's main idea is **Ra3–g3** putting the rook on the kingside to pressure g7 and inhibit ...Be7. Know the **...a5** stop.

### 6.4 — Other offbeat tries
- **2.d3 (Maroczy)** — passive; **2...e5** gives Black an easy, good game.
- **3.Bg5 / 3.d4 d6 4.Bg5** — Cox recommends **4...h6 5.Bh4 dxe5 6.dxe5 Bf5**, then ...Nc6 and ...Ndb4 hitting c2.
- **3.d4 d6 4.Be2** — quiet but scores OK; prevents ...Bg4 while keeping the f4-option.
- **3.d4 d6 4.Bc4 (Balogh)** and **3.d4 b5!? (O'Sullivan Gambit)** — rare; the O'Sullivan intends 4.Bxb5 c5 5.dxc5?? Qa5+ winning the bishop, so White shouldn't grab greedily.
- **2...Ng8?! (Brooklyn)** and **2...e6 / 3...e6** — provocative or transpositional; the Brooklyn (retreating the knight home) is too passive to recommend.

---

<a name="part-7"></a>
## Part 7 — The Trap Encyclopedia (Memorize These)

These are the concrete tactical landmines. Knowing them is exactly how you stop "trap-losses" — your Question 4.

### Trap 1 — The c5 Bishop Trap (Black's bishop gets stuck) ⚠️ *most famous Alekhine trap*
**Line:** `1.e4 Nf6 2.e5 Nd5 3.c4 Nb6 4.c5 Nd5 5.Nc3 Nxc3 6.dxc3 d6` (Black wants to dissolve the cramping c5/e5 pawns) **7.... and the danger:** Black's natural development of a bishop runs into trouble because the **c5-pawn takes away the retreat square.** A standard finish: White plays **a3!**, and Black suddenly realizes a developed minor piece (e.g. a bishop that went to b4 or a knight pushed to the rim) **has no safe retreat — it's trapped** because c5 covers the escape. *(White can even reach the c4-bishop setup against virtually any Black move and, even if Black wriggles out of the immediate trap, White keeps a strong attacking position for at most a one-pawn investment: Rd1, finish developing, big pressure.)*
- **As White:** look for the c5-pawn removing retreat squares, then **a3/b4** nets a piece or a huge initiative.
- **As Black:** before developing into the c5-clamp, *check every retreat square.* Don't put a bishop where c5 cuts off its return; prefer ...d6 breaks and careful piece placement.

### Trap 2 — The ...Be6 / Bc4 Fork-Threat Trap (both colors must know) ⚠️
**Line:** `1.e4 Nf6 2.Nc3 d5 3.exd5 Nxd5 4.Bc4` and now **4...Be6!?** Black exploits the **undefended c4-bishop and the c3-knight.** The threat is **...Nxc3** forking/winning material (hitting the queen *and* loosening c4), or pressure that wins the bishop pair on favorable terms.
- **As White:** the instant you see ...Be6 against your Bc4, **move the queen or retreat the bishop to b3.** This is a must-know reflex *whichever side you're on.*
- **As Black:** ...Be6 is a handy resource to gain time/the bishop pair if White leaves c4 loose.

### Trap 3 — Premature ...Nxc3 in the Two Pawns Attack ⚠️
**Line:** `1.e4 Nf6 2.e5 Nd5 3.c4 Nb6 4.c5 Nd5 5.Bc4 e6 6.Nc3 Nxc3??` **7.bxc3** and White gets a **strong pawn center and a big development lead.** After `7...d6 8.cxd6 Bxd6 9.Nf3` White has excellent compensation — bishop pair, central control, easy play.
- **As Black:** **do not** trade on c3 here. Play **6...d6** or, if you do take, **6...Nxc3 7.dxc3** (recapturing toward the center) to keep the balance. The trap is the illusion that the knight trade "consolidates" — it actually hands White the initiative.
- **As White:** invite ...Nxc3?? and recapture **bxc3**, then develop with Nf3 and pressure.

### Trap 4 — 7.Nf3?! Bg4! in the Four Pawns ⚠️ (a trap *for White*)
**Line:** `...5.f4 dxe5 6.fxe5 Nc6 7.Nf3?!` **7...Bg4!** pins the knight to the **already-loose d4-pawn**, and the pressure on d4 becomes very hard to handle.
- **As White:** play **7.Be3** (defending d4) *before* developing the knight to f3. Don't walk into the pin.
- **As Black:** if White plays an early Nf3 while d4 is soft, **...Bg4** is your shot.

### Trap 5 — The ...Qh4+ resource after gxf3 ⚠️
**Motif:** In Four-Pawns/Chase structures where Black trades **...Bxf3** and White recaptures **gxf3** (shattering the kingside), Black often has **...Qh4+** followed by **...Qf4**, raking the loose pawns and dark squares.
- **As White:** before allowing gxf3, make sure **...Qh4+** isn't strong (have Bf2 ready, or avoid the structure).
- **As Black:** remember the check — it's a standard way to punish a careless gxf3.

### Trap 6 — The Planinc 6.fxg5?? blunder ⚠️ (a trap *for White*)
**Line:** `...5.f4 g5!? 6.fxg5??` **6...dxe5!** and White's center collapses (the f-pawn is gone and e5 falls), leaving White's structure in ruins.
- **As White:** **don't** grab the g5-pawn reflexively; meet 5...g5 with calm central moves, not 6.fxg5.
- **As Black:** 5...g5 is a venomous surprise weapon that punishes greedy capturing.

### Trap 7 — The Emory Tate e6-sac idea (positional trap)
**Line:** `3.c4 Nb6 4.a4 d6?! 5.a5 N6d7 6.e6!` White sacs a pawn to **rip open Black's development** and fix long-term problems; though deep analysis says Black can survive with a strong center, it's very unpleasant in practice and the a5-clamp keeps looming.
- **As Black:** stop the whole plan with **4...a5** *before* allowing a5/e6.
- **As White:** if Black omits ...a5, the **a5 + e6** break is a strong practical try.

> **General trap-avoidance reflex (Question 4 in one sentence):** *Before every move, ask "what did my opponent's last move newly attack or unblock, can a pawn (c5/d5/e6/a5) trap one of my pieces, and is my d4/e5 still adequately defended?"* Ninety percent of Alekhine disasters are a trapped minor piece, an unguarded d4/e5, or a missed central break.

---

<a name="part-8"></a>
## Part 8 — Pawn-Structure Cheat Sheet

**Structure A — The "small center" (most common, esp. Modern & after ...dxe5 trades)**
- White pawns: a2 b2 c4 d4 f2 g2 h2 | Black pawns: a7 b7 c6 e6 f7 g7 h7
- **Read it:** White has more central space; **d4 is not pawn-defended** (c-pawn is on c4), so it leans on pieces → it's the **target.** Black plays on the dark squares and against d4; White wants d5 to clamp.

**Structure B — Four Pawns front**
- White: c4 d4 e5 f4 (plus a2 b2 g2 h2) | Black: typically e6, f7→f6 break, queenside pawns intact.
- **Read it:** Maximum White space but maximum fragility. **e5** is hit by **...f6**; **d4** is hit by **...Nc6/...Bg4/...c5.** White's saving break is **d5.** Whoever's break lands first usually wins the structural argument.

**Structure C — Exchange, 5...cxd6**
- Black gets a **half-open c-file** and kingside majority; White a queenside majority.
- **Read it:** Black files on c, breaks with **...e5**; White clamps with **d5** then expands **c5/f4.** Watch the backward **d6-pawn** (Black) and the loose **d4** (White).

**Structure D — Exchange, 5...exd6 (Exchange-French-like, symmetric)**
- **Read it:** Piece activity and the **...d5** break decide it. Contest the **e-file**; fight for **d5/e5** outposts. Drawish if it congeals — Black must inject life with ...Nc6, ...Bf6, ...d5.

**Universal landmarks:**
- White's best square to dream about: **d5** (knight outpost / clamping pawn).
- Black's best squares to dream about: **e5 and d4** (knight outpost on e5; winning/weakening d4).
- The pawn that is *almost always* the long-term target: **White's d4.**

---

<a name="part-9"></a>
## Part 9 — Model Games to Replay

Replaying these teaches the plans better than any list of moves. Priority order:

1. **Spassky – Fischer, World Championship (Reykjavik) 1972, Game 13** — *the* Alekhine model game. Fischer meets the center with the **...g6 Alburt setup** and demonstrates how to repel a White kingside attack and grind down an over-extended center. Famously chaotic — it ended with three pawns beating a piece on move 74 — and effectively decided the match. **Study this for the Four Pawns / Modern attacking-defense ideas.**
2. **Steiner – Alekhine, Budapest 1921** — the first high-level Alekhine game and the opening's "origin story." White tried **4.Bg5**; see the ...h6/...dxe5/...Bf5 + ...Nc6/...Ndb4 (hitting c2) plan. Good for the *identity* of the opening.
3. **Lasker – Maróczy, New York 1924** — the game that "really arrived" the opening at elite level; classical undermining of White's center.
4. **A modern Voronezh game with the ...e5 plan** — to see how Black equalizes against White's most testing Exchange setup (search engine main line: 9.b3 e5! as in Part 3).
5. **A Korchnoi Four Pawns game (...f6 break)** — Korchnoi's handling of 5...dxe5 6.fxe5 Bf5 ... ...f6 shows the e5-demolition plan in pure form.

> **Tip:** As you replay each, pause at move 10–12 and *answer your five questions out loud* before looking at the next move. That's how the plans become reflex.

---

<a name="part-10"></a>
## Part 10 — Practical Study Plan & Quick-Reference Card

### A 4-week study path
- **Week 1 — Foundations + Exchange.** Internalize Part 1. Drill the **Exchange Variation** (both recaptures). Decide your Black recapture (5...exd6 for simplicity, 5...cxd6 + Voronezh plan for ambition). Play 10–15 games reaching this structure.
- **Week 2 — Four Pawns.** Memorize the main line to move 9–10 and the **...f6 break.** Drill Traps 4, 5, 6. Replay Fischer–Spassky G13 three times.
- **Week 3 — Modern.** Learn 4...Bg4 and 4...g6 plans; understand *why* ...Bxf3 is good for Black. Drill the bishop-pair-vs-center trade-off.
- **Week 4 — Sidelines + Traps.** Lock in Part 6 (2.Nc3, 4.c5, 4.a4 with ...a5) and the full **Trap Encyclopedia.** Then play a themed tournament/online session only with the Alekhine.

### One-screen Quick-Reference Card

**As Black, always:**
- After the knight is chased, **strike the center** (...d6, then ...c5/...e5/...f6). Never go passive.
- Aim pieces at **d4 and e5.** Trade your "bad" light-squared bishop for the **f3-knight** when it undermines the center.
- **Before each move:** can a pawn (c5/d5/e6/a5) trap my piece? Is White about to play **d5**? Is my intended break still there?
- Key breaks by structure: **Exchange →** ...e5 (or ...d5 in the symmetric line); **Four Pawns →** ...f6; **Modern →** ...c5/...d5.
- Stop-moves to remember: **...a5** vs the 4.a4 line; **...Be6** punishing a loose Bc4.

**As White, always:**
- Take space **only if you can keep d4 and e5 defended.** Coordinated center = lasting +0.3/+0.7 edge.
- In the **Four Pawns**, play **Be3 before Nf3** (avoid ...Bg4 on a loose d4); dream of **d5.**
- In the **Exchange**, the **Voronezh shell** (b3, Be3, Nc3, Rc1) dodges Black's piece-pressure; then **d5/c5/f4.**
- In the **Modern**, develop soundly, keep the **bishop pair**, clamp with **d5.**
- **Before each move:** is d4/e5 adequately guarded? Is Black's **...f6/...c5/...e5** break about to land? Can I trap a Black piece with **c5**?

**The five questions, distilled to a mantra:**
> *Jobs → Structure → Weak squares (d4/e5!) → Their threat (d5? trapped piece? broken center?) → My break.*

---

*Evaluations cited (engine/database consensus): the opening is sound but gives White a small, lasting pull (~+0.3 to +0.7); the Four Pawns is the critical test and fully playable for Black; the Exchange is the most common and equalizes with accurate play; the Modern is the most practical for both sides. Use these as orientation, not gospel — verify sharp lines against your own engine as you study.*
