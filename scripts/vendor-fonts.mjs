/**
 * One-time (dev-machine) step: copies exact woff2 files out of the
 * @fontsource packages (installed as normal npm dependencies) into
 * src/fonts/, so next/font/local can serve them with zero runtime network
 * dependency on Google's font CDN.
 *
 * Why this exists: next/font/google fetches font files from
 * fonts.googleapis.com / fonts.gstatic.com at dev-server start and at
 * build time. On a network that can't reliably reach Google's CDN
 * (corporate proxy, firewall, geo-restriction), `next dev` hangs in a
 * retry loop and the site never finishes compiling. @fontsource ships
 * the identical font files as regular npm packages — fetched over the
 * same npm registry connection that already installs react/next — so
 * self-hosting removes the Google Fonts network dependency entirely.
 *
 * Run with: node scripts/vendor-fonts.mjs
 * (this has already been run for this delivery; re-run only if a font
 * is added to src/lib/fonts.ts or src/app/layout.tsx)
 */
import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const NM = join(process.cwd(), "node_modules", "@fontsource");
const OUT = join(process.cwd(), "src", "fonts");

// [outputSlug, fontsourcePackageSlug, [[weight, style], ...]]
const manifest = [
  ["dm-serif-display", "dm-serif-display", [[400, "normal"], [400, "italic"]]],
  ["work-sans", "work-sans", [[300, "normal"], [400, "normal"], [500, "normal"]]],
  ["cormorant-garamond", "cormorant-garamond", [[300, "normal"], [400, "normal"], [500, "normal"]]],
  ["jost", "jost", [[300, "normal"], [400, "normal"], [500, "normal"]]],
  ["bodoni-moda", "bodoni-moda", [[400, "normal"], [500, "normal"], [600, "normal"], [400, "italic"], [500, "italic"], [600, "italic"]]],
  ["space-grotesk", "space-grotesk", [[400, "normal"], [500, "normal"]]],
  ["plus-jakarta-sans", "plus-jakarta-sans", [[400, "normal"], [500, "normal"], [600, "normal"], [700, "normal"], [800, "normal"]]],
  ["syne", "syne", [[600, "normal"], [700, "normal"], [800, "normal"]]],
  ["manrope", "manrope", [[400, "normal"], [500, "normal"], [600, "normal"], [700, "normal"]]],
  ["marcellus", "marcellus", [[400, "normal"]]],
  ["public-sans", "public-sans", [[400, "normal"], [500, "normal"], [600, "normal"], [700, "normal"]]],
  ["anton", "anton", [[400, "normal"]]],
  ["barlow", "barlow", [[400, "normal"], [500, "normal"], [600, "normal"], [700, "normal"]]],
  ["literata", "literata", [[500, "normal"], [600, "normal"]]],
  ["karla", "karla", [[400, "normal"], [500, "normal"], [600, "normal"]]],
  ["spectral", "spectral", [[400, "normal"], [500, "normal"], [600, "normal"], [400, "italic"], [500, "italic"], [600, "italic"]]],
  ["petrona", "petrona", [[500, "normal"], [600, "normal"]]],
  ["nunito-sans", "nunito-sans", [[400, "normal"], [500, "normal"], [600, "normal"], [700, "normal"]]],
  ["oswald", "oswald", [[500, "normal"], [600, "normal"], [700, "normal"]]],
  ["roboto", "roboto", [[400, "normal"], [500, "normal"], [700, "normal"]]],
  ["italiana", "italiana", [[400, "normal"]]],
  ["mulish", "mulish", [[400, "normal"], [500, "normal"], [600, "normal"]]],
  ["newsreader", "newsreader", [[500, "normal"], [600, "normal"], [500, "italic"], [600, "italic"]]],
  ["source-sans-3", "source-sans-3", [[400, "normal"], [500, "normal"], [600, "normal"], [700, "normal"]]],
  ["big-shoulders-display", "big-shoulders-display", [[600, "normal"], [700, "normal"], [800, "normal"]]],
  ["ibm-plex-sans", "ibm-plex-sans", [[400, "normal"], [500, "normal"], [600, "normal"]]],
  ["fraunces", "fraunces", [[400, "normal"], [500, "normal"], [600, "normal"], [400, "italic"], [500, "italic"], [600, "italic"]]],
  ["inter", "inter", [[400, "normal"], [500, "normal"], [600, "normal"], [700, "normal"]]],
];

let copied = 0;
let missing = 0;

for (const [outSlug, pkgSlug, combos] of manifest) {
  const destDir = join(OUT, outSlug);
  mkdirSync(destDir, { recursive: true });
  for (const [weight, style] of combos) {
    const fileName = `${pkgSlug}-latin-${weight}-${style}.woff2`;
    const src = join(NM, pkgSlug, "files", fileName);
    const dest = join(destDir, `${weight}-${style}.woff2`);
    if (!existsSync(src)) {
      console.error(`missing: ${src}`);
      missing++;
      continue;
    }
    copyFileSync(src, dest);
    copied++;
  }
}

console.log(`Vendored ${copied} font files into src/fonts/ (${missing} missing).`);
if (missing > 0) process.exit(1);
