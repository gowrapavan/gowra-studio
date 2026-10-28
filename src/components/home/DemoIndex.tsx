"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionHeading } from "../ui";
import { studioDemos, demoGroups, type DemoGroup } from "@/config/studio-demos";

/** All fourteen demos as an index, filterable by kind of business. */
export function DemoIndex() {
  const [group, setGroup] = useState<DemoGroup | "all">("all");
  const shown = studioDemos.filter((d) => group === "all" || d.group === group);
  const filters: { id: DemoGroup | "all"; label: string }[] = [{ id: "all", label: "All" }, ...demoGroups];

  return (
    <section id="demos" className="border-b border-line bg-paper py-8 md:py-12">
      <Container>
        <SectionHeading title="All fourteen demo sites">
          Each is a complete website with its own identity. Open one and click through it.
        </SectionHeading>

        <div role="group" aria-label="Filter demos by kind of business" className="mt-4 flex flex-wrap gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={group === f.id}
              onClick={() => setGroup(f.id)}
              className={`h-6 rounded-md border px-2 text-sm transition-colors ${
                group === f.id ? "border-ink bg-ink font-semibold text-paper" : "border-line hover:border-ink/60 hover:bg-ink/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mt-2 text-sm text-ink-soft">Showing {shown.length} of {studioDemos.length}</p>

        <ul className="mt-2 divide-y divide-line border-y border-line">
          {shown.map((d, n) => (
            <li key={d.slug}>
              <Link
                href={`/demos/${d.slug}`}
                className="group grid grid-cols-1 gap-1 px-1 py-1 transition-colors hover:bg-ink/5 md:grid-cols-12 md:items-center md:gap-4"
              >
                <div className="flex gap-2 md:col-span-4">
                  <span aria-hidden className="w-3 shrink-0 font-display text-sm font-bold tabular-nums text-brass-deep">{String(n + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-lg font-bold">{d.name}</p>
                    <p className="text-sm text-ink-soft">{d.industry}</p>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-soft">{d.summary}</p>
                  <p className="mt-1 text-sm text-ink-soft">{d.highlights.join(", ")}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold md:col-span-1 md:justify-end">
                  Open
                  <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
