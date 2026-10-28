import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { construction } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { ConstructionShell } from "./ConstructionShell";

export const metadata: Metadata = withSocial({
  title: "Marrow & Stone — Construction demo",
  description: "A demo design-build website: projects as spec sheets, services, process and a project-brief form.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const projects = [["P-01", "Open-plan renovation", "Full renovation", "14 weeks", construction.interior], ["P-02", "Kitchen with island", "Interior fit-out", "9 weeks", construction.kitchen], ["P-03", "Ground-up residential build", "New build", "Varies", construction.siteWork]] as const;
const phases = ["Site visit", "Design", "Approvals", "Build", "Handover"];
const services = [["A", "Full renovation", "Structural and cosmetic work, project-managed start to finish."], ["B", "New build", "Ground-up residential builds, from foundation to handover."], ["C", "Interior fit-out", "Kitchens, bathrooms and living spaces, design and build."]];
const kinds = ["Renovation", "New build", "Kitchen", "Bathroom", "Extension"];
const fld = "mt-1 w-full border border-construction-ink bg-construction-bg px-3 py-2 text-base";

export default function ConstructionDemo() {
  return (
    <ConstructionShell>
      <main id="main">
        {/* 1 — Hero: a solid text panel beside a full-height photograph */}
        <section aria-label="Welcome" className="grid grid-cols-1 bg-construction-ink text-construction-bg lg:grid-cols-2">
          <div className="flex items-center px-3 py-8 md:px-4 md:py-12 lg:px-12">
            <div className="max-w-measure">
              <p className="inline-block border border-construction-bg/60 px-2 py-1 text-xs uppercase tracking-wider">Design-build · homes &amp; small commercial</p>
              <h1 className="fade-up mt-4 font-construction-display text-4xl font-bold uppercase leading-none md:text-5xl">We build what we draw.</h1>
              <p className="mt-4 text-lg text-construction-bg/85">One team from first sketch to handover, so the person who promised the detail is the person who builds it.</p>
              <div className="mt-6 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                <a href="#brief" className="inline-flex h-8 items-center justify-center bg-construction-accent px-4 text-sm font-semibold uppercase tracking-wide text-white hover:bg-construction-bg hover:text-construction-ink">Send a project brief</a>
                <a href="#work" className="inline-flex h-8 items-center justify-center border-2 border-construction-bg px-4 text-sm font-semibold uppercase tracking-wide hover:bg-construction-bg hover:text-construction-ink">See our projects</a>
              </div>
            </div>
          </div>
          <Frame ratio="4 / 3" className="lg:h-full lg:!aspect-auto"><Photo photo={construction.hero} grade="construction" priority sizes="(min-width: 1024px) 50vw, 100vw" /></Frame>
        </section>

        {/* 2 — Approach */}
        <section aria-labelledby="app-h" className="py-8 md:py-12">
          <div className={`${wrap} grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12`}>
            <div className="lg:col-span-6"><Frame ratio="3 / 2"><Photo photo={construction.blueprint} grade="construction" sizes="(min-width: 1024px) 50vw, 100vw" /></Frame></div>
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-ultra text-construction-accent">Our approach</p>
              <h2 id="app-h" className="mt-3 font-construction-display text-3xl font-bold uppercase md:text-4xl">Design and construction under one roof</h2>
              <p className="mt-4 max-w-measure text-construction-ink/75">Most delays and cost surprises happen in the hand-off between designer and builder. We remove the hand-off. The people who draw your project are the people who price it, programme it and build it.</p>
              <ul className="mt-6 space-y-2">{["One team, one point of contact", "A written scope and price before work starts", "A clear programme you can follow"].map((x) => <li key={x} className="flex gap-3"><span aria-hidden className="text-construction-accent">■</span>{x}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* 3 — Projects */}
        <section id="work" aria-labelledby="work-h" className="bg-construction-panel py-8 md:py-12">
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className="text-xs font-semibold uppercase tracking-ultra text-construction-accent">Project register</p><h2 id="work-h" className="mt-3 font-construction-display text-3xl font-bold uppercase md:text-4xl">Selected projects</h2></div>
              <Link href="/demos/construction/projects" className="py-2 text-sm font-semibold underline hover:text-construction-accent">All projects</Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {projects.map(([r, n, t, d, p]) => (
                <article key={r as string} className="zoom group bg-construction-bg">
                  <Frame ratio="4 / 3"><Photo photo={p as typeof construction.hero} grade="construction" sizes="(min-width: 768px) 33vw, 100vw" /></Frame>
                  <div className="p-4"><div className="flex items-baseline justify-between gap-2"><span className="font-construction-display text-lg text-construction-accent">{r as string}</span><span className="text-xs uppercase tracking-wide text-construction-ink/60">{d as string}</span></div><h3 className="mt-1 font-construction-display text-xl font-bold uppercase">{n as string}</h3><p className="mt-1 text-sm text-construction-ink/65">{t as string}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — Services */}
        <section id="services" aria-labelledby="svc-h" className="py-8 md:py-12">
          <div className={wrap}>
            <p className="text-xs font-semibold uppercase tracking-ultra text-construction-accent">What we do</p>
            <h2 id="svc-h" className="mt-3 font-construction-display text-3xl font-bold uppercase md:text-4xl">Services</h2>
            <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {services.map(([l, t, b]) => (
                <li key={l as string} className="border-t-4 border-construction-ink pt-4"><span className="font-construction-display text-sm font-bold text-construction-accent">0{(l as string).charCodeAt(0) - 64}</span><h3 className="mt-1 font-construction-display text-xl font-bold uppercase">{t as string}</h3><p className="mt-2 text-construction-ink/70">{b as string}</p></li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 — Process */}
        <section id="process" aria-labelledby="proc-h" className="bg-construction-ink py-8 text-construction-bg md:py-12">
          <div className={wrap}>
            <p className="text-xs font-semibold uppercase tracking-ultra text-construction-accent">Programme</p>
            <h2 id="proc-h" className="mt-3 font-construction-display text-3xl font-bold uppercase md:text-4xl">From site visit to handover</h2>
            <ol className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-5">
              {phases.map((p, i) => (
                <li key={p} className="border-t-4 border-construction-accent pt-3"><span className="font-construction-display text-3xl">{String(i + 1).padStart(2, "0")}</span><p className="mt-1 text-sm font-semibold uppercase tracking-wide">{p}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <FaqList eyebrow="Questions" title="Common questions" items={[["How do you price a project?","After a site visit we issue a written scope and price before work starts."],["Do you handle approvals?","Approvals are a phase in the programme, and we coordinate them as part of the job."],["Can you work with my architect?","Yes. We can build from your drawings or design it with you."]] as const} cls={{ section: "border-t-2 border-construction-ink bg-construction-panel py-12 md:py-16", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-construction-accent", h2: "mt-3 font-construction-display uppercase font-bold text-2xl md:text-3xl", line: "divide-y divide-construction-ink border-construction-ink border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-construction-ink/70", plus: "text-2xl text-construction-accent" }} />

        {/* 6 — Brief */}
        <section id="brief" aria-labelledby="brief-h" className="bg-construction-accent py-8 text-white md:py-12">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12`}>
            <div className="lg:col-span-5"><h2 id="brief-h" className="font-construction-display text-3xl font-bold uppercase md:text-4xl">Send a project brief</h2><p className="mt-3 text-white/90">Tell us about the project. We reply to arrange a site visit.</p></div>
            <div className="lg:col-span-7"><DemoForm className="grid gap-4 sm:grid-cols-2" noteClassName="border-l-4 border-construction-accent pl-3 text-sm">
              <fieldset className="min-w-0 sm:col-span-2"><legend className="text-xs font-semibold uppercase tracking-wide">What are you planning? (any)</legend>
                <div className="mt-2 flex flex-wrap gap-2">{kinds.map((k) => (<label key={k}><input type="checkbox" name="kind" value={k} className="peer sr-only" /><span className="inline-block cursor-pointer border border-construction-bg/50 px-4 py-3 text-sm uppercase tracking-wide peer-checked:border-construction-accent peer-checked:bg-construction-accent peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-construction-accent">{k}</span></label>))}</div></fieldset>
              <label className="text-xs font-semibold uppercase tracking-wide">Start<select name="when" className={`${fld} text-construction-ink`}>{["Within 3 months", "3–6 months", "6–12 months", "Just exploring"].map((w) => <option key={w}>{w}</option>)}</select></label>
              <label className="text-xs font-semibold uppercase tracking-wide">Email<input required type="email" name="email" className={`${fld} text-construction-ink`} /></label>
              <button className="bg-construction-accent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:brightness-110 sm:col-span-2">Send brief</button>
            </DemoForm></div>
          </div>
        </section>
      </main>
    </ConstructionShell>
  );
}
