import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList } from "@/components/FaqList";
import { education } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { EducationShell } from "./EducationShell";
import { ProgrammeFinder } from "./ProgrammeFinder";
import { programmes, schools } from "./data";

export const metadata: Metadata = withSocial({
  title: "Cobalt University — University demo",
  description: "A demo university website: a programme finder, schools, key dates, teaching staff and an admissions enquiry.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const schoolPhotos = [education.workshop, education.hero, education.classroom];
const quick = [
  { t: "Find a programme", d: "Search by subject and level", href: "#finder" },
  { t: "Key dates", d: "Open day, applications, intakes", href: "#dates" },
  { t: "Teaching staff", d: "Who you will learn from", href: "#staff" },
  { t: "Apply", d: "Four steps, one short call", href: "#admissions" },
];
const dates = [
  ["Nov", "Open day", "Campus tour, talks with staff and a chance to sit in on a class."],
  ["Jan", "Applications open", "Undergraduate, postgraduate and short courses."],
  ["Mar", "UX Design Certificate begins", "Part-time evening cohort."],
  ["Apr", "Data Analytics Certificate begins", "Full-time cohort on campus."],
  ["Sep", "Degree programmes begin", "All undergraduate and postgraduate intakes."],
];
const principles = [
  ["Small cohorts", "Seminar-sized groups, so every student is known by name and heard in discussion."],
  ["Practising teachers", "Staff who still do the work they teach, in design studios, software teams and organisations."],
  ["Project-led", "Every programme ends in substantial work you can show, often for an outside partner."],
];
const tutors = [
  { n: "Priya Raman", r: "Programme lead, UX Design", p: education.instructor },
  { n: "Owen Blake", r: "Programme lead, Data Analytics", p: education.classroom },
];
const steps = ["Choose a programme and send an enquiry", "Complete the online application", "Attend a 20-minute admissions call", "Confirm your place with a deposit"];
const ctl = "mt-1 h-8 w-full border border-white/40 bg-white px-2 text-base text-education-ink outline-none focus:border-education-accent focus-visible:ring-2 focus-visible:ring-education-accent";

export default function EducationDemo() {
  return (
    <EducationShell>
      <main id="main">
        {/* HERO — the campus, the promise, two clear actions */}
        <section aria-label="Cobalt University" className="bg-education-ink text-white">
          <div className="mx-auto grid max-w-page grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col justify-center px-3 py-8 md:px-4 md:py-12 lg:col-span-6 lg:pr-8">
              <p className="text-sm text-white/75">Undergraduate and postgraduate degrees, and short courses</p>
              <h1 className="fade-up mt-2 font-edu-display text-4xl font-medium leading-tight md:text-5xl">Small cohorts, taught by people who still practise.</h1>
              <p className="mt-3 max-w-measure-narrow text-lg text-white/80">Study design, computing or business at a university built around seminar-sized groups and real projects.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="#finder" className="inline-flex h-8 items-center bg-education-accent px-4 font-semibold text-white hover:brightness-95">Find a programme</a>
                <a href="#admissions" className="inline-flex h-8 items-center border border-white/50 px-4 font-semibold hover:bg-white/10">How to apply</a>
              </div>
            </div>
            <div className="md:pr-4 lg:col-span-6">
              <Frame ratio="4 / 3" mobileRatio="16 / 10"><Photo photo={education.campus} grade="education" priority sizes="(min-width: 1024px) 50vw, 100vw" /></Frame>
            </div>
          </div>
        </section>

        {/* Quick links — real anchors on this page */}
        <nav aria-label="Quick links" className="border-b border-education-line bg-education-panel">
          <ul className="mx-auto grid max-w-page grid-cols-1 divide-y divide-education-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {quick.map((q) => (
              <li key={q.t}>
                <a href={q.href} className="group flex items-center justify-between gap-2 px-3 py-3 hover:bg-education-bg md:px-4">
                  <span><span className="block font-edu-display text-lg font-semibold">{q.t}</span><span className="text-sm text-education-ink/70">{q.d}</span></span>
                  <ArrowRight size={18} aria-hidden className="shrink-0 text-education-accent transition-transform group-hover:translate-x-px" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* PROGRAMME FINDER */}
        <section id="finder" aria-labelledby="finder-h" className="scroll-mt-12 py-8 md:py-12">
          <div className={wrap}>
            <h2 id="finder-h" className="font-edu-display text-3xl font-medium md:text-4xl">Find a programme</h2>
            <p className="mt-2 max-w-measure text-education-ink/70">{programmes.length} programmes across three schools. Search by subject, or narrow by level and school.</p>
            <div className="mt-4"><ProgrammeFinder limit={5} /></div>
          </div>
        </section>

        {/* SCHOOLS */}
        <section id="schools" aria-labelledby="schools-h" className="scroll-mt-12 bg-education-panel py-8 md:py-12">
          <div className={wrap}>
            <h2 id="schools-h" className="font-edu-display text-3xl font-medium md:text-4xl">Three schools</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
              {schools.map((s, i) => (
                <article key={s.id} className="border-t-2 border-education-ink pt-3">
                  <Frame ratio="3 / 2"><Photo photo={schoolPhotos[i]} grade="education" sizes="(min-width: 768px) 33vw, 100vw" /></Frame>
                  <h3 className="mt-3 font-edu-display text-2xl font-semibold">{s.name}</h3>
                  <p className="mt-1 text-education-ink/70">{s.blurb}</p>
                  <ul className="mt-2 divide-y divide-education-line border-y border-education-line text-sm">
                    {programmes.filter((p) => p.school === s.id).map((p) => (
                      <li key={p.id}><Link href={`/demos/education/programs#${p.id}`} className="flex min-h-6 items-center justify-between gap-2 py-1 hover:text-education-accent"><span>{p.name}</span><ArrowRight size={16} aria-hidden className="shrink-0" /></Link></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LEARNING HERE */}
        <section aria-labelledby="learn-h" className="py-8 md:py-12">
          <div className={`${wrap} grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-12`}>
            <div className="lg:col-span-5"><Frame ratio="4 / 3"><Photo photo={education.instructor} grade="education" sizes="(min-width: 1024px) 40vw, 100vw" /></Frame></div>
            <div className="lg:col-span-7">
              <h2 id="learn-h" className="font-edu-display text-3xl font-medium md:text-4xl">A smaller, more practical way to learn</h2>
              <ol className="mt-4 divide-y divide-education-line border-y border-education-line">
                {principles.map(([t, b], i) => (
                  <li key={t} className="grid grid-cols-12 gap-2 py-3">
                    <span aria-hidden className="col-span-2 font-edu-display text-3xl text-education-accent md:col-span-1">0{i + 1}</span>
                    <div className="col-span-10 md:col-span-11"><h3 className="font-edu-display text-xl font-semibold">{t}</h3><p className="mt-1 text-education-ink/70">{b}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* KEY DATES */}
        <section id="dates" aria-labelledby="dates-h" className="scroll-mt-12 bg-education-panel py-8 md:py-12">
          <div className={`${wrap} grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-12`}>
            <div className="lg:col-span-4"><h2 id="dates-h" className="font-edu-display text-3xl font-medium md:text-4xl">Key dates</h2><p className="mt-2 text-education-ink/70">The admissions year at a glance, from open day to the first day of term.</p></div>
            <ol className="divide-y divide-education-ink/20 border-y border-education-ink/20 lg:col-span-8">
              {dates.map(([m, t, d]) => (
                <li key={t} className="grid grid-cols-12 items-baseline gap-2 py-3">
                  <span className="col-span-3 font-edu-display text-3xl uppercase text-education-accent md:col-span-2">{m}</span>
                  <div className="col-span-9 md:col-span-10"><p className="font-semibold">{t}</p><p className="text-sm text-education-ink/70">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TEACHING STAFF */}
        <section id="staff" aria-labelledby="staff-h" className="scroll-mt-12 py-8 md:py-12">
          <div className={wrap}>
            <h2 id="staff-h" className="font-edu-display text-3xl font-medium md:text-4xl">Teaching staff</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
              {tutors.map((t) => (
                <article key={t.n} className="grid grid-cols-3 items-center gap-3">
                  <div className="col-span-1"><Frame ratio="1 / 1" className="overflow-hidden rounded-full bg-education-panel"><Photo photo={t.p} grade="education" sizes="20vw" /></Frame></div>
                  <div className="col-span-2"><h3 className="font-edu-display text-xl font-semibold">{t.n}</h3><p className="text-sm text-education-accent">{t.r}</p><p className="mt-1 text-sm text-education-ink/70">Demo profile: a fictional member of staff written for this site.</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ADMISSIONS */}
        <section id="admissions" aria-labelledby="adm-h" className="scroll-mt-12 bg-education-ink py-8 text-white md:py-12">
          <div className={`${wrap} grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12`}>
            <div className="lg:col-span-5">
              <h2 id="adm-h" className="font-edu-display text-3xl font-medium md:text-4xl">How to apply</h2>
              <ol className="mt-4 divide-y divide-white/20 border-y border-white/20">
                {steps.map((s, i) => <li key={s} className="flex items-baseline gap-2 py-2"><span className="font-edu-display text-2xl text-education-accent">{i + 1}</span><span>{s}</span></li>)}
              </ol>
            </div>
            <div id="enrol" className="lg:col-span-7">
              <h3 className="font-edu-display text-2xl font-semibold">Start your enquiry</h3>
              <p className="mt-1 text-white/75">Choose a programme and leave your email. We reply with the next intake date and how to apply.</p>
              <DemoForm className="mt-3 grid gap-3 sm:grid-cols-2" noteClassName="border-l-4 border-education-accent pl-3 text-sm sm:col-span-2">
                <label className="text-sm sm:col-span-2">Programme<select name="programme" className={ctl}>{programmes.map((p) => <option key={p.id}>{p.name}</option>)}</select></label>
                <label className="text-sm">Name<input required name="name" autoComplete="name" className={ctl} /></label>
                <label className="text-sm">Email<input required type="email" name="email" autoComplete="email" className={ctl} /></label>
                <button className="inline-flex h-8 items-center justify-center bg-education-accent px-4 font-semibold text-white hover:brightness-95 sm:col-span-2 sm:w-fit">Send enquiry</button>
              </DemoForm>
            </div>
          </div>
        </section>

        <FaqList eyebrow="Questions" title="Common questions" items={[["Who are the programmes for?", "School leavers for the undergraduate degrees; graduates and practitioners for the master's; career changers and early-career professionals for the short courses."], ["How do I apply?", "Send an enquiry. We reply with the next intake date and how to apply. Admissions is an application and a 20-minute call."], ["Can I study part-time?", "The MA Human-Centred Design and the UX Design Certificate can be taken part-time. The other programmes are full-time."], ["Is this a real university?", "No. Cobalt University is a fictional institution created for this demo website."]] as const} cls={{ section: "border-t border-education-line py-8 md:py-12", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-education-accent", h2: "mt-3 font-edu-display text-2xl font-medium md:text-3xl", line: "divide-y divide-education-line border-education-line border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-education-ink/70", plus: "text-2xl text-education-accent" }} />
      </main>
    </EducationShell>
  );
}
