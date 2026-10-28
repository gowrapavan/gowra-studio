import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { restaurant } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { RestaurantShell } from "../RestaurantShell";

export const metadata: Metadata = withSocial({
  title: "Menu — Ember & Olive (demo)",
  description:
    "The full Ember & Olive menu: small plates, dishes from the fire, sides and desserts. A demo restaurant website.",
});

type Item = { name: string; price: string; note?: string };
const sections: { id: string; title: string; blurb: string; items: Item[] }[] = [
  { id: "small", title: "Small plates", blurb: "To share while you decide.", items: [
    { name: "Marinated olives & warm bread", price: "$9" },
    { name: "Burrata, charred fig, hazelnut", price: "$16" },
    { name: "Grilled octopus, white bean purée", price: "$19" },
  ]},
  { id: "fire", title: "From the fire", blurb: "Everything here touches the coals.", items: [
    { name: "Ember-roasted short rib", price: "$34", note: "Six hours over the coals, olive gremolata" },
    { name: "Grilled lobster tails", price: "$46", note: "Herb butter, leaves from the garden, lemon" },
    { name: "Salmon, salsa verde", price: "$32", note: "Charred over the fire, glass of red alongside" },
    { name: "The plate tonight", price: "$28", note: "Whatever came in that morning, cooked simply" },
  ]},
  { id: "sides", title: "Sides", blurb: "Ordered for the table.", items: [
    { name: "Charred greens, lemon", price: "$8" },
    { name: "Potatoes from the embers, rosemary salt", price: "$9" },
    { name: "Tomato, red onion, olive oil", price: "$8" },
  ]},
  { id: "finish", title: "To finish", blurb: "Small and not too sweet.", items: [
    { name: "Olive oil cake, citrus", price: "$12" },
    { name: "Dark chocolate torte", price: "$13" },
  ]},
];

const photos = [restaurant.shortRib, restaurant.lobster, restaurant.salmon, restaurant.plate];

export default function MenuPage() {
  return (
    <RestaurantShell>
      <main id="main" className="px-3 pb-12 pt-8 md:px-4 md:pt-12">
        <div className="mx-auto max-w-page">
          <p className="text-xs uppercase tracking-ultra text-ember-brass">Tuesday – Sunday from 5:30pm</p>
          <h1 className="fade-up mt-2 font-restaurant-display text-3xl md:text-4xl">The menu</h1>
          <p className="mt-3 max-w-measure text-ember-text/70">
            Short on purpose. It changes with the market, so a dish may be
            gone by the time you read this — the plate tonight is the
            honest answer to &ldquo;what&apos;s good?&rdquo;
          </p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Section index: sticky on desktop, a scrolling row on phones */}
            <nav aria-label="Menu sections" className="min-w-0 lg:col-span-3">
              <ul className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-2 md:sticky md:top-12 md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0">
                {sections.map((s) => (
                  <li key={s.id} className="shrink-0">
                    <a href={`#${s.id}`} className="inline-block rounded-full border border-ember-text/20 px-3 py-2 text-sm text-ember-text/80 hover:border-ember-brass hover:text-ember-brass md:rounded-none md:border-0 md:border-b md:border-transparent md:px-0 md:py-1">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 space-y-12 lg:col-span-9">
              {sections.map((s) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                  <h2 id={`${s.id}-h`} className="font-restaurant-display text-2xl">{s.title}</h2>
                  <p className="mt-1 text-sm text-ember-text/60">{s.blurb}</p>
                  <ul className="mt-4">
                    {s.items.map((it) => (
                      <li key={it.name} className="border-b border-ember-text/10 py-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium">{it.name}</span>
                          <span aria-hidden className="flex-1 border-b border-dotted border-ember-text/30" />
                          <span className="text-ember-brass">{it.price}</span>
                        </div>
                        {it.note && <p className="mt-1 text-sm text-ember-text/60">{it.note}</p>}
                      </li>
                    ))}
                  </ul>
                  {s.id === "fire" && (
                    <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                      {photos.map((p, i) => (
                        <Frame key={i} ratio="1 / 1"><Photo photo={p} grade="ember" sizes="(min-width: 768px) 18vw, 45vw" /></Frame>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              <aside className="border border-ember-text/15 p-4 md:p-6">
                <h2 className="font-restaurant-display text-xl">Before you order</h2>
                <p className="mt-2 text-sm text-ember-text/70">
                  Tell us about allergies when you book. The kitchen cooks with
                  nuts, shellfish and gluten, and every dish can be discussed
                  with the person bringing it.
                </p>
                <Link href="/demos/restaurant#visit" className="mt-4 inline-block rounded-full bg-ember-wine px-4 py-2 text-sm font-medium text-ember-text hover:brightness-110">
                  Reserve a table
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </RestaurantShell>
  );
}
