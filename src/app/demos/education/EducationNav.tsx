"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { levels, schools, levelAnchor, programmes } from "./data";

const links = [
  { href: "/demos/education#schools", label: "Schools" },
  { href: "/demos/education#dates", label: "Key dates" },
  { href: "/demos/education#staff", label: "Teaching staff" },
  { href: "/demos/education#admissions", label: "Admissions" },
];
const audiences = ["Prospective students", "Current students", "Staff", "Alumni"];

/**
 * University masthead: an audience strip, then the main bar with a "Study"
 * panel that opens the three levels and the three schools. The monogram is
 * a plain square so it reads as an institution mark, not a logo trend.
 */
export function EducationNav() {
  const [menu, setMenu] = useState<"study" | "mobile" | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const close = () => setMenu(null);

  return (
    <header className="sticky top-0 z-50 font-edu-body text-education-ink">
      <div className="hidden bg-education-ink text-xs text-white/80 md:block">
        <div className="mx-auto flex max-w-page items-center justify-between px-4 py-1">
          <ul className="flex gap-3">
            {audiences.map((a) => <li key={a}>{a}</li>)}
          </ul>
          <Link href="/demos/education#dates" className="hover:text-white">Open day in November</Link>
        </div>
      </div>

      <div className="border-b border-education-line bg-education-bg">
        <div className="mx-auto flex h-8 max-w-page items-center justify-between gap-2 px-3 md:h-12 md:px-4">
          <Link href="/demos/education" onClick={close} className="flex items-center gap-2">
            <span aria-hidden className="flex h-6 w-6 items-center justify-center bg-education-ink font-edu-display text-xl font-semibold text-education-accent">C</span>
            <span className="font-edu-display text-xl font-semibold leading-none">Cobalt University</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <button
              type="button"
              aria-expanded={menu === "study"}
              aria-controls="study-panel"
              onClick={() => setMenu(menu === "study" ? null : "study")}
              className="inline-flex h-6 items-center gap-1 px-2 text-sm font-semibold hover:text-education-accent"
            >
              Study <ChevronDown size={16} aria-hidden className={menu === "study" ? "rotate-180" : ""} />
            </button>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={close} className="inline-flex h-6 items-center px-2 text-sm font-semibold hover:text-education-accent">{l.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link href="/demos/education#admissions" onClick={close} className="hidden h-6 items-center bg-education-accent px-3 text-sm font-semibold text-white hover:brightness-95 sm:inline-flex">Apply</Link>
            <button
              type="button"
              aria-label={menu === "mobile" ? "Close menu" : "Open menu"}
              aria-expanded={menu === "mobile"}
              aria-controls="edu-mobile"
              onClick={() => setMenu(menu === "mobile" ? null : "mobile")}
              className="flex h-6 w-6 items-center justify-center lg:hidden"
            >
              {menu === "mobile" ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {menu === "study" && (
        <div id="study-panel" className="hidden border-b border-education-line bg-education-bg shadow-e2 lg:block">
          <div className="mx-auto grid max-w-page grid-cols-12 gap-4 px-4 py-4">
            <div className="col-span-4">
              <p className="text-sm font-semibold text-education-accent">By level</p>
              <ul className="mt-1">
                {levels.map((l) => <li key={l.id}><Link href={`/demos/education/programs#${levelAnchor(l.id)}`} onClick={close} className="flex h-6 items-center hover:text-education-accent">{l.plural}</Link></li>)}
              </ul>
            </div>
            <div className="col-span-5">
              <p className="text-sm font-semibold text-education-accent">By school</p>
              <ul className="mt-1">
                {schools.map((s) => <li key={s.id}><Link href="/demos/education#schools" onClick={close} className="flex h-6 items-center hover:text-education-accent">{s.name}</Link></li>)}
              </ul>
            </div>
            <div className="col-span-3 border-l border-education-line pl-4">
              <p className="font-edu-display text-lg font-semibold">Not sure yet?</p>
              <p className="mt-1 text-sm text-education-ink/70">Search all {programmes.length} programmes by subject and level.</p>
              <Link href="/demos/education#finder" onClick={close} className="mt-2 inline-flex h-6 items-center bg-education-ink px-3 text-sm font-semibold text-white hover:bg-education-accent">Find a programme</Link>
            </div>
          </div>
        </div>
      )}

      {menu === "mobile" && (
        <nav id="edu-mobile" aria-label="Main" className="max-h-screen overflow-y-auto border-b border-education-line bg-education-bg px-3 pb-3 lg:hidden">
          <p className="pt-2 text-sm font-semibold text-education-accent">Study</p>
          {levels.map((l) => <Link key={l.id} href={`/demos/education/programs#${levelAnchor(l.id)}`} onClick={close} className="flex h-8 items-center border-b border-education-line">{l.plural}</Link>)}
          <Link href="/demos/education#finder" onClick={close} className="flex h-8 items-center border-b border-education-line">Find a programme</Link>
          <p className="pt-3 text-sm font-semibold text-education-accent">University</p>
          {links.map((l) => <Link key={l.href} href={l.href} onClick={close} className="flex h-8 items-center border-b border-education-line">{l.label}</Link>)}
          <Link href="/demos/education#admissions" onClick={close} className="mt-3 flex h-8 items-center justify-center bg-education-accent font-semibold text-white">Apply</Link>
        </nav>
      )}
    </header>
  );
}
