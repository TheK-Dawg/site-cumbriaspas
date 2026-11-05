// Full-page + fold screenshots of a URL at 1440 / 768 / 360 into shots/preview2/.
// usage: node scripts/shots.mjs https://site-cumbriaspires-preview2.<sub>.workers.dev/
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';

const require = createRequire('/root/projects/lead-gen-websites/invicta-construction-finishes/package.json');
const { chromium } = require('playwright');

const url = process.argv[2];
if (!url) { console.error('usage: node scripts/shots.mjs <url>'); process.exit(1); }
const out = 'shots/preview2';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
for (const width of [1440, 768, 360]) {
  const page = await browser.newPage({ viewport: { width, height: width >= 1024 ? 900 : 800 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle' });
  // Fire lazy images and reveals before the full-page capture.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
    document.querySelectorAll('[data-motion="reveal"]').forEach((el) => el.classList.add('is-in'));
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/home-${width}-fold.png` });
  await page.screenshot({ path: `${out}/home-${width}-full.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const robots = await page.evaluate(() => document.querySelector('meta[name="robots"]')?.getAttribute('content'));
  // Hero CTA pair: label + width vs the copy column (full-width stack on phones).
  const hero = await page.evaluate(() => {
    const col = document.querySelector('.hero__btns').getBoundingClientRect().width;
    return Array.from(document.querySelectorAll('.hero__btns .btn')).map((b) => `${b.textContent.trim()}=${Math.round(b.getBoundingClientRect().width)}/${Math.round(col)}`).join(' | ');
  });
  const headerPhone = await page.evaluate(() => { const p = document.querySelector('.hd__phone'); return p && p.getBoundingClientRect().width > 0 ? p.textContent.trim() : 'hidden'; });
  const btnText = await page.evaluate(() => getComputedStyle(document.querySelector('.hero__btns .btn-primary')).color);
  // Hero: background photo on <=900px, standalone photo only beside the copy on desktop.
  const heroMedia = await page.evaluate(() => ({
    bg: getComputedStyle(document.querySelector('.hero__bg')).display !== 'none',
    side: getComputedStyle(document.querySelector('.hero__media')).display !== 'none',
  }));
  console.log(`  hero bg image=${heroMedia.bg} standalone image=${heroMedia.side}`);
  // Opened mobile menu: must share the header bar's left/right edges.
  if (width < 1240) {
    await page.click('[data-burger]');
    await page.waitForTimeout(300);
    const fit = await page.evaluate(() => {
      const r = document.querySelector('.hd__row').getBoundingClientRect();
      const m = document.querySelector('.hd__menu').getBoundingClientRect();
      return `row ${Math.round(r.left)}-${Math.round(r.right)} bottom ${Math.round(r.bottom)} | menu ${Math.round(m.left)}-${Math.round(m.right)} top ${Math.round(m.top)}`;
    });
    console.log(`  menu: ${fit}`);
    await page.screenshot({ path: `${out}/home-${width}-menu.png` });
    await page.click('[data-burger]');
    await page.waitForTimeout(200);
  }
  const stickyTop = await page.evaluate(() => document.querySelector('[data-sticky-cta]').hasAttribute('data-show'));
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(500);
  const stickyMid = await page.evaluate(() => document.querySelector('[data-sticky-cta]').hasAttribute('data-show'));
  const stickyLabels = await page.evaluate(() => Array.from(document.querySelectorAll('[data-sticky-cta] a')).map((a) => `${a.textContent.trim()} [${getComputedStyle(a).backgroundColor}]`).join(' + '));
  await page.screenshot({ path: `${out}/home-${width}-sticky.png` });
  console.log(`${width}px  overflow=${overflow}px  robots="${robots}"`);
  console.log(`  header phone: ${headerPhone}  primary text: ${btnText}`);
  console.log(`  hero: ${hero}`);
  console.log(`  sticky at top=${stickyTop} after scroll=${stickyMid}: ${stickyLabels}`);
  // Operator pass (2 Oct) evidence, one line per law.
  const op = await page.evaluate(() => {
    const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
    const sb = document.querySelector('[data-sticky-cta]');
    const hd = document.querySelector('.hd'), row = document.querySelector('.hd__row'), logo = document.querySelector('.hd__logo');
    const hr = hd.getBoundingClientRect(), lr = logo.getBoundingClientRect();
    // Cards: every link inside a service card, and whether it is the title link; any stretched ::after overlay.
    const cards = Array.from(document.querySelectorAll('.sv__card:not(.sv__card--cta)')).map((c) => {
      const links = Array.from(c.querySelectorAll('a'));
      const overlay = links.some((a) => { const s = getComputedStyle(a, '::after'); return s.content !== 'none' && s.position === 'absolute'; });
      const t = c.querySelector('.sv__title a');
      return { n: links.length, titleOnly: links.length === 1 && links[0] === t, overlay, href: t?.getAttribute('href') };
    });
    // Side-by-side buttons: rows with 2+ visible buttons on one line, widths.
    const rows = Array.from(document.querySelectorAll('.btn-row, .sb, .hd__menu-actions')).map((r) => {
      const b = Array.from(r.querySelectorAll('.btn, a')).filter((x) => x.parentElement === r && vis(x));
      if (b.length < 2) return null;
      const w = b.map((x) => Math.round(x.getBoundingClientRect().width));
      return `${r.className.split(' ').pop()}:${w.join('/')}${new Set(w).size === 1 ? ' EQ' : ' UNEQUAL'}`;
    }).filter(Boolean);
    // Accent strips: any element with a coloured top/left border >= 2px.
    const accents = Array.from(document.querySelectorAll('body *')).filter((el) => {
      const cs = getComputedStyle(el);
      return (parseFloat(cs.borderTopWidth) >= 2 && cs.borderTopStyle !== 'none' && parseFloat(cs.borderBottomWidth) < 1)
        || (parseFloat(cs.borderLeftWidth) >= 2 && cs.borderLeftStyle !== 'none' && parseFloat(cs.borderRightWidth) < 1);
    }).map((el) => el.className || el.tagName);
    const sec = document.querySelector('#contact');
    const formBtns = Array.from(sec.querySelectorAll('a.btn, a[href^="tel:"].btn, a[href*="wa.me"], button')).filter((x) => x.type !== 'submit').map((x) => x.textContent.trim());
    const ftImg = document.querySelector('footer .ft__logo img');
    return {
      sticky: { display: getComputedStyle(sb).display, rendered: vis(sb) && sb.hasAttribute('data-show') },
      header: { bg: getComputedStyle(hd).backgroundColor, rowBg: getComputedStyle(row).backgroundColor, bar: `${Math.round(hr.top)}-${Math.round(hr.bottom)}`, logo: `${Math.round(lr.top)}-${Math.round(lr.bottom)} (${Math.round(lr.width)}px)`, logoInside: lr.top >= hr.top && lr.bottom <= hr.bottom && lr.left >= 0 && lr.right <= innerWidth },
      nav: Array.from(document.querySelectorAll('.hd__nav a')).map((a) => a.textContent.trim()).join(' / '),
      cards, rows, accents, formBtns,
      footerLogo: ftImg ? `${ftImg.getAttribute('src')} natural=${ftImg.naturalWidth} rendered=${Math.round(ftImg.getBoundingClientRect().width)}px` : 'MISSING',
      footerText: !!document.querySelector('.ft__name'),
    };
  });
  console.log(`  [OP] sticky after scroll: display=${op.sticky.display} rendered=${op.sticky.rendered}`);
  console.log(`  [OP] header bg=${op.header.bg} row=${op.header.rowBg} bar ${op.header.bar} logo ${op.header.logo} inside=${op.header.logoInside}`);
  console.log(`  [OP] nav: ${op.nav}`);
  console.log(`  [OP] cards: ${op.cards.map((c) => `${c.href} links=${c.n} titleOnly=${c.titleOnly} overlay=${c.overlay}`).join(' | ')}`);
  console.log(`  [OP] paired buttons: ${op.rows.join(' | ') || 'none side by side'}`);
  console.log(`  [OP] accent border strips: ${op.accents.length} ${op.accents.join(', ')}`);
  console.log(`  [OP] buttons in #contact besides submit: ${op.formBtns.length} ${op.formBtns.join(', ')}`);
  console.log(`  [OP] footer logo: ${op.footerLogo} textWordmark=${op.footerText}`);
  await page.close();
}
await browser.close();
console.log(`saved to ${out}/`);
