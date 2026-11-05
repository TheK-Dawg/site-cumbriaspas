import type { APIRoute } from 'astro';
import { allRoutes } from '../lib/routes';

export const GET: APIRoute = async ({ site }) => {
  const routes = await allRoutes();
  const urls = routes.map((r) => `  <url><loc>${new URL(r.href, site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
