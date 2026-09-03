function polarPoint(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/**
 * Renders a radar/hexagon chart into the given SVG element.
 * @param {SVGElement} svg
 * @param {{name:string, value:number}[]} data
 * @param {number} max
 */
function renderRadar(svg, data, max = 100) {
  const cx = 250, cy = 230, maxR = 168;
  const n = data.length;
  const step = 360 / n;
  let html = '';

  // grid rings
  [0.25, 0.5, 0.75, 1].forEach(frac => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const [x, y] = polarPoint(cx, cy, maxR * frac, step * i);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    html += `<polygon points="${pts.join(' ')}" fill="none" stroke="#E2E8F0" stroke-width="1"/>`;
  });

  // axis lines
  for (let i = 0; i < n; i++) {
    const [x, y] = polarPoint(cx, cy, maxR, step * i);
    html += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#E2E8F0" stroke-width="1"/>`;
  }

  // data polygon
  const dataPts = data.map((d, i) => polarPoint(cx, cy, (d.value / max) * maxR, step * i));
  html += `<polygon points="${dataPts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="rgba(37,99,235,0.16)" stroke="#2563EB" stroke-width="2.5" stroke-linejoin="round"/>`;

  // data dots
  dataPts.forEach(([x, y]) => {
    html += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#2563EB" stroke="#fff" stroke-width="1.5"/>`;
  });

  // labels
  data.forEach((d, i) => {
    const [x, y] = polarPoint(cx, cy, maxR + 40, step * i);
    html += `<text x="${x.toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" class="radar-label-name">${d.name}</text>`;
    html += `<text x="${x.toFixed(1)}" y="${(y + 12).toFixed(1)}" text-anchor="middle" class="radar-label-val">${d.value}</text>`;
  });

  svg.innerHTML = html;
}
