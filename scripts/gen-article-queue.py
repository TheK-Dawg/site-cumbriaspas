"""Build src/data/towns.json and src/data/article-queue.json from plan/seed.json.

The queue is the engine's work list: one article per hub per town, published in
the seed's town order (pinned towns first, then nearest first), each town's
nine hubs together. Generation happens after handoff; this only lists the work.
Run: python3 -I scripts/gen-article-queue.py plan/seed.json src/data
"""
import json, re, sys, unicodedata

seed_path, out_dir = sys.argv[1], sys.argv[2]
seed = json.load(open(seed_path, encoding='utf-8'))

def slugify(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

towns = sorted(seed['towns'], key=lambda t: t['publishOrder'])
town_rows = [{'town': t['town'], 'slug': slugify(t['town']), 'distanceMiles': t['distanceMiles'],
              'population': t.get('population'), 'publishOrder': t['publishOrder'],
              'pinned': bool(t.get('pinned'))} for t in towns]

# Article titles: "<hub> in <Town>"; the repair hub's articles are "Hot Tub Repair and Servicing in <Town>" (plan).
title_stem = {'hot-tub-repair-and-servicing': 'Hot Tub Repair and Servicing'}
hubs = [s for s in seed['services']]
queue = []
n = 0
for t in town_rows:
    for h in hubs:
        n += 1
        stem = title_stem.get(h['hub'], h['service'])
        queue.append({'n': n, 'hub': h['hub'], 'town': t['town'], 'townSlug': t['slug'],
                      'path': f"/{h['hub']}/{t['slug']}/", 'title': f"{stem} in {t['town']}",
                      'primaryPhrase': f"{h['primaryPhrase']} {t['town'].lower()}", 'status': 'queued'})

cap = seed['articleCap']['maxArticles']
assert len(queue) == cap, (len(queue), cap)
json.dump(town_rows, open(f'{out_dir}/towns.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump({'cap': cap, 'hubs': len(hubs), 'towns': len(town_rows), 'items': queue},
          open(f'{out_dir}/article-queue.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(town_rows), 'towns,', len(queue), 'queued articles')
