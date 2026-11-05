// AREAS LAW verification. Serves dist/ with the Worker's asset semantics
// (auto-trailing-slash, 404-page) and checks: /areas/ is 200, every removed
// town route is 404, no href anywhere points at /areas/<town>/, every
// internal href/src in every HTML file resolves to a file in dist/, and the
// areas page's in-content links go to the home page and services pages only.
// usage: node scripts/verify-areas.mjs
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const dist = join(process.cwd(), 'dist');
const removed = ['norwich', 'great-yarmouth', 'bowthorpe', 'east-dereham', 'beccles', 'north-walsham', 'diss', 'attleborough'];

const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = join(dist, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) { res.writeHead(404, { 'content-type': 'text/html' }); res.end(readFileSync(join(dist, '404.html'))); return; }
  res.writeHead(200, { 'content-type': extname(f) === '.html' ? 'text/html' : 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
const status = async (u) => (await fetch(base + u)).status;

const fails = [];
const rows = [];
const s = await status('/areas/');
rows.push(['/areas/', s]); if (s !== 200) fails.push(`/areas/ returned ${s}`);
for (const t of removed) { const c = await status(`/areas/${t}/`); rows.push([`/areas/${t}/`, c]); if (c !== 404) fails.push(`/areas/${t}/ returned ${c}, expected 404`); }
for (const u of ['/', '/services/', '/services/boiler-repair/', '/about/', '/contact/']) { const c = await status(u); rows.push([u, c]); if (c !== 200) fails.push(`${u} returned ${c}`); }
server.close();

const htmls = [];
const walk = (d) => { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) htmls.push(f); } };
walk(dist);
let checked = 0; const broken = []; const townLinks = [];
for (const h of htmls) {
  const html = readFileSync(h, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(u)) continue;
    checked++;
    const path = u.split('#')[0].split('?')[0];
    if (/^\/areas\/[^/]+\/?$/.test(path)) townLinks.push(`${h.slice(dist.length)}: ${u}`);
    let f = join(dist, path);
    if (path.endsWith('/')) f = join(f, 'index.html');
    if (!existsSync(f)) broken.push(`${h.slice(dist.length)}: ${u}`);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    for (const u of m[1].matchAll(/https:\/\/[^/"]+(\/areas\/[^/"]+\/)/g)) townLinks.push(`${h.slice(dist.length)} (schema): ${u[1]}`);
  }
}
if (broken.length) fails.push(`broken internal links: ${broken.join(', ')}`);
if (townLinks.length) fails.push(`links to /areas/<town>/: ${townLinks.join(', ')}`);

const areasHtml = readFileSync(join(dist, 'areas', 'index.html'), 'utf8');
const main = areasHtml.match(/<main[\s\S]*?<\/main>/)?.[0] ?? areasHtml;
const inContent = [...new Set([...main.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).filter((u) => !/^(#|https?:|mailto:)/.test(u)))].sort();
const offPolicy = inContent.filter((u) => !(u === '/' || u === '/services/' || /^\/services\/[^/]+\/$/.test(u)));
if (offPolicy.length) fails.push(`areas page links outside home/services: ${offPolicy.join(', ')}`);

for (const [u, c] of rows) console.log(`${c}  ${u}`);
console.log(`html files: ${htmls.length}; internal href/src checked: ${checked}; broken: ${broken.length}; /areas/<town>/ links: ${townLinks.length}`);
console.log(`areas page in-content links (${inContent.length}): ${inContent.join(' ')}`);
if (fails.length) { console.error('\nFAIL\n' + fails.map((f) => ` - ${f}`).join('\n')); process.exit(1); }
console.log('\nPASS');
