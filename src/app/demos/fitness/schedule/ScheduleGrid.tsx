"use client";

import { useState } from "react";

type Kind = "Strength" | "Conditioning";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
/** time → class per weekday (null = no class; the floor is still open) */
const slots: { time: string; row: (Kind | null)[] }[] = [
  { time: "6:00am", row: ["Strength", "Conditioning", "Strength", "Conditioning", "Strength", null] },
  { time: "8:00am", row: [null, null, null, null, null, "Strength"] },
  { time: "9:30am", row: [null, null, null, null, null, "Conditioning"] },
  { time: "12:00pm", row: ["Conditioning", "Strength", "Conditioning", "Strength", "Conditioning", null] },
  { time: "5:30pm", row: ["Strength", "Conditioning", "Strength", "Conditioning", null, null] },
  { time: "6:30pm", row: ["Conditioning", "Strength", "Conditioning", "Strength", null, null] },
];

const filters = ["All", "Strength", "Conditioning"] as const;

export function ScheduleGrid() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  return (
    <div>
      <div role="group" aria-label="Filter classes" className="flex flex-wrap gap-2">
        {filters.map((x) => (
          <button
            key={x}
            type="button"
            aria-pressed={f === x}
            onClick={() => setF(x)}
            className={`border-2 px-3 py-2 text-xs font-medium uppercase tracking-wide ${
              f === x ? "border-fitness-accent bg-fitness-accent text-fitness-bg" : "border-fitness-line text-fitness-ink hover:border-fitness-accent"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="mt-4 relative overflow-x-auto" tabIndex={0} role="region" aria-label="Weekly class timetable">
        <table className="w-full min-w-max border-collapse text-left text-sm">
          <caption className="sr-only">Weekly class timetable, Monday to Saturday</caption>
          <thead>
            <tr className="border-b-2 border-fitness-line">
              <th scope="col" className="py-2 pr-3 text-xs uppercase tracking-wide text-fitness-ink/60">Time</th>
              {days.map((d) => (
                <th key={d} scope="col" className="px-3 py-2 font-fitness-display text-lg uppercase tracking-wide">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((s) => (
              <tr key={s.time} className="border-b border-fitness-line">
                <th scope="row" className="py-3 pr-3 text-xs font-normal text-fitness-ink/60">{s.time}</th>
                {s.row.map((k, i) => {
                  const on = k && (f === "All" || f === k);
                  return (
                    <td key={i} className="px-3 py-3">
                      {k ? (
                        <span className={`inline-block border-l-4 px-2 py-1 text-xs font-medium uppercase tracking-wide ${
                          on ? (k === "Strength" ? "border-fitness-accent text-fitness-ink" : "border-fitness-ink text-fitness-ink") : "border-fitness-line text-fitness-ink/25"
                        }`}>
                          {k}
                        </span>
                      ) : (
                        <span className="text-fitness-ink/20" aria-label="No class">·</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-fitness-ink/60">
        Sunday is open gym only, 8am – 2pm. The floor is open outside class
        times during normal hours.
      </p>
    </div>
  );
}
