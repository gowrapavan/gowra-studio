"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/hotel/rooms", label: "Rooms" },
  { href: "/demos/hotel#house", label: "The house" },
  { href: "/demos/hotel#gallery", label: "Gallery" },
  { href: "/demos/hotel#contact", label: "Contact" },
];

/**
 * Two-row header — a quiet check-in/check-out strip above the main nav,
 * both rows always visible. Different content and tone from the other
 * two-row headers in the studio (Clinic's trust line, Real Estate's
 * licensing line), but the same underlying idea that this vertical's most
 * practical question deserves a permanent line, not a page scroll away.
 */
export function HotelNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-aurelia-ink/10 bg-aurelia-deep py-1 text-center font-hotel-body text-xs uppercase tracking-wider text-white/80">
        Check-in 3pm · Check-out 11am · Front desk staffed 24 hours
      </div>
      <div className="border-b border-aurelia-ink/10 bg-aurelia-bg">
        <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:h-12">
          <a href="/demos/hotel" className="inline-block py-2 whitespace-nowrap font-hotel-display text-lg tracking-wide text-aurelia-ink">
            The Aurelia House
          </a>

          <nav className="hidden gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-hotel-body text-xs uppercase tracking-wider text-aurelia-ink/70 transition-colors hover:text-aurelia-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="/demos/hotel#contact"
            className="hidden rounded-none border border-aurelia-ink/30 px-3 py-1 font-hotel-body text-xs uppercase tracking-wider text-aurelia-ink transition-colors hover:bg-aurelia-ink hover:text-white lg:inline-block"
          >
            Check availability
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-mr-1 flex h-6 w-6 items-center justify-center text-aurelia-ink md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-aurelia-ink/10 bg-aurelia-bg px-3 pb-3 md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-aurelia-ink/10 py-3 font-hotel-body text-sm uppercase tracking-wider text-aurelia-ink/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/demos/hotel#contact"
              onClick={() => setOpen(false)}
              className="mt-3 block bg-aurelia-deep py-2 text-center font-hotel-body text-xs uppercase tracking-wider text-white"
            >
              Check availability
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
