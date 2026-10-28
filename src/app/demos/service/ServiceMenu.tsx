"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Recent work" },
  { href: "#process", label: "Process" },
  { href: "#areas", label: "Areas" },
  { href: "#faq", label: "FAQ" },
];

/** Phone-width menu for the floating nav; the desktop link row is hidden below md. */
export function ServiceMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="service-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-6 w-6 items-center justify-center rounded-md text-white hover:bg-white/10"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <nav id="service-menu" aria-label="Sections" className="absolute inset-x-0 top-full border-t border-white/10 bg-northline-navy px-3 pb-2 shadow-e2 md:px-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex h-8 items-center border-b border-white/10 text-sm font-medium text-white last:border-0">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
