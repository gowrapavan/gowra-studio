"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/fitness#programs", label: "Programs" },
  { href: "/demos/fitness/schedule", label: "Schedule" },
  { href: "/demos/fitness#trainers", label: "Trainers" },
  { href: "/demos/fitness#membership", label: "Membership" },
];

/**
 * Icon-trigger nav — the bar itself shows only the wordmark and a single
 * toggle, on desktop as well as mobile. There is no inline link list and
 * no CTA pill sitting in the header at any screen size; everything lives
 * behind one full-screen slide-in panel. The only nav in the studio where
 * "open menu" is the only interactive element in the bar, full stop.
 */
export function FitnessNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-fitness-line bg-fitness-bg font-fitness-body text-fitness-ink">
        <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:px-4">
          <Link href="/demos/fitness" className="inline-block py-2 font-fitness-display text-lg uppercase tracking-wide">
            Vantage
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 items-center gap-2 border-2 border-fitness-accent px-3 text-xs font-medium uppercase tracking-wide text-fitness-accent hover:bg-fitness-accent hover:text-fitness-bg"
          >
            {open ? <X size={16} /> : <Menu size={16} />} Menu
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center bg-fitness-bg px-6 py-16">
          <nav className="flex flex-col gap-1">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="zoom group flex items-baseline gap-4 border-b border-fitness-line py-4"
              >
                <span className="text-sm text-fitness-accent">0{i + 1}</span>
                <span className="font-fitness-display text-3xl uppercase tracking-wide text-fitness-ink group-hover:text-fitness-accent md:text-5xl">
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>
          <Link
            href="#trial"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex w-fit border-2 border-fitness-accent px-4 py-2 text-sm font-medium uppercase tracking-wide text-fitness-accent hover:bg-fitness-accent hover:text-fitness-bg"
          >
            Book a free trial
          </Link>
        </div>
      )}
    </>
  );
}
