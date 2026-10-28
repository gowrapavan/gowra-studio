"use client";

import NextImage from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";
import type { Photo as PhotoData } from "@/config/images";

/**
 * Every photograph on the site goes through this component.
 *
 * Two things it guarantees that a bare <img> does not:
 *
 * 1. The frame owns its own aspect ratio, so the box exists before the
 *    picture arrives and keeps its size if the picture never does. A layout
 *    can't collapse or leave a hole because one file 404'd.
 * 2. If the URL fails, we swap to that photo's own locally-bundled
 *    fallback graphic instead of dumping alt text into the page (falling
 *    back to a generic per-vertical placeholder only if a photo record
 *    predates having its own). Alt text still reaches screen readers; it
 *    just never becomes visible debris.
 *
 * Alt text comes from the photo record itself (`src/config/images.ts`), so a
 * caption and its picture are described by the same source of truth.
 */

export type Grade =
  | "ember"
  | "aurelia"
  | "maison"
  | "northline"
  | "retail"
  | "realestate"
  | "fitness"
  | "clinic"
  | "photo"
  | "travel"
  | "auto"
  | "wedding"
  | "education"
  | "construction"
  | "none";

const fallbackFor: Record<Grade, string> = {
  ember: "/img/placeholder-ember.svg",
  aurelia: "/img/placeholder-aurelia.svg",
  maison: "/img/placeholder-maison.svg",
  northline: "/img/placeholder-northline.svg",
  retail: "/img/placeholder-retail.svg",
  realestate: "/img/placeholder-realestate.svg",
  fitness: "/img/placeholder-fitness.svg",
  clinic: "/img/placeholder-clinic.svg",
  photo: "/img/placeholder-photo.svg",
  travel: "/img/placeholder-travel.svg",
  auto: "/img/placeholder-auto.svg",
  wedding: "/img/placeholder-wedding.svg",
  education: "/img/placeholder-education.svg",
  construction: "/img/placeholder-construction.svg",
  none: "/img/placeholder-neutral.svg",
};

export function Photo({
  photo,
  grade = "none",
  sizes = "100vw",
  priority = false,
  position = "center",
  className = "",
  captioned = false,
}: {
  photo: PhotoData;
  grade?: Grade;
  sizes?: string;
  priority?: boolean;
  /** CSS object-position, e.g. "center 30%". */
  position?: string;
  className?: string;
  /**
   * Set when a visible <figcaption> already carries this description, so
   * the same sentence isn't announced twice.
   */
  captioned?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const alt = captioned ? "" : photo.alt;
  const gradeClass = grade === "none" ? "" : `grade-${grade}`;

  if (failed) {
    // This specific photo's own generated fallback, not a generic
    // per-vertical placeholder — so a stale ID degrades to something
    // still visually distinct rather than every failure on a page
    // collapsing to the same flat graphic.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo.fallback ?? fallbackFor[grade]}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${gradeClass} ${className}`}
      />
    );
  }

  return (
    <NextImage
      src={photo.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      style={{ objectPosition: position }}
      className={`object-cover ${gradeClass} ${className}`}
    />
  );
}

/**
 * A ratio-locked box for a Photo. Pass the ratio you actually want the
 * composition to hold — never rely on the image to establish height.
 */
export function Frame({
  ratio = "4 / 3",
  mobileRatio,
  className = "",
  children,
}: {
  ratio?: string;
  /** If set, phones use this ratio below the md breakpoint, and `ratio` at md and up. */
  mobileRatio?: string;
  className?: string;
  children: ReactNode;
}) {
  if (mobileRatio) {
    return (
      <div
        className={`frame-responsive relative overflow-hidden ${className}`}
        style={
          { "--r": ratio, "--r-sm": mobileRatio } as CSSProperties
        }
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
}
