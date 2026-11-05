"""Image pipeline: pull Pexels CDN originals by photo id (keyless), crop to the
slot ratio around a focus point, write WebP into public/images, and record the
provenance (photographer, url) in media/manifest.json + media/CREDITS.md.

The R2 client pool (site-images/PLUMBERS247/) is empty, so every slot is stock.

usage: python3 scripts/images.py            # all slots
       python3 scripts/images.py hero-home  # one slot
"""
import os, sys, json, shutil, urllib.request
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'images')
MEDIA = os.path.join(ROOT, 'media')
SIBLING_SRC = '/root/projects/lead-gen-websites/v3-fulltests/dh-v3-test/media/_src'  # already-pulled originals, same ids
os.makedirs(OUT, exist_ok=True)
os.makedirs(MEDIA, exist_ok=True)
UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'secret-key': 'H2jk9uKnhRmL6WPwh89zBezWvr', 'Accept': 'application/json'}

# slot id -> (pexels id, width, height, focus x, focus y, role, alt)
SLOTS = {
    # Home hero + shared
    'hero-home':   (32588556, 900, 1100, 0.5, 0.38, 'hero', 'Plumber in a blue uniform working at a bench in a blue workshop'),
    'og-image':    (32588556, 1200, 630, 0.5, 0.35, 'og', '247 Plumbers Norwich'),
    'cta-band':    (34938441, 1920, 900, 0.5, 0.5, 'cta-band', 'Engineer adjusting valves on a heating manifold'),
    'contact-hero': (6419128, 900, 1100, 0.55, 0.5, 'hero', 'Plumber connecting steel pipework under a sink'),
    # About
    'about-tall':  (33388390, 760, 1000, 0.5, 0.45, 'about', 'Plumber in a blue uniform working over a pump in a workshop'),
    'about-wide':  (29226620, 760, 560, 0.5, 0.5, 'about', 'Gloved hands fitting a radiator pipe connection'),
    # Process (how a job runs)
    'process-1':   (34938431, 800, 600, 0.5, 0.5, 'process', 'Reading a job through on a laptop with the drawings out'),
    'process-2':   (34938429, 800, 600, 0.5, 0.5, 'process', 'Checking the paperwork before the visit'),
    'process-3':   (34938454, 800, 600, 0.5, 0.45, 'process', 'Engineer drilling a wall with ear defenders on'),
    'process-4':   (34938440, 800, 600, 0.5, 0.35, 'process', 'A finished boiler and cylinder installation'),
    # Service cards + page heroes (one image per service)
    'svc-plumber':                      (6419128, 1200, 900, 0.5, 0.5, 'service', 'Plumber connecting steel pipework under a sink'),
    'svc-drain-unblocking':             (5815797, 1200, 900, 0.5, 0.5, 'service', 'Leaves gathered over an outside drain grate'),
    'svc-underfloor-heating':           (7937299, 1200, 900, 0.5, 0.5, 'service', 'Underfloor heating manifold with flow gauges'),
    'svc-boiler-service':               (7859953, 1200, 900, 0.5, 0.5, 'service', 'Gloved hands working on a boiler pump'),
    'svc-247-emergency-plumber':        (35290675, 1200, 900, 0.5, 0.4, 'service', 'Plumber bent over a pump hose during an emergency call'),
    'svc-boiler-installation':          (34938442, 1200, 900, 0.5, 0.5, 'service', 'Engineer working at a newly fitted wall boiler'),
    'svc-gas-safety-certificate':       (13422435, 1200, 900, 0.5, 0.5, 'service', 'Blue flame on a gas hob burner'),
    'svc-bathroom-installation':        (7227624, 1200, 900, 0.5, 0.5, 'service', 'Newly fitted white bathroom with a walk-in shower'),
    'svc-boiler-repair':                (34938446, 1200, 900, 0.5, 0.5, 'service', 'Engineer testing valves on a heating system'),
    'svc-hot-water-cylinder':           (34938440, 1200, 900, 0.5, 0.4, 'service', 'Wall boiler beside a hot water cylinder'),
    'svc-leak-detection':               (34295406, 1200, 900, 0.5, 0.5, 'service', 'Chrome tap dripping onto a marble surface'),
    'svc-central-heating-installation': (12644994, 1200, 900, 0.5, 0.5, 'service', 'Hand adjusting a thermostatic radiator valve'),
    'svc-power-flushing':               (7937300, 1200, 900, 0.5, 0.5, 'service', 'Heating circulation pump and pipework with a gauge'),
    'svc-radiator-repair':              (5691548, 1200, 900, 0.5, 0.5, 'service', 'Fitter positioning a radiator beneath a window'),
    'svc-leaking-pipes':                (4406597, 1200, 900, 0.5, 0.5, 'service', 'Water dripping along the length of a leaking pipe'),
    # Second image for service pages (sticky column / FAQ companion)
    'svc2-plumber':                      (10961064, 1200, 800, 0.5, 0.5, 'service-body', 'Spanner resting in a wet steel sink'),
    'svc2-drain-unblocking':             (5768318, 1200, 800, 0.5, 0.5, 'service-body', 'Square shower drain set in white tiles'),
    'svc2-underfloor-heating':           (5904034, 1200, 800, 0.5, 0.6, 'service-body', 'Bare feet on a warm wooden kitchen floor'),
    'svc2-boiler-service':               (34938449, 1200, 800, 0.5, 0.5, 'service-body', 'Engineer checking pressure gauges on a manifold'),
    'svc2-247-emergency-plumber':        (11658940, 1200, 800, 0.5, 0.5, 'service-body', 'Water meter and stopcock inside a wall box'),
    'svc2-boiler-installation':          (34938441, 1200, 800, 0.5, 0.5, 'service-body', 'Engineer working on new boiler pipework'),
    'svc2-gas-safety-certificate':       (5506046, 1200, 800, 0.5, 0.5, 'service-body', 'Pressure test gauges connected to pipework'),
    'svc2-bathroom-installation':        (38076239, 1200, 800, 0.5, 0.5, 'service-body', 'Fitter boarding out a bathroom before tiling'),
    'svc2-boiler-repair':                (34938450, 1200, 800, 0.5, 0.5, 'service-body', 'Engineer fault-finding on a heating system'),
    'svc2-hot-water-cylinder':           (34938443, 1200, 800, 0.5, 0.5, 'service-body', 'Engineer assembling a pump group on a bench'),
    'svc2-leak-detection':               (16341408, 1200, 800, 0.5, 0.5, 'service-body', 'Outside tap with an isolation valve'),
    'svc2-central-heating-installation': (36344878, 1200, 800, 0.5, 0.5, 'service-body', 'Panel radiator fitted to a painted brick wall'),
    'svc2-power-flushing':               (34938447, 1200, 800, 0.5, 0.5, 'service-body', 'Engineer opening valves on a heating circuit'),
    'svc2-radiator-repair':              (29226620, 1200, 800, 0.5, 0.5, 'service-body', 'Gloved hands fitting a radiator pipe connection'),
    'svc2-leaking-pipes':                (15571823, 1200, 800, 0.5, 0.5, 'service-body', 'Radiator and pipework under a living room window'),
    # Gallery (12 squares)
    'gallery-01': (29226620, 900, 900, 0.5, 0.5, 'gallery', 'Gloved hands fitting a radiator pipe connection'),
    'gallery-02': (34938446, 900, 900, 0.5, 0.5, 'gallery', 'Valves on a heating manifold'),
    'gallery-03': (7937299, 900, 900, 0.5, 0.5, 'gallery', 'Underfloor heating manifold'),
    'gallery-04': (6419128, 900, 900, 0.5, 0.5, 'gallery', 'Pipe joint under a sink'),
    'gallery-05': (34938440, 900, 900, 0.5, 0.35, 'gallery', 'Boiler and cylinder installation'),
    'gallery-06': (5691548, 900, 900, 0.55, 0.5, 'gallery', 'Radiator being fitted'),
    'gallery-07': (7227624, 900, 900, 0.5, 0.5, 'gallery', 'Fitted bathroom'),
    'gallery-08': (7859953, 900, 900, 0.5, 0.5, 'gallery', 'Boiler pump adjustment'),
    'gallery-09': (13726337, 900, 900, 0.5, 0.5, 'gallery', 'Plumbing valve on a black pipeline'),
    'gallery-10': (12644994, 900, 900, 0.5, 0.5, 'gallery', 'Thermostatic radiator valve'),
    'gallery-11': (34938454, 900, 900, 0.5, 0.45, 'gallery', 'Drilling for a fixing'),
    'gallery-12': (7937300, 900, 900, 0.5, 0.5, 'gallery', 'Circulation pump and gauge'),
    # Areas (Norfolk and Suffolk streets)
    'area-norwich':        (6120300, 1200, 800, 0.5, 0.5, 'area', 'Brick terraced houses on a Norwich street'),
    'area-great-yarmouth': (31164926, 1200, 800, 0.5, 0.5, 'area', 'Great Yarmouth seafront with the big wheel in the distance'),
    'area-bowthorpe':      (26609590, 1200, 800, 0.5, 0.5, 'area', 'Aerial view of a suburban housing estate on the Norwich fringe'),
    'area-east-dereham':   (39036432, 1200, 800, 0.5, 0.5, 'area', 'Brick and flint houses on a Norfolk street'),
    'area-beccles':        (37061427, 1200, 800, 0.5, 0.5, 'area', 'Village houses with a church spire behind them'),
    'area-north-walsham':  (39036461, 1200, 800, 0.5, 0.5, 'area', 'Norfolk village road with a church tower'),
    'area-diss':           (2940354, 1200, 800, 0.5, 0.5, 'area', 'Old flint-walled house in Norfolk'),
    'area-attleborough':   (14078227, 1200, 800, 0.5, 0.5, 'area', 'Red-brick houses on a suburban street'),
    'areas-directory':     (3274819, 1200, 800, 0.5, 0.5, 'area', 'Brick homes lining a cobbled Norwich street'),
    'areas-home':          (26609585, 1200, 800, 0.5, 0.5, 'area', 'Aerial view over Norwich with the cathedral spire'),
    # Articles (figures), drawn from the same pool with different crops
    'art-1-a': (34938446, 1200, 800, 0.5, 0.5, 'article', 'Engineer testing valves on a heating system'),
    'art-1-b': (7859953, 1200, 800, 0.5, 0.5, 'article', 'Hands on a boiler pump'),
    'art-1-c': (34938449, 1200, 800, 0.5, 0.5, 'article', 'Pressure gauges on a manifold'),
    'art-1-d': (12644994, 1200, 800, 0.5, 0.5, 'article', 'Thermostatic radiator valve'),
    'art-1-e': (34938440, 1200, 800, 0.5, 0.4, 'article', 'Boiler and cylinder'),
    'art-1-f': (34938441, 1200, 800, 0.5, 0.5, 'article', 'Engineer at the boiler pipework'),
    'art-2-a': (5815797, 1200, 800, 0.5, 0.5, 'article', 'Leaves over an outside drain'),
    'art-2-b': (5768318, 1200, 800, 0.5, 0.5, 'article', 'Shower drain in white tiles'),
    'art-2-c': (10961064, 1200, 800, 0.5, 0.5, 'article', 'Spanner in a wet sink'),
    'art-2-d': (13726337, 1200, 800, 0.5, 0.5, 'article', 'Plumbing valve on a pipeline'),
    'art-2-e': (16341408, 1200, 800, 0.5, 0.5, 'article', 'Outside tap and isolation valve'),
    'art-2-f': (6419128, 1200, 800, 0.5, 0.5, 'article', 'Steel pipework being connected'),
    'art-3-a': (34295406, 1200, 800, 0.5, 0.5, 'article', 'Dripping chrome tap'),
    'art-3-b': (11658940, 1200, 800, 0.5, 0.5, 'article', 'Stopcock and water meter'),
    'art-3-c': (33388390, 1200, 800, 0.5, 0.4, 'article', 'Plumber working over a pump in a workshop'),
    'art-3-d': (15571823, 1200, 800, 0.5, 0.5, 'article', 'Radiator under a window'),
    'art-3-e': (29226620, 1200, 800, 0.5, 0.5, 'article', 'Radiator pipe connection'),
    'art-3-f': (36344878, 1200, 800, 0.5, 0.5, 'article', 'Panel radiator on a brick wall'),
}

