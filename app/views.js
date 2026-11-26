// One view per page. Every view is built from the live state, so
// adding a transaction on one page changes the totals on every page.

import { CATEGORIES, HOUSEHOLD, MONTHLY_HISTORY } from './data.js';
import { billsSummary, budgetRows, money, money0, nextBill, totals } from './state.js';
import { donut, hbar, monthBars } from './charts.js';

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const catLabel = (id) => (CATEGORIES.find((c) => c.id === id) || { label: id }).label;
const catColor = (id) => (CATEGORIES.find((c) => c.id === id) || { color: '#94a3b8' }).color;

function insights(state) {
  const t = totals(state);
  const rows = budgetRows(state);
  const over = rows.filter((r) => r.spent > r.limit);
  const daysLeft = 4; // November 26: four days left in the month
  const budgetTotal = rows.reduce((s, r) => s + r.limit, 0);
  const perDay = Math.max((budgetTotal - t.spent) / daysLeft, 0);
  const top = rows.slice().sort((a, b) => b.spent - a.spent)[0];
  const lines = [];
  if (over.length) {
    lines.push(
      `<li><strong>Watch ${over.map((r) => catLabel(r.category)).join(' and ')}:</strong> over budget by ${over.map((r) => money0(r.spent - r.limit)).join(' and ')} with ${daysLeft} days left.</li>`,
    );
  } else {
    lines.push('<li><strong>Every category is inside its budget</strong> — nice work, Marlowe family.</li>');
  }
  lines.push(
    `<li><strong>${catLabel(top.category)} is the biggest spend</strong> at ${money0(top.spent)} — ${Math.round((top.spent / t.spent) * 100)}% of everything spent so far.</li>`,
  );
  lines.push(
    `<li><strong>${money0(perDay)} a day</strong> is left to spend if you want to stay inside the plan until November 30.</li>`,
  );
  lines.push(
    `<li><strong>Savings rate ${Math.round((t.saved / t.income) * 100)}%:</strong> ${money0(t.saved)} of ${money0(t.income)} income is still in the bank.</li>`,
  );
  return `<ul class="tips">${lines.join('')}</ul>`;
}

export function dashboard(state) {
  const t = totals(state);
  const rows = budgetRows(state);
  const bills = billsSummary(state);
  const next = nextBill(state);
  const topCats = rows
    .slice()
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 5)
    .map((r) => ({ label: catLabel(r.category), value: r.spent, color: catColor(r.category) }));
  const recent = state.transactions.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);
  const goals = state.goals.slice(0, 3);
  return `
  <section class="hero"><div><p class="eyebrow">${esc(HOUSEHOLD.month)} · ${esc(HOUSEHOLD.members)}</p>
  <h1>Good morning, Marlowe family.</h1>
  <p class="lede">You have <strong>${money0(t.saved)}</strong> left from ${money0(t.income)} this month — and ${money0(bills.unpaidTotal)} of bills still to pay.</p></div>
  <div class="hero-card"><span>Safe to spend today</span><strong>${money0(Math.max((rows.reduce((s, r) => s + r.limit, 0) - t.spent) / 4, 0))}</strong><span>to stay on plan</span></div></section>

  <section class="cards">
    <div class="card stat"><span>Income so far</span><strong class="green">${money0(t.income)}</strong><small>Paydays 1st &amp; 15th</small></div>
    <div class="card stat"><span>Spent so far</span><strong>${money0(t.spent)}</strong><small>${state.transactions.filter((x) => x.amount < 0).length} purchases</small></div>
    <div class="card stat"><span>Saved so far</span><strong class="green">${money0(t.saved)}</strong><small>${Math.round((t.saved / t.income) * 100)}% savings rate</small></div>
    <div class="card stat"><span>Bills still due</span><strong>${money0(bills.unpaidTotal)}</strong><small>${next ? `Next: ${esc(next.name)} · ${esc(next.due)}` : 'All paid — well done!'}</small></div>
  </section>

  <section class="grid2">
    <div class="card"><h2>Where the money went</h2>${donut(topCats, 180, 'top 5 categories')}
    <p class="muted">Top five categories, November 1–26. <a href="#/reports">See the full breakdown →</a></p></div>
    <div class="card"><h2>Budget check</h2>${rows
      .slice()
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 4)
      .map((r) => hbar(catLabel(r.category), r.spent, r.limit, catColor(r.category)))
      .join('')}<p class="muted"><a href="#/budgets">See all ${rows.length} budgets →</a></p></div>
  </section>

  <section class="grid2">
    <div class="card"><h2>Recent spending</h2><ul class="tx-list">${recent
      .map(
        (x) =>
          `<li><span class="tx-dot" style="background:${catColor(x.category)}"></span><span class="tx-desc">${esc(x.desc)}<small>${esc(x.date)} · ${esc(catLabel(x.category))}</small></span><b class="${x.amount < 0 ? 'out' : 'in'}">${money(x.amount)}</b></li>`,
      )
      .join('')}</ul><p class="muted"><a href="#/transactions">All ${state.transactions.length} transactions →</a></p></div>
    <div class="card"><h2>Coming up &amp; saving for</h2>
      <h3>Bills due</h3><ul class="bill-mini">${bills.unpaid
        .slice(0, 3)
        .map((b) => `<li>${esc(b.name)}<b>${money0(b.amount)}</b><span>${esc(b.due)}</span></li>`)
        .join('')}</ul>
      <h3>Savings goals</h3>${goals
        .map(
          (g) =>
            `<div class="goal-mini"><span>${esc(g.name)}</span><div class="hbar-track"><div class="hbar-fill" style="width:${Math.min((g.saved / g.target) * 100, 100)}%"></div></div><small>${money0(g.saved)} of ${money0(g.target)} · ${Math.round((g.saved / g.target) * 100)}%</small></div>`,
        )
        .join('')}<p class="muted"><a href="#/goals">All savings goals →</a></p></div>
  </section>

  <section class="card"><h2>What the numbers say</h2>${insights(state)}</section>`;
}

