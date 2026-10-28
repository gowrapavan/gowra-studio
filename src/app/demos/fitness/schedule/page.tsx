import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { fitness } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { FitnessShell } from "../FitnessShell";
import { ScheduleGrid } from "./ScheduleGrid";

export const metadata: Metadata = withSocial({
  title: "Weekly schedule — Vantage Athletic Club (demo)",
  description:
    "The weekly class timetable at Vantage: strength and conditioning sessions, filterable by type, plus how each class runs.",
});

const classes = [
  { name: "Strength", len: "45 min", body: "Barbell-based. Warm-up, one main lift, accessory work, cool-down. A coach is watching your form on every set.", photo: fitness.training },
  { name: "Conditioning", len: "30 min", body: "Intervals scaled to your own baseline. You compete with last month's you — there is no leaderboard.", photo: fitness.class },
];

export default function Schedule() {
  return (
    <FitnessShell>
      <main id="main">
        <section className="bg-fitness-accent px-3 py-8 text-fitness-bg md:px-4 md:py-16">
          <p className="text-xs uppercase tracking-ultra text-fitness-bg/70">This week, every week</p>
          <h1 className="fade-up mt-2 font-fitness-display text-4xl uppercase leading-tight md:text-6xl">The schedule</h1>
          <p className="mt-3 max-w-measure text-fitness-bg/70">
            Two class types, six days. Same timetable every week, so you can
            build a routine around it.
          </p>
        </section>

        <section className="px-3 py-8 md:px-4 md:py-12">
          <ScheduleGrid />
        </section>

        <section className="border-t border-fitness-line px-3 py-8 md:px-4 md:py-12">
          <h2 className="font-fitness-display text-2xl uppercase tracking-wide">How a class runs</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
            {classes.map((c) => (
              <article key={c.name} className="min-w-0">
                <Frame ratio="16 / 9"><Photo photo={c.photo} grade="fitness" sizes="(min-width: 768px) 45vw, 100vw" /></Frame>
                <div className="mt-3 flex items-baseline justify-between gap-2 border-t-2 border-fitness-accent pt-2">
                  <h3 className="font-fitness-display text-xl uppercase">{c.name}</h3>
                  <span className="text-xs uppercase tracking-wide text-fitness-accent">{c.len}</span>
                </div>
                <p className="mt-2 text-sm text-fitness-ink/70">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-fitness-panel px-3 py-8 md:px-4 md:py-12">
          <h2 className="font-fitness-display text-2xl uppercase tracking-wide">Before your first class</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
            {["Arrive ten minutes early so a coach can walk you through the floor.", "Wear what you'd normally train in. Lifting shoes are optional; we have a rack of bars for beginners.", "Tell the coach about any injury. Every movement has a scaled version."].map((t, i) => (
              <li key={i} className="border-l-4 border-fitness-accent pl-3 text-fitness-ink/80">{t}</li>
            ))}
          </ul>
          <Link href="/demos/fitness#membership" className="mt-6 inline-flex border-2 border-fitness-accent bg-fitness-accent px-4 py-3 text-sm font-bold uppercase tracking-wide text-fitness-bg hover:bg-transparent hover:text-fitness-accent">
            Book a free trial
          </Link>
        </section>
      </main>
    </FitnessShell>
  );
}
