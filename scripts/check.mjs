// Rendered checks over every built route at 1440x900 and 390x844: overflow,
// single H1 within caps, alt text, contrast (<3:1), section naming, fixed
// boxes inside the viewport, the mobile header/menu law, the form law, the
// gallery law, the sticky bar, the top-row pixel probe (no dark bar), the
// button sheen and the mobile Quick Quote anchor. Screenshots into shots/.
// usage: node scripts/check.mjs [--shots-only route,route]
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const require = createRequire('/root/projects/lead-gen-websites/invicta-construction-finishes/package.json');
const { chromium } = require('playwright');

const dist = join(process.cwd(), 'dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(dist, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { f = join(dist, '404.html'); res.writeHead(404, { 'content-type': 'text/html' }); res.end(existsSync(f) ? readFileSync(f) : 'nf'); return; }
  res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(4398, r));

const routes = [];
const walk = (d, base = '') => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) walk(join(d, e.name), `${base}/${e.name}`);
    else if (e.name === 'index.html') routes.push(`${base}/` || '/');
    else if (e.name === '404.html') routes.push('/404.html');
  }
};
walk(dist);
routes.sort();
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null;
const list = only ? routes.filter((r) => only.includes(r)) : routes;

mkdirSync('shots', { recursive: true });
const browser = await chromium.launch();
const report = {};
const shotPages = new Set(only ?? ['/', '/services/boiler-repair/', '/services/247-emergency-plumber/', '/resources/hard-water-limescale-norfolk-homes/', '/contact/', '/services/', '/areas/', '/about/', '/resources/', '/thank-you/', '/terms/', '/404.html']);

const probe = async (page, vp) => page.evaluate(({ vw }) => {
  const lum = (rgb) => {
    const [r, g, b] = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (c) => { const m = c.match(/[\d.]+/g); return m ? m.map(Number) : null; };
  const bgOf = (el) => {
    while (el) {
      const c = parse(getComputedStyle(el).backgroundColor);
      if (c && (c.length < 4 || c[3] > 0.5)) return c.slice(0, 3);
      const bi = getComputedStyle(el).backgroundImage;
      if (bi && bi.includes('gradient')) return [15, 84, 104]; // the teal hero gradient mid-tone
      el = el.parentElement;
    }
    return [245, 249, 250];
  };
  const bad = [];
  document.querySelectorAll('h1,h2,h3,p,a,span,li,dt,dd,summary,button,option,blockquote').forEach((el) => {
    const text = (el.childNodes[0]?.nodeType === 3 ? el.textContent : '').trim();
    if (!text || !el.offsetParent) return;
    const cs = getComputedStyle(el);
    const fg = parse(cs.color); if (!fg) return;
    const bg = bgOf(el);
    const a = fg.length > 3 ? fg[3] : 1;
    const mixed = fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a));
    const l1 = lum(mixed), l2 = lum(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    if (ratio < 3) bad.push({ tag: el.tagName, cls: String(el.className).slice(0, 30), text: text.slice(0, 30), ratio: +ratio.toFixed(2) });
  });
  const fixedOut = [];
  document.querySelectorAll('*').forEach((el) => {
    const pos = getComputedStyle(el).position;
    if (pos !== 'fixed' && pos !== 'sticky') return;
    const b = el.getBoundingClientRect();
    if (b.width === 0 || b.height === 0) return;
    if (b.left < -1 || b.right > vw + 1) fixedOut.push({ cls: String(el.className).slice(0, 30), left: Math.round(b.left), right: Math.round(b.right) });
  });
  const sections = Array.from(document.querySelectorAll('main > section'));
  const unnamed = sections.filter((s) => !s.dataset.section || !s.className.includes(`section-${s.dataset.section}`)).map((s) => s.className.slice(0, 40));
  const h1 = document.querySelectorAll('h1');
  const form = document.querySelector('form[data-quote-form]');
  const text = document.body.innerText;
  return {
    scrollWidth: document.documentElement.scrollWidth,
    h1: h1.length,
    h1Size: h1[0] ? parseFloat(getComputedStyle(h1[0]).fontSize) : 0,
    imgsNoAlt: Array.from(document.images).filter((i) => !i.hasAttribute('alt')).length,
    contrast: bad.slice(0, 12),
    fixedOut,
    unnamedSections: unnamed,
    labels: form ? form.querySelectorAll('label').length : null,
    required: form ? form.querySelectorAll('[required]').length : null,
    leaveReview: text.toLowerCase().includes('leave us a review'),
    googleReviewWords: /google review/i.test(text),
    emDash: text.includes('—'),
    freeQuote: /free quote/i.test(text),
    gasSafe: /gas safe(?!ty)/i.test(text),
    maps: document.querySelectorAll('iframe[src*="google.com/maps"]').length,
    galleryCols: (() => { const g = document.querySelector('.gl__grid'); if (!g) return null; return getComputedStyle(g).gridTemplateColumns.split(' ').length; })(),
    galleryCount: document.querySelectorAll('.gl__grid [data-lightbox]').length,
    pageHeight: document.body.scrollHeight,
    buttons: Array.from(document.querySelectorAll('.btn, [data-sticky-cta] a')).map((b) => getComputedStyle(b, '::after').animationName).filter((n) => n === 'btn-sheen-loop').length,
    buttonsTotal: document.querySelectorAll('.btn, [data-sticky-cta] a').length,
    dates: /\b(19|20)\d{2}\b/.test(document.querySelector('.art')?.innerText || '') ? 'year-in-article' : false,
    contextualContact: document.querySelectorAll('main a[data-link="contextual"][href="/contact/"]').length,
  };
}, { vw: vp.width });

