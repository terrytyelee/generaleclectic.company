# Handoff: General Eclectic — Creative Infrastructures Portal

## Overview

General Eclectic is a modern creative infrastructures / record label platform. The
tagline is **"Intelligence for Artistry."** (Japanese: 芸術家のための知性。) The
product combines:

- A **public landing page** (marketing / thesis / application funnel)
- An **application form** (4-step funnel: Identity → Discipline → Work → Intent)
- A **private artist portal** (dashboard + the **Maya** A&R agent + stack view
  showing `artiste.md` — a suite of 10 A&R agents)

The aesthetic is **"Bloomberg Terminal meets Criterion Collection meets a 1980s
Japanese technical spec-sheet."** Dark English Green (`#1B4332`), gold accents,
IBM Plex for Latin + Noto Serif/Sans JP for Japanese, kanji chapter numerals,
tategaki (vertical) type, crop marks, catalog-plate grids.

## About the Design Files

The files in `design/` are **design references created in HTML** — working
prototypes that show the intended look and behavior using plain React + Babel in
the browser + a hand-written `styles.css`. They are **not production code to
copy directly.**

The task is to **recreate these designs in a real codebase** — a proper
Vite + React (or Next.js) project with component files, a real build pipeline,
and deployment to `generaleclectic.company`. Use the codebase's established
patterns; treat the HTML as the visual + interaction contract.

If no codebase exists yet, **Vite + React + TypeScript** is recommended here:
the prototype already uses React, the component boundaries are clean, and a
static build deploys trivially to Netlify / Vercel / Cloudflare Pages / any
static host.

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, copy, and
interactions. Recreate pixel-perfectly. All hex values, font families, sizes,
and letter-spacing values below are authoritative and should be ported as
design tokens verbatim.

---

## Pages / Routes

The prototype uses client-side page state (`home | apply | portal`) persisted
to `localStorage`. In the real app these should be **real routes**:

| Route | Component | Purpose |
|---|---|---|
| `/` | `Landing` | Marketing landing, thesis, stack overview, funnel to apply |
| `/apply` | `Apply` | 4-step application form |
| `/portal` | `Dashboard` | Gated artist dashboard + Maya chat + agent stack |

The `TopBar` is persistent across all three.

---

## Page: Landing (`/`)

**Visual language:** 1980s Japanese technical spec-sheet. Every section is
labeled like a page in a bound technical document: 株式会社 header strip, chapter
numerals in kanji (壱 · 弐 · 参 · 肆), crop marks (tombo), bordered tables, stamp
marks (認可 APP. and 受付中).

### Sections in order

1. **Kaisha header strip** (`.kaisha`)
   Full-width bar, `background: var(--black)`, 10px uppercase mono type.
   Three columns: `[株式会社 G.E. CREATIVE INFRASTRUCTURES]` · `TECHNICAL OVERVIEW · v1.0`
   · `[技術仕様書 · Doc. GE-YYYY-MMDD-001 · date]`
   Document number auto-generated from today's date.

2. **Hero spec-sheet** (`.hero-jp`)
   Three-column grid: `60px | 1fr | 320px`.
   - Column 1: `.hero-jp__vertical` — tategaki (`writing-mode: vertical-rl`),
     Noto Serif JP, says 株式会社 / *芸術のための知性* (the latter in gold).
   - Column 2: `.hero-jp__wm-block` — title block with `01` in the corner,
     ゼネラル・エクレクティック label, then **GENERAL / ECLECTIC** wordmark
     (IBM Plex Sans 800, `clamp(72px, 12vw, 176px)`, letter-spacing `-0.04em`,
     line-height `0.9`), then tagline row: *Intelligence for Artistry.* (italic serif, gold)
     + 芸術家のための知性。(Noto Serif JP).
     Below: two-column abstract (`概要 · Abstract`, `方針 · Principles`).
   - Column 3: `.hero-jp__right` — spec table with rows Entity / Founded /
     Domain / Roster / Agents / Signal. CTAs: "Apply to Roster →" (primary)
     and "Open Portal 開く" (ghost).
   - Top corners have `.tombo--tl` / `.tombo--tr` crop marks.
   - Meta strip at top: `FIG. 01 — 総合` · `General Eclectic · Creative Infrastructure Platform`
     · `機密 / CONFIDENTIAL` · `Page 01 of 04`

