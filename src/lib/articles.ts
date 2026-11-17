import { getCollection, type CollectionEntry } from 'astro:content';
import towns from '../data/towns.json';
import { hubs } from '../data/site';

/**
 * Every published article, from both collections, in one shape.
 *  - 'town':  the hand-written "<hub> in <Town>" articles, src/content/articles/<hub>/<town-slug>.md (markdown).
 *  - 'drip':  the SEO engine's articles as the drip worker commits them, src/content/resources/<slug>.md (HTML body).
 * Both render at /resources/<slug>/. When a drip file and a hand-written article claim the same slug, the
 * DRIP FILE WINS and the hand-written one stops rendering. The URL never changes, so nothing that links to
 * it breaks: the engine's newer article replaces the older text at the same address, which is the drip
 * worker's own rule for any file at its path (v8: the newest D1 article owns the URL). Until the engine's
 * file is committed (its publish date), the hand-written article keeps serving there.
 */
export interface ArticleData {
  slug: string;
  title: string;
  description: string;
  /** The hub the article belongs to; null for an engine topical that names no hub. */
  hub: string | null;
  town: string | null;
  townSlug: string | null;
  publishDate: Date;
  updatedDate?: Date;
  /** Hand-written articles only: the engine's articles carry their own takeaways box in the body. */
  takeaways: string[];
  faqs: { q: string; a: string }[];
  images: { src: string; alt: string }[];
  seoTitle?: string;
  lead?: string;
}
export type SiteArticle =
  | { id: string; kind: 'town'; data: ArticleData; entry: CollectionEntry<'articles'> }
  | { id: string; kind: 'drip'; data: ArticleData; entry: CollectionEntry<'resources'> };

const hubSlugsLongestFirst = hubs.map((h) => h.slug).sort((a, b) => b.length - a.length);

/** A drip article's hub: its related_service when that is a hub, else the hub its slug starts with ("<hub>-<town>"). */
export function hubOfSlug(slug: string, relatedService?: string): string | null {
  if (relatedService && hubs.some((h) => h.slug === relatedService)) return relatedService;
  return hubSlugsLongestFirst.find((h) => slug.startsWith(`${h}-`)) ?? null;
}

function townOfSlug(slug: string, hub: string | null) {
  if (!hub) return null;
  const rest = slug.slice(hub.length + 1);
  return (towns as { town: string; slug: string }[]).find((t) => t.slug === rest) ?? null;
}

async function allPublished(): Promise<SiteArticle[]> {
  const now = Date.now();
  const town: SiteArticle[] = (await getCollection('articles', ({ data }) => !data.draft && data.publishDate.getTime() <= now)).map((e) => ({
    id: `articles/${e.id}`,
    kind: 'town',
    entry: e,
    data: {
      slug: `${e.data.hub}-${e.data.townSlug}`, title: e.data.title, description: e.data.description, hub: e.data.hub,
      town: e.data.town, townSlug: e.data.townSlug, publishDate: e.data.publishDate, updatedDate: e.data.updatedDate,
      takeaways: e.data.takeaways, faqs: e.data.faqs, images: e.data.images,
    },
  }));
  const drip: SiteArticle[] = (await getCollection('resources', ({ data }) => data.published.getTime() <= now)).map((e) => {
    const d = e.data;
    const hub = hubOfSlug(d.slug, d.related_service);
    const t = townOfSlug(d.slug, hub);
    return {
      id: `resources/${e.id}`,
      kind: 'drip',
      entry: e,
      data: {
        slug: d.slug, title: d.title, description: d.description, hub, town: t ? t.town : null, townSlug: t ? t.slug : null,
        publishDate: d.published, takeaways: [], faqs: d.faqs.map((f) => ({ q: f.question, a: f.answer })),
        images: d.hero_image ? [{ src: d.hero_image, alt: d.title }] : [], seoTitle: d.seo_title, lead: d.hero_lead,
      },
    };
  });
  const dripSlugs = new Set(drip.map((a) => a.data.slug));
  return [...town.filter((a) => !dripSlugs.has(a.data.slug)), ...drip];
}

/** Published articles (not drafts, publish date reached), oldest first; with a hub, only that hub's. */
export async function publishedArticles(hub?: string): Promise<SiteArticle[]> {
  const all = (await allPublished()).filter((a) => !hub || a.data.hub === hub);
  return all.sort((a, b) => a.data.publishDate.getTime() - b.data.publishDate.getTime());
}

/** An article's URL slug and path: /resources/<slug>/ (operator, 5 Nov 2026: the v4 resources pattern). */
export const articleSlug = (d: { slug: string }) => d.slug;
export const articleHref = (d: { slug: string }) => `/resources/${d.slug}/`;
