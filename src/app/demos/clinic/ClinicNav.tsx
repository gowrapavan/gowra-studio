"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/clinic/treatments", label: "Services" },
  { href: "/demos/clinic#doctor", label: "Our dentist" },
  { href: "/demos/clinic#visit", label: "Visit us" },
];

/**
 * Two-row header — a slim trust strip stacked above the main nav row,
 * both permanently visible rather than one bar that hides everything else
 * behind a hamburger. A dental practice's two most-asked questions
 * ("are you open, are you taking patients") get answered before anyone
 * even reaches the nav links. Structurally distinct from the single-row
 * sticky bars used elsewhere: two stacked bars, not one.
 */
export function ClinicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 font-clinic-body text-clinic-ink">
      <div className="flex items-center justify-center gap-2 bg-clinic-ink py-1 text-center text-xs text-white/85">
        <span>Accepting new patients · Mon–Sat</span>
        <span className="hidden sm:inline">Portland, Oregon</span>
      </div>
      <div className="border-b border-clinic-line bg-clinic-bg">
        <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:px-4">
          <Link href="/demos/clinic" className="inline-block py-2 font-clinic-display text-lg">
            Willowmere Dental
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-block py-2 text-sm text-clinic-ink/70 hover:text-clinic-ink">
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#book"
            className="hidden rounded-2xl bg-clinic-accent px-3 py-1 text-sm font-medium text-white hover:brightness-95 md:inline-flex md:items-center"
          >
            Book an appointment
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
          <div className="border-t border-clinic-line px-3 pb-3 md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-clinic-line py-3 text-sm"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex rounded-2xl bg-clinic-accent px-3 py-2 text-sm font-medium text-white"
            >
              Book an appointment
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
