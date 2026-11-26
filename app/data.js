// Seed data for the Marlowe household, November 2026.
// All figures are realistic demo figures for one family of four.
// Amounts are in US dollars. Income is positive, spending is negative
// in the transaction list; budgets and bills store plain amounts.

export const HOUSEHOLD = {
  name: 'The Marlowe Household',
  members: 'Maya & Tom Marlowe, with June (9) and Leo (6)',
  month: 'November 2026',
  monthKey: '2026-11',
  payday: '1st & 15th',
};

export const CATEGORIES = [
  { id: 'housing', label: 'Housing', color: '#2e7d5b' },
  { id: 'groceries', label: 'Groceries', color: '#4a9e6d' },
  { id: 'utilities', label: 'Utilities', color: '#7fb069' },
  { id: 'transport', label: 'Transport', color: '#d97706' },
  { id: 'dining', label: 'Dining out', color: '#c05621' },
  { id: 'kids', label: 'Kids & school', color: '#6b7fd7' },
  { id: 'health', label: 'Health', color: '#0e7490' },
  { id: 'fun', label: 'Fun & treats', color: '#b45309' },
  { id: 'home', label: 'Home & garden', color: '#78716c' },
  { id: 'income', label: 'Income', color: '#2e7d5b' },
  { id: 'other', label: 'Other', color: '#94a3b8' },
];

export const BUDGETS = [
  { category: 'housing', limit: 1850 },
  { category: 'groceries', limit: 720 },
  { category: 'utilities', limit: 260 },
  { category: 'transport', limit: 420 },
  { category: 'dining', limit: 260 },
  { category: 'kids', limit: 340 },
  { category: 'health', limit: 220 },
  { category: 'fun', limit: 180 },
  { category: 'home', limit: 150 },
  { category: 'other', limit: 120 },
];

// Monthly income: two salaries plus freelance work.
export const INCOME = [
  { source: "Maya's salary (teacher)", amount: 3840, day: '1st' },
  { source: "Tom's salary (electrician)", amount: 2560, day: '15th' },
  { source: 'Tom freelance — weekend jobs', amount: 450, day: 'varies' },
];

// Bills due in November. paid: true means already paid this month.
export const BILLS = [
  { id: 'b1', name: 'Mortgage — First County Bank', amount: 1650, due: 'Nov 1', paid: true, autopay: true },
  { id: 'b2', name: 'Electric — City Power', amount: 132, due: 'Nov 8', paid: true, autopay: true },
  { id: 'b3', name: 'Internet — Northline Fibre', amount: 79, due: 'Nov 12', paid: true, autopay: true },
  { id: 'b4', name: 'Phones — two lines', amount: 96, due: 'Nov 15', paid: true, autopay: false },
  { id: 'b5', name: 'Water & sewer', amount: 64, due: 'Nov 18', paid: true, autopay: true },
  { id: 'b6', name: 'Car insurance', amount: 148, due: 'Nov 20', paid: false, autopay: false },
  { id: 'b7', name: 'Home insurance', amount: 112, due: 'Nov 22', paid: false, autopay: true },
  { id: 'b8', name: 'Gym — family plan', amount: 58, due: 'Nov 25', paid: false, autopay: true },
  { id: 'b9', name: 'Streaming (2 services)', amount: 27, due: 'Nov 28', paid: false, autopay: true },
];

export const GOALS = [
  { id: 'g1', name: 'Emergency fund', target: 9000, saved: 6840, note: '6 months of essentials' },
  { id: 'g2', name: 'Summer holiday — coast trip', target: 1800, saved: 1125, note: 'Book by March' },
  { id: 'g3', name: 'Replace the old car', target: 6500, saved: 2310, note: '$250 a month' },
  { id: 'g4', name: "June's bike fund", target: 320, saved: 285, note: 'Almost there!' },
];