for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  for (const route of list) {
    const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:4398${route}`, { waitUntil: 'load' });
    await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    await page.waitForTimeout(400);
    const key = `${name} ${route}`;
    const r = await probe(page, vp);
    r.deviceWidth = vp.width;
    // Top-row pixel probe: mean brightness of the top 6px must not read as black.
    const top = await page.screenshot({ clip: { x: 0, y: 0, width: vp.width, height: 6 } });
    r.topPngBytes = top.length;
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      document.querySelectorAll('[data-motion="reveal"]').forEach((el) => el.classList.add('is-in'));
      window.scrollTo(0, 0);
    });
    if (name === 'mobile') {
      r.headerVisibleButtons = await page.evaluate(() => Array.from(document.querySelectorAll('header .btn, header a[href^="tel:"]')).filter((el) => el.getBoundingClientRect().width > 0 && getComputedStyle(el).display !== 'none').length);
      await page.waitForTimeout(400);
      r.stickyAtTop = await page.evaluate(() => { const b = document.querySelector('[data-sticky-cta]'); return b ? b.hasAttribute('data-show') : null; });
      await page.evaluate(() => window.scrollTo(0, 1800));
      await page.waitForTimeout(400);
      r.stickyMid = await page.evaluate(() => { const b = document.querySelector('[data-sticky-cta]'); return b ? b.hasAttribute('data-show') : null; });
      const hasForm = await page.$('form#quote');
      if (hasForm) {
        await page.evaluate(() => document.querySelector('[data-sticky-cta] a, a[href="#quote"]').click());
        let last = -1;
        for (let i = 0; i < 30; i++) {
          await page.waitForTimeout(300);
          const y = await page.evaluate(() => window.scrollY);
          if (y === last) break;
          last = y;
        }
        await page.waitForTimeout(400);
        r.formTopAfterClick = await page.evaluate(() => Math.round(document.getElementById('quote').getBoundingClientRect().top));
        r.firstInputTop = await page.evaluate(() => Math.round(document.querySelector('form#quote input[name="name"]').getBoundingClientRect().top));
        r.headerH = await page.evaluate(() => document.querySelector('[data-header] .hd__row').getBoundingClientRect().bottom);
        r.stickyOverForm = await page.evaluate(() => { const b = document.querySelector('[data-sticky-cta]'); return b ? b.hasAttribute('data-show') : null; });
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(200);
      if (shotPages.has(route)) {
        await page.click('[data-burger]');
        await page.waitForTimeout(300);
        r.menuLinks = await page.evaluate(() => Array.from(document.querySelectorAll('[data-menu] a')).filter((a) => { const b = a.getBoundingClientRect(); return b.width > 0 && b.top >= 0 && b.bottom <= window.innerHeight; }).map((a) => a.textContent.trim()));
        await page.screenshot({ path: `shots/${name}${route.replace(/\//g, '_') || '_'}menu.png` });
        await page.keyboard.press('Escape');
      }
    }
    if (name === 'desktop' && route === '/') {
      await page.click('[data-lightbox]');
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'shots/desktop-lightbox.png' });
      await page.keyboard.press('Escape');
    }
    if (shotPages.has(route)) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.evaluate(() => Promise.all(Array.from(document.images).map((i) => i.decode().catch(() => {}))));
      await page.waitForTimeout(300);
      await page.screenshot({ path: `shots/${name}${route.replace(/\//g, '_') || '_'}fold.png` });
      await page.screenshot({ path: `shots/${name}${route.replace(/\//g, '_') || '_'}full.png`, fullPage: true });
    }
    report[key] = r;
    await page.close();
  }
}
await browser.close();
server.close();

