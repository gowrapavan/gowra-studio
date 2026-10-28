"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAVIGATING_EVENT } from "./ScaledFrame";

type State = "idle" | "loading" | "done";

/**
 * A thin progress bar across the top that starts the moment an internal link
 * is clicked and finishes when the new page arrives, so a slow page load
 * never looks like a dead click. Animation lives in globals.css
 * (.nav-progress) and is switched off for reduced-motion users.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const giveUp = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      let url: URL;
      try { url = new URL(a.href, window.location.href); } catch { return; }
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      setState("loading");
      window.dispatchEvent(new Event(NAVIGATING_EVENT)); // let heavy previews step aside
      clearTimeout(giveUp.current);
      giveUp.current = setTimeout(() => setState("idle"), 12000); // never get stuck
    };
    document.addEventListener("click", onClick, true);
    return () => { document.removeEventListener("click", onClick, true); clearTimeout(giveUp.current); };
  }, []);

  useEffect(() => {
    clearTimeout(giveUp.current);
    setState((s) => (s === "loading" ? "done" : s));
    const t = setTimeout(() => setState("idle"), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return <div aria-hidden="true" data-state={state} className="nav-progress h-0 border-t-4 border-brass" />;
}
