"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/photography/portfolio", label: "Portfolio" },
  { href: "/demos/photography#packages", label: "Packages" },
  { href: "/demos/photography#enquire", label: "Enquire" },
];

/**
 * Chromeless nav — no background, no border, no CTA button, ever, and it
 * doesn't stick: it sits absolutely over the hero image and then scrolls
 * away with the page like any other element. The portfolio is meant to be
 * the only thing anyone remembers, so nothing here competes for it — not
 * even a persistent header bar.
 */
export function PhotographyNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 font-photo text-photo-ink mix-blend-difference">
      <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:px-4">
        <Link href="/demos/photography" className="inline-block py-2 text-lg italic text-white">
          Rowan &amp; Ash
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-block py-2 text-sm text-white/80 hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-6 w-6 items-center justify-center text-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="bg-photo-bg px-3 pb-3 text-photo-ink md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-photo-line py-3 text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
