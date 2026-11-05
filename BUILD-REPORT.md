# BUILD REPORT: 247 Plumbers Norwich (247plumbersnorwich.uk), SiteBuilder v3 full-site test

Working directory: `/root/projects/lead-gen-websites/v3-fulltests/plumbers247-v3-test`.
Plan: `_timed-test/247plumbersnorwich.uk/site-plan/seed.json` (+ `nap.json`, `selected-services.json`, `towns.json`, blueprints). Approved by the operator 2026-09-11.
Design reference: `reference-library/sites/247plumbers-acool/capture/` (full-desktop.png, section jpg, rendered-home.html), the Acool HVAC template.
Setup patterns copied from `invicta-v3-test` and `v3-fulltests/dh-v3-test` (package.json, astro.config, wrangler.jsonc, Base layout, Lightbox, sticky bar, sheen CSS, check and audit scripts, image pipeline). Every line of copy is new.

## Elapsed build time

- Start: **2026-09-18T07:15:11Z**
- End: **2026-09-18T08:30:49Z**
- **Elapsed: 1 h 15 min 38 s** (reading the plan, rules and capture; image sourcing; build; rendered checks; content audit; DECISIONS.md; this report).

## Result

- `npm run build`: green, **28 routes** after AREAS-FIX (was 36 with the eight town pages; see the AREAS-FIX section), 11 MB dist including 80 WebP images (7.1 MB).
- `npm run deploy:dry` (wrangler 3.x): config valid, static-assets Worker `site-247plumbersnorwich-v3-test`, workers.dev only, 404 served from `404.html`. Not deployed.
- Test interlock: `<meta name="robots" content="noindex, nofollow">` on every page + `robots.txt` `Disallow: /`. The thank-you page is noindex by the same mechanism and stays so after the interlock flips (utility page).
- Rendered checks (`npm run check` = `scripts/check.mjs`, Playwright Chromium, 1440x900 and 390x844, **every route, both viewports, 0 failures**): zero horizontal overflow against device width; one H1 per page (64 px desktop / 34.5 px mobile on the home page, 52 / 32 on inner heroes, 42 / 28 on article and legal pages); every `<img>` has alt; no visible text under 3:1 contrast; every fixed/sticky box inside the viewport; every `main > section` carries `data-section` + matching `section-*` class; the form has 0 labels and 6 required fields; no "Leave Us A Review", no "Google review" wording, no em dash, no "free quote", no "Gas Safe" in rendered text; every `.btn` and the sticky-bar segment run the 4.2 s sheen loop (11/11 on the home page); gallery is 2 columns at 390; mobile header shows no phone or buttons; sticky bar hidden at the top, visible mid-page, hidden over the form; the mobile Quick Quote click lands the form element at y = 88 (header pill bottom 68) with the first input at 144; the burger menu at 390 shows all 6 nav links + the Quick Quote button inside the viewport; a real map iframe on the home page, all 15 service pages, all 8 area pages, `/areas/`, `/about/` and `/contact/`; no year in any article body.
- Static audit (`python3 scripts/audit.py`): word counts home 1281, service pages 1197 to 1498, area pages 1064 to 1352, about 950, articles 1628 to 1779, services directory 1120, areas directory 772, contact 439; every title 37 to 65 chars and unique, every description 139 to 158; one in-copy contact link per page and none on contact/legal/utility; no self-links; no repeated anchor+target on a page; "trusted" 0, "expert" 0, "peace of mind" 0, "free quote" 0 site-wide; no credential term, no AI-tell phrase, no unbacked superlative; highest cross-page 5-gram Jaccard similarity 0.178 (home vs `/resources/`, the three article cards) and 0.061 for the closest pair of area pages, shells excluded.
- Source sweep: no em dashes, no banned AI phrases, no banned fonts, no pure `#fff`/`#000`, no `console.log`, no lorem/TODO/example.com, no `span 2` in the form, no placeholder phone rendered (the only "0000 000" is a code comment).

