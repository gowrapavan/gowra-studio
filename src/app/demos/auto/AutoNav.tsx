"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/auto#inventory", label: "Inventory" },
  { href: "/demos/auto#compare", label: "Compare" },
  { href: "/demos/auto/financing", label: "Financing" },
];

export function AutoNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-auto-line bg-auto-bg font-auto-body text-auto-ink">
      <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:px-4">
        <Link href="/demos/auto" className="inline-block py-2 font-auto-display text-lg uppercase tracking-wide">
          Ridgeline Motors
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-auto-ink/70 hover:text-auto-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#inventory"
          className="hidden rounded-sm bg-auto-accent px-3 py-1 text-sm font-medium text-white hover:brightness-95 md:inline-flex md:items-center"
        >
          View inventory
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
        <div className="border-t border-auto-line px-3 pb-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-auto-line py-3 text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
