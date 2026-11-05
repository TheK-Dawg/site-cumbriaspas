const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 360, height: 800 } });
  await page.goto("https://site-cumbriaspires-preview2.small-bird-3273.workers.dev/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelector("a[href='#quote']").click());
  await page.waitForTimeout(1200);
  const r = await page.evaluate(() => {
    const form = document.getElementById("quote");
    const firstInput = form.querySelector("input:not([type=hidden])");
    const ir = firstInput.getBoundingClientRect();
    const hr = document.querySelector("[data-header]").getBoundingClientRect().bottom;
    return { inputTop: Math.round(ir.top), headerBottom: Math.round(hr), firstInputIsName: firstInput.name };
  });
  console.log(JSON.stringify(r));
  await b.close();
})();