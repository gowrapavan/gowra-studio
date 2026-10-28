"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Photo, Frame } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { products, categories, formatUSD } from "@/config/retail-products";
import { QuickAddButton } from "../QuickAddButton";

type Sort = "featured" | "price-asc" | "price-desc";

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [activeCategories, setActiveCategories] = useState<string[]>(
    urlCategory ? [urlCategory] : []
  );
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCategory = (c: string) => {
    setActiveCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) => activeCategories.length === 0 || activeCategories.includes(p.category)
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategories, sort]);

  const FilterList = (
    <fieldset className="min-w-0">
      <legend className="text-sm font-medium uppercase tracking-wide text-retail-ink/60">
        Category
      </legend>
      <div className="mt-3 space-y-2">
        {categories.map((c) => (
          <label key={c} className="flex items-center gap-2 py-1 text-sm">
            <input
              type="checkbox"
              checked={activeCategories.includes(c)}
              onChange={() => toggleCategory(c)}
              className="h-3 w-3"
            />
            {c}
          </label>
        ))}
      </div>
      {activeCategories.length > 0 && (
        <button
          onClick={() => setActiveCategories([])}
          className="mt-3 text-sm text-retail-ink/50 underline-offset-2 hover:underline"
        >
          Clear filters
        </button>
      )}
    </fieldset>
  );

  return (
    <div id="top">
    <main id="main" className="px-3 py-6 md:px-4 md:py-8">
      <div className="flex items-end justify-between gap-2 border-b border-retail-line pb-4">
        <div>
          <h1 className="fade-up font-retail-display text-2xl font-bold md:text-3xl">Shop all</h1>
          <p className="mt-1 text-sm text-retail-ink/60">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter drawer trigger — mobile only; desktop shows the sidebar directly. */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-1 rounded-full border border-retail-line px-3 py-2 text-sm md:hidden"
          >
            <SlidersHorizontal size={14} /> Filter
          </button>
          <label className="hidden items-center gap-2 text-sm sm:flex">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-retail-line bg-retail-bg px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Desktop filter sidebar — persistent, per the PLP pattern in the playbook. */}
        <aside className="hidden lg:col-span-3 md:block">{FilterList}</aside>

        <div className="min-w-0 lg:col-span-9">
          {filtered.length === 0 ? (
            // Empty state for a filter combination with no matches.
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <p className="font-medium">No items match those filters.</p>
              <button
                onClick={() => setActiveCategories([])}
                className="mt-2 inline-flex rounded-full bg-retail-ink px-3 py-2 text-sm font-medium text-retail-bg"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {filtered.map((p, i) => (
                <Reveal key={p.slug} index={i}>
                  <Link href={`/demos/retail/shop/${p.slug}`} className="zoom group block">
                    <div className="relative">
                      <Frame ratio="3 / 4" className="bg-retail-panel">
                        <Photo
                          photo={p.gallery[0]}
                          grade="retail"
                          sizes="(min-width: 768px) 30vw, 46vw"
                          className="opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                        />
                        {p.gallery[1] && (
                          <Photo
                            photo={p.gallery[1]}
                            grade="retail"
                            sizes="(min-width: 768px) 30vw, 46vw"
                            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        )}
                      </Frame>
                      <div className="absolute bottom-2 right-2">
                        <QuickAddButton slug={p.slug} defaultSize={p.sizes[0]} />
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium text-retail-ink md:text-base">{p.name}</p>
                    <p className="text-sm text-retail-ink/60">{formatUSD(p.price)}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer — a bottom sheet, not the desktop sidebar shrunk. */}
      {filtersOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <button
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-screen overflow-y-auto rounded-t-2xl bg-retail-bg p-3">
            <div className="flex items-center justify-between border-b border-retail-line pb-3">
              <p className="font-medium">Filter</p>
              <button
                aria-label="Close filters"
                onClick={() => setFiltersOpen(false)}
                className="flex h-6 w-6 items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>
            <div className="py-4">
              {FilterList}
              <div className="mt-6">
                <p className="text-sm font-medium uppercase tracking-wide text-retail-ink/60">Sort</p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="mt-2 w-full rounded-full border border-retail-line bg-retail-bg px-3 py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="w-full rounded-full bg-retail-ink py-3 text-sm font-medium text-retail-bg"
            >
              Show {filtered.length} {filtered.length === 1 ? "item" : "items"}
            </button>
          </div>
        </div>
      )}
    </main>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
