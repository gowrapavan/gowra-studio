"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A live, scaled-down view of one of the demo sites.
 *
 * The iframe renders the real page at a true viewport width (desktop or
 * phone, whichever suits the tile) and is shrunk with a transform, so
 * what a visitor sees is the site itself rather than a screenshot that can
 * go stale. It is decorative-only: the surrounding link is the control.
 *
 * Each preview is a whole second website running inside the page, and
 * same-origin frames share the page's thread, so unmanaged they made link
 * clicks take 2-3 seconds. Three rules keep the page responsive:
 *   1. A frame loads only after the page itself has finished loading and the
 *      browser is idle (plus an optional `delayMs` to stagger several).
 *   2. A frame loads only once it is near the viewport.
 *   3. All frames are removed the instant an internal link is clicked
 *      (NavigationProgress dispatches NAVIGATING_EVENT), so the click is
 *      never competing with them.
 */
export const NAVIGATING_EVENT = "studio:navigating";

function whenIdle(cb: () => void, delayMs: number) {
  const run = () => setTimeout(cb, delayMs);
  const afterLoad = () => ("requestIdleCallback" in window ? (window as Window & { requestIdleCallback: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback(run, { timeout: 2500 }) : run());
  if (document.readyState === "complete") afterLoad();
  else window.addEventListener("load", afterLoad, { once: true });
}

const DESKTOP_WIDTH = 1280;
const PHONE_WIDTH = 390;
const NARROW_BELOW = 520;

export function ScaledFrame({
  src,
  title,
  ratio = 1.6,
  phoneRatio = 0.9,
  lazy = false,
  delayMs = 0,
}: {
  src: string;
  title: string;
  /** width / height of the tile when the desktop layout is shown */
  ratio?: number;
  /** width / height of the tile when the phone layout is shown */
  phoneRatio?: number;
  lazy?: boolean;
  /** extra wait after the page is idle, to stagger several frames */
  delayMs?: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [idle, setIdle] = useState(false);
  const [near, setNear] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => setLoaded(false), [src]);

  // 1. wait for the page to finish loading and the browser to be idle
  useEffect(() => { whenIdle(() => setIdle(true), delayMs); }, [delayMs]);

  // 2. wait until the frame is close to the viewport
  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 3. get out of the way when the visitor clicks a link
  useEffect(() => {
    const on = () => setLeaving(true);
    window.addEventListener(NAVIGATING_EVENT, on);
    return () => window.removeEventListener(NAVIGATING_EVENT, on);
  }, []);


  const phone = width > 0 && width < NARROW_BELOW;
  const design = phone ? PHONE_WIDTH : DESKTOP_WIDTH;
  const r = phone ? phoneRatio : ratio;
  const scale = width / design;
  const height = width / r;

  return (
    <div
      ref={box}
      className="relative w-full overflow-hidden bg-ink/5"
      style={{ aspectRatio: String(r) }}
    >
      {(!loaded || leaving) && (
        <span className="absolute inset-0 flex items-center justify-center text-sm text-ink-soft">
          Loading preview
        </span>
      )}
      {width > 0 && idle && near && !leaving && (
        <iframe
          key={`${src}-${phone}`}
          src={src}
          title={title}
          loading="eager"
          // Scripts may run, but the frame gets an opaque origin: it cannot touch the
          // parent page and the browser may host it separately from the parent.
          sandbox="allow-scripts"
          tabIndex={-1}
          aria-hidden="true"
          onLoad={() => setLoaded(true)}
          className="absolute left-0 top-0 border-0 transition-opacity duration-300"
          style={{
            width: design,
            height: height / scale,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            pointerEvents: "none",
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
