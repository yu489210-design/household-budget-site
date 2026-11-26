// Small SVG charts, drawn by hand — no chart library, no network.
// Every chart is plain SVG so it renders offline and stays tiny.

export function donut(segments, size = 180, centerSub = 'spent in Nov') {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 70;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const rings = segments
    .map((seg) => {
      const frac = seg.value / total;
      const dash = `${Math.max(frac * circ - 2, 0)} ${circ}`;
      const el = `<circle cx="90" cy="90" r="${r}" fill="none" stroke="${seg.color}" stroke-width="26" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}" />`;
      offset += frac * circ;
      return el;
    })
    .join('');
  const legend = segments
    .map(
      (seg) =>
        `<li><span class="dot" style="background:${seg.color}"></span>${seg.label}<b>$${Math.round(seg.value).toLocaleString()}</b></li>`,
    )
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 180 180" width="${size}" height="${size}" role="img" aria-label="Spending by category">${rings}<text x="90" y="84" text-anchor="middle" class="donut-total">$${Math.round(total).toLocaleString()}</text><text x="90" y="104" text-anchor="middle" class="donut-sub">${centerSub}</text></svg><ul class="legend">${legend}</ul></div>`;
}

export function hbar(label, spent, limit, color) {
  const pct = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  const over = spent > limit;
  return `<div class="hbar-row"><div class="hbar-head"><span>${label}</span><span>$${Math.round(spent).toLocaleString()} of $${limit.toLocaleString()}</span></div><div class="hbar-track"><div class="hbar-fill ${over ? 'over' : ''}" style="width:${pct}%;${over ? '' : `background:${color}`}"></div></div><div class="hbar-foot">${over ? `Over budget by $${Math.round(spent - limit).toLocaleString()}` : `$${Math.round(limit - spent).toLocaleString()} left · ${Math.round(pct)}% used`}</div></div>`;
}

export function monthBars(months) {
  const max = Math.max(...months.map((m) => Math.max(m.income, m.spent)), 1);
  const bars = months
    .map(
      (m) => `<div class="mbar-col"><div class="mbar-pair"><div class="mbar in" style="height:${Math.round((m.income / max) * 150)}px" title="Income $${m.income}"></div><div class="mbar out" style="height:${Math.round((m.spent / max) * 150)}px" title="Spent $${m.spent}"></div></div><span>${m.month}</span></div>`,
    )
    .join('');
  return `<div class="mbar-chart">${bars}</div><p class="chart-key"><span class="key in"></span> Income &nbsp; <span class="key out"></span> Spent</p>`;
}
