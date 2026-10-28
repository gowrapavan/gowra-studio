import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { wedding } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { WeddingShell } from "./WeddingShell";

export const metadata: Metadata = withSocial({
  title: "Linden & Rose Events — Wedding planner demo",
  description: "A demo luxury wedding-planning website: celebrations, the planning approach, planning tiers and a private consultation request.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const label = "text-xs uppercase tracking-ultra text-wedding-accent";
const programme = [
  ["First call", "Thirty minutes, no obligation, mostly us listening."],
  ["Proposal", "A written plan and a fixed quote within a week."],
  ["Planning", "Monthly check-ins, vendor coordination and one shared timeline."],
  ["The day", "We are on site from setup to the last dance."],
];
const prices = [
  ["Day-of coordination", "from $1,800", "Your plans, run flawlessly on the day."],
  ["Partial planning", "from $3,600", "Design support and vendor guidance, where you want it."],
  ["Full planning", "from $7,200", "Everything, from the first call to the last dance."],
];
const gallery = [
  { t: "An orchard ceremony", p: wedding.ceremony, ratio: "3 / 4" },
  { t: "The details", p: wedding.details, ratio: "1 / 1" },
  { t: "Walking out together", p: wedding.coupleWalk, ratio: "3 / 4" },
  { t: "A reception that ran itself", p: wedding.reception, ratio: "4 / 3" },
  { t: "The first dance", p: wedding.firstDance, ratio: "3 / 4" },
  { t: "The last song", p: wedding.danceFloor, ratio: "1 / 1" },
];
const line = "min-w-0 max-w-full w-full border-b border-wedding-ink/30 bg-transparent py-2 text-center font-wedding text-xl outline-none placeholder:text-wedding-ink/45 focus:border-wedding-accent md:text-2xl";

/** A photograph with a thin inset gilt line, the way a printed album mounts it. */
function Mounted({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-wedding-gold/70 p-1 ${className}`}>{children}</div>;
}

export default function WeddingDemo() {
  return (
    <WeddingShell>
      <main id="main">
        {/* HERO — one cinematic photograph, the house name and one invitation */}
        <section aria-label="Linden & Rose" className="relative isolate flex h-svh min-h-hero items-end overflow-hidden bg-wedding-ink text-white">
          <div className="absolute inset-0 -z-10">
            <Photo photo={wedding.ceremony} grade="wedding" priority sizes="100vw" position="center 40%" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" />
          </div>
          <div className={`${wrap} pb-8 text-center md:pb-12`}>
            <p className="text-xs uppercase tracking-ultra text-wedding-gold">Luxury wedding planning · Savannah &amp; Charleston</p>
            <h1 className="fade-up mx-auto mt-3 max-w-measure font-wedding text-5xl leading-tight md:text-6xl">Weddings planned like they matter.</h1>
            <p className="mx-auto mt-3 max-w-measure-narrow text-white/85">One planner from the first call to the last dance, for couples who want the day to feel effortless.</p>
            <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <a href="#enquire" className="inline-flex h-8 items-center justify-center border border-wedding-gold bg-wedding-gold px-6 text-xs font-semibold uppercase tracking-wider text-wedding-ink hover:bg-transparent hover:text-wedding-gold">Begin a consultation</a>
              <Link href="/demos/wedding/weddings" className="inline-flex h-8 items-center justify-center border border-white/60 px-6 text-xs font-semibold uppercase tracking-wider hover:bg-white/10">View celebrations</Link>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="py-12 text-center md:py-16">
          <div className={wrap}>
            <span aria-hidden className="mx-auto block h-6 w-px bg-wedding-gold" />
            <p className="mx-auto mt-4 max-w-measure font-wedding text-2xl leading-snug md:text-4xl">One planner from the first call to the last dance — not a rotating team, not a shared inbox.</p>
            <p className="mt-4 text-xs uppercase tracking-ultra text-wedding-accent">Linden &amp; Rose Events</p>
          </div>
        </section>

        {/* CELEBRATIONS — an editorial gallery: staggered columns from md, a swipe rail on phones */}
        <section id="stories" aria-labelledby="day-h" className="bg-wedding-panel py-12 md:py-16">
          <div className={`${wrap} flex flex-wrap items-end justify-between gap-2`}>
            <div><p className={label}>Selected celebrations</p><h2 id="day-h" className="mt-2 font-wedding text-3xl md:text-5xl">A day, in order</h2></div>
            <Link href="/demos/wedding/weddings" className="inline-flex h-6 items-center gap-1 text-xs uppercase tracking-wider text-wedding-accent hover:text-wedding-ink">All celebrations <ArrowRight size={14} aria-hidden /></Link>
          </div>

          <div className="mt-6 overflow-x-auto px-3 pb-2 md:hidden" tabIndex={0} role="region" aria-label="Celebrations — scroll sideways">
            <ol className="flex snap-x snap-mandatory gap-2">
              {gallery.map((m, i) => (
                <li key={m.t} className="w-4/5 shrink-0 snap-start">
                  <figure>
                    <Mounted><Frame ratio="4 / 5"><Photo photo={m.p} grade="wedding" sizes="80vw" /></Frame></Mounted>
                    <figcaption className="mt-2 flex items-baseline gap-2"><span className="font-wedding text-lg text-wedding-accent">{String(i + 1).padStart(2, "0")}</span><span className="font-wedding text-lg">{m.t}</span></figcaption>
                  </figure>
                </li>
              ))}
            </ol>
          </div>

          <div className={`${wrap} mt-8 hidden grid-cols-3 items-start gap-4 md:grid`}>
            {[0, 1, 2].map((col) => (
              <ol key={col} className={`space-y-4 ${col === 1 ? "pt-12" : ""}`}>
                {gallery.filter((_, i) => i % 3 === col).map((m) => {
                  const i = gallery.indexOf(m);
                  return (
                    <li key={m.t}>
                      <figure>
                        <Mounted><Frame ratio={m.ratio}><Photo photo={m.p} grade="wedding" sizes="(min-width: 768px) 30vw, 100vw" /></Frame></Mounted>
                        <figcaption className="mt-2 flex items-baseline gap-2"><span className="font-wedding text-lg text-wedding-accent">{String(i + 1).padStart(2, "0")}</span><span className="font-wedding text-xl">{m.t}</span></figcaption>
                      </figure>
                    </li>
                  );
                })}
              </ol>
            ))}
          </div>
        </section>

        {/* APPROACH */}
        <section id="approach" aria-labelledby="how-h" className="scroll-mt-12 py-12 md:py-16">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-5"><div className="lg:sticky lg:top-12"><Mounted><Frame ratio="4 / 5" mobileRatio="4 / 3"><Photo photo={wedding.longTable} grade="wedding" sizes="(min-width: 1024px) 40vw, 100vw" /></Frame></Mounted></div></div>
            <div className="lg:col-span-7">
              <p className={label}>The order of things</p>
              <h2 id="how-h" className="mt-2 font-wedding text-3xl md:text-5xl">Our approach</h2>
              <ol className="mt-6 divide-y divide-wedding-line border-y border-wedding-line">
                {programme.map(([t, b], i) => (
                  <li key={t} className="grid grid-cols-6 gap-2 py-4 md:py-6">
                    <p className="font-wedding text-3xl text-wedding-gold md:text-4xl" aria-hidden>{["I", "II", "III", "IV"][i]}</p>
                    <div className="col-span-5"><h3 className="font-wedding text-2xl">{t}</h3><p className="mt-1 text-wedding-ink/70">{b}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* PLANNING TIERS — set on near-black, priced discreetly */}
        <section id="packages" aria-labelledby="pk-h" className="bg-wedding-ink py-12 text-wedding-bg md:py-16">
          <div className={wrap}>
            <div className="mx-auto max-w-measure text-center">
              <p className="text-xs uppercase tracking-ultra text-wedding-gold">Planning</p>
              <h2 id="pk-h" className="mt-2 font-wedding text-3xl md:text-5xl">Three ways to work together</h2>
            </div>
            <ul className="mt-8 grid grid-cols-1 divide-y divide-wedding-bg/20 border-y border-wedding-bg/20 md:grid-cols-3 md:divide-x md:divide-y-0">
              {prices.map(([n, p, d]) => (
                <li key={n} className="py-6 text-center md:px-4">
                  <h3 className="font-wedding text-2xl md:text-3xl">{n}</h3>
                  <p className="mt-1 font-wedding text-xl italic text-wedding-gold">{p}</p>
                  <p className="mx-auto mt-2 max-w-measure-narrow text-sm text-wedding-bg/70">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center"><Link href="/demos/wedding/packages" className="inline-flex h-6 items-center gap-1 text-xs uppercase tracking-wider text-wedding-gold hover:text-white">Compare what is included <ArrowRight size={14} aria-hidden /></Link></p>
          </div>
        </section>

        {/* ENQUIRY — a private invitation */}
        <section id="enquire" aria-labelledby="enq-h" className="scroll-mt-12 py-12 md:py-16">
          <div className={wrap}>
            <div className="mx-auto grid grid-cols-1 border border-wedding-gold p-1 lg:grid-cols-2">
              <Frame ratio="4 / 3" mobileRatio="3 / 2" className="lg:h-full lg:!aspect-auto"><Photo photo={wedding.kiss} grade="wedding" sizes="(min-width: 1024px) 45vw, 100vw" /></Frame>
              <div className="p-4 text-center md:p-8">
                <p className={label}>By private appointment</p>
                <h2 id="enq-h" className="mt-2 font-wedding text-3xl md:text-4xl">Tell us about your day</h2>
                <p className="mx-auto mt-2 max-w-measure-narrow text-sm text-wedding-ink/70">Share a few details and we will arrange a private consultation.</p>
                <DemoForm className="mt-4 grid gap-3" noteClassName="text-sm text-wedding-accent">
                  <input required name="names" aria-label="Your names" placeholder="Your names" className={line} />
                  <input required type="date" name="date" aria-label="Date" className={line} />
                  <input name="guests" aria-label="Guest count" placeholder="Approximate guests" className={line} />
                  <button className="mx-auto mt-2 inline-flex h-8 items-center justify-center border border-wedding-ink bg-wedding-ink px-6 text-xs font-semibold uppercase tracking-wider text-wedding-bg hover:bg-transparent hover:text-wedding-ink">Request a consultation</button>
                </DemoForm>
              </div>
            </div>
          </div>
        </section>
        <FaqList eyebrow="Questions" title="Common questions" items={[["How far ahead should we enquire?","As soon as you have a date or a rough season in mind."],["Do you plan destination weddings?","Tell us where you are dreaming of in your enquiry and we will talk it through."],["Can we start with a conversation?","Yes. The enquiry is simply the start of a conversation."]] as const} cls={{ section: "border-t border-wedding-line py-12 md:py-16", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-wedding-accent", h2: "mt-3 font-wedding text-2xl md:text-3xl", line: "divide-y divide-wedding-line border-wedding-line border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-wedding-ink/70", plus: "text-2xl text-wedding-accent" }} />
      </main>
    </WeddingShell>
  );
}