3. **Spec strip** (4-up metric bar)
   4 equal cells separated by 1px rules. Each cell: huge 44px number
   (gold on positions 2 and 3, ink on 1 and 4), uppercase mono label, and a
   Japanese glyph line.
   `14` / Artists on active roster / 所属アーティスト
   `10` / A&R agents via artiste.md / 配備エージェント
   `∞` / Release formats supported / リリース形式
   `4%` / Watermark opacity, always / 透かし濃度

4. **Chapter 01 — 壱 · 模型 (The Model)**
   Section header layout: `[chapter num + kanji]` `[big title]` `[Ch. 01 / 04]`
   Title: *"The old label is linear. We built something dynamic."*
   — *dynamic* is italic serif gold.
   Body: `.spec-compare` table, 3 columns (Parameter 項目 / Legacy 旧モデル /
   G.E. Protocol 新方式). 5 rows: Release cadence, A&R process, Royalty
   settlement, Format fidelity, Upside. Legacy values in ink-2; G.E. Protocol
   values in gold.

5. **Chapter 02 — 弐 · 構成 (The Stack)**
   Title: *"artiste.md — a suite of ten A&R agents."*
   `.stack-jp` grid: 5 columns × 2 rows of catalog cells.
   Each cell has: `[NN] [零N kanji]` · **Title** · 日本語 · short description ·
   `[vX.Y.Z]` `[● stable/beta]`.
   The 10 agents are listed below under **artiste.md (the ten agents)**.

6. **Chapter 03 — 参 · 論 (Thesis)**
   Big pull-quote layout. Left column: `.stamp` — circular angled stamp that
   reads **認可 / APP.** (rotated -6°, border 2px in gold or green depending on mode).
   Right column: italic serif pull quote, 32px, max 24ch:
   *"We treat creative output with the same precision as quantitative analysis.
   The best ideas live at **intersections.**"*
   Below the quote: 3-up meta row (Foreword / Author / Edition).

7. **Chapter 04 — 肆 · 応募 (Ask)**
   Two columns: `1.2fr | 1fr`.
   Left: tagline in gold italic serif, CTAs, 2×2 meta grid (対象 For /
   方針 Commitment / 地域 Geography / 選考 Selection).
   Right: bordered box "Form A — 応募用紙" with a 4-step preview list
   (Identity 身元 / Discipline 分野 / Work 作品 / Intent 意向) and a
   `.stamp-sq` mark "受付中".

8. **Page foot** (`.foot-jp`)
   Full-width 3-column strip with 発行 · Issued / 領域 · Domain / 信号 · Signal
   columns. Signal column shows active state in signal-green.

### artiste.md (the ten agents)

Port this list verbatim — title, JP label, description, version, and status
are all hifi.

| # | 漢 | Title | 日本語 | Description | Ver | Status |
|--|--|--|--|--|--|--|
| 01 | 零壱 | Voice | 声 | Vocal identity modeling. Timbre, cadence, signature phrasing. | v0.4.2 | stable |
| 02 | 零弐 | Personality | 人格 | Long-horizon persona coherence across releases. | v0.3.1 | stable |
| 03 | 零参 | Engagement | 関与 | Fan telemetry. Who shows up, and when they stop. | v0.5.0 | stable |
| 04 | 零肆 | Streaming | 配信 | Platform-aware release timing and payload. | v0.4.7 | stable |
| 05 | 零伍 | Touring | 巡業 | Routing, markets, demand-weighted calendars. | v0.2.0 | beta |
| 06 | 零陸 | Localization | 翻訳 | Translation + cultural context by market. | v0.4.3 | stable |
| 07 | 零漆 | Liquid API | 開口部 | Open surface for collaborators and partners. | v0.1.9 | beta |
| 08 | 零捌 | Social Sync | 連動 | Narrative continuity across platforms. | v0.3.8 | stable |
| 09 | 零玖 | Intelligence | 諜報 | Market, mood, and competitive read-outs. | v0.5.2 | stable |
| 10 | 壱零 | Reports | 報告 | Daily A&R briefings. Machine-written, human-edited. | v0.4.1 | stable |

