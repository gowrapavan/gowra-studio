import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/config/site-url";
import { OG_IMAGE } from "@/lib/seo";
import { ScrollManager } from "@/components/ScrollManager";
import { NavigationProgress } from "@/components/NavigationProgress";

// Self-hosted (see src/lib/fonts.ts for why: no Google Fonts network
// dependency at dev/build time).
const syne = localFont({
  src: [
    { path: "../fonts/syne/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/syne/700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/syne/800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-studio-display",
  display: "swap",
});

const manrope = localFont({
  src: [
    { path: "../fonts/manrope/400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope/500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/manrope/600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/manrope/700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-studio-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// The home title says what the studio is and does, in the words people search
// with. If a service area is configured it is included ("... in Guntur").
const homeTitle = siteConfig.serviceArea
  ? `Website Designer & Developer in ${siteConfig.serviceArea} — ${siteConfig.companyName}`
  : `Website Designer & Developer for Local Businesses — ${siteConfig.companyName}`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: homeTitle, template: `%s — ${siteConfig.companyName}` },
  description: siteConfig.description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    url: "./",
    siteName: siteConfig.companyName,
    locale: "en",
    title: homeTitle,
    description: siteConfig.description,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: siteConfig.description, images: [OG_IMAGE] },
  // Search-engine ownership tags. Emitted only when the value is set in the
  // environment (see DEPLOY.md); no placeholder is ever rendered.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
};

/**
 * The homepage previews are sandboxed iframes with an opaque origin. They are
 * never clicked, but Next still tries to prefetch their links, and the browser
 * refuses those cross-origin requests, which only fills the console with
 * errors. Inside such a frame, prefetch requests are simply left pending.
 */
const PREVIEW_FRAME_GUARD = `(function(){try{if(window.top===window||window.origin!=="null")return;var f=window.fetch;window.fetch=function(i,o){var h=o&&o.headers;if(h&&(h.RSC||h.rsc))return new Promise(function(){});return f.apply(this,arguments)}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREVIEW_FRAME_GUARD }} />
      </head>
      <body className="textured font-body bg-paper text-ink antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        <ScrollManager />
        {children}
        <NavigationProgress />
      </body>
    </html>
  );
}
