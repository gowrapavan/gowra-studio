import Link from "next/link";
import { Container } from "../ui";
import { Photo, Frame } from "../Photo";
import { Reveal } from "../Reveal";
import type { Grade } from "../Photo";
import type { Photo as PhotoData } from "@/config/images";
import { studio } from "@/config/images";

const projects: {
  href: string;
  name: string;
  note: string;
  photo: PhotoData;
  grade: Grade;
}[] = [
  {
    href: "/demos/restaurant",
    name: "Ember & Olive",
    note: "Concept project · Restaurant",
    photo: studio.restaurant,
    grade: "ember",
  },
  {
    href: "/demos/hotel",
    name: "The Aurelia House",
    note: "Concept project · Hotel",
    photo: studio.hotel,
    grade: "aurelia",
  },
  {
    href: "/demos/salon",
    name: "Maison Form",
    note: "Concept project · Salon",
    photo: studio.salon,
    grade: "maison",
  },
  {
    href: "/demos/service",
    name: "Northline Home Services",
    note: "Concept project · Home services",
    photo: studio.service,
    grade: "northline",
  },
];

const [feature, ...rest] = projects;

/**
 * Composition: "mixed-size gallery tiles" — one wide banner tile above
 * three smaller equal tiles, distinct from DemoShowcase's row of equal
 * tiles higher up this same page.
 */
export function Portfolio() {
  return (
    <section className="border-t border-line bg-paper py-8 md:py-12">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-measure-narrow">
            <h2 className="font-display text-xl tracking-tight md:text-2xl">
              Recent work
            </h2>
          </div>
          <p className="max-w-measure-narrow text-sm text-ink-soft">
            The projects below are concept builds created to demonstrate our
            design and development quality — not paid client work.
          </p>
        </div>

        {/*
          Desktop: one wide banner tile above a row of three equal tiles.
          Mobile keeps that same "one big, several small" idea rather than
          flattening to a rail: the banner stays full width at a shorter
          landscape crop, and the three below sit in a compact 2-up grid
          with the third spanning the full row.
        */}
        <div className="mt-6 md:mt-8">
          <Reveal>
            <Link href={feature.href} className="block">
              <Frame
                ratio="21 / 9"
                mobileRatio="16 / 10"
                className="rounded-xl border border-line"
              >
                <Photo
                  photo={feature.photo}
                  grade={feature.grade}
                  sizes="100vw"
                  className="transition-transform duration-700 hover:scale-105"
                />
              </Frame>
              <p className="mt-3 font-medium text-ink">{feature.name}</p>
              <p className="text-sm text-ink-soft">{feature.note}</p>
            </Link>
          </Reveal>

          <div className="mt-4 grid grid-cols-2 gap-3 md:mt-4 md:grid-cols-3 md:gap-4">
            {rest.map((p, i) => (
              <Reveal
                key={p.href}
                index={i + 1}
                className={i === 2 ? "col-span-2 md:col-span-1" : ""}
              >
                <Link href={p.href} className="block">
                  <Frame
                    ratio="3 / 4"
                    mobileRatio={i === 2 ? "16 / 9" : "1 / 1"}
                    className="rounded-xl border border-line"
                  >
                    <Photo
                      photo={p.photo}
                      grade={p.grade}
                      sizes="(min-width: 768px) 30vw, 46vw"
                      className="transition-transform duration-700 hover:scale-105"
                    />
                  </Frame>
                  <p className="mt-2 text-sm font-medium text-ink md:mt-3 md:text-base">
                    {p.name}
                  </p>
                  <p className="text-xs text-ink-soft md:text-sm">{p.note}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}