// Mobile audit: crawls every internal /demos route from "/" in a phone viewport and
// reports horizontal overflow, off-screen elements, small tap targets, form fields
// under 16px (which make iOS zoom), and text under 12px. Screenshots go to ./audit-shots.
//
// Usage:  npm run build && npm start      (in one terminal)
//         npx playwright install chromium (once)
//         npm run audit:mobile            (U=http://localhost:3000 W=390 H=844 to override)
import fs from "node:fs";
const { chromium } = await import("playwright");
const U = process.env.U || "http://localhost:3000";
const W = +(process.env.W || 390), H = +(process.env.H || 844);
const only = process.env.ONLY ? process.env.ONLY.split(",") : null;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
const seen = new Set(), queue = ["/"]; const rows = [];
fs.mkdirSync("audit-shots", { recursive: true });
while (queue.length) {
  const path = queue.shift(); if (seen.has(path)) continue; seen.add(path);
  const p = await ctx.newPage();
  await p.goto(U + path, { waitUntil: "load" }).catch(() => {});
  await p.waitForTimeout(700);
  // scroll to trigger lazy/reveal
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } document.documentElement.style.scrollBehavior='auto'; scrollTo(0, 0); });
  await p.waitForTimeout(900);
  const links = await p.$$eval("a[href]", a => [...new Set(a.map(x => x.getAttribute("href")).filter(h => h && h.startsWith("/") && !h.startsWith("//")).map(h => h.split("#")[0].split("?")[0]))]);
  for (const l of links) if ((l === "/" || l.startsWith("/demos")) && !seen.has(l)) queue.push(l);
  if (only && !only.some(o => path.startsWith(o))) { await p.close(); continue; }
  const r = await p.evaluate(() => {
    const vw = innerWidth; const out = { overflow: document.documentElement.scrollWidth - vw, offenders: [], tiny: [], inputs: [], small: [], noViewport: !document.querySelector('meta[name=viewport]'), fixedCover: [] };
    const vis = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && !e.closest(".sr-only") && !e.closest("[aria-hidden=true]"); };
    const inScroller = e => { let n = e.parentElement; while (n && n !== document.body) { const o = getComputedStyle(n).overflowX; if ((o === "auto" || o === "scroll" || o === "hidden") && n.scrollWidth > n.clientWidth - 1 || o === "hidden" && n.getBoundingClientRect().right <= vw + 1) return true; if (o === "auto" || o === "scroll") return true; n = n.parentElement; } return false; };
    const sig = e => e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.split(/\s+/).slice(0, 3).join(".") : "") + " «" + (e.textContent || "").trim().slice(0, 24) + "»";
    document.querySelectorAll("body *").forEach(e => {
      if (!vis(e)) return; const r = e.getBoundingClientRect();
      if ((r.right > vw + 1 || r.left < -1) && !inScroller(e)) { const cs = getComputedStyle(e); if (cs.position !== "fixed" && out.offenders.length < 6) out.offenders.push(sig(e) + " r=" + Math.round(r.right)); }
    });
    document.querySelectorAll("a[href],button,summary,select,input:not([type=hidden]):not([type=checkbox]):not([type=radio]),textarea,[role=button]").forEach(e => {
      if (!vis(e)) return; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
      const inline = cs.display === "inline" && e.tagName === "A";
      if (!inline && r.height < 38 && !(e.tagName === "A" && e.closest("p,li") && cs.display.startsWith("inline") && false)) out.small.push(sig(e) + " " + Math.round(r.width) + "x" + Math.round(r.height));
      if (inline && r.height < 24) out.small.push("(inline) " + sig(e) + " h=" + Math.round(r.height));
      if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.tagName) && parseFloat(cs.fontSize) < 16) out.inputs.push(sig(e) + " fs=" + cs.fontSize);
    });
    let tiny = 0; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) { const t = tw.currentNode; if (!t.textContent.trim()) continue; const e = t.parentElement; if (!vis(e)) continue; if (parseFloat(getComputedStyle(e).fontSize) < 12) tiny++; }
    out.tiny = tiny;
    document.querySelectorAll("body *").forEach(e => { const cs = getComputedStyle(e); if (cs.position === "fixed" && vis(e)) { const r = e.getBoundingClientRect(); if (r.height * r.width > vw * innerHeight * 0.25) out.fixedCover.push(sig(e)); } });
    return out;
  });
  const slug = path.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "home";
  await p.screenshot({ path: `audit-shots/${slug}-fold.png` });
  await p.screenshot({ path: `audit-shots/${slug}-full.png`, fullPage: true });
  rows.push({ path, ...r }); await p.close();
}
let bad = 0;
for (const r of rows) {
  const issues = [];
  if (r.overflow > 0) issues.push("OVERFLOW +" + r.overflow);
  if (r.offenders.length) issues.push("offscreen: " + r.offenders.join(" | "));
  if (r.noViewport) issues.push("no viewport meta");
  if (r.inputs.length) issues.push("inputs<16px: " + r.inputs.slice(0, 3).join(" | "));
  if (r.small.length) issues.push(`small targets(${r.small.length}): ` + r.small.slice(0, 5).join(" | "));
  if (r.tiny) issues.push("text<12px x" + r.tiny);
  if (r.fixedCover.length) issues.push("big fixed: " + r.fixedCover.join(","));
  console.log((issues.length ? "✗ " : "✓ ") + r.path + (issues.length ? "\n    " + issues.join("\n    ") : "")); if (issues.length) bad++;
}
console.log(`\n${rows.length} routes crawled at ${W}x${H}; ${bad} with issues`);
await b.close();
