"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck } from "lucide-react";

const links = [
  { href: "/demos/realestate/listings", label: "Listings" },
  { href: "/demos/realestate#sell", label: "Selling" },
  { href: "/demos/realestate#sell", label: "Sell with us" },
];

/**
 * Two-row header — a short service strip stacked above the main
 * nav row, both always visible. For a five/six-figure decision, leading
 * with "licensed" before the logo even loads is doing real work, not
 * decoration. Structurally distinct from a single-row sticky bar: two
 * stacked rows rather than one bar hiding everything behind a hamburger.
 */
export function RealEstateNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 font-estate-body text-realestate-navy">
      <div className="flex items-center justify-center gap-1 bg-realestate-navy py-1 text-center text-xs text-white/85">
        <ShieldCheck size={12} /> Sales &amp; rentals · Sydney
      </div>
      <div className="border-b border-realestate-line bg-realestate-bg">
        <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:px-4">
          <Link href="/demos/realestate" className="inline-block py-2 font-estate-display text-lg tracking-tight">
            Halyard Property
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-realestate-slate transition-colors hover:text-realestate-navy"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/demos/realestate/listings"
            className="hidden rounded-full bg-realestate-navy px-3 py-1 text-sm font-medium text-white hover:bg-black md:inline-flex md:items-center"
          >
            View listings
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 items-center justify-center md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-realestate-line px-3 pb-3 md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-realestate-line py-3 text-sm"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/demos/realestate/listings"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex rounded-full bg-realestate-navy px-3 py-2 text-sm font-medium text-white"
            >
              View listings
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
