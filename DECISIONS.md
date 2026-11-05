# DECISIONS: 247 Plumbers Norwich v3 full-site test

Recorded choices, per ANTI-SLOP's override clause and LAYOUT-LAWS. Source of design devices: `reference-library/sites/247plumbers-acool/capture/` (the Acool HVAC template).

## Design devices taken from the reference (permission, not slop)

- **Pill buttons and pill floating header.** The template's controls are all pills and its header is a white floating pill inside the hero. `brand.surface_language: soft`. Every button on the site is a pill; the header is the floating pill, fixed, with a stronger shadow once scrolled.
- **Large radii on cards and slabs** (14 / 24 / 32 px). The template's cards, hero panel, CTA card and footer notch are all heavily rounded.
- **Gradient hero.** The template's hero is a teal gradient with a soft bokeh wash. Law 8 permits gradients only where the template uses them: the hero, the article/legal page head and the quote-form slab carry a deep-teal to teal gradient; nothing else does (photo scrims aside).
- **Ice-blue tint cards with the photo inside the card padding**, the two-column section head (eyebrow + H2 left, lead right), the dark split slab with stacked light cards (used for the process), the full-bleed photo CTA band with a centred white card, the deep-teal footer with a light notched panel top-right. All from the capture.
- **Tag chips inside the About panel** (the template's "24/7 Available" style chips). These are content tags inside a panel, not a decorative label above a heading, which stays banned and is not used anywhere.

## Palette

Teal brand (`#137993`), deep teal panels (`#0d3d4b`), ice tint (`#e4f1f5`), light page (`#f5f9fa`), one bold orange accent (`#f97316`, ink text on it at 6.6:1; `#c2410c` for orange text and stars on the light bands at 5:1). The template's own accent is teal; law 18 asks for the bold orange-family accent, so orange carries every CTA, star and eyebrow while teal stays the brand colour. No pure black or white. No coloured card edges.

## Typography

Figtree Variable, one family for every role (workhorse pool, no banned fonts). Six sizes. H1 34 to 64 px on the home page, 32 to 52 px on inner pages (a longer, problem-first H1 at a smaller display size so the hero does not run to six lines).

## Page set

The brief's list plus `/services/`, `/areas/` and `/404` because LAW R10 requires them on every build and the skill rules outrank the brief. Both hub landings are written as directories, not homepage copies. No article corpus; three seed articles only. Eight towns only. **Superseded 2026-09-18 (AREAS LAW):** the operator ruled the areas section is one page; the eight `/areas/<town>/` pages were removed and `/areas/` now carries the Norwich body, the map and all 56 towns as text, linking only to the home page and the service pages. Consequence: `/areas/` is the one non-contact, non-utility page with no in-copy contact link (the audit flags it; the law outranks the one-contact-link convention). See BUILD-REPORT.md, AREAS-FIX.

## Plan vs honesty rules

- **Phone and address** are placeholders in nap.json: neither is rendered anywhere. No call button, no sticky call segment, no schema telephone. `business.phone` in `src/data/site.ts` is the single point to fill; the contact card carries two hidden `data-placeholder` slots.
- **USPs** in the plan are all `affirmed: false` and nap.json's `usps` is empty on purpose: "DBS-checked", "no call-out fees", "guaranteed workmanship", "insured", "fully qualified" are not stated anywhere.
- **Credential terms.** "Gas Safe" (and every other scheme name) is not used on the site. Gas work is described as carried out by "a registered gas engineer, as the law requires", which is the legal minimum and not a claim of a specific registration. The rendered check fails on "gas safe" (excluding "gas safety", the plan's service name).
- **"247" in the business name and the service name "247 Emergency Plumber"** are the operator's own choices in the plan. The site says emergency requests are "taken day and night" and the about page states explicitly that this is not a promise about attendance time. No arrival-time or "within the hour" claim appears anywhere; the terms say so too.
- **Blueprint headings that asserted unaffirmed claims were reworded**: "Fixed-Price Drain Unblocking" became "A price agreed before the drain is touched"; "Same-Day Boiler Diagnosis" became "Booking a diagnosis visit"; "Same-Day, Next-Day & Emergency Appointments" became "Appointments, including urgent ones"; "G3 Qualified Engineer and Safety Compliance" became "Why unvented cylinders need a qualified installer"; "Gas Safe Diagnostics and Fault Finding" became "Heating diagnostics and fault finding"; "Emergency Callout and Same-Day Response" / "Fast Response" became "Emergency call-outs"; "Bespoke Bathroom Styles and Finishes" became "Bathroom styles and finishes"; "Pricing, Fixed Charges, and Service Plans" became "How the work is priced"; "Boiler Brands and Installer Accreditation" became "Boiler brands and how the guarantee is registered". Every "costs" heading discusses what moves the price without stating a figure.
- **The home blueprint's section list** (an underfloor-heating skeleton) was not used for the entity page; the homepage follows the house spine.
- **Reviews** are samples marked `data-placeholder="reviews"` on this noindex build (see BUILD-REPORT). No numeric rating or count anywhere: the strip reads "Five-star rated" and the band "Excellent / many five-star reviews".
- **Top 8 towns** chosen by population (the plan carries no town-level search volume): Norwich, Great Yarmouth, Bowthorpe, East Dereham, Beccles, North Walsham, Diss, Attleborough.
- **Physical base** is never stated; Norwich is described as "the centre of the twenty-mile area worked".

## Rule conflicts resolved the same way as the Invicta / DH precedents

- LAYOUT-LAWS "Leave Us A Review" button and numeric rating: not built (v3 law 4 and the plan's negative topics).
- LAW R9 phone-accent: no phone, so Quick Quote is the single accent button.
- LAYOUT-LAWS mobile header with visible call button: v3 law 1 wins, nothing but the wordmark and burger on mobile.
- Service cards: fifteen identical cards in a 3-column grid (nine-square rule cannot apply to fifteen). On phones the cards go horizontal (thumbnail left) so fifteen stay scannable.
