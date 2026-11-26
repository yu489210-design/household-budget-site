# REPORT — Best Household Budget Site

## Bounty (verified from the kit, not guessed)

- Bounty: **Make the best household budget site**, https://make.fun/bounty/best-household-budget-site-20261126-1457
- Reward: **$50, 10 places × $5 each** (1st–10th). Escrow $50 USDC locked on Solana since 2026-11-25. Entry fee: none (free).
- Deadlines: entries close **2026-11-29 14:57 UTC (22:57 Beijing)**. Blind rounds at 2026-11-27 08:57 UTC (**16:57 Beijing today**), 2026-11-28 02:57 UTC, 2026-11-28 20:57 UTC, final 2026-11-29 14:57 UTC. Results due 2026-12-16.
- Field: **3,408 submissions** already (checked 2026-11-26 22:34 UTC). Final heat takes the top 40 dev entrants; top 10 share the $50.
- Judging: AI judge (z-ai/glm-5.3-flash, house prompt sealed in RULES.txt) compares entries pairwise by **screenshots first** (contact sheet: cover large on top, others small beneath) plus a short source outline (max 1,536 tokens). Criteria in order: (1) working budget site shown in screenshots, pages/tools/sections reached by links, real figures, every control working; (2) content & usefulness; (3) ease of use incl. phone layout; (4) look & originality; (5) speed & structure (small first load, source split into one-job files). No ties; margin 1–5.
- Deliverables: public GitHub repo created after opening, OSI license, `main.ts` (Node 22) in root, `vendor/makefun-frontend.ts` unchanged, `app/` static files with no build step, 3–4 screenshots (each ≤256 KiB, long side ≤1280, short side ≥360), transcripts bundle.
- Scorer gate (RULES.txt): app/ ≤993 files / 16 MiB, no network references of any kind, dossier byte-for-byte what `buildDossier` writes, 3–4 screenshots. Hosting (top 10 on makefun.gg) blocks cookies/service workers/`eval` — the site uses none; persistence is localStorage with a try/catch fallback.

## Publisher analysis

- Sponsor is **make.fun itself** (house bounty, verified sponsor, not an individual publisher). There is no individual host whose past winners can be profiled — the skill's publisher-analysis step therefore falls back to the house judge brief above.
- What the judge brief rewards, applied here: the **cover screenshot must sell the whole site at a glance** when shrunk (dashboard: hero with saved figure, 4 stat cards, donut, budget check with red over-budget bars). Every page is a real working page reached by a nav link; every control does something (add/delete transaction, edit budget limits, mark bills paid, contribute to goals, add bill/goal). Figures are internally consistent — every total is computed from the same 36 transactions (income $6,850, spent $3,814.45, saved $3,035.55), so the dashboard, budgets, bills and reports pages all agree. Source is split into one-job files (`data.js`, `state.js`, `charts.js`, `views.js`, `main.js`) with descriptive function names, and the first load is tiny (no libraries, no fonts, no network).
- Deliberate tension, not a perfect month: groceries are $171 over budget and utilities $111 over, shown in red with a plain-English explanation on the Reports page. A flawless month would look like placeholder data; a real household has overruns.

## What was built

**Hearth & Ledger** — a household budget site for the (fictional, original) Marlowe family, November 2026.

- Dashboard, Transactions, Budgets, Bills, Goals, Reports — six hash-routed pages, all linked from the top nav.
- 36 seeded transactions, 10 category budgets, 9 bills, 4 savings goals, 6 months of history.
- All interactive, verified: `node --check` on every JS file; a Node logic test confirmed add-transaction updates category totals ($890.85 → $900.85 groceries), state save/reload round-trips (37 transactions), and mark-paid drops the unpaid total to $197. Screenshots are real headless-Chrome renders of the running site (viewed and checked by eye: no overlap, no cut-off text, no placeholder).
- Screenshots: `1-dashboard.png` (1280×800, cover), `2-budgets.png` (1280×800), `3-transactions.png` (1280×800), `4-dashboard-phone.png` (390×844). All ≤117 KiB.

## Local verification (run twice)

- `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts` — run twice; dossier.json byte-identical both runs (see below).
- `node cli/makefun.mjs check` — result below.

## Status

- [x] Site built, tested, screenshotted
- [x] README badges use `yu489210-design/household-budget-site` (GitHub owner), never the make.fun handle
- [x] `main.ts` run twice — dossier.json byte-identical (f05b15e2…9cccd)
- [x] Local git commit `02872022cda41a5100c60e7eff718081e0cfa197` (after removing requirements.json from the repo)
- [ ] GitHub repo: MCP `create_repository` failed (403, GitHub App cannot create repos) — creating via browser web UI instead, as previous entries did
- [ ] Public GitHub repo created + files pushed (commit SHA: ______)
- [ ] Kit check passed (see below)
- [ ] Transcripts bundle made (must contain this session's `--muse-usage` records; re-bundle after the report message lands if usage is 0)
- [ ] **NOT submitted** — no submission id yet. Still needed from the user: approve the agent connection on make.fun, then sign in Phantom (signature valid 10 minutes, sign at submission time only) and confirm payout.
