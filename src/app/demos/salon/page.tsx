import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { salon } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { DemoForm } from "@/components/DemoForm";
import { SalonShell } from "./SalonShell";

export const metadata: Metadata = withSocial({
  title: "Maison Form — Salon demo",
  description: "A demo salon website: cut and colour services, the studio, and a booking request.",
});

const menu = [
  ["Signature cut", "£65"], ["Colour & gloss", "£120"], ["Balayage", "£165"], ["Keratin treatment", "£180"], ["Bridal styling", "£230"],
];
const u = "min-w-0 max-w-full border-b-2 border-white/40 bg-transparent py-2 font-salon-display text-xl italic outline-none focus:border-maison-blush md:text-2xl";

export default function SalonDemo() {
  return (
    <SalonShell>
      <main id="main">
        {/* HERO — oversized italic type running across the photograph */}
        <section className="relative overflow-hidden px-3 pb-8 pt-8 md:px-4 md:pb-16 md:pt-12">
          <div className="mx-auto grid grid-cols-1 max-w-page gap-4 lg:grid-cols-12">
            <div className="relative z-10 flex flex-col justify-end lg:col-span-8 lg:row-start-1">
              <p className="font-salon-body text-xs uppercase tracking-ultra">Cutting &amp; colour studio · Newcastle</p>
              <h1 className="fade-up mt-3 font-salon-display text-4xl italic leading-none md:-mr-16 md:text-5xl">
                Hair,<br />considered.
              </h1>
              <p className="mt-6 max-w-measure-narrow font-salon-body text-maison-ink/70">
                Every appointment starts with a conversation, not a scissors. We listen first, then we cut.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#book" className="bg-maison-ink px-4 py-2 font-salon-body text-sm text-white hover:bg-maison-blush">Book a consultation</a>
                <Link href="/demos/salon/services" className="border border-maison-ink px-4 py-2 font-salon-body text-sm hover:bg-maison-ink hover:text-white">Prices</Link>
              </div>
            </div>
            <div className="lg:col-span-4 lg:row-start-1">
              <Frame ratio="3 / 4"><Photo photo={salon.hero} grade="maison" priority sizes="(min-width: 768px) 33vw, 100vw" /></Frame>
            </div>
          </div>
        </section>

        {/* BAND */}
        <div aria-hidden className="overflow-hidden bg-maison-blush py-3 text-white">
          <p className="marquee whitespace-nowrap font-salon-body text-xs uppercase tracking-ultra">
            <span className="pr-4">Cut · Colour · Gloss · Balayage · Keratin · Bridal · Cut · Colour · Gloss · Balayage · Keratin · Bridal · Cut · Colour · Gloss · Balayage · Keratin · Bridal · </span><span className="pr-4">Cut · Colour · Gloss · Balayage · Keratin · Bridal · Cut · Colour · Gloss · Balayage · Keratin · Bridal · Cut · Colour · Gloss · Balayage · Keratin · Bridal · </span>
          </p>
        </div>

        {/* CRAFT — three captioned plates at different scales */}
        <section id="craft" className="px-3 py-12 md:px-4 md:py-16">
          <div className="mx-auto grid grid-cols-1 max-w-page items-end gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-5"><figure><Frame ratio="4 / 5"><Photo photo={salon.styling} grade="maison" sizes="(min-width: 768px) 40vw, 100vw" /></Frame><figcaption className="mt-2 font-salon-body text-xs uppercase tracking-wider">Fig. 01 — at the chair</figcaption></figure></Reveal>
            <Reveal index={1} className="lg:col-span-4"><figure><Frame ratio="1 / 1"><Photo photo={salon.consultation} grade="maison" sizes="(min-width: 768px) 30vw, 100vw" /></Frame><figcaption className="mt-2 font-salon-body text-xs uppercase tracking-wider">Fig. 02 — the consultation</figcaption></figure></Reveal>
            <Reveal index={2} className="lg:col-span-3"><figure><Frame ratio="3 / 4"><Photo photo={salon.mirror} grade="maison" sizes="(min-width: 768px) 25vw, 100vw" /></Frame><figcaption className="mt-2 font-salon-body text-xs uppercase tracking-wider">Fig. 03 — detail</figcaption></figure></Reveal>
          </div>
        </section>

        {/* PRICE LIST — black, enormous rows */}
        <section id="pricing" className="bg-maison-bg px-3 py-12 text-white md:px-4 md:py-16">
          <div className="mx-auto max-w-page">
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-salon-display text-3xl italic md:text-3xl">The list</h2>
              <Link href="/demos/salon/services" className="py-2 font-salon-body text-xs uppercase tracking-ultra text-maison-blush hover:text-white">Full details</Link>
            </div>
            <ul className="mt-6 border-t border-white/30">
              {menu.map(([n, p]) => (
                <li key={n} className="flex items-baseline justify-between gap-3 border-b border-white/30 py-3 md:py-4">
                  <span className="font-salon-display text-xl italic md:text-2xl">{n}</span>
                  <span className="font-salon-body text-base text-maison-blush md:text-lg">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* STUDIO */}
        <section id="studio" className="px-3 py-12 md:px-4 md:py-16">
          <div className="mx-auto grid grid-cols-1 max-w-page gap-6 lg:grid-cols-12 md:items-center">
            <Frame ratio="16 / 10" className="lg:col-span-8"><Photo photo={salon.chair} grade="maison" sizes="(min-width: 768px) 65vw, 100vw" /></Frame>
            <div className="lg:col-span-4">
              <h2 className="font-salon-display text-2xl italic md:text-3xl">The studio</h2>
              <p className="mt-3 font-salon-body text-maison-ink/70">18 Pilgrim Street, Newcastle upon Tyne NE1 6QE.</p>
              <p className="mt-1 font-salon-body text-maison-ink/70">Tue – Fri 9:00–19:00.</p>
            </div>
          </div>
        </section>

        {/* BOOKING — a sentence to complete, on black */}
        <section id="book" className="bg-maison-bg px-3 py-12 text-white md:px-4 md:py-16">
          <div className="mx-auto max-w-page">
            <h2 className="font-salon-display text-2xl italic md:text-3xl">Let&apos;s talk about your hair.</h2>
            <DemoForm className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-4 font-salon-display text-lg italic md:text-2xl" noteClassName="w-full font-salon-body text-sm not-italic text-maison-blush">
              <span>I&apos;m</span>
              <input required name="name" aria-label="Your name" placeholder="your name" className={`${u} w-full sm:w-auto`} />
              <span>and I&apos;d like a</span>
              <select name="service" aria-label="Service" className={`${u} bg-maison-bg`}>{menu.map(([n]) => <option key={n}>{n.toLowerCase()}</option>)}</select>
              <span>around</span>
              <input required type="date" name="date" aria-label="Preferred date" className={`${u} not-italic`} />
              <button className="mt-4 w-full bg-white px-4 py-2 font-salon-body text-sm not-italic text-maison-ink hover:bg-maison-blush hover:text-white sm:mt-0 sm:w-auto">Request</button>
            </DemoForm>
          </div>
        </section>
      </main>
    </SalonShell>
  );
}
