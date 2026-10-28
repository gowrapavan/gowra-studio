"use client";

import { useState } from "react";
import { Bed, Bath, Car, Ruler, MapPin } from "lucide-react";
import { Photo, Frame } from "@/components/Photo";
import { formatAUD, type Listing } from "@/config/realestate-listings";

/**
 * Composition: "key-facts table above the fold, gallery beside it, a
 * sticky single-contact card" — this is deliberately the most
 * data/table-driven page in the whole studio, matching the playbook's
 * instruction to treat this vertical as a research tool, not a brochure.
 */
export function ListingDetail({ listing }: { listing: Listing }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section className="px-3 py-6 md:px-4 md:py-8">
      <div className="grid gap-6 lg:grid-cols-12 md:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <Frame ratio="4 / 3" className="rounded">
            <Photo
              photo={listing.gallery[activeImage]}
              grade="realestate"
              priority
              sizes="(min-width: 768px) 55vw, 100vw"
            />
          </Frame>
          {listing.gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {listing.gallery.map((img, i) => (
                <button
                  key={i}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={activeImage === i}
                  onClick={() => setActiveImage(i)}
                  className={`w-8 shrink-0 overflow-hidden rounded-md border-2 ${
                    activeImage === i ? "border-realestate-navy" : "border-transparent"
                  }`}
                >
                  <Frame ratio="1 / 1">
                    <Photo photo={img} grade="realestate" sizes="80px" />
                  </Frame>
                </button>
              ))}
            </div>
          )}

          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-realestate-gold">
              {listing.purpose}
            </p>
            <h1 className="fade-up mt-1 font-estate-display text-2xl md:text-3xl">
              {listing.address}, {listing.suburb}
            </h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-realestate-slate">
              <MapPin size={14} /> {listing.suburb} NSW
            </p>
            <p className="mt-3 text-2xl font-medium">{formatAUD(listing)}</p>

            {/* Key facts table — above the fold, exactly where the playbook
                for this vertical says it belongs. */}
            <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-realestate-line py-4 sm:grid-cols-4">
              <div className="flex items-center gap-2">
                <Bed size={18} className="text-realestate-gold" />
                <div>
                  <dt className="text-xs text-realestate-slate">Bedrooms</dt>
                  <dd className="font-medium">{listing.beds}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={18} className="text-realestate-gold" />
                <div>
                  <dt className="text-xs text-realestate-slate">Bathrooms</dt>
                  <dd className="font-medium">{listing.baths}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Car size={18} className="text-realestate-gold" />
                <div>
                  <dt className="text-xs text-realestate-slate">Parking</dt>
                  <dd className="font-medium">{listing.parking}</dd>
                </div>
              </div>
              {listing.landSize && (
                <div className="flex items-center gap-2">
                  <Ruler size={18} className="text-realestate-gold" />
                  <div>
                    <dt className="text-xs text-realestate-slate">Land size</dt>
                    <dd className="font-medium">{listing.landSize}m²</dd>
                  </div>
                </div>
              )}
            </dl>

            <p className="mt-4 max-w-measure text-realestate-slate">{listing.description}</p>

            <div className="mt-4">
              <p className="text-sm font-medium uppercase tracking-wide text-realestate-slate">
                Features
              </p>
              <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-realestate-slate sm:grid-cols-2">
                {listing.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-realestate-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky agent contact card — the one CTA this page needs
            repeated, kept short: name, phone, preferred time. */}
        <div className="min-w-0 lg:col-span-5">
          <div className="rounded-lg border border-realestate-line bg-realestate-panel p-3 md:sticky md:top-16">
            <p className="font-medium">Book a viewing</p>
            <p className="mt-1 text-sm text-realestate-slate">
              Short enquiry — an agent will confirm a time.
            </p>
            <form className="mt-3 space-y-2">
              <label className="block">
                <span className="sr-only">Full name</span>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full rounded-lg border border-realestate-line bg-realestate-bg px-3 py-3 text-sm"
                />
              </label>
              <label className="block">
                <span className="sr-only">Phone number</span>
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-realestate-line bg-realestate-bg px-3 py-3 text-sm"
                />
              </label>
              <label className="block">
                <span className="sr-only">Preferred time</span>
                <input
                  type="text"
                  placeholder="Preferred time (optional)"
                  className="w-full rounded-lg border border-realestate-line bg-realestate-bg px-3 py-3 text-sm"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-realestate-navy py-3 text-sm font-medium text-white hover:bg-black"
              >
                Request a viewing
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
