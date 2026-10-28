import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { FaqList } from "@/components/FaqList";
import Link from "next/link";
import { auto } from "@/config/images";
import { Photo } from "@/components/Photo";
import { DemoForm } from "@/components/DemoForm";
import { AutoShell } from "./AutoShell";
import { InventoryFinder, type Vehicle } from "./InventoryFinder";

export const metadata: Metadata = withSocial({
  title: "Ridgeline Motors — Auto dealership demo",
  description: "A demo dealership website: inventory finder, side-by-side specs, a financing estimator and a test-drive request.",
});

const wrap = "mx-auto w-full max-w-page px-3 md:px-4";
const vehicles: Vehicle[] = [
  { name: "2023 Meridian LX Sedan", body: "Sedan", price: 24900, miles: "18,400 mi", drive: "FWD", mpg: "34 mpg combined", photo: auto.sedan },
  { name: "2022 Highland SUV", body: "SUV", price: 31200, miles: "26,100 mi", drive: "AWD", mpg: "27 mpg combined", photo: auto.suv },
  { name: "2023 Ranchero GT Coupe", body: "Coupe", price: 36750, miles: "12,900 mi", drive: "RWD", mpg: "21 mpg combined", photo: auto.truck },
];
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const why = [["01", "The price is the price", "Every vehicle carries its price on the sticker and online. There is no second number in the office."], ["02", "Specs, not slogans", "Mileage, drivetrain and fuel economy sit side by side so you can compare without asking."], ["03", "Drive it first", "Book a test drive and take it for as long as it takes to decide."]];
const fld = "mt-1 w-full border-2 border-auto-ink bg-auto-bg px-3 py-2 text-base";

