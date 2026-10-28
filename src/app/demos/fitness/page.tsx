import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fitness } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { DemoForm } from "@/components/DemoForm";
import { FitnessShell } from "./FitnessShell";

export const metadata: Metadata = withSocial({
  title: "Vantage Athletic Club — Fitness demo",
  description: "A demo gym website: programs, coaches, membership options and a free-trial request.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const programs = [
  { n: "01", t: "Strength", m: "45 min", b: "Barbell-based, four days a week. Coached, not just supervised." },
  { n: "02", t: "Conditioning", m: "30 min", b: "Intervals built around your own baseline — not a leaderboard." },
  { n: "03", t: "Open gym", m: "Anytime", b: "Full floor access for members who'd rather program their own sessions." },
];
const plans = [
  { t: "Drop-in", p: "$28", u: "/session", f: ["Full floor access"] },
  { t: "Member", p: "$139", u: "/month", f: ["Full floor access", "Group classes", "Programming review"], hot: true },
  { t: "Annual", p: "$1,290", u: "/year", f: ["Everything in Member", "Guest passes"] },
];
const goals = ["Get stronger", "Lose fat", "Learn to lift", "Just try it"];
const input = "mt-1 w-full border-2 border-fitness-bg bg-fitness-ink px-3 py-2 text-base font-normal normal-case text-fitness-bg outline-none focus:border-fitness-ink";

export default function FitnessDemo() {
  return (
    <FitnessShell>
      <main id="main">
        {/* HERO — split: copy and the single action on the left, a staggered two-photo
            collage with stat chips on the right. */}
        <section aria-label="Welcome" className="border-b-2 border-fitness-line">
          <div className={`${wrap} grid grid-cols-1 items-center gap-8 py-8 lg:grid-cols-12 lg:gap-12 md:py-12`}>
            <div className="lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-ultra text-fitness-accent">Strength &amp; conditioning · Austin</p>
              <h1 className="fade-up mt-4 font-fitness-display text-4xl uppercase leading-none md:text-5xl">Train like <span className="text-fitness-accent">it matters.</span></h1>
              <p className="mt-4 max-w-measure-narrow text-lg text-fitness-ink/80">Coached strength and conditioning for people who want results they can feel. One free session, no card, and a coach who learns your name.</p>
              <div className="mt-6 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                <a href="#trial" className="inline-flex items-center justify-center gap-2 bg-fitness-accent px-4 py-2 text-sm font-bold uppercase tracking-wide text-fitness-bg hover:brightness-110">Book a free trial <ArrowUpRight size={18} aria-hidden /></a>
                <Link href="/demos/fitness/schedule" className="inline-flex items-center justify-center border-2 border-fitness-ink/40 px-4 py-2 text-sm font-bold uppercase tracking-wide hover:border-fitness-accent hover:text-fitness-accent">See the timetable</Link>
              </div>
              <dl className="mt-6 grid grid-cols-3 gap-px bg-fitness-line md:mt-8">
                {[["3", "programs"], ["7", "days a week"], ["1", "free session"]].map(([n, l]) => (<div key={l} className="bg-fitness-bg px-2 py-2 md:px-3 md:py-3"><dt className="sr-only">{l}</dt><dd><span className="block font-fitness-display text-3xl text-fitness-accent">{n}</span><span className="text-xs uppercase leading-tight tracking-wide text-fitness-ink/65">{l}</span></dd></div>))}
              </dl>
            </div>
            <div className="grid grid-cols-2 items-start gap-2 md:grid-cols-5 md:gap-3 lg:col-span-6">
              <div className="md:col-span-3"><Frame ratio="3 / 4"><Photo photo={fitness.training} grade="fitness" priority sizes="(min-width: 1024px) 30vw, 50vw" /></Frame></div>
              <div className="relative md:col-span-2 md:mt-8 md:space-y-3">
                <Frame ratio="3 / 4"><Photo photo={fitness.class} grade="fitness" priority sizes="(min-width: 1024px) 20vw, 50vw" /></Frame>
                <p className="absolute inset-x-0 bottom-0 bg-fitness-accent p-2 font-fitness-display text-base uppercase leading-tight text-fitness-bg md:static md:p-3 md:text-lg">Coached. Not just supervised.</p>
              </div>
            </div>
          </div>
        </section>

        <div aria-hidden className="overflow-hidden bg-fitness-accent py-2 text-fitness-bg">
          <p className="marquee whitespace-nowrap font-fitness-display text-lg uppercase tracking-wide">
            <span className="pr-4">Strength ✕ Conditioning ✕ Open gym ✕ Strength ✕ Conditioning ✕ Open gym ✕ Strength ✕ Conditioning ✕ Open gym ✕ </span><span className="pr-4">Strength ✕ Conditioning ✕ Open gym ✕ Strength ✕ Conditioning ✕ Open gym ✕ Strength ✕ Conditioning ✕ Open gym ✕ </span>
          </p>
        </div>

        <section id="programs" aria-labelledby="prog-h" className="py-8 md:py-12">
          <div className={`${wrap} flex items-end justify-between gap-3`}>
            <h2 id="prog-h" className="font-fitness-display text-3xl uppercase md:text-4xl">Three ways in</h2>
            <Link href="/demos/fitness/schedule" className="inline-flex items-center gap-1 py-2 text-sm font-bold uppercase tracking-wide text-fitness-accent hover:text-fitness-ink">Weekly timetable <ArrowUpRight size={16} aria-hidden /></Link>
          </div>
          <div className="mt-6 overflow-x-auto px-3 md:px-4" tabIndex={0} role="region" aria-label="Programs — scroll sideways">
            <ul className="flex snap-x snap-mandatory gap-3">
              {[{ ...programs[0], p: fitness.training }, { ...programs[1], p: fitness.class }, { ...programs[2], p: null }].map((x) => (
                <li key={x.n} className="w-4/5 shrink-0 snap-start md:w-1/3">
                  <article className="h-full border-2 border-fitness-line bg-fitness-panel">
                    {x.p ? <Frame ratio="4 / 3"><Photo photo={x.p} grade="fitness" sizes="(min-width: 768px) 33vw, 80vw" /></Frame> : <div className="flex items-center bg-fitness-accent p-4 text-fitness-bg" style={{ aspectRatio: "4 / 3" }}><p className="font-fitness-display text-5xl uppercase leading-none">Your own plan. Your own pace.</p></div>}
                    <div className="p-4">
                      <div className="flex items-baseline justify-between gap-2"><h3 className="font-fitness-display text-2xl uppercase"><span className="text-fitness-accent">{x.n}</span> {x.t}</h3><span className="text-xs font-bold uppercase tracking-wide text-fitness-accent">{x.m}</span></div>
                      <p className="mt-2 text-fitness-ink/70">{x.b}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="membership" aria-labelledby="mem-h" className="bg-fitness-panel py-8 md:py-12">
          <div className={wrap}>
            <h2 id="mem-h" className="font-fitness-display text-3xl uppercase md:text-4xl">Membership</h2>
            <ul className="mt-6 border-t-2 border-fitness-ink">
              {plans.map((p) => (
                <li key={p.t} className={`grid grid-cols-1 items-center gap-3 border-b-2 border-fitness-ink px-3 py-4 md:grid-cols-12 md:gap-4 ${p.hot ? "bg-fitness-accent text-fitness-bg" : ""}`}>
                  <h3 className="font-fitness-display text-2xl uppercase md:col-span-3">{p.t}{p.hot && <span className="ml-2 text-xs font-bold tracking-wide">Most chosen</span>}</h3>
                  <p className="font-fitness-display text-4xl md:col-span-3">{p.p}<span className="ml-1 font-sans text-base">{p.u}</span></p>
                  <p className="text-sm font-medium md:col-span-4">{p.f.join(" · ")}</p>
                  <a href="#trial" className={`border-2 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide md:col-span-2 ${p.hot ? "border-fitness-bg hover:bg-fitness-bg hover:text-fitness-accent" : "border-fitness-accent text-fitness-accent hover:bg-fitness-accent hover:text-fitness-bg"}`}>Start free</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="trainers" aria-labelledby="coach-h" className="py-8 md:py-12">
          <div className={wrap}><h2 id="coach-h" className="font-fitness-display text-3xl uppercase md:text-4xl">Your coaches</h2></div>
          <div className="mt-6 grid grid-cols-2">
            {[{ n: "Dana Ortiz", r: "Head coach · Strength", p: fitness.trainerOne }, { n: "Marcus Hale", r: "Conditioning lead", p: fitness.trainerTwo }].map((c) => (
              <figure key={c.n}>
                <Frame ratio="3 / 4"><Photo photo={c.p} grade="fitness" sizes="50vw" /></Frame>
                <figcaption className="px-3 py-3 md:px-4"><span className="block font-fitness-display text-2xl uppercase md:text-4xl">{c.n}</span><span className="text-xs font-bold uppercase tracking-wide text-fitness-accent">{c.r}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="trial" aria-labelledby="trial-h" className="bg-fitness-accent py-8 text-fitness-bg md:py-12">
          <div className={`${wrap} grid grid-cols-1 gap-6 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <h2 id="trial-h" className="font-fitness-display text-3xl uppercase md:text-4xl">Book your free session</h2>
              <p className="mt-3 font-medium">412 Barton Springs Rd, Austin, TX. Mon–Fri 5am–9pm · Sat 7am–4pm · Sun 8am–2pm.</p>
            </div>
            <DemoForm className="grid gap-4 lg:col-span-7" noteClassName="border-l-4 border-fitness-bg pl-3 text-sm font-medium">
              <label className="text-xs font-bold uppercase tracking-wide">Name<input required name="name" className={input} /></label>
              <label className="text-xs font-bold uppercase tracking-wide">Email<input required type="email" name="email" className={input} /></label>
              <fieldset className="min-w-0">
                <legend className="text-xs font-bold uppercase tracking-wide">What are you after?</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {goals.map((g, i) => (
                    <label key={g}>
                      <input type="radio" name="goal" value={g} defaultChecked={i === 0} className="peer sr-only" />
                      <span className="inline-block cursor-pointer border-2 border-fitness-bg px-4 py-3 text-sm font-bold uppercase tracking-wide peer-checked:bg-fitness-bg peer-checked:text-fitness-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-fitness-bg">{g}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button className="bg-fitness-bg px-4 py-2 text-sm font-bold uppercase tracking-wide text-fitness-accent hover:bg-fitness-ink hover:text-fitness-bg">Claim my free session</button>
            </DemoForm>
          </div>
        </section>
        <section aria-labelledby="first-h" className="border-t-2 border-fitness-line bg-fitness-panel py-12 md:py-16">
          <div className={wrap}>
            <p className="text-xs font-bold uppercase tracking-ultra text-fitness-accent">Your first session</p>
            <h2 id="first-h" className="mt-3 font-fitness-display text-2xl uppercase md:text-3xl">What happens when you arrive</h2>
            <ol className="mt-8 grid grid-cols-1 gap-px bg-fitness-line md:grid-cols-3">
              {[["Meet your coach", "A short chat about your goals, any injuries and what you have done before."], ["Warm up and move", "A guided session at your level — you will not be thrown in at the deep end."], ["Leave with a plan", "Clear next steps, whether that is membership, drop-ins or just a good workout."]].map(([t, b], i) => (
                <li key={t} className="bg-fitness-panel p-6"><span className="font-fitness-display text-5xl text-fitness-accent" aria-hidden>0{i + 1}</span><h3 className="mt-2 font-fitness-display text-xl uppercase">{t}</h3><p className="mt-2 text-fitness-ink/70">{b}</p></li>
              ))}
            </ol>
          </div>
        </section>
        <FaqList eyebrow="Questions" title="Common questions" items={[["Do I need experience?","No. Coaches start from where you are and adjust from there."],["What should I bring?","Training shoes, water and a towel. Everything else is on the floor."],["How does the free trial work?","One free session, no card. Book below and we reply with a time."],["What does membership cost?","The plans are listed above, and the terms are shown before you sign up."]] as const} cls={{ section: "border-t-2 border-fitness-line py-12 md:py-16", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-fitness-accent", h2: "mt-3 font-fitness-display uppercase text-2xl md:text-3xl", line: "divide-y divide-fitness-line border-fitness-line border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-fitness-ink/70", plus: "text-2xl text-fitness-accent" }} />
      </main>
    </FitnessShell>
  );
}
