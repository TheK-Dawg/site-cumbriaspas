// Contrast of the dark button text (#1a1208) on candidate accent fills.
// usage: node scripts/contrast.mjs [#hex ...]
const L = (h) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const x = L(a), y = L(b); return ((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2); };
const fills = process.argv.slice(2).length ? process.argv.slice(2) : ['#cc5500', '#b34a00', '#d95f0a', '#e0660f', '#e86f1a', '#d4600e', '#dd6512', '#ff9a52'];
for (const f of fills) console.log(f, ratio(f, '#1a1208'));
