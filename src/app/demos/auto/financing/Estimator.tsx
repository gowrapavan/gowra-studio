"use client";

import { useId, useState } from "react";

export type Vehicle = { name: string; price: number };
const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function Estimator({ vehicles }: { vehicles: Vehicle[] }) {
  const id = useId();
  const [v, setV] = useState(0);
  const [down, setDown] = useState(3000);
  const [apr, setApr] = useState(7);
  const [term, setTerm] = useState(60);

  const price = vehicles[v].price;
  const principal = Math.max(0, price - Math.max(0, down));
  const r = apr / 100 / 12;
  const monthly = principal === 0 ? 0 : r === 0 ? principal / term : (principal * r) / (1 - Math.pow(1 + r, -term));
  const total = monthly * term;
  const field = "mt-1 w-full border border-auto-line bg-auto-bg px-3 py-2 text-base";

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <form onSubmit={(e) => e.preventDefault()} className="min-w-0 space-y-4 lg:col-span-7">
        <div>
          <label htmlFor={`${id}-v`} className="text-sm font-medium">Vehicle</label>
          <select id={`${id}-v`} className={field} value={v} onChange={(e) => setV(Number(e.target.value))}>
            {vehicles.map((x, i) => (<option key={x.name} value={i}>{x.name} — {fmt(x.price)}</option>))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${id}-d`} className="text-sm font-medium">Down payment ($)</label>
            <input id={`${id}-d`} className={field} type="number" inputMode="numeric" min={0} max={price} step={500} value={down} onChange={(e) => setDown(Number(e.target.value))} />
          </div>
          <div>
            <label htmlFor={`${id}-t`} className="text-sm font-medium">Term</label>
            <select id={`${id}-t`} className={field} value={term} onChange={(e) => setTerm(Number(e.target.value))}>
              {[36, 48, 60, 72].map((m) => (<option key={m} value={m}>{m} months</option>))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor={`${id}-a`} className="text-sm font-medium">Interest rate (APR %)</label>
          <input id={`${id}-a`} className={field} type="number" inputMode="decimal" min={0} max={30} step={0.1} value={apr} onChange={(e) => setApr(Number(e.target.value))} />
          <p className="mt-1 text-xs text-auto-ink/60">An example value to play with — not an offer. Enter the rate on the quote you actually have.</p>
        </div>
      </form>

      <div className="min-w-0 lg:col-span-5">
        <div className="border-2 border-auto-ink p-4 md:p-6" aria-live="polite">
          <p className="text-xs uppercase tracking-wide text-auto-ink/60">Estimated monthly payment</p>
          <p className="mt-1 font-auto-display text-4xl">{fmt(monthly)}</p>
          <dl className="mt-4 space-y-2 border-t border-auto-line pt-3 text-sm">
            <div className="flex justify-between"><dt>Amount financed</dt><dd>{fmt(principal)}</dd></div>
            <div className="flex justify-between"><dt>Total of payments</dt><dd>{fmt(total)}</dd></div>
            <div className="flex justify-between"><dt>Total interest</dt><dd>{fmt(Math.max(0, total - principal))}</dd></div>
          </dl>
        </div>
        <p className="mt-3 text-xs text-auto-ink/60">
          This is arithmetic, not a credit decision. It excludes tax, title and fees, and no application is submitted from this page.
        </p>
      </div>
    </div>
  );
}
