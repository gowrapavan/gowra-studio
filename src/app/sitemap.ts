import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site-url";
import { studioDemos } from "@/config/studio-demos";
import { products } from "@/config/retail-products";
import { listings } from "@/config/realestate-listings";

/**
 * Every public page, built from the same data that renders the site, so it
 * cannot drift. `lastModified` is intentionally omitted: stamping every URL
 * with the build time would claim changes that did not happen, and search
 * engines learn to ignore a lastmod that is always "now".
 */
const innerPages = [
  "/website-design-and-development",
  "/demos/restaurant/menu",
  "/demos/hotel/rooms",
  "/demos/salon/services",
  "/demos/fitness/schedule",
  "/demos/clinic/treatments",
  "/demos/photography/portfolio",
  "/demos/travel/trips",
  "/demos/auto/financing",
  "/demos/wedding/weddings",
  "/demos/wedding/packages",
  "/demos/education/programs",
  "/demos/construction/projects",
  "/demos/retail/shop",
  "/demos/realestate/listings",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...studioDemos.map((d) => `/demos/${d.slug}`),
    ...innerPages,
    ...products.map((p) => `/demos/retail/shop/${p.slug}`),
    ...listings.map((l) => `/demos/realestate/listings/${l.slug}`),
  ];
  return [...new Set(paths)].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : path === "/website-design-and-development" ? 0.9 : path.split("/").length <= 3 ? 0.8 : 0.6,
  }));
}