export function transactionsView(state, filter = 'all', query = '') {
  const cats = CATEGORIES.filter((c) => c.id !== 'income');
  let list = state.transactions.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  if (filter !== 'all') list = list.filter((t) => t.category === filter);
  if (query) list = list.filter((t) => t.desc.toLowerCase().includes(query.toLowerCase()));
  const spent = list.filter((t) => t.amount < 0).reduce((s, t) => s + -t.amount, 0);
  const rows = list
    .map(
      (t) => `<tr><td>${esc(t.date)}</td><td>${esc(t.desc)}</td><td><span class="tag" style="background:${catColor(t.category)}22;color:${catColor(t.category)}">${esc(catLabel(t.category))}</span></td><td class="num ${t.amount < 0 ? 'out' : 'in'}">${money(t.amount)}</td><td><button class="del" data-del="${t.id}" aria-label="Delete ${esc(t.desc)}">Delete</button></td></tr>`,
    )
    .join('');
  return `
  <h1>Transactions</h1><p class="lede">Every dollar in and out, November 2026. Add one below and every total on the site updates at once.</p>
  <section class="card"><h2>Add a transaction</h2>
  <form id="add-tx" class="form-grid">
    <label>Date <input type="date" name="date" value="2026-11-26" required></label>
    <label>What was it? <input type="text" name="desc" placeholder="e.g. GreenMart weekly shop" required></label>
    <label>Category <select name="category">${cats.map((c) => `<option value="${c.id}" ${c.id === 'groceries' ? 'selected' : ''}>${c.label}</option>`).join('')}<option value="income">Income</option></select></label>
    <label>Amount ($) <input type="number" name="amount" min="0.01" step="0.01" placeholder="0.00" required></label>
    <label>Direction <select name="direction"><option value="out">Money out</option><option value="in">Money in</option></select></label>
    <span></span><button class="btn" type="submit">Add transaction</button>
  </form></section>
  <section class="card"><div class="filter-row">
    <label>Category <select id="f-cat"><option value="all">All categories</option>${CATEGORIES.map((c) => `<option value="${c.id}" ${filter === c.id ? 'selected' : ''}>${c.label}</option>`).join('')}</select></label>
    <label>Search <input id="f-q" type="search" placeholder="Search spending…" value="${esc(query)}"></label>
    <span class="muted">${list.length} shown · ${money0(spent)} spent in this view</span></div>
  <div class="table-wrap"><table><thead><tr><th>Date</th><th>Description</th><th>Category</th><th class="num">Amount</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="5">Nothing matches — try another category or search.</td></tr>'}</tbody></table></div></section>`;
}

