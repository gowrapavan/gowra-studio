import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { EducationShell } from "../EducationShell";
import { ProgrammeFinder } from "../ProgrammeFinder";
import { levels, programmes, levelAnchor } from "../data";

export const metadata: Metadata = withSocial({
  title: "Programmes — Cobalt University (demo)",
  description: "All ten programmes at Cobalt University, a fictional institution: undergraduate and postgraduate degrees and short courses, with duration, mode and intake.",
});

const steps = ["Choose a programme and send an enquiry", "Complete the online application", "Attend a 20-minute admissions call", "Confirm your place with a deposit"];
const wrap = "mx-auto w-full max-w-page px-3 md:px-4";

export default function Programs() {
  return (
    <EducationShell>
      <main id="main">
        <section className="bg-education-ink text-white">
          <div className={`${wrap} py-8 md:py-12`}>
            <h1 className="fade-up max-w-measure font-edu-display text-4xl font-medium leading-tight md:text-5xl">All programmes</h1>
            <p className="mt-3 max-w-measure text-lg text-white/80">Four undergraduate degrees, four master&apos;s and two short courses. Open any row for what you will study.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {levels.map((l) => (
                <li key={l.id}><a href={`#${levelAnchor(l.id)}`} className="inline-flex h-6 items-center border border-white/50 px-3 text-sm font-semibold hover:bg-white/10">{l.plural} ({programmes.filter((p) => p.level === l.id).length})</a></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className={wrap}>
            <ProgrammeFinder enquireHref="/demos/education#admissions" />
          </div>
        </section>

        <section className="bg-education-panel py-8 md:py-12">
          <div className={wrap}>
            <h2 className="font-edu-display text-3xl font-medium md:text-4xl">How to apply</h2>
            <ol className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              {steps.map((s, i) => <li key={s} className="border-t-2 border-education-accent pt-2"><span className="font-edu-display text-2xl text-education-accent">{i + 1}</span><p className="mt-1">{s}</p></li>)}
            </ol>
            <Link href="/demos/education#admissions" className="mt-6 inline-flex h-8 items-center bg-education-ink px-4 font-semibold text-white hover:bg-education-accent">Start your enquiry</Link>
          </div>
        </section>
      </main>
    </EducationShell>
  );
}
