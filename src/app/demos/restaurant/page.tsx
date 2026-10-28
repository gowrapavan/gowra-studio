import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { Flame, Users, Wine } from "lucide-react";
import { restaurant } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { RestaurantShell } from "./RestaurantShell";

export const metadata: Metadata = withSocial({
  title: "Ember & Olive — Restaurant demo",
  description: "A demo restaurant website: wood-fired cooking, a short seasonal menu, the room, a gallery and a reservation request.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const eyebrow = "text-xs font-medium uppercase tracking-ultra text-ember-brass";
const courses = [
  { t: "To begin", items: [["Burrata, charred fig, hazelnut", "16"], ["Grilled octopus, white bean purée", "19"]] },
  { t: "From the fire", items: [["Ember-roasted short rib", "34"], ["Salmon, salsa verde", "32"]] },
  { t: "To finish", items: [["Olive oil cake, citrus", "12"]] },
];
const features = [
  { i: Flame, t: "Cooked over coals", b: "Everything that can be is finished on the fire, so the menu stays short and the cooking stays honest." },
  { i: Users, t: "A long table", b: "Tables are held for the evening and a long table seats the whole party together." },
  { i: Wine, t: "A short, thoughtful list", b: "Wines chosen to sit beside smoke and salt, poured generously and without fuss." },
];
const field = "mt-1 w-full border border-ember-text/25 bg-ember-bg/80 px-3 py-2 text-base text-ember-text outline-none focus:border-ember-brass";

export default function RestaurantDemo() {
  return (
    <RestaurantShell>
      <main id="main">
        {/* 1 — Hero: an inset, framed photograph with the text on a panel that overlaps its edge */}
        <section aria-label="Welcome" className="pt-16">
          <div className={wrap}>
            <Frame ratio="21 / 9" mobileRatio="4 / 3"><Photo photo={restaurant.hero} grade="ember" priority sizes="100vw" position="center 40%" /></Frame>
            <div className="relative -mt-12 max-w-measure bg-ember-bg p-6 shadow-e2 md:-mt-16 md:ml-12 md:p-8">
              <p className={eyebrow}>Wood-fired · Tuesday to Sunday · from 5:30pm</p>
              <h1 className="fade-up mt-3 font-restaurant-display text-4xl leading-none md:text-5xl">Fire, salt, and a little patience.</h1>
              <p className="mt-4 text-ember-text/85">A short menu cooked over coals, in a room made for the second glass of wine.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#reserve" className="rounded-full bg-ember-wine px-6 py-2 text-sm font-medium tracking-wide text-ember-text hover:brightness-110">Reserve a table</a>
                <Link href="/demos/restaurant/menu" className="rounded-full border border-ember-text/50 px-6 py-2 text-sm tracking-wide hover:border-ember-brass hover:text-ember-brass">View the menu</Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2 — Facts strip */}
        <section aria-label="At a glance" className="border-y border-ember-text/15 bg-ember-panel">
          <ul className={`${wrap} grid grid-cols-2 gap-px py-4 text-center text-xs uppercase tracking-ultra text-ember-text/75 md:grid-cols-4 md:text-sm`}>
            {["Wood-fired kitchen", "Forty seats", "Seasonal menu", "Open Tue – Sun"].map((x) => <li key={x} className="py-3">{x}</li>)}
          </ul>
        </section>

        {/* 3 — Story */}
        <section id="story" aria-labelledby="story-h" className="py-12 md:py-16">
          <div className={`${wrap} grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-6">
              <Frame ratio="4 / 5" mobileRatio="4 / 3"><Photo photo={restaurant.longTable} grade="ember" sizes="(min-width: 1024px) 45vw, 100vw" /></Frame>
            </div>
            <div className="lg:col-span-6">
              <p className={eyebrow}>Our kitchen</p>
              <h2 id="story-h" className="mt-3 font-restaurant-display text-4xl leading-tight md:text-4xl">Cooking that starts with a fire and ends with a long table.</h2>
              <p className="mt-6 max-w-measure text-lg text-ember-text/80">We built Ember &amp; Olive around one idea: that good ingredients need very little. A wood fire, salt, olive oil, and the patience to let things take the time they take.</p>
              <p className="mt-4 max-w-measure text-ember-text/70">The menu is short on purpose and changes with the market. The room is small on purpose too — forty seats, a kitchen you can see into, and nobody asked to leave for the next booking.</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-ember-text/15 pt-6">
                {[["40", "seats"], ["5", "nights a week"], ["1", "wood fire"]].map(([n, l]) => (<div key={l}><dt className="sr-only">{l}</dt><dd><span className="block font-restaurant-display text-4xl text-ember-brass">{n}</span><span className="text-xs uppercase tracking-wide text-ember-text/65">{l}</span></dd></div>))}
              </dl>
            </div>
          </div>
        </section>

        {/* 4 — Tonight's fire: the two signature dishes */}
        <section id="fire" aria-labelledby="fire-h" className="bg-ember-panel py-12 md:py-16">
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className={eyebrow}>Tonight&apos;s fire</p><h2 id="fire-h" className="mt-3 font-restaurant-display text-4xl md:text-4xl">From the coals</h2></div>
              <Link href="/demos/restaurant/menu" className="py-2 text-sm text-ember-brass underline hover:text-ember-text">See the full menu</Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {[{ n: "Ember-roasted short rib", d: "Slow-cooked, then finished over coals until the edges catch.", p: "34", ph: restaurant.shortRib }, { n: "Salmon, salsa verde", d: "Skin crisped on the grill, bright herbs to cut through the smoke.", p: "32", ph: restaurant.salmon }].map((x) => (
                <article key={x.n} className="zoom group">
                  <Frame ratio="4 / 3"><Photo photo={x.ph} grade="ember" sizes="(min-width: 768px) 45vw, 100vw" /></Frame>
                  <div className="mt-4 flex items-baseline justify-between gap-3"><h3 className="font-restaurant-display text-2xl md:text-3xl">{x.n}</h3><span className="font-restaurant-display text-2xl text-ember-brass">${x.p}</span></div>
                  <p className="mt-2 max-w-measure text-ember-text/70">{x.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — The menu at a glance */}
        <section id="menu" aria-labelledby="menu-h" className="py-12 md:py-16">
          <div className={wrap}>
            <div className="mx-auto max-w-measure text-center"><p className={eyebrow}>The board</p><h2 id="menu-h" className="mt-3 font-restaurant-display text-4xl md:text-4xl">This week&apos;s menu</h2></div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
              {courses.map((c) => (
                <div key={c.t}>
                  <h3 className="border-b border-ember-brass/60 pb-3 text-center text-xs uppercase tracking-ultra text-ember-brass">{c.t}</h3>
                  <ul className="mt-6 space-y-4">
                    {c.items.map(([n, p]) => (
                      <li key={n} className="flex items-baseline gap-2 font-restaurant-display text-lg"><span>{n}</span><span aria-hidden className="min-w-0 flex-1 border-b border-dotted border-ember-text/30" /><span className="text-ember-brass">${p}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center"><Link href="/demos/restaurant/menu" className="inline-block rounded-full border border-ember-text/40 px-6 py-2 text-sm tracking-wide hover:border-ember-brass hover:text-ember-brass">Read the full menu</Link></p>
          </div>
        </section>

        {/* 6 — The room */}
        <section id="room" aria-labelledby="room-h" className="relative">
          <Frame ratio="21 / 9" mobileRatio="4 / 3"><Photo photo={restaurant.fullRoom} grade="ember" sizes="100vw" /><div className="absolute inset-0 bg-ember-bg/55" /></Frame>
          <div className="absolute inset-0 flex items-center"><div className={wrap}><p className={eyebrow}>The room</p><h2 id="room-h" className="mt-3 max-w-measure font-restaurant-display text-3xl leading-tight md:text-4xl">A room built for the second glass of wine.</h2></div></div>
        </section>
        <section aria-label="What to expect" className="py-12 md:py-16">
          <ul className={`${wrap} grid grid-cols-1 gap-8 md:grid-cols-3`}>
            {features.map((f) => (
              <li key={f.t} className="border-t border-ember-brass/60 pt-6"><f.i size={28} aria-hidden className="text-ember-brass" /><h3 className="mt-4 font-restaurant-display text-2xl">{f.t}</h3><p className="mt-2 text-ember-text/70">{f.b}</p></li>
            ))}
          </ul>
        </section>

        {/* 7 — Gallery */}
        <section id="gallery" aria-labelledby="gal-h" className="bg-ember-panel py-12 md:py-16">
          <div className={wrap}>
            <p className={eyebrow}>Gallery</p>
            <h2 id="gal-h" className="mt-3 font-restaurant-display text-4xl md:text-4xl">An evening at Ember &amp; Olive</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              <div className="col-span-2 md:row-span-2"><Frame ratio="1 / 1" className="md:h-full md:!aspect-auto"><Photo photo={restaurant.eveningRoom} grade="ember" sizes="(min-width: 768px) 50vw, 100vw" /></Frame></div>
              <Frame ratio="1 / 1"><Photo photo={restaurant.plate} grade="ember" sizes="(min-width: 768px) 25vw, 50vw" /></Frame>
              <Frame ratio="1 / 1"><Photo photo={restaurant.lobster} grade="ember" sizes="(min-width: 768px) 25vw, 50vw" /></Frame>
              <Frame ratio="1 / 1"><Photo photo={restaurant.room} grade="ember" sizes="(min-width: 768px) 25vw, 50vw" /></Frame>
              <Frame ratio="1 / 1"><Photo photo={restaurant.longTable} grade="ember" sizes="(min-width: 768px) 25vw, 50vw" /></Frame>
            </div>
          </div>
        </section>

        {/* 8 — Visit */}
        <section id="visit" aria-labelledby="visit-h" className="py-12 md:py-16">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-5"><p className={eyebrow}>Visit</p><h2 id="visit-h" className="mt-3 font-restaurant-display text-4xl md:text-4xl">Before you come</h2><p className="mt-4 text-ember-text/70">We keep things simple. Here is everything you need to know before you arrive.</p></div>
            <dl className="divide-y divide-ember-text/15 border-y border-ember-text/15 lg:col-span-7">
              {[["Hours", "Tuesday – Sunday, 5:30pm – 11pm. Closed Mondays."], ["Reservations", "Request a table below; we confirm by reply within a day."], ["Allergies", "Tell us in the notes. The kitchen cooks with nuts, shellfish and gluten."], ["Groups", "The long table seats the whole party together."]].map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-3 py-6"><dt className="text-xs uppercase tracking-ultra text-ember-brass">{k}</dt><dd className="col-span-2 text-ember-text/85">{v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        {/* 9 — Reserve */}
        <section id="reserve" aria-labelledby="res-h" className="relative">
          <Photo photo={restaurant.eveningRoom} grade="ember" sizes="100vw" />
          <div className="absolute inset-0 bg-ember-bg/85" />
          <div className={`${wrap} relative py-12 md:py-16`}>
            <div className="mx-auto max-w-measure text-center"><p className={eyebrow}>Reservations</p><h2 id="res-h" className="mt-3 font-restaurant-display text-4xl md:text-4xl">Request a table</h2><p className="mt-3 text-ember-text/75">Tell us when and how many. We confirm by reply within a day.</p></div>
            <DemoForm className="mx-auto mt-8 grid max-w-measure gap-4 sm:grid-cols-2" noteClassName="text-sm text-ember-brass sm:col-span-2">
              <label className="text-sm sm:col-span-2">Name<input required name="name" autoComplete="name" className={field} /></label>
              <label className="text-sm">Date<input required type="date" name="date" className={field} /></label>
              <label className="text-sm">Party size<select name="party" className={field}>{[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n}</option>)}</select></label>
              <label className="text-sm sm:col-span-2">Notes &amp; allergies<textarea name="notes" rows={3} className={field} /></label>
              <button className="rounded-full bg-ember-wine px-6 py-2 text-sm font-medium tracking-wide hover:brightness-110 sm:col-span-2">Send request</button>
            </DemoForm>
          </div>
        </section>
      </main>
    </RestaurantShell>
  );
}
