"""Search Pexels via the website's own JSON endpoint (no API key) and print
candidate ids, sizes, photographer and description. Then build a contact sheet.

usage: python3 pexels-web-search.py "<query>" [pages]
"""
import sys, os, io, json, urllib.request, urllib.parse, concurrent.futures
from PIL import Image, ImageDraw

q = sys.argv[1]
pages = int(sys.argv[2]) if len(sys.argv) > 2 else 1
UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      'secret-key': 'H2jk9uKnhRmL6WPwh89zBezWvr', 'Accept': 'application/json'}
photos = []
for page in range(1, pages + 1):
    url = 'https://www.pexels.com/en-us/api/v3/search/photos?' + urllib.parse.urlencode({'query': q, 'per_page': 24, 'page': page, 'orientation': os.environ.get('ORIENT', 'all')})
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=25) as r:
        d = json.loads(r.read().decode())
    for p in d.get('data', []):
        a = p['attributes']
        photos.append((a['id'], a['width'], a['height'], a['user']['first_name'] + ' ' + (a['user']['last_name'] or ''), (a.get('description') or a.get('title') or '')[:80]))
for p in photos:
    print(p[0], f'{p[1]}x{p[2]}', '|', p[3], '|', p[4])


def fetch(pid):
    url = f'https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=260'
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=15) as r:
            return pid, Image.open(io.BytesIO(r.read())).convert('RGB')
    except Exception:
        return pid, None


out_dir = os.path.join(os.path.dirname(__file__), '_probe')
os.makedirs(out_dir, exist_ok=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as ex:
    results = list(ex.map(fetch, [p[0] for p in photos]))
found = [(pid, im) for pid, im in results if im is not None]
cols, tw, th = 6, 260, 200
rows = (len(found) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, max(1, rows) * (th + 22)), (20, 20, 20))
d = ImageDraw.Draw(sheet)
for i, (pid, im) in enumerate(found):
    im.thumbnail((tw, th))
    x, y = (i % cols) * tw, (i // cols) * (th + 22)
    sheet.paste(im, (x + (tw - im.width) // 2, y))
    d.text((x + 4, y + th + 4), f'{pid}', fill=(255, 220, 120))
name = q.replace(' ', '-')[:40]
path = os.path.join(out_dir, f'q-{name}.jpg')
sheet.save(path, quality=80)
print(path, sheet.size, 'found', len(found))
