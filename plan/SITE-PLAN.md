# SITE PLAN — Cumbria Spas (new site on cumbriaspas.co.uk + one year of SEO articles)

**STATUS: APPROVED (Kieran, 4 Nov 2026). Fingerprint `f604099b93602bfa`, recorded in
`site-plan/APPROVED-BY-OPERATOR`.** Ready to go to Vincent. Only the operator writes that file —
Vincent should not build from this plan unless it is present with a matching fingerprint.

**How this file is laid out.** **Section 1, The Site Plan,** is everything needed to build the site:
read it top to bottom. **Section 2, Additional Info,** is at the very bottom, under the heading
"SECTION 2 — ADDITIONAL INFO". It is the record: where each fact came from, exact counts, decision
IDs, what changed and when, and the validator history. Nothing in Section 2 is needed to build.

---

# SECTION 1 — THE SITE PLAN

## Before you start: a note for Vincent and the build team (not site content)
The operator wants a genuinely good job done on this site. David is also a prospective future
lead-gen client for Local Map Booster, so the quality of this one matters beyond this one
deliverable. (That is a possible future service for his business, separate from this site, which is
his own client site: see Business model below.)

## The business
Cumbria Spas (legal name Cumbria Spas Ltd) is David Hughes's hot tub business, established in 2013,
with a try-before-you-buy showroom at Kirkby-in-Furness, Cumbria. It sells and installs wood-fired
and electric hot tubs made by Kubilų pasaulis, is an Arctic Spas dealer, sells saunas, mosaic-tiled
and commercial spas, swimming pools and swim spas, repairs and services hot tubs, and supplies
holiday parks at trade prices. It serves residential and commercial customers of all types, from
hotels to spas to leisure centres.

Domain `cumbriaspas.co.uk`. The machine-readable deliverable is `site-plan/seed.json`; this file is
the human-readable brief for Vincent and his AI, and the reason the seed says what it says. Towns
with distances and populations: `towns.json`. The legal pages' text: `legal/`. Source trail:
`PROVENANCE.md` and Section 2.

**NAP, use exactly as written:**
- **Cumbria Spas**, Hight Bridge Lodge, Kirkby In Furness, Cumbria, LA17 7TT
- Phone **0744 5450908** (WhatsApp the same number: `https://wa.me/447445450908`)
- Email **david@cumbriaspas.co.uk** (sales@cumbriaspas.co.uk becomes an alias of it)

## Business model & priority service
- **Monetization: CLIENT SITE** (`site.mode = "client"`). This is Cumbria Spas' own marketing site:
  their job, their quote. Every enquiry goes to Cumbria Spas, which prices it and does the work, so
  nothing on it may read like a directory or a referral service.
- **Priority / headline service: HOT TUBS** (`site.niche = "hot_tubs"`; `site.vertical` is not set).
  Hot tubs lead wherever it matters: the homepage headline, title tags, schema `serviceType` and nav
  order. Four hubs carry it, in this order: Wood-Fired Hot Tubs (`/wood-fired-hot-tubs/`, the lead
  hub), Hot Tub Repair & Servicing (`/hot-tub-repair-and-servicing/`), Electric Hot Tubs
  (`/electric-hot-tubs/`) and Hot Tub Installation (`/hot-tub-installation/`). Swimming Pools & Swim
  Spas, Saunas, Arctic Spas, Commercial & Mosaic-Tiled Spas and Trade and Holiday Park Hot Tubs are
  secondary to it.

## Read first: flags and decisions
1. **Decided (operator, 4 Nov 2026): the Arctic Spas Dealer hub stays in.** 9 hubs, 100 towns each,
   900 articles. No change needed.
2. **No reviews exist yet.** Cumbria Spas has no reviews on any platform. The Reviews page
   (`/reviews/`) is an empty placeholder: a short holding line and the call to action, and no widget,
   testimonials or star graphics. No page may claim or imply reviews. The seed enforces it:
   `seed.reviews.status = "none-yet"`, no reviews section on the home page, and a site prohibition
   that overrides standing prohibition 24's "say many five-star reviews" for this site.
3. **No Google Business Profile yet.** David has no GBP or Google Maps listing. Until it exists: no
   "find us on Google", no Google-reviews widget, no Maps listing link (an embedded map of the
   showroom address is fine; the previews already have one). **When it exists, put the new site's
   URL on the listing straight away**, add `gbp.mapsUrl` and `gbp.cid` to `nap.json` and re-run.
4. **Two towns David named are outside the 50-mile radius and are in the plan anyway**, because every
   town he named is included: **Bedale** (North Yorkshire, 64.5 mi, a service customer) and
   **Ballycastle** (Northern Ireland, 139.2 mi straight-line across the sea, a holiday park he
   services). As pinned towns they publish 5th and 6th. To drop either, delete it from `nap.json`
   `townOrder.pinned` and re-run the geo stage (free).
5. **The 900-article budget cuts 32 of the 132 towns**, the smallest by population (see Towns),
   including six villages close to the showroom: Swarthmoor (4.4 mi), Flookburgh (9.6), Silverdale
   (15.7), Seascale (16.4), Staveley (17.9), Burneside (19.1). To keep all 132, set
   `"maxArticles": 1188` in `nap.json` (9 hubs × 132); to keep just those six, add them to
   `townOrder.pinned`.
6. **Never "the only Arctic Spas dealer in Yorkshire".** Arctic Spas has no dealer in Yorkshire, but
   Cumbria Spas is the Cumbria dealer (the current site trades as "Arctic Spas Cumbria"), not a
   Yorkshire one, and "only" is a superlative.
7. **The supplier brochure, CAD drawings and photos are cleared for use.** David has confirmed the
   mosaic-spa manufacturer gave him full authority to reuse its content and images under his own
   name. Use them freely. Every one of the manufacturer's CAD drawings carries a notice that it "must
   not be used, copied or replicated in any way without the prior written authority of" the
   manufacturer (Cheshire Wellness). The operator's instruction: keep a copyright notice wherever one
   is carried, but attribute it to Cumbria Spas / David, never the manufacturer's name. So edit the
   drawing's title block, or crop it and caption the image "© Cumbria Spas Ltd".
8. **Do not use the Chill Gardens product image** (the operator's choice). Both previews use
   `/images/chill-20garden-20home-20page.jpeg` as a hero slide and an About image, and the current
   home page carries it too. Chill Gardens is a fantastic supplier; its products are not part of the
   range this site sells.
9. **Colours decided (operator, 4 Nov 2026): keep the current palette (Brand, below) for this
   build.** The operator read the real 13 Oct call: David says he "was okay with it... wasn't
   gripping me... whether it was a bit dark, I don't know, whether it needs to be lighter," then
   immediately says "I like the color scheme itself, especially for commercial stuff and spas...
   it looks like a well-run organisation." Mixed, not a rejection. The operator will ask David
   directly what he'd like changed and revisit the palette later with AI tooling, after launch —
   build on the current palette now, don't hold the build for this.
10. **Still unread, still the operator's call: the rest of the 13 Oct call.** The same call
    (saleshq, "manufacturer/plant room partnership discussion," 32,258 characters) also, in
    passing: appears to say UK pool suppliers will take an order from the public directly, against
    the affirmed claim that the pool manufacturer does not sell direct; names Barnard Castle, where
    David delivered and installed a hot tub (every other town he named has been included); and
    describes a plant-room partnership not otherwise mentioned in this plan. None of this is
    actioned yet — do not make "a pool manufacturer that does not sell direct to the public" a
    headline claim until the operator decides whether to read the rest of this call in.

## Build scope and hosting
- **A new site replacing the current one on cumbriaspas.co.uk**, plus one year of SEO articles.
- **Hosting: a static site on Cloudflare, full stop.** What the current site runs on, and who hosts
  it, does not matter: nothing in the new build has to match it, and there is nothing to look into.
- **Domain.** The site is built on a temporary holding domain and moved onto cumbriaspas.co.uk once
  the domain has transferred from A2A Internet, which the operator handles. The SEO articles start
  publishing the day the site goes live.
- **Email** moves to Google Workspace (david@ the mailbox, sales@ an alias), set up by the operator
  once the domain moves; it is not part of the site build. The domain's mail setup is currently
  broken (Section 2), so check that quote-form enquiries actually arrive before launch.
- **Quote form submissions go to `david@cumbriaspas.co.uk`** (operator, 4 Nov 2026). Confirm this
  address actually receives mail before launch, given the domain's broken MX record above.
- **No online payment.** David has no card payment system, does not want one, and invoices instead.
  No checkout, basket or card payment anywhere; chemicals and parts are bought by contacting him.
- **Pages:** a dedicated page per service and product (the hubs below), About, Contact, Reviews,
  Chemicals, Parts, Terms and Conditions and Privacy Policy.
- **Brochure content goes into the pages**, not only a PDF download: take the text and images from
  the supplier brochure into the site, with an optional "download our brochure" link.

## Contact, calls to action and the WhatsApp button
- **Every sales or contact call to action reads: "Contact by the quote form, call now, or by
  WhatsApp."** Use that wording site-wide: the home page, hub pages, SEO articles, the placeholder
  pages and the contact page.
- **A floating WhatsApp click-to-chat button** in the corner of every page, visible on mobile (and
  on desktop), linking `https://wa.me/447445450908`. WhatsApp is David's best channel: customers
  prefer it to email, and he closes sales by sending videos and photos on it.
- On mobile, keep the phone number and the quote request visible at all times.
- **No prices on any page or in any article**, with two exceptions. Every hot tub/sauna/pool/spa
  price is "contact for prices" or "contact for a quote". Exception 1: the link on the Chemicals
  and Parts pages to David's own Google Sheet of availability and pricing (the operator's 3 Nov
  decision). Exception 2: the Hot Tub Repair & Servicing hub/pages may state servicing **"from
  £250, depending on your location"** (the operator's 4 Nov decision, restoring the price David
  already publishes on his live site).
- **Contact page** (`/contact/`): NAP, the quote form, WhatsApp, a map of the showroom. No opening
  hours exist in any source: leave hours off until David gives them.