---

## Page: Apply (`/apply`)

**File:** `design/components/apply.jsx`

Multi-step application form in the same spec-sheet aesthetic. 4 steps:

1. **Identity (身元)** — Name, legal name, pronouns, location, primary contact
2. **Discipline (分野)** — Discipline select, formats (multi-select chips),
   tools/DAWs, years active
3. **Work (作品)** — 3 links (portfolio, release, social), short bio (300
   chars)
4. **Intent (意向)** — Why GE, what you're building, timeline, permissions

Between each step: a header row showing `Step N of 4 — [JP label]`, a progress
bar (`4px` tall, gold fill on filled ink/white track), and next/back buttons.
Final step has a "Submit Application" primary button + a small "Your
application will be reviewed within 48 hours" note.

**Validation behavior:**
- Fields are soft-required (show a gold-outlined warning beneath on blur if
  empty, don't block the next step — this is intentional, this is a taste
  gate not a compliance form)
- Links are validated as URLs on blur
- Character counts visible on textareas

**State:** persist draft to `localStorage` key `ge:apply:draft` on every
change so refresh doesn't lose work.

**On submit:** POST to your backend (not wired up in the prototype) — show a
success screen with the 認可 stamp rotated into view and a doc number.

---

## Page: Portal / Dashboard (`/portal`)

**File:** `design/components/dashboard.jsx` + `design/components/maya.jsx` +
`design/components/agents.jsx`

Three-column layout (`.dash`): `260px | 1fr | 360px` on desktop, collapses
on narrow.

- **Left column** — nav + artist roster list, agent status indicators,
  document stack ("Latest Reports"), and a signal/status block.
- **Center column** — feed of briefings, charts (sparklines via
  `Sparkline` component), and section tabs. Typography: uppercase mono labels,
  IBM Plex Serif for body, IBM Plex Sans for titles.
- **Right column** — **Maya**, the A&R agent chat interface. Fixed panel
  with a chat scroll, input, and a small "active agents" ribbon at the top
  showing which of the 10 agents fed into the current answer.

### Maya (chat)

The prototype does **not** call any AI API. If you want Maya to actually
respond, wire it to your backend:

```ts
// Frontend
const res = await fetch('/api/maya', {
  method: 'POST',
  body: JSON.stringify({ messages }),
});
```

Your `/api/maya` endpoint should call **Anthropic's Claude API server-side**
(never from the browser — your key will leak). Recommended model: `claude-sonnet-4-5`
or `claude-haiku-4-5` depending on latency needs. Pass a system prompt that
establishes Maya's persona: rigorous, terse, A&R-native, writes like a music
supervisor, signs briefings with `— M.`

### Agent stack view (`/portal/agents`)

Expanded view of the 10 agents. Same content as the landing-page
`artiste.md` grid but with per-agent detail pages — telemetry, last-run,
config. Use the same catalog-plate cell styling as `.stack-jp__cell`.

---

## Design Tokens

All tokens live in `:root` inside `design/styles.css`. Port these verbatim.

### Colors

```css
--green:       #1B4332;   /* English Green — primary bg, brand anchor */
--green-deep:  #143328;   /* Deep Forest — hover, depth */
--gold:        #F0B429;   /* Golden Yellow — surgical accents only */
--gold-soft:   #F5CC5E;   /* Light Gold — secondary gold */
--white:       #FFFFFF;
--black:       #0A0A0A;
--signal:      #34D399;   /* Signal Green — status active */
--warm-gray:   #9CA3AF;   /* Muted text, meta */
```

