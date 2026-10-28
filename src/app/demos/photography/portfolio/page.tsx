import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { photography } from "@/config/images";
import { PhotographyShell } from "../PhotographyShell";
import { PortfolioGallery, type Work } from "./PortfolioGallery";

export const metadata: Metadata = withSocial({
  title: "Portfolio — Rowan & Ash Photography (demo)",
  description: "A filterable portfolio of portraits, events, landscapes and details, with a full-size viewer.",
});

const works: Work[] = [
  { photo: photography.portraitOne, ratio: "3 / 4", cat: "Portraits" },
  { photo: photography.eventTwo, ratio: "4 / 3", cat: "Landscape" },
  { photo: photography.detailOne, ratio: "1 / 1", cat: "Details" },
  { photo: photography.portraitTwo, ratio: "3 / 4", cat: "Portraits" },
  { photo: photography.eventOne, ratio: "4 / 3", cat: "Events" },
  { photo: photography.camera, ratio: "1 / 1", cat: "Details" },
  { photo: photography.hero, ratio: "3 / 4", cat: "Landscape" },
];

export default function Portfolio() {
  return (
    <PhotographyShell>
      <main id="main" className="px-3 pb-12 pt-16 md:px-4 md:pt-16">
        <div className="mx-auto max-w-page">
          <h1 className="fade-up text-3xl italic md:text-4xl">Portfolio</h1>
          <p className="mt-2 max-w-measure-narrow text-photo-muted">
            Choose a category, or open any frame full size. The images on this
            demo site are stock photographs standing in for a real
            studio&apos;s work.
          </p>
          <div className="mt-6">
            <PortfolioGallery works={works} />
          </div>
          <p className="mt-8 border-t border-photo-line pt-4 text-sm text-photo-muted">
            Want to talk about a shoot of your own?{" "}
            <Link href="/demos/photography#enquire" className="inline-block border-b border-photo-ink py-2 text-photo-ink">Ask us</Link>.
          </p>
        </div>
      </main>
    </PhotographyShell>
  );
}
