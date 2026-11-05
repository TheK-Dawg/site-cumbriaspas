# CUMBRIA SPAS — BUILD BRIEF (approved plan f604099b93602bfa, operator GO 5 Nov 2026)

Read first:
1. The plan: /root/projects/lead-gen-websites/site-planner — `git show FETCH_HEAD:sites/cumbriaspas.co.uk/site-plan/SITE-PLAN.md` (FETCH_HEAD is master e1d1d959; a copy is at /tmp/cs-plan.md). 981 lines. The plan file is LAW. seed.json/nap.json decide hubs/towns/sections; the plan decides order/form/wording.
2. Build laws in the repo (CLAUDE.md + .claude/rules/).
3. THIS BRIEF OVERRIDES where the plan and it disagree on what the operator said TODAY (5 Nov).

# WHAT THE OPERATOR SAID TODAY (5 Nov — overrides plan where noted)
1. **Keep the CURRENT look**: preview 2 (https://site-cumbriaspires-preview2.small-bird-3273.workers.dev) is the design being used — its palette, Figtree, header square.jpg logo. Preview 1 is NOT used. Keep the existing brand as-is (plan §Brand is reference; the "keep current palette" ruling, flag 9, confirmed today).
2. **REMOVE the "Brands We Sell" section and the two/three supplier badge logos** (Arctic Spas, Kubilų pasaulis wood-big, Spa Boy) — the pictures of brands must not appear. (Plan still lists them under Brand — operator overrode today.)
3. **Build out ALL remaining pages/services** from the current start: 9 hubs (Wood-Fired lead, Hot Tub Repair & Servicing, Electric, Installation, Pools & Swim Spas, Saunas, Arctic Spas Dealer (stays per flag 1), Commercial & Mosaic-Tiled Spas, Trade & Holiday Park), standalone pages Chemicals /parts/reviews/about/contact/terms-and-conditions/privacy-policy per plan.
4. **Email: DO NOT set up yet.** Operator handles mailbox himself. Form destination = admin@apexiamarketing.com ONLY for now (same fleet-swap exception). No david@ setup, no Google Workspace config from the build.
5. **Images**: David has sent a lot; pull everything available, dedupe against what exists, add what's missing to R2. Sources per plan §Images: (a) Whapi chat 447445450908@s.whatsapp.net — GET https://gate.whapi.cloud/messages/list/447445450908%40s.whatsapp.net?count=500 (&offset= to page), Authorization Bearer token from operator env, real browser User-Agent (else error 1010). (b) the supplier PDFs — EXTRACT IMAGES from the PDFs (not just text) into the pool; keep copyright attribution per flag 7 (attribute to Cumbria Spas Ltd, never the manufacturer). (c) current live site photos at https://www.cumbriaspas.co.uk/users/UserFiles/Image/ — download before domain moves.
6. **Never in the pool:** the 10 screenshots of 6-12 Oct (message ids in plan §Media), anything the operator sent, the Chill Gardens image (flag 8), dealer-range photos captioned as his installs.
7. **Reviews page = empty placeholder** (no reviews exist — flag 2). No GBP yet — no Google widget/link (flag 3); showroom map embed is fine.
8. **YouTube**: David has a channel — operator will supply later; leave video embeds TODO, note in report.

# R2 MEDIA (already there — the build's starting point)
- site-images/cumbriaspas/general/ = 63 dealer-range photos (20 Oct, manufacturer portfolio, tagged dealer-range)
- site-images/cumbriaspas/documents/ = 13 PDFs (brochure + CAD drawings; images extracted from these go in the pool)
- 18 Oct batch (47 wood-fired photos + 7 videos) may still sit in lmb-client-assets bucket — check and migrate into site-images/cumbriaspas/wood-fired/ if found; else re-pull from Whapi.
- Target structure (create): site-images/cumbriaspas/{wood-fired,electric,servicing,installation,pools,saunas,arctic,commercial,trade,brochure}/ + keep general/ as dealer-range reference. Name files descriptively. Record every new object in a manifest.
- Site uses them via public R2 URLs (same pattern as other v4 sites).

# CONTACT/FORM
- NAP exactly: Cumbria Spas, Hight Bridge Lodge, Kirkby In Furness, Cumbria, LA17 7TT · 0744 5450908 (WhatsApp same, wa.me/447445450908) · david@cumbriaspas.co.uk shown as text (mailbox not live yet — operator sets up).
- CTA site-wide: "Contact by the quote form, call now, or by WhatsApp."
- Formlane form via Hermes MCP key (/root/.hermes/secrets/formlane-hermes-key.env): website "Cumbria Spas website", form "Cumbria Spas — Quick Quote Online", LIVE at creation, allowed domains cumbriaspas.co.uk + www + the preview2 workers.dev subdomain, destination admin@apexiamarketing.com ONLY. Fields: standard quick-quote (name, email, phone BELOW email, postcode, message) — hot tub trade has no special dropdown per plan; keep it simple.
- Floating WhatsApp click-to-chat corner button every page.
- Servicing price: "from £250, depending on your location" allowed ONLY on Repair & Servicing pages. No other prices anywhere; "contact for prices"/"contact for a quote".
- id="contact" anchor; no test submissions.

# LEGAL PAGES
- /terms-and-conditions/ + /privacy-policy/ from plan legal/ files word for word + standard template language to cover gaps (cookies, hot tub sales vs repair-only, no online prices). Keep the four open decisions as TODO comments, note in report. Maroon "DO YOU NEED THIS?" line excluded.

# WRITING RULES (plan §What to write)
- Manufacturer sentence approved verbatim for every page: "Cumbria Spas works in partnership with Kubilų pasaulis, the largest manufacturer in Lithuania of premium, luxury and custom hot tubs."
- Never: reviews/ratings/widgets, Google listing references, Chill Gardens, manufacturer contact details/copyright notices, supplier contact details, checkout, team of staff, "the only Arctic dealer", prices, screenshots-as-images, company/VAT numbers, invented warranties/hours/response times.
- Residential AND commercial in passing on every hub/article. Showroom mentionable on home/hubs; articles say "Cumbria Spas' showroom", base never as article location.
- 24 standing prohibitions + site's own (seed negativeTopics) rule every page.
- Article budget: 9 hubs × 100 towns = 900 (seed articleCap). Build the engine wiring + seed; mass generation AFTER handoff.

# HOSTING/PROCESS
- Existing worker: deploy-guard name **site-cumbriaspires-preview2** (that's the live preview the operator uses). Repo: create/push TheK-Dawg/site-cumbriaspas (GitHub-first; the /root/projects/lead-gen-websites/cumbriaspires/site-2 checkout has NO .git — re-init it there or fresh clone of the new repo).
- Domain moves later (A2A Internet → operator handles); build on preview2 workers.dev for now.
- Verify with Playwright chromium (installed): home, all 9 hubs, chemicals, parts, reviews placeholder, about, contact, both legal pages, form renders, WhatsApp button, mobile + desktop.
- NO test leads. NO emails. NO AI images. NEVER generate brand/product imagery.
- Write BUILD-REPORT.md: commit SHA, worker version, R2 folders + counts (new images pulled from Whapi, images extracted from PDFs, live-site photos downloaded), form ref, open items.
- Print CUMBRIA_BUILD_DONE when complete.