## AREAS-FIX (2026-09-18, applied after the build above)

The operator ruled that the AREAS section is ONE PAGE ONLY. Everything in the sections below that describes eight area pages, "8 built" towns or town-level maps/galleries/schema is superseded by this section.

### What was removed

- **Route:** `src/pages/areas/[slug].astro` deleted. The eight town pages it generated are gone from `dist/`: `/areas/norwich/`, `/areas/great-yarmouth/`, `/areas/bowthorpe/`, `/areas/east-dereham/`, `/areas/beccles/`, `/areas/north-walsham/`, `/areas/diss/`, `/areas/attleborough/`. No redirects (test build, nothing to preserve); they 404 through the Worker's `not_found_handling: "404-page"`.
- **Data:** `src/data/areas.ts` cut from eight `AreaContent` entries to one export, `mainArea` (the Norwich content, the only town with plan research). Its intro's self-link to `/areas/` became plain text. `areaBySlug` removed. `src/data/site.ts`: the `built` flag, `builtSlugs` and `builtTowns` removed; `largestTowns` (top eight by population) added for the short text lists.
- **Links to `/areas/<town>/`, all removed:**
  - `src/components/Footer.astro`: the five town links in the Areas column are now plain text (`<span>`), the single `All areas` link stays.
  - `src/components/Areas.astro` (home + every service page): town names are plain text on every page; the compact list on service pages is headed "The larger towns in the area" instead of "Towns with their own page".
  - `src/pages/404.astro`: the "Areas with their own page" list removed; the `/areas/` link stays.
  - `src/pages/areas/index.astro`: the eight town cards and the linked names in the distance bands removed; the `CollectionPage.hasPart` schema listing the eight town URLs removed.
  - `src/pages/index.astro`, `about.astro`, `services/index.astro`: copy that said "the larger ones have their own page" rewritten.
- **Scripts:** `scripts/check.mjs` no longer screenshots `/areas/great-yarmouth/` and its map check now covers `/areas/` itself; `scripts/patch-seo.py` no longer patches per-town titles.
- **Not removed:** the seven town photos (`public/images/area-{great-yarmouth,bowthorpe,east-dereham,beccles,north-walsham,diss,attleborough}.webp`) are no longer referenced by any page but are left in place with their `media/manifest.json` and `media/CREDITS.md` records. Delete them if the pool should stay tight.
- **Sitemap:** none exists in this build (noindex test build, no `@astrojs/sitemap`, no `sitemap.xml` in `public/` or `dist/`), so there was nothing to update. When a sitemap is added at launch it must list `/areas/` only.

### The one areas page (`/areas/`)

Hero (crumb: Home > Areas) > review band > **Norwich body** (the main location: the terraces of NR1-3, the estates, flats and lets, hard water, with a sticky Norwich photo and Quick Quote card; in-copy links to service pages only) > **map** (the existing real Google embed of Norwich at zoom 9, `output=embed`, lazy iframe, no overlay) > **every one of the 56 towns named** as plain text in the four distance bands (Norwich is the body, the other 55 are listed with straight-line miles; Suffolk ones marked) > services grid (15 cards, links to the service pages) > CTA band > Norwich FAQ (the closer links the services directory, not contact) > form. Schema: Place (Norwich, with geo) + FAQPage + BreadcrumbList (Home, Areas) on top of the layout's LocalBusiness/WebSite/WebPage. Title and description unchanged.

In-content links on the page are the home page and the services pages only: `/`, `/services/` and the fifteen `/services/<slug>/`. The shared shell (header nav, footer, sticky bar) is unchanged and still carries the site-wide About/Resources/Contact/Terms/Privacy links, as on every other page.

### Verification (`node scripts/verify-areas.mjs`, serving `dist/` with the Worker's asset semantics)

