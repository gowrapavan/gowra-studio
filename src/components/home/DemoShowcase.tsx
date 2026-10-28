import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../ui";
import { Photo, Frame } from "../Photo";
import { Reveal } from "../Reveal";
import type { Grade } from "../Photo";
import type { Photo as PhotoData } from "@/config/images";
import { studio } from "@/config/images";

const demos: {
  href: string;
  name: string;
  category: string;
  description: string;
  photo: PhotoData;
  grade: Grade;
}[] = [
  {
    href: "/demos/restaurant",
    name: "Ember & Olive",
    category: "Restaurant",
    description:
      "Dark, wood-fired and built around the room — menu, reservations and a story worth reading.",
    photo: studio.restaurant,
    grade: "ember",
  },
  {
    href: "/demos/hotel",
    name: "The Aurelia House",
    category: "Hotel & guest house",
    description:
      "Calm and spacious, with rooms and availability front and centre.",
    photo: studio.hotel,
    grade: "aurelia",
  },
  {
    href: "/demos/salon",
    name: "Maison Form",
    category: "Salon & beauty studio",
    description:
      "Monochrome and editorial, built to make booking an appointment the obvious next step.",
    photo: studio.salon,
    grade: "maison",
  },
  {
    href: "/demos/service",
    name: "Northline Home Services",
    category: "Local service business",
    description:
      "Straightforward and trustworthy — service areas, process and a fast way to get a quote.",
    photo: studio.service,
    grade: "northline",
  },
  {
    href: "/demos/retail",
    name: "Fielding & Rye",
    category: "Retail & e-commerce",
    description:
      "Product-forward and familiar, with real filtering, a product page and a working cart.",
    photo: studio.retail,
    grade: "retail",
  },
  {
    href: "/demos/realestate",
    name: "Halyard Property",
    category: "Real estate",
    description:
      "A research tool, not a brochure — search, a map-synced listings view and a property page built around the key facts.",
    photo: studio.realestate,
    grade: "realestate",
  },
  {
    href: "/demos/fitness",
    name: "Vantage Athletic Club",
    category: "Fitness & gym",
    description:
      "Bold and dark, with a hard-edged membership comparison table instead of another set of pricing cards.",
    photo: studio.fitness,
    grade: "fitness",
  },
  {
    href: "/demos/clinic",
    name: "Willowmere Dental Care",
    category: "Clinic & healthcare",
    description:
      "Calm and unhurried, with a zero-JS accordion for services and a short, specific appointment request.",
    photo: studio.clinic,
    grade: "clinic",
  },
  {
    href: "/demos/photography",
    name: "Rowan & Ash Photography",
    category: "Photography & creative studio",
    description:
      "The portfolio is the site — a full-bleed masonry gallery and pricing set in plain type, no cards at all.",
    photo: studio.photography,
    grade: "photo",
  },
  {
    href: "/demos/travel",
    name: "Wayfare & Co",
    category: "Travel & tours",
    description:
      "A destination search up front, a day-by-day sample itinerary, and a staggered trip grid instead of an even one.",
    photo: studio.travel,
    grade: "travel",
  },
  {
    href: "/demos/auto",
    name: "Ridgeline Motors",
    category: "Car dealership",
    description:
      "Inventory search, a real spec-comparison table with a pinned first column, and starting finance figures.",
    photo: studio.auto,
    grade: "auto",
  },
  {
    href: "/demos/wedding",
    name: "Linden & Rose Events",
    category: "Wedding & events",
    description:
      "Editorial and soft — a story scroll of real weddings and a consultative enquiry form, not a booking widget.",
    photo: studio.wedding,
    grade: "wedding",
  },
  {
    href: "/demos/education",
    name: "Cobalt Institute",
    category: "Education & training",
    description:
      "Program facts laid out as a definition list, not a claim — format, duration and intake date, nothing invented.",
    photo: studio.education,
    grade: "education",
  },
  {
    href: "/demos/construction",
    name: "Marrow & Stone",
    category: "Construction & architecture",
    description:
      "A blueprint-style process grid and a static before/after project, built to read like a technical drawing.",
    photo: studio.construction,
    grade: "construction",
  },
];

export function DemoShowcase() {
  return (
    <section
      id="demos"
      className="border-t border-line bg-paper py-12 md:py-16"
    >
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-xl tracking-tight md:text-2xl">
              Don&apos;t imagine it. See it.
            </h2>
            <p className="mt-2 max-w-measure-narrow text-ink-soft">
              Complete, working websites — each built with its own identity
              for the kind of business it represents.
            </p>
          </div>
        </div>

        {/*
          Desktop: 2×2 grid of landscape cards. Mobile: these four cards
          carry real content (category, name, a full description) — that
          reads better as a plain vertical stack, one full-width card per
          row, than as scroll-hidden tiles. A shorter landscape crop keeps
          each card compact instead of a tall portrait photo dominating
          the screen.
        */}
        <div className="grid gap-3 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((d, i) => (
            <Reveal key={d.href} index={i}>
              <Link
                href={d.href}
                className="group block overflow-hidden rounded-2xl border border-line"
              >
                <Frame ratio="16 / 11" mobileRatio="16 / 10">
                  <Photo
                    photo={d.photo}
                    grade={d.grade}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4">
                    <div>
                      <p className="text-xs text-white/75 md:text-sm">
                        {d.category}
                      </p>
                      <p className="mt-1 font-display text-base text-white md:text-lg">
                        {d.name}
                      </p>
                      <p className="mt-1 max-w-measure-narrow text-xs text-white/80 md:text-sm">
                        {d.description}
                      </p>
                    </div>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </Frame>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}