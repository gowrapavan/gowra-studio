import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { hotel } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { HotelShell } from "../HotelShell";

export const metadata: Metadata = withSocial({
  title: "Rooms & rates — The Aurelia House (demo)",
  description:
    "Three room types at The Aurelia House — Garden Room, Twin Room and Aurelia Suite — with sizes, beds, rates and what every room includes.",
});

const rooms = [
  { id: "garden", name: "Garden Room", price: "€190", size: "22 m²", bed: "1 double bed", sleeps: 2, floor: "Ground", photos: [hotel.roomGarden, hotel.bathroom],
    body: "Our smallest room and the quietest. One large bed, a reading lamp that actually reaches the pillow, and a window onto the courtyard." },
  { id: "twin", name: "Twin Room", price: "€230", size: "26 m²", bed: "2 single beds", sleeps: 2, floor: "First", photos: [hotel.roomTwin, hotel.interior],
    body: "Two single beds, generous storage, and the same bathroom fit-out as every other room in the house." },
  { id: "suite", name: "Aurelia Suite", price: "€320", size: "38 m²", bed: "1 king bed", sleeps: 2, floor: "First", photos: [hotel.roomSuite, hotel.bedBath],
    body: "The corner room on the first floor, with a separate sitting area for when you'd rather not work from the bed." },
];

const everyRoom = [
  ["Walk-in shower", "Every room, with towels replaced daily."],
  ["A real desk", "By the window, with a socket within reach of the chair."],
  ["Breakfast downstairs", "From 7:00; until 10:30 on weekdays and 11:00 at weekends."],
  ["Front desk, any hour", "Including for late arrivals."],
];

export default function Rooms() {
  return (
    <HotelShell>
      <main id="main">
        <section className="px-3 pb-6 pt-8 md:pt-12">
          <div className="mx-auto max-w-page">
            <p className="font-hotel-body text-xs uppercase tracking-ultra text-aurelia-gold">Rooms &amp; rates</p>
            <h1 className="fade-up mt-2 font-hotel-display text-3xl font-light md:text-4xl">Three rooms, one standard</h1>
            <p className="mt-3 max-w-measure text-aurelia-ink/70">
              Rates are per room, per night, in euros, and include breakfast.
              Pick the shape of room that suits the trip — everything else is
              the same in all of them.
            </p>
          </div>
        </section>

        {/* At-a-glance comparison */}
        <section className="px-3 pb-8">
          <div className="mx-auto max-w-page relative overflow-x-auto" tabIndex={0} role="region" aria-label="Room comparison">
            <table className="w-full min-w-max border-collapse text-left font-hotel-body text-sm">
              <thead>
                <tr className="border-b border-aurelia-ink/20 text-xs uppercase tracking-wider text-aurelia-ink/60">
                  {["Room", "Size", "Beds", "Sleeps", "Floor", "From"].map((h) => (
                    <th key={h} scope="col" className="py-2 pr-4 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r.id} className="border-b border-aurelia-ink/10">
                    <th scope="row" className="py-3 pr-4 font-hotel-display text-lg font-normal"><a href={`#${r.id}`} className="inline-block py-2 hover:text-aurelia-gold">{r.name}</a></th>
                    <td className="py-3 pr-4">{r.size}</td><td className="py-3 pr-4">{r.bed}</td>
                    <td className="py-3 pr-4">{r.sleeps}</td><td className="py-3 pr-4">{r.floor}</td>
                    <td className="py-3">{r.price} / night</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Each room: a two-photo spread with the description set in between columns */}
        {rooms.map((r, i) => (
          <section key={r.id} id={r.id} className={`px-3 py-8 md:py-12 ${i % 2 ? "bg-aurelia-panel" : ""}`}>
            <div className="mx-auto grid grid-cols-1 max-w-page gap-4 lg:grid-cols-12 md:items-center md:gap-4">
              <div className={`min-w-0 lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <div className="grid grid-cols-3 gap-2">
                  <Frame ratio="4 / 5" className="col-span-2"><Photo photo={r.photos[0]} grade="aurelia" sizes="(min-width: 768px) 40vw, 66vw" /></Frame>
                  <Frame ratio="4 / 5" className="mt-6"><Photo photo={r.photos[1]} grade="aurelia" sizes="(min-width: 768px) 20vw, 33vw" /></Frame>
                </div>
              </div>
              <div className="min-w-0 lg:col-span-5">
                <h2 className="font-hotel-display text-2xl font-light">{r.name}</h2>
                <p className="mt-1 font-hotel-body text-sm text-aurelia-gold">€{r.price.slice(1)} per night · {r.size} · {r.bed}</p>
                <p className="mt-3 text-aurelia-ink/70">{r.body}</p>
                <a href="/demos/hotel#contact" className="mt-4 inline-block border border-aurelia-ink/30 px-4 py-2 font-hotel-body text-xs uppercase tracking-wider hover:bg-aurelia-ink hover:text-white">
                  Ask about dates
                </a>
              </div>
            </div>
          </section>
        ))}

        <section className="px-3 py-8 md:py-12">
          <div className="mx-auto max-w-page">
            <h2 className="font-hotel-display text-2xl font-light">In every room</h2>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {everyRoom.map(([t, b]) => (
                <div key={t} className="border-t-2 border-aurelia-gold pt-3">
                  <dt className="font-medium">{t}</dt>
                  <dd className="mt-1 text-sm text-aurelia-ink/70">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
    </HotelShell>
  );
}
