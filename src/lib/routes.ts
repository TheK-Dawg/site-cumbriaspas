/** Every canonical, indexable page, grouped by type: drives /sitemap/, /sitemap.xml and llms.txt. */
import { hubs, hubHref } from '../data/site';
import { publishedArticles, articleHref } from './articles';

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
    { href: '/company-facts/', name: 'Company Facts', group: 'Main pages' },
    { href: '/reviews/', name: 'Reviews', group: 'Main pages' },
    { href: '/contact/', name: 'Contact', group: 'Main pages' },
    { href: '/faq/', name: 'FAQ', group: 'Main pages' },
    { href: '/areas/', name: 'Areas Covered', group: 'Main pages' },
    { href: '/gallery/', name: 'Gallery', group: 'Main pages' },
    { href: '/resources/', name: 'Resources', group: 'Resources' },
    { href: '/sitemap/', name: 'Sitemap', group: 'Main pages' },
    ...articles.map((a) => ({ href: articleHref(a.data), name: a.data.title, group: 'Resources' })),
    { href: '/terms-and-conditions/', name: 'Terms and Conditions', group: 'Legal' },
    { href: '/privacy-policy/', name: 'Privacy Policy', group: 'Legal' },
    { href: '/cookie-policy/', name: 'Cookie Policy', group: 'Legal' },
    { href: '/complaints/', name: 'Complaints Procedure', group: 'Legal' },
    { href: '/accessibility/', name: 'Accessibility Statement', group: 'Legal' },
  ];
}
