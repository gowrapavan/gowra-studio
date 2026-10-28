import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { travel } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { TravelShell } from "./TravelShell";

export const metadata: Metadata = withSocial({
  title: "Wayfare & Co — Travel demo",
  description: "A demo travel company website: itineraries, how a trip comes together, and a trip-planning request.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const trips = [
  { n: "Amalfi on foot", d: "7 nights", p: travel.coastal }, { n: "Market towns of Puglia", d: "5 nights", p: travel.market },
  { n: "Dolomites hiking week", d: "6 nights", p: travel.trail }, { n: "Slow sailing, Croatia", d: "8 nights", p: travel.boat },
];
const path = [
  { t: "We talk", b: "A call about how you like to travel — pace, comforts, what you'd happily skip.", p: travel.market },
  { t: "We plan", b: "A day-by-day draft, with places we've checked ourselves. You change what you like.", p: travel.coastal },
  { t: "You go", b: "One local contact number for the whole trip, and the confidence it's been thought through.", p: travel.trail },
];
const pace = ["Slow", "Balanced", "Active"];
const who = ["Solo", "Couple", "Family", "Friends"];
const months = ["Spring", "Summer", "Autumn", "Winter", "Not sure yet"];
const chip = "inline-block cursor-pointer rounded-full border border-travel-line bg-travel-bg px-4 py-3 text-sm peer-checked:border-travel-accent peer-checked:bg-travel-accent peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-travel-accent";
const f = "mt-1 h-8 w-full rounded-xl border border-travel-line bg-travel-bg px-3 text-base";

export default function TravelDemo() {
  return (
    <TravelShell>
      <main id="main">
        {/* HERO — a full-bleed photograph under the header, the promise on the
            left, and the trip search inside it. This is the travel-agency
            convention for a reason: the visitor can start planning without
            scrolling. */}
        <section aria-label="Plan your trip" className="relative isolate overflow-hidden bg-travel-ink text-white">
          <div className="absolute inset-0 -z-10">
            <Photo photo={travel.hero} grade="travel" priority sizes="100vw" position="center 45%" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
          </div>
          <div className={`${wrap} flex min-h-hero flex-col justify-end gap-6 pb-6 pt-16 md:pb-8`}>
            <div className="max-w-measure">
              <p className="text-lg text-white/85">Tailor-made trips, planned by people who have been.</p>
              <h1 className="fade-up mt-2 font-travel-display text-4xl leading-tight md:text-5xl">Slower trips, planned properly.</h1>
              <p className="mt-3 text-white/85">Tell us how you like to travel. We plan the days, check the places ourselves, and give you one local number to call while you are away.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="#enquire" className="inline-flex h-6 items-center rounded-full bg-travel-accent px-4 font-medium text-white hover:brightness-95">Plan a trip</Link>
                <Link href="/demos/travel/trips" className="inline-flex h-6 items-center rounded-full border border-white/60 px-4 font-medium text-white hover:bg-white/10">See itineraries</Link>
              </div>
            </div>

            <DemoForm className="grid grid-cols-1 gap-2 rounded-2xl bg-travel-bg p-3 text-travel-ink shadow-e2 sm:grid-cols-2 md:p-4 lg:grid-cols-4 lg:items-end" noteClassName="text-sm text-travel-accent sm:col-span-2 lg:col-span-4">
              <label className="text-sm text-travel-ink/70">Where<select name="where" className={f}><option>Anywhere</option>{trips.map((t) => <option key={t.n}>{t.n}</option>)}</select></label>
              <label className="text-sm text-travel-ink/70">Travelling as<select name="who" className={f}>{who.map((w) => <option key={w}>{w}</option>)}</select></label>
              <label className="text-sm text-travel-ink/70">When<select name="when" className={f}>{months.map((m) => <option key={m}>{m}</option>)}</select></label>
              <button className="h-8 rounded-xl bg-travel-accent px-4 font-medium text-white hover:brightness-95 sm:col-span-2 lg:col-span-1">Show me trips</button>
            </DemoForm>
          </div>
        </section>

        {/* What we promise, as one ruled line rather than a grid of cards */}
        <section aria-label="Why Wayfare" className="border-b border-travel-line">
          <ul className={`${wrap} grid grid-cols-1 divide-y divide-travel-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x`}>
            {[["Places we have checked", "Hotels, guides and restaurants we have been to ourselves."], ["A real conversation first", "We start with how you like to travel, not a template."], ["Slower by design", "Fewer stops, longer stays, time to wander."], ["One number to call", "A local contact for the whole trip."]].map(([t, b]) => (
              <li key={t} className="py-3 lg:px-3 lg:first:pl-0"><h2 className="font-travel-display text-lg">{t}</h2><p className="mt-1 text-sm text-travel-ink/70">{b}</p></li>
            ))}
          </ul>
        </section>

        {/* JOURNEYS — one lead trip and three supporting, a swipe rail on phones */}
        <section id="journeys" aria-labelledby="journeys-h" className="py-8 md:py-12">
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 id="journeys-h" className="font-travel-display text-3xl md:text-4xl">Journeys we plan most</h2>
              <Link href="/demos/travel/trips" className="inline-flex h-6 items-center text-sm font-medium text-travel-accent hover:text-travel-ink">All itineraries →</Link>
            </div>
          </div>
          <div id="destinations" className={`${wrap} mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:gap-3 lg:overflow-visible lg:pb-0`}>
            {trips.map((t, i) => (
              <Link key={t.n} href="/demos/travel/trips" className={`zoom group relative block w-4/5 shrink-0 snap-start overflow-hidden rounded-2xl sm:w-1/2 lg:w-auto lg:shrink ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
                <Frame ratio={i === 0 ? "1 / 1" : "4 / 3"} mobileRatio="4 / 5"><Photo photo={t.p} grade="travel" priority={i < 2} sizes="(min-width: 1024px) 40vw, 80vw" /></Frame>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
                  <span className={`block font-travel-display ${i === 0 ? "text-3xl" : "text-xl"}`}>{t.n}</span>
                  <span className="text-sm text-white/85">{t.d}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="how" aria-labelledby="how-h" className="bg-travel-panel py-8 md:py-12">
          <div className={wrap}>
            <h2 id="how-h" className="font-travel-display text-3xl md:text-4xl">How a trip comes together</h2>
            <ol className="mt-8 grid grid-cols-1 gap-6 border-t-2 border-dashed border-travel-accent/50 pt-6 md:grid-cols-3 md:gap-8">
              {path.map((s, i) => (
                <li key={s.t}>
                  <p className="font-travel-display text-6xl leading-none text-travel-accent" aria-hidden>{i + 1}</p>
                  <h3 className="mt-2 font-travel-display text-2xl">{s.t}</h3>
                  <p className="mt-2 text-travel-ink/75">{s.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="enquire" aria-labelledby="enq-h" className="py-8 md:py-12">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12`}>
            <div className="lg:col-span-5"><h2 id="enq-h" className="font-travel-display text-3xl md:text-4xl">Plan a trip</h2><p className="mt-3 text-travel-ink/70">Tell us roughly what you have in mind. Not sure yet is a perfectly good answer.</p></div>
            <DemoForm className="grid gap-4 lg:col-span-7" noteClassName="rounded-xl bg-travel-panel p-3 text-sm">
              <fieldset className="min-w-0"><legend className="text-sm font-medium">Pace</legend><div className="mt-2 flex flex-wrap gap-2">{pace.map((x, i) => <label key={x}><input type="radio" name="pace" value={x} defaultChecked={i === 1} className="peer sr-only" /><span className={chip}>{x}</span></label>)}</div></fieldset>
              <fieldset className="min-w-0"><legend className="text-sm font-medium">Travelling as</legend><div className="mt-2 flex flex-wrap gap-2">{who.map((x, i) => <label key={x}><input type="radio" name="who2" value={x} defaultChecked={i === 1} className="peer sr-only" /><span className={chip}>{x}</span></label>)}</div></fieldset>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">Name<input required name="name" className={f} /></label>
                <label className="text-sm">Email<input required type="email" name="email" className={f} /></label>
              </div>
              <button className="w-fit rounded-full bg-travel-accent px-4 py-2 font-medium text-white hover:brightness-95">Send enquiry</button>
            </DemoForm>
          </div>
        </section>
        <FaqList eyebrow="Questions" title="Common questions" items={[["Can I change the itinerary?","Yes. The first draft is a starting point; you change what you like."],["Do I get support while I am away?","You get one local contact number for the whole trip."],["What if I am not sure where to go?","Say so in the form. Not sure yet is a perfectly good answer."]] as const} cls={{ section: "bg-travel-panel py-8 md:py-12", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-travel-accent", h2: "mt-3 font-travel-display text-2xl md:text-3xl", line: "divide-y divide-travel-line border-travel-line border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-travel-ink/70", plus: "text-2xl text-travel-accent" }} />
      </main>
    </TravelShell>
  );
}
