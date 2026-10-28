"use client";

import { useState, type ReactNode } from "react";

/**
 * Form wrapper for the demo sites. None of these businesses exist, so a
 * form has nowhere to send anything. Instead of a bare <form> (which reloads
 * the page on submit and tells the visitor nothing), this validates in the
 * browser, then says plainly that it's a demo and that nothing was sent.
 */
export function DemoForm({
  children,
  className = "",
  noteClassName = "mt-3 text-sm",
  note = "This is a demo website, so nothing was sent. On a live site this is where your message would go.",
}: {
  children: ReactNode;
  className?: string;
  noteClassName?: string;
  note?: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {children}
      {done && (
        <p role="status" className={`${noteClassName} sm:col-span-2`}>
          {note}
        </p>
      )}
    </form>
  );
}
