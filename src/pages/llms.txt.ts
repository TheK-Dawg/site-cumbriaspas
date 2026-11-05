import type { APIRoute } from 'astro';
import { business, hubs, hubHref, manufacturerLine, customersLine, serviceCoverage } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const body = `# ${business.name}

> ${business.name} (${business.legalName}) sells, installs and services hot tubs, spas, saunas, swimming pools and swim spas, with a try-before-you-buy showroom at ${business.address}. Established in ${business.founded}. ${customersLine}

${manufacturerLine} Cumbria Spas is an Arctic Spas dealer. Repairs and servicing cover ${serviceCoverage}. Prices: contact for a quote. Phone and WhatsApp: ${business.phone}.

## Services
${hubs.map((h) => `- [${h.name}](${u(hubHref(h.slug))}): ${h.blurb}`).join('\n')}
- [Hot Tub Chemicals](${u('/chemicals/')})
- [Hot Tub Parts](${u('/parts/')})

## Pages
- [About](${u('/about/')})
- [Contact](${u('/contact/')})
- [Gallery](${u('/gallery/')})
- [Sitemap](${u('/sitemap/')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
