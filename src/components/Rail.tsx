import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * The one horizontal-rail pattern in the product: a scroll-snap track
 * behind a faint drifting texture, with each card fading and sliding in
 * with a staggered delay as it enters view.
 *
 * Built once for the restaurant's dish rail and reused as-is for the
 * hotel's gallery rail — same component, not a copied visual result.
 */
export function Rail<T>({
  items,
  renderItem,
  keyOf,
  className = "",
}: {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyOf: (item: T, index: number) => string;
  className?: string;
}) {
  return (
    <div className={`rail-field ${className}`}>
      <div className="rail gap-3 pb-3">
        {items.map((item, i) => (
          <Reveal key={keyOf(item, i)} index={i} className="rail-card">
            {renderItem(item, i)}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