// Spending and income so far in November 2026 (through Nov 26).
// amount: negative = money out, positive = money in.
export const TRANSACTIONS = [
  { id: 't01', date: '2026-11-01', desc: "Maya's salary", category: 'income', amount: 3840 },
  { id: 't02', date: '2026-11-01', desc: 'Mortgage — First County Bank', category: 'housing', amount: -1650 },
  { id: 't03', date: '2026-11-02', desc: 'GreenMart weekly shop', category: 'groceries', amount: -148.2 },
  { id: 't04', date: '2026-11-02', desc: 'School lunches — June & Leo', category: 'kids', amount: -42 },
  { id: 't05', date: '2026-11-03', desc: 'Bus passes (monthly)', category: 'transport', amount: -96 },
  { id: 't06', date: '2026-11-04', desc: 'GreenMart top-up shop', category: 'groceries', amount: -86.45 },
  { id: 't07', date: '2026-11-05', desc: 'Pizza night — family', category: 'dining', amount: -38.5 },
  { id: 't08', date: '2026-11-06', desc: 'Petrol — Shell', category: 'transport', amount: -52.3 },
  { id: 't09', date: '2026-11-07', desc: 'Tom freelance — rewiring job', category: 'income', amount: 210 },
  { id: 't10', date: '2026-11-08', desc: 'Electric — City Power', category: 'utilities', amount: -132 },
  { id: 't11', date: '2026-11-09', desc: 'GreenMart weekly shop', category: 'groceries', amount: -162.8 },
  { id: 't12', date: '2026-11-09', desc: 'Kids swimming lessons', category: 'kids', amount: -64 },
  { id: 't13', date: '2026-11-10', desc: 'Pharmacy — Leo inhaler', category: 'health', amount: -28.9 },
  { id: 't14', date: '2026-11-11', desc: 'Cinema — family film', category: 'fun', amount: -41 },
  { id: 't15', date: '2026-11-12', desc: 'Internet — Northline Fibre', category: 'utilities', amount: -79 },
  { id: 't16', date: '2026-11-13', desc: 'GreenMart weekly shop', category: 'groceries', amount: -139.6 },
  { id: 't17', date: '2026-11-14', desc: 'Petrol — Shell', category: 'transport', amount: -48.75 },
  { id: 't18', date: '2026-11-15', desc: "Tom's salary", category: 'income', amount: 2560 },
  { id: 't19', date: '2026-11-15', desc: 'Phones — two lines', category: 'utilities', amount: -96 },
  { id: 't20', date: '2026-11-16', desc: 'School trip — June museum visit', category: 'kids', amount: -35 },
  { id: 't21', date: '2026-11-17', desc: 'GreenMart weekly shop', category: 'groceries', amount: -151.35 },
  { id: 't22', date: '2026-11-18', desc: 'Water & sewer', category: 'utilities', amount: -64 },
  { id: 't23', date: '2026-11-18', desc: 'Takeaway — Thai night', category: 'dining', amount: -44.2 },
  { id: 't24', date: '2026-11-19', desc: 'Dentist check-up — Maya', category: 'health', amount: -85 },
  { id: 't25', date: '2026-11-20', desc: 'Garden centre — winter bulbs', category: 'home', amount: -36.4 },
  { id: 't26', date: '2026-11-21', desc: 'Tom freelance — light fitting', category: 'income', amount: 240 },
  { id: 't27', date: '2026-11-21', desc: 'GreenMart weekly shop', category: 'groceries', amount: -127.9 },
  { id: 't28', date: '2026-11-22', desc: 'New school shoes — Leo', category: 'kids', amount: -58 },
  { id: 't29', date: '2026-11-23', desc: 'Petrol — Shell', category: 'transport', amount: -55.1 },
  { id: 't30', date: '2026-11-23', desc: 'Bookshop — June birthday books', category: 'fun', amount: -32.75 },
  { id: 't31', date: '2026-11-24', desc: 'Coffee & cake — Maya & Tom', category: 'dining', amount: -18.6 },
  { id: 't32', date: '2026-11-25', desc: 'Hardware store — tap washer', category: 'home', amount: -14.2 },
  { id: 't33', date: '2026-11-25', desc: 'GreenMart top-up shop', category: 'groceries', amount: -74.55 },
  { id: 't34', date: '2026-11-26', desc: 'Lunch out — Tom work lunch', category: 'dining', amount: -16.4 },
  { id: 't35', date: '2026-11-26', desc: 'Kids art supplies', category: 'kids', amount: -27.5 },
  { id: 't36', date: '2026-11-26', desc: 'Haircuts — whole family', category: 'health', amount: -68 },
];

// Past six months, for the Reports page trend chart.
export const MONTHLY_HISTORY = [
  { month: 'Jun', income: 6720, spent: 4810 },
  { month: 'Jul', income: 6850, spent: 5230 },
  { month: 'Aug', income: 6980, spent: 5490 },
  { month: 'Sep', income: 6850, spent: 4675 },
  { month: 'Oct', income: 6900, spent: 4940 },
  { month: 'Nov', income: 6850, spent: 3814 },
];
