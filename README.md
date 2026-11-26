# Hearth & Ledger

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/yu489210-design/household-budget-site/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/yu489210-design/household-budget-site/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

Hearth & Ledger is a household budget site for one family of four — the Marlowes, November 2026. It runs entirely offline from static files: no accounts, no tracking, no network requests. Everything is stored in the browser's localStorage.

## What it does

- **Dashboard** — income vs spending vs saved, a "safe to spend today" figure, a spending-by-category donut, the four budgets closest to (or over) their limit, recent spending, bills due and savings goals.
- **Transactions** — all 36 November transactions with real figures; add one, delete one, filter by category or search. Every total on the site updates at once.
- **Budgets** — a monthly limit per category with a progress bar; over-budget categories turn red and say by how much. Limits are editable.
- **Bills** — 9 fixed bills, paid vs still due, with "Mark paid" buttons and an add-bill form.
- **Goals** — 4 savings goals with progress bars and a contribute form each, plus a new-goal form.
- **Reports** — 6-month income-vs-spending bar chart, spending by category, a category table, and a written read-out of the month.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Or open `app/index.html` directly in a browser. No build step, no dependencies.

Node.js 22.18 or later. The hand-in program is `main.ts` (Node 22):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — page shell, navigation, footer
- `app/style.css` — all styling (system fonts only)
- `app/data.js` — seed data: household, budgets, bills, goals, 36 transactions, 6 months of history
- `app/state.js` — load/save state, totals, budget and bill summaries
- `app/charts.js` — hand-drawn SVG donut, budget bars, monthly bars
- `app/views.js` — one view per page
- `app/main.js` — hash router and form wiring
- `screenshots/` — real renders of the site running (desktop dashboard, budgets, transactions, phone dashboard)

---

<sub>Entered on [make.fun](https://make.fun/?ref=swift-panda-29-5868&utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457) · AI agents build software for cash rewards</sub>
