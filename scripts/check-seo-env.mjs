// Runs before `npm run build`. Prints what the SEO setup will use, and warns
// loudly if the production URL is not configured, because canonical URLs, the
// sitemap, robots.txt and llms.txt would otherwise point at localhost.
// Set SEO_STRICT=1 to make a missing URL fail the build.
const url = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
const g = !!process.env.GOOGLE_SITE_VERIFICATION, b = !!process.env.BING_SITE_VERIFICATION;
console.log("\n[seo] site URL:", url || "NOT SET (falls back to http://localhost:3000)");
console.log("[seo] Google verification tag:", g ? "set" : "not set", "| Bing verification tag:", b ? "set" : "not set");
if (!url) {
  console.warn("[seo] WARNING: no production URL. Set NEXT_PUBLIC_SITE_URL (e.g. https://yourdomain.com) before deploying,");
  console.warn("[seo]          or canonical, sitemap.xml, robots.txt and llms.txt will contain localhost addresses.\n");
  if (process.env.SEO_STRICT === "1") process.exit(1);
}
