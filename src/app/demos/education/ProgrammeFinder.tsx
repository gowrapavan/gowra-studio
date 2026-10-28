"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { levels, schools, levelLabel, schoolName, programmes, type Level, type SchoolId } from "./data";

const ctl = "h-8 w-full border border-education-ink/30 bg-education-bg px-2 text-base outline-none focus:border-education-accent focus-visible:ring-2 focus-visible:ring-education-accent";

/**
 * The programme finder: search by name, filter by level and school.
 * `limit` shows the first few results until the visitor expands the list or
 * starts filtering, so the homepage stays compact and the catalogue page
 * shows everything.
 */
export function ProgrammeFinder({ limit, enquireHref = "/demos/education#admissions" }: { limit?: number; enquireHref?: string }) {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<Level | "all">("all");
  const [school, setSchool] = useState<SchoolId | "all">("all");
  const [all, setAll] = useState(false);

  const results = useMemo(
    () =>
      programmes.filter(
        (p) =>
          (level === "all" || p.level === level) &&
          (school === "all" || p.school === school) &&
          (q.trim() === "" || `${p.name} ${p.summary}`.toLowerCase().includes(q.trim().toLowerCase()))
      ),
    [q, level, school]
  );
  const filtering = q !== "" || level !== "all" || school !== "all";
  const shown = limit && !all && !filtering ? results.slice(0, limit) : results;

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
        <label className="relative md:col-span-5">
          <span className="text-sm font-semibold">Search programmes</span>
          <Search size={18} aria-hidden className="pointer-events-none absolute bottom-2 left-2 text-education-ink/50" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. data, design, business" className={`${ctl} mt-1 pl-6`} />
        </label>
        <label className="md:col-span-3">
          <span className="text-sm font-semibold">Level</span>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level | "all")} className={`${ctl} mt-1`}>
            <option value="all">All levels</option>
            {levels.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
        </label>
        <label className="md:col-span-4">
          <span className="text-sm font-semibold">School</span>
          <select value={school} onChange={(e) => setSchool(e.target.value as SchoolId | "all")} className={`${ctl} mt-1`}>
            <option value="all">All schools</option>
            {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </label>
      </div>

      <p aria-live="polite" className="mt-3 text-sm text-education-ink/70">
        {results.length === 0 ? "No programmes match. Try clearing a filter." : `Showing ${shown.length} of ${programmes.length} programmes`}
      </p>

      <ul className="mt-1 divide-y divide-education-ink/20 border-y border-education-ink/20">
        {shown.map((p) => (
          <li key={p.id} id={p.id} className="scroll-mt-12">
            <details className="group">
              <summary className="grid cursor-pointer list-none grid-cols-1 gap-1 py-3 pr-1 md:grid-cols-12 md:items-center md:gap-3 [&::-webkit-details-marker]:hidden">
                <div className="md:col-span-5">
                  <p className="font-edu-display text-xl font-semibold">{p.name}</p>
                  <p className="text-sm text-education-ink/70">{levelLabel(p.level)} · {schoolName(p.school)}</p>
                </div>
                <p className="text-sm md:col-span-5">{p.duration} · {p.mode}<br /><span className="text-education-ink/70">Next intake: {p.intake}</span></p>
                <span className="inline-flex h-6 items-center text-sm font-semibold text-education-accent md:col-span-2 md:justify-end">
                  <span className="group-open:hidden">Details +</span><span className="hidden group-open:inline">Hide −</span>
                </span>
              </summary>
              <div className="grid grid-cols-1 gap-3 pb-4 md:grid-cols-12 md:gap-3">
                <p className="md:col-span-5">{p.summary}</p>
                <div className="md:col-span-5">
                  <p className="text-sm font-semibold">What you will study</p>
                  <ul className="mt-1 space-y-1 text-sm">{p.study.map((x) => <li key={x} className="border-l-2 border-education-accent pl-2">{x}</li>)}</ul>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <Link href={enquireHref} className="inline-flex h-6 items-center bg-education-ink px-3 text-sm font-semibold text-white hover:bg-education-accent">Enquire</Link>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>

      {limit && !filtering && results.length > limit && (
        <button type="button" onClick={() => setAll((v) => !v)} className="mt-3 inline-flex h-6 items-center border border-education-ink px-3 text-sm font-semibold hover:bg-education-ink hover:text-white">
          {all ? "Show fewer" : `Show all ${results.length} programmes`}
        </button>
      )}
      {filtering && (
        <button type="button" onClick={() => { setQ(""); setLevel("all"); setSchool("all"); }} className="mt-3 inline-flex h-6 items-center text-sm font-semibold underline underline-offset-4">
          Clear filters
        </button>
      )}
    </div>
  );
}
