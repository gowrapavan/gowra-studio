import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { clinic } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { ClinicShell } from "../ClinicShell";
import { TreatmentTabs, type Treatment } from "./TreatmentTabs";

export const metadata: Metadata = withSocial({
  title: "Treatments — Willowmere Dental Care (demo)",
  description: "Check-ups, fillings, root canal treatment and whitening at Willowmere, with what happens at each visit.",
});

const items: Treatment[] = [
  { id: "checkup", name: "Check-ups & cleaning", summary: "A full exam, a professional clean, and a plain-language rundown of anything worth watching — no jargon, no surprise add-ons at the chair.",
    visit: ["We review your history and any concerns.", "Exam and, where needed, X-rays — shown to you on screen.", "Professional clean and polish.", "A clear summary of what, if anything, needs attention and when."],
    note: "You'll leave knowing what is urgent, what can wait, and what it is likely to cost." },
  { id: "fillings", name: "Fillings & restorations", summary: "Tooth-coloured composite fillings placed in a single visit for most cavities.",
    visit: ["We numb the area and check you're comfortable.", "Decay is removed and the tooth is shaped.", "The filling is placed, set with a light, and polished.", "We check your bite before you leave."],
    note: "Larger restorations may need a second visit; we'll tell you at the exam, not at the chair." },
  { id: "rootcanal", name: "Root canal treatment", summary: "Performed in-house rather than referred out, so the same team sees it through.",
    visit: ["We confirm the diagnosis with an X-ray.", "The area is numbed and the infected tissue removed.", "The canals are cleaned and sealed.", "We plan a follow-up to restore the tooth."],
    note: "Most people are surprised how ordinary it feels. Tell us at any point if you need a break." },
  { id: "whitening", name: "Cosmetic & whitening", summary: "Take-home and in-chair whitening, plus consultations for veneers and bonding.",
    visit: ["We check your teeth and gums are suitable.", "Shade is recorded so you can see the change.", "Treatment is done in the chair, or trays are made for home.", "We explain how to keep the result."],
    note: "Whitening isn't suitable for everyone; we'll say so plainly if it isn't right for you." },
];

const cost = [
  ["Before treatment", "A written estimate, with options where there are options."],
  ["With insurance", "We'll tell you what we expect your plan to cover before you commit."],
  ["Without insurance", "Ask about our in-house membership plan."],
];

export default function Treatments() {
  return (
    <ClinicShell>
      <main id="main">
        <section className="px-3 pt-8 md:px-4 md:pt-12">
          <div className="mx-auto grid grid-cols-1 max-w-page gap-6 lg:grid-cols-12 md:items-center md:gap-4">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-wide text-clinic-accent">Treatments</p>
              <h1 className="fade-up mt-2 font-clinic-display text-3xl md:text-4xl">What we do, and what it&apos;s like</h1>
              <p className="mt-3 max-w-measure text-clinic-ink/70">
                Most people put off the dentist because of what they don&apos;t
                know. Choose a treatment to see, step by step, what happens.
              </p>
            </div>
            <div className="lg:col-span-5">
              <Frame ratio="4 / 3" className="rounded-2xl"><Photo photo={clinic.treatment} grade="clinic" priority sizes="(min-width: 768px) 40vw, 100vw" /></Frame>
            </div>
          </div>
        </section>

        <section className="px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto max-w-page"><TreatmentTabs items={items} /></div>
        </section>

        <section className="bg-clinic-panel px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto max-w-page">
            <h2 className="font-clinic-display text-2xl">How cost works</h2>
            <dl className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {cost.map(([t, b]) => (
                <div key={t} className="rounded-2xl bg-clinic-bg p-4"><dt className="font-medium">{t}</dt><dd className="mt-1 text-sm text-clinic-ink/70">{b}</dd></div>
              ))}
            </dl>
            <Link href="/demos/clinic#book" className="mt-6 inline-flex rounded-2xl bg-clinic-accent px-4 py-3 text-sm font-medium text-white hover:brightness-95">Book an appointment</Link>
          </div>
        </section>
      </main>
    </ClinicShell>
  );
}
