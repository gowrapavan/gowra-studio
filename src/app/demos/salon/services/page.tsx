import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { salon } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { SalonShell } from "../SalonShell";

export const metadata: Metadata = withSocial({
  title: "Services & pricing — Maison Form (demo)",
  description:
    "Cut, colour and treatment prices at Maison Form, with how long each appointment takes and how a first visit works.",
});

/** minutes drive the length bar, so appointment length is readable at a glance */
const groups = [
  { title: "Cut & finish", items: [
    { name: "Signature cut", price: "£65", detail: "Wash and finish", mins: 75 },
    { name: "Blow-dry & styling", price: "£45", detail: "For events or just because", mins: 45 },
  ]},
  { title: "Colour", items: [
    { name: "Colour & gloss", price: "£120", detail: "Includes toner", mins: 120 },
    { name: "Balayage", price: "£165", detail: "Cut not included", mins: 180 },
  ]},
  { title: "Treatment & occasion", items: [
    { name: "Keratin treatment", price: "£180", detail: "Smoothing, long-lasting", mins: 150 },
    { name: "Bridal styling", price: "£230", detail: "Trial and day-of", mins: 0 },
  ]},
];

const visit = [
  ["Consult", "Before anything is cut or coloured we talk through what you want, what your hair will realistically do, and what it will cost."],
  ["Work", "Your stylist stays with you for the whole appointment — no hand-offs between chairs."],
  ["Aftercare", "You leave knowing how to style it at home, and which products are worth buying (and which aren't)."],
];

const faq = [
  ["Do I need a patch test?", "For colour, yes — 48 hours before your first appointment. We'll book it for you."],
  ["How do I choose between colour and balayage?", "Colour covers evenly from root to tip; balayage is painted for a softer grow-out. Book a consultation and we'll tell you honestly which suits your hair."],
  ["What if I'm not happy with the result?", "Tell us within a week and we'll adjust it at no charge."],
];

export default function Services() {
  return (
    <SalonShell>
      <main id="main">
        <section className="bg-maison-bg px-3 pb-8 pt-8 text-white md:pb-12 md:pt-12">
          <p className="font-salon-body text-xs uppercase tracking-ultra text-maison-blush">Services &amp; pricing</p>
          <h1 className="fade-up mt-2 max-w-measure font-salon-display text-3xl italic md:text-4xl">What it costs, and how long it takes</h1>
          <p className="mt-3 max-w-measure-narrow font-salon-body text-white/70">
            Prices are for the service itself. Longer or thicker hair is quoted
            at consultation, before you commit.
          </p>
        </section>

        <section className="px-3 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-12 md:gap-4">
            <div className="min-w-0 space-y-8 lg:col-span-7">
              {groups.map((g) => (
                <div key={g.title}>
                  <h2 className="font-salon-display text-xl italic">{g.title}</h2>
                  <ul className="mt-2 border-t border-maison-ink/15">
                    {g.items.map((it) => (
                      <li key={it.name} className="border-b border-maison-ink/15 py-3">
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-medium">{it.name}</span>
                          <span className="font-salon-display text-lg">{it.price}</span>
                        </div>
                        <p className="mt-1 font-salon-body text-sm text-maison-ink/60">{it.detail}</p>
                        {it.mins > 0 && (
                          <div className="mt-2 flex items-center gap-2" aria-label={`${it.mins} minutes`}>
                            <div className="h-1 flex-1 bg-maison-ink/10"><div className="h-1 bg-maison-blush" style={{ width: `${(it.mins / 180) * 100}%` }} /></div>
                            <span className="w-12 text-xs text-maison-ink/60">{it.mins >= 60 ? `${(it.mins / 60).toFixed(it.mins % 60 ? 1 : 0)} hr` : `${it.mins} min`}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="min-w-0 lg:col-span-5">
              <Frame ratio="3 / 4"><Photo photo={salon.styling} grade="maison" sizes="(min-width: 768px) 40vw, 100vw" /></Frame>
              <p className="mt-2 font-salon-body text-xs text-maison-ink/50">{salon.styling.alt}</p>
            </div>
          </div>
        </section>

        <section className="bg-maison-bg px-3 py-8 text-white md:py-12">
          <h2 className="font-salon-display text-2xl italic">Your first visit</h2>
          <ol className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {visit.map(([t, b], i) => (
              <li key={t}>
                <span className="font-salon-display text-3xl italic text-maison-blush">{i + 1}</span>
                <p className="mt-1 font-medium">{t}</p>
                <p className="mt-1 font-salon-body text-sm text-white/70">{b}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="px-3 py-8 md:py-12">
          <h2 className="font-salon-display text-2xl italic">Before you book</h2>
          <div className="mt-4 space-y-4">
            {faq.map(([q, a]) => (
              <div key={q}><p className="font-medium">{q}</p><p className="mt-1 max-w-measure-narrow font-salon-body text-sm text-maison-ink/60">{a}</p></div>
            ))}
          </div>
          <Link href="/demos/salon#book" className="mt-6 inline-block bg-maison-ink px-4 py-2 font-salon-body text-sm text-white hover:bg-maison-blush">Book a consultation</Link>
        </section>
      </main>
    </SalonShell>
  );
}
