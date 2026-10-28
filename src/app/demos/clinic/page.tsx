import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { Heart, MessageCircle, Receipt } from "lucide-react";
import { clinic } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { ClinicShell } from "./ClinicShell";
import { BookingSteps } from "./BookingSteps";

export const metadata: Metadata = withSocial({
  title: "Willowmere Dental Care — Clinic demo",
  description: "A demo dental clinic website: what to expect, treatments, the dentist, and a step-by-step appointment request.",
});

/**
 * ARCHITECTURE — a patient guide. Healthcare visitors read before they act,
 * so the page is one calm reading column with a sticky "on this page"
 * contents list beside it (a row of pills on phones), not a sequence of
 * marketing bands. Plain text first, photography in support.
 */
const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const calm = [
  { i: Heart, t: "No judgement", b: "Nobody has ever been told off for the gap since their last visit." },
  { i: MessageCircle, t: "Explained as we go", b: "We show you the X-ray and say what we're doing before we do it." },
  { i: Receipt, t: "Cost before treatment", b: "A written estimate, with options where there are options." },
];
const visit = [
  ["Welcome", "A few minutes in the waiting room, or straight through if you're on time."],
  ["Conversation", "We ask what's bothering you and what you'd like from your teeth."],
  ["Examination", "A gentle exam, X-rays only if they're needed."],
  ["A plan", "What matters now, what can wait, and what it costs — in plain language."],
];
const toc = [["Welcome", "#welcome"], ["Our promises", "#promises"], ["First visit", "#first-visit"], ["Your dentist", "#doctor"], ["Book", "#book"]];

