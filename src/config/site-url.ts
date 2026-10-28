/**
 * The public origin of the deployed site, used for canonical URLs, Open Graph,
 * the sitemap, robots.txt and llms.txt.
 *
 * Resolution order (first one set wins):
 *   1. NEXT_PUBLIC_SITE_URL           — set this on any host. Wins over all.
 *   2. URL                            — provided automatically by Netlify.
 *   3. VERCEL_PROJECT_PRODUCTION_URL  — provided automatically by Vercel.
 *   4. http://localhost:3000          — local development only.
 *
 * Nothing is guessed. If a production build falls through to (4), the
 * prebuild check (scripts/check-seo-env.mjs) says so loudly.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "http://localhost:3000";
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

/** Absolute URL for a site path such as "/demos/retail". */
export function absoluteUrl(path = "/"): string {
  return `${getSiteUrl()}${path === "/" ? "" : path}`;
}
