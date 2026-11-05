// List every hex / rgb() colour literal in a directory (default src/), file:line value.
// usage: node scripts/colours.mjs [dir]
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
const re = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
for (const f of walk(process.argv[2] || 'src')) {
  readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
    const m = l.match(re);
    if (m) console.log(`${f}:${i + 1} ${m.join('  ')}`);
  });
}
