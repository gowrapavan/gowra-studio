"use client";

import { useState } from "react";
import { Truck, RotateCcw } from "lucide-react";
import { Photo, Frame } from "@/components/Photo";
import { formatUSD, type Product } from "@/config/retail-products";
import { useCart } from "../../CartContext";

/**
 * Composition: "gallery left, sticky buy box right" on desktop; on mobile
 * the buy box drops below the gallery and Add to bag becomes a bar fixed
 * to the bottom of the screen — the one place in this demo a sticky
 * mobile CTA earns its place, because it mirrors the single action this
 * page exists for (per the master prompt's note against sticky bars
 * appearing "everywhere").
 */
export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [error, setError] = useState(false);
  const { addLine } = useCart();

  const handleAdd = () => {
    if (!size) {
      setError(true);
      return;
    }
    setError(false);
    addLine(product.slug, size);
  };

  return (
    <section className="px-3 py-6 pb-16 md:px-4 md:py-8">
      <div className="grid gap-6 lg:grid-cols-12 md:gap-8">
        {/* Gallery */}
        <div className="min-w-0 lg:col-span-7">
          <Frame ratio="4 / 5" className="bg-retail-panel">
            <Photo
              photo={product.gallery[activeImage]}
              grade="retail"
              priority
              sizes="(min-width: 768px) 55vw, 100vw"
            />
          </Frame>
          {product.gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={activeImage === i}
                  onClick={() => setActiveImage(i)}
                  className={`w-8 shrink-0 overflow-hidden rounded-md border-2 ${
                    activeImage === i ? "border-retail-ink" : "border-transparent"
                  }`}
                >
                  <Frame ratio="1 / 1">
                    <Photo photo={img} grade="retail" sizes="64px" />
                  </Frame>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div className="min-w-0 lg:col-span-5">
          <p className="text-sm uppercase tracking-widest text-retail-ink/50">{product.category}</p>
          <h1 className="fade-up mt-2 font-retail-display text-2xl font-bold md:text-3xl">{product.name}</h1>
          <p className="mt-2 text-lg font-medium">{formatUSD(product.price)}</p>
          <p className="mt-4 max-w-measure-narrow text-retail-ink/70">{product.description}</p>

          {/* Trust signals sit beside the buy box, not below the fold. */}
          <div className="mt-4 flex flex-col gap-2 border-y border-retail-line py-3 text-sm text-retail-ink/70">
            <div className="flex items-center gap-2">
              <Truck size={16} className="shrink-0 text-retail-accent" />
              Free shipping on orders over $150
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="shrink-0 text-retail-accent" />
              30-day returns, unworn with tags
            </div>
          </div>

          {product.sizes.length > 1 && (
            <fieldset className="min-w-0 mt-4">
              <legend className="text-sm font-medium uppercase tracking-wide text-retail-ink/60">
                Size
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const low = product.lowStock?.includes(s);
                  return (
                    <button
                      key={s}
                      aria-pressed={size === s}
                      onClick={() => {
                        setSize(s);
                        setError(false);
                      }}
                      className={`rounded-full border px-3 py-2 text-sm ${
                        size === s
                          ? "border-retail-ink bg-retail-ink text-retail-bg"
                          : "border-retail-line text-retail-ink hover:border-retail-ink"
                      }`}
                    >
                      {s}
                      {low && <span className="ml-1 text-xs opacity-70">· low stock</span>}
                    </button>
                  );
                })}
              </div>
              {error && (
                <p role="alert" className="mt-2 text-sm text-retail-accent">
                  Pick a size before adding to your bag.
                </p>
              )}
            </fieldset>
          )}

          {/* Desktop add-to-cart lives here; mobile gets the sticky bar below. */}
          <button
            onClick={handleAdd}
            className="mt-6 hidden w-full rounded-full bg-retail-ink py-3 text-sm font-medium uppercase tracking-wide text-retail-bg hover:bg-black md:block"
          >
            Add to bag
          </button>

          <div className="mt-6">
            <p className="text-sm font-medium uppercase tracking-wide text-retail-ink/60">Details</p>
            <ul className="mt-2 space-y-1 text-sm text-retail-ink/70">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky mobile add-to-cart bar — the one CTA this page needs repeated. */}
      <div className="safe-bottom-pad fixed inset-x-0 bottom-0 z-40 border-t border-retail-line bg-retail-bg px-3 pt-3 md:hidden">
        {error && (
          <p role="alert" className="mb-2 text-center text-sm text-retail-accent">
            Pick a size before adding to your bag.
          </p>
        )}
        <button
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-retail-ink py-3 text-sm font-medium uppercase tracking-wide text-retail-bg"
        >
          Add to bag — {formatUSD(product.price)}
        </button>
      </div>
    </section>
  );
}
