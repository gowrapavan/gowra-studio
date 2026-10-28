"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/travel#journeys", label: "Journeys" },
  { href: "/demos/travel#how", label: "How it works" },
  { href: "/demos/travel/trips", label: "Itineraries" },
  { href: "/demos/travel#enquire", label: "Plan a trip" },
];

/**
 * Full-width travel header.
 * On the homepage it sits over the hero photograph, transparent with white
 * type, and turns solid once the page scrolls (or the mobile menu opens) so
 * it never fights the content beneath it. On inner pages, which open on
 * plain paper, it is solid from the start.
 */
export function TravelNav() {
  const home = usePathname() === "/demos/travel";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const clear = home && !scrolled && !open;

  return (
    <header
      className={`${home ? "fixed inset-x-0" : "sticky"} top-0 z-50 font-travel-body transition-colors duration-200 ${
        clear ? "bg-transparent text-white" : "border-b border-travel-line bg-travel-bg text-travel-ink"
      }`}
    >
      <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:px-4">
        <Link href="/demos/travel" className="inline-flex h-6 items-center font-travel-display text-lg">
          Wayfare &amp; Co
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-3 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`inline-flex h-6 items-center text-sm ${clear ? "text-white/85 hover:text-white" : "text-travel-ink/70 hover:text-travel-ink"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/demos/travel#enquire"
            className="hidden h-6 items-center rounded-full bg-travel-accent px-3 text-sm font-medium text-white hover:brightness-95 md:inline-flex"
          >
            Plan a trip
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="travel-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 items-center justify-center rounded-full md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="travel-menu" aria-label="Main" className="border-t border-travel-line bg-travel-bg px-3 pb-3 text-travel-ink md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex h-8 items-center border-b border-travel-line text-base">
              {l.label}
            </Link>
          ))}
          <Link href="/demos/travel#enquire" onClick={() => setOpen(false)} className="mt-2 flex h-8 items-center justify-center rounded-full bg-travel-accent font-medium text-white">
            Plan a trip
          </Link>
        </nav>
      )}
    </header>
  );
}
