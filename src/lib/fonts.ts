/**
 * Every font on this site is self-hosted via next/font/local, loading
 * files vendored into src/fonts/ (see scripts/vendor-fonts.mjs) rather
 * than fetched from Google's font CDN at dev/build time via
 * next/font/google.
 *
 * next/font/google requires reaching fonts.googleapis.com /
 * fonts.gstatic.com every time the dev server starts or the site is
 * built. On a network that can't reliably reach that CDN (corporate
 * proxy, firewall, geo-restriction), `next dev` hangs in an infinite
 * retry loop and the site never compiles — this happened in practice.
 * Self-hosting the exact same font files removes that dependency
 * entirely: once `npm install` has fetched the @fontsource packages
 * (over the same npm registry connection used for every other
 * dependency) and scripts/vendor-fonts.mjs has copied the files in,
 * nothing here ever touches the network again.
 *
 * Every exported variable name below is unchanged from before, so no
 * other file in the project needed to change.
 */
import localFont from "next/font/local";

// Ember & Olive (restaurant) — warm editorial serif + a plain grotesque body
export const restaurantDisplay = localFont({
  src: [
    { path: "../fonts/dm-serif-display/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dm-serif-display/400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-restaurant-display",
  display: "swap",
});
export const restaurantBody = localFont({
  src: [
    { path: "../fonts/work-sans/300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/work-sans/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/work-sans/500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-restaurant-body",
  display: "swap",
});

// The Aurelia House (hotel) — wide, quiet, classical
export const hotelDisplay = localFont({
  src: [
    { path: "../fonts/cormorant-garamond/300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-garamond/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond/500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-hotel-display",
  display: "swap",
});
export const hotelBody = localFont({
  src: [
    { path: "../fonts/jost/300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/jost/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jost/500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-hotel-body",
  display: "swap",
});

// Maison Form (salon) — high-contrast fashion serif + geometric sans
export const salonDisplay = localFont({
  src: [
    { path: "../fonts/bodoni-moda/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/bodoni-moda/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/bodoni-moda/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/bodoni-moda/400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/bodoni-moda/500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/bodoni-moda/600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-salon-display",
  display: "swap",
});
export const salonBody = localFont({
  src: [
    { path: "../fonts/space-grotesk/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/space-grotesk/500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-salon-body",
  display: "swap",
});

// Northline (service business) — single clean sans, no serif at all
export const serviceFont = localFont({
  src: [
    { path: "../fonts/plus-jakarta-sans/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/plus-jakarta-sans/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/plus-jakarta-sans/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/plus-jakarta-sans/700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/plus-jakarta-sans/800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-service",
  display: "swap",
});

// Fielding & Rye (retail / e-commerce) — bold geometric display for
// product/brand moments, a plain warm sans for spec-heavy body copy
export const retailDisplay = localFont({
  src: [
    { path: "../fonts/syne/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/syne/700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/syne/800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-retail-display",
  display: "swap",
});
export const retailBody = localFont({
  src: [
    { path: "../fonts/manrope/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/manrope/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/manrope/700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-retail-body",
  display: "swap",
});

// Halyard Property (real estate) — a quiet classical serif for
// authority, paired with a data-dense sans built for spec tables
export const estateDisplay = localFont({
  src: [{ path: "../fonts/marcellus/400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-estate-display",
  display: "swap",
});
export const estateBody = localFont({
  src: [
    { path: "../fonts/public-sans/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/public-sans/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/public-sans/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/public-sans/700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-estate-body",
  display: "swap",
});

// Vantage Athletic Club (fitness / gym) — condensed poster display, plain
// workhorse body
export const fitnessDisplay = localFont({
  src: [{ path: "../fonts/anton/400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-fitness-display",
  display: "swap",
});
export const fitnessBody = localFont({
  src: [
    { path: "../fonts/barlow/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/barlow/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/barlow/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow/700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-fitness-body",
  display: "swap",
});

// Willowmere Dental Care (clinic / healthcare) — a warm literary serif for
// calm authority, a rounded-feeling sans for body copy
export const clinicDisplay = localFont({
  src: [
    { path: "../fonts/literata/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/literata/600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clinic-display",
  display: "swap",
});
export const clinicBody = localFont({
  src: [
    { path: "../fonts/karla/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/karla/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/karla/600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clinic-body",
  display: "swap",
});

// Rowan & Ash Photography — one restrained serif family, display and body
export const photoFont = localFont({
  src: [
    { path: "../fonts/spectral/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/spectral/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/spectral/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/spectral/400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/spectral/500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/spectral/600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-photo",
  display: "swap",
});

// Wayfare & Co (travel / tours) — warm inviting serif, friendly rounded sans
export const travelDisplay = localFont({
  src: [
    { path: "../fonts/petrona/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/petrona/600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-travel-display",
  display: "swap",
});
export const travelBody = localFont({
  src: [
    { path: "../fonts/nunito-sans/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/nunito-sans/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/nunito-sans/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/nunito-sans/700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-travel-body",
  display: "swap",
});

// Ridgeline Motors (auto dealership) — confident condensed display, plain
// spec-sheet body
export const autoDisplay = localFont({
  src: [
    { path: "../fonts/oswald/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/oswald/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/oswald/700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-auto-display",
  display: "swap",
});
export const autoBody = localFont({
  src: [
    { path: "../fonts/roboto/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/roboto/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/roboto/700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-auto-body",
  display: "swap",
});

// Linden & Rose Events (wedding / events) — a tall elegant display, a soft
// humanist body
export const weddingDisplay = localFont({
  src: [{ path: "../fonts/italiana/400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-wedding-display",
  display: "swap",
});
export const weddingBody = localFont({
  src: [
    { path: "../fonts/mulish/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/mulish/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/mulish/600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-wedding-body",
  display: "swap",
});

// Cobalt Institute (education / training) — a literary serif for
// institutional warmth, a clean sans for program/curriculum copy
export const eduDisplay = localFont({
  src: [
    { path: "../fonts/newsreader/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/newsreader/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/newsreader/500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/newsreader/600-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-edu-display",
  display: "swap",
});
export const eduBody = localFont({
  src: [
    { path: "../fonts/source-sans-3/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/source-sans-3/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/source-sans-3/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/source-sans-3/700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-edu-body",
  display: "swap",
});

// Marrow & Stone (construction / architecture) — an industrial condensed
// display for a blueprint feel, a technical sans for body copy
export const constructionDisplay = localFont({
  src: [
    { path: "../fonts/big-shoulders-display/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/big-shoulders-display/700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/big-shoulders-display/800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-construction-display",
  display: "swap",
});
export const constructionBody = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-sans/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ibm-plex-sans/600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-construction-body",
  display: "swap",
});
