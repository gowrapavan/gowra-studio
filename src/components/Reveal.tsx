"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The one entrance animation in the product. Wrap anything that should
 * fade and slide in as it reaches the viewport; pass `index` for a sibling
 * in a group and it staggers automatically.
 *
 * This is a layout primitive, not a decoration bolted onto one section —
 * it's reused wherever a rail, grid or list needs its items to arrive one
 * after another rather than all at once.
 *
 * `as` deliberately only accepts a *string* tag name (e.g. "div", "li"),
 * never a component reference. A component like `next/link`'s `Link` is a
 * function, and functions can't be passed from a Server Component into a
 * Client Component as a prop — passing one here throws at runtime with
 * "Functions cannot be passed directly to Client Components". If you need
 * a link to reveal, wrap it the other way around: put the <Link> *inside*
 * <Reveal>, not the other way around.
 */
export function Reveal({
  children,
  index = 0,
  as: Tag = "div",
  className = "",
  ...rest
}: {
  children: ReactNode;
  /** Position within a staggered group. Cycles through 4 delay steps. */
  index?: number;
  as?: "div" | "li" | "figure" | "section" | "span" | "p" | "article";
  className?: string;
  /** Any other prop is forwarded to the rendered element (e.g. `href`). */
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect a reduced-motion preference by simply not hiding the content
    // in the first place — nothing to observe, nothing to animate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayStep = index % 4;

  return (
    <Tag
      ref={ref as never}
      data-reveal-delay={delayStep}
      className={`reveal-init ${visible ? "reveal-in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}