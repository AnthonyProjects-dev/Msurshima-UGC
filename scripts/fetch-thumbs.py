import json, re, os, sys, urllib.request, concurrent.futures
src = open('js/data.js').read()
ids = re.findall(r'id:\s*"(\d+)"', src)
# run from the site/ folder: python3 scripts/fetch-thumbs.py  (skips covers already present)
os.makedirs('assets/thumbs', exist_ok=True)
UA = {'User-Agent': 'Mozilla/5.0'}
def get(i):
    out = f'assets/thumbs/{i}.jpg'
    if os.path.exists(out) and os.path.getsize(out) > 1000: return (i, 'cached')
    try:
        r = urllib.request.Request(f'https://www.tiktok.com/oembed?url=https://www.tiktok.com/@msurshiman/video/{i}', headers=UA)
        j = json.load(urllib.request.urlopen(r, timeout=20))
        t = j.get('thumbnail_url')
        if not t: return (i, 'no-thumb')
        data = urllib.request.urlopen(urllib.request.Request(t, headers=UA), timeout=30).read()
        if len(data) < 1000: return (i, 'tiny')
        open(out, 'wb').write(data); return (i, 'ok')
    except Exception as e:
        return (i, f'err {e}')
with concurrent.futures.ThreadPoolExecutor(8) as ex:
    res = list(ex.map(get, ids))
from collections import Counter
print(Counter(r[1].split(' ')[0] for r in res))
print([r for r in res if r[1] != 'ok'][:10])
