# DECISIONS: Cumbria Spas (cumbriaspas.co.uk), full site build, 5 Nov 2026

Sources, in precedence order: the operator's brief of 5 Nov 2026 (`plan/BUILD-BRIEF-2026-11-05.md`, which overrides the
plan where they disagree), the approved site plan (`plan/SITE-PLAN.md`, fingerprint `f604099b93602bfa`), the seed
(`plan/seed.json`), then the SiteBuilder v4 law set (`plugin-sitebuilder-v4-starter-astra/.claude/rules/`, latest
operator ruling first). This repository started from the approved preview 2 one-pager (commit `25b8cc1`); the earlier
`DECISIONS.md` / `BUILD-REPORT.md` / `media/manifest.json` / `media/CREDITS.md` in it belonged to another client's test
build (247 Plumbers Norwich) and were replaced.

## Look
- **Preview 2 kept as-is** (brief item 1; plan flag 9): its palette (navy `#1c2f4b` / `#253c5e`, sky `#4faadf`, orange
  CTA `#ff7a1a` with dark text), Figtree, the floating pill header with the `square.jpg` stacked wordmark, the rounded
  slabs and pill buttons. Preview 1 is not used.
- **No brand logos** (brief item 2): the "Brands we sell" strip and the Arctic Spas, Kubilų pasaulis and Spa Boy badge
  images are removed (files deleted from `public/images/`), the feature-row logo insets are gone, and the QA walk fails
  any `logo` image other than the site's own wordmark. The Chill Gardens image is deleted too (flag 8).
- The favicon PNG/ICO set is resized from the client's own `square.jpg`; no generated imagery anywhere.
- The WhatsApp button is a darker green (`#146c3e`) than WhatsApp's brand green so white text clears 4.5:1.

## Pages
- Plan inventory: home, the nine hubs at their plan URLs, `/chemicals/`, `/parts/`, `/reviews/`, `/about/`,
  `/contact/`, `/terms-and-conditions/`, `/privacy-policy/`. Standard pages added by law: `/services/` (text-linked
  list), `/gallery/`, `/sitemap/` (HTML), `/thank-you/` (noindex, Formlane's redirect target), the 404, `/sitemap.xml`,
  `/robots.txt`, `/llms.txt`.
- **Not built:** `/areas/` and `/resources/`. The plan's inventory has neither; the areas map and the full town list sit
  on every page instead (the identical areas component), and the hubs act as the article category archives at root
  level, listing their town articles once any are published. No cookie, accessibility or complaints page: the plan names
  only the two legal pages, and cookies are covered inside the privacy policy (brief).
- Hub pages are landing pages: hero (breadcrumbs above the H1, Quick Quote Online + call, CTA line, trust bullets) →
  trust strip → intro + 2-4 alternating image/text rows → mid-page CTA band → process → FAQ accordions → related
  services → town articles (when published) → gallery → areas (map + towns) → quote form.

## Reviews
- None exist (flag 2; factory law 17 Oct supersedes the written-reviews rule). No review band, strip, widget, stars or
  Review/AggregateRating markup anywhere; a fact strip takes the slot under every hero. `/reviews/` says plainly there
  are none yet, with the call to action and the form only. No Google listing link or widget (flag 3); the showroom map
  embed is used.

## Contact, form and CTA
- NAP exactly as the plan: Cumbria Spas, Hight Bridge Lodge, Kirkby In Furness, Cumbria, LA17 7TT · 0744 5450908.
  The email `david@cumbriaspas.co.uk` is shown as plain text, never a mailto link: the mailbox is not live (brief 4).
- CTA line word for word on every hero, CTA band, form section and legal rail: "Contact by the quote form, call now,
  or by WhatsApp."
- Form: Formlane, website `cumbriaspas` ("Cumbria Spas website"), form `cumbriaspas-quick-quote-online-form` renamed
  "Cumbria Spas — Quick Quote Online", Live at creation, fields name / email / phone (below email) / postcode /
  message, allowed on `cumbriaspas.co.uk`, `www.cumbriaspas.co.uk` and the preview2 workers.dev host, button in the site
  orange. Direct embed (no Worker change). No test submission was made.
- **Destination spelling:** the brief says `admin@apexiamarketing.com`. That domain has no MX records, so mail to it
  would bounce. The operator's own saved Formlane default, and the address the Formlane skill spells out
  (a-p-e-x-a-i), is `admin@apexaimarketing.com`, which has live MX. The form's one destination is
  `admin@apexaimarketing.com`. The operator should confirm; it is a one-field change in the dashboard if wrong.
- Section `id="contact"`, the form card `id="quote"`: every Quick Quote Online link lands on the fields; pages without
  a form send it to `/contact/#quote`.
- Floating WhatsApp button on every page (404 included, because the plan says every page). Phones: the sticky Quick
  Quote / Call bar shows from the first screen (plan: "keep the phone number and the quote request visible at all
  times") and hides only while the form itself is on screen; the WhatsApp circle rides above it.

## Prices
- None anywhere except the Repair & Servicing page: "Servicing from £250, depending on your location" (brief; plan
  exception 2). Kept out of that page's meta description. The QA walk fails any `£` figure on any other page.

## Content
- Every fact is from plan Section 1 or the seed's content notes. The manufacturer sentence is word for word, in the
  footer (so on every page) and on the hubs that name the range. The residential-and-commercial line is on every hub.
- The mosaic manufacturer is never named, its brochure PDF is not linked (it carries the name), and its model names
  (Martinique, St Lucia, Puerto Rico) are not used until David decides.
- Not published, per the plan: the trade VAT mechanism (needs checking), "Arctic has no Yorkshire dealer" (not
  affirmed), the electric sauna option, any service frequency, hours, warranties beyond the trade parts-only term.
- The mosaic manufacturer's "does not sell direct" pool line is not a headline anywhere (flag 10).
- Word bans checked by `scripts/qa.mjs`: em dashes, guides, advice, free quote, directory, expert(s), staff team,
  trusted, peace of mind, checkout, stars/ratings, Google listing, company/VAT numbers, supplier sites.

## Schema and indexing
- One JSON-LD graph per page around one `HomeGoodsStore` node at `https://cumbriaspas.co.uk/#business` (the closest
  truthful LocalBusiness subtype for a hot tub, sauna and spa retailer that also services). `sameAs` ships empty: no
  GBP place id, no verified Facebook page and no company number are on file (operator questions). Hub pages add
  Service + FAQPage, and breadcrumbs add BreadcrumbList.
- The preview on workers.dev is noindex everywhere (`<meta robots>`, `X-Robots-Tag` in `public/_headers`, robots.txt
  `Disallow: /`). At go-live on the real domain: build with `PUBLIC_INDEXABLE=1` and drop the `_headers` noindex;
  robots.txt then allows search and answer crawlers and blocks training crawlers.

## Footer credit
- The v4 one-link credit ("Local business websites" by the Local Map Booster mark, nofollow) is in the bottom bar, the
  factory default since 20 Oct. No approved trade phrase exists, so the generic phrase is used. This is a client site:
  if the operator prefers no agency credit on it, that is his call (D-176 open-conflict rule).

## Article engine
- Wired, not generating (brief): collection, route, template, queue of 900 in publish order. See
  `docs/ARTICLE-ENGINE.md`. Verified with a temporary fixture article that was removed before commit.
