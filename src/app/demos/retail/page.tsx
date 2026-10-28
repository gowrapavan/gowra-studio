import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight, RotateCcw, Store, Truck } from "lucide-react";
import { retail } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { DemoFooter } from "@/components/DemoFooter";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { products, formatUSD } from "@/config/retail-products";
import { QuickAddButton } from "./QuickAddButton";

export const metadata: Metadata = withSocial({
  title: "Fielding & Rye — Retail demo",
  description: "A demo retail website: category navigation, a shoppable product grid, editorial merchandising and a working cart.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const tiles = [["Outerwear", retail.jacket], ["Footwear", retail.boots], ["Bags", retail.pack], ["Knitwear", retail.knit], ["Accessories", retail.belt]] as const;
const firstSize = (p: (typeof products)[number]) => p.sizes.find((s) => !p.lowStock?.includes(s)) ?? p.sizes[0];

export default function RetailDemo() {
  return (
    <div id="top">
      <p className="bg-retail-ink px-3 py-2 text-center text-xs uppercase tracking-wide text-retail-bg">Free shipping over $150 · 30-day returns</p>
      <main id="main">
        {/* 1 — Hero: the season's lead story plus two category entries */}
        <section aria-label="The autumn edit" className="pt-3 md:pt-4">
          <div className={`${wrap} grid grid-cols-1 gap-3 lg:grid-cols-12 md:gap-4`}>
            <Link href="/demos/retail/shop" className="zoom group relative block lg:col-span-8 lg:h-full">
              <Frame ratio="4 / 3" mobileRatio="1 / 1" className="lg:h-full lg:!aspect-auto"><Photo photo={retail.hero} grade="retail" priority sizes="(min-width: 1024px) 65vw, 100vw" /></Frame>
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-white md:p-8">
                <span className="text-xs font-bold uppercase tracking-ultra">The autumn edit</span>
                <h1 className="fade-up mt-3 max-w-measure font-retail-display text-4xl font-bold leading-none md:text-5xl">Fewer things, chosen carefully.</h1>
                <span className="mt-4 inline-flex h-8 items-center gap-2 bg-white px-4 text-sm font-bold uppercase tracking-wide text-retail-ink group-hover:bg-retail-accent group-hover:text-white">Shop the edit <ArrowUpRight size={18} aria-hidden /></span>
              </span>
            </Link>
            <div className="hidden lg:col-span-4 lg:grid lg:grid-cols-1 lg:gap-4">
              {[["Outerwear", retail.jacket], ["Footwear", retail.boots]].map(([n, p]) => (
                <Link key={n as string} href={`/demos/retail/shop?category=${n}`} className="zoom group relative block">
                  <Frame ratio="1 / 1" mobileRatio="1 / 1"><Photo photo={p as typeof retail.jacket} grade="retail" sizes="(min-width: 1024px) 30vw, 50vw" /></Frame>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white"><span className="font-retail-display text-2xl font-bold">{n as string}</span><span className="mt-1 flex items-center gap-1 text-xs font-bold uppercase tracking-wide">Shop <ArrowUpRight size={14} aria-hidden /></span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 2 — Shop by category */}
        <section aria-labelledby="cat-h" className="py-8 md:py-16">
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-3"><h2 id="cat-h" className="font-retail-display text-3xl font-bold md:text-4xl">Shop by category</h2><Link href="/demos/retail/shop" className="inline-flex items-center gap-1 border-b-2 border-retail-ink py-2 text-sm font-bold uppercase tracking-wide hover:border-retail-accent hover:text-retail-accent">All products <ArrowUpRight size={16} aria-hidden /></Link></div>
            <ul className="-mx-3 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-3 pb-2 md:mx-0 md:mt-8 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5">
              {tiles.map(([n, p]) => (
                <li key={n} className="w-2/5 shrink-0 snap-start md:w-auto md:shrink"><Link href={`/demos/retail/shop?category=${n}`} className="zoom group block"><Frame ratio="4 / 5"><Photo photo={p} grade="retail" sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw" /></Frame><span className="mt-2 flex items-center justify-between gap-1 font-retail-display text-base font-bold group-hover:text-retail-accent md:text-lg">{n}<ArrowUpRight size={18} aria-hidden /></span></Link></li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 — New arrivals */}
        <section id="new-arrivals" aria-labelledby="new-h" className="bg-retail-panel py-12 md:py-16">
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-3"><h2 id="new-h" className="font-retail-display text-3xl font-bold md:text-4xl">New arrivals</h2><Link href="/demos/retail/shop" className="inline-flex items-center gap-1 border-b-2 border-retail-ink py-2 text-sm font-bold uppercase tracking-wide hover:border-retail-accent hover:text-retail-accent">View all <ArrowUpRight size={16} aria-hidden /></Link></div>
            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4 md:gap-x-4">
              {products.map((p) => (
                <article key={p.slug}>
                  <Link href={`/demos/retail/shop/${p.slug}`} className="zoom block"><Frame ratio="4 / 5"><Photo photo={p.gallery[0]} grade="retail" sizes="(min-width: 1024px) 22vw, 48vw" /></Frame></Link>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div className="min-w-0"><Link href={`/demos/retail/shop/${p.slug}`} className="inline-flex min-h-6 items-center font-semibold hover:text-retail-accent">{p.name}</Link><p className="text-sm text-retail-ink/60">{p.category}</p></div>
                    <p className="shrink-0 font-bold">{formatUSD(p.price)}</p>
                  </div>
                  <div className="mt-3"><QuickAddButton slug={p.slug} defaultSize={firstSize(p)} /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — Feature banner */}
        <section aria-labelledby="feat-h" className="grid grid-cols-1 lg:grid-cols-2">
          <div className="order-2 flex items-center bg-retail-ink p-4 text-retail-bg md:p-12 lg:order-1">
            <div className="max-w-measure-narrow">
              <p className="text-xs font-bold uppercase tracking-ultra text-retail-accent">New in</p>
              <h2 id="feat-h" className="mt-3 font-retail-display text-4xl font-bold leading-tight md:text-4xl">Layers you will reach for every day.</h2>
              <p className="mt-6 text-retail-bg/75">Knitwear, outerwear and everyday carry, chosen to work together and to last. Start with one good piece and build from there.</p>
              <Link href="/demos/retail/shop" className="mt-8 inline-flex items-center gap-2 bg-retail-bg px-6 py-2 text-sm font-bold uppercase tracking-wide text-retail-ink hover:bg-white">Shop new in <ArrowUpRight size={18} aria-hidden /></Link>
            </div>
          </div>
          <div className="order-1 lg:order-2"><Frame ratio="4 / 5" mobileRatio="4 / 3" className="lg:h-full lg:!aspect-auto"><Photo photo={retail.model} grade="retail" sizes="(min-width: 1024px) 50vw, 100vw" /></Frame></div>
        </section>

        {/* 5 — Service promises */}
        <section aria-label="Shopping with us" className="border-b border-retail-line">
          <ul className={`${wrap} grid grid-cols-1 divide-y divide-retail-line md:grid-cols-3 md:divide-x md:divide-y-0`}>
            {[[Truck, "Free shipping over $150", "On every order that clears the threshold."], [RotateCcw, "30-day returns", "Changed your mind? Send it back within thirty days."], [Store, "Visit the studio floor", "Try things on and see how they are made."]].map(([I, t, b]) => {
              const Icon = I as typeof Truck;
              return (<li key={t as string} className="flex items-start gap-3 py-6 md:px-6 md:first:pl-0 md:last:pr-0"><Icon size={28} aria-hidden className="mt-1 shrink-0 text-retail-accent" /><div><h3 className="font-retail-display text-lg font-bold">{t as string}</h3><p className="mt-1 text-sm text-retail-ink/65">{b as string}</p></div></li>);
            })}
          </ul>
        </section>

        {/* 6 — In store */}
        <section id="about" aria-labelledby="store-h" className="py-12 md:py-16">
          <div className={`${wrap} grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-7"><Frame ratio="3 / 2"><Photo photo={retail.studioFloor} grade="retail" sizes="(min-width: 1024px) 55vw, 100vw" /></Frame></div>
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-ultra text-retail-accent">About Fielding &amp; Rye</p>
              <h2 id="store-h" className="mt-3 font-retail-display text-3xl font-bold leading-tight md:text-4xl">A short list, kept short on purpose.</h2>
              <p className="mt-6 text-retail-ink/75">We stock outerwear, footwear and everyday carry — and not much else. Every piece is chosen to be worn hard, repaired rather than replaced, and still look right in ten years.</p>
              <Link href="/demos/retail/shop" className="mt-8 inline-flex items-center gap-2 border-b-2 border-retail-ink py-2 text-sm font-bold uppercase tracking-wide hover:border-retail-accent hover:text-retail-accent">Shop the collection <ArrowUpRight size={16} aria-hidden /></Link>
            </div>
          </div>
        </section>

        {/* 7 — Newsletter */}
        <section className="bg-retail-ink py-12 text-retail-bg md:py-16">
          <div className={`${wrap} text-center`}><h2 className="font-retail-display text-3xl font-bold md:text-4xl">Get new arrivals first</h2><p className="mt-3 text-retail-bg/70">Occasional emails when something new lands. Nothing else.</p>
            <DemoForm className="mx-auto mt-8 flex max-w-measure-narrow flex-col gap-2 sm:flex-row" noteClassName="text-sm sm:basis-full">
              <label htmlFor="retail-email" className="sr-only">Email address</label>
              <input id="retail-email" type="email" required placeholder="you@email.com" className="w-full rounded-full border border-white/30 bg-transparent px-4 py-4 text-sm placeholder:text-retail-bg/50" />
              <button className="shrink-0 rounded-full bg-retail-bg px-6 py-2 text-sm font-semibold text-retail-ink hover:bg-white">Subscribe</button>
            </DemoForm></div>
        </section>
      </main>

      <DemoFooter variant="wordmark" brand="Fielding & Rye" blurb="Outerwear, footwear and everyday carry, made to last."
        columns={[{ title: "Shop", links: [{ label: "All products", href: "/demos/retail/shop" }, { label: "New in", href: "/demos/retail#top" }] }, { title: "Help", links: [{ label: "Free shipping over $150", href: "/demos/retail/shop" }, { label: "30-day returns", href: "/demos/retail/shop" }] }]}
        theme={{ root: "bg-retail-bg text-retail-ink", muted: "text-retail-ink/60", line: "border-retail-line", hover: "hover:text-retail-accent", display: "font-retail-display font-bold" }} />
      <BackToStudioCTA theme="bg-retail-panel text-retail-ink border-retail-line font-retail-body" accentClass="bg-retail-ink text-retail-bg hover:bg-black" />
    </div>
  );
}
