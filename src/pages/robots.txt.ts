import type { APIRoute } from 'astro';

// Preview (default): nothing is crawled. At go-live (PUBLIC_INDEXABLE=1) search and
// AI-answer crawlers are allowed and training crawlers disallowed (standard pages law).
export const GET: APIRoute = ({ site }) => {
  const live = import.meta.env.PUBLIC_INDEXABLE === '1';
  const training = ['GPTBot', 'CCBot', 'Google-Extended', 'ClaudeBot', 'Applebot-Extended', 'Bytespider', 'meta-externalagent'];
  const body = live
    ? [...training.map((b) => `User-agent: ${b}\nDisallow: /\n`), 'User-agent: *\nAllow: /\nDisallow: /thank-you/\n', `Sitemap: ${new URL('/sitemap.xml', site).href}\n`].join('\n')
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
