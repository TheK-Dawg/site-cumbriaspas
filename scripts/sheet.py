"""Contact sheet of Pexels originals (by id) for a quick visual check.
usage: python3 scripts/sheet.py out.jpg id id id ..."""
import os, sys, urllib.request
from PIL import Image, ImageDraw

out = sys.argv[1]
ids = sys.argv[2:]
UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'}
tw, th = 360, 420
cols = min(6, len(ids))
rows = (len(ids) + cols - 1) // cols
sheet = Image.new('RGB', (tw * cols, (th + 20) * rows), (20, 20, 20))
d = ImageDraw.Draw(sheet)
os.makedirs('media/_src', exist_ok=True)
for i, n in enumerate(ids):
    p = f'media/_src/{n}.jpg'
    if not os.path.exists(p):
        url = f'https://images.pexels.com/photos/{n}/pexels-photo-{n}.jpeg?auto=compress&cs=tinysrgb&w=2400'
        open(p, 'wb').write(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read())
    im = Image.open(p)
    im.thumbnail((tw, th))
    x, y = (i % cols) * tw, (i // cols) * (th + 20)
    sheet.paste(im, (x, y))
    d.text((x + 4, y + th + 4), f'{n} {Image.open(p).size}', fill=(255, 220, 120))
sheet.save(out, quality=80)
print(out)
