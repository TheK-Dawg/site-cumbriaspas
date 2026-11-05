"""List the R2 site-images bucket for a client image pool (SigV4, no SDK)."""
import os, hashlib, hmac, datetime, urllib.request, urllib.parse, sys
import xml.etree.ElementTree as ET

KEYSET = os.environ.get('R2_KEYSET', 'R2')  # R2 | CF
if KEYSET == 'CF':
    ak = os.environ.get('CLOUDFLARE_R2_ACCESS_KEY_ID')
    sk = os.environ.get('CLOUDFLARE_R2_SECRET_ACCESS_KEY')
    ep = os.environ.get('CLOUDFLARE_R2_ENDPOINT')
else:
    ak = os.environ.get('R2_ACCESS_KEY_ID')
    sk = os.environ.get('R2_SECRET_ACCESS_KEY')
    ep = os.environ.get('R2_ENDPOINT') or os.environ.get('S3_API_ENDPOINT')
ep = (ep or '').lower().rstrip('/')
bucket = os.environ.get('R2_BUCKET_OVERRIDE') or os.environ.get('CLOUDFLARE_R2_BUCKET', 'site-images')
print('keyset', KEYSET, 'endpoint', ep, 'bucket', bucket, 'ak', (ak or '')[:6])


def sign(key, msg):
    return hmac.new(key, msg.encode(), hashlib.sha256).digest()


def list_prefix(prefix, delimiter=None):
    host = urllib.parse.urlparse(ep).netloc
    now = datetime.datetime.utcnow()
    amzdate = now.strftime('%Y%m%dT%H%M%SZ')
    ds = now.strftime('%Y%m%d')
    q = {'list-type': '2', 'max-keys': '500', 'prefix': prefix}
    if delimiter:
        q['delimiter'] = delimiter
    qs = urllib.parse.urlencode(sorted(q.items()))
    canon_uri = '/' + bucket
    payload = hashlib.sha256(b'').hexdigest()
    headers = {'host': host, 'x-amz-content-sha256': payload, 'x-amz-date': amzdate}
    ch = ''.join(k + ':' + v + '\n' for k, v in sorted(headers.items()))
    sh = ';'.join(sorted(headers))
    creq = 'GET\n' + canon_uri + '\n' + qs + '\n' + ch + '\n' + sh + '\n' + payload
    scope = ds + '/auto/s3/aws4_request'
    sts = 'AWS4-HMAC-SHA256\n' + amzdate + '\n' + scope + '\n' + hashlib.sha256(creq.encode()).hexdigest()
    k = sign(sign(sign(sign(('AWS4' + sk).encode(), ds), 'auto'), 's3'), 'aws4_request')
    sig = hmac.new(k, sts.encode(), hashlib.sha256).hexdigest()
    auth = 'AWS4-HMAC-SHA256 Credential=' + ak + '/' + scope + ', SignedHeaders=' + sh + ', Signature=' + sig
    req = urllib.request.Request(ep + canon_uri + '?' + qs, headers=dict(headers, Authorization=auth))
    with urllib.request.urlopen(req, timeout=25) as r:
        body = r.read().decode()
    root = ET.fromstring(body)
    ns = {'s': root.tag.split('}')[0].strip('{')}
    keys = [c.find('s:Key', ns).text for c in root.findall('s:Contents', ns)]
    prefixes = [c.find('s:Prefix', ns).text for c in root.findall('s:CommonPrefixes', ns)]
    return keys, prefixes


def run():
    for p in sys.argv[1:] or ['DH-HEATING/', 'dh-heating/', 'dh-heating.co.uk/', 'dependable-heating/']:
        try:
            ks, _ = list_prefix(p)
            print(p, len(ks), ks[:30])
        except Exception as e:
            print(p, 'ERR', str(e)[:300])
    try:
        ks, pre = list_prefix('', '/')
        print('top-level prefixes:', pre[:80])
    except Exception as e:
        print('root ERR', str(e)[:300])


# Try every keyset x bucket combination until one authorises.
for KEYSET in ['R2', 'CF']:
    if KEYSET == 'CF':
        ak = os.environ.get('CLOUDFLARE_R2_ACCESS_KEY_ID'); sk = os.environ.get('CLOUDFLARE_R2_SECRET_ACCESS_KEY'); ep = os.environ.get('CLOUDFLARE_R2_ENDPOINT')
    else:
        ak = os.environ.get('R2_ACCESS_KEY_ID'); sk = os.environ.get('R2_SECRET_ACCESS_KEY'); ep = os.environ.get('R2_ENDPOINT') or os.environ.get('S3_API_ENDPOINT')
    ep = (ep or '').lower().rstrip('/')
    for bucket in ['site-images', os.environ.get('CLOUDFLARE_R2_BUCKET', 'lmb-client-assets')]:
        print('---- keyset', KEYSET, 'endpoint', ep, 'bucket', bucket, 'ak', (ak or '')[:6])
        run()
