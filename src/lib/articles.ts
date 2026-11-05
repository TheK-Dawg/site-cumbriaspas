import { getCollection, type CollectionEntry } from 'astro:content';

/** Published town articles: not drafts, publish date reached. */
export async function publishedArticles(hub?: string): Promise<CollectionEntry<'articles'>[]> {
  const now = Date.now();
  const all = await getCollection('articles', ({ data }) => !data.draft && data.publishDate.getTime() <= now && (!hub || data.hub === hub));
  return all.sort((a, b) => a.data.publishDate.getTime() - b.data.publishDate.getTime());
}

/** An article's URL slug and path: /resources/<hub>-<town-slug>/ (operator, 5 Nov 2026: the v4 resources pattern). */
export const articleSlug = (d: { hub: string; townSlug: string }) => `${d.hub}-${d.townSlug}`;
export const articleHref = (d: { hub: string; townSlug: string }) => `/resources/${articleSlug(d)}/`;
