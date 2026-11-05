// QA WALK for the Cumbria Spas build: every route at 1440x900 and 390x844.
// Per page: status, one H1, no horizontal overflow, every <img> has alt,
// visible-text contrast (>= 4.5:1 body, >= 3:1 large), the site's banned
// words and claims (plan + seed negativeTopics + standing word bans), the
// required furniture (header, footer credit, WhatsApp button, CTA line, the
// manufacturer line, form slot, map), price only on the Repair & Servicing
// page, anchor-text stop words, and every internal link resolving.
// Full-page screenshots go to shots/qa/.
//
// usage: node scripts/qa.mjs                 (serves dist/ locally)
//        node scripts/qa.mjs --url <origin>   (the deployed preview; also checks the Formlane form draws)
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const require = createRequire(import.meta.url);
const pwPath = process.env.PW_CORE || '/tmp/vp-r3-tools/node_modules/playwright-core';
const { chromium } = require(pwPath);

const args = process.argv.slice(2);
const remote = args.includes('--url') ? args[args.indexOf('--url') + 1].replace(/\/$/, '') : null;
const dist = join(process.cwd(), 'dist');
let base = remote;
let server;
if (!remote) {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.xml': 'application/xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.png': 'image/png', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
  server = createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = join(dist, p);
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
    if (!existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); res.end(readFileSync(join(dist, '404.html'))); return; }
    res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' });
    res.end(readFileSync(f));
  });
  await new Promise((r) => server.listen(4417, r));
  base = 'http://localhost:4417';
}

const hubs = ['wood-fired-hot-tubs', 'hot-tub-repair-and-servicing', 'electric-hot-tubs', 'hot-tub-installation', 'swimming-pools-and-swim-spas', 'saunas', 'arctic-spas-dealer', 'commercial-and-mosaic-tiled-spas', 'trade-and-holiday-park-hot-tubs'];
const articles = ['/resources/wood-fired-hot-tubs-kirkby-in-furness/', '/resources/hot-tub-repair-and-servicing-barrow-in-furness/', '/resources/electric-hot-tubs-kendal/'];
const routes = ['/', ...hubs.map((h) => `/${h}/`), '/services/', '/chemicals/', '/parts/', '/reviews/', '/about/', '/contact/', '/gallery/', '/resources/', ...articles, '/faq/', '/areas/', '/sitemap/', '/terms-and-conditions/', '/privacy-policy/', '/thank-you/', '/this-page-does-not-exist/'];
// The footer must link these on every page (operator, 5 Nov 2026), plus every hub.
const footerMust = [...hubs.map((h) => `/${h}/`), '/chemicals/', '/parts/', '/reviews/', '/about/', '/contact/', '/resources/', '/privacy-policy/', '/terms-and-conditions/'];
const legal = new Set(['/terms-and-conditions/', '/privacy-policy/', '/sitemap/', '/thank-you/', '/this-page-does-not-exist/']);
const noForm = legal;
const noMapRoutes = new Set(['/reviews/', '/gallery/', '/faq/', ...articles, '/terms-and-conditions/', '/privacy-policy/', '/sitemap/', '/this-page-does-not-exist/']);

const CTA = 'Contact by the quote form, call now, or by WhatsApp.';
const MANUFACTURER = 'Cumbria Spas works in partnership with Kubilų pasaulis, the largest manufacturer in Lithuania of premium, luxury and custom hot tubs.';
const CUSTOMERS = 'Cumbria Spas serves residential and commercial customers of all types, from hotels to spas to leisure centres.';
const banned = [
  [/—/, 'em dash'], [/\bguides?\b/i, '"guide(s)"'], [/free quote/i, '"free quote"'], [/get a quick quote/i, '"Get a Quick Quote"'],
  [/\bdirectory\b/i, '"directory"'], [/chill\s*garden/i, 'Chill Gardens'], [/cheshire/i, 'mosaic manufacturer name'],
  [/\bexperts?\b/i, '"expert"'], [/\bteam of\b|\bour team\b/i, 'staff team'], [/peace of mind/i, '"peace of mind"'], [/\btrusted\b/i, '"trusted"'],
  [/\badvice\b/i, '"advice"'], [/\bcheckout\b|\bbasket\b|add to cart/i, 'online checkout'], [/★|☆|\b\d(\.\d)? out of 5\b|five-star|5-star/i, 'stars/ratings'],
  [/google (review|listing|business)|find us on google/i, 'Google listing/reviews'], [/the only arctic/i, '"the only Arctic dealer"'],
  [/vat (reg(istration)?\.? )?number|company (reg(istration)? )?number/i, 'company/VAT number'], [/lorem|todo|example\.com/i, 'placeholder text'],
  [/a lithuanian manufacturer/i, '"a Lithuanian manufacturer"'], [/arcticspas(cumbria)?\.co|myarcticspa/i, 'supplier website'],
];
const stopAnchor = /^(the|in|our|a|on|to|here|at)\b/i;