export default function ClinicDemo() {
  return (
    <ClinicShell>
      <main id="main" className={`${wrap} lg:grid lg:grid-cols-12 lg:gap-8`}>
        <aside className="lg:col-span-3">
          <nav aria-label="On this page" className="-mx-3 overflow-x-auto px-3 py-3 lg:sticky lg:top-16 lg:mx-0 lg:overflow-visible lg:px-0 lg:py-8">
            <ul className="flex gap-2 lg:flex-col lg:gap-1">
              {toc.map(([t, h]) => (
                <li key={t} className="shrink-0"><a href={h} className="inline-block rounded-full border border-clinic-line px-4 py-2 text-sm hover:border-clinic-accent hover:text-clinic-accent lg:rounded-none lg:border-0 lg:border-l-2 lg:px-3 lg:py-1">{t}</a></li>
              ))}
            </ul>
            <p className="mt-6 hidden text-sm text-clinic-ink/65 lg:block">Mon – Thu 8am – 5pm<br />Fri 8am – 2pm<br />Sat – Sun closed</p>
          </nav>
        </aside>

        <div className="min-w-0 lg:col-span-9">
          <section id="welcome" className="pb-8 pt-4 md:pb-12 md:pt-8">
            <p className="text-sm font-medium text-clinic-accent">Portland, Oregon · accepting new patients</p>
            <h1 className="fade-up mt-2 max-w-measure font-clinic-display text-4xl leading-tight md:text-4xl">A dentist who explains before they begin.</h1>
            <p className="mt-4 max-w-measure text-lg text-clinic-ink/75">Calm, unhurried care for people who&apos;d rather not be here — and who&apos;ll be glad they came.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#book" className="rounded-2xl bg-clinic-accent px-4 py-2 font-medium text-white hover:brightness-95">Request an appointment</a>
              <Link href="/demos/clinic/treatments" className="rounded-2xl border border-clinic-ink/25 px-4 py-2 hover:border-clinic-accent">See treatments</Link>
            </div>
            <div className="mt-8"><Frame ratio="16 / 9" mobileRatio="4 / 3" className="rounded-2xl"><Photo photo={clinic.hero} grade="clinic" priority sizes="(min-width: 1024px) 70vw, 100vw" /></Frame></div>
          </section>

          <section id="promises" aria-labelledby="prom-h" className="border-t border-clinic-line py-8 md:py-12">
            <h2 id="prom-h" className="font-clinic-display text-2xl md:text-3xl">Three promises</h2>
            <ul className="mt-4 divide-y divide-clinic-line">
              {calm.map((c) => (
                <li key={c.t} className="flex gap-3 py-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clinic-panel text-clinic-accent"><c.i size={22} aria-hidden /></span>
                  <div className="min-w-0"><h3 className="font-clinic-display text-xl">{c.t}</h3><p className="mt-1 text-clinic-ink/70">{c.b}</p></div>
                </li>
              ))}
            </ul>
          </section>

          <section id="first-visit" aria-labelledby="fv-h" className="border-t border-clinic-line py-8 md:py-12">
            <h2 id="fv-h" className="font-clinic-display text-2xl md:text-3xl">Your first visit, in four parts</h2>
            <ol className="mt-6 grid gap-6 sm:grid-cols-2">
              {visit.map(([t, b], i) => (
                <li key={t} className="rounded-2xl bg-clinic-panel p-4">
                  <span className="font-clinic-display text-3xl text-clinic-accent" aria-hidden>{i + 1}</span>
                  <h3 className="mt-1 font-clinic-display text-xl">{t}</h3>
                  <p className="mt-1 text-sm text-clinic-ink/70">{b}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Frame ratio="4 / 3" className="rounded-2xl"><Photo photo={clinic.waitingRoom} grade="clinic" sizes="(min-width: 1024px) 35vw, 50vw" /></Frame>
              <Frame ratio="4 / 3" className="rounded-2xl"><Photo photo={clinic.treatment} grade="clinic" sizes="(min-width: 1024px) 35vw, 50vw" /></Frame>
            </div>
          </section>

          <section id="doctor" aria-labelledby="doc-h" className="border-t border-clinic-line py-8 md:py-12">
            <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-3">
              <div className="w-1/2 sm:w-full"><Frame ratio="3 / 4" className="rounded-2xl"><Photo photo={clinic.doctor} grade="clinic" sizes="(min-width: 1024px) 20vw, 50vw" /></Frame></div>
              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-wide text-clinic-accent">Your dentist</p>
                <h2 id="doc-h" className="mt-1 font-clinic-display text-2xl md:text-3xl">Dr. Alina Moss</h2>
                <p className="mt-3 max-w-measure text-clinic-ink/75">Dr. Moss has run Willowmere since it opened and still sees patients herself. She believes the most useful thing a dentist can do is slow down and explain.</p>
                <p className="mt-3 text-sm text-clinic-ink/55">Demo copy: this practice and its people are fictional.</p>
              </div>
            </div>
          </section>

          <section id="book" aria-labelledby="book-h" className="border-t border-clinic-line py-8 md:py-12">
            <h2 id="book-h" className="font-clinic-display text-2xl md:text-3xl">Request an appointment</h2>
            <p className="mt-2 text-clinic-ink/70">Three short questions. We reply to confirm a time.</p>
            <div className="mt-6"><BookingSteps /></div>
            <div id="visit" className="mt-8 text-sm"><p className="font-medium">Willowmere Dental Care</p><p>4420 Willowmere Ave, Portland, OR 97214</p></div>
          </section>
        </div>
        <div className="min-w-0 lg:col-span-12">
          <FaqList eyebrow="Questions" title="Common questions" items={[["I'm nervous about the dentist. Can you help?","Yes. Tell us when you book. We go at your pace and explain each step before we begin."],["How much will treatment cost?","You receive a written estimate, with options where there are options, before any treatment begins."],["What if I have a dental emergency?","Call the practice as early as you can; we make room for urgent problems where we can."],["Do you see children?","Ask us when you request an appointment and we will confirm."]] as const} cls={{ section: "border-t border-clinic-line py-8 md:py-12", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-clinic-accent", h2: "mt-3 font-clinic-display text-2xl md:text-3xl", line: "divide-y divide-clinic-line border-clinic-line border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-clinic-ink/70", plus: "text-2xl text-clinic-accent" }} />
        </div>
      </main>
    </ClinicShell>
  );
}