export function budgetsView(state) {
  const rows = budgetRows(state);
  const t = totals(state);
  const totalLimit = rows.reduce((s, r) => s + r.limit, 0);
  return `
  <h1>Budgets</h1><p class="lede">A limit for every category, set at the start of the month. Change a limit and the dashboard updates with it.</p>
  <section class="cards"><div class="card stat"><span>Total planned</span><strong>${money0(totalLimit)}</strong><small>across ${rows.length} categories</small></div>
  <div class="card stat"><span>Spent so far</span><strong>${money0(t.spent)}</strong><small>${Math.round((t.spent / totalLimit) * 100)}% of the plan used</small></div>
  <div class="card stat"><span>Left to spend</span><strong class="green">${money0(totalLimit - t.spent)}</strong><small>with 4 days left in November</small></div></section>
  <section class="card">${rows
    .map(
      (r) => `<div class="budget-row">${hbar(catLabel(r.category), r.spent, r.limit, catColor(r.category))}
      <form class="limit-form" data-cat="${r.category}"><label>Monthly limit $<input type="number" name="limit" min="0" step="5" value="${r.limit}"></label><button class="btn small" type="submit">Save</button></form></div>`,
    )
    .join('')}</section>
  <section class="card"><h2>How the Marlowes set their budgets</h2><p>Housing and bills are fixed first, then groceries, then everything else. The 50/30/20 rule is the guide: about half the income on needs, a third on wants, a fifth saved. This month the family is saving ${Math.round((t.saved / t.income) * 100)}% — above the 20% guide.</p></section>`;
}

export function billsView(state) {
  const b = billsSummary(state);
  const row = (bill, paid) =>
    `<li class="bill-row"><span class="bill-name">${esc(bill.name)}<small>Due ${esc(bill.due)}${bill.autopay ? ' · autopay on' : ' · pay by hand'}</small></span><b>${money0(bill.amount)}</b>${paid ? '<span class="paid-tag">Paid ✓</span>' : `<button class="btn small" data-pay="${bill.id}">Mark paid</button>`}</li>`;
  return `
  <h1>Bills</h1><p class="lede">The fixed costs, in one place. Mark a bill paid and it moves to the paid list — and off the dashboard's "still due" total.</p>
  <section class="cards"><div class="card stat"><span>Still to pay</span><strong>${money0(b.unpaidTotal)}</strong><small>${b.unpaid.length} bills left in November</small></div>
  <div class="card stat"><span>Already paid</span><strong class="green">${money0(b.paidTotal)}</strong><small>${b.paid.length} bills settled</small></div>
  <div class="card stat"><span>Next up</span><strong>${b.unpaid.length ? esc(b.unpaid[0].name.split(' — ')[0]) : 'All paid'}</strong><small>${b.unpaid.length ? `${esc(b.unpaid[0].due)} · ${money0(b.unpaid[0].amount)}` : 'Nothing due'}</small></div></section>
  <section class="card"><h2>Still to pay (${b.unpaid.length})</h2><ul class="bill-list">${b.unpaid.map((x) => row(x, false)).join('') || '<li>Nothing left — every bill is paid.</li>'}</ul></section>
  <section class="card"><h2>Paid (${b.paid.length})</h2><ul class="bill-list">${b.paid.map((x) => row(x, true)).join('')}</ul></section>
  <section class="card"><h2>Add a bill</h2><form id="add-bill" class="form-grid">
    <label>Bill name <input type="text" name="name" placeholder="e.g. Car insurance" required></label>
    <label>Amount ($) <input type="number" name="amount" min="0.01" step="0.01" required></label>
    <label>Due <input type="text" name="due" placeholder="e.g. Nov 27" required></label>
    <span></span><button class="btn" type="submit">Add bill</button></form></section>`;
}

