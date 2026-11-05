/**
 * The nine hub (service) pages' copy. Every fact is from plan/SITE-PLAN.md
 * Section 1 ("Product and service detail") or the seed's hub content notes;
 * nothing is invented. Rules carried on every hub: the residential and
 * commercial line in passing, the standard call to action, no prices (the
 * Repair & Servicing hub's "from £250, depending on your location" is the one
 * operator-approved exception), the approved manufacturer sentence word for
 * word, the mosaic manufacturer never named, no reviews, no staff team.
 *
 * Body strings may carry inline links (rendered with set:html); every anchor
 * is a full meaningful phrase that names its target.
 */
import { manufacturerLine, customersLine, serviceCoverage } from './site';

export interface Point { h: string; p: string }
export interface Row { heading: string; body: string[]; points?: Point[]; note?: string; cta?: string }
export interface Step { title: string; body: string }
export interface Faq { q: string; a: string }
export interface HubContent {
  title: string;
  description: string;
  h1: string;
  lead: string;
  trust: string[];
  intro: { heading: string; body: string[] };
  rows: Row[];
  process: { heading: string; lead: string; facts: string[]; steps: Step[] };
  faqs: Faq[];
  related: string[];
  cta: { heading: string; line: string };
  form: { heading: string; lead: string };
  serviceType: string;
}

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;

