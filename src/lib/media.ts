/**
 * Image lookup. Every photo the site shows comes from the shared R2 pool,
 * listed in src/data/media.json (written by the media pipeline: see
 * media/R2-MANIFEST.json for provenance). Per-page picks follow the plan's
 * hub-image table, hero first. If media.json is missing the build falls back
 * to the live-site photos already in public/images, so a page never renders
 * without an image.
 */
export interface Img { src: string; full?: string; alt: string; w?: number; h?: number; folder?: string; tags?: string[] }
interface MediaFile { base?: string; hubs?: Record<string, Img[]>; pool?: Img[]; gallery?: Img[] }

const found = import.meta.glob<{ default: MediaFile }>('../data/media.json', { eager: true });
const media: MediaFile = Object.values(found)[0]?.default ?? {};

const local = {
  woodDusk: { src: '/images/new-20top-20image.jpg', alt: 'Wood-fired hot tub lit up at dusk beside a cottage, stove glowing', w: 1239, h: 654 },
  woodGravel: { src: '/images/wood-tub.jpg', alt: 'Wood-fired hot tub with stainless stove and steps on a gravel base', w: 896, h: 1003 },
  woodPatio: { src: '/images/newhome.png', alt: 'Charcoal wood-fired hot tub on a patio with a palm in a planter', w: 896, h: 1003 },
  arctic: { src: '/images/arctic-artic-20spa-1-.jpg', alt: 'Arctic Spas hot tub with a cedar cabinet set into a stone bed by a lake', w: 1239, h: 654 },
  smallSpa: { src: '/images/small-IMG-20260611-WA0004.jpg', alt: 'Looking into a small two-seat spa with jets and a grey shell', w: 900, h: 1200 },
  smallCabinet: { src: '/images/small-IMG-20260611-WA0003.jpg', alt: 'Timber clad spa cabinet in the Cumbria Spas workshop', w: 900, h: 1200 },
  saunaCube: { src: '/images/saunas-sauna1.jpg', alt: 'Cube outdoor sauna with a full glass front and stove chimney', w: 1200, h: 900 },
  saunaInside: { src: '/images/saunas-IMG-20260529-WA0061.jpg', alt: 'Inside a sauna: two-tier slatted benches and a heater', w: 900, h: 1200 },
  tubAndSauna: { src: '/images/saunas-IMG-20260529-WA0087.jpg', alt: 'Wood-fired hot tub and cube sauna side by side on a timber deck', w: 1200, h: 900 },
} satisfies Record<string, Img>;

const fallback: Record<string, Img[]> = {
  home: [local.woodDusk, local.arctic, local.tubAndSauna, local.woodPatio],
  'wood-fired-hot-tubs': [local.woodDusk, local.woodGravel, local.woodPatio, local.tubAndSauna],
  'hot-tub-repair-and-servicing': [local.smallSpa, local.smallCabinet, local.woodGravel],
  'electric-hot-tubs': [local.arctic, local.smallSpa, local.smallCabinet],
  'hot-tub-installation': [local.woodGravel, local.woodPatio, local.tubAndSauna],
  'swimming-pools-and-swim-spas': [local.arctic, local.smallSpa, local.tubAndSauna],
  saunas: [local.saunaCube, local.tubAndSauna, local.saunaInside],
  'arctic-spas-dealer': [local.arctic, local.smallSpa, local.smallCabinet],
  'commercial-and-mosaic-tiled-spas': [local.smallSpa, local.arctic, local.smallCabinet],
  'trade-and-holiday-park-hot-tubs': [local.tubAndSauna, local.woodDusk, local.saunaCube],
  about: [local.tubAndSauna, local.woodGravel],
  chemicals: [local.smallSpa],
  parts: [local.smallCabinet],
  contact: [local.woodDusk],
  reviews: [local.tubAndSauna],
};

/** The picks for a page, hero first. Always at least three, topped up from the page's fallback. */
export function picks(key: string, min = 3): Img[] {
  const chosen = [...(media.hubs?.[key] ?? [])];
  for (const f of [...(fallback[key] ?? []), ...fallback.home]) {
    if (chosen.length >= min) break;
    if (!chosen.some((c) => c.src === f.src)) chosen.push(f);
  }
  return chosen;
}

/** Image i of a page's picks, wrapping round when a page has fewer picks than slots. */
export function pick(key: string, i: number): Img {
  const p = picks(key, Math.max(3, i + 1));
  return p[i % p.length];
}

/** The one shared gallery set (up to 40), the same on every page. */
export function gallery(): Img[] {
  const g = media.gallery?.length ? media.gallery : Object.values(local);
  return g.slice(0, 40);
}

export const hasR2Media = Boolean(media.hubs);
