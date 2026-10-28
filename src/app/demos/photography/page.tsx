import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { photography } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { DemoForm } from "@/components/DemoForm";
import { PhotographyShell } from "./PhotographyShell";

export const metadata: Metadata = withSocial({
  title: "Rowan & Ash — Photography demo",
  description: "A demo photography studio website: selected work, how the studio works, packages and an enquiry.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const rows = [["Elopement", "Two hours, one location, a same-week preview gallery.", "$1,400"], ["Full day", "Up to eight hours, two shooters, a full edited gallery within three weeks.", "$3,200"], ["Editorial", "Brand and product work, scoped after a short call.", "On request"]];
const sheet = [photography.hero, photography.portraitOne, photography.detailOne, photography.eventTwo, photography.portraitTwo, photography.eventOne];
const how = [["Two people, every time", "One lead shooter, one second shooter and editor. Never an associate you've not met."], ["We arrive early", "Light, location and logistics sorted before anyone is waiting."], ["A preview, quickly", "A first set of frames while the day is still fresh."]];
const field = "mt-1 w-full border border-photo-bg/40 bg-photo-bg px-3 py-2 text-base text-photo-ink outline-none focus:border-photo-bg";

export default function PhotographyDemo() {
  return (
    <PhotographyShell>
      <main id="main">
        {/* HERO — image-led: one full-screen photograph, almost no interface. A quiet
            caption bar names the studio and the way in. */}
        <section aria-label="Rowan & Ash" className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-photo-ink text-photo-bg">
          <Photo photo={photography.hero} grade="photo" priority sizes="100vw" position="center 40%" />
          <div className="absolute inset-0 bg-gradient-to-t from-photo-ink/80 via-transparent to-photo-ink/20" />
          <div className={`${wrap} relative flex flex-wrap items-end justify-between gap-6 pb-8 pt-16`}>
            <div>
              <p className="text-xs uppercase tracking-ultra text-photo-bg/80">Weddings · Portraits · Editorial</p>
              <h1 className="fade-up mt-2 text-4xl italic leading-none md:text-5xl">Rowan &amp; Ash</h1>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/demos/photography/portfolio" className="border-b border-photo-bg py-2 italic hover:text-photo-muted">View the portfolio</Link>
              <a href="#enquire" className="border border-photo-bg px-4 py-2 hover:bg-photo-bg hover:text-photo-ink">Enquire</a>
            </div>
          </div>
        </section>

        <section id="portfolio" aria-label="Contact sheet of selected work" className="mt-6 md:mt-8">
          <ol className="grid grid-cols-2 gap-px bg-photo-line md:grid-cols-3">
            {sheet.map((p, i) => (
              <li key={i} className="bg-photo-bg">
                <Link href="/demos/photography/portfolio" className="zoom group relative block">
                  <Frame ratio="3 / 2"><Photo photo={p} grade="photo" priority={false} sizes="(min-width: 768px) 33vw, 50vw" /></Frame>
                  <span className="absolute left-2 top-2 bg-photo-bg px-2 py-px text-xs tracking-wide text-photo-ink">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className={`${wrap} mt-3 flex justify-end`}><Link href="/demos/photography/portfolio" className="inline-block border-b border-photo-ink py-2 text-sm italic">Open the full portfolio</Link></div>
        </section>

        <section aria-label="Statement" className="py-12 md:py-16">
          <div className={`${wrap} grid grid-cols-1 gap-6 lg:grid-cols-12 md:gap-8`}>
            <div className="lg:col-span-7"><Frame ratio="4 / 5" mobileRatio="4 / 3"><Photo photo={photography.camera} grade="photo" sizes="(min-width: 1024px) 55vw, 100vw" /></Frame></div>
            <div className="flex flex-col justify-end lg:col-span-5">
              <p className="text-3xl italic leading-snug md:text-4xl">We photograph people as they are, not as they think they ought to look — and we stay quiet enough that you forget we&apos;re there.</p>
              <dl className="mt-8 space-y-4 border-t border-photo-line pt-4">
                {how.map(([t, b]) => (<div key={t}><dt className="text-lg">{t}</dt><dd className="text-sm text-photo-muted">{b}</dd></div>))}
              </dl>
            </div>
          </div>
        </section>

        <section id="packages" aria-labelledby="pk-h" className="border-t border-photo-line py-12 md:py-16">
          <div className={wrap}>
            <h2 id="pk-h" className="text-3xl italic md:text-4xl">Packages</h2>
            <ul className="mt-6 border-t border-photo-ink">
              {rows.map(([n, b, p]) => (
                <li key={n} className="grid gap-1 border-b border-photo-line py-4 lg:grid-cols-12 md:items-baseline md:gap-3 md:py-6">
                  <span className="text-2xl lg:col-span-3 md:text-3xl">{n}</span>
                  <span className="text-sm text-photo-muted lg:col-span-7">{b}</span>
                  <span className="italic lg:col-span-2 md:text-right">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="enquire" aria-labelledby="enq-h" className="bg-photo-ink py-12 text-photo-bg md:py-16">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12`}>
            <div className="lg:col-span-5"><h2 id="enq-h" className="text-3xl italic md:text-4xl">Enquire</h2><p className="mt-3 text-photo-bg/70">Tell us what you&apos;re planning and roughly when. We reply with availability.</p></div>
            <DemoForm className="grid gap-4 sm:grid-cols-2 lg:col-span-7" noteClassName="text-sm sm:col-span-2">
              <label className="text-sm sm:col-span-2">What are you planning?<select name="kind" className={field}>{["Wedding", "Portrait session", "Brand shoot"].map((k) => <option key={k}>{k}</option>)}</select></label>
              <label className="text-sm">Approximate date<input required type="date" name="date" className={field} /></label>
              <label className="text-sm">Your email<input required type="email" name="email" className={field} /></label>
              <button className="border border-photo-bg px-4 py-2 text-base hover:bg-photo-bg hover:text-photo-ink sm:col-span-2 sm:w-fit">Send enquiry</button>
            </DemoForm>
          </div>
        </section>
        <FaqList eyebrow="Questions" title="Common questions" items={[["How far ahead should I book?","As early as you can — popular dates go first. Send an enquiry with your date and we reply with availability."],["Do you travel?","Yes, for the right project. Tell us the location in your enquiry."],["How soon will I see photographs?","A preview of first frames while the day is still fresh; the full edited gallery follows."]] as const} cls={{ section: "border-t border-photo-line py-12 md:py-16", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-photo-muted", h2: "mt-3 italic text-2xl md:text-3xl", line: "divide-y divide-photo-line border-photo-line border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-photo-muted", plus: "text-2xl text-photo-muted" }} />
      </main>
    </PhotographyShell>
  );
}
