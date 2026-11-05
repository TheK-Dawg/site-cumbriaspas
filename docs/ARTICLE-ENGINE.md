# Cumbria Spas article engine (wired; the first three articles published 5 Nov 2026)

Budget: 9 hubs x 100 towns = 900 articles (`plan/seed.json` `articleCap`). Mass generation runs AFTER handoff
(brief, 5 Nov 2026); the build ships the wiring and the queue only.

## Where things are
- Queue, in publish order: `src/data/article-queue.json` (built from the seed by
  `python3 -I scripts/gen-article-queue.py plan/seed.json src/data`). Pinned towns first (Kirkby-in-Furness, Barrow in
  Furness, Kendal, Keswick, Bedale, Ballycastle), then nearest first; each town's nine hubs together.
- An article is one Markdown file: `src/content/articles/<hub>/<town-slug>.md`, rendered at
  `/resources/<hub>-<town-slug>/` (operator, 5 Nov 2026: the v4 resources pattern). Home -> Resources -> article and
  home -> hub -> article are both two clicks. `/resources/` indexes every published article by hub. Schema: `src/content.config.ts` (title, description <= 170 chars, hub, town,
  townSlug, publishDate, takeaways 3-6, faqs, optional images from the R2 pool, optional youtube id).
- A future `publishDate` or `draft: true` keeps a file unpublished, so a batch can be committed ahead and drip out on
  rebuilds (one to five a day).
- Published articles join `/sitemap.xml`, `/sitemap/`, `/resources/` and their hub's "resources by town" list
  automatically. Set the item's `status` to `published` in the queue when its file lands.
- Published so far: `wood-fired-hot-tubs/kirkby-in-furness`, `hot-tub-repair-and-servicing/barrow-in-furness`,
  `electric-hot-tubs/kendal` (hand-written examples of the rules below; the house standard for the batch).
- Template (`src/pages/resources/[slug].astro`): breadcrumbs above the H1 (Home -> Resources -> article), top takeaways box, sticky contents list and CTA
  rail, an image above every H2 (the article's own `images`, then the hub's picks from `src/data/media.json`), FAQs at
  the bottom, Article + FAQPage schema around the one business node, link back to the hub.

## Writing rules every article obeys (plan Section 1, seed negativeTopics: all 35)
- Title "<hub> in <Town>"; the repair hub's articles are "Hot Tub Repair and Servicing in <Town>".
- Inform with real technical detail from plan Section 1 only; nothing invented.
- Say in passing: "Cumbria Spas serves residential and commercial customers of all types, from hotels to spas to
  leisure centres."
- Every call to action: "Contact by the quote form, call now, or by WhatsApp."
- No prices, ever ("contact for prices" / "contact for a quote"). The repair hub's "from £250, depending on your
  location" is allowed on the Repair & Servicing pages only.
- The manufacturer, word for word when named: "Cumbria Spas works in partnership with Kubilų pasaulis, the largest
  manufacturer in Lithuania of premium, luxury and custom hot tubs." Never "a Lithuanian manufacturer".
- Never name the mosaic manufacturer (or its copyright notice), any supplier's contact details, Chill Gardens, a staff
  team, reviews/ratings/testimonials, a Google listing, company or VAT numbers, warranties, hours, response times,
  qualifications, checkout, or "the only Arctic dealer".
- The showroom is "Cumbria Spas' showroom", never the article's location (standing prohibition 10). Articles state
  the area served.
- No unsubstantiated superlatives in articles (best, leading, number one...). The manufacturer sentence is approved.
- "Arctic has no Yorkshire dealer" is not affirmed: use in Yorkshire articles with care, never "the only dealer".
- The trade VAT mechanism needs checking by David or an accountant before it is published as advice.
- Word bans: no "guide(s)" (say "resources"), "advice", "free quote", em dashes, "directory".
- Video: embed David's YouTube videos (click-to-load facade) once the operator supplies the channel.