## Brand: the approved look
**This is the approved look. David has already seen and liked it; use it as the real brand
reference, not a suggestion.** Two Cloudflare Workers previews:
- Preview 1: `https://site-cumbriaspires-preview.small-bird-3273.workers.dev/`
- Preview 2: `https://site-cumbriaspires-preview2.small-bird-3273.workers.dev/` (the one sent to
  David, who replied that it was "much improved from my site")

**Logo files** (Cumbria Spas' own wordmark: "cumbria" in navy over "spas" in sky blue):
| File | Where | What it is |
|---|---|---|
| `/logo.svg` | preview 1 | one-line SVG wordmark, Georgia serif: "cumbria" `#1d3b5c`, "spas" `#4aa8dc` (for light backgrounds) |
| `/logo-light.svg` | preview 1 | the same for dark backgrounds: "cumbria" `#ffffff`, "spas" `#5bb4e5` |
| `/images/square.jpg` | preview 2 header (56 px) | the stacked wordmark from the current site, 600 × 600 JPG; pixel-sampled "cumbria" `#273d5f`, "spas" `#50abdd` |

Preview 2 has no `/logo.svg` (both logo paths return 404 there); it uses `square.jpg`. The Wayback
Machine only has an older, different logo: do not use it.

**Palette, preview 2** (built from the logo: its navy and sky are the logo's own colours):
| Role | Hex | Used for on the preview |
|---|---|---|
| Primary dark | `#1c2f4b` | headings, footer slab, dark cards, dark buttons |
| Secondary dark | `#253c5e` | panels, links in body text, header phone number |
| Deepest ink | `#121f33` / `#0d1d27` | text on sky, body ink |
| Accent (CTA) | `#ff7a1a` | "Quick Quote Online" and every primary button; hover `#f26a0a`, deep `#c25200`, light `#ffa25e`, text on accent `#1a1208` |
| Highlight | `#4faadf` | ticks, chips, step numbers, link hovers; deep `#1c6ca3` |
| Backgrounds | `#f4f8fb` page, `#fdfefe` card, `#e2eef5` / `#cfe2ec` tints | |
| Font | Figtree | |

**Palette, preview 1** (same logo colours, a darker ink):
| Role | Hex | Used for on the preview |
|---|---|---|
| Ink (primary dark) | `#0b2a3b` | body text, headings, dark bands, default buttons |
| Primary | `#005680` | link and button hover, icons |
| Accent (CTA) | `#cc5500` | accent buttons, focus outline |
| Neutrals | `#f2f6f8` surface, `#5f6b72` secondary text, `#a7b3ba`, `#e4e4e4` outline | |
| Font | Rethink Sans (logo in Georgia) | |

Both previews share the logo's navy and sky. Preview 2 is the one sent to David; if it matters which
one he liked, ask him. The handoff's `accentHex` is `#ff7a1a` for preview 2 (`#cc5500` for
preview 1).

**Supplier badge logos** on the previews: Arctic Spas, `/images/arctic-artic-20spas-20logo.jpg`
(600 × 180); Kubilų pasaulis wood fired spas, `/images/wood-big-20logo.jpg` (960 × 402); Spa Boy,
`/images/arctic-spa-20boy-20logo.jpg` (preview 1). Not the Chill Gardens image (flag 8).

## Hub pages (9, locked by the operator's decisions, 3 and 4 Nov 2026; Arctic Spas Dealer awaits his ruling)
Each hub is a top-level page plus one SEO article per town ("<hub> in <Town>"). Order is the seed's
`services[]` order and the nav order: the four pinned hot-tub hubs first, then by search volume.

| # | Hub | URL | Leads on (UK searches/mo) | Note |
|---|---|---|---|---|
| 1 | Wood-Fired Hot Tubs | `/wood-fired-hot-tubs/` | wood fired hot tub (8,100) | the lead hub |
| 2 | Hot Tub Repair & Servicing | `/hot-tub-repair-and-servicing/` | hot tub repair (590) | residential and commercial, plant rooms, automated dosing |
| 3 | Electric Hot Tubs | `/electric-hot-tubs/` | electric hot tub (260) | |
| 4 | Hot Tub Installation | `/hot-tub-installation/` | hot tub installation (260) | |
| 5 | Swimming Pools & Swim Spas | `/swimming-pools-and-swim-spas/` | swimming pool (246,000); also swim spa (4,400) | one hub for pools and swim spas |
| 6 | Saunas | `/saunas/` | sauna (90,500) | |
| 7 | Arctic Spas Dealer | `/arctic-spas-dealer/` | arctic spa (480) | operator decision pending (flag 1) |
| 8 | Commercial & Mosaic-Tiled Spas | `/commercial-and-mosaic-tiled-spas/` | commercial hot tub (90) | mosaic-tiled and commercial spas, hydro spas, bespoke |
| 9 | Trade and Holiday Park Hot Tubs | `/trade-and-holiday-park-hot-tubs/` | hot tub trade suppliers (10) | B2B only |

Two titles run past 28 characters, Commercial & Mosaic-Tiled Spas (30) and Trade and Holiday Park
Hot Tubs (31), which pushes the town towards the truncation point in "<hub> in <Town>" article
titles. Both are the operator's names: shorten only if he agrees.

**Residential and commercial: one set of hubs.** No hub or article is split into commercial and
residential versions. Every hub page and every article says in passing that Cumbria Spas serves
residential and commercial customers of all types, from hotels to spas to leisure centres. No new
hubs for other hot tub types or brands: they are sub-topics within the relevant articles. Whether
the existing Arctic Spas Dealer hub stays is the operator's call (flag 1).

## Standalone pages (no town articles)
| Page | URL | What goes on it |
|---|---|---|
| Chemicals | `/chemicals/` | At the top: "Click here to see the updated Google Sheet of chemicals availability and pricing", placeholder link (`#`) until David supplies the sheet URL and product list. Body blank for now. Buying by contact only, with the standard call to action. |
| Parts | `/parts/` | At the top: "Click here to see the updated Google Sheet of parts availability and pricing", placeholder link. Body blank for now. Buying by contact only, with the standard call to action. |
| Reviews | `/reviews/` | Empty placeholder (flag 2). |
| About | `/about/` | "The business (About page)" under Product and service detail. |
| Contact | `/contact/` | See "Contact, calls to action and the WhatsApp button". |
| Terms and Conditions | `/terms-and-conditions/` | The current site's own text, word for word: `legal/terms-and-conditions.md`. |
| Privacy Policy | `/privacy-policy/` | The current site's own text, word for word: `legal/privacy-policy.md`. |

Chemicals, Parts and Reviews are new pages, not a redo of anything on the current site. They are in
`nap.json` `pages`, so they reach the seed as `type: "top-level"` hubs with empty `townCoverage`:
pages, never article series. The two legal pages are not in the seed: build them from the files.

## Legal pages: Terms and Conditions, Privacy Policy
The current site's own pages are already written and are the content: use them word for word, do
not rewrite them. `legal/terms-and-conditions.md` and `legal/privacy-policy.md` hold the text exactly
as the live site served it on 4 Nov 2026 (the build note in a comment at the top of each file is not
page content). One line is left out: a maroon "DO YOU NEED THIS?" above the live Terms, which is the
old web designer's note to David, not part of the terms. Four points for the operator and David to
decide; the text stays as it is until they do:
- **Privacy, clause 7 gives `info@cumbriaspas.co.uk`**, which is not one of the two mailboxes David
  listed (david@ and sales@); it came up only in passing, unconfirmed, on the 21 Oct call. The
  simplest fix that keeps the text unchanged: add info@ as another alias when Google Workspace is
  set up, live before launch. Otherwise change that one address to david@.
- **Terms, clause 3 says "Pricing for services is detailed on our website"**, and the new site
  publishes no prices.
- **Terms clause 2 and Privacy clause 3 describe hot tub repair and maintenance only**; the new site
  also sells hot tubs, saunas, spas, pools and swim spas.
- **Neither page mentions cookies.** That is fine if the site sets none beyond the strictly necessary
  (Cloudflare Web Analytics, for one, is cookie-free); if the build adds an analytics or marketing
  tool that sets cookies, the policy needs a line on it.

**Instruction for Vincent and his AI (operator, 4 Nov 2026):** use the live site's own wording as
the base for all three legal pages, don't rewrite it. Where the live pages are silent or thin
against what this build needs — cookies, hot tub/sauna/spa/pool sales rather than just repair,
no online prices, a proper cookie policy if one is needed — add the normal, standard template
language used for this kind of small trade site to cover the gap. Keep it generic and standard,
not specific claims about David's business beyond what the live pages already say.

## Images
**SEO articles: one shared bucket, no sorting.** All images from the three sources below go into one
shared pool in R2. They do not need sorting by article or by source first, any image from the pool
can illustrate any article where it fits (it need not match where it was originally sent), and the
R2 structure is the build's call.
- **Source 1: David's WhatsApp.** He has sent a lot of real images on WhatsApp (phone 447445450908,
  chat `447445450908@s.whatsapp.net` on the customer-service Whapi channel). Pull them via the Whapi
  API directly; don't wait for David to forward anything:
  `GET /messages/list/447445450908%40s.whatsapp.net?count=500` (send a real browser `User-Agent`
  header, or Whapi's Cloudflare WAF blocks the request with error 1010). Each image message has
  `image.link` (a direct download URL) and sometimes `image.caption` (useful context: some captions
  say what the photo shows). Download every one with a usable `.link`; a message with no `.link` was
  not auto-downloaded by Whapi at the time and cannot be recovered.
- **Source 2: the supplier PDFs.** The brochure PDFs have real schematic drawings and product photos
  embedded in them, not just text. Extract the images out of the PDFs too (not just the text already
  planned for the brochure sections) and add them to the same pool. Copyright notices: flag 7.
- **Source 3: David's own photos on the current site**: the Saunas page (11 photos), the Arctic
  Spas page (an Arctic Spa and the Spa Boy graphic), and the Small Spas and Wood Fired Spas pages, all
  under `https://www.cumbriaspas.co.uk/users/UserFiles/Image/`. **Download them before the domain
  moves**: the current site goes when it does.
- **Never in the pool:** screenshots of any kind (phone screens, emails, invoices, payment pages,
  logins, websites). The ten images David sent between 6 and 12 Oct 2026 are all screenshots, and
  later messages may hold more. Leave out anything the operator sent, and the Chill Gardens image.

**Hub pages: a few specific images each, chosen now as working placeholders.** Not random pool
images: each hub page gets two to four images picked for it, in the table below. Where nothing in the
sources fits, the table says to ask David directly, rather than guessing. **Some of these picks will
be imperfect at launch, and that is expected: David will review the hub-page images once the site is
live and correct them.**

| Hub | Picks (hero first) | Where to find them |
|---|---|---|
| Wood-Fired Hot Tubs | round charcoal-clad tub with chimney and steps, in a garden; square thermowood tub beside a house; the LED / AIR / HYDRO buttons; the digital TEMP thermometer | WhatsApp, 18 Oct: `rN1cpXK8v3ScO0LptFGW7w-hYL1AAIAsJs`, `rIRTz9biqTIUEeX9SQjoqg-he_1AAIAsJs`, `rO0KSTXCrlH9jPNFMoZlIw-hbb1AAIAsJs`, `rCVvBS9nx8gz7Nk3lJ4EMw-hQj1AAIAsJs` |
| Hot Tub Repair & Servicing | **ask David**: no source shows a service or repair in progress, which this hero must. Until then: jets running, close-up | WhatsApp, 18 Oct: `rNgnzD4RmCwTI7ksgWI9Ig-hdH1AAIAsJs` |
| Electric Hot Tubs | **ask David** for the electric version of the range. Until then: an Arctic Spa (an electric tub) in a garden | current site: `CUMBRIA%20SPAS/artic%20spa(1).jpg` |
| Hot Tub Installation | **ask David** for install photos (a tub going in on the HIAB). Until then: square wood-fired tub sited beside a house; round mosaic spa set into a deck | WhatsApp: `rDg_dIZZmv1Il16_a7KRxw-hXj1AAIAsJs` (18 Oct), `rECE8hpnevm197YJ7Gs31A-haX1AAIAsJs` (20 Oct) |
| Swimming Pools & Swim Spas | swim spa in a timber pool hall; indoor swim spa with handrails; mosaic swim spa lit at night. **Ask David** for a pool from the pool manufacturer | WhatsApp, 20 Oct: `rEitr_VLwt8K6lkzDyGr.A-hcT1AAIAsJs`, `rBK5Y8ULATuJz7QA73PUkQ-hfP1AAIAsJs`, `rNXdQQGCrI4sLn.Rx1xIAA-hcH1AAIAsJs` |
| Saunas | cube sauna with a lit glass front; barrel sauna on decking; the interior, benches and heater | current site: `sauna1.jpg`, `IMG-20260529-WA0094.jpg`, `IMG-20260529-WA0061.jpg` |
| Arctic Spas Dealer | an Arctic Spa in a garden; the Spa Boy graphic; the Arctic Spas badge logo. **Ask David** for Arctic Spas he has installed | current site: `CUMBRIA%20SPAS/artic%20spa(1).jpg`, `CUMBRIA%20SPAS/spa%20boy.jpg`; preview: `/images/arctic-artic-20spas-20logo.jpg` |
| Commercial & Mosaic-Tiled Spas | dark mosaic spa under a chandelier; commercial spa room with LED lighting; mosaic tile close-up | WhatsApp, 20 Oct: `rPHwh.hSwAQHc.qA_1hoMw-hTX1AAIAsJs`, `rPX1S_Wbp_AVCyZ5d444rg-hZH1AAIAsJs`, `rA3qIYy0abOkOM3vj70cIw-hTz1AAIAsJs` |
| Trade and Holiday Park Hot Tubs | wood-fired tubs lined up together; three tubs side by side; a hot tub and a sauna on decking | WhatsApp, 18 Oct: `rDqz78dGzRmZSbEmnEKQIA-hWf1AAIAsJs`, `rEYGDiE4H99bb2Lmtdn4cg-hY_1AAIAsJs`; current site: `IMG-20260529-WA0087.jpg` |

WhatsApp picks are named by the message `id` in the Whapi messages list. Current-site files are under
`https://www.cumbriaspas.co.uk/users/UserFiles/Image/`.

The hero image on every page must match what the visitor searched for: a wood-fired tub on the
wood-fired pages, and so on. Images can be mixed through the body.

## Video
- **David's own videos into a YouTube channel**: compile them into a channel the operator sets up and
  hands over, and embed them in articles. His videos are in the WhatsApp chat; ideas he has for more:
  craning a spa in, commercial pipework, start-to-finish installs.
- **Slideshow videos from his photos**: use an AI video compiler, or simply CapCut, to turn David's
  existing photos into slideshow-style videos. Either hand them to David to upload to his own
  YouTube, or produce and upload them as part of the build; then embed them in the relevant SEO
  articles, which helps SEO and engagement. **A nice-to-have production step, not a blocker:** the
  site and the articles go ahead without it.

## What to write, and what never to write
- **Usable claims** (`nap.json` `usps`, each with its source; the first three feature on the home
  page): try-before-you-buy showroom; wood-fired tubs heat in about 2 to 4 hours against 14 to 16
  for electric; Arctic Spas dealer installing alongside Arctic's engineer; residential and
  commercial repair and servicing including plant rooms; commercial and mosaic spas with plant
  rooms, automated dosing and glass filtration, installed in-house; bespoke CAD-designed mosaic
  spas; trade prices for holiday parks; dealer for a pool manufacturer that does not sell direct;
  videos and photos before you buy; established in 2013. Not affirmed: "Arctic has no Yorkshire
  dealer" (a fact about Arctic that may change: use in Yorkshire articles with care).
- **Approved wording for the manufacturer:** "Cumbria Spas works in partnership with Kubilų
  pasaulis, the largest manufacturer in Lithuania of premium, luxury and custom hot tubs." The
  operator approved it on 4 Nov for every page, articles included, reversing the earlier "not in SEO
  articles". That it is the largest manufacturer in Lithuania is the manufacturer's own claim and
  already on the current site (its wording there: "of premium wood fired hot tubs"); "premium, luxury
  and custom hot tubs" is the operator's wording. Attribute it to Kubilų pasaulis and never turn it
  into a claim about Cumbria Spas. Name the manufacturer; never tag it as just "a Lithuanian
  manufacturer". The standing superlative check may flag the sentence in an article; in this form it
  is approved.
- **Residential and commercial, in passing, everywhere:** every hub page and article says Cumbria
  Spas serves residential and commercial customers of all types, from hotels to spas to leisure
  centres.
- **Calls to action:** "Contact by the quote form, call now, or by WhatsApp." **Prices:** none on
  any page or in any article; "contact for prices" or "contact for a quote" (the Chemicals and Parts
  sheet links are the one exception).
- **What every article is for:** informing the reader with real technical detail, supporting the
  keyword, and presenting an established, professional, busy business. Nothing about staffing past or
  present, past advertising, or the business's own costs, margins and commissions, or how suppliers
  and subcontractors fulfil work behind the scenes. The customer-facing facts below stay (Arctic
  Spas installs with Arctic's own engineer, the trade terms).
- **Never** (the 24 standing prohibitions plus this site's own; the full list, word for word, is
  `seed.json` `negativeTopics`): any
  review, rating, testimonial or widget; a Google listing or Google reviews; the Chill Gardens image;
  the mosaic manufacturer's name or contact details, copyright notices included; any supplier's
  contact details; online checkout or card payment; a team of staff; "the only Arctic dealer"; any
  price (beyond the Chemicals and Parts sheet links); screenshots as images; a company or VAT number (none on file); invented warranties,
  insurance, opening hours, response times or qualifications.
- **The showroom location**: standing prohibition 10 says articles state the area served, not the
  base. The address is in the NAP and on the contact page; the home and hub pages can mention the
  showroom; SEO articles say "Cumbria Spas' showroom" without making it the article's location.
- Hub-by-hub writing notes are in `seed.json` `hubs[].contentNote` (from `nap.json` `hubContentNotes`).

## Product and service detail (article material)
All of it is usable as article material unless marked "background" or "do not publish". Where two
sources differ, both are given. Where each point comes from is in Section 2.

### The business (About page)
- Established in 2013. Has delivered hot tubs to customers throughout the UK.
- **He has supplied and serviced many holiday parks**, and set out to offer them something different
  from anyone else: the trade terms below.
- David does the installs, servicing and repairs. Never describe a team of staff; the current
  site's "dedicated team of skilled experts" line is not carried over (a site prohibition says so).
- Much of the work comes by word of mouth, and he has regular customers going back years.
- **How he sells.** Customers prefer WhatsApp to email; he sends buyers videos and photos of the
  actual product, the buttons and the lights. A buyer chose him over several companies because he
  "got more information out of me". Visitors can try a tub at the showroom before buying.
- **Shows.** He shows a tub and a sauna at local shows. At one he sold five wood-fired tubs to a
  holiday-let owner with 17 outlets, who is looking at more. Background, a good About story; shows
  are not his main channel.

### Wood-fired hot tubs (Kubilų pasaulis)
- **The manufacturer.** Cumbria Spas works in partnership with Kubilų pasaulis, the largest
  manufacturer in Lithuania of premium, luxury and custom hot tubs (the approved wording above), and
  David deals with it directly. It makes the wood-fired tubs, the electric tubs and the saunas. David
  chose it for its quality and for "a lot more peace of mind": a conscientious manufacturer with
  fantastic quality that puts quality customers ahead of volume.
- **How it builds them** (its own page on the current site): the acrylic inserts and the stainless
  steel stoves are made in-house; every tub is filled with water and tested before it leaves, with
  every system checked working and watertight; each order is inspected by a quality specialist
  before it ships; buyers choose the tub shape and size, liner colour, stove type and wood type (an
  online configurator); filtration is by sand filter and UV lamp; and buyers choose where the water
  and air massage jets go and how strong they are.
- **What sells**: the main seller has hydrotherapy jets and LED lights, so it is not off-grid; the
  completely off-grid starter model (no electricity at all, popular with lodge parks and glamping
  sites) is a very small share of the market. Lead with the jets and lights model.
- **Electrics**: a standard 13-amp socket runs the hydro jets and lights only; the stove does the
  heating, so no special supply is needed.
- **Heat-up**: about 2 to 4 hours to around 38°C (the current site); a 2-metre family tub in hard
  winter takes about two hours, against 14 to 16 hours for an electric tub (David). Once near 35°C,
  stop adding wood or it keeps climbing.
- **Temperature control**: the stove has an open and closed vent, open to draw heat, shut to slow
  it; stop adding wood and it does not crash, it is still warm in the morning. A digital thermometer
  on the outside shows the exact temperature. Standard electric tubs are governed to 40°C; body
  temperature is 36.7°C, most people like about 38°C in autumn and 40°C in hard winter. This answers
  the commonest fear about wood-fired tubs: worth its own article.
- **Jets and lights**: 10 to 12 hydrotherapy jets and a couple of LED lights.
- **Sizes and models**: a 172 × 202 cm tub; a two-person tub; the 2.2 m model David has himself. The
  small spa (the current site's "Small Spas"): grey metallic acrylic insert, external AISI 304
  stainless steel heater, chimney with burn-protection shield, 8 hydro-massage jets, 50 mm LED light,
  digital thermometer, drainage valve and overflow fitting, impregnated C24 structural frame, foam
  insulation, 90 mm thermowood cladding, step included.
- **Prices**: contact for prices.
- **Keep these advantages** (the current site's own, confirmed by the operator): renewable wood heat
  and less reliance on electricity; off-grid use; the traditional bathing experience with the
  natural aroma of burning wood; lower running costs with your own wood.

### Electric hot tubs
The same tub shapes come in electric and wood-fired versions from Kubilų pasaulis. The trade-off is
convenience against heat-up time (14 to 16 hours from cold) and the 40°C governor. Little else is in
the sources: keep the hub to what is here, and cross-link the wood-fired and Arctic Spas hubs.

### Hot Tub Repair & Servicing
**Articles: "Hot Tub Repair and Servicing in [Town]"**, for people searching "hot tub repair
<town>" and "hot tub servicing <town>". Leads on "hot tub repair"; also targets hot tub repairs, hot
tub maintenance, hot tub service / services / servicing, spa servicing and hot tub engineer (and
"servicing", absorbed as a variant), with hot tub leak repair, spa repair, hot tub pump repair and
hot tub chemical balancing as smaller measured phrases. Volumes are in Section 2.

What it covers, with what the sources give for each:
- **Residential and commercial hot tubs.** Coverage wording: Cumbria, North Lancashire and North
  Yorkshire (the current site); "Service and repair is covered in Cumbria and Yorkshire" (David).
  David services a customer in Bedale, North Yorkshire, and has serviced and repaired hot tubs at a
  holiday park in Ballycastle, Northern Ireland.
- **What a service involves** (the current site's own nine steps, usable nearly as written): leave
  the old water in; a hot tub flush is added and the jets run on full power for 45 minutes to clean
  the pipes and bacteria from the water lines; the tub is emptied and the footwell vacuumed; clean
  water is sprayed over the seats and vacuumed again; every jet is vacuumed to clear old water from
  the lines; the shell, lid and steps are cleaned; the filters are inspected and cleaned, with new
  filters charged if the old ones are not fit to go back; refill and chemical balance. Up to three
  hours. No price: contact for a quote.
- **Year-round maintenance**: the current site offers "Year-Round Maintenance Packages" ("regular
  check-ups prevent costly repairs"). No package details exist in any source: name the offer, invent
  nothing about it.
- **Why tubs need it now** (David): hot tub sales boomed in lockdown and nobody had them serviced, so
  "six, seven years on" those tubs are leaking and in a bit of a state, and he has been busier with
  servicing this year than for about four years. True, specific, and the best article angle for this
  hub ("why is my hot tub leaking", "how often should a hot tub be serviced").
- **Automated pH balancing and chemical dosing** (what David described): people ask him for a
  domestic hot tub with an automatic chemical system, but standard domestic tubs do not come with
  one; automated dosing comes with a commercial spa and its plant room, which can still be sold to a
  homeowner. Sorting the chemicals out is one of the main pains of owning a tub, so this is a strong
  hook. The one domestic route to automated water care is Arctic Spas' **Spa Boy** saltwater system
  (the current site: medical-grade sensors continuously analyse the water, sanitisation adjusts
  automatically, pH alerts reach the control panel, the myarcticspa.com portal and the app, with a
  "Boost" button). So write "standard domestic tubs need manual chemical balancing", never "no
  domestic tub can do it".
- **Filtration** (David, on the commercial spas and plant rooms he installs): many systems still use
  sand filters, where the sand is changed about every two years; Cumbria Spas fits glass (pearl
  glass) filtration, changed about every ten years, with better water quality and roughly half the
  backflushing, saving time and water. (The wood-fired range's own filtration is a sand filter with a
  UV lamp, per its manufacturer.)
- **Plant-room maintenance and repair** for commercial spas: David installs spas and plant rooms
  himself, where many of the mosaic manufacturer's dealers only resell and leave the install and plant
  room to the manufacturer, and he services and repairs plant rooms.
- **Parts for repairs**: David sources pumps, heaters and other parts, checks availability, can hold
  a part and ship it. Self-fit buyers use the Parts page.
- **Installation, briefly**: most of the business is installs; this hub is the repair and servicing
  angle, so mention installation and link `/hot-tub-installation/`.
- Hero image: a service or repair in progress, not a new tub (none in the sources yet: see Images).

### Hot tub installation
- Installs are most of the business.
- A wood-fired tub arrives by 4x4 and trailer and is lifted into place with a HIAB crane.
- An Arctic Spa is installed with one of Arctic's own engineers.
- Commercial and mosaic-tiled spas are installed in-house, plant room included.
- Trade orders to holiday parks are supplied without installation.

### Saunas
From Kubilų pasaulis, the wood-fired range's manufacturer. The current site's large sauna: spruce
exterior (45 × 90) oiled outside, alder benches inside, heater Cozy 12 or TW 12 "with BlmSch V2
certification" (the current site's spelling), tempered 8 mm tinted glass front panels and 8 mm
doors, Harvia chimney, black bitumen shingle roof, LED lights inside (under the benches) and outside,
and an accessory set (thermometers, sand timer, ladle with bucket, sauna stones). A smaller sauna is
220 × 220 cm. Saunas count towards the three-unit trade minimum. The current site's sauna photos
also show a Harvia electric heater with a wall controller: whether an electric option is offered is
an open item, so do not write about one yet. Not in any source: other sizes.

### Arctic Spas
- Cumbria Spas is an Arctic Spas dealer, able to sell, install, supply and maintain them; the current
  site shows "Arctic Spas Cumbria, Hot Tub & All Weather Pool Showroom in Kirkby In Furness" and the
  ranges at arcticspascumbria.co.uk. High-end, a good product with very few issues.
- Each Arctic Spa is installed by David with one of Arctic's own engineers.
- Arctic has no dealer in Yorkshire: a fact for Yorkshire articles, never "the only dealer".
- Arctic's saltwater swim spa belongs on the Swimming Pools & Swim Spas hub; Spa Boy automated
  saltwater care is under Hot Tub Repair & Servicing.
- Arctic is not positioned against the wood-fired range: do not write the two as rivals.

### Commercial & mosaic-tiled spas
- **The manufacturer** (Cheshire Wellness, whose range and brochure are Cheshire Spas & Pools; never
  named on the site, copyright notices included): a UK manufacturer of
  mosaic-tiled spas, pools and swim spas that David had wanted to deal with for some time and which
  has made him a dealer; its brochure is rebranded to Cumbria Spas Ltd. **Family-run since 1965**,
  with ongoing hotel contracts; high quality, and reliable on timings: "if they say it's going to be
  10 weeks, it'll be 10 weeks". Lead times are 6 to 10 weeks on most orders. "Family-run since 1965"
  is said of the manufacturer, never of Cumbria Spas (established 2013).
- **Who it is for**: residential, commercial and B2B: holiday parks, hotels, spas and leisure
  centres. David wants those words on every page.
- **Plant rooms**: most of the range runs from a plant room; some domestic models have the plant
  built in, and one has an exposed side showing the heater and pumps, for a homeowner who wants a
  mosaic-tiled spa instead of acrylic without a plant room's cost and space.
- **David's difference**: many of the manufacturer's dealers only resell, and the manufacturer
  supplies, installs and does the plant room; "we can do all that ourselves", spas, plant rooms and
  the install. "That's the difference really", and the way forward for the business.
- **Hydro spas**: multi-use spas for spa-day venues and hotels, from about 4 m × 3-3.5 m up to about
  5.5 m × 4.5 m, holding 15 to 20 people at once. A section of this hub, not its own page.
- **Bespoke**: specific dimensions or a specific space can be designed for, with the manufacturer's
  CAD drawings; customers may not know bespoke is possible, so say it.
- **Swim spas** have their own hub, Swimming Pools & Swim Spas: cross-link it.

### The mosaic range's build and specification (supplier brochure)
**Cleared for use** (flag 7). These are the manufacturer's claims about its range: attribute them to
the range ("each spa in the range is..."), never as Cumbria Spas' own accreditation.
- **Construction and Specification presentation** (22 pages): design and manufacture of standard
  and bespoke pre-plumbed fibreglass (GRP) and gelcoat mosaic-tiled spas and pools; a complete
  in-house service from CAD studio design to mould making, production and installation; ISO
  9001:2015 certified; a 30,000 sq ft production facility.
- **GRP against concrete** (a ready-made comparison article, and comparing generic types is
  encouraged): a concrete spa with rendering, tiling and plumbing takes 12-14 weeks on site
  depending on conditions; a finished GRP spa installs in a fraction of the time, sometimes a single
  day. Concrete carries a higher leak risk; every GRP spa is water-tested in the factory, which
  avoids costly repairs after backfilling. GRP allows profiled seat backs, contoured benches and
  curves, and clients have visited the factory to try moulds. GRP has a high strength-to-weight
  ratio, resists temperature and chemicals, and needs no allowance for thermal shock; it is made in
  controlled conditions, unaffected by weather, site constraints or other trades.
- **Build**: marine-grade, Lloyd's-approved gel coat, the first waterproof barrier against osmosis
  and the surface the tiles bond to; first fibreglass layer in vinylester barrier resin, then
  high-strength layers to a shell of about 10-12 mm; stainless steel 50 × 50 mm box-section frame
  with adjustable legs and gimballed foot pads; two-part high-density polyurethane foam insulation,
  typically 20 mm (10-20 mm by the drawings).
- **Tiling**: a two-component, water-impermeable, rapid-curing flexible polyurethane adhesive (a
  second waterproof layer); standard 25 mm mosaics from Waxman Niebla and Ezarri Niebla included;
  hundreds of alternatives; customers' own tiles if suitable for GRP; large-format tiles fitted
  before; a bespoke service with logos or crests, matched décor, digital designs and a 3D render,
  popular with hotels and wellness centres. Grout: two-part epoxy, white as standard or any Mapei
  Kerapoxy colour.
- **Range**: 31 standard moulds (11 Freeboard-Skimmer, 9 Deck Level-Overflow, 4 Hydro Spa-Deck
  Level, 7 Swimspa-Freeboard) plus fully bespoke designs. Jets: cluster, micro and standard massage
  jets, each seat configurable for back or legs. Flange option below the top edge at no extra cost.
- **Plumbing and testing**: plumbing terminated anywhere, with or without equipment (own equipment
  accepted), spa pack supplied separately, a custom plinth for the equipment; every spa filled and
  water-tested for 24 hours and signed off only with no leaks; a 70-point quality checklist; a
  transport frame on request; split spas made in fully tiled and plumbed sections with a 4" recessed
  joint, bolted and fibreglassed together on site for access-restricted installs.
- **Order process**: signed order, tile order and drawings (GRP, steelwork, fittings); tile, grout,
  pipe termination and flange choices; standard pipe sizes 2" returns and suctions, 1.5" air ring.
- **Drawings** (11 sheets): 2.4 m round spa, 2400 mm "Martinique" (a domestic spa), 1.9 m round
  freeboard spa, 1900 "St Lucia" (10 Polyjets, 10 air jets, a 50 W light, a skimmer, 0.947 m³ of
  water, 6.25 m² of tiles), 6.0 m "Puerto Rico" swim spa, 7 m × 3 m swim spa. Whether to keep the
  model names is David's call.

### Swimming pools & swim spas
One hub for both.
- **Pools**: Cumbria Spas is a dealer for a Yorkshire swimming pool manufacturer that does not sell
  direct to the public, and David works on the installation. Pools can go anywhere in the country.
  David also does small pools, and has photos of mosaic-tiled and bespoke pools.
- **Swim spas**: GRP mosaic-tiled swim spas from the mosaic range (7 swim spa moulds among its 31;
  drawings for a 6.0 m "Puerto Rico" and a 7 m × 3 m model), built and water-tested like the mosaic
  spas, with the manufacturer never named; and Arctic Spas' saltwater swim spa.
- **A long decision**: an end-user swim spa sale takes a long time, close to a year, so nurture copy
  should inform rather than promise speed.

### Trade and holiday park hot tubs (B2B)
- **Who qualifies**: a British company registered at Companies House, VAT registered, ordering at
  least three units, mixable (two hot tubs and a sauna counts). For holiday parks, lodge and glamping
  sites and letting businesses (the current site: "a new hassle free and economic way for holiday
  parks and small sites to buy our wood fired tubs at trade prices").
- **Experience**: David has supplied and serviced many holiday parks.
- **Terms**: priced in euros at trade rates (contact for prices); delivered to the buyer's site;
  the buyer arranges lifting off; a parts-only warranty, no labour, because Cumbria Spas does not
  install trade orders.
- **Servicing afterwards**: one trade buyer of three tubs now has four and is looking at more, and
  David services them.
- **VAT** (David's explanation, to be checked by David or an accountant before it is published as
  advice): both businesses being VAT registered, VAT does not transfer between the two countries on
  the import, which helps the buyer's cash flow.
- Other hot tub types for holiday parks are sub-topics within these articles.

### Chemicals and parts (background for the two pages)
- **Chemicals**: a full range, ordered in small quantities (down to a single pack) and shipped to the
  customer. Local water is soft and needs few products, but hard-water customers need a wider range,
  so the list will be long, "a full spreadsheet almost". Prices and availability go on a Google Sheet
  anyone can view and only David can edit.
- **Parts**: pumps, heaters and other parts for people who want to fit a part themselves: David
  checks availability, holds the part, takes payment and ships it.
- No e-commerce: David prefers to invoice.

## Towns (reference): 100 in the plan
Every settlement of 1,000+ people within **50 miles straight-line** of Kirkby-in-Furness (130, base
included), plus the two named towns beyond it (Bedale, Ballycastle) = **132**. The budget is 900
articles ÷ 9 hubs = **100 towns**, kept by population and published nearest-first, with the pinned
towns first and never cut. The radius reaches well into Lancashire and North Yorkshire, as expected.

**Publish order**: 1-6 pinned (the base, then the towns David named, nearest first), then proximity.
1 Kirkby-in-Furness (base) · 2 Barrow in Furness 8.5 mi · 3 Kendal 18.9 · 4 Keswick 25.5 · 5 Bedale
64.5 · 6 Ballycastle 139.2 · 7 Askam in Furness 3.2 · 8 Millom 3.7 · 9 Ulverston 4.5 · 10 Haverigg 4.8
· 11 Dalton in Furness 5.2 · 12 Grange-over-Sands 11.1 · 13 Arnside 14.4 · 14 Windermere 15.3 · 15
Ambleside 16.6 · 16 Milnthorpe 16.9 · 17 Morecambe 17.4 · 18 Heysham 17.7 · 19 Warton 18.1 · 20
Carnforth 18.3 · 21 Bolton le Sands 18.3 · 22 Lancaster 20.3 · 23 Halton 20.4 · 24 Caton 21.8 · 25
Egremont 21.9 · 26 Fleetwood 22.4 · 27 Galgate 23 · 28 Preesall 23.5 · 29 Cleator Moor 23.9 · 30
Kirkby Lonsdale 23.9 · 31 Bay Horse 24.7 · 32 Cleveleys 25.2 · 33 Thornton-Cleveleys 25.7 · 34
Whitehaven 27.1 · 35 Sedbergh 27.4 · 36 Garstang 28.4 · 37 Poulton-le-Fylde 28.8 · 38 Blackpool 29.3 ·
39 Ingleton 29.6 · 40 Fylde 29.7 · 41 Catterall 29.8 · 42 Cockermouth 30.5 · 43 Workington 31.8 · 44
Kirkham 33.6 · 45 Penrith 34.6 · 46 Lytham St Annes 34.7 · 47 Dearham 34.7 · 48 Maryport 35.5 · 49
Freckleton 35.5 · 50 Longridge 36.5 · 51 Appleby-in-Westmorland 36.8 · 52 Aspatria 37.3 · 53 Preston
37.9 · 54 Settle 38.5 · 55 Banks 39.5 · 56 Clitheroe 40.7 · 57 Tarleton 40.8 · 58 Wigton 40.9 · 59
Southport 41.2 · 60 Leyland 42.2 · 61 Langho 42.2 · 62 Whalley 42.5 · 63 Clayton-le-Woods 42.6 · 64
Croston 42.8 · 65 Blackburn 43.9 · 66 Euxton 44.1 · 67 Great Harwood 44.2 · 68 Silloth 44.7 · 69
Rishton 44.9 · 70 Eccleston 45 · 71 Brinscall 45.1 · 72 Clayton le Moors 45.8 · 73 Barnoldswick 46 ·
74 Padiham 46.2 · 75 Burscough 46.2 · 76 Denton Holme 46.2 · 77 Church 46.4 · 78 Chorley 46.5 · 79
Formby 46.8 · 80 Carlisle 46.9 · 81 Hapton 47 · 82 Coppull 47.1 · 83 Scotby 47.1 · 84 Gargrave 47.1 ·
85 Accrington 47.2 · 86 Darwen 47.2 · 87 Great Corby 47.2 · 88 Parbold 47.4 · 89 Barrowford 47.5 · 90
Ormskirk 47.6 · 91 Earby 47.7 · 92 Brierfield 47.9 · 93 Nelson 48.6 · 94 Colne 48.8 · 95 Burnley 48.9
· 96 Adlington 48.9 · 97 Appley Bridge 49.1 · 98 Hightown 49.2 · 99 Grassington 49.4 · 100 Shevington
49.8

By county: Lancashire 55, Cumbria 32, North Yorkshire 5 (Bedale, Ingleton, Settle, Gargrave,
Grassington), Sefton 3, Blackburn with Darwen 2, Blackpool 1, Wigan 1, Northern Ireland 1.

**Towns David named, all pinned:** Barrow in Furness (8.5 mi), Kendal (18.9), Keswick (25.5), Bedale
(64.5, beyond the radius) and Ballycastle (139.2, beyond the radius). Belfast, York and the Isle of
Man are deliberately not targeted (Section 2 says why).

**Major Cumbria towns, all in**: Carlisle, Barrow in Furness, Kendal, Whitehaven, Workington,
Penrith, Ulverston, Maryport, Cockermouth, Dalton in Furness, Windermere (the gazetteer has no
separate Bowness entry; Windermere is the town record), Cleator Moor, Egremont, Millom, Wigton,
Grange-over-Sands, Keswick, Ambleside, Appleby-in-Westmorland, Kirkby Lonsdale, Sedbergh, Arnside,
Milnthorpe, Silloth and Aspatria among 32 Cumbrian places.

**Cut by the budget** (32, smallest first out; `seed.json` `articleCap.dropped`): Seascale 1,754 ·
Frizington 1,737 · Flimby 1,707 · High Bentham 1,680 · Great Eccleston 1,657 · Saint Bees 1,644 ·
Wetheral 1,605 · Great Marton 1,603 · Kirkby Stephen 1,522 · Hameldon Hill 1,500 · Billington 1,458 ·
Distington 1,445 · Hellifield 1,426 · Sabden 1,422 · Rufford 1,420 · Goosnargh 1,398 · Staveley 1,384 ·
Wrea Green 1,373 · Silverdale 1,326 · Flookburgh 1,305 · Dalston 1,285 · Shap 1,264 · Red Scar 1,244 ·
Burgh by Sands 1,176 · Foulridge 1,159 · Alston 1,105 · Chatburn 1,102 · Elswick 1,079 · Swarthmoor 1,076
· Overton 1,069 · Waddington 1,028 · Burneside 1,017. See flag 5 for how to keep them.

Gazetteer names to know: "Fylde" (76,500) is the borough, "Denton Holme" a district of Carlisle,
"Great Marton" part of Blackpool, "Hameldon Hill" a hill (cut anyway). They are the dataset's own
records; leave or drop them as the operator prefers.

## The article budget
**9 hubs × 100 towns = 900 articles**, the standing budget, applied (`seed.json` `articleCap`). The
standalone pages, About and Contact add no articles.

## Open items (not in any source: ask, do not invent)
- The Arctic Spas Dealer hub: keep or drop (flag 1, the operator's call).
- The 13 Oct call: read it into the plan or not (flag 9), including the pool-dealer claim, Barnard
  Castle, the plant-room partnership and David's comment on the preview's colours.
- Where quote-form enquiries go on launch day. The domain's mail is broken until Google Workspace is
  live, so the operator confirms a destination that works from day one.
- GBP creation (flag 3) and review collection (flag 2).
- Hub-page photos only David can supply: a service or repair in progress, the electric range, an
  install, a pool from the pool manufacturer, Arctic Spas he has installed (Images).
- The legal pages: the info@ address, and whether the Terms' pricing clause and the repair-only
  wording in both pages should change (Legal pages). The text stays word for word until he decides.
- Opening hours; any warranty terms for retail sales; insurance; any qualifications.
- The VAT and trade wording, checked by David or an accountant.
- The sauna range beyond the two listed, and whether an electric sauna option is offered.
- The chemicals list and Google Sheet URL; the parts sheet URL.
- Keep or rename the mosaic range's model names (Martinique, St Lucia, Puerto Rico).
- Which preview palette David preferred, if it matters (Brand).
- Getting the media into R2: the WhatsApp images via Whapi, the 12 PDFs, and the current site's
  photos before the domain moves.
- Whether Bedale and Ballycastle stay, and whether to keep the six nearby villages (flags 4 and 5).

---

# SECTION 2 — ADDITIONAL INFO (records and reference; not needed to build)

## Status and history
- Client: David Hughes ("Dave"), Cumbria Spas (legal name Cumbria Spas Ltd).
- Rebuilt on 3 Nov 2026 to the operator's nine decisions of that evening (D-2026-11-03-15). On 4 Nov
  2026 the operator added the image-retrieval instructions and the A2A/domain and Google Workspace
  note, then the content-and-structure pass (D-2026-11-04-01), which also split this file into
  Section 1 and Section 2.

## The 4 Nov 2026 content-and-structure pass (D-2026-11-04-01)
- **Hubs.** Saunas was already a hub (`/saunas/`, 100 town articles) and is unchanged: no second one
  was added. Swimming Pools & Swim Spas (`/swimming-pools-and-swim-spas/`) replaces Swimming Pools
  (`/swimming-pools/`) and takes swim spas out of the commercial hub, which becomes Commercial &
  Mosaic-Tiled Spas (`/commercial-and-mosaic-tiled-spas/`, was
  `/commercial-and-mosaic-tiled-spas-swim-spas/`); with "swim spa" gone it leads on "commercial hot
  tub" (90/mo). Trade & Holiday Park Supply (`/trade-and-holiday-park-supply/`) is renamed Trade and
  Holiday Park Hot Tubs (`/trade-and-holiday-park-hot-tubs/`), the operator's exact words. All three
  are title-locked in `services-override.json`, and the three old names are in its `drop`. 9 hubs
  before and after, so the budget is unchanged at 900 = 9 × 100 and the town list is identical.
- **Spend: $0.00.** Every phrasing the three hubs use was already priced. The three new titles as
  exact phrases ("swimming pools and swim spas", "commercial and mosaic tiled spas", "trade and
  holiday park hot tubs") are unpriced, about $0.09 to price, not bought; nothing is decided on them.
- **One hub or two for pools and swim spas:** built as one, as instructed. No case was found to
  split: both are big-water purchases, buyers weigh one against the other (a 21 Oct enquiry looked at
  a pool first and moved to a swim spa), and "swim spa" is a variant the hub targets. If it is ever
  revisited: "swim spa" (4,400/mo) is a buying phrase in its own right, while most of "swimming
  pool"'s 246,000/mo is people looking for a public pool.
- **"Commercial" stays in the commercial hub's title.** It names a product line (commercial-grade
  spas with plant rooms), not a commercial/residential split of another hub, and "commercial hot tub"
  is its lead phrase. If the operator would rather it read "Mosaic-Tiled Spas", that is one rename.
- **Content.** Every price figure, and every line about the owner's own costs, margins, commissions,
  supplier or outsourcing arrangements, was removed from this file, `nap.json` and the seed's content
  notes, not moved here, by instruction. Background lines that did not serve the articles were
  removed by instruction too. The holiday-park line now reads "supplied and serviced many holiday
  parks", for volume and experience. The reason given in the 3 Nov plan for the Chill Gardens change was removed: Chill Gardens
  is a fantastic supplier, and its image is not used by the operator's choice. "The Lithuanian
  manufacturer" became Kubilų pasaulis by name, with the approved "largest manufacturer in Lithuania"
  wording, reversing the 3 Nov plan's "not in SEO articles". The CAD drawings and brochure are cleared
  (the 3 Nov flag asked David to confirm; he has, and the manufacturer confirmed it to him). Every hub
  content note now carries the residential-and-commercial line, the standard call to action and
  "contact for prices". The site prohibitions went from six to ten (prices; the owner's costs and
  arrangements; anything suggesting the business has scaled down; screenshots), and the Chill
  Gardens, mosaic-manufacturer and staff ones were reworded. Also new: hosting stated as Cloudflare
  static with nothing to match, the WhatsApp button, the legal pages fetched word for word, the
  hub-page image picks, the slideshow video step and the note for Vincent.
- **"Roma".** The operator's list of advantages to keep included "the traditional 'Roma' sauna-style
  heat experience". Read as the current site's "the traditional bathing experience with the natural
  aroma of burning wood", which is the wording kept.
- **Pages fetched on 4 Nov.** The current site's Terms and Conditions, Privacy Policy and "About
  Kubilų pasaulis" pages were not in the 2 Nov crawl and were fetched on 4 Nov at 14:06 UTC (HTTP 200
  each). The About page says "the largest manufacturer in Lithuania" and "the largest hot tub factory
  in Lithuania"; the Wood Fired Spas page says "the largest manufacturer in Lithuania of premium wood
  fired hot tubs". The approved wording ("premium, luxury and custom hot tubs") is the operator's.
  The About page's build detail is now under Wood-fired hot tubs in Section 1.
- **Hub-page images.** The 120 recovered WhatsApp images and 17 product photos from the current
  site were looked at on 4 Nov and the picks in Section 1 chosen from them.
- **After the first swarm run (14:30 UTC).** Fixed in response to its findings: `services-override.json`
  carried the `drop` key twice (the later, complete list was the one read; the duplicate is gone);
  the hub section said brands are never hubs while keeping the Arctic hub (now: no new brand hubs,
  the Arctic hub is the operator's call); "no prices" now says it covers pages and articles, with the
  Chemicals and Parts sheet links as the one exception; the prohibition on supplier arrangements now
  names behind-the-scenes fulfilment and keeps the customer-facing facts (Arctic installs with
  Arctic's engineer, the trade terms), and the trade terms say "delivered to the buyer's site"; the
  copyright-notice rule and the "premium, luxury and custom" wording are attributed to the operator;
  "himself" is gone from the installs lines; the 13 Oct call is recorded (flag 9) and the quote-form
  destination is an open item.

## Operator to-dos: domain, email, Google, reviews
- **Domain and old site**: with A2A Internet (`www.a2a.co.uk`, run by Andrew, named on WhatsApp
  6-12 Oct; no direct contact details on file). The operator will get them and contact Andrew
  separately to move the domain across (WhatsApp 6 and 12 Oct: the operator handles A2A).
- **Email**: the operator will help David set up Google Workspace once the domain moves: david@ the
  primary mailbox, sales@ an alias into the same inbox (the operator's 6 Oct WhatsApp with David), old
  mail migrated (WhatsApp 6 Oct; 21 Oct call). David's priority is that opening email is easy. It
  replaces whatever mail setup A2A has, and is separate from migrating the website. If the Privacy
  Policy keeps info@, add it as an alias as well.
- **MX record**: the live site's MX record is broken (it points at itself, with no real mail server
  behind it). Worth flagging to David directly, whatever the Workspace timing.
- **Google Business Profile**: the operator has told David to create one and he has not yet. When it
  exists: the new site's URL on the listing, `gbp.mapsUrl` and `gbp.cid` into `nap.json`, re-run.
- **Reviews**: the operator will get David to collect some. David has a letter from holiday guests
  about one of his tubs (WhatsApp image, 29 Sep): it is not a review on a platform and is not to be
  published as one, but it is a lead for the review collection.

## Sources and provenance
Every source read for this plan: in full on 3 Nov 2026, plus what was fetched on 4 Nov. The 13 Oct
call is listed last: it exists and has not been read into the plan (flag 9).
| Source | Where | Size | Used for |
|---|---|---|---|
| 14 Aug 2026 discovery call, phone recording transcript | `Call --[14-08-2026][17-41-19].txt` (Drive file `1Dy-Wiod7Iqty4Aaj7_LGm6YCbOcUzfxb`; local `/root/work/call-search/acr/`); NOT in saleshq | 91,087 chars | the business, wood-fired detail, trade model, pools, Arctic, servicing |
| 14 Aug 2026 Google Meet notes (Gemini) | saleshq `corr_calls` `call_1a0018287bad5c2a` | 2,797 chars | next steps: the Chill Gardens image off the site, WhatsApp button, SEO articles |
| 29 Sep 2026 call (Wispr) | saleshq `call_wispr_20260929_seo-cumbria-spas` | 375 chars (a summary; no transcript exists) | new site + one year of articles; mockup; future profit share |
| 21 Oct 2026 catch-up call after the PDFs | saleshq `call_drive_cumbria-spas-20261021` | 33,412 chars | commercial range, dosing, glass filtration, plant rooms, hydro spas, bespoke, chemicals, parts, images, video, hosting |
| WhatsApp, 12 Aug - 4 Sep 2026 | saleshq `corr_messages`, channel `whatsapp_cs` | 35 messages | the Kubilų pasaulis supply and trade terms, Ballycastle, shows |
| Emails, 12 Aug 2026 | saleshq `corr_messages` `m_19ff5de212538c04`, `m_19ff69f667e5dfb9` | 2,306 and 3,510 chars | David's own service list and coverage; FatRank enquiry (Cumbria Spas Ltd) |
| WhatsApp, 29 Sep - 21 Oct 2026 | Whapi export `/root/work/cumbria-spas-media/all_messages.json`; NOT in saleshq | 460 messages, 159 with text | new-site agreement and sign-up, preview link, hosting and email, off-grid correction, chemicals, manufacturer lead times, the PDFs |
| Supplier brochure PDFs | `/root/work/cumbria-spas-media/pdfs/` (12 files) | 22-page presentation + 11 drawings | the mosaic range's build and specification |
| Live site crawl, 2 Nov 2026 | `sites/cumbriaspas.co.uk/wayback/` (8 pages; `verbatim-copy.md`) | all 8 pages | servicing steps, sauna and small-spa specs, Arctic and Spa Boy, Kubilų pasaulis, coverage wording |
| Live site pages, 4 Nov 2026 | `?Contact_Us:Terms_and_Conditions`, `?Contact_Us:Privacy_Policy`, `?Wood_Fired_Spas:About_Kubil%C5%B3_pasaulis` | 3 pages | the legal pages (`legal/`); the manufacturer's wording and build detail |
| Live site product photos, 4 Nov 2026 | `/users/UserFiles/Image/` (Saunas, Arctic Spas, Small Spas, Wood Fired Spas pages) | 17 images | hub-page picks |
| Preview pages | the two workers.dev URLs, fetched 3 Nov 2026 | HTML, CSS, logos | Brand |
| 13 Oct 2026 call, "manufacturer/plant room partnership discussion" | saleshq `call_drive_VN.-[13-10-2026][17-08-40]` | 32,258 chars | NOT READ INTO THIS PLAN: found by the 4 Nov swarm (flag 9) |

- **Brochure provenance**: two different things. Its claims are the manufacturer's own and were not
  independently verified; the operator ruled on 3 Nov that they are fine to use as written,
  attributed to the range. Permission to reuse it is settled: on 4 Nov the operator recorded that
  David has full authority from the manufacturer to reuse its content, drawings and images under his
  own name, confirmed by the manufacturer to David. Cite it like any other source.
- **Voice notes, not used**: six in saleshq have no transcript and cannot be recovered
  (`wam_pSr7zVKkxbPFzmThcVJ1Iw-xSD1AAIAsJs`, `wam_rGaxhgVpvnIsC53cOvDlZg-hXD1AAIAsJs`,
  `wam_pYdQ1izLmA_t9ZOvWrjQEQ-xdT1AAIAsJs` on 12 Aug; `wam_PrD0cQAUmo_AsYg-xW_1AAIAsJs`,
  `wam_PrBP3oXjuukk6K8-xYX1AAIAsJs`, `wam_PrBTlGev5gH5ZJc-xdD1AAIAsJs` on 27 Aug), and five of the
  operator's own in the Whapi export. Nothing in this plan rests on them.
- **Not recoverable**: the two brochures the live site links (the sauna PDF and the Kubilų pasaulis
  brochure) return 404; 112 WhatsApp images had expired by 2 Nov.
- The 2 Nov plan's "91,000-char 14 Aug transcript" is the phone recording above. The swarm review
  could not find it because it is not in saleshq; its figures check out against it, with the
  corrections listed below.
- The 2 Nov plan's "possible duplicate contact record" is not borne out: the completeness check
  matched one saleshq record, by phone and by domain.
- Call transcripts stay out of the repo (D-2026-11-02-14); this file quotes them briefly.
- Cloudflare account of the two previews: `95d517ae0ca508fcbf5918233c713182`, workers.dev subdomain
  `small-bird-3273`. Preview 2 is the link the operator sent David on WhatsApp on 6 Oct.

## Where Section 1's facts come from
"Live site" is the 2 Nov crawl unless a date says otherwise; "operator" is a ruling on the date given.
- **Flags**: no reviews (operator, 3 Nov); no GBP (operator, 3 Nov; consistent with the 14 Aug call,
  where a live search for Cumbria hot tubs showed his website in the organic results but no Maps
  listing, and with the 2 Nov research, which found no listing anywhere; the preview pages carry no
  review content either, checked 3 Nov); Bedale (14 Aug call), Ballycastle (WhatsApp 12 Aug);
  Arctic and Yorkshire (14 Aug: Arctic "don't have a dealer in Yorkshire"; the live site trades as
  "Arctic Spas Cumbria"); brochure and drawings (WhatsApp 20 Oct: the manufacturer agreed its brochure
  can be rebranded to Cumbria Spas Ltd; the 21 Oct suggestion to confirm the drawings; operator,
  4 Nov: full authority confirmed); Chill Gardens image (operator, 4 Nov); Arctic hub (operator,
  4 Nov).
- **Build scope**: the new site (WhatsApp 6 Oct, "We can go ahead"; sign-up 12 Oct; the 21 Oct call,
  where the operator described building the pages and moving the domain and hosting across); hosting
  (WhatsApp 6 and 12 Oct; operator, 4 Nov: Cloudflare static, nothing to match); articles publishing
  from launch (WhatsApp 12 Oct); email (WhatsApp 6 Oct; 21 Oct call); the pages list (WhatsApp 6 Oct;
  the current site has Terms and Conditions and Privacy Policy pages); no online payment (21 Oct
  call); brochure content into the pages (21 Oct call).
- **Contact and WhatsApp**: customers prefer WhatsApp, videos and photos close sales (14 Aug call);
  the WhatsApp button in the corner (agreed 14 Aug; operator, 4 Nov: click-to-chat, visible on
  mobile); phone and quote visible on mobile (WhatsApp 6 Oct); the live site already links
  `https://wa.me/447445450908`; the call-to-action wording and "contact for prices" (operator, 4 Nov).
- **Brand**: the two previews, fetched 3 Nov; David's "much improved from my site" (WhatsApp 6 Oct);
  the logo files, palettes and badges as served on 3 Nov; do not use the Wayback logo (operator).
- **Images**: the three sources and the bucket rule (operator, 4 Nov); hub-page picks and the
  "David reviews after launch" rule (operator, 4 Nov); the hero rule and mixing images through the
  body (21 Oct call); the screenshots (the 6-12 Oct WhatsApp images, looked at 4 Nov).
- **Video**: the YouTube channel and embedding (21 Oct call); slideshow videos (operator, 4 Nov);
  David's ideas for more (21 Oct).
- **The business**: established 2013 (live site; 14 Aug call: "I started this in 2013"); delivered
  throughout the UK (live site); holiday parks and the trade terms (14 Aug; the wording "supplied and
  serviced many holiday parks" is the operator's, 4 Nov); the current site's "dedicated team of
  skilled experts" (live site); word of mouth and regular customers (14 Aug); how he sells and the
  buyer who chose him (14 Aug); the showroom (live site); shows (WhatsApp 27 Aug, 4 Sep, 29 Sep); the
  five-tub sale (14 Aug).
- **Wood-fired**: the partnership and the manufacturer's claim (live site Wood Fired Spas page; the
  About Kubilų pasaulis page, 4 Nov; approved wording: operator, 4 Nov); David deals with it directly
  and why he chose it (14 Aug); it makes the tubs, saunas and electric tubs (14 Aug; WhatsApp 13 Aug);
  how it builds them (About Kubilų pasaulis page, 4 Nov); what sells (David's WhatsApp, 6 Oct; live
  site); electrics (14 Aug; WhatsApp 29 Sep); heat-up (live site; 14 Aug); temperature control and
  jets (14 Aug); sizes (WhatsApp 29 Sep; live site Small Spas page); the advantages (live site;
  confirmed by the operator, 4 Nov).
- **Electric**: the same shapes in both versions (14 Aug).
- **Repair & Servicing**: the hub itself (operator, 3 Nov); coverage (live site; David's email,
  12 Aug); Bedale (14 Aug); Ballycastle, end of June (WhatsApp 12 Aug); the nine steps and the
  maintenance packages (live site); why tubs need it now (14 Aug); dosing (21 Oct); Spa Boy (live
  site); filtration, plant rooms and parts (21 Oct).
- **Installation**: installs are most of the business (14 Aug); the wood-fired delivery and HIAB lift
  (14 Aug); Arctic installs (14 Aug); commercial installs in-house (21 Oct); trade orders not installed
  (14 Aug).
- **Saunas**: the manufacturer (WhatsApp 13 Aug); the large-sauna specification (live site); the
  220 × 220 cm sauna (live site; WhatsApp 29 Sep); the Harvia electric heater and controller (the live
  site's own sauna photos, looked at 4 Nov); an electric sauna option is garbled in the 14 Aug
  recording.
- **Arctic Spas**: dealer, ranges and showroom (live site); a good product with very few issues,
  installs with Arctic's engineer, no Yorkshire dealer, the saltwater swim spa, not positioned against
  the wood-fired range (14 Aug).
- **Commercial & mosaic**: the dealership and the rebrand (WhatsApp 20 Oct); family-run, hotel
  contracts, timings (21 Oct); lead times (WhatsApp 20 Oct); who it is for (21 Oct; leisure centres:
  operator, 4 Nov, and David names them in passing on the 13 Oct call); plant rooms, David's
  difference, hydro spas, bespoke (21 Oct); the copyright-notice rule (operator, 4 Nov: keep the
  notice, attribute it to Cumbria Spas / David, never the supplier's name).
- **The mosaic range's build and specification**: the 12 PDFs (WhatsApp 20 Oct).
- **Pools and swim spas**: the pool dealership, pools anywhere in the country, small pools (14 Aug);
  mosaic-tiled and bespoke pool photos (WhatsApp 29 Sep); swim spa moulds and drawings (the PDFs);
  long swim-spa sales (21 Oct); one combined hub (operator, 4 Nov).
- **Trade**: who qualifies (14 Aug; WhatsApp 13 Aug: "minimum of 3 products and they must be a
  British company and vat registered"); the live-site line; terms, repeat buyer and VAT (14 Aug).
- **Chemicals and parts**: chemicals (WhatsApp 15 Oct; 21 Oct); the Google Sheet (the operator's
  suggestion, 21 Oct); parts and no e-commerce (21 Oct).

## Background from the sources (not article material)
- The current site was built by A2A Internet; David has problems with it: a password on every email
  login, and the site crashing two or three times a month (WhatsApp 6 Oct).
- The scope was corrected on 3 Nov from the sources: the 2 Nov plan said "add articles to the
  existing site, not a rebuild"; David agreed a new site on WhatsApp on 6 Oct and signed up on 12 Oct.
  A future profit-share arrangement on hot tubs, swim spas and saunas was floated on 29 Sep and is not
  part of this build.
- Holiday parks keep changing hands and managers (14 Aug).
- On where work comes from, David said "anything that comes through is really word of mouth on my
  website, so it needs to be better" (14 Aug). He aims to be competitive on price while supplying a
  good product (14 Aug).
- David called Kubilų pasaulis "a small, conscientious company" (14 Aug); its own pages, and the
  operator's approved wording, call it the largest manufacturer in Lithuania. Section 1 uses the
  approved wording.
- David finds the mosaic-spa manufacturer high quality and "a lot less hassle" (21 Oct). He describes
  Arctic Spas as high-end and expensive (14 Aug).
- Hub-page images: on 21 Oct David was to choose a couple of images per top-level page, and the
  operator's first 4 Nov instruction held hub pages back until the operator picked them. The 4 Nov
  content-and-structure pass replaced both: picks now, as working placeholders, and David reviews
  them once the site is live.
- David drives about three hours each way to service the Bedale customer (14 Aug).
- Kubilų pasaulis turned down a 90-outlet French bid rather than compete on price (14 Aug). The
  current site invites people to become dealers for the range; David has dealer and territory interest
  (Northern Ireland) but finds dealers hard work and is not pushing it (14 Aug).
- Arctic's saltwater swim spa had a live customer (14 Aug).
- Mosaic range: commercial buyers usually come with a budget and a window (21 Oct). Live swim spa
  enquiries: a couple who looked at a pool first, a customer on the Isle of Man, and a long-standing
  customer moving from a hot tub to a swim spa (21 Oct).
- Pools: the pool manufacturer has recently worked in Ireland (14 Aug); a pool customer in Keswick
  (14 Aug).
- Trade, future and not current: the manufacturer may send installers if a van-load of four is
  ordered; UK sub-dealers and Northern Ireland were discussed (14 Aug). Do not publish.
- Photos David sent on 29 Sep were labelled "Mosaic tiled pools" and "Bespoke pools"; those images
  had expired by 2 Nov.
- On 19 Oct the operator told David the other business's logo would come off the site.
- The live site's status: the 3 Nov brief said it was down; from this server it answered HTTP 200
  at about 20:05 UTC on 3 Nov, with the same home page as the 2 Nov crawl, and again for the three
  pages fetched at 14:06 UTC on 4 Nov. The 2 Nov crawl is the reference for what it said.

## Keyword detail: Hot Tub Repair & Servicing
Leads on "hot tub repair" (590/mo); also targets hot tub repairs 590, hot tub maintenance 480, hot
tub service / services / servicing 390 each, spa servicing 260 and hot tub engineer 90 (and
"servicing" 2,400, absorbed as a variant). Measured, smaller: hot tub leak repair 50, spa repair 30,
hot tub pump repair 20, hot tub chemical balancing 10. No UK data: commercial hot tub servicing, hot
tub plant room, plant room spa, automatic dosing phrases.

## Towns: how they were chosen, and what was left out
- Enumerated by the repo's own geo stage from the committed GeoNames gazetteer: every settlement of
  1,000+ within 50 miles of Kirkby-in-Furness, plus the named towns pinned beyond it
  (`townOrder.pinBeyondRadius`, D-2026-11-03-14). Distances and populations: `towns.json`.
- **Towns David named** (`nap.json` `namedTownsFromCalls`):
  | Town | Miles | Source |
  |---|---|---|
  | Barrow in Furness | 8.5 | 14 Aug call, with the map of Cumbria on screen: "about 10 minutes from where I live" |
  | Kendal | 18.9 | 14 Aug call, the same discussion |
  | Keswick | 25.5 | 14 Aug call: a swimming pool customer "fairly local to me in Keswick" |
  | Bedale (N Yorks) | 64.5 | 14 Aug call: a service customer he was driving to; beyond the radius |
  | Ballycastle (NI) | 139.2 | WhatsApp 12 Aug: hot tub service and repair at a holiday park, end of June; beyond the radius |
- **Not included, deliberately**: Belfast (where David's father was born), York (where the pool
  manufacturer is), the Isle of Man (a swim spa enquiry; not a town in the gazetteer), Lithuania and
  France (the supplier and an overseas trade enquiry).
- The only Cumbrian towns of 1,000+ beyond 50 miles are Brampton (52.8 mi) and Longtown (54.4 mi).

## The article budget: history
The 2 Nov plan was 13 hubs × 24 towns = 312. What was sold is a website plus one year of SEO
articles (WhatsApp 6 and 12 Oct); on 14 Aug the operator described about a thousand articles over
about a year and a half, published one to five a day.

## Media: what was recovered and where it is
- David has a large library of photos and videos (wood-fired tubs, saunas, Arctic Spas, mosaic and
  bespoke pools), and the manufacturer is sending more (WhatsApp 15 and 20 Oct).
- On 2 Nov, 120 of 232 WhatsApp images were recovered to `/root/work/cumbria-spas-media/images/` on
  the planning server; the other 112 had expired. 19 videos and the 12 PDFs sit in the same chat; the
  PDFs are also at `/root/work/cumbria-spas-media/pdfs/`. A Whapi check on 4 Nov found 208 images on
  the chat with working links.
- The 120, looked at on 4 Nov, none with a caption: 63 sent on 20 Oct with the PDFs are the mosaic
  manufacturer's product photography (spas, hydro spas, swim spas, pools); 47 sent on 18 Oct with
  seven videos are wood-fired tubs (round and square models, the stove, controls and thermometer); 10
  sent on 6-12 Oct are phone screenshots (an A2A invoice email, Stripe and Klarna payment pages, a PDF
  reader, an A2A website, a webmail login and the current site), message IDs
  `rFv9EEHUifsNyMg9XcWpAA-hfz1AAIAsJs`, `rI1SbWnXw0UnsLFnqvAG5g-hYT1AAIAsJs`,
  `rGjPrqglbfXZlkKiBzSgQA-hXz1AAIAsJs`, `rCwBXa_Hl6NQjjZbBttlqQ-hXv1AAIAsJs`,
  `rLp_U_U3OvIeTQAntNj7_g-hQ_1AAIAsJs`, `rH65QgdfxQLg5qg5VqEXvQ-hV71AAIAsJs`,
  `rBADHXKF9MJloFImhx75og-hVb1AAIAsJs`, `rF9mQCV3nSo0n7P5M74Iaw-hTj1AAIAsJs`,
  `rH1DXkjqhPqQgCPkTjXZag-hTP1AAIAsJs`, `rJXWZ_P5yYy7BrLOxzJw.w-hRr1AAIAsJs`.

## Corrections to the 2 Nov plan (made 3 Nov)
- The wood-fired range moved from Chill Gardens, a fantastic supplier, to Kubilų pasaulis (14 Aug),
  not to the mosaic-spa manufacturer, whose dealership only began in October.
- New site, not articles on the old one. Mailboxes are david@ and **sales@**, not info@.
- Wood-fired: lead with the jets-and-lights model; off-grid is a small share (WhatsApp 6 Oct).
- "Only Arctic dealer in Yorkshire" removed (the 2 Nov intake had it; no source says it). The pool job
  in Ireland was the manufacturer's, not David's (14 Aug).
- The showroom USP no longer names the location (standing prohibition 10); the address is in the NAP.
- Saunas do have detail (the live site's specification).
- **Hubs, 2 Nov to 3 Nov**: "Hot Tub Repair" and a bare "Servicing" hub (the phrase market had split
  the operator's "Hot Tub Repair & Servicing" in two), the separate "Plant Rooms & Automated Chemical
  Dosing" hub, and the live site's "Hot Tub Maintenance & Servicing" page became the single Repair &
  Servicing hub. "Spare Parts" and "Chemicals Parts" (two hubs, 48 town articles) went; Chemicals and
  Parts became the two standalone pages. All six old names are in `services-override.json` `drop`, so
  none can come back.

## Validator and swarm history
- **3 Nov rebuild** (D-2026-11-03-15): `validate-jev` (code checks, no paid call) passed everything
  except the six unrecoverable voice notes and changed nothing; `npm test` 3,845 of 3,847 assertions
  across 316 suites, the two failures being the `sites/` person-names scan. The swarm was not re-run
  then; the last swarm before this pass ran at 14:04 UTC on 3 Nov against the pre-rebuild plan and
  FAILED (32 blockers, most of them the six voice notes repeated under each lens; the readiness
  Goldfish said no-go).
- **4 Nov pass** (D-2026-11-04-01). `validate-jev` (code checks, twice): 0 fixes, and the only
  failures are the six voice notes; hub-lock (9), article maths (900), prohibitions, contract and the
  site-plan statements pass. `npm test`: 3,845 of 3,847 assertions across 316 suites, the same as
  before; the two failures are the `sites/` person-names scan, where Cumbria Spas no longer appears.
  The swarm ran twice, both FAILED with the readiness Goldfish at no-go and the comprehension gate
  passed. The 14:30 UTC run had 15 blockers (the six voice notes and nine from Goldfish), and its
  findings led to the fixes listed under the 4 Nov pass. The 14:43 UTC run, on the fixed plan, had 23
  (the six voice notes and 17 from Goldfish), largely the same operator rulings stated more ways:
  approval and the "locked" label, the Arctic hub, the quote-form destination, the brand palette,
  the legal pages' clauses, the 13 Oct call, and repair coverage against the 50-mile town list. The
  rest are earlier plan and seed matters outside this pass: sources not in saleshq, the seed's
  contact-page "hours" section, Kirkby Stephen cut. Its 13 Oct brand finding was added to flag 9
  afterwards. `SWARM-REVIEW.md` holds the second run in full.
