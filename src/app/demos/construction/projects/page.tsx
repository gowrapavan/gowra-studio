import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { construction } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { ConstructionShell } from "../ConstructionShell";

export const metadata: Metadata = withSocial({
  title: "Projects — Marrow & Stone (demo)",
  description: "Three projects shown as spec sheets: an open-plan renovation, a kitchen fit-out and a ground-up build.",
});

const projects = [
  { ref: "P-01", name: "Open-plan renovation", type: "Full renovation", spec: [["Scope", "Structural opening, exposed beams, new floors"], ["Duration", "14 weeks"], ["Approach", "Walls removed in week two once engineering sign-off was in hand"]], photo: construction.interior, ratio: "16 / 9" },
  { ref: "P-02", name: "Kitchen with island", type: "Interior fit-out", spec: [["Scope", "Layout change, joinery, services and finishes"], ["Duration", "9 weeks"], ["Approach", "Joinery ordered before demolition so the site was never kitchen-less for long"]], photo: construction.kitchen, ratio: "4 / 3" },
  { ref: "P-03", name: "Ground-up residential build", type: "New build", spec: [["Scope", "Foundation to handover"], ["Duration", "Varies by design"], ["Approach", "Weekly site updates with photographs and a written variation log"]], photo: construction.siteWork, ratio: "16 / 9" },
];

export default function Projects() {
  return (
    <ConstructionShell>
      <main id="main">
        <section className="border-b border-construction-line px-3 pb-8 pt-16 md:px-4 md:pt-16">
          <div className="mx-auto max-w-page">
            <p className="text-xs uppercase tracking-ultra text-construction-accent">Projects</p>
            <h1 className="fade-up mt-2 font-construction-display text-4xl uppercase leading-tight md:text-4xl">Work, as spec sheets</h1>
            <p className="mt-3 max-w-measure text-construction-ink/70">Each project below is described the way we&apos;d brief a client: what was done, how long it took and how it was handled.</p>
          </div>
        </section>

        {projects.map((p, i) => (
          <section key={p.ref} id={p.ref.toLowerCase()} className="border-b border-construction-line px-3 py-8 md:px-4 md:py-12">
            <div className="mx-auto grid grid-cols-1 max-w-page gap-6 lg:grid-cols-12 md:gap-4">
              <div className={`min-w-0 lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <Frame ratio={p.ratio}><Photo photo={p.photo} grade="construction" sizes="(min-width: 768px) 55vw, 100vw" /></Frame>
              </div>
              <div className="min-w-0 lg:col-span-5">
                <p className="font-construction-display text-xl text-construction-accent">{p.ref}</p>
                <h2 className="font-construction-display text-2xl uppercase">{p.name}</h2>
                <p className="text-sm uppercase tracking-wide text-construction-ink/60">{p.type}</p>
                <dl className="mt-4 border-t border-construction-line text-sm">
                  {p.spec.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-2 border-b border-construction-line py-2"><dt className="uppercase tracking-wide text-construction-ink/60">{k}</dt><dd className="col-span-2">{v}</dd></div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        ))}

        <section className="px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto max-w-page">
            <div className="relative">
              <Frame ratio="21 / 9" mobileRatio="16 / 9"><Photo photo={construction.blueprint} grade="construction" sizes="100vw" /></Frame>
            </div>
            <h2 className="mt-6 font-construction-display text-2xl uppercase">Have a project in mind?</h2>
            <p className="mt-2 max-w-measure text-construction-ink/70">Start with a site visit. We&apos;ll give an honest read on scope, budget and timeline before any drawings are made.</p>
            <Link href="/demos/construction#process" className="mt-4 inline-flex bg-construction-accent px-4 py-3 text-sm font-medium uppercase tracking-wide text-white hover:brightness-95">See how we work</Link>
          </div>
        </section>
      </main>
    </ConstructionShell>
  );
}
