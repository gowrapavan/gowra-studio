import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { travel } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { TravelShell } from "../TravelShell";

export const metadata: Metadata = withSocial({
  title: "Itineraries — Wayfare & Co (demo)",
  description: "Four slow-travel itineraries — Amalfi on foot, Puglia, the Dolomites and Croatia by sail — with sample days and what's included.",
});

const trips = [
  { id: "amalfi", name: "Amalfi on foot", nights: 7, pace: "Moderate", months: "Apr – Jun, Sep – Oct", photo: travel.coastal,
    blurb: "Cliff paths between villages, with your bags moved ahead for you.",
    days: [["Day 1", "Arrive, settle in, a short walk to the harbour."], ["Day 2", "Guided coastal trail with lunch in a village on the way."], ["Day 3", "Free morning at the market, old-town walking tour in the afternoon."]] },
  { id: "puglia", name: "Market towns of Puglia", nights: 5, pace: "Easy", months: "Apr – Jun, Sep – Oct", photo: travel.market,
    blurb: "Whitewashed towns, long lunches and a car only when you want one.",
    days: [["Day 1", "Arrive and walk the old town before dinner."], ["Day 2", "Market morning, then a cooking session with a local family."], ["Day 3", "A slow drive between two hill towns, no fixed agenda."]] },
  { id: "dolomites", name: "Dolomites hiking week", nights: 6, pace: "Active", months: "Jun – Sep", photo: travel.trail,
    blurb: "Hut-to-valley days on marked trails, with a guide for the high routes.",
    days: [["Day 1", "Arrive, kit check and a gentle valley walk."], ["Day 2", "A full day on a marked ridge trail with packed lunch."], ["Day 3", "Rest morning, optional afternoon loop."]] },
  { id: "croatia", name: "Slow sailing, Croatia", nights: 8, pace: "Easy", months: "May – Oct", photo: travel.boat,
    blurb: "Short sailing hops between islands, with time ashore every day.",
    days: [["Day 1", "Board, meet the skipper, a short first sail."], ["Day 2", "Swim stop in a cove, lunch on deck, evening in harbour."], ["Day 3", "A town on foot, then a long sail to the next island."]] },
];

const included = ["Accommodation, chosen by us and checked in person", "Guided days as described in each itinerary", "Airport and between-stop transfers", "One local contact number for the whole trip"];
const notIncluded = ["International flights", "Travel insurance", "Most lunches and some dinners", "Personal spending"];

export default function Trips() {
  return (
    <TravelShell>
      <main id="main">
        <section className="px-3 pt-8 md:px-4 md:pt-12">
          <div className="mx-auto max-w-page">
            <p className="text-xs uppercase tracking-wide text-travel-accent">Itineraries</p>
            <h1 className="fade-up mt-2 font-travel-display text-3xl md:text-4xl">Four trips, planned around how you like to move</h1>
            <p className="mt-3 max-w-measure text-travel-ink/70">
              Each one is a starting point. Tell us your dates and we adjust the pace, the
              places and the number of walking days. Pricing is per person and depends on
              dates and group size, so we quote after the first conversation.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Jump to a trip">
              {trips.map((t) => (<li key={t.id}><a href={`#${t.id}`} className="inline-block rounded-full border border-travel-line px-3 py-2 text-sm hover:border-travel-accent hover:text-travel-accent">{t.name}</a></li>))}
            </ul>
          </div>
        </section>

        {trips.map((t, i) => (
          <section key={t.id} id={t.id} className={`px-3 py-8 md:px-4 md:py-12 ${i % 2 ? "bg-travel-panel" : ""}`}>
            <div className="mx-auto grid grid-cols-1 max-w-page gap-6 lg:grid-cols-12 md:gap-4">
              <div className={`min-w-0 lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}>
                <Frame ratio="4 / 3" className="rounded-2xl"><Photo photo={t.photo} grade="travel" sizes="(min-width: 768px) 50vw, 100vw" /></Frame>
              </div>
              <div className="min-w-0 lg:col-span-6 md:pl-4">
                <h2 className="font-travel-display text-2xl">{t.name}</h2>
                <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <div><dt className="text-travel-ink/50">Length</dt><dd>{t.nights} nights</dd></div>
                  <div><dt className="text-travel-ink/50">Pace</dt><dd>{t.pace}</dd></div>
                  <div><dt className="text-travel-ink/50">Best months</dt><dd>{t.months}</dd></div>
                </dl>
                <p className="mt-3 text-travel-ink/70">{t.blurb}</p>
                <details className="zoom group mt-4 rounded-xl border border-travel-line bg-travel-bg">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-travel-accent">
                    Sample first days<span aria-hidden className="text-travel-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ol className="space-y-2 px-4 pb-4 text-sm">
                    {t.days.map(([d, b]) => (<li key={d} className="flex gap-3"><span className="w-12 shrink-0 font-travel-display text-travel-accent">{d}</span><span className="text-travel-ink/80">{b}</span></li>))}
                  </ol>
                </details>
                <Link href="/demos/travel#enquire" className="mt-4 inline-block rounded-full bg-travel-accent px-4 py-2 text-sm font-medium text-white hover:brightness-95">Ask about this trip</Link>
              </div>
            </div>
          </section>
        ))}

        <section className="px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto grid grid-cols-1 max-w-page gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-travel-display text-xl">Included</h2>
              <ul className="mt-3 space-y-2 text-sm">{included.map((x) => (<li key={x} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-travel-accent" aria-hidden />{x}</li>))}</ul>
            </div>
            <div>
              <h2 className="font-travel-display text-xl">Not included</h2>
              <ul className="mt-3 space-y-2 text-sm">{notIncluded.map((x) => (<li key={x} className="flex gap-2"><X size={16} className="mt-1 shrink-0 text-travel-ink/40" aria-hidden />{x}</li>))}</ul>
            </div>
          </div>
        </section>
      </main>
    </TravelShell>
  );
}
