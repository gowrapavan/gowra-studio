"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "./CartContext";

/**
 * Grid-card add-to-cart. Adds the first in-stock size and shows a brief
 * optimistic confirmation instead of navigating anywhere — the principle
 * being "feedback within ~100ms", not a page reload.
 */
export function QuickAddButton({
  slug,
  defaultSize,
}: {
  slug: string;
  defaultSize: string;
}) {
  const { addLine } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  return (
    <button
      aria-label="Quick add to bag"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addLine(slug, defaultSize);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1200);
      }}
      className="flex h-6 w-6 items-center justify-center rounded-full bg-retail-bg text-retail-ink shadow-e1 transition-transform hover:scale-105"
    >
      {justAdded ? <Check size={16} /> : <Plus size={16} />}
    </button>
  );
}
