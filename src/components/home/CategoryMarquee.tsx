const categories = [
  "Restaurants",
  "Hotels",
  "Salons",
  "Home services",
  "Clinics",
  "Gyms",
  "Shops",
  "Cafés",
];

/**
 * Composition: "marquee divider" — a decorative, aria-hidden rhythm
 * break between the demo showcase and the more text-dense sections that
 * follow it. Purely visual; screen readers skip straight past it.
 */
export function CategoryMarquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-line bg-paper py-2"
    >
      <div className="animate-marquee-slow whitespace-nowrap font-display text-lg italic text-ink/30">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="mx-4">
            {categories.join(" \u00b7 ")} \u00b7
          </span>
        ))}
      </div>
    </div>
  );
}
