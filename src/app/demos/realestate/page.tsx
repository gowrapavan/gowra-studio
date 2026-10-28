import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { Search, BedDouble, Bath, Car, MapPin } from "lucide-react";
import { realestate } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { DemoFooter } from "@/components/DemoFooter";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { listings, suburbs, types, formatAUD } from "@/config/realestate-listings";

export const metadata: Metadata = withSocial({
  title: "Halyard Property — Real estate demo",
  description: "A demo real-estate website: property search, featured listings, suburb guides and an appraisal request.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const sel = "w-full bg-transparent py-3 text-base text-realestate-navy outline-none";

export default function RealEstateDemo() {
  return (
    <div id="top">
      <main id="main">
        {/* ARCHITECTURE — a two-pane search app, not a brochure. A sticky
            filter column on the left (the search form works with no
            JavaScript) and every listing as a comparable row on the right. */}
        <div className={`${wrap} grid grid-cols-1 gap-6 py-6 lg:grid-cols-12 md:gap-8 md:py-8`}>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <p className="text-xs font-semibold uppercase tracking-ultra text-realestate-gold">Sydney · sales &amp; rentals</p>
              <h1 className="fade-up mt-2 font-estate-display text-2xl leading-tight md:text-3xl">Find the right place, with the facts in front of you.</h1>
              <form action="/demos/realestate/listings" method="get" className="mt-6 border border-realestate-line bg-realestate-panel p-3">
                <label className="block text-xs font-semibold uppercase tracking-wide text-realestate-slate">Suburb<select name="suburb" defaultValue="" className={`${sel} border-b border-realestate-line`}><option value="">Any suburb</option>{suburbs.map((s) => <option key={s} value={s}>{s}</option>)}</select></label>
                <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-realestate-slate">Property type<select name="type" defaultValue="" className={`${sel} border-b border-realestate-line`}><option value="">Any type</option>{types.map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
                <button className="mt-4 flex w-full items-center justify-center gap-2 bg-realestate-navy px-4 py-4 text-sm font-semibold text-white hover:bg-black"><Search size={18} aria-hidden /> Search {listings.length} properties</button>
              </form>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-realestate-slate">Browse by suburb</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {suburbs.map((s) => (<li key={s}><Link href={`/demos/realestate/listings?suburb=${encodeURIComponent(s)}`} className="inline-block border border-realestate-line px-3 py-2 text-sm hover:border-realestate-gold hover:text-realestate-gold">{s}</Link></li>))}
              </ul>
              <div className="mt-6 hidden lg:block"><Frame ratio="16 / 9"><Photo photo={realestate.hero} grade="realestate" priority sizes="30vw" position="center 55%" /></Frame></div>
            </div>
          </aside>

          <section aria-labelledby="results-h" className="min-w-0 lg:col-span-8">
            <div className="flex items-end justify-between gap-3 border-b-2 border-realestate-navy pb-2">
              <h2 id="results-h" className="font-estate-display text-2xl">Current listings</h2>
              <Link href="/demos/realestate/listings" className="py-2 text-sm font-semibold text-realestate-gold hover:text-realestate-navy">Filters &amp; map view</Link>
            </div>
            <ul className="divide-y divide-realestate-line">
              {listings.map((l) => (
                <li key={l.slug}>
                  <Link href={`/demos/realestate/listings/${l.slug}`} className="zoom group grid grid-cols-5 items-start gap-3 py-4 hover:bg-realestate-panel md:grid-cols-12 md:gap-4">
                    <div className="col-span-2 md:col-span-4"><Frame ratio="4 / 3"><Photo photo={l.gallery[0]} grade="realestate" sizes="(min-width: 1024px) 18vw, 40vw" /></Frame></div>
                    <div className="col-span-3 min-w-0 md:col-span-8">
                      <p className="flex flex-wrap items-baseline justify-between gap-x-3"><span className="font-estate-display text-xl md:text-2xl">{formatAUD(l)}</span><span className="text-xs font-semibold uppercase tracking-wide text-realestate-gold">{l.purpose}</span></p>
                      <p className="mt-1 flex items-center gap-1 font-semibold group-hover:text-realestate-gold"><MapPin size={16} aria-hidden className="shrink-0" /><span className="min-w-0 md:truncate">{l.address}, {l.suburb}</span></p>
                      <p className="text-sm text-realestate-slate">{l.type}</p>
                      <p className="mt-2 flex gap-4 text-sm"><span className="flex items-center gap-1"><BedDouble size={16} aria-hidden />{l.beds}<span className="sr-only"> bedrooms</span></span><span className="flex items-center gap-1"><Bath size={16} aria-hidden />{l.baths}<span className="sr-only"> bathrooms</span></span><span className="flex items-center gap-1"><Car size={16} aria-hidden />{l.parking}<span className="sr-only"> parking spaces</span></span></p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section id="sell" className="border-t border-realestate-line bg-realestate-panel py-8 md:py-12">
          <div className={`${wrap} grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center`}>
            <div className="lg:col-span-4"><Frame ratio="3 / 2"><Photo photo={realestate.streetView} grade="realestate" sizes="(min-width: 1024px) 30vw, 100vw" /></Frame></div>
            <div className="lg:col-span-4"><h2 className="font-estate-display text-2xl md:text-3xl">Thinking of selling?</h2><p className="mt-2 text-realestate-slate">Ask for a written appraisal with the comparable sales behind it, so you can see how the number was reached.</p></div>
            <DemoForm className="grid gap-3 lg:col-span-4" noteClassName="text-sm text-realestate-slate">
              <label className="text-xs font-semibold uppercase tracking-wide text-realestate-slate">Property address<input required name="address" className="mt-1 w-full border border-realestate-line bg-white px-3 py-2 text-base normal-case text-realestate-navy" /></label>
              <label className="text-xs font-semibold uppercase tracking-wide text-realestate-slate">Email<input required type="email" name="email" className="mt-1 w-full border border-realestate-line bg-white px-3 py-2 text-base normal-case text-realestate-navy" /></label>
              <button className="bg-realestate-navy px-4 py-4 text-sm font-semibold text-white hover:bg-black">Request appraisal</button>
            </DemoForm>
          </div>
        </section>
        <section aria-labelledby="help-h" className="border-t border-realestate-line bg-realestate-panel py-12 md:py-16">
          <div className={wrap}>
            <p className="text-xs font-semibold uppercase tracking-ultra text-realestate-gold">How we can help</p>
            <h2 id="help-h" className="mt-3 font-estate-display text-2xl md:text-3xl">Buying, selling or renting</h2>
            <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[["Buying", "Search current listings, request a viewing from any listing page, and ask for comparable sales before you make an offer."], ["Selling", "Request a written appraisal with the comparable sales behind it, so you can see how the number was reached."], ["Renting", "Filter rentals by suburb and type, then enquire directly from the listing."]].map(([t, b], i) => (
                <li key={t} className="border-t-2 border-realestate-navy pt-4"><span className="font-estate-display text-3xl text-realestate-gold" aria-hidden>0{i + 1}</span><h3 className="mt-2 font-estate-display text-xl">{t}</h3><p className="mt-2 text-realestate-slate">{b}</p></li>
              ))}
            </ul>
          </div>
        </section>
        <FaqList eyebrow="Questions" title="Common questions" items={[["How do I arrange a viewing?","Open any listing and use its enquiry form. We reply to confirm a time."],["Is requesting an appraisal binding?","No. An appraisal is simply the first step and carries no obligation."],["Can I search by suburb?","Yes. Use the suburb filter beside the listings, or browse the suburb chips."]] as const} cls={{ section: "border-t border-realestate-line py-12 md:py-16", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-realestate-gold", h2: "mt-3 font-estate-display text-2xl md:text-3xl", line: "divide-y divide-realestate-line border-realestate-line border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-realestate-slate", plus: "text-2xl text-realestate-gold" }} />
      </main>

      <DemoFooter variant="columns" brand="Halyard Property" blurb="Sales and rentals across Sydney, with the facts up front."
        columns={[{ title: "Search", links: [{ label: "All listings", href: "/demos/realestate/listings" }, { label: "By suburb", href: "/demos/realestate#top" }] }, { title: "Sell", links: [{ label: "Request an appraisal", href: "/demos/realestate#sell" }] }]}
        theme={{ root: "bg-realestate-bg text-realestate-navy", muted: "text-realestate-slate", line: "border-realestate-line", hover: "hover:text-realestate-gold", display: "font-estate-display" }} />
      <BackToStudioCTA theme="bg-realestate-navy text-white border-white/10 font-estate-body" accentClass="bg-white text-realestate-navy hover:bg-white/90" />
    </div>
  );
}