- `npm run build`: green, 28 pages.
- `/areas/` **200**. `/`, `/services/`, `/services/boiler-repair/`, `/about/`, `/contact/` 200.
- Every removed route **404**: `/areas/norwich/`, `/areas/great-yarmouth/`, `/areas/bowthorpe/`, `/areas/east-dereham/`, `/areas/beccles/`, `/areas/north-walsham/`, `/areas/diss/`, `/areas/attleborough/` (absent from `dist/`, served by `404.html`).
- Link crawl of all 28 HTML files: **1,463 internal `href`/`src` values checked, 0 broken** (every one resolves to a file in `dist/`), **0 links to `/areas/<anything>/`** in markup or JSON-LD.
- `/areas/` in-content links: 17, all `/` or `/services/…` (listed above).
- All 56 town names present in the rendered `/areas/` HTML.
- `python3 scripts/audit.py`: unchanged except one expected flag, `pages with 0 contact link: ['/areas/']`, because the law restricts the page's links to the home page and services (recorded in DECISIONS.md). Highest cross-page similarity is now 0.178 (home vs `/resources/`, as before); the area-page pairs are gone.
- `scripts/check.mjs --only /areas/,/,/services/boiler-repair/,/404.html`: 0 failures at 1440 and 390 (one H1, no overflow, no contrast fails, map iframe present on `/areas/`, sheen on every button, sticky bar law, form anchor law).

## Pages built (exact list, 28 routes after AREAS-FIX)

| Route | Type |
|---|---|
| `/` | Home |
| `/services/plumber/` | Service hub (plan slug) |
| `/services/drain-unblocking/` | Service hub |
| `/services/underfloor-heating/` | Service hub |
| `/services/boiler-service/` | Service hub |
| `/services/247-emergency-plumber/` | Service hub |
| `/services/boiler-installation/` | Service hub |
| `/services/gas-safety-certificate/` | Service hub |
| `/services/bathroom-installation/` | Service hub |
| `/services/boiler-repair/` | Service hub |
| `/services/hot-water-cylinder/` | Service hub |
| `/services/leak-detection/` | Service hub |
| `/services/central-heating-installation/` | Service hub |
| `/services/power-flushing/` | Service hub |
| `/services/radiator-repair/` | Service hub |
| `/services/leaking-pipes/` | Service hub |
| `/services/` | Services directory (LAW R10) |
| `/areas/` | The one areas page (AREAS LAW): Norwich body, map, all 56 towns named as text, services grid, FAQ, form. The eight `/areas/<town>/` pages were removed (AREAS-FIX) |
| `/about/` | About |
| `/contact/` | Contact |
| `/thank-you/` | Thank-you (noindex, no sticky bar, no form) |
| `/terms/` | Terms and conditions |
| `/privacy/` | Privacy policy |
| `/resources/` | Resources archive (never "blog") |
| `/resources/hard-water-limescale-norfolk-homes/` | Article |
| `/resources/blocked-drain-older-norwich-house/` | Article |
| `/resources/frozen-burst-pipes-first-ten-minutes/` | Article |
| `/404` | Not found |

Beyond the brief's literal list, `/services/`, `/areas/` and `/404` were added because LAW R10 (PAGE-INVENTORY / LAYOUT-LAWS) requires them on every build and the skill rules outrank the brief. Both are directories, not homepage copies. No other pages. No article corpus. No town beyond the eight.

Hubs sit at `/services/<plan slug>/` per the SEO-STANDARD URL contract (the plan gives the slug, not the prefix).

## Services from the plan (exact, 15, plan order)

Plumber; Drain Unblocking; Underfloor Heating; Boiler Service; 247 Emergency Plumber; Boiler Installation; Gas Safety Certificate; Bathroom Installation; Boiler Repair; Hot Water Cylinder; Leak Detection; Central Heating Installation; Power Flushing; Radiator Repair; Leaking Pipes. Names, hub slugs and primary phrases exactly as in seed.json; every one is `hubMapping: dedicated`, so each has exactly one hub page. Nothing invented, renamed or dropped. Each hub's H2s follow its blueprint section list; the two `default-skeleton` hubs (Plumber, 247 Emergency Plumber) got written sections in the same spirit. Blueprint headings that asserted unaffirmed claims were reworded as recorded in `DECISIONS.md`.