export const hubContent: Record<string, HubContent> = {
  'wood-fired-hot-tubs': {
    title: 'Wood-Fired Hot Tubs in Cumbria | Cumbria Spas',
    description: 'Wood-fired hot tubs with hydrotherapy jets and LED lights, heated by the stove in about 2 to 4 hours. The Kubilų pasaulis range, try before you buy at Kirkby In Furness.',
    h1: 'Want a hot tub that is hot in hours, not a day? Wood-fired hot tubs from Cumbria Spas',
    lead: 'A stainless steel stove takes the water to around 38°C in about 2 to 4 hours, and the jets and LED lights run from a standard 13-amp socket. Try one at the showroom before you buy.',
    trust: ['Heats in about 2 to 4 hours', 'Jets and LED lights on a 13-amp socket', 'The Kubilų pasaulis range', 'Try before you buy'],
    intro: {
      heading: 'The wood-fired hot tub most buyers choose',
      body: [
        `${manufacturerLine} David deals with the manufacturer directly, for its quality and for a manufacturer that puts quality ahead of volume.`,
        'Most buyers choose the model with 10 to 12 hydrotherapy jets and a couple of LED lights. The stove does the heating, so a standard 13-amp socket runs only the jets and the lights and no special electrical supply is needed.',
        customersLine,
      ],
    },
    rows: [
      {
        heading: 'Hot in about 2 to 4 hours, at the temperature you choose',
        body: [
          'From cold, a wood-fired tub reaches around 38°C in about 2 to 4 hours. A 2-metre family tub in hard winter takes about two hours, where an electric tub takes 14 to 16 hours to heat from cold.',
          'The stove has an open and closed vent: open to draw heat, shut to slow it. Once the water is near 35°C, stop adding wood or it keeps climbing. Stop adding wood and the temperature does not crash: the water is still warm in the morning. A digital thermometer on the outside shows the exact temperature.',
        ],
        points: [
          { h: 'About 38°C in autumn', p: 'Body temperature is 36.7°C, and most people like about 38°C in autumn.' },
          { h: 'About 40°C in hard winter', p: 'Standard electric tubs are governed to 40°C. With wood, the vent and the wood you add set it.' },
        ],
        cta: 'Ask About Wood-Fired Hot Tubs',
      },
      {
        heading: 'Built and tested before it leaves the factory',
        body: [
          'Kubilų pasaulis makes the acrylic inserts and the stainless steel stoves in-house. Every tub is filled with water and tested before it leaves, with every system checked working and watertight, and each order is inspected by a quality specialist before it ships.',
          'You choose the shape and size, the liner colour, the stove type and the wood type, and where the water and air massage jets go and how strong they are. Filtration is by sand filter and UV lamp.',
        ],
        points: [
          { h: 'Sizes', p: 'A 172 × 202 cm tub, a two-person tub and a 2.2 m model, among others.' },
          { h: 'Jets and lights', p: '10 to 12 hydrotherapy jets and a couple of LED lights on the main model.' },
          { h: 'Controls', p: 'LED, AIR and HYDRO buttons on the tub, and a digital TEMP thermometer.' },
          { h: 'Prices', p: 'Every tub is specified to order, so contact for prices.' },
        ],
        cta: 'Ask for a Wood-Fired Quote',
      },
      {
        heading: 'Off-grid tubs for lodges, glamping sites and gardens',
        body: [
          'A completely off-grid starter model with no electricity at all is also in the range. It is popular with lodge parks and glamping sites where there is no supply.',
          'The small spa has a grey metallic acrylic insert, an external AISI 304 stainless steel heater, a chimney with a burn-protection shield, 8 hydro-massage jets, a 50 mm LED light, a digital thermometer, a drainage valve and overflow fitting, an impregnated C24 structural frame, foam insulation, 90 mm thermowood cladding and a step.',
        ],
        points: [
          { h: 'Renewable wood heat', p: 'Less reliance on electricity to heat the water.' },
          { h: 'Off-grid use', p: 'The starter model needs no electricity at all.' },
          { h: 'The traditional bath', p: 'The traditional bathing experience, with the natural aroma of burning wood.' },
          { h: 'Lower running costs', p: 'Heat the tub with your own wood.' },
        ],
        cta: 'Ask About Off-Grid Hot Tubs',
      },
    ],
    process: {
      heading: 'From the first question to the first soak',
      lead: 'Buyers get the information they need before they commit: photos and videos of the actual tub, its buttons and its lights, on WhatsApp.',
      facts: ['About 2 to 4 hours to heat', '10 to 12 hydrotherapy jets', '13-amp socket for jets and lights'],
      steps: [
        { title: 'Tell us how you will use it', body: 'A garden, a holiday let or a lodge site: say what you have in mind by the quote form, a call or WhatsApp.' },
        { title: 'See the actual tub', body: 'Photos and videos of the product, the buttons and the lights on WhatsApp, or try a tub at the showroom.' },
        { title: 'Choose the specification', body: 'Shape and size, liner colour, stove, wood type, and where the jets go and how strong they are.' },
        { title: 'Delivered and lifted in', body: 'The tub arrives by 4x4 and trailer and goes into place with a HIAB crane.' },
        { title: 'Looked after afterwards', body: 'Servicing and repairs from Cumbria Spas once the tub is in use.' },
      ],
    },
    faqs: [
      { q: 'How long does a wood-fired hot tub take to heat up?', a: 'About 2 to 4 hours to around 38°C. A 2-metre family tub in hard winter takes about two hours. An electric tub takes 14 to 16 hours from cold.' },
      { q: 'Does a wood-fired hot tub need electricity?', a: 'The off-grid starter model needs none. The model most buyers choose has hydrotherapy jets and LED lights, which run from a standard 13-amp socket; the stove does the heating, so no special supply is needed.' },
      { q: 'How do I stop the water getting too hot?', a: 'Use the stove vent: open to draw heat, shut to slow it. Once the water is near 35°C, stop adding wood. The digital thermometer on the outside shows the exact temperature.' },
      { q: 'Will the water be cold by the morning?', a: 'No. Stop adding wood and the temperature does not crash: the water is still warm in the morning.' },
      { q: 'How much does a wood-fired hot tub cost?', a: 'Each tub is specified to order, so contact for prices. Contact by the quote form, call now, or by WhatsApp.' },
      { q: 'Can I try one before I buy?', a: 'Yes. Cumbria Spas has a try-before-you-buy showroom at Kirkby In Furness. Ask when you get in touch.' },
    ],
    related: ['electric-hot-tubs', 'hot-tub-installation', 'saunas', 'trade-and-holiday-park-hot-tubs'],
    cta: { heading: 'Ready to see a wood-fired hot tub for yourself?', line: 'Ask for photos and videos of the tub, or come and try one at the showroom.' },
    form: { heading: 'Ask about wood-fired hot tubs', lead: 'Tell us the size you are thinking of and where it will go, and Cumbria Spas will come back to you with prices.' },
    serviceType: 'Wood-fired hot tub sales',
  },

  'hot-tub-repair-and-servicing': {
    title: 'Hot Tub Repair & Servicing in Cumbria | Cumbria Spas',
    description: 'Hot tub repair, leak repair and full servicing for residential and commercial hot tubs and plant rooms across Cumbria, North Lancashire and North Yorkshire.',
    h1: 'Hot tub leaking, cloudy or not working? Hot tub repair and servicing from Cumbria Spas',
    lead: `Residential and commercial hot tubs repaired and serviced across ${serviceCoverage}, plant rooms included. Servicing from £250, depending on your location.`,
    trust: ['Residential and commercial', 'Plant rooms serviced and repaired', 'Nine-step full service', 'Servicing from £250, depending on your location'],
    intro: {
      heading: 'Why so many hot tubs need attention now',
      body: [
        'Hot tub sales boomed in lockdown and many of those tubs were never serviced. Six or seven years on, a lot of them are leaking and in a bit of a state, and Cumbria Spas has been busier with servicing this year than for about four years.',
        `Service and repair covers ${serviceCoverage}. Cumbria Spas services a customer in Bedale, North Yorkshire, and has serviced and repaired hot tubs at a holiday park in Ballycastle, Northern Ireland. ${customersLine}`,
      ],
    },
    rows: [
      {
        heading: 'Repairs: leaks, pumps, heaters and parts',
        body: [
          'Leaking tubs, failed pumps and heaters, and tubs that have been left too long are the commonest calls. Cumbria Spas sources pumps, heaters and other parts, checks availability, and can hold a part and ship it.',
          `If you would rather fit a part yourself, ${a('/parts/', 'see the hot tub parts page')}. Regular check-ups prevent costly repairs, which is what the Year-Round Maintenance Packages are for: ask about them.`,
        ],
        points: [
          { h: 'Hot tub leak repair', p: 'Tracing and fixing leaks in neglected and older tubs.' },
          { h: 'Pump and heater faults', p: 'Parts sourced, checked for availability and fitted.' },
          { h: 'Year-Round Maintenance Packages', p: 'Regular check-ups through the year. Contact for a quote.' },
          { h: 'Servicing price', p: 'From £250, depending on your location. Repairs: contact for a quote.' },
        ],
        cta: 'Book a Hot Tub Repair',
      },
      {
        heading: 'Chemicals and automated water care',
        body: [
          'Sorting out the chemicals is one of the main pains of owning a hot tub. Standard domestic tubs need manual chemical balancing. Automated pH balancing and chemical dosing come with a commercial spa and its plant room, which can still be supplied to a homeowner.',
          `The domestic route to automated water care is Arctic Spas' Spa Boy saltwater system: medical-grade sensors continuously analyse the water, sanitisation adjusts automatically, and pH alerts reach the control panel, the online portal and the app, with a Boost button. ${a('/chemicals/', 'Hot tub chemicals')} can be ordered in small quantities and shipped to you.`,
        ],
        cta: 'Ask About Water Care',
      },
      {
        heading: 'Plant rooms and filtration for commercial spas',
        body: [
          `Cumbria Spas installs commercial spas and their plant rooms itself, and services and repairs plant rooms. See ${a('/commercial-and-mosaic-tiled-spas/', 'commercial and mosaic-tiled spas')} for the spas themselves.`,
          'Many systems still use sand filters, where the sand is changed about every two years. Cumbria Spas fits glass (pearl glass) filtration, changed about every ten years, with better water quality and roughly half the backflushing, saving time and water.',
        ],
        points: [
          { h: 'Plant-room servicing', p: 'Maintenance and repair of commercial spa plant rooms.' },
          { h: 'Glass filtration', p: 'Changed about every ten years, against about two for sand.' },
        ],
        cta: 'Ask About Plant-Room Servicing',
      },
    ],
    process: {
      heading: 'What a full hot tub service involves',
      lead: 'The nine-step service takes up to three hours and leaves the tub clean, refilled and balanced. Servicing from £250, depending on your location.',
      facts: ['Nine steps', 'Up to three hours', 'Jets flushed for 45 minutes'],
      steps: [
        { title: 'The old water stays in', body: 'The service starts with the tub still full.' },
        { title: 'Flush and run the jets', body: 'A hot tub flush is added and the jets run on full power for 45 minutes to clean the pipes and bacteria from the water lines.' },
        { title: 'Drain and vacuum the footwell', body: 'The tub is emptied and the footwell vacuumed.' },
        { title: 'Rinse the seats', body: 'Clean water is sprayed over the seats and vacuumed again.' },
        { title: 'Clear every jet line', body: 'Every jet is vacuumed to clear the old water from the lines.' },
        { title: 'Clean the shell, lid and steps', body: 'The shell, the lid and the steps are cleaned.' },
        { title: 'Inspect and clean the filters', body: 'Filters are inspected and cleaned, with new filters charged for if the old ones are not fit to go back.' },
        { title: 'Refill', body: 'The tub is refilled with fresh water.' },
        { title: 'Balance the chemicals', body: 'The water is chemically balanced, ready to use.' },
      ],
    },
    faqs: [
      { q: 'Why is my hot tub leaking?', a: 'Many tubs bought during the lockdown boom were never serviced, and six or seven years on a lot of them are leaking. Contact by the quote form, call now, or by WhatsApp to have yours looked at.' },
      { q: 'What does a hot tub service involve?', a: 'Nine steps: flush the lines with the jets on full power for 45 minutes, drain, vacuum the footwell and every jet line, clean the shell, lid and steps, inspect and clean the filters, refill and balance the chemicals. It takes up to three hours.' },
      { q: 'How much does a hot tub service cost?', a: 'Servicing is from £250, depending on your location. Repairs are priced on the job: contact for a quote.' },
      { q: 'Do you service commercial hot tubs and plant rooms?', a: 'Yes. Cumbria Spas services and repairs commercial spas and their plant rooms, and installs them too.' },
      { q: 'Which areas do you cover for repairs and servicing?', a: `${serviceCoverage}. Cumbria Spas also services a customer in Bedale and has serviced and repaired hot tubs at a holiday park in Ballycastle, Northern Ireland.` },
      { q: 'Can my hot tub balance its own chemicals?', a: 'Standard domestic tubs need manual chemical balancing. Automated dosing comes with a commercial spa and plant room, and the domestic route is Arctic Spas\' Spa Boy saltwater system.' },
    ],
    related: ['hot-tub-installation', 'arctic-spas-dealer', 'commercial-and-mosaic-tiled-spas', 'trade-and-holiday-park-hot-tubs'],
    cta: { heading: 'Hot tub not right? Get it looked at', line: 'Tell us what it is doing and where it is, and Cumbria Spas will come back to you.' },
    form: { heading: 'Book a hot tub repair or service', lead: 'Tell us the make if you know it, what is wrong and your postcode. Servicing from £250, depending on your location.' },
    serviceType: 'Hot tub repair and servicing',
  },

  'electric-hot-tubs': {
    title: 'Electric Hot Tubs in Cumbria | Cumbria Spas',
    description: 'Electric hot tubs from Kubilų pasaulis in the same shapes as the wood-fired range, and the Arctic Spas range. Contact for prices. Showroom at Kirkby In Furness.',
    h1: 'Want a hot tub without lighting a stove? Electric hot tubs from Cumbria Spas',
    lead: 'The same tub shapes as the Kubilų pasaulis wood-fired range, heated electrically, and the Arctic Spas range from an Arctic Spas dealer.',
    trust: ['Same shapes as the wood-fired range', 'Arctic Spas dealer', 'Try before you buy', 'Contact for prices'],
    intro: {
      heading: 'The same tubs, a different way to heat them',
      body: [
        `${manufacturerLine} The same tub shapes come in electric and wood-fired versions.`,
        'The choice is convenience against heat-up time. An electric tub takes 14 to 16 hours to heat from cold and standard electric tubs are governed to about 40°C. A wood-fired tub heats in about 2 to 4 hours, with the temperature set by the stove.',
        customersLine,
      ],
    },
    rows: [
      {
        heading: 'Electric heating, no stove to light',
        body: [
          'An electric tub heats itself, so there is no wood to bring in and no stove to manage. Plan for the heat-up: 14 to 16 hours from cold.',
          `If heat-up time matters more than convenience, compare ${a('/wood-fired-hot-tubs/', 'wood-fired hot tubs')}, which reach around 38°C in about 2 to 4 hours.`,
        ],
        points: [
          { h: '14 to 16 hours from cold', p: 'The time an electric tub takes to heat from cold.' },
          { h: 'Governed to about 40°C', p: 'The usual top temperature on a standard electric tub.' },
        ],
        cta: 'Ask About Electric Hot Tubs',
      },
      {
        heading: 'Arctic Spas, from an Arctic Spas dealer',
        body: [
          `Cumbria Spas is an Arctic Spas dealer, so the Arctic range of electric hot tubs is available too, each one installed with one of Arctic's own engineers. See ${a('/arctic-spas-dealer/', 'Arctic Spas from Cumbria Spas')} for the range and Spa Boy water care.`,
        ],
        cta: 'Ask About Arctic Spas',
      },
    ],
    process: {
      heading: 'Choosing an electric hot tub',
      lead: 'Prices depend on the tub and its specification, so every quote is for the tub you choose.',
      facts: ['Kubilų pasaulis and Arctic Spas', 'Contact for prices'],
      steps: [
        { title: 'Tell us what you need', body: 'How many people, where it will go and how you will use it, by the quote form, a call or WhatsApp.' },
        { title: 'See the tub', body: 'Photos and videos on WhatsApp, or try a tub at the showroom at Kirkby In Furness.' },
        { title: 'Choose and order', body: 'Pick the tub and the specification; contact for prices.' },
        { title: 'Installation', body: 'Delivered and installed by Cumbria Spas; Arctic Spas with an Arctic engineer.' },
        { title: 'Servicing', body: 'Repairs and servicing from Cumbria Spas once it is in.' },
      ],
    },
    faqs: [
      { q: 'How long does an electric hot tub take to heat up?', a: '14 to 16 hours from cold. A wood-fired tub takes about 2 to 4 hours.' },
      { q: 'How hot does an electric hot tub get?', a: 'Standard electric tubs are governed to about 40°C.' },
      { q: 'Should I choose electric or wood-fired?', a: 'Electric is the convenient choice: no stove to light. Wood-fired heats far faster, in about 2 to 4 hours, and runs on your own wood. The same tub shapes come in both versions.' },
      { q: 'How much does an electric hot tub cost?', a: 'It depends on the tub and its specification: contact for prices.' },
      { q: 'Do you install electric hot tubs?', a: 'Yes. Cumbria Spas installs the tubs it sells, and every Arctic Spa is installed with one of Arctic\'s own engineers.' },
    ],
    related: ['wood-fired-hot-tubs', 'arctic-spas-dealer', 'hot-tub-installation', 'hot-tub-repair-and-servicing'],
    cta: { heading: 'Find the electric hot tub that suits you', line: 'Ask for photos and videos, or try a tub at the showroom before you buy.' },
    form: { heading: 'Ask about electric hot tubs', lead: 'Tell us how many people and where it will go, and Cumbria Spas will come back to you with prices.' },
    serviceType: 'Electric hot tub sales',
  },

  'hot-tub-installation': {
    title: 'Hot Tub Installation in Cumbria | Cumbria Spas',
    description: 'Hot tub installation by Cumbria Spas: wood-fired tubs lifted in by HIAB crane, Arctic Spas installed with an Arctic engineer, commercial spas and plant rooms installed in-house.',
    h1: 'Not sure how a hot tub gets into your garden? Hot tub installation by Cumbria Spas',
    lead: 'Installs are most of what Cumbria Spas does: wood-fired tubs delivered by 4x4 and trailer and lifted in by HIAB crane, Arctic Spas installed with an Arctic engineer, and commercial spas installed in-house.',
    trust: ['Lifted into place by HIAB crane', 'Arctic Spas installed with an Arctic engineer', 'Plant rooms installed in-house', 'Residential and commercial'],
    intro: {
      heading: 'Installs are most of the business',
      body: [
        `Cumbria Spas installs the hot tubs, spas and saunas it sells, at homes, holiday lets, hotels, spas and leisure centres. ${customersLine}`,
        `Trade orders to holiday parks are supplied without installation: see ${a('/trade-and-holiday-park-hot-tubs/', 'trade and holiday park hot tubs')}.`,
      ],
    },
    rows: [
      {
        heading: 'Wood-fired tubs: 4x4, trailer and HIAB crane',
        body: [
          'A wood-fired tub arrives by 4x4 and trailer and is lifted into place with a HIAB crane, the lorry-mounted crane that sets the tub down where it is going to stay.',
          `The jets-and-lights model needs only a standard 13-amp socket for the jets and the lights, as the stove does the heating. See ${a('/wood-fired-hot-tubs/', 'wood-fired hot tubs')} for the range.`,
        ],
        cta: 'Ask About an Installation',
      },
      {
        heading: 'Arctic Spas: installed with an Arctic engineer',
        body: [
          `Each Arctic Spa is installed by David with one of Arctic's own engineers. Cumbria Spas is an ${a('/arctic-spas-dealer/', 'Arctic Spas dealer')}, able to sell, install, supply and maintain them.`,
        ],
        cta: 'Ask About Arctic Spas',
      },
      {
        heading: 'Commercial and mosaic-tiled spas: plant room included',
        body: [
          'Commercial and mosaic-tiled spas are installed in-house, plant room included. Most of the mosaic range runs from a plant room; some domestic models have the plant built in.',
          'A finished GRP spa installs in a fraction of the time of a concrete one, sometimes in a single day, where a concrete spa with rendering, tiling and plumbing takes 12 to 14 weeks on site depending on conditions. For access-restricted sites, split spas come in fully tiled and plumbed sections that are bolted and fibreglassed together on site.',
        ],
        points: [
          { h: 'Sometimes a single day', p: 'A finished GRP spa against 12 to 14 weeks on site for concrete.' },
          { h: 'Split spas', p: 'Tiled, plumbed sections for sites with restricted access.' },
        ],
        cta: 'Ask About a Commercial Install',
      },
    ],
    process: {
      heading: 'How an installation runs',
      lead: 'Every install starts with what is going in and where it is going. Contact for a quote.',
      facts: ['4x4, trailer and HIAB crane', 'Plant rooms in-house'],
      steps: [
        { title: 'Tell us what and where', body: 'The tub or spa you want and the site it is going to, by the quote form, a call or WhatsApp.' },
        { title: 'Agree the tub and the route in', body: 'Size, specification and how it will reach its spot.' },
        { title: 'Delivery', body: 'By 4x4 and trailer for wood-fired tubs, lifted into place with the HIAB crane.' },
        { title: 'Installation', body: 'Arctic Spas with an Arctic engineer; commercial and mosaic spas with the plant room, in-house.' },
        { title: 'Aftercare', body: 'Repairs and servicing from Cumbria Spas once it is in use.' },
      ],
    },
    faqs: [
      { q: 'How is a hot tub delivered and put in place?', a: 'A wood-fired tub arrives by 4x4 and trailer and is lifted into place with a HIAB crane.' },
      { q: 'Does a wood-fired hot tub need a special electrical supply?', a: 'No. The stove does the heating, so the jets-and-lights model runs from a standard 13-amp socket, and the off-grid model needs no electricity at all.' },
      { q: 'Who installs Arctic Spas?', a: 'Each Arctic Spa is installed by David with one of Arctic\'s own engineers.' },
      { q: 'Do you install commercial spas and plant rooms?', a: 'Yes. Commercial and mosaic-tiled spas are installed in-house, plant room included.' },
      { q: 'Are trade orders installed?', a: 'No. Trade orders to holiday parks are delivered to the buyer\'s site without installation, and the buyer arranges lifting off.' },
      { q: 'How much does hot tub installation cost?', a: 'It depends on the tub and the site: contact for a quote.' },
    ],
    related: ['wood-fired-hot-tubs', 'arctic-spas-dealer', 'commercial-and-mosaic-tiled-spas', 'hot-tub-repair-and-servicing'],
    cta: { heading: 'Planning where your hot tub will go?', line: 'Tell us about the site and the tub, and Cumbria Spas will come back to you.' },
    form: { heading: 'Ask about hot tub installation', lead: 'Tell us what you are installing and where, and Cumbria Spas will come back to you with a quote.' },
    serviceType: 'Hot tub installation',
  },

  'swimming-pools-and-swim-spas': {
    title: 'Swimming Pools & Swim Spas in Cumbria | Cumbria Spas',
    description: 'Swimming pools from a Yorkshire pool manufacturer, GRP mosaic-tiled swim spas and the Arctic Spas saltwater swim spa, from Cumbria Spas. Contact for prices.',
    h1: 'Thinking about a pool or a swim spa? Swimming pools and swim spas from Cumbria Spas',
    lead: 'Swimming pools from a Yorkshire pool manufacturer that Cumbria Spas is a dealer for, GRP mosaic-tiled swim spas, and the Arctic Spas saltwater swim spa.',
    trust: ['Pools supplied across the country', 'GRP mosaic-tiled swim spas', 'Arctic Spas saltwater swim spa', 'Residential and commercial'],
    intro: {
      heading: 'Two ways to swim at home, one conversation',
      body: [
        'A swimming pool and a swim spa are both big-water purchases, and many buyers weigh one against the other. Cumbria Spas supplies both, so the conversation can start with how you want to use the water and the space you have.',
        `Most people take a long time over a swim spa, often close to a year. Ask questions, look at the drawings, and decide when you are ready. ${customersLine}`,
      ],
    },
    rows: [
      {
        heading: 'Swimming pools, supplied across the country',
        body: [
          'Cumbria Spas is a dealer for a Yorkshire swimming pool manufacturer, and David works on the installation. Pools can go anywhere in the country.',
          'Small pools are part of what Cumbria Spas does, alongside mosaic-tiled and bespoke pools. Contact for prices.',
        ],
        cta: 'Ask About a Swimming Pool',
      },
      {
        heading: 'GRP mosaic-tiled swim spas',
        body: [
          'The mosaic range includes seven swim spa moulds, among them a 6.0 m swim spa and a 7 m × 3 m swim spa. Each is built and water-tested like the mosaic spas: a marine-grade gel coat, a GRP shell of about 10 to 12 mm on a stainless steel box-section frame, and a 24-hour water test, signed off only with no leaks.',
          `Standard 25 mm mosaics are included, with hundreds of alternatives and a bespoke tiling service. See ${a('/commercial-and-mosaic-tiled-spas/', 'commercial and mosaic-tiled spas')} for the build in detail.`,
        ],
        points: [
          { h: '6.0 m and 7 m × 3 m', p: 'Two of the seven swim spa designs in the range.' },
          { h: 'Water-tested for 24 hours', p: 'Signed off only when there are no leaks.' },
        ],
        cta: 'Ask About a Swim Spa',
      },
      {
        heading: 'The Arctic Spas saltwater swim spa',
        body: [
          `Arctic Spas make a saltwater swim spa too, sold and installed by Cumbria Spas as an Arctic Spas dealer. See ${a('/arctic-spas-dealer/', 'Arctic Spas from Cumbria Spas')}.`,
        ],
        cta: 'Ask About the Arctic Swim Spa',
      },
    ],
    process: {
      heading: 'How a pool or swim spa comes together',
      lead: 'A long decision deserves good information: drawings, specifications and straight answers, at your pace.',
      facts: ['6 to 10 weeks on most mosaic-range orders', 'Contact for prices'],
      steps: [
        { title: 'Talk it through', body: 'How you want to swim, the space and whether it is indoors or out.' },
        { title: 'Drawings and specification', body: 'Plan and section drawings for the mosaic swim spas, and the specification for the pool.' },
        { title: 'Order', body: 'Lead times are 6 to 10 weeks on most mosaic-range orders.' },
        { title: 'Delivery and installation', body: 'Delivered and installed, with David working on pool installations.' },
        { title: 'Water care and servicing', body: 'Ongoing servicing and plant-room maintenance from Cumbria Spas.' },
      ],
    },
    faqs: [
      { q: 'Should I choose a swimming pool or a swim spa?', a: 'A pool gives you open water to swim in; a swim spa fits swimming into a smaller footprint. Many buyers look at both before deciding, and Cumbria Spas supplies both.' },
      { q: 'How long does a mosaic swim spa take?', a: 'Lead times are 6 to 10 weeks on most mosaic-range orders.' },
      { q: 'Can you supply a pool outside Cumbria?', a: 'Yes. Pools can go anywhere in the country.' },
      { q: 'What sizes do the mosaic swim spas come in?', a: 'The range has seven swim spa designs, including a 6.0 m model and a 7 m × 3 m model.' },
      { q: 'How much does a pool or swim spa cost?', a: 'It depends on the size and specification: contact for prices.' },
    ],
    related: ['commercial-and-mosaic-tiled-spas', 'arctic-spas-dealer', 'hot-tub-installation', 'hot-tub-repair-and-servicing'],
    cta: { heading: 'Weighing up a pool against a swim spa?', line: 'Ask for drawings and specifications, and take the time you need.' },
    form: { heading: 'Ask about pools and swim spas', lead: 'Tell us what you have in mind and where it would go, and Cumbria Spas will come back to you.' },
    serviceType: 'Swimming pool and swim spa supply',
  },

  saunas: {
    title: 'Outdoor Saunas in Cumbria | Cumbria Spas',
    description: 'Outdoor saunas from Kubilų pasaulis: spruce exterior, alder benches, tinted 8 mm glass, Harvia chimney and LED lighting. Contact for prices.',
    h1: 'Want a proper sauna at home or on site? Outdoor saunas from Cumbria Spas',
    lead: 'Outdoor saunas from Kubilų pasaulis, the maker of the wood-fired hot tub range: spruce outside, alder benches inside, tinted glass fronts and LED lighting.',
    trust: ['Spruce exterior, alder benches', 'Tempered 8 mm tinted glass', 'LED lights inside and out', 'Count towards trade orders'],
    intro: {
      heading: 'Saunas from the maker of the wood-fired range',
      body: [
        `${manufacturerLine} The same manufacturer makes the saunas.`,
        `${customersLine} Saunas count towards the three-unit minimum for trade orders, so a holiday park can mix hot tubs and saunas.`,
      ],
    },
    rows: [
      {
        heading: 'The large sauna, specified',
        body: [
          'A spruce exterior (45 × 90), oiled outside, with alder benches inside. The heater is a Cozy 12 or TW 12 with BlmSch V2 certification. Tempered 8 mm tinted glass front panels and an 8 mm door, a Harvia chimney and a black bitumen shingle roof.',
        ],
        points: [
          { h: 'Lighting', p: 'LED lights inside, under the benches, and outside.' },
          { h: 'Accessory set', p: 'Thermometers, a sand timer, a ladle with bucket and sauna stones.' },
          { h: 'Glass', p: 'Tempered 8 mm tinted glass front panels and doors.' },
          { h: 'Roof', p: 'Black bitumen shingle.' },
        ],
        cta: 'Ask About Saunas',
      },
      {
        heading: 'A smaller sauna, 220 × 220 cm',
        body: [
          'A smaller sauna measures 220 × 220 cm, for a garden or deck where space is tighter. Ask about the sizes available and Cumbria Spas will send photos and videos on WhatsApp.',
        ],
        cta: 'Ask About a Smaller Sauna',
      },
      {
        heading: 'A sauna and a hot tub together',
        body: [
          `A sauna sits well beside a hot tub on a deck. See ${a('/wood-fired-hot-tubs/', 'wood-fired hot tubs')} from the same manufacturer, and ${a('/trade-and-holiday-park-hot-tubs/', 'trade prices for holiday parks')} where hot tubs and saunas can be mixed in one order.`,
        ],
        cta: 'Ask About a Sauna and Hot Tub',
      },
    ],
    process: {
      heading: 'From choosing to using your sauna',
      lead: 'Each sauna is quoted for the model you choose: contact for prices.',
      facts: ['Kubilų pasaulis', 'Contact for prices'],
      steps: [
        { title: 'Tell us the space', body: 'Garden, deck or site, by the quote form, a call or WhatsApp.' },
        { title: 'See the sauna', body: 'Photos and videos on WhatsApp of the sauna, the benches and the heater.' },
        { title: 'Choose the model', body: 'The large sauna or the 220 × 220 cm model.' },
        { title: 'Delivered and sited', body: 'Delivered to you and set in place.' },
        { title: 'Enjoy it', body: 'The accessory set comes with the large sauna.' },
      ],
    },
    faqs: [
      { q: 'What heater does the sauna use?', a: 'The large sauna takes a Cozy 12 or TW 12 heater with BlmSch V2 certification, with a Harvia chimney.' },
      { q: 'What sizes are there?', a: 'The large sauna and a smaller 220 × 220 cm model. Ask about the sizes available.' },
      { q: 'Can saunas be part of a trade order?', a: 'Yes. Saunas count towards the three-unit minimum, so two hot tubs and a sauna qualifies.' },
      { q: 'How much does an outdoor sauna cost?', a: 'It depends on the model: contact for prices.' },
    ],
    related: ['wood-fired-hot-tubs', 'trade-and-holiday-park-hot-tubs', 'hot-tub-installation', 'electric-hot-tubs'],
    cta: { heading: 'Picture a sauna in your garden?', line: 'Ask for photos and videos of the saunas, and the sizes available.' },
    form: { heading: 'Ask about outdoor saunas', lead: 'Tell us where the sauna would go, and Cumbria Spas will come back to you with prices.' },
    serviceType: 'Outdoor sauna sales',
  },

  'arctic-spas-dealer': {
    title: 'Arctic Spas Dealer in Cumbria | Cumbria Spas',
    description: 'Cumbria Spas is an Arctic Spas dealer: Arctic Spas sold, supplied, installed with an Arctic engineer and maintained. Spa Boy saltwater water care. Showroom at Kirkby In Furness.',
    h1: 'Looking for an Arctic Spas dealer? Cumbria Spas sells, installs and maintains them',
    lead: 'Cumbria Spas is an Arctic Spas dealer, trading as Arctic Spas Cumbria, and every Arctic Spa is installed by David with one of Arctic\'s own engineers.',
    trust: ['Arctic Spas dealer', 'Installed with an Arctic engineer', 'Spa Boy saltwater water care', 'Sold, supplied and maintained'],
    intro: {
      heading: 'High-end hot tubs, installed properly',
      body: [
        'Arctic Spas are a high-end hot tub, a good product with very few issues. Cumbria Spas is a dealer able to sell, install, supply and maintain them, with the Arctic Spas Cumbria hot tub showroom at Kirkby In Furness.',
        customersLine,
      ],
    },
    rows: [
      {
        heading: 'Installed with one of Arctic\'s own engineers',
        body: [
          `Each Arctic Spa is installed by David with one of Arctic's own engineers. See ${a('/hot-tub-installation/', 'hot tub installation')} for how installs run.`,
        ],
        cta: 'Ask About Arctic Spas',
      },
      {
        heading: 'Spa Boy: automated saltwater water care',
        body: [
          'Spa Boy is Arctic Spas\' saltwater system and the domestic route to automated water care. Medical-grade sensors continuously analyse the water, sanitisation adjusts automatically, and pH alerts reach the control panel, the online portal and the app. A Boost button is there when the tub has had heavy use.',
          `Standard domestic tubs need manual chemical balancing, which is why Spa Boy matters. See ${a('/hot-tub-repair-and-servicing/', 'hot tub repair and servicing')} for water care on other tubs.`,
        ],
        points: [
          { h: 'Continuous sensing', p: 'Medical-grade sensors analyse the water all the time.' },
          { h: 'Alerts', p: 'pH alerts on the control panel, the online portal and the app.' },
        ],
        cta: 'Ask About Spa Boy',
      },
      {
        heading: 'The Arctic saltwater swim spa',
        body: [
          `Arctic also make a saltwater swim spa. See ${a('/swimming-pools-and-swim-spas/', 'swimming pools and swim spas')} for it and the GRP mosaic swim spas.`,
        ],
        cta: 'Ask About the Swim Spa',
      },
    ],
    process: {
      heading: 'Buying an Arctic Spa from Cumbria Spas',
      lead: 'Sold, supplied, installed and maintained by one dealer. Contact for prices.',
      facts: ['Arctic Spas dealer', 'Installed with an Arctic engineer'],
      steps: [
        { title: 'Ask about the range', body: 'Tell us how many people and how you will use it.' },
        { title: 'See it', body: 'Visit the showroom at Kirkby In Furness, or ask for photos and videos on WhatsApp.' },
        { title: 'Order', body: 'Choose the model; contact for prices.' },
        { title: 'Installed with an Arctic engineer', body: 'David installs it with one of Arctic\'s own engineers.' },
        { title: 'Maintained', body: 'Servicing and repairs from Cumbria Spas.' },
      ],
    },
    faqs: [
      { q: 'Is Cumbria Spas an Arctic Spas dealer?', a: 'Yes. Cumbria Spas is an Arctic Spas dealer, trading as Arctic Spas Cumbria, able to sell, install, supply and maintain them.' },
      { q: 'Who installs my Arctic Spa?', a: 'David installs each Arctic Spa with one of Arctic\'s own engineers.' },
      { q: 'What is Spa Boy?', a: 'Arctic Spas\' saltwater water care system: sensors analyse the water continuously and sanitisation adjusts automatically, with pH alerts on the control panel, the online portal and the app.' },
      { q: 'Do you service Arctic Spas?', a: 'Yes. Cumbria Spas maintains the Arctic Spas it sells.' },
      { q: 'How much is an Arctic Spa?', a: 'It depends on the model: contact for prices.' },
    ],
    related: ['electric-hot-tubs', 'swimming-pools-and-swim-spas', 'hot-tub-installation', 'hot-tub-repair-and-servicing'],
    cta: { heading: 'See an Arctic Spa before you choose', line: 'Visit the showroom, or ask for photos and videos on WhatsApp.' },
    form: { heading: 'Ask about Arctic Spas', lead: 'Tell us what you are looking for, and Cumbria Spas will come back to you with prices.' },
    serviceType: 'Arctic Spas hot tub sales and installation',
  },

  'commercial-and-mosaic-tiled-spas': {
    title: 'Commercial & Mosaic-Tiled Spas | Cumbria Spas',
    description: 'GRP mosaic-tiled spas and hydro spas for hotels, spa-day venues, leisure centres, holiday parks and homes, with plant rooms, automated dosing and glass filtration installed in-house.',
    h1: 'Need a spa built for a hotel or spa day? Commercial and mosaic-tiled spas from Cumbria Spas',
    lead: 'GRP mosaic-tiled spas and hydro spas for hotels, spa-day venues, leisure centres, holiday parks and homes, with the plant room, automated dosing and glass filtration installed by Cumbria Spas.',
    trust: ['Plant rooms installed in-house', 'Automated dosing and glass filtration', 'Bespoke spas from CAD drawings', 'Lead times of 6 to 10 weeks'],
    intro: {
      heading: 'The spa, the plant room and the install, from one business',
      body: [
        'Cumbria Spas is a dealer for a UK manufacturer of mosaic-tiled spas, pools and swim spas, family-run since 1965 with ongoing hotel contracts, and reliable on timings: lead times are 6 to 10 weeks on most orders. Cumbria Spas does the spa, the plant room and the install itself.',
        `These spas are for residential, commercial and B2B customers: holiday parks, hotels, spas and leisure centres, and homeowners who want a mosaic-tiled spa instead of acrylic. ${customersLine}`,
      ],
    },
    rows: [
      {
        heading: 'GRP, built and water-tested before it ships',
        body: [
          'Each spa in the range is a pre-plumbed fibreglass (GRP) and gelcoat mosaic-tiled spa, made in an ISO 9001:2015 certified, 30,000 sq ft production facility. The build: a marine-grade, Lloyd\'s-approved gel coat as the first waterproof barrier; vinylester barrier resin, then high-strength layers to a shell of about 10 to 12 mm; a stainless steel 50 × 50 mm box-section frame with adjustable legs and gimballed foot pads; and two-part high-density polyurethane foam insulation, typically 20 mm.',
          'Every spa is filled and water-tested for 24 hours and signed off only with no leaks, against a 70-point quality checklist. A concrete spa with rendering, tiling and plumbing takes 12 to 14 weeks on site and carries a higher leak risk; a finished GRP spa installs in a fraction of the time, sometimes in a single day.',
        ],
        points: [
          { h: '24-hour water test', p: 'Signed off only when there are no leaks.' },
          { h: '70-point checklist', p: 'Every spa checked before it leaves.' },
          { h: 'Shaped in GRP', p: 'Profiled seat backs, contoured benches and curves.' },
          { h: 'No thermal-shock allowance', p: 'High strength-to-weight, temperature and chemical resistant.' },
        ],
        cta: 'Ask About a Mosaic Spa',
      },
      {
        heading: 'Mosaic tiles, your way',
        body: [
          'Tiles are bonded with a two-component, water-impermeable, rapid-curing flexible polyurethane adhesive, a second waterproof layer. Standard 25 mm mosaics from Waxman Niebla and Ezarri Niebla are included, with hundreds of alternatives, and your own tiles can be used if they suit GRP. Grout is two-part epoxy, white as standard or any Mapei Kerapoxy colour.',
          'The bespoke service adds logos or crests, matched décor and digital designs, with a 3D render, and is popular with hotels and wellness centres.',
        ],
        cta: 'Ask About Bespoke Tiling',
      },
      {
        heading: 'Plant rooms, automated dosing and glass filtration',
        body: [
          'Most of the range runs from a plant room, where automated pH balancing and chemical dosing come in. Some domestic models have the plant built in, and one has an exposed side showing the heater and pumps, for a homeowner who wants a mosaic-tiled spa without the cost and space of a plant room.',
          `Cumbria Spas fits glass (pearl glass) filtration, changed about every ten years against about two for sand, with better water quality and roughly half the backflushing. Plant rooms are serviced and repaired too: see ${a('/hot-tub-repair-and-servicing/', 'hot tub repair and servicing')}.`,
        ],
        cta: 'Ask About Plant Rooms',
      },
      {
        heading: 'Hydro spas and bespoke designs',
        body: [
          'Hydro spas are multi-use spas for spa-day venues and hotels, from about 4 m × 3 to 3.5 m up to about 5.5 m × 4.5 m, holding 15 to 20 people at once.',
          `There are 31 standard moulds (11 freeboard-skimmer, 9 deck level-overflow, 4 hydro spa deck level and 7 swim spa freeboard) plus fully bespoke designs: a specific size or space can be designed for, with CAD drawings. Jets are cluster, micro and standard massage jets, each seat set up for the back or the legs. Swim spas are on ${a('/swimming-pools-and-swim-spas/', 'swimming pools and swim spas')}.`,
        ],
        points: [
          { h: '15 to 20 people', p: 'Hydro spas from about 4 m × 3 m to 5.5 m × 4.5 m.' },
          { h: 'Bespoke', p: 'Designed to your dimensions, with CAD drawings.' },
        ],
        cta: 'Ask About a Hydro Spa',
      },
    ],
    process: {
      heading: 'From drawings to a finished spa',
      lead: 'Every order is drawn up and agreed before it is made. Contact for a quote.',
      facts: ['6 to 10 weeks on most orders', 'Installed in-house'],
      steps: [
        { title: 'The brief', body: 'The space, the users and how the spa will be used, residential or commercial.' },
        { title: 'Drawings and the order', body: 'A signed order, the tile order and the drawings: GRP, steelwork and fittings.' },
        { title: 'Your choices', body: 'Tiles, grout, where the pipes terminate and the flange option. Standard pipe sizes are 2" returns and suctions and a 1.5" air ring.' },
        { title: 'Made and tested', body: 'Built, filled and water-tested for 24 hours. Lead times are 6 to 10 weeks on most orders.' },
        { title: 'Installed with the plant room', body: 'Cumbria Spas installs the spa and builds the plant room in-house.' },
        { title: 'Serviced', body: 'Plant-room maintenance and repair afterwards.' },
      ],
    },
    faqs: [
      { q: 'Is a GRP spa better than a concrete one?', a: 'A concrete spa takes 12 to 14 weeks on site and carries a higher leak risk. A GRP spa is water-tested in the factory and can install in a single day. GRP also allows contoured benches and curves.' },
      { q: 'Can a spa be made to fit our space?', a: 'Yes. Specific dimensions or a specific space can be designed for, with CAD drawings.' },
      { q: 'How long does a mosaic-tiled spa take?', a: 'Lead times are 6 to 10 weeks on most orders.' },
      { q: 'Do you install the plant room?', a: 'Yes. Cumbria Spas installs the spa and the plant room itself, and services and repairs plant rooms.' },
      { q: 'Can I have a mosaic spa at home without a plant room?', a: 'Yes. Some domestic models have the plant built in, including one with an exposed side showing the heater and pumps.' },
      { q: 'How much does a commercial spa cost?', a: 'Every spa is specified to order: contact for a quote.' },
    ],
    related: ['swimming-pools-and-swim-spas', 'hot-tub-repair-and-servicing', 'hot-tub-installation', 'trade-and-holiday-park-hot-tubs'],
    cta: { heading: 'Planning a spa for a hotel, venue or home?', line: 'Ask for drawings and a specification for your space.' },
    form: { heading: 'Ask about commercial and mosaic-tiled spas', lead: 'Tell us about the venue or space and what you need, and Cumbria Spas will come back to you with a quote.' },
    serviceType: 'Commercial and mosaic-tiled spa supply and installation',
  },

  'trade-and-holiday-park-hot-tubs': {
    title: 'Trade and Holiday Park Hot Tubs | Cumbria Spas',
    description: 'Trade prices on Kubilų pasaulis wood-fired hot tubs and saunas for holiday parks, lodge and glamping sites: three units or more, British VAT-registered companies.',
    h1: 'Kitting out a holiday park or lodge site? Trade prices on hot tubs and saunas',
    lead: 'Cumbria Spas has supplied and serviced many holiday parks. Qualifying businesses ordering three or more hot tubs and saunas buy the Kubilų pasaulis range at trade prices, delivered to site.',
    trust: ['Three units or more, mixable', 'British company, VAT registered', 'Delivered to your site', 'Servicing afterwards'],
    intro: {
      heading: 'A hassle free, economic way for parks and small sites to buy',
      body: [
        'The trade terms are a hassle free and economic way for holiday parks and small sites to buy wood-fired hot tubs at trade prices. They are for businesses, not individual buyers.',
        `${manufacturerLine} The trade terms cover its hot tubs and saunas. ${customersLine}`,
      ],
    },
    rows: [
      {
        heading: 'Who qualifies for trade prices',
        body: [
          `For holiday parks, lodge and glamping sites and other letting businesses. Buying one tub for your own garden? See ${a('/wood-fired-hot-tubs/', 'wood-fired hot tubs')}.`,
        ],
        points: [
          { h: 'A British company', p: 'Registered at Companies House.' },
          { h: 'VAT registered', p: 'The business must be VAT registered.' },
          { h: 'Three units or more', p: 'At least three units in the order.' },
          { h: 'Mix and match', p: 'Hot tubs and saunas can be mixed: two hot tubs and a sauna counts.' },
        ],
        cta: 'Ask for Trade Prices',
      },
      {
        heading: 'The trade terms',
        body: [
          'Trade orders are priced in euros at trade rates: contact for prices. They are delivered to the buyer\'s site and the buyer arranges lifting off. Because Cumbria Spas does not install trade orders, the warranty is parts-only, with no labour.',
          'The completely off-grid starter model, with no electricity at all, is popular with lodge parks and glamping sites; the jets-and-lights model runs its jets and lights from a standard 13-amp socket.',
        ],
        points: [
          { h: 'Priced in euros', p: 'At trade rates. Contact for prices.' },
          { h: 'Delivered to site', p: 'The buyer arranges lifting off.' },
          { h: 'Parts-only warranty', p: 'No labour, as trade orders are not installed.' },
        ],
        cta: 'Ask for Trade Prices',
      },
      {
        heading: 'Servicing once the tubs are in',
        body: [
          `Cumbria Spas services holiday park tubs after the sale. One trade buyer of three tubs now has four and is looking at more, and Cumbria Spas services them. See ${a('/hot-tub-repair-and-servicing/', 'hot tub repair and servicing')}.`,
        ],
        cta: 'Ask About Servicing',
      },
    ],
    process: {
      heading: 'How a trade order works',
      lead: 'Tell us about the site and the units, and Cumbria Spas will come back to you with trade prices.',
      facts: ['Minimum three units', 'Hot tubs and saunas mixable'],
      steps: [
        { title: 'Tell us about the site', body: 'The park or site, the number of units and the mix of hot tubs and saunas.' },
        { title: 'Check the terms', body: 'A British company registered at Companies House and VAT registered.' },
        { title: 'Choose the models', body: 'Jets-and-lights tubs, off-grid tubs and saunas from the Kubilų pasaulis range.' },
        { title: 'Delivered to your site', body: 'You arrange lifting off; trade orders are not installed.' },
        { title: 'Servicing', body: 'Ongoing servicing from Cumbria Spas if you want it.' },
      ],
    },
    faqs: [
      { q: 'Who can buy at trade prices?', a: 'A British company registered at Companies House and VAT registered, ordering at least three units: holiday parks, lodge and glamping sites and letting businesses.' },
      { q: 'Can I mix hot tubs and saunas in one order?', a: 'Yes. Two hot tubs and a sauna counts as three units.' },
      { q: 'Is installation included?', a: 'No. Trade orders are delivered to the buyer\'s site and the buyer arranges lifting off.' },
      { q: 'What warranty comes with a trade order?', a: 'A parts-only warranty, with no labour, because Cumbria Spas does not install trade orders.' },
      { q: 'How are trade orders priced?', a: 'In euros at trade rates: contact for prices.' },
      { q: 'Do you service holiday park hot tubs?', a: 'Yes. Cumbria Spas has supplied and serviced many holiday parks.' },
    ],
    related: ['wood-fired-hot-tubs', 'saunas', 'hot-tub-repair-and-servicing', 'commercial-and-mosaic-tiled-spas'],
    cta: { heading: 'Ordering for a park or lodge site?', line: 'Tell us how many units and where, and ask for trade prices.' },
    form: { heading: 'Ask for trade prices', lead: 'Tell us about your park or site and how many units you need, and Cumbria Spas will come back to you.' },
    serviceType: 'Trade hot tub and sauna supply for holiday parks',
  },
};
