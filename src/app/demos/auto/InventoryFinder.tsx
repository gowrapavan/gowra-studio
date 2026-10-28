"use client";

import { useMemo, useState } from "react";
import { Photo, Frame } from "@/components/Photo";
import type { Photo as PhotoData } from "@/config/images";

export type Vehicle = { name: string; body: "Sedan" | "SUV" | "Coupe"; price: number; miles: string; drive: string; mpg: string; photo: PhotoData };
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const sel = "mt-1 w-full border-2 border-auto-ink bg-auto-bg px-3 py-2 text-base text-auto-ink";

export function InventoryFinder({ vehicles }: { vehicles: Vehicle[] }) {
  const [body, setBody] = useState("Any");
  const [max, setMax] = useState(0);
  const shown = useMemo(() => vehicles.filter((v) => (body === "Any" || v.body === body) && (!max || v.price <= max)), [vehicles, body, max]);

  return (
    <div>
      <div className="grid gap-3 border-2 border-auto-ink bg-auto-bg p-4 shadow-e2 sm:grid-cols-3 md:items-end md:p-6">
        <label className="text-xs font-bold uppercase tracking-wide">Body style
          <select className={sel} value={body} onChange={(e) => setBody(e.target.value)}>{["Any", "Sedan", "SUV", "Coupe"].map((b) => <option key={b}>{b}</option>)}</select></label>
        <label className="text-xs font-bold uppercase tracking-wide">Max price
          <select className={sel} value={max} onChange={(e) => setMax(Number(e.target.value))}>
            <option value={0}>Any</option><option value={25000}>{usd(25000)}</option><option value={35000}>{usd(35000)}</option><option value={40000}>{usd(40000)}</option></select></label>
        <p className="text-sm font-bold uppercase tracking-wide" role="status" aria-live="polite">{shown.length} of {vehicles.length} on the lot</p>
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 border-2 border-dashed border-auto-line p-6 text-auto-ink/70">Nothing on the lot matches those filters right now. Try widening the price.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {shown.map((v) => (
            <article key={v.name} className="border-2 border-auto-ink bg-auto-bg">
              <Frame ratio="4 / 3"><Photo photo={v.photo} grade="auto" sizes="(min-width: 768px) 30vw, 100vw" /></Frame>
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-auto-accent">{v.body}</p>
                <h3 className="font-auto-display text-2xl uppercase">{v.name}</h3>
                <p className="mt-1 font-auto-display text-4xl">{usd(v.price)}</p>
                <dl className="mt-3 divide-y divide-auto-line border-t border-auto-line text-sm">
                  {[["Mileage", v.miles], ["Drivetrain", v.drive], ["Fuel economy", v.mpg]].map(([k, val]) => (
                    <div key={k} className="flex justify-between py-2"><dt className="text-auto-ink/60">{k}</dt><dd className="font-medium">{val}</dd></div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