_meta_cache = {}


def meta(pid):
    if pid in _meta_cache:
        return _meta_cache[pid]
    path = os.path.join(MEDIA, '_meta.json')
    cache = json.load(open(path)) if os.path.exists(path) else {}
    sib = os.path.join(os.path.dirname(SIBLING_SRC), '_meta.json')
    if str(pid) not in cache and os.path.exists(sib):
        sc = json.load(open(sib))
        if str(pid) in sc:
            cache[str(pid)] = sc[str(pid)]
    if str(pid) in cache:
        _meta_cache[pid] = cache[str(pid)]
        json.dump(cache, open(path, 'w'), indent=1)
        return cache[str(pid)]
    url = f'https://www.pexels.com/en-us/api/v3/photos/{pid}'
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=25) as r:
        d = json.loads(r.read().decode())['data']['attributes']
    m = {'photographer': (d['user']['first_name'] + ' ' + (d['user']['last_name'] or '')).strip(),
         'url': f"https://www.pexels.com/photo/{d.get('slug','photo')}-{pid}/", 'width': d['width'], 'height': d['height'],
         'title': d.get('title') or d.get('description') or ''}
    cache[str(pid)] = m
    json.dump(cache, open(path, 'w'), indent=1)
    _meta_cache[pid] = m
    return m


