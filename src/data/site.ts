/**
 * Single source of truth for the Cumbria Spas site: business facts (the
 * plan's NAP, exactly as written), the standard call to action, the nine hubs
 * in the seed's order (which is also the nav order), the standalone pages and
 * the navigation. Plan: plan/SITE-PLAN.md (approved, fingerprint
 * f604099b93602bfa); seed: plan/seed.json.
 *
 * NO reviews (seed.reviews.status "none-yet"): no review band, rating strip,
 * widget or review markup anywhere. A strip of verifiable facts takes that slot.
 * NO Google Business Profile yet: no Google listing link or reviews widget.
 */
export const business = {
  name: 'Cumbria Spas',
  legalName: 'Cumbria Spas Ltd',
  url: 'https://cumbriaspas.co.uk',
  // Shown as text only: the mailbox is not live yet (the operator sets it up).
  email: 'david@cumbriaspas.co.uk',
  phone: '0744 5450908',
  phoneHref: 'tel:+447445450908',
  whatsapp: 'https://wa.me/447445450908',
  founded: 2013,
  street: 'Hight Bridge Lodge',
  town: 'Kirkby In Furness',
  region: 'Cumbria',
  postcode: 'LA17 7TT',
  address: 'Hight Bridge Lodge, Kirkby In Furness, Cumbria, LA17 7TT',
  mapQuery: 'Hight Bridge Lodge, Kirkby In Furness, LA17 7TT',
};

/** The site-wide call to action, word for word (plan). */
export const ctaLine = 'Contact by the quote form, call now, or by WhatsApp.';

/** The approved manufacturer sentence, word for word (operator, 4 Nov 2026). */
export const manufacturerLine =
  'Cumbria Spas works in partnership with Kubilų pasaulis, the largest manufacturer in Lithuania of premium, luxury and custom hot tubs.';

/** Said in passing on every hub page (plan). */
export const customersLine =
  'Cumbria Spas serves residential and commercial customers of all types, from hotels to spas to leisure centres.';

/** Repair and servicing coverage wording (plan). */
export const serviceCoverage = 'Cumbria, North Lancashire and North Yorkshire';

export interface Hub {
  slug: string;
  name: string;
  /** Shorter label for the nav dropdown and footer where the full name is long. */
  short: string;
  /** One-line card description for the services grid. */
  blurb: string;
}

/** The nine hubs, in the seed's services[] order: the four hot tub hubs first. */
export const hubs: Hub[] = [
  { slug: 'wood-fired-hot-tubs', name: 'Wood-Fired Hot Tubs', short: 'Wood-Fired Hot Tubs', blurb: 'Kubilų pasaulis wood-fired tubs with hydrotherapy jets and LED lights, heated by a stainless steel stove in about 2 to 4 hours.' },
  { slug: 'hot-tub-repair-and-servicing', name: 'Hot Tub Repair & Servicing', short: 'Repair & Servicing', blurb: 'Repairs, leaks, full services and plant-room maintenance for residential and commercial hot tubs across Cumbria, North Lancashire and North Yorkshire.' },
  { slug: 'electric-hot-tubs', name: 'Electric Hot Tubs', short: 'Electric Hot Tubs', blurb: 'The same tub shapes as the wood-fired range with electric heating, for owners who want the tub kept at temperature.' },
  { slug: 'hot-tub-installation', name: 'Hot Tub Installation', short: 'Installation', blurb: 'Delivery by 4x4 and trailer, lifting into place by HIAB crane, and in-house installs for commercial and mosaic-tiled spas.' },
  { slug: 'swimming-pools-and-swim-spas', name: 'Swimming Pools & Swim Spas', short: 'Pools & Swim Spas', blurb: 'Swimming pools from a Yorkshire pool manufacturer, GRP mosaic-tiled swim spas and the Arctic Spas saltwater swim spa.' },
  { slug: 'saunas', name: 'Saunas', short: 'Saunas', blurb: 'Outdoor saunas from Kubilų pasaulis with spruce exteriors, alder benches, tinted glass fronts and LED lighting.' },
  { slug: 'arctic-spas-dealer', name: 'Arctic Spas Dealer', short: 'Arctic Spas', blurb: 'Cumbria Spas is an Arctic Spas dealer: sold, supplied, installed with an Arctic engineer, and maintained.' },
  { slug: 'commercial-and-mosaic-tiled-spas', name: 'Commercial & Mosaic-Tiled Spas', short: 'Commercial & Mosaic Spas', blurb: 'GRP mosaic-tiled spas and hydro spas with plant rooms, automated dosing and glass filtration, installed in-house.' },
  { slug: 'trade-and-holiday-park-hot-tubs', name: 'Trade and Holiday Park Hot Tubs', short: 'Trade & Holiday Parks', blurb: 'Trade prices for holiday parks, lodge and glamping sites ordering three or more hot tubs and saunas.' },
];

export const hubBySlug = Object.fromEntries(hubs.map((h) => [h.slug, h])) as Record<string, Hub>;
export const hubHref = (slug: string) => `/${slug}/`;

/** Standalone pages (no town articles). */
export const pages = {
  chemicals: { href: '/chemicals/', name: 'Chemicals' },
  parts: { href: '/parts/', name: 'Parts' },
  reviews: { href: '/reviews/', name: 'Reviews' },
  about: { href: '/about/', name: 'About' },
  contact: { href: '/contact/', name: 'Contact' },
  gallery: { href: '/gallery/', name: 'Gallery' },
  services: { href: '/services/', name: 'Services' },
  sitemap: { href: '/sitemap/', name: 'Sitemap' },
  terms: { href: '/terms-and-conditions/', name: 'Terms and Conditions' },
  privacy: { href: '/privacy-policy/', name: 'Privacy Policy' },
};

/** Header nav. Services opens a dropdown of every hub plus Chemicals and Parts. */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/', dropdown: true },
  { label: 'Chemicals', href: '/chemicals/' },
  { label: 'Parts', href: '/parts/' },
  { label: 'About', href: '/about/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Contact', href: '/contact/' },
];

/** Verifiable facts for the strip under every hero (in place of reviews). */
export const trustFacts = [
  { k: `Since ${business.founded}`, v: 'Selling, installing and servicing hot tubs' },
  { k: 'Try before you buy', v: 'Showroom at Kirkby In Furness' },
  { k: 'Arctic Spas dealer', v: 'Installed with an Arctic engineer' },
  { k: 'Residential and commercial', v: 'Homes, hotels, spas, holiday parks' },
];

export const seo = {
  title: 'Hot Tubs, Wood-Fired Hot Tubs & Saunas in Cumbria | Cumbria Spas',
  description: 'Wood-fired and electric hot tubs, Arctic Spas, saunas, swim spas and hot tub repair and servicing from Cumbria Spas, Kirkby In Furness. Try before you buy. Est. 2013.',
};

/** Footer credit (operator, 20 Oct 2026). No approved trade phrase: the generic one. */
export const credit = { phrase: 'Local business websites', href: 'https://localmapbooster.com/' };

/**
 * LocalBusiness entity (operator, 22 Oct 2026, ENTITY-SAMEAS). No GBP place id,
 * no verified Facebook page and no company number on file: sameAs ships empty
 * and each is an operator question in BUILD-REPORT.md, never guessed.
 */
export const entity = {
  type: 'HomeGoodsStore',
  gbpPlaceId: null as string | null,
  sameAs: [] as string[],
  companyNumber: null as string | null,
};
