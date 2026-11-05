# BUILD REPORT: Cumbria Spas (cumbriaspas.co.uk), full site, 5 Nov 2026

- **Plan:** `plan/SITE-PLAN.md`, APPROVED, fingerprint `f604099b93602bfa` (site-planner FETCH_HEAD `e1d1d959`), with
  `plan/seed.json`, `plan/nap.json` and the two legal source files copied in.
- **Brief:** `plan/BUILD-BRIEF-2026-11-05.md` (the operator's 5 Nov rulings override the plan where they differ).
- **Laws:** the v4 law set in `plugin-sitebuilder-v4-starter-astra/.claude/rules/`, latest operator ruling first. This
  checkout carries no `CLAUDE.md` or rules of its own. Decisions and conflicts are in `DECISIONS.md`.

## Result
| | |
|---|---|
| Repo | `TheK-Dawg/site-cumbriaspas`, branch `main`. Build commit `3f56a16` (pushed and read back with `git ls-remote`). This report is in the follow-up commit. |
| Worker | `site-cumbriaspires-preview2` (deploy-guarded name). Version `4efa7c6c-3fe1-4a43-9e04-cd44b23ada1f`. Rollback: `npx wrangler rollback af21fa5f-22c0-4d33-af6b-e39e0d8eb655` (the preview 2 one-pager). |
| URL | https://site-cumbriaspires-preview2.small-bird-3273.workers.dev/ (noindex, workers.dev only; the domain moves from A2A later) |
| Build | `astro build`: 22 pages plus sitemap.xml, robots.txt and llms.txt. Astro 7.3.3, pinned lockfile, nothing added. |
| QA | `node scripts/qa.mjs --url <preview>` (Playwright Chromium, 1440×900 and 390×844, every route): **0 failures**. The same walk on the local `dist/` also gives 0. |
| Form | Formlane `cumbriaspas-quick-quote-online-form`, public id `f_OTUvZjx2lNRyaokpaP6p`. Live, and it draws on every form page of the live preview. |

### Routes (all HTTP 200 on the preview; the 404 returns 404)
`/`, the 9 hubs (`/wood-fired-hot-tubs/`, `/hot-tub-repair-and-servicing/`, `/electric-hot-tubs/`,
`/hot-tub-installation/`, `/swimming-pools-and-swim-spas/`, `/saunas/`, `/arctic-spas-dealer/`,
`/commercial-and-mosaic-tiled-spas/`, `/trade-and-holiday-park-hot-tubs/`), `/services/`, `/chemicals/`, `/parts/`,
`/reviews/`, `/about/`, `/contact/`, `/gallery/`, `/sitemap/`, `/terms-and-conditions/`, `/privacy-policy/`,
`/thank-you/` (noindex; `/thank-you?name=` redirects with the query kept), 404, `/sitemap.xml`, `/robots.txt`,
`/llms.txt`.

### What the QA walk checks on every route, at both widths
- Status, exactly one H1, no horizontal overflow, alt text on every image, and every image actually decoded (after
  scrolling to trigger lazy loading).
- Text contrast of at least 4.5:1 (3:1 for large text).
- Furniture:
  - the floating WhatsApp button (`wa.me/447445450908`);
  - one footer-credit link;
  - the manufacturer sentence word for word;
  - the CTA line word for word;
  - the form slot (`#quote`) and `id="contact"`;
  - exactly one map embed;
  - the residential-and-commercial line on every hub.
- Schema and indexing: one JSON-LD graph with one business node, no Review or AggregateRating markup, noindex on
  the preview.
- Banned content: no brand-logo images, and none of the site's banned words or claims (list in `DECISIONS.md`).
- Prices: none outside the Repair & Servicing page.
- Links: no anchor starts with a stop word, and every internal link resolves.
- Mobile: the sticky bar shows from the first screen.
- Interactions: the FAQ accordion stays open, the Services dropdown shows 9 hubs plus Chemicals and Parts, the burger
  menu opens, and Quick Quote Online lands on the form. Screenshots are in `shots/qa/` (gitignored).

## What the operator said today, and where it landed
1. **Preview 2 look kept:** palette, Figtree and the `square.jpg` header logo, unchanged.
2. **"Brands We Sell" and the badge logos removed:** the Arctic Spas, Kubilų pasaulis and Spa Boy images are deleted
   from `public/` and none were added to the R2 pool. The QA walk fails any logo image other than the site's own.
   The plan's Arctic hub pick of "the Spa Boy graphic and the Arctic Spas badge" is dropped accordingly.
3. **All pages built:** 9 hubs plus the standalone pages listed above.
4. **Email not set up:** the form sends to the operator's admin address only. `david@cumbriaspas.co.uk` is shown as
   plain text (no mailto link). Nothing was configured for Google Workspace.
5. **Images:** see the R2 section below.
6. **Kept out of the pool:**
   - the 10 screenshot message ids (they were not in the R2 batch, and no Whapi pull ran);
   - Chill Gardens;
   - brand logos;
   - anything from the operator.
7. **Reviews page:** an empty placeholder with a holding line, the CTA and the form. There is no Google listing link
   or widget anywhere; the showroom map is embedded.
8. **YouTube:** the embeds are left as `TODO(video)` on every hub (see the open items).

## R2 media (`site-images/cumbriaspas/`, public base `https://pub-8fc74d04f59d45b0bc844908de647a05.r2.dev/`)
188 new objects, each recorded with its sha256, source, provenance and description in `media/R2-MANIFEST.json`.
Every original has a 1600px WebP copy at `<folder>/web/`.

| Folder | Originals | Source |
|---|---|---|
| `wood-fired/` | 53 | 46 from the 18 Oct WhatsApp batch (migrated from `lmb-client-assets`, descriptive names keeping the message id; one near-duplicate dropped) + 7 live-site photos |
| `wood-fired/video/` | 7 | the 18 Oct batch videos |
| `saunas/` | 11 | live-site photos |
| `arctic/` | 1 | live-site Arctic Spa photo |
| `brochure/` | 36 | **photos extracted from the supplier presentation PDF** |
| `brochure/drawings/` | 11 | **CAD sheets rendered from the drawing PDFs.** The manufacturer's title blocks, notices and contact details are cut or painted out, and each sheet is stamped "© Cumbria Spas Ltd" (flag 7) |
| `general/` | 63 (unchanged) | dealer-range reference; only `web/` copies were added |
| `electric/`, `servicing/`, `installation/`, `pools/`, `commercial/`, `trade/` | `.keep` | created, still empty (the photos for these come from David) |

**Counts:**
- new images pulled from Whapi: **0 (blocked: no Whapi token in this environment)**;
- images extracted from the PDFs: **47** (36 embedded photos and 11 drawings);
- live-site photos downloaded: **19** (32 found; logos, banners and the Chill Gardens image skipped);
- migrated from the 18 Oct batch: 46 images and 7 videos.

The skip list, with a reason for each item, is in the manifest summary.

The site reads its images from `src/data/media.json`:
- the plan's hub picks, hero first; every 18 Oct and 20 Oct message id named in the plan was matched;
- a pool of 174 images;
- a gallery of 40, the same on every page, with real photos first.

Dealer-range and brochure photos are captioned as the range and never as David's installs.

## Form
- Website `cumbriaspas` ("Cumbria Spas website").
- Form `cumbriaspas-quick-quote-online-form`, named "Cumbria Spas — Quick Quote Online". It went **Live at creation**
  and is the only form on that website.
- Fields: name, email, phone (below email), postcode, message.
- Allowed domains: `cumbriaspas.co.uk`, `www.cumbriaspas.co.uk`, `site-cumbriaspires-preview2.small-bird-3273.workers.dev`.
- Embed: direct from `api.formlane.uk`, with no Worker changes. After sending, the form redirects to `/thank-you`
  with the first name.
- The button uses the site orange (`#ff7a1a` with dark text), with a 14px radius.
- **No test submission was made** and no email was sent.
- **Destination: `admin@apexaimarketing.com` only.** The brief spells it `admin@apexiamarketing.com`, but that domain
  has **no MX records**, so leads sent there would bounce. `apexaimarketing.com` has live MX and is the operator's own
  saved Formlane default. **Operator: please confirm.** If the other spelling was meant, it is a one-field change.

## Open items (ask; nothing invented)
1. **Whapi token.** None was available here (not in the env, `~/.hermes/.env` or secrets). The plan says the chat has
   about 208 images with working links. Once a token is available: page
   `GET https://gate.whapi.cloud/messages/list/447445450908%40s.whatsapp.net?count=500` with a browser User-Agent,
   skip the 10 screenshot ids and `from_me`, dedupe against the manifest, and upload into the topical folders.
   The pipeline scripts are in `/tmp/csb/media-scripts/` (temporary location).
2. **YouTube:** the channel is to come from the operator. Embed points are marked `TODO(video)` on the hubs, and the
   articles have a `youtube` frontmatter field.
3. **Legal decisions** (TODO comments in both pages; the text stays word for word):
   - Privacy clause 7 gives `info@cumbriaspas.co.uk`: add info@ as an alias, or change it to david@.
   - Terms clause 3 says "Pricing ... is detailed on our website", but the site publishes no prices.
   - Terms clause 2 and privacy clause 3 describe repair and maintenance only.
   - Cookies: covered by the added standard clauses (terms 9-12, privacy 8-12).
4. **Placeholder Google Sheet links** on `/chemicals/` and `/parts/` (`href="#"`, `data-placeholder="sheet-url"`):
   waiting for David's sheet URLs and product lists.
5. **Hub photos only David can supply:**
   - a service or repair in progress (the repair hub's hero is a jets close-up for now);
   - the electric range (the electric hub has only the Arctic Spa photo);
   - an install on the HIAB;
   - a pool from the pool manufacturer;
   - Arctic Spas he has installed.
   Six topical R2 folders are empty and waiting for these.
6. **Entity `sameAs`:** there is no GBP place id yet (flag 3), no verified Facebook page, and no company number on
   file, so the schema ships without them. When the GBP exists, add it to `src/data/site.ts` `entity` and put the
   site URL on the listing.
7. **Go-live (domain from A2A):**
   - build with `PUBLIC_INDEXABLE=1`;
   - remove the `X-Robots-Tag` block in `public/_headers`;
   - attach the domain to the worker;
   - check that quote-form leads arrive.
8. **Footer credit** ("Local business websites" by the Local Map Booster mark) is the factory default on every new
   build. This is a client site, so drop it only on the operator's word.
9. **Carried over from the plan:**
   - opening hours, warranties, insurance and qualifications;
   - the trade VAT wording (needs David or an accountant to check it);
   - the sauna range beyond the two models listed, and whether there is an electric sauna option;
   - whether to keep the mosaic model names;
   - whether Bedale and Ballycastle stay, and whether to keep the six nearby villages (flags 4 and 5);
   - the 13 Oct call (flag 10).
10. **Articles:** the engine is wired and verified with a temporary fixture article, removed before commit. The queue
    of 900 is in `src/data/article-queue.json`, and the writing rules are in `docs/ARTICLE-ENGINE.md`. Mass generation
    starts after handoff, as the brief says.
11. **Old `documents/` R2 file names** contain the mosaic manufacturer's name. They are not linked from the site;
    rename them if they will ever be shared.

## Not done, by the brief
- No test leads and no emails sent.
- No mailbox or Google Workspace setup.
- No AI imagery and no generated brand or product images.
- No DNS or domain change.

## CORRECTIONS: round 1 (operator's live review, 5 Nov 2026)
Brief: `CUMBRIA-FIX1-BRIEF.md`. Commits `34a4e09` (the fixes), `8b425e9`, `d6c377b` and `655b2ab` (button centring
tuned from live measurements), then this report. Worker `site-cumbriaspires-preview2`, version
`a3f49cc1-c9ec-4db5-b94e-9ac5c8aa0581`. Rollback to the first full build: `npx wrangler rollback 4efa7c6c-3fe1-4a43-9e04-cd44b23ada1f`.
No test leads were sent, no AI images were used, and no other pages were added.

| # | Fix | What changed |
|---|---|---|
| 1 | **Resources** | New `/resources/` index (v4 pattern): the published articles as cards, then all nine hubs with their published towns. Unpublished towns are not linked. Hubs come from `site.ts` (the seed order) and towns from `towns.json` (built from the seed). **Article URLs moved to `/resources/<hub>-<town-slug>/`**, as the brief asked. The template is now `src/pages/resources/[slug].astro`, breadcrumbs go Home → Resources → article, the queue paths were regenerated, and `docs/ARTICLE-ENGINE.md` was updated. **Resources is in the header nav and the footer.** The footer now links all nine hubs plus Chemicals, Parts, Reviews, About, Contact, Resources, Privacy and Terms, and `qa.mjs` checks this on every page. |
| 1 | **Three articles, ready to publish** | `/resources/wood-fired-hot-tubs-kirkby-in-furness/`, `/resources/hot-tub-repair-and-servicing-barrow-in-furness/`, `/resources/electric-hot-tubs-kendal/` (queue items 1, 11 and 21; the three pinned towns in publish order, each on a different hub). Each has 5 H2s, a real R2 photo above every H2 plus a hero (no AI images, no brochure or dealer-range photos), takeaways, FAQs and FAQPage schema, the residential-and-commercial line, and the CTA line word for word. Every fact comes from plan §Product and service detail. No prices (the repair article says "contact for a quote"), no service frequency, and no superlatives beyond the approved manufacturer sentence. |
| 1 | **Sitemap** | `/sitemap/` and `/sitemap.xml` (26 URLs) list Resources, the 3 articles, FAQ and Areas. `llms.txt` lists the new pages too. |
| 2 | **WhatsApp: phones only** | The floating button is `display:none` from 768px up and shows on phones. The article rail's WhatsApp button is also hidden on desktop. The text links (footer NAP, form panel, CTA band) and the CTA line itself stay. QA checks that the button is hidden on desktop and visible on mobile on every route. |
| 3 | **Footer credit** | "Hot tub websites by [LMB mark]". The single nofollow link and the mark are unchanged. |
| 4 | **Phone** | **Not changed.** There is a `TODO(phone)` in `src/data/site.ts` and an open item below. |
| 5 | **Contact spacing** | The trust strip now has the page's usual section padding (`--pad-med`) above the next section and between that section and the form. |
| 6 | **Contact split row** | One image/text row (the hub pages' `Feature` component, used once) sits between the trust strip and the form: the showroom, WhatsApp photos and videos, David does the work himself, four fact cards, and links to About and Services. |
| 7 | **Brighter navy** | Same hue (216), more saturation and a little lighter. `--teal-deep` went from `#1c2f4b` to `#17355e`, `--teal` from `#253c5e` to `#1f416f`, and `--teal-ink` from `#121f33` to `#0e213f`. The navy shadow and line tints, `theme-color` and the manifest were updated to match. Contrast: on-dark text 11.4:1, muted text 7.3:1 and sky-blue hovers 4.8:1 on the new deep navy. The QA contrast walk passes on every route. The favicon keeps the logo's own navy. |
| 8 | **Button text centring** | Two causes. (a) The **Formlane submit**: Formlane's `padding: var(--lf-p) 1.4em` turns into 12px top and 24px bottom, which pushed the text up. The site now sets the submit's padding (15px / 13px, measured). (b) **Site buttons**: Figtree's tall ascent left the caps about 1px above centre. A `--nudge` (0.075em) moves 1px of padding from the bottom to the top on `.btn`, the header pill and the phone sticky bar. CSS `text-box` trim was tried first and does nothing here, because the label is an anonymous flex item. Measured on the live site from 3× screenshots (space above the cap tops / space below the baseline): header pill was 17 / 19px and is now 17.7 / 18.0px; form submit is now 21.7 / 22.0px; phone menu button is 21 / 20px. Before and after crops are in `shots/fix1/` (gitignored). |

### Standard pages compared with the v4 / BFL set
BFL has services index, areas, FAQ, resources, about, contact, privacy, terms, 404 and thank-you. Cumbria already had
the services index, gallery, sitemap, about, contact, legal pages, 404 and thank-you. **Added:**
- **`/faq/`:** a short "About Cumbria Spas" group, then every hub's own FAQs. All of it is plan §1 material that was
  already published on the hubs. The one £ answer stays on the Repair & Servicing page only.
- **`/areas/`:** the plan's coverage wording, the shared areas map and town list, and the services grid. There are no
  town pages (the plan has none), and Bedale and Ballycastle are not singled out while flags 4 and 5 are open.
- **`/resources/`:** see item 1 above.

Both FAQ and Areas are linked from the footer "More" column and from the sitemap. Nothing new was invented: no hours,
warranties, team, or company facts that are not in the plan. The "company facts" the operator mentioned are on About
already. Anything beyond that (company number, hours, insurance) is still an open question, not new copy.

### Verification
- `astro build`: 28 pages, plus sitemap.xml, robots.txt and llms.txt.
- `node scripts/qa.mjs --url <preview>` (Playwright, 1440×900 and 390×844, all 28 routes including `/resources/`, the 3
  articles, `/faq/` and `/areas/`): **0 failures.** The walk now also checks:
  - WhatsApp hidden on desktop and visible on mobile;
  - the footer's required link list;
  - the header button's nudge;
  - the Formlane submit's padding;
  - that the form draws on every form page.
- The old article path `/wood-fired-hot-tubs/kirkby-in-furness/` returns 404. Nothing linked to it, because no articles
  were published before.

### Open item added
12. **Phone number: confirm with David.** The plan's NAP gives **0744 5450908**, copied from David's own messages.
    That is only 10 digits after the 0, which is one short for a UK mobile. The operator reads it as **07444 545090**
    (07444545090). The site still shows 0744 5450908, with `tel:+447445450908` and `wa.me/447445450908`, so the number
    and the link digits match. If David confirms the 11-digit number, change `phone`, `phoneHref`
    (`tel:+447444545090`) and `whatsapp` (`https://wa.me/447444545090`) in `src/data/site.ts` together. Then grep for
    `5450908` and fix the rest: the contact page copy, the `qa.mjs` WhatsApp check and the Whapi chat id in open item 1.

## STANDARD-PAGES round (operator's review 2, 5 Nov 2026)
Brief: `STD-PAGES-ROUND-BRIEF.md`. Commit `25ec6d9`. Worker `site-cumbriaspires-preview2`, version
`f8c3bdcf-da38-4b5a-a290-9c5270aa0458`. Rollback: `npx wrangler rollback a3f49cc1-c9ec-4db5-b94e-9ac5c8aa0581`.

| # | Item | What changed |
|---|---|---|
| 1 | **Four new standard pages** | `/company-facts/`, `/complaints/`, `/accessibility/`, `/cookie-policy/`. They use the legal-page shell: slab hero with breadcrumbs, contents list, and the CTA rail. **Company Facts** shows only plan facts: Cumbria Spas / Cumbria Spas Ltd, established 2013, owner David Hughes, the Kirkby In Furness showroom, phone/WhatsApp/email, the nine services plus chemicals and parts, coverage, the approved manufacturer sentence, the dealerships and links to the policies. There is no registrations row, because no company number, VAT number or trade registration is on file (`TODO(operator)` in the page). **Complaints** is the standard template: how to complain (phone, WhatsApp, email, post), what to include, what happens next ("as soon as we can", with no response-time promise), and escalation to the national consumer helpline. Statutory rights are unaffected, and it links to the Privacy Policy for data complaints. "Citizens Advice" is not named, because the site's banned-words list blocks "advice". **Accessibility** is the standard statement. It aims for WCAG 2.1 AA and lists only what the build actually does: skip link, focus outlines, contrast checked on every page by QA, alt text, one H1, reduced motion and zoom. It names the third-party map and form as limitations and gives phone, WhatsApp and email for help. **Cookie Policy** is standard text that matches what the site actually loads: no analytics or advertising cookies, Google Maps and the enquiry form as third parties. The word-for-word legal clauses (Terms 1 to 8, Privacy 1 to 7) are untouched. Only the template sections already added (Privacy 10 and 12, Terms 12) gained links to the Cookie Policy and Complaints pages. |
| 1 | **Footer** | The columns are now **Services** (9 hubs), **Company** (Home, All services, Chemicals, Parts, About, Company facts, Reviews, Gallery, Resources, FAQ, Areas, Contact) and **Legal** (Sitemap, Privacy, Terms, Cookie Policy, Complaints, Accessibility). `qa.mjs` now requires all of these on every page. |
| 1 | **Charity line** | **Not added.** No charity is known for Cumbria (see item 2). A `TODO(operator, charity)` in `Footer.astro` describes the line ("Proud to support …", a nofollow link) to add once the operator supplies the name and URL. |
| 2 | **Giving-back block on About** | **Not added.** David's chat and the pulled media show no donated-to cause, and the WhatsApp image pull is still blocked (no Whapi token). See the `TODO(operator, charity)` in `about.astro`. **Operator: supply the cause, the image and the link.** |
| 3 | **Sticky sidebar CTA** | The article rail (and the legal-page rail) already had `position: sticky`, but the `<aside>` sat in a grid with `align-items: start`, so it was only as tall as its content and never stuck. It now stretches the row height (`align-self: stretch`). Playwright on `/resources/electric-hot-tubs-kendal/` (1440×900): the CTA box sits at top 805px on load, then at 369px at scroll 1200, 2400 and 3600 (it stays below the contents list). `qa.mjs` now checks that the CTA stays in view at 40% and 70% through each article and the privacy policy. |
| 4 | **Interlinking** | Articles now link to their hub, Resources, **1 to 2 related articles** (same hub first, then others; currently the other two), the form (`#quote`), **Contact** and **FAQ**. Hubs already list their town articles. About and Contact link Company Facts, every policy page, Accessibility and the FAQ (About also links Reviews and Resources). The sitemap, `/sitemap.xml` and `llms.txt` list the new pages. **No underlined links:** the trade band's link had a 2px bottom border drawn as an underline; it is now bold only. `qa.mjs` now fails any visible link with an underline or an inline bottom border. |

### Verification
- `astro build`: 32 pages.
- `node scripts/qa.mjs`, run locally and against the live preview, covers 32 routes × 2 viewports: every page returns 200 (the 404 test route returns 404), the footer list is present, there are no underlined links, the sticky rail holds, and all 30 internal link targets return 200. **0 failures** both times.
- Click depth (a BFS crawl of `dist/` from `/`): 30 of 31 pages are reached within **2 clicks**. The only page not linked is `/thank-you/`, which is reached after a form submit, as intended.

### Open items added
13. **Charity / giving back:** the cause, image and URL are needed before the footer line and the About block can go in.
14. **Company registrations:** if David has a company number, VAT number or trade registrations he wants shown, add a row to `/company-facts/`. Until then nothing is published (standing prohibition 22).
