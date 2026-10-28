"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, MapPin } from "lucide-react";
import { Photo, Frame } from "@/components/Photo";
import { listings, suburbs, types, formatAUD, type Listing } from "@/config/realestate-listings";

type Purpose = "Any" | "For sale" | "For rent";

function ListingsContent() {
  const searchParams = useSearchParams();

  const [suburb, setSuburb] = useState(searchParams.get("suburb") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [purpose, setPurpose] = useState<Purpose>("Any");
  const [minBeds, setMinBeds] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (suburb && l.suburb !== suburb) return false;
      if (type && l.type !== type) return false;
      if (purpose !== "Any" && l.purpose !== purpose) return false;
      if (l.beds < minBeds) return false;
      return true;
    });
  }, [suburb, type, purpose, minBeds]);

  const FilterList = (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium uppercase tracking-wide text-realestate-slate">
          Suburb
        </span>
        <select
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          className="mt-2 w-full rounded-lg border border-realestate-line bg-realestate-bg px-3 py-2 text-sm"
        >
          <option value="">Any suburb</option>
          {suburbs.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium uppercase tracking-wide text-realestate-slate">
          Property type
        </span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-2 w-full rounded-lg border border-realestate-line bg-realestate-bg px-3 py-2 text-sm"
        >
          <option value="">Any type</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="min-w-0">
        <legend className="text-sm font-medium uppercase tracking-wide text-realestate-slate">
          Purpose
        </legend>
        <div className="mt-2 flex gap-2">
          {(["Any", "For sale", "For rent"] as Purpose[]).map((p) => (
            <button
              key={p}
              aria-pressed={purpose === p}
              onClick={() => setPurpose(p)}
              className={`rounded-full border px-3 py-2 text-sm ${
                purpose === p
                  ? "border-realestate-navy bg-realestate-navy text-white"
                  : "border-realestate-line text-realestate-navy"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-sm font-medium uppercase tracking-wide text-realestate-slate">
          Minimum bedrooms
        </span>
        <select
          value={minBeds}
          onChange={(e) => setMinBeds(Number(e.target.value))}
          className="mt-2 w-full rounded-lg border border-realestate-line bg-realestate-bg px-3 py-2 text-sm"
        >
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n === 0 ? "Any" : `${n}+`}
            </option>
          ))}
        </select>
      </label>

      {(suburb || type || purpose !== "Any" || minBeds > 0) && (
        <button
          onClick={() => {
            setSuburb("");
            setType("");
            setPurpose("Any");
            setMinBeds(0);
          }}
          className="text-sm text-realestate-slate underline-offset-2 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div id="top">
    <main id="main" className="px-3 py-6 md:px-4 md:py-8">
      <div className="flex items-end justify-between gap-2 border-b border-realestate-line pb-4">
        <div>
          <h1 className="fade-up font-estate-display text-2xl md:text-3xl">Listings</h1>
          <p className="mt-1 text-sm text-realestate-slate">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"}
          </p>
        </div>
        <button
          onClick={() => setFiltersOpen(true)}
          className="inline-flex items-center gap-1 rounded-full border border-realestate-line px-3 py-2 text-sm lg:hidden"
        >
          <SlidersHorizontal size={14} /> Filter
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">{FilterList}</aside>

        {/* List + map split — the industry-standard pattern buyers expect,
            with hover-sync instead of a real map API (no key required). */}
        <div className="min-w-0 lg:col-span-9">
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="min-w-0">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-16 text-center">
                  <p className="font-medium">No properties match those filters.</p>
                  <button
                    onClick={() => {
                      setSuburb("");
                      setType("");
                      setPurpose("Any");
                      setMinBeds(0);
                    }}
                    className="mt-2 inline-flex rounded-full bg-realestate-navy px-3 py-2 text-sm font-medium text-white"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {filtered.map((l) => (
                    <li
                      key={l.slug}
                      onMouseEnter={() => setHovered(l.slug)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <Link
                        href={`/demos/realestate/listings/${l.slug}`}
                        className={`flex gap-3 rounded-lg border p-2 transition-colors ${
                          hovered === l.slug ? "border-realestate-navy" : "border-realestate-line"
                        }`}
                      >
                        <Frame ratio="1 / 1" className="w-8 shrink-0 rounded-md">
                          <Photo photo={l.gallery[0]} grade="realestate" sizes="112px" />
                        </Frame>
                        <div className="min-w-0">
                          <p className="text-xs font-medium uppercase tracking-wide text-realestate-gold">
                            {l.purpose}
                          </p>
                          <p className="mt-1 font-medium">{formatAUD(l)}</p>
                          <p className="md:truncate text-sm text-realestate-slate">
                            {l.address}, {l.suburb}
                          </p>
                          <p className="mt-1 text-sm text-realestate-slate">
                            {l.beds} bed · {l.baths} bath · {l.parking} car
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Stylised area map — illustrative, not a geographic map. */}
            <div className="hidden xl:block">
              <div className="sticky top-16 rounded-lg border border-realestate-line bg-realestate-panel p-3">
                <p className="text-xs text-realestate-slate">
                  Approximate area map — illustrative, not to scale.
                </p>
                <div className="relative mt-2 aspect-square overflow-hidden rounded-md bg-realestate-bg">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <line x1="0" y1="30" x2="100" y2="30" stroke="#E4E2DC" strokeWidth="0.6" />
                    <line x1="0" y1="65" x2="100" y2="65" stroke="#E4E2DC" strokeWidth="0.6" />
                    <line x1="35" y1="0" x2="35" y2="100" stroke="#E4E2DC" strokeWidth="0.6" />
                    <line x1="72" y1="0" x2="72" y2="100" stroke="#E4E2DC" strokeWidth="0.6" />
                  </svg>
                  {filtered.map((l) => (
                    <Link
                      key={l.slug}
                      href={`/demos/realestate/listings/${l.slug}`}
                      onMouseEnter={() => setHovered(l.slug)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ left: `${l.mapPosition.x}%`, top: `${l.mapPosition.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      aria-label={`${l.address}, ${l.suburb} on the map`}
                    >
                      <MapPin
                        size={hovered === l.slug ? 26 : 20}
                        className={`transition-all ${
                          hovered === l.slug ? "text-realestate-navy" : "text-realestate-gold"
                        }`}
                        fill="currentColor"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/tablet filter drawer — bottom sheet, matching the retail
          demo's pattern so the codebase has one filter-drawer component
          shape reused, not a one-off per demo. */}
      {filtersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-screen overflow-y-auto rounded-t-2xl bg-realestate-bg p-3">
            <div className="flex items-center justify-between border-b border-realestate-line pb-3">
              <p className="font-medium">Filter</p>
              <button
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
                className="flex h-6 w-6 items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
            <div className="py-4">{FilterList}</div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="w-full rounded-full bg-realestate-navy py-3 text-sm font-medium text-white"
            >
              Show {filtered.length} {filtered.length === 1 ? "property" : "properties"}
            </button>
          </div>
        </div>
      )}
    </main>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={null}>
      <ListingsContent />
    </Suspense>
  );
}

export type { Listing };
