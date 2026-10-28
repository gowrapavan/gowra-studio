"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/demos/restaurant#fire", label: "Tonight's fire" },
  { href: "/demos/restaurant/menu", label: "Menu" },
  { href: "/demos/restaurant#room", label: "The room" },
  { href: "/demos/restaurant#gallery", label: "Gallery" },
  { href: "/demos/restaurant#visit", label: "Visit" },
];

export function RestaurantNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the full-screen menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/*
        Transparent over the hero, fully opaque once the hero has scrolled
        away — a translucent bar over a dark photo made body copy unreadable
        mid-scroll.
      */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !open
            ? "border-b border-ember-text/10 bg-ember-bg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-3 py-3 md:px-6">
          <a
            href="/demos/restaurant"
            className="inline-block py-2 font-restaurant-display text-lg italic text-ember-text"
          >
            Ember &amp; Olive
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-ember-text/30 text-ember-text"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-ember-bg px-3 py-12 md:px-8">
          <nav className="flex flex-col">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="zoom group flex items-baseline gap-3 border-b border-ember-text/10 py-3"
              >
                <span className="font-restaurant-body text-sm text-ember-wine">
                  0{i + 1}
                </span>
                <span className="font-restaurant-display text-2xl italic text-ember-text transition-colors group-hover:text-ember-brass md:text-3xl">
                  {l.label}
                </span>
              </a>
            ))}
          </nav>
          <p className="mt-6 font-restaurant-body text-sm text-ember-text/50">
            214 Kettle Row, Downtown · Tue–Sun, 5:30pm–11pm
          </p>
        </div>
      )}
    </>
  );
}