_src_cache = {}


def source(pid):
    if pid in _src_cache:
        return _src_cache[pid]
    raw = os.path.join(MEDIA, '_src', f'{pid}.jpg')
    os.makedirs(os.path.dirname(raw), exist_ok=True)
    if not os.path.exists(raw):
        sib = os.path.join(SIBLING_SRC, f'{pid}.jpg')
        if os.path.exists(sib):
            shutil.copy(sib, raw)
        else:
            url = f'https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=2400'
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                open(raw, 'wb').write(r.read())
    im = Image.open(raw).convert('RGB')
    _src_cache[pid] = im
    return im


def crop(im, w, h, fx, fy):
    sw, sh = im.size
    target = w / h
    if sw / sh > target:
        cw, ch = int(sh * target), sh
    else:
        cw, ch = sw, int(sw / target)
    cx, cy = int(fx * sw), int(fy * sh)
    x0 = min(max(cx - cw // 2, 0), sw - cw)
    y0 = min(max(cy - ch // 2, 0), sh - ch)
    out = im.crop((x0, y0, x0 + cw, y0 + ch))
    if out.width > w:
        out = out.resize((w, h), Image.LANCZOS)
    return out


def main():
    only = sys.argv[1:]
    manifest = []
    for slot, (pid, w, h, fx, fy, role, alt) in SLOTS.items():
        if only and slot not in only:
            continue
        m = meta(pid)
        dest = os.path.join(OUT, f'{slot}.webp')
        if not os.path.exists(dest) or only:
            im = crop(source(pid), w, h, fx, fy)
            im.save(dest, 'WEBP', quality=80, method=6)
        real = Image.open(dest)
        manifest.append({'id': slot, 'role': role, 'file': f'/images/{slot}.webp', 'width': real.width, 'height': real.height,
                         'bytes': os.path.getsize(dest), 'alt': alt, 'status': 'filled', 'provenance': 'pexels-cdn',
                         'pexelsId': pid, 'photographer': m['photographer'], 'sourceUrl': m['url']})
        print(slot, pid, real.size, os.path.getsize(dest) // 1024, 'KB', m['photographer'])
    if only:
        return
    json.dump({'client': '247plumbersnorwich.uk', 'build': 'v3-fulltest', 'r2': {'bucket': 'site-images', 'prefix': 'PLUMBERS247/', 'objects': 0},
               'slotCount': len(manifest), 'filled': len(manifest), 'clientAssetsFound': 0,
               'note': 'No client photography in R2. Pexels CDN imagery by photo id; see CREDITS.md. Swap for client photos before launch.',
               'slots': manifest}, open(os.path.join(MEDIA, 'manifest.json'), 'w'), indent=2)
    seen = {}
    for s in manifest:
        seen.setdefault(s['pexelsId'], (s['photographer'], s['sourceUrl'], []))[2].append(s['id'])
    lines = ['# Image credits', '', 'All imagery is stock from Pexels (Pexels licence), pulled from the CDN by photo id. Nothing on the site claims these are photographs of the client\'s own work. Credit lives here only, never in the site footer.', '',
             '| Pexels id | Photographer | Source | Used for |', '|---|---|---|---|']
    for pid, (ph, url, slots) in sorted(seen.items()):
        lines.append(f'| {pid} | {ph} | {url} | {", ".join(slots)} |')
    open(os.path.join(MEDIA, 'CREDITS.md'), 'w').write('\n'.join(lines) + '\n')
    print(len(manifest), 'slots;', len(seen), 'distinct photos')


if __name__ == '__main__':
    main()