export function goalsView(state) {
  const totalSaved = state.goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = state.goals.reduce((s, g) => s + g.target, 0);
  return `
  <h1>Savings goals</h1><p class="lede">Money with a job to do. Add to a goal and watch its bar move — the money comes out of this month's savings.</p>
  <section class="cards"><div class="card stat"><span>Saved toward goals</span><strong class="green">${money0(totalSaved)}</strong><small>across ${state.goals.length} goals</small></div>
  <div class="card stat"><span>Still to save</span><strong>${money0(totalTarget - totalSaved)}</strong><small>${Math.round((totalSaved / totalTarget) * 100)}% of the way there</small></div></section>
  <section class="grid2">${state.goals
    .map(
      (g) => `<div class="card"><h2>${esc(g.name)}</h2><p class="muted">${esc(g.note)}</p>
      <div class="goal-big"><strong>${money0(g.saved)}</strong><span> of ${money0(g.target)}</span></div>
      <div class="hbar-track big"><div class="hbar-fill" style="width:${Math.min((g.saved / g.target) * 100, 100)}%"></div></div>
      <p>${Math.round((g.saved / g.target) * 100)}% funded · ${money0(g.target - g.saved)} to go</p>
      <form class="goal-form" data-goal="${g.id}"><label>Add to this goal $<input type="number" name="amount" min="1" step="5" placeholder="50" required></label><button class="btn small" type="submit">Add money</button></form></div>`,
    )
    .join('')}</section>
  <section class="card"><h2>Start a new goal</h2><form id="add-goal" class="form-grid">
    <label>Goal name <input type="text" name="name" placeholder="e.g. Christmas presents" required></label>
    <label>Target ($) <input type="number" name="target" min="1" step="10" required></label>
    <label>Already saved ($) <input type="number" name="saved" min="0" step="10" value="0"></label>
    <span></span><button class="btn" type="submit">Create goal</button></form></section>`;
}

export function reportsView(state) {
  const t = totals(state);
  const rows = budgetRows(state).slice().sort((a, b) => b.spent - a.spent);
  const history = MONTHLY_HISTORY.map((m) => (m.month === 'Nov' ? { ...m, spent: Math.round(t.spent), income: Math.round(t.income) } : m));
  const avgDay = t.spent / 26;
  const projected = Math.round((t.spent / 26) * 30);
  return `
  <h1>Reports</h1><p class="lede">Six months at a glance, and where November's money actually went.</p>
  <section class="card"><h2>Income vs spending — last 6 months</h2>${monthBars(history)}
  <p>November is on pace to spend about <strong>${money0(projected)}</strong> by the 30th (${money0(Math.round(avgDay))} a day so far), below October's ${money0(4940)}.</p></section>
  <section class="grid2"><div class="card"><h2>Spending by category</h2>${donut(rows.slice(0, 6).map((r) => ({ label: catLabel(r.category), value: r.spent, color: catColor(r.category) })), 180, 'top 6 categories')}</div>
  <div class="card"><h2>Category table</h2><table><thead><tr><th>Category</th><th class="num">Spent</th><th class="num">Budget</th><th class="num">Left</th></tr></thead><tbody>${rows
    .map((r) => `<tr><td>${esc(catLabel(r.category))}</td><td class="num">${money0(r.spent)}</td><td class="num">${money0(r.limit)}</td><td class="num ${r.left < 0 ? 'out' : ''}">${money0(r.left)}</td></tr>`)
    .join('')}</tbody></table></div></section>
  <section class="card"><h2>The story of November</h2>${insights(state)}
  <p>Groceries ran over because of two big shops before the school holidays; utilities ran over because the phone bill landed a week early. Dining out is well under budget — the family cooked at home 22 nights out of 26.</p></section>`;
}

export function notFound() {
  return `<h1>That page isn't here</h1><p class="lede">The link may be old. Try the dashboard — everything the household needs is linked from there.</p><p><a class="btn" href="#/">Back to the dashboard</a></p>`;
}
