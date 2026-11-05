import { getCollection, type CollectionEntry } from 'astro:content';

/** Published town articles: not drafts, publish date reached. */
export async function publishedArticles(hub?: string): Promise<CollectionEntry<'articles'>[]> {
  const now = Date.now();
  const all = await getCollection('articles', ({ data }) => !data.draft && data.publishDate.getTime() <= now && (!hub || data.hub === hub));
  return all.sort((a, b) => a.data.publishDate.getTime() - b.data.publishDate.getTime());
}
