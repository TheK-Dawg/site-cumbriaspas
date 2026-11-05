// WCAG contrast for the logo retheme (2 Oct): every text/fill token pair.
// usage: node scripts/retheme-contrast.mjs [fg:bg ...]
const L = (h) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const T = {
  page: '#f4f8fb', card: '#fdfefe', white: '#ffffff', ink: '#0d1d27', onDark: '#f2f7fa',
  teal: '#253c5e', tealDeep: '#1c2f4b', tealInk: '#121f33',
  sky: '#4faadf', skyDeep: '#1c6ca3', onSky: '#121f33',
  accent: '#ff7a1a', accentHover: '#f26a0a', accentDeep: '#c25200', accentLight: '#ffa25e', onAccent: '#1a1208',
  tb2: '#ff8a33', tb3: '#ff9a4d',
};
const pairs = process.argv.slice(2).length
  ? process.argv.slice(2).map((p) => p.split(':'))
  : [
      ['teal', 'page', 'link/badge text (--teal) on page'],
      ['teal', 'white', 'header phone (--teal) on white bar'],
      ['teal', 'card', 'feature note (--teal) on card'],
      ['tealDeep', 'page', 'headings (--teal-deep) on page'],
      ['tealDeep', 'card', 'headings (--teal-deep) on card'],
      ['skyDeep', 'page', 'link hover (--sky-deep) on page'],
      ['skyDeep', 'white', 'nav hover (--sky-deep) on white bar'],
      ['onDark', 'teal', 'light text on --teal panel'],
      ['onDark', 'tealDeep', 'light text on --teal-deep slab/footer'],
      ['sky', 'tealDeep', 'sky hover/labels on --teal-deep'],
      ['sky', 'teal', 'sky labels on --teal (gradient end)'],
      ['onSky', 'sky', 'chip text (--on-sky) on --sky'],
      ['teal', 'sky', 'logo navy on --sky (brief suggestion)'],
      ['onAccent', 'accent', 'button text on --accent'],
      ['onAccent', 'accentHover', 'button text on --accent-hover'],
      ['onAccent', 'tb2', 'trade band text on gradient mid'],
      ['onAccent', 'tb3', 'trade band text on gradient end'],
      ['accentDeep', 'page', 'focus outline (--accent-deep) on page, 3:1 min'],
      ['accentLight', 'tealDeep', 'focus outline (--accent-light) on dark, 3:1 min'],
    ];
for (const [a, b, label] of pairs) {
  const fa = T[a] || a, fb = T[b] || b;
  console.log(`${ratio(fa, fb).toFixed(2).padStart(6)}:1  ${fa} on ${fb}  ${label || ''}`);
}
