"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Every page opens at its top.
 *
 * - On navigation to a new page: jump to the top, instantly. (The site uses
 *   smooth scrolling for in-page anchors, so this asks for an instant jump
 *   explicitly; otherwise a new page would visibly glide up from the old
 *   scroll position.)
 * - On refresh or first load: browsers restore the previous scroll position,
 *   which lands visitors halfway down a page. Restoration is switched off and
 *   the page starts at the top.
 * - A link that carries an anchor (/demos/travel#enquire, /#contact) is left
 *   alone, so it still lands on its target.
 */
export function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
