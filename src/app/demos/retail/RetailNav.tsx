"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

const links = [
  { href: "/demos/retail/shop", label: "Shop all" },
  { href: "/demos/retail#new-arrivals", label: "New arrivals" },
  { href: "/demos/retail#about", label: "About" },
];

/**
 * A plain top bar — retail shoppers expect search/shop/cart in familiar
 * places, so this is deliberately the least experimental nav of the six
 * demos. The distinctiveness here lives in the PLP/PDP/cart behaviour,
 * not the header.
 */
export function RetailNav() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-retail-line bg-retail-bg font-retail-body text-retail-ink">
      <div className="mx-auto flex h-8 max-w-page items-center justify-between px-3 md:px-4">
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-6 w-6 items-center justify-center md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/demos/retail" className="inline-block py-2 font-retail-display text-lg font-bold tracking-tight">
          FIELDING &amp; RYE
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-block py-2 text-sm text-retail-ink/70 transition-colors hover:text-retail-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          onClick={openCart}
          className="relative flex h-6 w-6 items-center justify-center"
        >
          <ShoppingBag size={22} />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-retail-accent text-xs font-medium leading-none text-white">
              {count}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-retail-line px-3 pb-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-retail-line py-3 text-sm uppercase tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