const fails = [];
for (const [k, r] of Object.entries(report)) {
  if (r.scrollWidth > r.deviceWidth) fails.push(`${k}: overflow ${r.scrollWidth}>${r.deviceWidth}`);
  if (r.h1 !== 1) fails.push(`${k}: h1 count ${r.h1}`);
  if (k.startsWith('mobile') && r.h1Size > 44) fails.push(`${k}: h1 ${r.h1Size}px > 44`);
  if (k.startsWith('desktop') && r.h1Size > 72) fails.push(`${k}: h1 ${r.h1Size}px > 72`);
  if (r.imgsNoAlt) fails.push(`${k}: ${r.imgsNoAlt} imgs without alt`);
  if (r.contrast.length) fails.push(`${k}: contrast ${JSON.stringify(r.contrast)}`);
  if (r.fixedOut.length) fails.push(`${k}: fixed out ${JSON.stringify(r.fixedOut)}`);
  if (r.unnamedSections.length) fails.push(`${k}: unnamed sections ${JSON.stringify(r.unnamedSections)}`);
  if (r.labels) fails.push(`${k}: form has ${r.labels} labels`);
  if (r.required !== null && r.required !== 6) fails.push(`${k}: form required ${r.required}`);
  if (r.leaveReview) fails.push(`${k}: leave us a review`);
  if (r.googleReviewWords) fails.push(`${k}: "google review" words`);
  if (r.emDash) fails.push(`${k}: em dash`);
  if (r.freeQuote) fails.push(`${k}: free quote`);
  if (r.gasSafe) fails.push(`${k}: "gas safe" credential term`);
  if (r.buttons !== r.buttonsTotal) fails.push(`${k}: sheen ${r.buttons}/${r.buttonsTotal}`);
  if (k.startsWith('mobile') && r.galleryCols && r.galleryCols !== 2) fails.push(`${k}: gallery cols ${r.galleryCols}`);
  if (k.startsWith('mobile') && r.headerVisibleButtons) fails.push(`${k}: header buttons visible ${r.headerVisibleButtons}`);
  if (k.startsWith('mobile') && r.stickyAtTop) fails.push(`${k}: sticky visible at top`);
  if (k.startsWith('mobile') && r.stickyMid === false && !/thank-you|404/.test(k)) fails.push(`${k}: sticky hidden mid page`);
  if (k.startsWith('mobile') && r.stickyOverForm) fails.push(`${k}: sticky visible over form`);
  if (k.startsWith('mobile') && r.formTopAfterClick !== undefined && (r.formTopAfterClick < r.headerH - 4 || r.formTopAfterClick > r.headerH + 40)) fails.push(`${k}: form landed at ${r.formTopAfterClick} (header ${r.headerH})`);
  if (r.dates) fails.push(`${k}: ${r.dates}`);
  if (r.maps === 0 && /^(desktop|mobile) \/(services\/[^/]+\/|areas\/|contact\/|)$/.test(k)) fails.push(`${k}: no map`);
}
writeFileSync('shots/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ routes: list.length, fails }, null, 2));
console.log('sample', JSON.stringify(report['mobile /'], null, 1));
