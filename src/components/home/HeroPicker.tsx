"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo, Frame, type Grade } from "../Photo";
import { studio } from "@/config/images";
import type { Photo as PhotoData } from "@/config/images";

type Industry = {
  label: string;
  site: string;
  line: string;
  has: string[];
  href: string;
  photo: PhotoData;
  grade: Grade;
  bar: string;
};

/** Every colour class is spelled out in full so Tailwind can see it. */
const industries: Industry[] = [
  { label: "Restaurant", site: "Ember & Olive", line: "The menu, the hours and a table request, all on the first screen.", has: ["Menu", "Reservations", "Gallery"], href: "/demos/restaurant", photo: studio.restaurant, grade: "ember", bar: "bg-ember-wine" },
  { label: "Hotel", site: "The Aurelia House", line: "Rooms with rates, and an availability request that is easy to find.", has: ["Rooms and rates", "Booking bar", "Gallery"], href: "/demos/hotel", photo: studio.hotel, grade: "aurelia", bar: "bg-aurelia-deep" },
  { label: "Salon", site: "Maison Form", line: "A clear price list and a simple way to ask for an appointment.", has: ["Price list", "Studio", "Booking request"], href: "/demos/salon", photo: studio.salon, grade: "maison", bar: "bg-maison-blush" },
  { label: "Dental clinic", site: "Willowmere Dental Care", line: "Calm, readable and easy to book, for people who would rather not be there.", has: ["Treatments", "Your dentist", "Appointment steps"], href: "/demos/clinic", photo: studio.clinic, grade: "clinic", bar: "bg-clinic-accent" },
  { label: "Shop", site: "Fielding & Rye", line: "A storefront with product pages, sizes and a working cart.", has: ["Product pages", "Sizes", "Cart"], href: "/demos/retail", photo: studio.retail, grade: "retail", bar: "bg-retail-accent" },
  { label: "Gym", site: "Vantage Athletic Club", line: "Programs, membership plans and a free-trial booking.", has: ["Timetable", "Plans", "Trial booking"], href: "/demos/fitness", photo: studio.fitness, grade: "fitness", bar: "bg-fitness-accent" },
  { label: "Property", site: "Halyard Property", line: "Search listings the way buyers do, then ask about the one you like.", has: ["Filters", "Listing pages", "Enquiry"], href: "/demos/realestate", photo: studio.realestate, grade: "realestate", bar: "bg-realestate-navy" },
  { label: "Home services", site: "Northline", line: "Quote requests that are quick to send and clear about what happens next.", has: ["Services", "Quote form", "Areas served"], href: "/demos/service", photo: studio.service, grade: "northline", bar: "bg-northline-navy" },
];

export function HeroPicker() {
  const [i, setI] = useState(0);
  const a = industries[i];
  return (
    <div>
      <div role="group" aria-label="Choose a type of business" className="flex flex-wrap gap-2">
        {industries.map((x, n) => (
          <button
            key={x.label}
            type="button"
            aria-pressed={n === i}
            onClick={() => setI(n)}
            className={`rounded-full border px-4 py-3 text-sm font-semibold transition-colors ${n === i ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:border-ink"}`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-6 overflow-hidden rounded-xl border border-ink/20 bg-paper shadow-e2">
        <div className={`flex items-center gap-3 px-3 py-2 text-xs text-white ${a.bar}`}>
          <span aria-hidden className="flex gap-1"><i className="block h-1 w-1 rounded-full bg-white/70" /><i className="block h-1 w-1 rounded-full bg-white/70" /><i className="block h-1 w-1 rounded-full bg-white/70" /></span>
          <span className="min-w-0 flex-1 truncate">{a.site}</span>
        </div>
        <Frame ratio="16 / 10" mobileRatio="4 / 3"><Photo key={a.site} photo={a.photo} grade={a.grade} priority sizes="(min-width: 1024px) 55vw, 100vw" /></Frame>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="font-display text-xl font-bold">{a.site}</h2>
            <p className="mt-1 text-ink-soft">{a.line}</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs text-ink-soft">
              {a.has.map((h) => <li key={h} className="rounded border border-line px-2 py-1">{h}</li>)}
            </ul>
          </div>
          <Link href={a.href} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-paper hover:bg-brass-deep md:col-span-4">Open this demo <ArrowUpRight size={16} aria-hidden /></Link>
        </div>
      </div>
    </div>
  );
}
