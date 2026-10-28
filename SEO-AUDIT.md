# SEO launch audit — Gowra Studio

Evidence-based record. "Local build" means `npm run build` + `npm start` on a
development machine with `NEXT_PUBLIC_SITE_URL=https://seo-test.example.com`
(a placeholder used only to prove the URLs are driven by configuration).
No production site, Google account or Bing account was accessible.

## Four separate conditions
1. Implemented in source  2. Working on the production site  3. Registered with a search engine  4. Indexed.
Only (1) and a local-build version of (2) could be tested. (3) and (4) are outstanding.

## Before / after

| Requirement | Before | After (local build) | Still outstanding |
|---|---|---|---|
| Google Search Console readiness | **FAIL**: sitemap and robots pointed at `https://example.com`; no verification support | **PARTIAL**: `GOOGLE_SITE_VERIFICATION` emits `google-site-verification`; sitemap and robots use the configured origin | Deploy, set the token, click Verify, submit sitemap |
| sitemap.xml | **FAIL**: `example.com` URLs; `lastmod` = build time on every URL (false) | **PASS**: 41 URLs, valid urlset, unique, absolute, no query strings, no `lastmod`; built from site data | Fetch it on the live domain |
| llms.txt | **OPTIONAL** (404) | **PASS** (optional): `/llms.txt` 200 `text/plain`, generated from site data, no localhost links | Live check |
| Open Graph / social | **FAIL**: no `og:image`, `og:url` or canonical; `twitter:card` with no image; demo pages repeated the homepage's `og:title`; two pages had no title or description | **PASS**: all 41 pages have exactly one title, description, canonical, `og:title/description/url/image`, `twitter:image`; unique titles and descriptions; canonical = og:url = sitemap URL; preview is a real 1200x630 PNG | Check a shared link on real platforms (they cache and may differ) |
| Bing Webmaster Tools readiness | **FAIL**: no verification support, bad sitemap URL | **PARTIAL**: `BING_SITE_VERIFICATION` emits `msvalidate.01`; robots references the sitemap | Deploy, set the token, Verify, submit sitemap |

## Score (transparent method)
Each of the five requirements is worth 2 points: 1 for implemented and
verified on a local production build, 1 for confirmed on the live site and with
the search engine. Before: 0/10. After: **5/10 now, with every local point earned**;
the other 5 can only be earned by the deploy and registration steps in DEPLOY.md.
Nothing is reported as indexed or verified, because it is not.

## Tests performed
- Rendered HTML of all 41 sitemap URLs fetched; tag counts, canonical/og:url equality, duplicate titles and descriptions
- Sitemap parsed as XML against the sitemap namespace; localhost/example.com and `?` URLs searched for
- robots.txt, llms.txt, `/og-image.png` (PNG signature and 1200x630)
- Verification tags absent when env unset (baseline), present when set
- JSON-LD parsed as valid JSON
- Regression: 33 studio browser checks, form error state, mobile audit on 41 routes

## Not tested
Live domain; Google or Bing verification; sitemap submission; indexing; platform link-preview caches.


## Update: targeting "website designer / developer" searches
Changed (invisible to visitors): homepage title and description, structured data
(Organization + ProfessionalService with six services, WebSite; area, email and
phone only when configured; no ratings), llms.txt and sitemap. Added: one page,
`/website-design-and-development`, with FAQ structured data whose questions are
all visible on the page. Verified on a local production build: all 41 existing
pages render identical HTML before and after; 42 sitemap URLs, 0 duplicate
titles, 1 canonical each. Not verified: live indexing or ranking, which depend
on time, competition and off-site signals.
