"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/construction/projects", label: "Work" },
  { href: "/demos/construction#process", label: "Process" },
  { href: "/demos/construction#services", label: "Services" },
];

/**
 * Solid header in the studio's dark ink, sticky, with the one action that
 * matters (send a brief). The earlier version floated over the hero photo
 * with a blend mode, which made the links unreadable on a bright image.
 */
export function ConstructionNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-construction-bg/20 bg-construction-ink font-construction-body text-construction-bg">
      <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:px-4">
        <Link href="/demos/construction" className="inline-flex h-6 items-center font-construction-display text-lg uppercase tracking-wide">
          Marrow &amp; Stone
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-3 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex h-6 items-center text-sm uppercase tracking-wide text-construction-bg/80 hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link href="/demos/construction#brief" className="hidden h-6 items-center bg-construction-accent px-3 text-sm font-semibold uppercase tracking-wide text-white hover:brightness-95 sm:inline-flex">
            Send a brief
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="construction-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 items-center justify-center md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="construction-menu" aria-label="Main" className="border-t border-construction-bg/20 bg-construction-ink px-3 pb-3 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex h-8 items-center border-b border-construction-bg/20 text-sm uppercase tracking-wide">
              {l.label}
            </Link>
          ))}
          <Link href="/demos/construction#brief" onClick={() => setOpen(false)} className="mt-2 flex h-8 items-center justify-center bg-construction-accent text-sm font-semibold uppercase tracking-wide text-white">
            Send a project brief
          </Link>
        </nav>
      )}
    </header>
  );
}
