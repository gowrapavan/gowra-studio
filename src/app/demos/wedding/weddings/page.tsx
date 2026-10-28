import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { wedding } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { WeddingShell } from "../WeddingShell";

export const metadata: Metadata = withSocial({
  title: "Real weddings — Linden & Rose Events (demo)",
  description:
    "Three weddings from the Linden & Rose journal — an orchard ceremony, a candlelit reception, and a small-guest-list day — written as demo content.",
});

const approach = [
  { n: "i.", t: "One planner, start to finish", b: "The person on your first call is the person standing beside you on the day. There is no hand-off to a junior team." },
  { n: "ii.", t: "A timeline you can actually read", b: "A single shared document with every vendor arrival, every cue and every contingency — written so a bridesmaid could run it if she had to." },
  { n: "iii.", t: "Fewer, better decisions", b: "We narrow the options before they reach you, so planning feels like choosing between good answers rather than starting from a blank page." },
];

export default function RealWeddings() {
  return (
    <WeddingShell>
      <main id="main">
        {/* Masthead — asymmetric: title left, standfirst right, no image */}
        <section className="px-3 pt-8 md:px-4 md:pt-16">
          <div className="grid gap-6 lg:grid-cols-12 md:items-end">
            <h1 className="fade-up font-wedding text-3xl italic leading-tight lg:col-span-7 md:text-3xl">
              Real weddings
            </h1>
            <p className="max-w-measure-narrow text-wedding-ink/70 lg:col-span-5">
              A small selection from the journal. Each one began with the same
              question — what should the day feel like? — and ended somewhere
              different.
            </p>
          </div>
        </section>

        {/* Story 1 — wide image with an overlapping text card */}
        <section className="px-3 py-8 md:px-4 md:py-16">
          <div className="relative mx-auto max-w-page">
            <Frame ratio="16 / 9" mobileRatio="4 / 3" className="">
              <Photo photo={wedding.ceremony} grade="wedding" priority sizes="(min-width: 1360px) 1360px, 100vw" />
            </Frame>
            <div className="relative -mt-6 ml-2 mr-2 bg-wedding-bg p-4 shadow-e2 md:absolute md:-bottom-6 md:right-4 md:mt-0 md:mr-0 md:ml-0 md:max-w-measure-narrow md:p-6">
              <p className="text-xs uppercase tracking-ultra text-wedding-accent">Savannah · October</p>
              <h2 className="mt-1 font-wedding text-xl">An orchard ceremony</h2>
              <p className="mt-2 text-sm text-wedding-ink/70">
                Sixty guests under the pecan trees. Chairs were set the morning
                of so the grass stayed undisturbed for the walk down, and the
                whole ceremony was timed to finish before the light turned.
              </p>
            </div>
          </div>
          <dl className="mx-auto mt-8 grid max-w-page grid-cols-3 gap-3 border-t border-wedding-line pt-4 text-sm md:mt-12 md:max-w-measure md:ml-4">
            <div><dt className="text-wedding-ink/50">Guests</dt><dd>60</dd></div>
            <div><dt className="text-wedding-ink/50">Setting</dt><dd>Orchard</dd></div>
            <div><dt className="text-wedding-ink/50">Planning</dt><dd>Full</dd></div>
          </dl>
        </section>

        {/* Story 2 — reversed split, two stacked images */}
        <section className="bg-wedding-panel px-3 py-8 md:px-4 md:py-16">
          <div className="mx-auto grid grid-cols-1 max-w-page gap-6 lg:grid-cols-12 md:items-center md:gap-4 lg:gap-6">
            <div className="lg:col-span-5 lg:order-2">
              <Reveal>
                <p className="text-xs uppercase tracking-ultra text-wedding-accent">Charleston · May</p>
                <h2 className="mt-1 font-wedding text-2xl">A reception that ran itself</h2>
                <p className="mt-3 text-wedding-ink/70">
                  Long tables, low candlelight and a timeline built so nobody —
                  including the couple — ever felt rushed. Dinner was served
                  family-style, and the first dance happened while people were
                  still at the table.
                </p>
                <Link href="/demos/wedding/packages" className="mt-4 inline-flex h-6 items-center border-b border-wedding-ink/40 text-sm hover:border-wedding-accent hover:text-wedding-accent">
                  See how we plan receptions
                </Link>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:col-span-7 lg:order-1 md:gap-3">
              <Frame ratio="3 / 4" className=""><Photo photo={wedding.longTable} grade="wedding" sizes="(min-width: 768px) 30vw, 50vw" /></Frame>
              <Frame ratio="3 / 4" className="mt-6"><Photo photo={wedding.firstDance} grade="wedding" sizes="(min-width: 768px) 30vw, 50vw" /></Frame>
            </div>
          </div>
        </section>

        {/* Story 3 — mosaic */}
        <section className="px-3 py-8 md:px-4 md:py-16">
          <div className="mx-auto max-w-page">
            <p className="text-xs uppercase tracking-ultra text-wedding-accent">Asheville · September</p>
            <h2 className="mt-1 font-wedding text-2xl">Twenty guests, one long table</h2>
            <p className="mt-3 max-w-measure text-wedding-ink/70">
              The smallest wedding of the year, and one of the most detailed:
              every glass, every flower and every place card chosen for a room
              that seated twenty.
            </p>
            <div className="mt-6 grid grid-cols-6 gap-2 md:gap-3">
              <Frame ratio="1 / 1" className="col-span-4 row-span-2"><Photo photo={wedding.kiss} grade="wedding" sizes="(min-width: 768px) 45vw, 66vw" /></Frame>
              <Frame ratio="1 / 1" className="col-span-2"><Photo photo={wedding.floral} grade="wedding" sizes="25vw" /></Frame>
              <Frame ratio="1 / 1" className="col-span-2"><Photo photo={wedding.glasses} grade="wedding" sizes="25vw" /></Frame>
            </div>
          </div>
        </section>

        {/* Approach — numbered prose, no cards */}
        <section className="border-t border-wedding-line px-3 py-8 md:px-4 md:py-16">
          <div className="mx-auto max-w-page">
            <h2 className="font-wedding text-2xl">How we work</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {approach.map((a) => (
                <div key={a.n}>
                  <p className="font-wedding text-xl italic text-wedding-accent">{a.n}</p>
                  <p className="mt-1 font-medium">{a.t}</p>
                  <p className="mt-1 text-sm text-wedding-ink/70">{a.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-3 pb-8 md:px-4 md:pb-16">
          <div className="mx-auto max-w-page columns-2 gap-2 md:columns-3 md:gap-3">
            {[
              [wedding.hall, "4 / 3"], [wedding.danceFloor, "3 / 4"], [wedding.toast, "1 / 1"],
              [wedding.coupleWalk, "3 / 4"], [wedding.reception, "4 / 3"], [wedding.details, "1 / 1"],
            ].map(([p, r], i) => (
              <Frame key={i} ratio={r as string} className="mb-2 break-inside-avoid md:mb-3">
                <Photo photo={p as typeof wedding.hall} grade="wedding" sizes="(min-width: 768px) 30vw, 50vw" />
              </Frame>
            ))}
          </div>
        </section>

        <section className="bg-wedding-panel px-3 py-12 text-center md:px-4 md:py-16">
          <h2 className="font-wedding text-2xl">Tell us about your day</h2>
          <p className="mx-auto mt-2 max-w-measure-narrow text-wedding-ink/70">
            Thirty minutes, no obligation — mostly us listening.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href="/demos/wedding#enquire" className=" inline-flex h-6 items-center bg-wedding-ink px-4 text-xs font-semibold uppercase tracking-wider text-wedding-bg hover:bg-wedding-accent">Enquire</Link>
            <Link href="/demos/wedding/packages" className=" inline-flex h-6 items-center border border-wedding-ink/40 px-4 text-xs font-semibold uppercase tracking-wider hover:border-wedding-accent hover:text-wedding-accent">View packages</Link>
          </div>
        </section>
      </main>
    </WeddingShell>
  );
}
