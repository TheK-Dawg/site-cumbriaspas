/**
 * Single source of truth for the Cumbria Spas one-page preview: business
 * facts, the five services (his nav, his names), the sauna gallery and the
 * on-page navigation. Every fact and photo comes from cumbriaspas.co.uk.
 *
 * NO reviews: his current site carries none, so no review band and no rating
 * strip. A trust strip of verifiable facts takes that slot instead.
 */
export const business = {
  name: 'Cumbria Spas',
  url: 'https://cumbriaspas.co.uk',
  email: 'david@cumbriaspas.co.uk',
  phone: '07445 450908',
  phoneHref: 'tel:+447445450908',
  whatsapp: 'https://wa.me/447445450908',
  founded: 2013,
  street: 'Hight Bridge Lodge',
  town: 'Kirkby In Furness',
  region: 'Cumbria',
  postcode: 'LA17 7TT',
  address: 'Hight Bridge Lodge, Kirkby In Furness, Cumbria, LA17 7TT',
  mapQuery: 'Hight Bridge Lodge, Kirkby In Furness, LA17 7TT',
  tagline: 'Wood fired spas, Arctic Spas hot tubs, saunas and hot tub servicing',
};

export interface Service {
  name: string;
  anchor: string;
  short: string;
  img: string;
  alt: string;
  pos?: string; // object-position for the card crop
}

export const services: Service[] = [
  { name: 'Wood Fired Spas', anchor: '#wood-fired', short: 'Off grid wood fired spas in various sizes and specifications. No electricity needed, so they suit gardens, holiday homes, lodge parks and glamping sites.', img: '/images/wood-tub.jpg', alt: 'Wood fired hot tub with stainless stove and chimney on a gravel base', pos: 'center 60%' },
  { name: 'Small Spas', anchor: '#quote', short: 'Compact spas with timber cladding and jetted seating for two, for smaller gardens, patios and holiday lets where space is tight.', img: '/images/small-IMG-20260611-WA0004.jpg', alt: 'Looking into a small two-seat spa with jets and a grey shell' },
  { name: 'Arctic Spas', anchor: '#arctic-spas', short: 'Cumbria Spas also sells the amazing Arctic Spa range of hot tubs, with Spa Boy® water care that helps test and adjust the water for you.', img: '/images/arctic-artic-20spa-1-.jpg', alt: 'Arctic Spas hot tub with cedar cabinet on a stone bed by a lake' },
  { name: 'Saunas', anchor: '#saunas', short: 'Outdoor cube saunas with glass fronts, Harvia heaters and wood burning stoves, built for gardens, decks and holiday parks.', img: '/images/saunas-sauna1.jpg', alt: 'Cube outdoor sauna with a glass front and stove chimney', pos: 'center 40%' },
  { name: 'Hot Tub Maintenance & Servicing', anchor: '#servicing', short: 'A full nine-step hot tub service: line flush, drain, clean, filters, refill and chemical balance. Up to three hours on site.', img: '/images/small-IMG-20260611-WA0003.jpg', alt: 'Timber clad spa cabinet in the Cumbria Spas workshop' },
];

export const saunaGallery = [
  { src: '/images/saunas-sauna1.jpg', alt: 'Cube sauna with full glass front and stove chimney' },
  { src: '/images/saunas-IMG-20260529-WA0087.jpg', alt: 'Wood fired hot tub and cube sauna side by side on a timber deck' },
  { src: '/images/saunas-IMG-20260606-WA0014.jpg', alt: 'Blue-grey cube sauna with glass door in the workshop' },
  { src: '/images/saunas-IMG-20260529-WA0061.jpg', alt: 'Inside a sauna: two-tier slatted benches and a Harvia heater' },
  { src: '/images/saunas-IMG-20260529-WA0056.jpg', alt: 'Open glass door into a sauna with lit benches' },
  { src: '/images/saunas-IMG-20260606-WA0010.jpg', alt: 'Harvia electric sauna heater beside the bench' },
  { src: '/images/saunas-IMG-20260528-WA0013.jpg', alt: 'Wood burning sauna stove door set in timber cladding' },
  { src: '/images/saunas-IMG-20260529-WA0062.jpg', alt: 'Looking down into a sauna with benches and a cylinder heater' },
  { src: '/images/saunas-IMG-20260529-WA0069.jpg', alt: 'Harvia heater control panel on the sauna wall' },
];

export const nav = [
  // The LMB standard nav. One-page preview: each item points at the section
  // that stands in for that page (Resources = the hot tub care guide for now).
  { label: 'Services', href: '#services' },
  { label: 'Resources', href: '#servicing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const seo = {
  title: 'Cumbria Spas | Wood Fired Spas, Arctic Spas Hot Tubs & Saunas',
  description: 'Wood fired spas and hot tubs, the Arctic Spas range, saunas and hot tub servicing from Cumbria Spas, Kirkby In Furness, Cumbria. Try before you buy. Est. 2013.',
};
