"use client";

import { useState } from "react";

export type Treatment = { id: string; name: string; summary: string; visit: string[]; note: string };

export function TreatmentTabs({ items }: { items: Treatment[] }) {
  const [i, setI] = useState(0);
  const t = items[i];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); setI((i + 1) % items.length); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); setI((i - 1 + items.length) % items.length); }
  };
  return (
    <div className="grid gap-4 lg:grid-cols-12 md:gap-6">
      <div role="tablist" aria-label="Treatments" onKeyDown={onKey} className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-2 lg:col-span-4 md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0">
        {items.map((x, n) => (
          <button key={x.id} role="tab" id={`tab-${x.id}`} aria-selected={i === n} aria-controls={`panel-${x.id}`} tabIndex={i === n ? 0 : -1}
            onClick={() => setI(n)}
            className={`shrink-0 rounded-2xl px-4 py-3 text-left text-sm font-medium ${i === n ? "bg-clinic-accent text-white" : "bg-clinic-panel text-clinic-ink hover:bg-clinic-line"}`}>
            {x.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} tabIndex={0} className="min-w-0 rounded-2xl bg-clinic-panel p-4 lg:col-span-8 md:p-6">
        <h2 className="font-clinic-display text-2xl">{t.name}</h2>
        <p className="mt-2 text-clinic-ink/80">{t.summary}</p>
        <h3 className="mt-4 text-xs font-medium uppercase tracking-wide text-clinic-ink/60">At your visit</h3>
        <ol className="mt-2 space-y-2">
          {t.visit.map((v, n) => (
            <li key={v} className="flex gap-3 text-sm"><span className="font-clinic-display text-clinic-accent">{n + 1}</span><span>{v}</span></li>
          ))}
        </ol>
        <p className="mt-4 border-t border-clinic-line pt-3 text-sm text-clinic-ink/70">{t.note}</p>
      </div>
    </div>
  );
}
