"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Button, buttonClass } from "../ui";
import { ScaledFrame } from "../ScaledFrame";
import { studioDemos } from "@/config/studio-demos";

/**
 * The most characteristic thing a web studio can show first is the work, so
 * the hero is a live view of a real demo site. The list under the headline
 * switches it between all fourteen industries.
 */
export function Hero() {
  const [i, setI] = useState(0);
  const d = studioDemos[i];
  const href = `/demos/${d.slug}`;

  return (
    <section className="bg-ink text-paper">
      <Container className="grid grid-cols-1 gap-6 py-6 md:gap-8 md:py-8 lg:grid-cols-12 lg:gap-12 lg:py-12">
        <div className="lg:col-span-5">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            See the website we would build for <span className="text-brass">your business.</span>
          </h1>
          <p className="mt-3 max-w-measure-narrow text-lg text-paper/80">
            Gowra Studio designs and builds websites for restaurants, hotels,
            shops, clinics and other local businesses. Open a working demo for
            your industry, then ask for one made for you. The concept is free.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button href="/#contact" variant="primary">Get a free demo</Button>
            <Link href="/#demos" className={buttonClass.ghost}>Browse all 14 demos</Link>
          </div>

          <p id="hero-list-label" className="mt-6 text-sm font-semibold">
            Pick your industry
          </p>
          <ul
            aria-labelledby="hero-list-label"
            className="-mx-2 mt-1 flex snap-x gap-1 overflow-x-auto px-2 pb-1 md:mx-0 md:px-0 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-x-2 lg:gap-y-1 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {studioDemos.map((x, n) => (
              <li key={x.slug} className="shrink-0 snap-start lg:shrink">
                <button
                  type="button"
                  aria-pressed={n === i}
                  onClick={() => setI(n)}
                  className={`flex h-8 w-full items-center whitespace-nowrap rounded-md border px-2 text-left text-sm transition-colors lg:h-6 ${
                    n === i
                      ? "border-brass bg-brass font-semibold text-ink"
                      : "border-paper/30 text-paper hover:border-paper hover:bg-paper/10"
                  }`}
                >
                  {x.industry}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            <div className="overflow-hidden rounded-md border border-paper/25 bg-paper">
              <div className="flex items-center justify-between gap-2 border-b border-line bg-paper px-2 py-1 text-xs text-ink-soft">
                <span className="truncate">{href}</span>
                <span className="shrink-0">Live preview</span>
              </div>
              <Link href={href} aria-label={`Open the ${d.name} demo`} className="block">
                <ScaledFrame src={href} title={`${d.name}, a ${d.industry.toLowerCase()} website demo`} ratio={1.7} phoneRatio={1} />
              </Link>
            </div>
            {/* The same site at phone width, so responsiveness is visible, not claimed. */}
            <div className="absolute -bottom-3 right-3 hidden w-1/5 overflow-hidden rounded-lg border-4 border-brass bg-paper shadow-e2 md:block">
              <ScaledFrame key={href} src={href} title={`${d.name} at phone width`} ratio={0.5} phoneRatio={0.5} delayMs={1200} />
            </div>
          </div>
          <div aria-live="polite" className="mt-4 flex flex-col gap-2 md:mt-6 md:max-w-measure">
            <h2 className="font-display text-xl font-bold">
              {d.name} <span className="text-base font-medium text-paper/70">· {d.industry}</span>
            </h2>
            <p className="text-paper/80">{d.summary}</p>
            <p className="text-sm text-paper/70">Includes: {d.highlights.join(", ").toLowerCase()}.</p>
            <div className="mt-1">
              <Link href={href} className={buttonClass.light}>
                Open this demo <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
