"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * A small picture with a graceful fallback: if the image cannot be loaded
 * (offline, blocked, removed) a monogram of the name is shown instead, so the
 * layout never has a hole in it.
 */
export function ProjectImage({
  src,
  alt,
  name,
  size = "md",
}: {
  src: string;
  alt: string;
  name: string;
  size?: "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const mono = name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const box = size === "lg" ? "h-12 w-12 md:h-16 md:w-16" : "h-12 w-12";
  return (
    <div className={`${box} shrink-0 overflow-hidden rounded-md bg-ink/10`}>
      {failed ? (
        <span role="img" aria-label={alt} className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-ink">{mono}</span>
      ) : (
        <Image src={src} alt={alt} width={160} height={160} unoptimized onError={() => setFailed(true)} className="h-full w-full object-cover" />
      )}
    </div>
  );
}
