import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import Link from "next/link";
import { auto } from "@/config/images";
import { Photo, Frame } from "@/components/Photo";
import { AutoShell } from "../AutoShell";
import { Estimator } from "./Estimator";

export const metadata: Metadata = withSocial({
  title: "Financing estimator — Ridgeline Motors (demo)",
  description: "Estimate a monthly payment for any vehicle on the lot — enter your own rate, term and down payment.",
});

const vehicles = [
  { name: "2023 Meridian LX Sedan", price: 24900 },
  { name: "2022 Highland SUV", price: 31200 },
  { name: "2023 Ranchero GT Coupe", price: 36750 },
];
const bring = ["A valid driver's licence", "Proof of income (recent pay stubs or tax return)", "Proof of address", "Insurance details for the vehicle", "Your trade-in's title, if you have one"];
const faq = [
  ["Does the estimator submit an application?", "No. It's a calculator that runs in your browser; nothing is sent anywhere."],
  ["Is the rate shown a real offer?", "No. The default is only an example. Your actual rate depends on your credit and the lender."],
  ["Can I change the price for a trade-in?", "Subtract your trade-in value in the down-payment box to see the effect."],
];

export default function Financing() {
  return (
    <AutoShell>
      <main id="main">
        <section className="bg-auto-ink px-3 py-8 text-white md:px-4 md:py-12">
          <div className="mx-auto max-w-page">
            <p className="text-xs uppercase tracking-ultra text-white/60">Financing</p>
            <h1 className="fade-up mt-2 font-auto-display text-3xl uppercase md:text-4xl">Work out the payment first</h1>
            <p className="mt-3 max-w-measure text-white/70">Same principle as the stickers on the cars: you see the numbers before anyone asks you to sign anything.</p>
          </div>
        </section>

        <section className="px-3 py-8 md:px-4 md:py-12"><div className="mx-auto max-w-page"><Estimator vehicles={vehicles} /></div></section>

        <section className="border-t border-auto-line bg-auto-panel px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto grid grid-cols-1 max-w-page gap-6 lg:grid-cols-12 md:items-center md:gap-4">
            <div className="lg:col-span-7">
              <h2 className="font-auto-display text-2xl uppercase">What to bring when you&apos;re ready</h2>
              <ul className="mt-4 divide-y divide-auto-line border-y border-auto-line">
                {bring.map((b) => (<li key={b} className="py-3 text-sm">{b}</li>))}
              </ul>
            </div>
            <div className="lg:col-span-5"><Frame ratio="4 / 3"><Photo photo={auto.interior} grade="auto" sizes="(min-width: 768px) 40vw, 100vw" /></Frame></div>
          </div>
        </section>

        <section className="px-3 py-8 md:px-4 md:py-12">
          <div className="mx-auto max-w-measure">
            <h2 className="font-auto-display text-2xl uppercase">Common questions</h2>
            <dl className="mt-4 divide-y divide-auto-line border-y border-auto-line">
              {faq.map(([q, a]) => (<div key={q} className="py-3"><dt className="font-medium">{q}</dt><dd className="mt-1 text-sm text-auto-ink/70">{a}</dd></div>))}
            </dl>
            <Link href="/demos/auto#inventory" className="mt-6 inline-flex bg-auto-accent px-4 py-3 text-sm font-medium text-white hover:brightness-95">Browse the inventory</Link>
          </div>
        </section>
      </main>
    </AutoShell>
  );
}
