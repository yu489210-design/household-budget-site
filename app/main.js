// Router and wiring for Hearth & Ledger.
// Hash routes: #/ dashboard, #/transactions, #/budgets, #/bills,
// #/goals, #/reports. Every form on every page works: it updates the
// state, saves it, and re-renders the page it is on.

import { CATEGORIES } from './data.js';
import { loadState, nextId, resetState, saveState } from './state.js';
import { budgetsView, billsView, dashboard, goalsView, notFound, reportsView, transactionsView } from './views.js';

const app = document.getElementById('app');
let state = loadState();
let txFilter = 'all';
let txQuery = '';

function nav() {
  const links = document.querySelectorAll('.nav a');
  links.forEach((a) => {
    const on = a.getAttribute('href') === location.hash || (a.getAttribute('href') === '#/' && (location.hash === '' || location.hash === '#/'));
    a.classList.toggle('active', on);
  });
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  if (hash.startsWith('#/transactions')) app.innerHTML = transactionsView(state, txFilter, txQuery);
  else if (hash.startsWith('#/budgets')) app.innerHTML = budgetsView(state);
  else if (hash.startsWith('#/bills')) app.innerHTML = billsView(state);
  else if (hash.startsWith('#/goals')) app.innerHTML = goalsView(state);
  else if (hash.startsWith('#/reports')) app.innerHTML = reportsView(state);
  else if (hash === '#/' || hash === '') app.innerHTML = dashboard(state);
  else app.innerHTML = notFound();
  nav();
  wire();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function rerender() {
  saveState(state);
  render();
}

function wire() {
  const addTx = document.getElementById('add-tx');
  if (addTx) {
    addTx.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(addTx);
      const amount = Math.abs(Number(f.get('amount') || 0));
      if (!amount) return;
      const dir = f.get('direction') === 'in' ? 1 : -1;
      state.transactions.push({
        id: nextId('t'),
        date: String(f.get('date') || '2026-11-26'),
        desc: String(f.get('desc') || '').trim() || 'Untitled',
        category: String(f.get('category') || 'other'),
        amount: dir * amount,
      });
      rerender();
    });
  }
  const catSel = document.getElementById('f-cat');
  if (catSel) catSel.addEventListener('change', () => { txFilter = catSel.value; render(); });
  const q = document.getElementById('f-q');
  if (q) q.addEventListener('input', () => { txQuery = q.value; render(); const again = document.getElementById('f-q'); if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); } });

  app.querySelectorAll('[data-del]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.transactions = state.transactions.filter((t) => t.id !== btn.dataset.del);
      rerender();
    });
  });
  app.querySelectorAll('[data-pay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const bill = state.bills.find((b) => b.id === btn.dataset.pay);
      if (bill) bill.paid = true;
      rerender();
    });
  });
  app.querySelectorAll('.limit-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const row = state.budgets.find((b) => b.category === form.dataset.cat);
      const v = Number(new FormData(form).get('limit'));
      if (row && Number.isFinite(v) && v >= 0) row.limit = v;
      rerender();
    });
  });
  app.querySelectorAll('.goal-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const goal = state.goals.find((g) => g.id === form.dataset.goal);
      const v = Number(new FormData(form).get('amount'));
      if (goal && Number.isFinite(v) && v > 0) goal.saved += v;
      rerender();
    });
  });
  const addBill = document.getElementById('add-bill');
  if (addBill) {
    addBill.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(addBill);
      state.bills.push({ id: nextId('b'), name: String(f.get('name') || '').trim(), amount: Number(f.get('amount') || 0), due: String(f.get('due') || ''), paid: false, autopay: false });
      rerender();
    });
  }
  const addGoal = document.getElementById('add-goal');
  if (addGoal) {
    addGoal.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(addGoal);
      state.goals.push({ id: nextId('g'), name: String(f.get('name') || '').trim(), target: Number(f.get('target') || 0), saved: Number(f.get('saved') || 0), note: 'New goal' });
      rerender();
    });
  }
  const reset = document.getElementById('reset-demo');
  if (reset) {
    reset.addEventListener('click', (e) => {
      e.preventDefault();
      state = resetState();
      txFilter = 'all';
      txQuery = '';
      rerender();
    });
  }
}

window.addEventListener('hashchange', render);
render();
