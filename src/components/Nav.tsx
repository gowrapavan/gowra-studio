"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container, buttonClass } from "./ui";
import { siteConfig } from "@/config/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#demos", label: "Demos" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock the page behind the open menu and let Escape close it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <Container className="flex h-8 items-center justify-between">
        <Link href="/" className="inline-block py-2 font-display text-lg tracking-tight">
          {siteConfig.companyName}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-2 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex h-6 items-center rounded-md px-1 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className={`${buttonClass.solid} hidden lg:inline-flex`}>
          Get a free demo
          <ArrowUpRight size={16} aria-hidden />
        </Link>

        <div className="flex items-center gap-1 lg:hidden">
          <Link href="/#contact" className={`${buttonClass.solid} px-2`}>
            Free demo
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-ink/10"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-8 overflow-y-auto border-t border-line bg-paper lg:hidden">
          <Container className="flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-display text-lg text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className={`${buttonClass.primary} mt-3`}
            >
              Get a free demo
              <ArrowUpRight size={16} />
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
