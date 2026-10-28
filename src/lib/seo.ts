import type { Metadata } from "next";

/** Static 1200x630 preview in /public: no runtime image generation, so it behaves the same on every OS and host. */
export const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Gowra Studio: see the website we would build for your business" };

/**
 * Adds Open Graph and Twitter tags to a page's own title and description, so
 * a shared link previews the page that was shared instead of repeating the
 * homepage. The canonical URL and og:url are resolved per route ("./") by
 * Next against metadataBase (see app/layout.tsx).
 */
export function withSocial(meta: Metadata): Metadata {
  const title = typeof meta.title === "string" ? meta.title : undefined;
  const description = meta.description ?? undefined;
  return {
    ...meta,
    alternates: { canonical: "./", ...meta.alternates },
    openGraph: {
      type: "website",
      url: "./",
      siteName: "Gowra Studio",
      title,
      description,
      images: [OG_IMAGE],
      ...meta.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
      ...meta.twitter,
    },
  };
}
