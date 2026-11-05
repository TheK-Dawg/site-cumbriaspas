const { createRequire } = require("node:module");
const rq = createRequire("/root/projects/lead-gen-websites/invicta-construction-finishes/package.json");
const { chromium } = rq("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 360, height: 800 } });
  await p.goto("https://site-cumbriaspires-preview2.small-bird-3273.workers.dev/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("a[href*='#quote']")[0].click());
  await p.waitForTimeout(2500);
  const r = await p.evaluate(() => {
    const f = document.getElementById("quote");
    const i = f.querySelector("input:not([type=hidden])");
    const ir = i.getBoundingClientRect();
    const hr = document.querySelector("[data-header]").getBoundingClientRect().bottom;
    return JSON.stringify({ inputTop: Math.round(ir.top), headerBottom: Math.round(hr), firstField: i.name });
  });
  console.log(r);
  await b.close();
})();