## Top 8 towns

The plan has no town-level search volume (only population and straight-line distance), so the eight largest by population were built: Norwich 143,135; Great Yarmouth 63,434; Bowthorpe 20,000; East Dereham 19,256; Beccles 13,868; North Walsham 13,007; Diss 10,734; Attleborough 10,549. Each page is written around its own housing stock and the jobs it produces (Norwich from the plan's town research: 29.8% terraces, the Golden Triangle, NR1-3 Victorian and Edwardian, inter- and post-war NR3/5/6/7, red brick and flint; the others from general knowledge of the towns, kept to what is safely true) and maps that town.

## Stack and structure

Astro 7.3 + Tailwind v4 (Vite plugin) + Figtree Variable (self-hosted via fontsource, one family for every role), static output, Cloudflare Worker static-assets config.

```
src/data/site.ts             business facts, 15 services, 56 towns (none with a page), sample reviews, gallery, nav, seo
src/data/services/*.ts       15 hub content modules (h1, lead, ledger, intro, blueprint sections, process, CTA, areas, FAQ, related, form copy)
src/data/areas.ts            the Norwich content for the one areas page
src/data/articles.ts         3 articles
src/layouts/Base.astro       head (noindex, canonical, OG, LocalBusiness/WebSite/WebPage @graph + page schema), header, footer, sticky bar, lightbox, motion, Quick Quote anchor law
src/components/              Header, Footer, Hero, ReviewStrip, ReviewBand, GMark, Stars, ServicesGrid, ServiceBody, Process, CtaBand, Gallery, AboutBand, Areas, MapEmbed, ArticlesPreview, Faq, RelatedServices, QuoteForm, StickyCtaBar, Lightbox, LegalPage
src/pages/                   index, services/[slug], services/index, areas/index, about, contact, thank-you, terms, privacy, resources/index, resources/[slug], 404
scripts/images.py            Pexels CDN pull + crop + WebP + manifest/credits
scripts/check.mjs            rendered checks + screenshots (shots/)
scripts/audit.py             static content audit
scripts/verify-areas.mjs     AREAS LAW verification (status codes, removed routes, link crawl)
scripts/patch-seo.py         the one-off title/description tightening pass
media/manifest.json, media/CREDITS.md
DECISIONS.md                 every design device taken from the reference and every plan/honesty call
```

## Design language (from the Acool capture)

Light page with a teal gradient hero slab inset from the page edge and rounded at the bottom; the header is the template's white floating pill inside the slab (fixed, stronger shadow on scroll); photo right in a rounded frame with a soft bokeh wash; two-column section heads (eyebrow + H2 left, lead right); ice-blue tint cards with the photo inside the card padding for services, related services, articles and reviews; the about mosaic (photo, overlapping white card, teal panel with tag chips); the dark split slab with stacked light cards for the process (numbered typographic badges, a photo thumbnail per step, sticky left column with its own Quick Quote); the full-bleed photo CTA band with a centred white card; a deep-teal footer slab with a light notched Quick Quote panel. Pill buttons throughout, recorded in `DECISIONS.md` under the override clause.

Palette: page `#f5f9fa`, card `#fdfefe`, tint `#e4f1f5`, teal `#137993`, deep teal `#0d3d4b`, accent `#f97316` (ink text on it at 6.6:1; 5.9:1 on the deep teal), accent-deep `#c2410c` for orange text and stars on light (5:1). Gradients only on the hero, the article/legal head and the quote slab, where the template uses one. No coloured card edges. No dark-on-dark text (probed on every route).

Motion: `data-motion="reveal"` (IntersectionObserver, 550 ms) and `data-motion="scrub"` (hero photo drift, CTA band parallax, clamped at scroll 0 so nothing shows above the hero), CSS marquee for reviews (pauses off-screen and on hover), continuous button sheen. All off under reduced motion.

## Laws and where they land

1. **Buttons.** "Quick Quote Online" is the only CTA and is always the orange primary. The plan's phone is a placeholder, so there is no call button anywhere (header, hero, band, sticky bar, menu, footer, schema). Desktop header: nav + Quick Quote pill. Mobile header: wordmark + burger only; the Quick Quote button sits under the six nav links inside the opened menu (rendered-checked).
2. **Mobile QQ anchor.** Every Quick Quote link is `#quote`, the id of the `<form>` itself. Base.astro's handler scrolls the form element into view under 1024 px (scroll-margin clears the fixed pill header; measured landing y = 88 with the pill bottom at 68, first input at 144) and the whole quote section on desktop. Pages without a form (thank-you, 404) fall back to `/contact/#quote`. Hero and body buttons carry `data-service` and pre-select the dropdown.
3. **Form.** Six placeholder-only fields, no labels, all required, one column: Full name / Phone number / Email address / Postcode / What needs doing (15 services + Something else) / "Rooms, radiators and boiler make". Padlock security line. Validation marks empties and blocks; a valid submit goes to `/thank-you/`.
4. **Reviews.** Band in position 2 on every page with a page-specific statement heading left and eyebrow + G mark + "Excellent" + stars right; auto-scrolling track of 8 cards on the frosty tint; stars in the accent; no "Leave Us A Review"; the words "Google review" appear nowhere. Rating strip under every hero CTA and above the form heading. See "could not fully satisfy" for the placeholder status.
5. **Map.** Home, all 15 service pages, all 8 area pages, `/areas/`, `/about/` and `/contact/` carry a real Google Maps embed (`output=embed`, lazy iframe, no overlay). No GBP in the plan, so each is an area map: Norwich on home/service/about/contact, the town on its area page, the twenty-mile area on the directory.
6. **Gallery.** 12 images on the home page, 8 on the services directory and about, 4 on every service and area page (rotating offset), 4-column desktop, 2-column mobile, plain grid of rounded thumbnails, all lightboxed through the one root Lightbox (swipe, arrow keys, light chevrons and close on the dark backdrop, Quick Quote under the image). No numbering. Quick Quote directly under the grid.
7. **Service cards.** 15 identical cards, photo in each, the service name is the only link (on the title, no underline, no stretched link), blurbs 130 to 190 chars. On phones the cards go horizontal (thumbnail left) so fifteen stay scannable.
8. **Colours.** As above. Accent bold and saturated on both grounds. No dark-on-dark. No card edges. Gradients only where the template has them.
9. **Typography.** Role-bounded, six sizes, one family, H1 within caps on every page and viewport (measured).
10. **Images.** Every section that wants an image has one: hero (+ bokeh), 15 service cards, 15 second service images (sticky column + FAQ companion), 4 process, 12 gallery, 2 about, CTA band, 8 area photos + 2 directory photos, 3 article heroes + 6 figures each, contact hero, OG image. None omitted. All stock (see below).
11. **Uniqueness.** Every page written fresh; highest pair similarity 6% on 5-grams between area pages, 18% home vs resources archive (the three article cards).
12. **No "free quote"** anywhere; no em dashes; no AI-tell phrases; no glow; no decorative label chips; every inline SVG carries `data-glyph`.
13. **CTA band** sits under the process section and above the gallery on home, about and every service page; on area pages under the town's service grid and above the gallery; on the directories and resources archive above the form section but separated from it by the gallery or the article grid. Never directly above the form. Generic copy, no photo requests.
14. **SEO.** Titles service/town first, business last (e.g. `Boiler Repair in Norwich | Breakdowns Fixed | 247 Plumbers`), 37 to 65 chars, unique; descriptions 139 to 158. Schema: LocalBusiness (+Plumber) with areaServed (56), hasOfferCatalog (15), WebSite, WebPage on every page; Service + FAQPage + BreadcrumbList on hubs; Place + FAQPage + BreadcrumbList on area pages; CollectionPage on the three directories; AboutPage, ContactPage; Article + FAQPage + BreadcrumbList on articles. No aggregateRating and no telephone (no real data). Single H1, no skipped levels. Archive is `/resources/`, never "blog". Whole site noindex via meta + robots.txt.
15. **Articles.** Three genuine guides (1,628 to 1,779 words): hard water and limescale in Norfolk homes; a blocked drain in an older Norwich house; frozen and burst pipes and the first ten minutes. No dates anywhere. A figure above every H2 (6 each), varied images. 60/40 layout with sticky ToC + Quick Quote block; the ToC collapses above the body under 1024.
16. **Sheen** on every button: 4.2 s continuous diagonal sweep, siblings staggered 700 ms, 600 ms hover sweep, none under reduced motion (rendered-checked: every `.btn` and the sticky segment animate).
17. **No black bar.** The hero slab is flush with the viewport top (the page gutter inset is left/right only, and light not black); the scrub clamps at scroll 0; the top 6 px of every route was captured at both viewports and reads as the teal hero or the light page.
18. **Accent.** Orange `#f97316`, deep `#c2410c` on light; the template's teal stays the brand colour.

## Images used

R2 pool `site-images/PLUMBERS247/` is **empty** (0 objects; also 0 under `plumbers247/`, `247plumbersnorwich.uk/`, `247-plumbers-norwich/`; listed with the CLOUDFLARE_R2 keys on 2026-09-18; the `R2_*` keyset returns 401). Search went through the Pexels website's own JSON endpoint and the files were pulled keyless from the Pexels CDN by photo id, cropped to slot ratio, converted to WebP (quality 80). Originals already pulled for the DH build were reused from its `media/_src` cache where the id matched.

80 slots from 46 distinct photos, 7.1 MB. The trade backbone is the same consistent boiler-room shoot as the DH build (МОБО Модульные Котельные, ids 34938429 to 34938454), plus Bulat843's blue-uniform plumber pair (hero and about), Sergei Starostin's radiator pipework, Pavel Danilyuk's manifold and pump, Heiko Ruth's boiler pump hands, Anıl Karakaya's pipe joint, Ksenia Chernaya's radiator fitting and shower drain, Max Vakhtbovych's bathroom, Markus Winkler's valve, eberhard grossgasteiger's leaking pipe, and Norfolk photography (Suzy Hazelwood's Norwich streets and flint house, Manousos Kampanellis's Norwich and Cringleford aerials, Howard Senton's Great Yarmouth seafront, Neville Hawkins's Norfolk village streets, Jocelyn Erskine-Kellie and Ryan Collis for Beccles and Attleborough stand-ins). Full table with photographer and source URL per id in `media/CREDITS.md`; per-slot record in `media/manifest.json`. Credit is in the repo only, not in the site footer.

These are not the client's photographs. Copy never claims they are (gallery headed "Plumbing and heating work, stage by stage", never "our recent work"; the terms say so explicitly). Swap for client photography before launch. One photo (32588548, a plumber whose overall badge carries a legible Russian company name) was pulled from the gallery and about slots after the lightbox screenshot showed the badge; it is not used anywhere now. Stand-ins worth a second look: `svc-leaking-pipes` (an outdoor rusty pipe dripping), `svc-drain-unblocking` (leaves on a drain grate), `area-beccles` and `area-attleborough` (generic English village / suburban streets, alt text says so), `area-diss` (a flint house in Norwich, alt text says Norfolk).

## Conflicts between the brief, the plan and the rule text, and what I did

- **Rules vs brief on the page set.** LAW R10 requires `/services/`, `/areas/` and `/404` on every build; the brief says "NO MORE PAGES". Built them (rules outrank), as directories, not homepage copies.
- **Rules vs brief on reviews.** LAYOUT-LAWS asks for a "Leave Us A Review" CTA and a numeric rating + count; v3 law 4 bans the button and the plan's negative topics ban a stated count or score. Followed the v3 law and the plan: no button, no number.
- **Rules vs brief on the phone.** LAW R9 gives the call button the accent when a phone exists; the plan's phone is a placeholder, so there is no call button at all (v3 law 1). The desktop header therefore shows the Quick Quote pill only.
- **Plan services vs the credential rules.** "Gas Safety Certificate" is a plan service and its page is built; the credential term "Gas Safe" is not used anywhere (the check fails on it). The legal requirement is stated as "a registered gas engineer, as the law requires".
- **"247" vs the response-time rule.** The business and service names are the operator's; the site says emergency requests are taken day and night and states on the about page and in the terms that this is not an attendance-time promise. No arrival time is claimed anywhere.
- **Plan blueprint vs honesty rules.** Nine blueprint headings asserted unaffirmed claims (fixed price, same-day, G3, Gas Safe, fast response, bespoke, accreditation, service plans); reworded as listed in `DECISIONS.md`. The home blueprint's underfloor-heating section list was not used for the entity page.
- **Pill buttons.** LAYOUT-LAWS says never a pill; ANTI-SLOP's override clause says a reference's deliberate pills are permission. Acool is pills throughout; built pills, recorded.
- **Gradients.** LAYOUT-LAWS bans them by default; law 8 allows them where the template uses them. Acool's hero is a gradient; used on the hero, the article/legal head and the quote slab only.

## Things I could not fully satisfy (placeholder-marked, never omitted)

- **Reviews are samples.** The plan has no Google profile and no verified reviews, and bans invented testimonials; the brief says the band is always written and never empty. Eight sample cards are rendered on this noindex build with `data-placeholder="reviews"` on the band and `"rating"` on the strips (LAYOUT-LAWS `reviews.placeholder_slots` on a non-indexable build). No score, no count, no named engineers, no response-time claims inside them. Gate 0: connect the real feed. Swap point: `src/data/site.ts` `reviews` + `reviewsPlaceholder = false`.
- **Phone and address.** Placeholders in nap.json; not rendered. Two hidden `data-placeholder` slots on the contact card (`nap-phone`, `nap-address`) and `business.phone/address` in `site.ts` are the single points to fill. Schema carries no telephone.
- **Email.** `info@247plumbersnorwich.uk` is the house default convention and appears in the footer, contact page, legal pages and schema. The mailbox has not been verified to exist; verify before launch.
- **Form delivery.** No endpoint in the plan. The form validates client-side and moves to `/thank-you/`; set `data-endpoint` on the form (QuoteForm.astro) to a POST URL before launch, otherwise enquiries are not captured.
- **Unaffirmed USPs.** "DBS-checked", "no call-out fee", "guaranteed workmanship", "insured", "fully qualified", "transparent pricing", "free leak detection quotes" are not stated. If the operator affirms any of them, the About panel chips and the hero ledgers are the places to add them.
- **Photography is stock** (above).
- **Town facts outside Norwich** are written from general knowledge of the towns (housing eras, rivers, coast, off-grid villages) and kept general; the plan's research covers Norwich only. Worth a local read before launch.
- **Google Maps iframes** load lazily from Google; they render blank in the headless screenshots but are real embeds (checked `src` on every route).
- **wrangler** is 3.x (as Invicta and DH); it warns to update to 4. Dry run is clean.

## How to run

```
npm install
npm run build          # dist/ (28 routes)
npm run preview
npm run check          # rendered checks at 1440 and 390 on every route, screenshots into shots/
python3 scripts/audit.py   # word counts, similarity, link laws, title/meta lengths, phrase caps
node scripts/verify-areas.mjs   # AREAS LAW: /areas/ 200, town routes 404, no town links, no broken links
npm run deploy:dry     # validate wrangler config
npm run deploy         # workers.dev (test, noindex)
python3 scripts/images.py  # re-pull and re-crop the image set
```

Files not committed: the repo has no commits; `dist/`, `node_modules/`, `.astro/`, `shots/`, `media/_src/`, `media/_meta.json`, `_ref/` (review crops) and `scripts/_probe/` are ignored. Commit when reviewed.
