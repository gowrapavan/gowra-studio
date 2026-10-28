"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const leftLinks = [
  { href: "/demos/wedding/weddings", label: "Celebrations" },
  { href: "/demos/wedding#approach", label: "Approach" },
];
const rightLinks = [
  { href: "/demos/wedding/packages", label: "Planning" },
  { href: "/demos/wedding#enquire", label: "Enquire" },
];

/**
 * Centred-wordmark masthead. On the homepage it sits transparent over the
 * hero photograph and turns ivory once the page scrolls; on inner pages it
 * is ivory from the start. Links are small, widely tracked capitals, the way
 * a fashion or hospitality house sets them.
 */
export function WeddingNav() {
  const home = usePathname() === "/demos/wedding";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const clear = home && !scrolled && !open;
  const link = `inline-flex h-6 items-center text-xs uppercase tracking-wider ${clear ? "text-white/90 hover:text-white" : "text-wedding-ink/75 hover:text-wedding-accent"}`;

  return (
    <header
      className={`${home ? "fixed inset-x-0" : "sticky"} top-0 z-50 font-wedding-body transition-colors duration-300 ${
        clear ? "bg-transparent text-white" : "border-b border-wedding-line bg-wedding-bg text-wedding-ink"
      }`}
    >
      <div className="relative mx-auto grid h-8 max-w-page grid-cols-split-center items-center px-3 md:h-12 md:px-4">
        <nav aria-label="Left" className="hidden items-center gap-3 justify-self-start md:flex">
          {leftLinks.map((l) => <Link key={l.href} href={l.href} className={link}>{l.label}</Link>)}
        </nav>

        <Link href="/demos/wedding" className="col-start-2 inline-flex h-6 items-center justify-self-center font-wedding text-xl uppercase tracking-wider md:text-2xl">
          Linden &amp; Rose
        </Link>

        <nav aria-label="Right" className="hidden items-center gap-3 justify-self-end md:flex">
          {rightLinks.map((l) => <Link key={l.href} href={l.href} className={link}>{l.label}</Link>)}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="wedding-menu"
          onClick={() => setOpen((v) => !v)}
          className="absolute right-3 flex h-6 w-6 items-center justify-center md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="wedding-menu" aria-label="Main" className="border-t border-wedding-line bg-wedding-bg px-3 pb-3 text-center text-wedding-ink md:hidden">
          {[...leftLinks, ...rightLinks].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex h-8 items-center justify-center border-b border-wedding-line text-sm uppercase tracking-wider">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
