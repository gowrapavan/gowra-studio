import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { Check } from "lucide-react";
import { wedding } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { WeddingShell } from "../WeddingShell";

export const metadata: Metadata = withSocial({
  title: "Packages & pricing — Linden & Rose Events (demo)",
  description:
    "Three wedding-planning packages, a side-by-side comparison, optional add-ons and answers to the questions couples ask most — demo content.",
});

const tiers = [
  { name: "Day-of coordination", price: "From $1,800", lead: "You plan it. We run it.", points: ["Two planning calls in the final month", "Vendor confirmations and a written day-of timeline", "On-site from setup to last dance"] },
  { name: "Partial planning", price: "From $3,600", lead: "A guide for the final stretch.", points: ["Everything in day-of coordination", "Vendor recommendations and introductions", "Fortnightly check-ins for the last three months"], featured: true },
  { name: "Full planning", price: "From $7,200", lead: "Start to finish.", points: ["Everything in partial planning", "Venue search and design direction", "Budget tracking and monthly check-ins from day one"] },
];

const rows: [string, boolean, boolean, boolean][] = [
  ["Written day-of timeline", true, true, true],
  ["On-site coordination", true, true, true],
  ["Vendor recommendations", false, true, true],
  ["Rehearsal coordination", false, true, true],
  ["Venue search", false, false, true],
  ["Design direction & mood boards", false, false, true],
  ["Budget tracking", false, false, true],
];

const addons = [
  ["Welcome dinner or rehearsal-dinner planning", "Quoted individually"],
  ["Second coordinator for larger guest lists", "Quoted individually"],
  ["Out-of-town guest itineraries and transport", "Quoted individually"],
  ["Day-after brunch", "Quoted individually"],
];

const timeline = [
  ["12+ months", "First call, budget conversation, venue shortlist"],
  ["9 months", "Venue and date confirmed; core vendors booked"],
  ["6 months", "Design direction, invitations, guest accommodation"],
  ["3 months", "Menus, music and run-of-day draft"],
  ["1 month", "Final numbers, seating, vendor confirmations"],
  ["The day", "We arrive before the florist and leave after the last guest"],
];

const faqs = [
  ["How far ahead should we book?", "For full planning, nine to twelve months is comfortable. Day-of coordination can be booked much closer to the date, though popular weekends fill up."],
  ["Do you charge a percentage of our budget?", "No. Prices are fixed in the written proposal. If the scope grows, we tell you before we spend any more of your time or money."],
  ["Can you plan a destination or out-of-state wedding?", "Yes, travel is quoted separately. We recommend at least one site visit for full planning and will schedule it with you."],
  ["What happens if we need to change the date?", "Your proposal sets out what happens to the retainer. We'll walk you through the specifics on your first call rather than burying it in a contract."],
  ["Do you work with our own vendors?", "Absolutely. We'll coordinate any vendor you've already chosen, and introduce others only where you ask."],
];