const failures = [];
const fail = (route, vp, msg) => failures.push(`${route} [${vp}] ${msg}`);
mkdirSync('shots/qa', { recursive: true });

const browser = await chromium.launch();
const linkTargets = new Set();
for (const [vp, size] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  for (const route of routes) {
    const page = await ctx.newPage();
    const resp = await page.goto(base + route, { waitUntil: 'load', timeout: 60000 });
    const status = resp?.status();
    const is404 = route === '/this-page-does-not-exist/';
    if (is404 ? status !== 404 : status !== 200) fail(route, vp, `status ${status}`);
    if (remote && !noForm.has(route)) {
      await page.waitForSelector('[data-lead-form] input, [data-lead-form] textarea', { timeout: 15000 }).catch(() => fail(route, vp, 'Formlane form did not draw'));
    }
    // Scroll through so every lazy image loads, then fail any image that did not decode.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    const broken = await page.evaluate(() => [...document.images].filter((i) => !i.closest('dialog') && (!i.complete || i.naturalWidth === 0)).map((i) => i.currentSrc || i.src));
    if (broken.length) fail(route, vp, `images not loaded: ${broken.slice(0, 3).join(', ')}`);
    await page.waitForTimeout(400);
    const r = await page.evaluate(({ CTA, MANUFACTURER }) => {
      const vis = (el) => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.visibility !== 'hidden' && s.display !== 'none' && b.width > 0 && b.height > 0; };
      const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p[3] ?? 1 }; };
      const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const bgOf = (el) => {
        for (let e = el; e; e = e.parentElement) {
          const s = getComputedStyle(e);
          if (s.backgroundImage && s.backgroundImage !== 'none') return null; // gradient or photo: skip
          const c = parse(s.backgroundColor);
          if (c && c.a > 0.85) return c;
          if (e.querySelector(':scope > img.hero__slide, :scope > img.cb__bg, :scope > img.ah__bg')) return null;
        }
        return { r: 244, g: 248, b: 251, a: 1 };
      };
      const lowContrast = [];
      for (const el of document.querySelectorAll('h1,h2,h3,p,li,a,span,summary,button,label')) {
        if (!vis(el) || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
        if (el.closest('[data-lead-form]')) continue;
        const s = getComputedStyle(el); const fg = parse(s.color); const bg = bgOf(el);
        if (!fg || !bg) continue;
        const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        const size = parseFloat(s.fontSize); const bold = parseInt(s.fontWeight) >= 700;
        const min = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
        if (ratio < min - 0.05) lowContrast.push(`${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 40)}" ${ratio.toFixed(2)}:1`);
      }
      const text = document.body.innerText;
      return {
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        noAlt: [...document.querySelectorAll('img:not([alt])')].map((i) => i.src).slice(0, 3),
        text,
        html: document.documentElement.outerHTML,
        cta: text.includes(CTA) || document.body.textContent.replace(/\s+/g, ' ').includes(CTA),
        manufacturer: document.body.textContent.replace(/\s+/g, ' ').includes(MANUFACTURER),
        wa: (() => { const a = document.querySelector('a.wa'); return { present: !!a, visible: !!a && vis(a), href: !!a && a.href.startsWith('https://wa.me/447445450908') }; })(),
        footer: [...document.querySelectorAll('footer a')].map((a) => a.getAttribute('href')),
        btnPad: (() => { const b = document.querySelector('.hd__quote'); if (!b) return null; const c = getComputedStyle(b); return parseFloat(c.paddingTop) - parseFloat(c.paddingBottom); })(),
        lfPad: (() => { const b = document.querySelector('#quote .lf-b'); if (!b) return null; const c = getComputedStyle(b); return [c.paddingTop, c.paddingBottom]; })(),
        credit: document.querySelectorAll('[data-footer-credit] a').length,
        formSlot: !!document.querySelector('[data-lead-form]#quote, #quote [data-lead-form]'),
        contactId: !!document.getElementById('contact'),
        map: document.querySelectorAll('iframe[src*="google.com/maps"]').length,
        anchors: [...document.querySelectorAll('a')].map((a) => ({ t: a.textContent.trim().replace(/\s+/g, ' '), h: a.getAttribute('href') })),
        robots: document.querySelector('meta[name=robots]')?.content,
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
        sticky: (() => { const b = document.querySelector('[data-sticky-cta]'); return b ? b.hasAttribute('data-show') : null; })(),
        lowContrast: lowContrast.slice(0, 6),
        brandLogo: [...document.querySelectorAll('img')].some((i) => /logo/i.test(i.src) && !/square\.jpg/.test(i.src)),
      };
    }, { CTA, MANUFACTURER });

    if (r.h1 !== 1) fail(route, vp, `${r.h1} H1s`);
    if (r.overflow > 1) fail(route, vp, `horizontal overflow ${r.overflow}px`);
    if (r.noAlt.length) fail(route, vp, `img without alt: ${r.noAlt.join(', ')}`);
    if (r.lowContrast.length) fail(route, vp, `low contrast: ${r.lowContrast.join(' | ')}`);
    if (r.brandLogo) fail(route, vp, 'a brand logo image is on the page');
    // WhatsApp float: phones only (operator, 5 Nov 2026). In the DOM everywhere, visible on mobile, hidden on desktop.
    if (!r.wa.present || !r.wa.href) fail(route, vp, 'floating WhatsApp button missing or wrong number');
    else if (vp === 'mobile' && !r.wa.visible) fail(route, vp, 'floating WhatsApp button hidden on mobile');
    else if (vp === 'desktop' && r.wa.visible) fail(route, vp, 'floating WhatsApp button visible on desktop');
    const missingFooter = footerMust.filter((h) => !r.footer.includes(h));
    if (missingFooter.length) fail(route, vp, `footer missing links: ${missingFooter.join(', ')}`);
    // Button labels: the optical nudge on the header pill (top padding about 2px more than bottom); the form submit even.
    if (r.btnPad !== null && !(r.btnPad > 1 && r.btnPad < 3)) fail(route, vp, `header button padding not nudged (${r.btnPad}px)`);
    if (r.lfPad) { const d = parseFloat(r.lfPad[0]) - parseFloat(r.lfPad[1]); if (Math.abs(d) > 0.5) fail(route, vp, `Formlane submit padding ${r.lfPad.join(' / ')}`); }
    if (r.credit !== 1) fail(route, vp, `footer credit links: ${r.credit}`);
    if (!r.manufacturer) fail(route, vp, 'approved manufacturer sentence missing');
    if (!is404 && route !== '/thank-you/' && route !== '/sitemap/' && !r.cta) fail(route, vp, 'CTA line missing');
    if (!noForm.has(route) && !r.formSlot) fail(route, vp, 'quote form slot (#quote) missing');
    if (!noForm.has(route) && !r.contactId) fail(route, vp, 'id="contact" missing');
    if (!noMapRoutes.has(route) && r.map !== 1) fail(route, vp, `${r.map} map embeds (want exactly 1)`);
    if ((hubs.some((h) => route === `/${h}/`) || articles.includes(route)) && !r.text.replace(/\s+/g, ' ').includes(CUSTOMERS)) fail(route, vp, 'residential-and-commercial line missing');
    if (!/noindex/.test(r.robots || '') && !process.env.PUBLIC_INDEXABLE) fail(route, vp, `robots meta "${r.robots}" on the preview`);
    if (is404 && r.jsonld.length) fail(route, vp, '404 carries JSON-LD');
    if (!is404) {
      if (r.jsonld.length !== 1) fail(route, vp, `${r.jsonld.length} JSON-LD blocks`);
      else {
        const g = JSON.parse(r.jsonld[0])['@graph'];
        const biz = g.filter((n) => n['@id'] === 'https://cumbriaspas.co.uk/#business');
        if (biz.length !== 1) fail(route, vp, 'business node count != 1');
        if (/"@type":"(Review|AggregateRating)"|"(aggregateRating|review)":/.test(r.jsonld[0])) fail(route, vp, 'review markup present');
      }
    }
    const visible = r.text;
    for (const [re, label] of banned) {
      if (route === '/reviews/' && label === 'stars/ratings') continue;
      const m = visible.match(re);
      if (m) fail(route, vp, `banned: ${label} ("${visible.slice(Math.max(0, m.index - 30), m.index + 30).replace(/\s+/g, ' ')}")`);
    }
    const price = visible.match(/£\s?\d[\d,]*/g) || [];
    if (price.length && route !== '/hot-tub-repair-and-servicing/') fail(route, vp, `price shown: ${price.join(', ')}`);
    if (route === '/hot-tub-repair-and-servicing/' && price.some((p) => !/250/.test(p))) fail(route, vp, `unexpected price ${price}`);
    for (const a of r.anchors) {
      if (a.t && stopAnchor.test(a.t)) fail(route, vp, `anchor starts with a stop word: "${a.t}" -> ${a.h}`);
      if (a.h && a.h.startsWith('/') ) linkTargets.add(a.h.split('#')[0]);
      if (a.h && /^https?:\/\/(www\.)?cumbriaspas\.co\.uk/.test(a.h)) fail(route, vp, `absolute production-domain href ${a.h}`);
    }
    if (vp === 'mobile' && !noForm.has(route) && r.sticky === false) fail(route, vp, 'sticky bar not showing at the top on mobile');
    await page.screenshot({ path: `shots/qa/${vp}${route === '/' ? '_home' : route.replace(/\//g, '_')}.png`, fullPage: true });
    await page.close();
  }
  await ctx.close();
}

