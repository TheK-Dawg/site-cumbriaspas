"""Static audit over dist/: word counts, cross-page similarity (5-gram
Jaccard on main copy with shared shells stripped), heading hierarchy, link
laws (one in-copy contact link, no self links, no duplicate anchor+target),
phrase caps, title/meta lengths and uniqueness, noindex, years in articles,
banned credential terms and AI tells."""
import os, re, html, itertools
from collections import Counter

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'dist')
pages = {}
for d, _, fs in os.walk(ROOT):
    for f in fs:
        if f.endswith('.html'):
            p = os.path.join(d, f)
            route = '/' + os.path.relpath(p, ROOT).replace('index.html', '').replace('\\', '/')
            pages[route] = open(p, encoding='utf-8').read()


def text_of(h):
    h = re.sub(r'<script.*?</script>|<style.*?</style>|<svg.*?</svg>', ' ', h, flags=re.S)
    return html.unescape(re.sub(r'<[^>]+>', ' ', h))


def main_of(h):
    m = re.search(r'<main[^>]*>(.*?)</main>', h, re.S)
    return m.group(1) if m else h


def words(t):
    return re.findall(r"[a-zA-Z][a-zA-Z'’-]+", t.lower())


def ngrams(ws, n=5):
    return set(tuple(ws[i:i + n]) for i in range(len(ws) - n + 1))


rows, grams = [], {}
banned = re.compile(r'gas safe(?!ty)|oftec|niceic|napit|elesca|fensa|certass|trustmark|hetas|part p\b|which\? trusted|competent person', re.I)
tells = re.compile(r'\b(delve|tapestry|seamless|elevate|robust|unlock|look no further|rest assured|nestled in the heart|we pride ourselves|in today.s fast-paced)\b', re.I)
superl = re.compile(r'\b(number one|no\.? ?1|the best(?! time| way)|leading|most trusted|award-winning|top-rated)\b', re.I)
for route, h in sorted(pages.items()):
    m = main_of(h)
    m2 = re.sub(r'<section[^>]*data-shared-shell.*?</section>', ' ', m, flags=re.S)
    t = text_of(m2)
    full = text_of(h)
    ws = words(t)
    grams[route] = ngrams(ws)
    title = re.search(r'<title>(.*?)</title>', h, re.S).group(1)
    desc = re.search(r'<meta name="description" content="(.*?)"', h).group(1)
    noindex = 'noindex' in h
    h1 = len(re.findall(r'<h1[\b\s>]', h))
    levels = [int(x) for x in re.findall(r'<h([1-6])[\s>]', main_of(h))]
    skipped = any(b - a > 1 for a, b in zip(levels, levels[1:]))
    contextual = re.findall(r'<a href="([^"]+)"[^>]*data-link="contextual"[^>]*>(.*?)</a>', m, re.S)
    contact = sum(1 for href, _ in contextual if href == '/contact/')
    resources = sum(1 for href, _ in contextual if href == '/resources/')
    selflinks = sum(1 for href, _ in contextual if href == route)
    pairs = Counter((href, re.sub(r'\s+', ' ', text_of(a)).strip().lower()) for href, a in contextual)
    dup = [k for k, v in pairs.items() if v > 1]
    trusted = len(re.findall(r'\btrusted\b', full, re.I))
    expert = len(re.findall(r'\bexperts?\b', full, re.I))
    pom = len(re.findall(r'peace of mind', full, re.I))
    free = len(re.findall(r'free quote', full, re.I))
    cred = banned.findall(full)
    tell = tells.findall(full)
    sup = superl.findall(full)
    emd = full.count('—')
    year = bool(re.search(r'\b(19|20)\d{2}\b', text_of(re.sub(r'<footer.*?</footer>', ' ', h, flags=re.S)))) if route.startswith('/resources/') and route != '/resources/' else False
    rows.append(dict(route=route, words=len(ws), title=title, tlen=len(title), dlen=len(desc), noindex=noindex, h1=h1, skipped=skipped,
                     contextual=len(contextual), contact=contact, resources=resources, self=selflinks, dup=dup, trusted=trusted, expert=expert, pom=pom, free=free, cred=cred, tell=tell, sup=sup, emd=emd, year=year))

print(f"{'route':50} {'words':>5} {'title':>5} {'desc':>4} h1 skip ctx con res self dup emd year")
for r in rows:
    print(f"{r['route']:50} {r['words']:5} {r['tlen']:5} {r['dlen']:4} {r['h1']:2} {str(r['skipped']):5} {r['contextual']:3} {r['contact']:3} {r['resources']:3} {r['self']:4} {len(r['dup']):3} {r['emd']:3} {str(r['year']):5}")

titles = Counter(r['title'] for r in rows)
print('\nduplicate titles:', [t for t, c in titles.items() if c > 1])
print('noindex everywhere:', all(r['noindex'] for r in rows))
print('site totals: trusted', sum(r['trusted'] for r in rows), 'expert', sum(r['expert'] for r in rows), 'peace of mind', sum(r['pom'] for r in rows), 'free quote', sum(r['free'] for r in rows))
print('credential terms:', [(r['route'], r['cred']) for r in rows if r['cred']])
print('AI tells:', [(r['route'], r['tell']) for r in rows if r['tell']])
print('superlatives:', [(r['route'], r['sup']) for r in rows if r['sup']])
print('pages with >1 contact link:', [r['route'] for r in rows if r['contact'] > 1])
print('pages with 0 contact link (non-contact, non-utility):', [r['route'] for r in rows if r['contact'] == 0 and r['route'] not in ('/contact/', '/thank-you/', '/404.html', '/terms/', '/privacy/')])
print('self links:', [r['route'] for r in rows if r['self']])
print('dup anchors:', [(r['route'], r['dup']) for r in rows if r['dup']])
print('long titles (>65):', [(r['route'], r['tlen']) for r in rows if r['tlen'] > 65])
print('desc out of 120-165:', [(r['route'], r['dlen']) for r in rows if not 120 <= r['dlen'] <= 165])

print('\nHighest cross-page 5-gram similarity (Jaccard):')
sims = []
for a, b in itertools.combinations(grams, 2):
    ga, gb = grams[a], grams[b]
    if not ga or not gb:
        continue
    j = len(ga & gb) / len(ga | gb)
    sims.append((j, a, b))
sims.sort(reverse=True)
for j, a, b in sims[:12]:
    print(f'{j:.3f} {a} <> {b}')
