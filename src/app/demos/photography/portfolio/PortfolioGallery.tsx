"use client";

import { useRef, useState } from "react";
import { Photo, Frame } from "@/components/Photo";
import type { Photo as PhotoData } from "@/config/images";

export type Work = { photo: PhotoData; ratio: string; cat: "Portraits" | "Events" | "Landscape" | "Details" };
const cats = ["All", "Portraits", "Events", "Landscape", "Details"] as const;

export function PortfolioGallery({ works }: { works: Work[] }) {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<Work | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const shown = works.filter((w) => cat === "All" || w.cat === cat);

  const show = (w: Work) => { setOpen(w); dlg.current?.showModal(); };
  const close = () => { dlg.current?.close(); setOpen(null); };

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-x-4 gap-y-1">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={`px-2 py-2 text-sm italic ${cat === c ? "border-b border-photo-ink text-photo-ink" : "text-photo-muted hover:text-photo-ink"}`}>
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-4 columns-2 gap-2 md:columns-3 md:gap-3">
        {shown.map((w, i) => (
          <li key={w.photo.src + i} className="mb-2 break-inside-avoid md:mb-3">
            <button type="button" onClick={() => show(w)} className="block w-full text-left" aria-label={`Open: ${w.photo.alt}`}>
              <Frame ratio={w.ratio}><Photo photo={w.photo} grade="photo" sizes="(min-width: 768px) 30vw, 50vw" /></Frame>
            </button>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-4 text-photo-muted">Nothing here yet.</p>}

      <dialog ref={dlg} onClose={() => setOpen(null)} onClick={(e) => e.target === dlg.current && close()}
        aria-label="Photograph" className="m-auto w-full max-w-page bg-photo-bg p-3 backdrop:bg-black/80">
        {open && (
          <div>
            <Frame ratio="4 / 3"><Photo photo={open.photo} grade="photo" priority sizes="100vw" /></Frame>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-sm italic text-photo-muted">{open.photo.alt}</p>
              <button type="button" onClick={close} autoFocus className="border border-photo-ink px-3 py-2 text-sm hover:bg-photo-ink hover:text-photo-bg">Close</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
