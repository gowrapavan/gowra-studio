"use client";

import { useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Frame, Photo } from "@/components/Photo";
import { getProduct, formatUSD } from "@/config/retail-products";
import { useCart } from "./CartContext";

/**
 * The one cart surface in the demo — a right-side drawer rather than a
 * separate /cart page, so add-to-cart feedback is immediate (principle:
 * feedback within ~100ms of an interaction) without a full navigation.
 */
export function CartDrawer() {
  const { lines, isOpen, closeCart, setQty, removeLine, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/40"
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-page flex-col bg-retail-bg font-retail-body text-retail-ink sm:w-11/12 md:w-8/12 lg:w-4/12">
        <div className="flex items-center justify-between border-b border-retail-line px-3 py-3 md:px-4">
          <p className="font-retail-display text-lg font-bold">Your bag</p>
          <button
            aria-label="Close cart"
            onClick={closeCart}
            className="flex h-6 w-6 items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 md:px-4">
          {lines.length === 0 ? (
            // Empty state — designed, not an accidental blank space.
            <div className="flex h-full flex-col items-center justify-center gap-2 py-8 text-center">
              <p className="font-medium">Your bag is empty.</p>
              <p className="text-sm text-retail-ink/60">
                Add something from the shop and it&apos;ll show up here.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 inline-flex rounded-full bg-retail-ink px-3 py-2 text-sm font-medium text-retail-bg"
              >
                Keep browsing
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => {
                const product = getProduct(line.slug);
                if (!product) return null;
                return (
                  <li key={`${line.slug}-${line.size}`} className="flex gap-3 border-b border-retail-line pb-3">
                    <Frame ratio="1 / 1" className="w-8 shrink-0 rounded-lg">
                      <Photo photo={product.gallery[0]} grade="retail" sizes="80px" />
                    </Frame>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{product.name}</p>
                          <p className="text-sm text-retail-ink/60">Size {line.size}</p>
                        </div>
                        <p className="shrink-0 font-medium">
                          {formatUSD(product.price * line.qty)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-retail-line px-1 py-1">
                          <button
                            aria-label={`Decrease quantity of ${product.name}`}
                            onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                            className="flex h-6 w-6 items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-3 text-center text-sm">{line.qty}</span>
                          <button
                            aria-label={`Increase quantity of ${product.name}`}
                            onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                            className="flex h-6 w-6 items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeLine(line.slug, line.size)}
                          className="text-sm text-retail-ink/50 underline-offset-2 hover:text-retail-accent hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-retail-line px-3 py-3 md:px-4">
            <div className="flex items-center justify-between font-medium">
              <span>Subtotal</span>
              <span>{formatUSD(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-retail-ink/50">
              Shipping and taxes calculated at checkout.
            </p>
            <button className="mt-3 w-full rounded-full bg-retail-ink py-3 text-sm font-medium uppercase tracking-wide text-retail-bg hover:bg-black">
              Checkout
            </button>
            <p className="mt-2 text-center text-xs text-retail-ink/45">
              Demo store — checkout isn&apos;t connected to real payment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
