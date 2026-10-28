"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/salon#craft", label: "The work" },
  { href: "/demos/salon/services", label: "Services" },
  { href: "/demos/salon#studio", label: "The studio" },
  { href: "/demos/salon#book", label: "Book" },
];

export function SalonNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop vertical rail */}
      <header className="fixed inset-y-0 left-0 z-50 hidden w-8 flex-col items-center justify-between border-r border-maison-ink/10 bg-maison-alt py-4 md:flex">
        <a
          href="/demos/salon"
          className="font-salon-display text-base italic [writing-mode:vertical-rl]"
        >
          Maison Form
        </a>
        <nav className="flex flex-col items-center gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-label={l.label}
              className="zoom group relative flex h-1 w-1 items-center justify-center"
            >
              <span className="h-1 w-1 rounded-full bg-maison-ink/25 transition-colors group-hover:bg-maison-blush" />
              <span className="pointer-events-none absolute left-3 whitespace-nowrap bg-maison-alt pr-1 font-salon-body text-xs uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100">
                {l.label}
              </span>
            </a>
          ))}
        </nav>
        <a
          href="/demos/salon#book"
          className="font-salon-body text-xs uppercase tracking-widest [writing-mode:vertical-rl]"
        >
          Book
        </a>
      </header>

      {/*
        Mobile bar and its dropdown share one sticky container, so the
        panel can't drift out of alignment with the bar above it.
      */}
      <div className="sticky top-0 z-50 textured bg-maison-alt md:hidden">
        <header className="flex items-center justify-between border-b border-maison-ink/10 px-3 py-2">
          <a href="/demos/salon" className="inline-block py-2 font-salon-display text-lg italic">
            Maison Form
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-6 w-6 items-center justify-center"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>
        {open && (
          <div className="border-b border-maison-ink/10 px-3 pb-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-maison-ink/10 py-2 font-salon-body text-sm uppercase tracking-widest last:border-b-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
