/** Every canonical, indexable page, grouped by type: drives /sitemap/, /sitemap.xml and llms.txt. */
import { hubs, hubHref } from '../data/site';
import { publishedArticles } from './articles';

export interface RouteItem { href: string; name: string; group: string }

export async function allRoutes(): Promise<RouteItem[]> {
  const articles = await publishedArticles();
  return [
    { href: '/', name: 'Home', group: 'Main pages' },
    { href: '/services/', name: 'Services', group: 'Main pages' },
    ...hubs.map((h) => ({ href: hubHref(h.slug), name: h.name, group: 'Services' })),
    { href: '/chemicals/', name: 'Hot Tub Chemicals', group: 'Services' },
    { href: '/parts/', name: 'Hot Tub Parts', group: 'Services' },
    { href: '/about/', name: 'About', group: 'Main pages' },
    { href: '/reviews/', name: 'Reviews', group: 'Main pages' },
    { href: '/contact/', name: 'Contact', group: 'Main pages' },
    { href: '/gallery/', name: 'Gallery', group: 'Main pages' },
    { href: '/sitemap/', name: 'Sitemap', group: 'Main pages' },
    ...articles.map((a) => ({ href: `/${a.data.hub}/${a.data.townSlug}/`, name: a.data.title, group: 'Resources' })),
    { href: '/terms-and-conditions/', name: 'Terms and Conditions', group: 'Legal' },
    { href: '/privacy-policy/', name: 'Privacy Policy', group: 'Legal' },
  ];
}