### Semantic tokens (dark mode, default)

```css
--bg:    var(--green);
--bg-2:  var(--green-deep);
--bg-3:  #0F2A1F;
--ink:   var(--white);
--ink-2: rgba(255,255,255,0.82);
--ink-3: rgba(255,255,255,0.58);
--ink-4: rgba(255,255,255,0.32);
--rule:  rgba(255,255,255,0.10);
--rule-2:rgba(255,255,255,0.05);
```

### Semantic tokens (light mode — `body[data-mode="light"]`)

```css
--bg:    #FFFFFF;
--bg-2:  #F6F6F4;
--bg-3:  #EDEDE9;
--ink:   var(--green);         /* wordmark English Green, never black */
--ink-2: var(--black);          /* body text black */
--ink-3: var(--warm-gray);
--ink-4: rgba(10,10,10,0.28);
--rule:  rgba(10,10,10,0.08);
--rule-2:rgba(10,10,10,0.04);
```

In light mode, every gold accent must flip to `var(--green)`. The stylesheet
has paired `body[data-mode="light"]` selectors — preserve this pattern.

### Typography

```css
--font-sans:    "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
--font-serif:   "IBM Plex Serif", ui-serif, Georgia, serif;
--font-mono:    "IBM Plex Mono", ui-monospace, Menlo, monospace;
--font-jp-serif:"Noto Serif JP", "IBM Plex Serif", serif;
--font-jp-sans: "Noto Sans JP", "IBM Plex Sans", sans-serif;
--font-jp:      "Noto Serif JP", "IBM Plex Serif", serif; /* alias */
```

Load from Google Fonts (already wired in the HTML `<head>`):
`IBM+Plex+Sans:wght@400;500;600;700;800` ·
`IBM+Plex+Serif:ital,wght@0,400;0,700;1,400;1,700` ·
`IBM+Plex+Mono:wght@400;500;600` ·
`Noto+Serif+JP:wght@400;500;700` ·
`Noto+Sans+JP:wght@400;500;700`

### Type scale (authoritative)

| Role | Font | Weight | Size | Tracking | Notes |
|---|---|---|---|---|---|
| Hero wordmark | sans | 800 | `clamp(72px, 12vw, 176px)` | `-0.04em` | line-height `0.9`, uppercase |
| Section title | sans | 700 | `clamp(36px, 4.8vw, 64px)` | `-0.02em` | italic serif for emphasis spans |
| Body (spec) | serif | 400 | 15–16px | 0 | line-height 1.55 |
| Stat number | sans | 800 | 44px | `-0.04em` | gold or ink |
| Eyebrow | sans | 600 | 0.7rem (~11px) | `0.18em` | uppercase, gold |
| Label | sans | 600 | 0.6rem (~9.5px) | `0.12em` | uppercase, ink-3 |
| Code/mono | mono | 500 | 0.72rem (~11.5px) | `0.06em` | ink-3 |
| Tagline | serif italic | 400 | `clamp(20px, 2.2vw, 28px)` | 0 | gold |
| JP vertical | jp-serif | 500 | 16px | `0.1em` | `writing-mode: vertical-rl` |
| Kanji chapter | jp-serif | 500 | 14px | `0.1em` | ink-2 |

### Spacing / layout

