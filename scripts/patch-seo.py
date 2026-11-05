"""One-off: tighten every title (<= 60 chars) and meta description (140-158)."""
import re

S = {
    'plumber': ('Plumber in Norwich | Repairs and Fitting | 247 Plumbers', 'A local plumber for Norwich homes and rentals: taps, toilets, showers, stopcocks, outside taps and pipework, priced before the visit. Quick Quote Online.'),
    'drain-unblocking': ('Drain Unblocking in Norwich | Jetting, CCTV | 247 Plumbers', 'Blocked drains, sinks, toilets and gullies cleared across Norwich with rods, jetting and CCTV surveys, plus repairs on old clay runs. Quick Quote Online.'),
    'underfloor-heating': ('Underfloor Heating in Norwich | Fit, Repair | 247 Plumbers', 'Wet and electric underfloor heating installed and repaired in Norwich: extensions, kitchens, bathrooms, cold zones and controls. Quick Quote Online.'),
    'boiler-service': ('Boiler Service in Norwich | Annual Servicing | 247 Plumbers', 'Annual boiler service in Norwich: combustion and flue tested, safety devices checked, cleaned and adjusted, with a written record. Book a service online.'),
    '247-emergency-plumber': ('Emergency Plumber in Norwich | Day and Night | 247 Plumbers', 'Emergency plumber for Norwich and twenty miles around: burst pipes, leaks, boilers down in winter, drains backing up. Requests taken day and night.'),
    'boiler-installation': ('New Boiler Installation in Norwich | Replace | 247 Plumbers', 'New boiler installation in Norwich: combi, system and heat-only boilers sized to the house, system flushed, controls set, guarantee registered.'),
    'gas-safety-certificate': ('Gas Safety Certificate in Norwich | CP12 | 247 Plumbers', 'Landlord gas safety certificates (CP12) in Norwich: every appliance and flue checked, the record issued on the day, boiler service bundled. Book online.'),
    'bathroom-installation': ('Bathroom Installation in Norwich | Fitters | 247 Plumbers', 'Bathroom fitters for Norwich homes: full installations, wet rooms, en-suites and refits, plumbing, drainage, tiling and electrics in one price.'),
    'boiler-repair': ('Boiler Repair in Norwich | Breakdowns Fixed | 247 Plumbers', 'Boiler repairs across Norwich: fault codes, lockouts, no hot water, dropping pressure, noisy boilers. Diagnosed first, priced before any part is fitted.'),
    'hot-water-cylinder': ('Hot Water Cylinders in Norwich | Unvented | 247 Plumbers', 'Hot water cylinder installation, replacement, servicing and repair in Norwich: unvented mains-pressure and vented cylinders, immersions, thermostats.'),
    'leak-detection': ('Water Leak Detection in Norwich | Hidden | 247 Plumbers', 'Hidden water leaks traced across Norwich with pressure tests, thermal imaging and acoustic methods, then repaired and reported for insurance.'),
    'central-heating-installation': ('Central Heating Installation Norwich | 247 Plumbers', 'Central heating engineers for Norwich: full systems from a heat-loss survey, new radiators and pipework, repairs, controls and upgrades. Quick Quote.'),
    'power-flushing': ('Power Flushing in Norwich | Heating Flush | 247 Plumbers', 'Power flushing for Norwich heating systems: cold radiators, noisy boilers and black water cleared, then protected with inhibitor and a filter.'),
    'radiator-repair': ('Radiator Repair in Norwich | Replace and Fit | 247 Plumbers', 'Radiator repairs, replacements and new radiators in Norwich: leaking valves, cold spots, noisy radiators, thermostatic valves. Diagnosed, then fixed.'),
    'leaking-pipes': ('Leaking Pipe Repair in Norwich | Bursts Too | 247 Plumbers', 'Leaking and burst pipes repaired across Norwich: weeping joints, pinholed copper, split plastic, frozen pipes. Fixed at the source, never patched.'),
}
for slug, (t, d) in S.items():
    p = f'src/data/services/{slug if slug != "247-emergency-plumber" else "emergency-plumber"}.ts'
    s = open(p).read()
    s = re.sub(r"metaTitle: '.*?',\n", f"metaTitle: '{t}',\n", s, count=1)
    s = re.sub(r"  description: '.*?',\n", f"  description: '{d}',\n", s, count=1)
    open(p, 'w').write(s)
    assert len(t) <= 60 and 140 <= len(d) <= 158, (slug, len(t), len(d))

# AREAS LAW: the per-town area pages were removed; /areas/ is one page and its title lives in PAGES below.