export default function AutoDemo() {
  return (
    <AutoShell>
<main id="main">
        {/* 1 — Hero */}
        <section aria-label="Welcome" className="relative overflow-hidden bg-auto-ink text-white">
          <Photo photo={auto.hero} grade="auto" priority sizes="100vw" position="center 55%" />
          <div className="absolute inset-0 bg-gradient-to-r from-auto-ink via-auto-ink/80 to-auto-ink/20" />
          <div className={`${wrap} relative py-12 md:py-16`}>
            <p className="inline-block bg-auto-accent px-3 py-1 text-xs font-bold uppercase tracking-ultra">Pre-owned · fixed prices</p>
            <h1 className="fade-up mt-4 max-w-measure font-auto-display text-4xl uppercase leading-none md:text-5xl">Every price on the sticker. No haggling.</h1>
            <p className="mt-4 max-w-measure-narrow text-lg text-white/85">Browse what is on the lot, compare the specs, and see your monthly payment before you walk in.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#inventory" className="bg-auto-accent px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-auto-ink">Browse inventory</a>
              <a href="#drive" className="border-2 border-white px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-auto-ink">Book a test drive</a>
            </div>
          </div>
        </section>
        <section aria-label="At a glance" className="bg-auto-panel">
          <ul className={`${wrap} grid grid-cols-1 divide-y divide-auto-line text-sm font-bold uppercase tracking-wide sm:grid-cols-3 sm:divide-x sm:divide-y-0`}>
            {["Fixed, published prices", "Payment estimator online", "Test drive any car"].map((x) => <li key={x} className="py-4 sm:px-4 sm:text-center">{x}</li>)}
          </ul>
        </section>

        {/* 2 — Inventory */}
        <section id="inventory" aria-labelledby="inv-h" className="py-8 md:py-12">
          <div className={wrap}>
            <h2 id="inv-h" className="font-auto-display text-3xl uppercase md:text-4xl">Browse the lot</h2>
            <div className="mt-6"><InventoryFinder vehicles={vehicles} /></div>
          </div>
        </section>

        {/* 3 — Why buy here */}
        <section aria-label="Why buy here" className="border-y-2 border-auto-ink bg-auto-panel py-8 md:py-12">
          <ol className={`${wrap} grid grid-cols-1 gap-6 md:grid-cols-3`}>
            {why.map(([n, t, b]) => (
              <li key={n} className="flex gap-3"><span className="font-auto-display text-4xl leading-none text-auto-accent" aria-hidden>{n}</span><div className="min-w-0"><h3 className="font-auto-display text-xl uppercase">{t}</h3><p className="mt-1 text-sm text-auto-ink/70">{b}</p></div></li>
            ))}
          </ol>
        </section>

        {/* 4 — Financing */}
        <section id="financing" aria-labelledby="fin-h" className="bg-auto-ink py-8 text-white md:py-12">
          <div className={`${wrap} flex flex-col items-start justify-between gap-6 md:flex-row md:items-center`}>
            <div><h2 id="fin-h" className="font-auto-display text-3xl uppercase md:text-4xl">Know the payment first</h2><p className="mt-2 max-w-measure text-white/75">Choose a vehicle, set your deposit and term, and see an estimated monthly payment before you visit.</p></div>
            <Link href="/demos/auto/financing" className="shrink-0 bg-auto-accent px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-auto-ink">Open the estimator</Link>
          </div>
        </section>

        {/* 5 — Compare */}
        <section id="compare" aria-labelledby="cmp-h" className="py-8 md:py-12">
          <div className={wrap}>
            <h2 id="cmp-h" className="font-auto-display text-3xl uppercase md:text-4xl">Side by side</h2>
            <div className="mt-6 overflow-x-auto border-2 border-auto-ink" tabIndex={0} role="region" aria-label="Vehicle comparison">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="bg-auto-ink text-white"><tr><th scope="col" className="sticky left-0 bg-auto-ink p-3">&nbsp;</th>{vehicles.map((v) => <th key={v.name} scope="col" className="p-3 font-auto-display text-lg uppercase">{v.name}</th>)}</tr></thead>
                <tbody>
                  {[["Price", (v: Vehicle) => usd(v.price)], ["Mileage", (v: Vehicle) => v.miles], ["Drivetrain", (v: Vehicle) => v.drive], ["Fuel economy", (v: Vehicle) => v.mpg], ["Seats", () => "5"]].map(([k, fn]) => (
                    <tr key={k as string} className="border-t border-auto-line"><th scope="row" className="sticky left-0 bg-auto-bg p-3 font-medium">{k as string}</th>{vehicles.map((v) => <td key={v.name} className="p-3">{(fn as (v: Vehicle) => string)(v)}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6 — Test drive */}
        <section id="drive" aria-labelledby="drive-h" className="bg-auto-panel py-8 md:py-12">
          <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12`}>
            <div className="lg:col-span-5"><h2 id="drive-h" className="font-auto-display text-3xl uppercase md:text-4xl">Book a test drive</h2><p className="mt-3 text-auto-ink/70">Pick a car, tell us how to reach you, and we confirm a time. No pressure and no obligation.</p></div>
            <DemoForm className="grid gap-4 sm:grid-cols-2 lg:col-span-7" noteClassName="border-l-4 border-auto-accent pl-3 text-sm sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wide sm:col-span-2">Vehicle<select name="v" className={fld}>{vehicles.map((v) => <option key={v.name}>{v.name}</option>)}</select></label>
              <label className="text-xs font-bold uppercase tracking-wide">Name<input required name="name" className={fld} /></label>
              <label className="text-xs font-bold uppercase tracking-wide">Phone or email<input required name="contact" className={fld} /></label>
              <button className="bg-auto-accent px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-auto-ink sm:col-span-2 sm:w-fit">Request a test drive</button>
            </DemoForm>
          </div>
        </section>
        <FaqList eyebrow="Questions" title="Common questions" items={[["Are the prices negotiable?","No. Every price on the sticker is the price."],["Can I see my monthly payment before visiting?","Yes. Open the financing estimator and adjust the deposit and term."],["Can I test drive any vehicle?","Request a test drive for any car on the lot and we confirm a time."]] as const} cls={{ section: "border-t-2 border-auto-ink py-12 md:py-16", eyebrow: "text-xs font-semibold uppercase tracking-ultra text-auto-accent", h2: "mt-3 font-auto-display uppercase text-2xl md:text-3xl", line: "divide-y divide-auto-line border-auto-line border-y", summary: "text-lg font-semibold focus-visible:outline focus-visible:outline-2", answer: "text-auto-ink/70", plus: "text-2xl text-auto-accent" }} />
      </main>
    </AutoShell>
  );
}