No formal spacing scale in the prototype — values are mostly `8 · 12 · 16 ·
20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 100`. If setting up a new scale, use
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` and snap accordingly.

Max content width: **1520px**. Horizontal gutter: **48px** on desktop, **32px**
tablet, **16px** mobile.

### Borders, radii, shadows

- **Border:** `1px solid var(--rule)` everywhere except `.spec-compare` and
  `.stack-jp` which use `1px solid var(--ink)` on the outer frame for a
  harder catalog-plate look
- **Radius:** `0` — no rounded corners anywhere. This is a deliberate
  industrial-print choice. Do not add radius.
- **Shadows:** none. Depth comes from rules and fills, not shadow. Do not add
  drop shadows.

### Interaction tokens

- Transitions: `200ms` (hover states), `300ms ease` (mode switch)
- Hover on agent cells: `background: var(--bg-2)` + `.stack-jp__num` goes to
  gold
- CTAs: `.btn` ghost → ink fill on hover; `.btn--primary` gold → gold-soft

---

## Responsive breakpoints

```css
@media (max-width: 1200px) { ...collapse grids to fewer columns }
@media (max-width:  980px) { ...collapse to single column, hide nav }
```

The JP hero at narrow widths collapses to a single column; the tategaki
sidebar becomes a horizontal inline row. See `styles.css` lines ~1956–1980.

---

## Components inventory

The prototype has these React components — recreate each as a file in your
codebase.

### Atoms (`components/shared.jsx`)

- `Eyebrow` — small uppercase gold label
- `Wordmark` — the two-line GENERAL / ECLECTIC mark, size variants
  `sm | md | lg | xl`
- `Reveal` — IntersectionObserver-based fade/slide-in. Add `.reveal` +
  `.in` class handling to the target codebase
- `Clock` — live NYC time, updates every second
- `TopBar` — persistent nav, shows current time + `● LIVE` indicator,
  Apply CTA
- `Sparkline` — inline SVG sparkline, 120×28 viewBox

### Landing (`components/landing.jsx`)

The full landing. Break into:
- `<KaishaStrip />` — top 株式会社 bar
- `<HeroJP />` — three-column hero with tategaki, wordmark, spec table
- `<SpecStrip />` — 4-up metric row
- `<ChapterHeader number kanji title slug />` — reused for all 4 chapters
- `<SpecCompare rows />` — the Legacy vs G.E. Protocol table
- `<StackJP agents />` — the 10-cell catalog grid
- `<Thesis />` — stamp + pull-quote
- `<ApplyCTA />` — the chapter 04 ask block
- `<FootJP />` — the 3-up page footer

### Apply (`components/apply.jsx`)

- `<ApplyShell step totalSteps>` — header bar + progress + kids slot
- `<ApplyStepIdentity />`
- `<ApplyStepDiscipline />`
- `<ApplyStepWork />`
- `<ApplyStepIntent />`
- `<ApplySuccess docNumber />`
- `<FieldText label jpLabel required />`
- `<FieldTextarea label jpLabel maxChars />`
- `<FieldSelect label options />`
- `<FieldChips label options />`

### Dashboard (`components/dashboard.jsx` + `maya.jsx` + `agents.jsx`)

- `<Dashboard />` — shell with 3-column grid
- `<DashLeft />` — roster + reports + signal
- `<DashCenter />` — briefings feed + charts
- `<Maya />` — chat panel
- `<AgentsStack />` — expanded agent list view
- `<AgentCell agent />` — individual stack cell

### Tweaks (`components/tweaks.jsx`)

A small floating panel for theme tweaks (dark/light, accent variant). In
production **delete this** — it's a prototype-only surface.

---

## Behaviors & State

### Routing

Replace the `useState("home" | "apply" | "portal")` pattern with real routes
(`react-router-dom` or Next.js App Router). The `TopBar` should read the
current pathname instead of prop state.

### Persistence

- `localStorage["ge:page"]` — current page. **Remove this** when using real
  routes (the URL is the source of truth).
- `localStorage["ge:apply:draft"]` — apply form draft. **Keep this** — it
  protects users from refresh.

### Mode switching

`body[data-mode="dark" | "light"]`. Default dark. Tweaks panel flips this.
Every gold accent must flip to green in light mode — the stylesheet does this
explicitly.

### Intersection-observer reveals

`.reveal` → `.reveal.in` pattern in `styles.css`. Translate into your
animation library of choice (framer-motion, CSS-only, or keep as-is).

---

## Authentication (not yet wired)

The prototype `/portal` is **public** in the prototype. In production it
should be gated. Recommendation:

- **Auth provider:** Clerk, Auth0, Supabase, or NextAuth — pick the one
  that fits your backend
- **Portal is artist-only** (invited roster + approved applicants)
- **Landing and Apply remain public**

The Apply form submission should create a pending application record that an
admin can review and accept (promoting the applicant into the portal).

---

## API endpoints you'll need

| Endpoint | Purpose |
|---|---|
| `POST /api/applications` | Submit a new application (from Apply form) |
| `GET  /api/portal/me` | Current artist's profile + permissions |
| `GET  /api/portal/briefings` | Today's briefings feed |
| `GET  /api/portal/agents` | State of the 10 agents (versions, last-run) |
| `POST /api/maya` | Chat with Maya (proxies to Anthropic Claude) |
| `GET  /api/portal/roster` | The 14 artists (for left rail) |

---

## AI Integration (Maya)

**Critical:** Do **not** call Anthropic from the browser. Always proxy through
your backend so your API key stays server-side.

```ts
// app/api/maya/route.ts  (Next.js example)
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();
  const r = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: MAYA_SYSTEM_PROMPT,
    messages,
  });
  return Response.json({ content: r.content });
}
```

Maya system prompt guidance: terse, A&R-native voice, signs off `— M.`,
writes like a Criterion-Collection liner note crossed with a Bloomberg
briefing. No emoji. No hedging.

---

## Deployment

The app is a static-ish SPA with a few API routes. Any of these work:

- **Vercel** — zero-config for Next.js, auto-detect the repo
- **Netlify** — `next build` or `vite build`, serve `dist/`
- **Cloudflare Pages + Workers** — if you want the API routes as Workers

Custom domain: **generaleclectic.company** (configured in your DNS provider;
point a CNAME/A record at whichever host you pick).

---

## Assets

- **Fonts:** Google Fonts (IBM Plex family + Noto Serif/Sans JP) — already
  wired in the HTML `<head>`. No other font files needed.
- **Icons:** none. The prototype deliberately uses no icon set — every
  affordance is type + rule + fill. Keep it this way.
- **Images:** none. If imagery is added later (artist photos for the roster),
  commit to a high-contrast B&W treatment or full-color editorial — do not
  mix styles.
- **Logos:** the wordmark is **type only** — `GENERAL / ECLECTIC` set in
  IBM Plex Sans 800. There is no logo mark file.

---

## Files in this bundle

```
design_handoff_general_eclectic/
├── README.md                 ← this file
└── design/
    ├── General Eclectic.html ← entry; wires React + Babel + styles
    ├── styles.css            ← all tokens + component styles (~2000 lines)
    ├── app.jsx               ← root App with page routing
    └── components/
        ├── shared.jsx        ← Eyebrow, Wordmark, Reveal, Clock, TopBar, Sparkline
        ├── landing.jsx       ← the landing page (spec-sheet redesign)
        ├── apply.jsx         ← 4-step application form
        ├── dashboard.jsx     ← portal shell
        ├── maya.jsx          ← Maya chat panel
        ├── agents.jsx        ← the 10-agent stack view
        └── tweaks.jsx        ← prototype-only tweak panel (remove in prod)
```

To see the design running: open `design/General Eclectic.html` in any modern
browser (it uses React + Babel via CDN — no build step needed to preview).

---

## Reminder for Claude Code

When implementing:

1. **Read `styles.css` completely before writing any component CSS.** Token
   names, the dark/light pattern, and the catalog-plate look depend on the
   exact CSS variables. Port them verbatim.
2. **Port the JP kanji copy verbatim.** Do not translate, summarize, or omit.
   The Japanese is load-bearing for the brand identity.
3. **Preserve the no-radius / no-shadow / no-emoji rules.** These are
   deliberate. Adding any of them will cheapen the aesthetic.
4. **The `artiste.md` agent list is a product spec, not filler.** Ten agents,
   those exact names, those versions, those statuses. Build real models
   behind them eventually — but ship them as-documented first.
5. **Gold is a surgical accent.** It should draw the eye to exactly one thing
   per screen, not be applied broadly.
