import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { notFound } from "next/navigation";
import { listings, getListing } from "@/config/realestate-listings";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { ListingDetail } from "./ListingDetail";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const listing = getListing(params.slug);
  if (!listing) return { title: "Listing not found — Halyard Property" };
  return withSocial({
    title: `${listing.address}, ${listing.suburb} — Halyard Property`,
    description: listing.description,
  });
}

export default function ListingPage({ params }: { params: { slug: string } }) {
  const listing = getListing(params.slug);
  if (!listing) notFound();

  return (
    <div id="top">
      <main id="main"><ListingDetail listing={listing} /></main>
      <footer className="border-t border-realestate-line px-3 py-8 md:px-4 md:py-12">
        <p className="text-sm text-realestate-slate">
          © {new Date().getFullYear()} Halyard Property. This is a demo website concept.
        </p>
      </footer>
      <BackToStudioCTA
        theme="bg-realestate-navy text-white border-white/10 font-estate-body"
        accentClass="bg-white text-realestate-navy hover:bg-white/90"
      />
    </div>
  );
}
