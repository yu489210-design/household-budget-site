// Household state: loads the seed data, keeps every change in
// localStorage, and recomputes the monthly totals from the
// transactions so every page always agrees with every other page.

import { BUDGETS, BILLS, GOALS, TRANSACTIONS } from './data.js';

const KEY = 'hearth-ledger-v1';

function freshState() {
  return {
    transactions: TRANSACTIONS.map((t) => ({ ...t })),
    budgets: BUDGETS.map((b) => ({ ...b })),
    bills: BILLS.map((b) => ({ ...b })),
    goals: GOALS.map((g) => ({ ...g })),
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.transactions) || !Array.isArray(parsed.budgets)) return freshState();
    return parsed;
  } catch {
    return freshState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Private mode or storage full: the site still works in memory.
  }
}

export function resetState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
  return freshState();
}

export const money = (n) =>
  (n < 0 ? '-$' : '$') + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const money0 = (n) =>
  (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');

export function totals(state) {
  let income = 0;
  let spent = 0;
  const byCategory = {};
  for (const t of state.transactions) {
    if (t.amount >= 0) income += t.amount;
    else {
      spent += -t.amount;
      byCategory[t.category] = (byCategory[t.category] || 0) + -t.amount;
    }
  }
  return { income, spent, saved: income - spent, byCategory };
}

export function budgetRows(state) {
  const { byCategory } = totals(state);
  return state.budgets.map((b) => {
    const spent = byCategory[b.category] || 0;
    return { ...b, spent, left: b.limit - spent, pct: b.limit > 0 ? (spent / b.limit) * 100 : 0 };
  });
}

export function billsSummary(state) {
  const unpaid = state.bills.filter((b) => !b.paid);
  const paid = state.bills.filter((b) => b.paid);
  const unpaidTotal = unpaid.reduce((s, b) => s + b.amount, 0);
  const paidTotal = paid.reduce((s, b) => s + b.amount, 0);
  return { unpaid, paid, unpaidTotal, paidTotal };
}

export function nextBill(state) {
  const unpaid = state.bills.filter((b) => !b.paid);
  return unpaid.length ? unpaid[0] : null;
}

let counter = 100;
export function nextId(prefix) {
  counter += 1;
  return `${prefix}${Date.now().toString(36)}${counter}`;
}