// Interactions: FAQ accordion stays open, desktop dropdown opens, mobile menu, Quick Quote anchor lands on the form.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/saunas/', { waitUntil: 'load' });
  const q = page.locator('.fq__item').nth(1);
  await q.locator('summary').click(); await page.waitForTimeout(300); await page.mouse.click(10, 10); await page.waitForTimeout(300);
  if (!(await q.evaluate((d) => d.open))) fail('/saunas/', 'desktop', 'FAQ accordion did not stay open');
  await page.hover('.hd__link--dd'); await page.waitForTimeout(350);
  if (!(await page.locator('.hd__dd-panel').isVisible())) fail('/saunas/', 'desktop', 'Services dropdown did not open');
  const n = await page.locator('.hd__dd-panel a').count();
  if (n !== 11) fail('/saunas/', 'desktop', `dropdown has ${n} links (want 9 hubs + chemicals + parts)`);
  await page.screenshot({ path: 'shots/qa/desktop_dropdown.png' });
  await page.click('.hd__quote'); await page.waitForTimeout(1200);
  const top = await page.locator('#quote').evaluate((e) => e.getBoundingClientRect().top);
  if (top > 900 || top < -200) fail('/saunas/', 'desktop', `Quick Quote anchor landed off the form (top ${top})`);
  await ctx.close();
  const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mp = await m.newPage();
  await mp.goto(base + '/', { waitUntil: 'load' });
  await mp.click('[data-burger]'); await mp.waitForTimeout(300);
  if (!(await mp.locator('.hd__menu').isVisible())) fail('/', 'mobile', 'burger menu did not open');
  await mp.screenshot({ path: 'shots/qa/mobile_menu.png' });
  await m.close();
}

// Internal links resolve.
const ctx = await browser.newContext();
for (const href of linkTargets) {
  const res = await ctx.request.get(base + href, { maxRedirects: 3 });
  if (res.status() !== 200) failures.push(`link ${href} -> ${res.status()}`);
}
await browser.close();
server?.close();

writeFileSync('shots/qa/report.txt', failures.join('\n') + '\n');
console.log(`${routes.length} routes x 2 viewports, ${linkTargets.size} internal link targets: ${failures.length} failure(s)`);
for (const f of failures) console.log(' - ' + f);
process.exit(failures.length ? 1 : 0);