export default function Packages() {
  return (
    <WeddingShell>
      <main id="main">
        <section className="px-3 pt-8 text-center md:px-4 md:pt-16">
          <p className="text-xs uppercase tracking-ultra text-wedding-accent">Packages</p>
          <h1 className="fade-up mx-auto mt-2 max-w-measure font-wedding text-3xl italic leading-tight">
            Three ways to work together
          </h1>
          <p className="mx-auto mt-3 max-w-measure-narrow text-wedding-ink/70">
            Every wedding is quoted individually. These are starting points,
            and the written proposal after your first call sets the final price.
          </p>
        </section>

        <section className="px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto grid grid-cols-1 max-w-page gap-4 md:grid-cols-3 md:gap-6">
            {tiers.map((t) => (
              <article key={t.name} className={`flex flex-col p-4 shadow-e1 md:p-6 ${t.featured ? "bg-wedding-panel ring-1 ring-wedding-accent" : "bg-wedding-bg ring-1 ring-wedding-line"}`}>
                <h2 className="font-wedding text-xl">{t.name}</h2>
                <p className="mt-1 text-sm text-wedding-accent">{t.price}</p>
                <p className="mt-3 text-wedding-ink/70">{t.lead}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-wedding-accent" aria-hidden /><span>{p}</span></li>
                  ))}
                </ul>
                <Link href="/demos/wedding#enquire" className="mt-auto pt-6">
                  <span className="inline-flex h-6 w-full items-center justify-center border border-wedding-ink/40 px-3 text-xs font-semibold uppercase tracking-wider hover:border-wedding-accent hover:text-wedding-accent">Ask about this package</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Comparison — a real table, scrollable inside its own box on phones */}
        <section className="px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto max-w-page">
            <h2 className="font-wedding text-2xl">Side by side</h2>
            <div className="mt-4 overflow-x-auto ring-1 ring-wedding-line" tabIndex={0} role="region" aria-label="Package comparison">
              <table className="w-full min-w-max text-left text-sm">
                <thead className="bg-wedding-panel">
                  <tr>
                    <th scope="col" className="p-3 font-medium">What&apos;s included</th>
                    {tiers.map((t) => (<th key={t.name} scope="col" className="p-3 font-medium">{t.name}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, ...vals]) => (
                    <tr key={label} className="border-t border-wedding-line">
                      <th scope="row" className="p-3 font-normal">{label}</th>
                      {vals.map((v, i) => (
                        <td key={i} className="p-3">{v ? <Check size={16} className="text-wedding-accent" aria-label="Included" /> : <span className="text-wedding-ink/30" aria-label="Not included">—</span>}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Timeline + photo */}
        <section className="bg-wedding-panel px-3 py-8 md:px-4 md:py-16">
          <div className="mx-auto grid grid-cols-1 max-w-page gap-6 lg:grid-cols-12 md:gap-4 lg:gap-6">
            <div className="lg:col-span-7">
              <h2 className="font-wedding text-2xl">A typical planning timeline</h2>
              <ol className="mt-4 divide-y divide-wedding-line">
                {timeline.map(([when, what]) => (
                  <li key={when} className="grid gap-1 py-3 sm:grid-cols-4">
                    <span className="font-wedding italic text-wedding-accent">{when}</span>
                    <span className="text-sm text-wedding-ink/80 sm:col-span-3">{what}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-5">
              <Frame ratio="4 / 5" className=""><Photo photo={wedding.hero} grade="wedding" sizes="(min-width: 768px) 35vw, 100vw" /></Frame>
            </div>
          </div>
        </section>

        {/* Add-ons ledger */}
        <section className="px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto max-w-measure">
            <h2 className="font-wedding text-2xl">Optional add-ons</h2>
            <dl className="mt-4">
              {addons.map(([a, p]) => (
                <div key={a} className="flex flex-col gap-1 border-b border-wedding-line py-3 sm:flex-row sm:justify-between">
                  <dt>{a}</dt><dd className="text-sm text-wedding-ink/60">{p}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-wedding-line px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto max-w-measure">
            <h2 className="font-wedding text-2xl">Questions couples ask</h2>
            <div className="mt-4 divide-y divide-wedding-line">
              {faqs.map(([q, a]) => (
                <details key={q} className="zoom group py-3">
                  <summary className="flex min-h-6 cursor-pointer list-none items-center justify-between gap-3 py-1 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-wedding-accent">
                    {q}<span aria-hidden className="text-wedding-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-wedding-ink/70">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-wedding-panel px-3 py-12 text-center md:px-4 md:py-16">
          <h2 className="font-wedding text-2xl">Ready when you are</h2>
          <p className="mx-auto mt-2 max-w-measure-narrow text-wedding-ink/70">Send a date and a few words — we&apos;ll reply with a time for a first call.</p>
          <Link href="/demos/wedding#enquire" className="mt-4 inline-block inline-flex h-6 items-center bg-wedding-ink px-4 text-xs font-semibold uppercase tracking-wider text-wedding-bg hover:bg-wedding-accent">Enquire</Link>
        </section>
      </main>
    </WeddingShell>
  );
}
