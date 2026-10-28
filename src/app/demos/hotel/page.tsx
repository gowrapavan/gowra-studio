import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { BedDouble, Clock, Coffee, KeyRound, Monitor, Bath } from "lucide-react";
import { hotel } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { HotelShell } from "./HotelShell";

export const metadata: Metadata = withSocial({
  title: "The Aurelia House — Hotel demo",
  description: "A demo boutique-hotel website: rooms and rates, amenities, gallery, the neighbourhood and an availability request.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const eyebrow = "font-hotel-body text-xs uppercase tracking-ultra text-aurelia-gold";
const label = "font-hotel-body text-xs uppercase tracking-wider text-aurelia-ink/60";
const field = "mt-1 w-full border-b border-aurelia-ink/30 bg-transparent py-2 font-hotel-body text-base outline-none focus:border-aurelia-gold";
const rooms = [
  { name: "Garden Room", spec: "22 m² · one double bed", rate: "€190", body: "The quietest room in the house, with a window onto the courtyard. Warm timber, a proper wardrobe and a desk by the window.", p: hotel.roomGarden },
  { name: "Twin Room", spec: "26 m² · two single beds", rate: "€230", body: "Two beds, generous storage and the same bathroom as every other room — ideal for friends, colleagues or a parent and child.", p: hotel.roomTwin },
  { name: "Aurelia Suite", spec: "38 m² · one king bed", rate: "€320", body: "The corner room, with a king bed and a sitting area for when you would rather not work from the bed.", p: hotel.roomSuite },
];
const amenities = [
  { i: Coffee, t: "Breakfast included", b: "Served downstairs from 7:00 in every rate." },
  { i: Clock, t: "Front desk, 24 hours", b: "Late arrivals are welcome; someone is always there." },
  { i: Monitor, t: "A real desk", b: "Every room has a desk by the window and a socket in reach." },
  { i: BedDouble, t: "Considered beds", b: "Quiet rooms and bedding chosen for proper sleep." },
  { i: Bath, t: "A bathroom to match", b: "Generous showers and good towels, in every room." },
  { i: KeyRound, t: "Easy arrival", b: "Check-in from 3pm, check-out by 11am, luggage held on request." },
];

export default function HotelDemo() {
  return (
    <HotelShell>
      <main id="main">
        {/* 1 — Hero with the booking bar docked in it */}
        <section aria-label="Welcome" className="relative flex min-h-svh flex-col justify-end overflow-hidden">
          <Photo photo={hotel.hero} grade="aurelia" priority sizes="100vw" position="center 55%" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/20" />
          <div className={`${wrap} relative pb-8 pt-16 text-center text-white`}>
            <p className="font-hotel-body text-xs uppercase tracking-ultra text-white/85">Lisbon · old quarter · fourteen rooms</p>
            <h1 className="fade-up mx-auto mt-4 max-w-measure font-hotel-display text-5xl font-light leading-tight md:text-5xl">A small hotel for people who like to wake slowly.</h1>
            <p className="mx-auto mt-4 max-w-measure-narrow font-hotel-body text-lg text-white/85">Quiet rooms, a proper breakfast and a front desk that never closes.</p>
          </div>
          <div className={`${wrap} relative pb-8`}>
            <DemoForm className="grid grid-cols-1 gap-3 bg-aurelia-bg p-4 text-aurelia-ink shadow-e2 sm:grid-cols-2 md:p-6 lg:grid-cols-5 lg:items-end" noteClassName="font-hotel-body text-sm text-aurelia-deep sm:col-span-2 lg:col-span-5">
              <label className={label}>Arrive<input required type="date" name="in" className={field} /></label>
              <label className={label}>Depart<input required type="date" name="out" className={field} /></label>
              <label className={label}>Guests<select name="guests" className={field}>{[1, 2, 3].map((n) => <option key={n}>{n}</option>)}</select></label>
              <label className={label}>Room<select name="room" className={field}><option>Any room</option>{rooms.map((r) => <option key={r.name}>{r.name}</option>)}</select></label>
              <button className="bg-aurelia-deep px-4 py-4 font-hotel-body text-xs uppercase tracking-wider text-white hover:brightness-110 sm:col-span-2 lg:col-span-1">Check availability</button>
            </DemoForm>
          </div>
        </section>

        {/* 2 — Welcome */}
        <section aria-labelledby="welcome-h" className="py-12 md:py-16">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-6"><p className={eyebrow}>Welcome</p><h2 id="welcome-h" className="mt-4 font-hotel-display text-4xl font-light leading-tight md:text-4xl">Not a big hotel. A well-kept house.</h2></div>
            <div className="lg:col-span-6">
              <p className="font-hotel-body text-lg text-aurelia-ink/80">The Aurelia House has fourteen rooms, one dining room and a front desk that knows your name by the second morning. We keep it small so we can keep it right: quiet rooms, honest rates and nothing you did not ask for.</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-aurelia-ink/15 pt-6 font-hotel-body">
                {[["14", "rooms"], ["24h", "front desk"], ["3pm", "check-in"]].map(([n, l]) => (<div key={l}><dt className="sr-only">{l}</dt><dd><span className="block font-hotel-display text-4xl font-light text-aurelia-gold">{n}</span><span className="text-xs uppercase tracking-wider text-aurelia-ink/60">{l}</span></dd></div>))}
              </dl>
            </div>
          </div>
        </section>

        {/* 3 — Rooms */}
        <section id="rooms" aria-labelledby="rooms-h" className="bg-aurelia-panel py-12 md:py-16">
          <div className={wrap}>
            <div className="mx-auto max-w-measure text-center"><p className={eyebrow}>Rooms &amp; rates</p><h2 id="rooms-h" className="mt-4 font-hotel-display text-4xl font-light md:text-4xl">Three ways to stay</h2></div>
            <div className="mt-12 space-y-12 md:space-y-16">
              {rooms.map((r, i) => (
                <article key={r.name} className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-16">
                  <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}><Frame ratio="3 / 2"><Photo photo={r.p} grade="aurelia" sizes="(min-width: 1024px) 55vw, 100vw" /></Frame></div>
                  <div className="lg:col-span-5">
                    <p className={eyebrow}>{r.spec}</p>
                    <h3 className="mt-3 font-hotel-display text-3xl font-light md:text-4xl">{r.name}</h3>
                    <p className="mt-4 font-hotel-body text-aurelia-ink/75">{r.body}</p>
                    <p className="mt-6 font-hotel-display text-3xl font-light">from {r.rate} <span className="font-hotel-body text-xs uppercase tracking-wider text-aurelia-ink/55">per night · breakfast included</span></p>
                    <a href="#contact" className="mt-6 inline-flex items-center justify-center border border-aurelia-deep px-6 py-2 font-hotel-body text-xs uppercase tracking-wider text-aurelia-deep hover:bg-aurelia-deep hover:text-white">Ask about dates</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-12 text-center"><Link href="/demos/hotel/rooms" className="inline-flex h-6 items-center font-hotel-body text-sm uppercase tracking-wider text-aurelia-deep underline underline-offset-4">Compare all rooms</Link></p>
          </div>
        </section>

        {/* 4 — Amenities */}
        <section id="house" aria-labelledby="house-h" className="py-12 md:py-16">
          <div className={wrap}>
            <div className="mx-auto max-w-measure text-center"><p className={eyebrow}>The house</p><h2 id="house-h" className="mt-4 font-hotel-display text-4xl font-light md:text-4xl">Everything included, nothing extra</h2></div>
            <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {amenities.map((a) => (
                <li key={a.t} className="border-t border-aurelia-gold/60 pt-6"><a.i size={28} aria-hidden className="text-aurelia-gold" /><h3 className="mt-4 font-hotel-display text-2xl font-light">{a.t}</h3><p className="mt-2 font-hotel-body text-aurelia-ink/70">{a.b}</p></li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 — Gallery */}
        <section id="gallery" aria-labelledby="gal-h" className="bg-aurelia-ink py-12 text-aurelia-bg md:py-16">
          <div className={wrap}>
            <p className={eyebrow}>Gallery</p>
            <h2 id="gal-h" className="mt-4 font-hotel-display text-4xl font-light md:text-4xl">Inside a room</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              <div className="col-span-2 md:col-span-2"><Frame ratio="16 / 9"><Photo photo={hotel.interior} grade="aurelia" sizes="(min-width: 768px) 66vw, 100vw" /></Frame></div>
              <div className="col-span-1"><Frame ratio="1 / 1" className="md:h-full md:!aspect-auto"><Photo photo={hotel.desk} grade="aurelia" sizes="(min-width: 768px) 33vw, 50vw" /></Frame></div>
              <div className="col-span-1"><Frame ratio="1 / 1"><Photo photo={hotel.bedBath} grade="aurelia" sizes="(min-width: 768px) 33vw, 50vw" /></Frame></div>
              <div className="col-span-1"><Frame ratio="1 / 1"><Photo photo={hotel.roomGarden} grade="aurelia" sizes="(min-width: 768px) 33vw, 50vw" /></Frame></div>
              <div className="col-span-2 md:col-span-1"><Frame ratio="1 / 1" mobileRatio="16 / 9"><Photo photo={hotel.roomSuite} grade="aurelia" sizes="(min-width: 768px) 33vw, 100vw" /></Frame></div>
            </div>
          </div>
        </section>

        {/* 6 — Good to know */}
        <section aria-labelledby="know-h" className="py-12 md:py-16">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-5"><p className={eyebrow}>Before you arrive</p><h2 id="know-h" className="mt-4 font-hotel-display text-4xl font-light md:text-4xl">Good to know</h2></div>
            <dl className="divide-y divide-aurelia-ink/15 border-y border-aurelia-ink/15 font-hotel-body lg:col-span-7">
              {[["Check-in", "From 3pm. Late arrivals are welcome — the front desk is staffed 24 hours."], ["Check-out", "By 11am. We will hold your luggage if your flight is later."], ["Breakfast", "Included in every rate, served downstairs from 7:00."], ["Getting here", "In Lisbon's old quarter. Ask us for directions from the airport or station."]].map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-3 py-6"><dt className="text-xs uppercase tracking-wider text-aurelia-gold">{k}</dt><dd className="col-span-2 text-aurelia-ink/80">{v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7 — Contact */}
        <section id="contact" aria-labelledby="contact-h" className="bg-aurelia-deep py-12 text-white md:py-16">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-5"><p className="font-hotel-body text-xs uppercase tracking-ultra text-white/70">Reservations</p><h2 id="contact-h" className="mt-4 font-hotel-display text-4xl font-light md:text-4xl">Write to the front desk</h2><p className="mt-4 font-hotel-body text-white/80">Questions about a room, a late arrival or a longer stay. A person replies.</p></div>
            <DemoForm className="grid gap-4 sm:grid-cols-2 lg:col-span-7" noteClassName="font-hotel-body text-sm text-white sm:col-span-2">
              <label className="font-hotel-body text-xs uppercase tracking-wider text-white/70">Name<input required name="name" className="mt-1 w-full border-b border-white/40 bg-transparent py-2 text-base text-white outline-none focus:border-white" /></label>
              <label className="font-hotel-body text-xs uppercase tracking-wider text-white/70">Email<input required type="email" name="email" className="mt-1 w-full border-b border-white/40 bg-transparent py-2 text-base text-white outline-none focus:border-white" /></label>
              <label className="font-hotel-body text-xs uppercase tracking-wider text-white/70 sm:col-span-2">Message<textarea name="message" rows={3} className="mt-1 w-full border-b border-white/40 bg-transparent py-2 text-base text-white outline-none focus:border-white" /></label>
              <button className="bg-white px-6 py-2 font-hotel-body text-xs uppercase tracking-wider text-aurelia-deep hover:bg-aurelia-bg sm:col-span-2 sm:w-fit">Send message</button>
            </DemoForm>
          </div>
        </section>
      </main>
    </HotelShell>
  );
}