R = {
    'hard-water-limescale-norfolk-homes': ('Hard Water and Limescale in Norfolk Homes | 247 Plumbers', 'Norfolk sits on chalk, so its tap water is hard. What limescale does to boilers, cylinders and showers, the warning signs, and the fixes worth the money.'),
    'blocked-drain-older-norwich-house': ('Blocked Drains in Older Norwich Houses | 247 Plumbers', 'Old clay drains and shared runs change what a blockage means. What to try on a blocked sink, toilet or gully, when to stop, and what a CCTV survey shows.'),
    'frozen-burst-pipes-first-ten-minutes': ('Frozen and Burst Pipes: What To Do First | 247 Plumbers', 'A burst pipe does its damage in the first ten minutes. Where the stopcock is, how to shut off and drain down, how to thaw a pipe safely, how to prevent it.'),
}
p = 'src/data/articles.ts'
s = open(p).read()
for slug, (t, d) in R.items():
    s, n = re.subn(r"(slug: '" + slug + r"',\n    title: '.*?',\n    metaTitle: )'.*?',\n    description: '.*?',", lambda m: m.group(1) + f"'{t}',\n    description: '{d}',", s, count=1)
    assert n == 1, slug
    assert len(t) <= 60 and 140 <= len(d) <= 158, (slug, len(t), len(d))
open(p, 'w').write(s)

PAGES = {
    'src/pages/services/index.astro': ('Plumbing and Heating Services in Norwich | 247 Plumbers', 'Every plumbing, heating, boiler, drainage and bathroom service offered across Norwich and Norfolk, grouped by the part of the house it belongs to.'),
    'src/pages/areas/index.astro': ('Areas Covered Around Norwich | Norfolk Towns | 247 Plumbers', 'Every town within twenty miles of Norwich where plumbing, heating, boiler and drain work is booked: the city, the Broads, the market towns and the coast.'),
    'src/pages/about.astro': ('About 247 Plumbers Norwich | Plumbing and Heating', 'How 247 Plumbers Norwich works: one form for fifteen plumbing and heating services, a call back to arrange the visit and a written price before any work.'),
    'src/pages/contact.astro': ('Contact a Plumber in Norwich | Quick Quote | 247 Plumbers', 'Contact 247 Plumbers Norwich: send the Quick Quote form or an email, get a call back to arrange the visit and a written price. Norwich and twenty miles.'),
    'src/pages/resources/index.astro': ('Plumbing and Heating Guides for Norfolk | 247 Plumbers', 'Practical guides for Norwich and Norfolk households: hard water and limescale, blocked drains in older houses, and the first minutes after a pipe bursts.'),
    'src/pages/thank-you.astro': ('Enquiry Sent | 247 Plumbers Norwich', 'Your Quick Quote request has been received. What happens next: a call back to arrange the visit and a written price before any work starts on the job.'),
    'src/pages/404.astro': ('Page Not Found | 247 Plumbers Norwich', 'That page is not here. The plumbing and heating services, the areas covered around Norwich and the front page are all one click away from this one.'),
    'src/pages/terms.astro': ('Terms and Conditions | 247 Plumbers Norwich', 'The terms on which 247 Plumbers Norwich takes enquiries, gives quotes and arranges plumbing and heating work across Norwich and the surrounding towns.'),
    'src/pages/privacy.astro': ('Privacy Policy | 247 Plumbers Norwich', 'How 247 Plumbers Norwich handles the details sent through its enquiry form and by email: what is collected, why, who sees it, how long it is kept.'),
}
for p, (t, d) in PAGES.items():
    s = open(p).read()
    s, n = re.subn(r'title="[^"]*" description="[^"]*"', f'title="{t}" description="{d}"', s, count=1)
    assert n == 1, p
    assert len(t) <= 60 and 140 <= len(d) <= 158, (p, len(t), len(d))
    open(p, 'w').write(s)

p = 'src/data/site.ts'
s = open(p).read()
t = 'Plumber in Norwich | Heating, Drains, Emergencies | 247 Plumbers'
d = 'Plumbing, boiler, heating and drain services across Norwich and Norfolk: repairs, installations, gas safety certificates and emergency plumbing. Quick Quote.'
assert len(t) <= 65 and 140 <= len(d) <= 158, (len(t), len(d))
s, n = re.subn(r"  title: '.*?',\n  description: '.*?',", f"  title: '{t}',\n  description: '{d}',", s, count=1)
assert n == 1
open(p, 'w').write(s)
print('patched')
