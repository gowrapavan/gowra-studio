/**
 * One-shot codemod: rewrites every spacing, font-size, line-height,
 * max-width and shadow utility in src/ onto the token scales declared in
 * globals.css. Kept in the repo as the record of the migration.
 *
 *   node scripts/codemod-tokens.mjs
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const SRC = join(process.cwd(), "src");

function walk(dir) {
  return readdirSync(dir).flatMap((e) => {
    const full = join(dir, e);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/* Tailwind spacing key -> token key. Values that were already on the
   ramp (6=24px, 12=48px, 16=64px, 24=96px) map to the token of the same
   pixel value; everything else snaps to the nearest token. */
const SPACE = {
  "0": "0",
  "0.5": "1",
  "1": "1",
  "1.5": "1",
  "2": "1",
  "2.5": "1",
  "3": "2",
  "3.5": "2",
  "4": "2",
  "5": "3",
  "6": "3",
  "7": "4",
  "8": "4",
  "9": "4",
  "10": "6",
  "11": "6",
  "12": "6",
  "14": "6",
  "16": "8",
  "20": "8",
  "24": "12",
  "28": "12",
  "32": "16",
  "36": "16",
  "40": "16",
  "44": "16",
  "48": "16",
  "56": "16",
  "64": "16",
};

const SPACE_PREFIXES = [
  "px", "py", "pt", "pr", "pb", "pl", "p",
  "mx", "my", "mt", "mr", "mb", "ml", "m",
  "gap-x", "gap-y", "gap",
  "space-x", "space-y",
  "min-w", "min-h", "w", "h", "size",
  "inset-x", "inset-y", "inset",
  "top", "right", "bottom", "left",
  "translate-x", "translate-y",
].sort((a, b) => b.length - a.length);

/* Old font-size utility -> 7-step modular scale. */
const TEXT = {
  "8xl": "3xl", "7xl": "3xl", "6xl": "3xl", "5xl": "3xl",
  "4xl": "2xl", "3xl": "xl", "2xl": "lg", xl: "lg",
  lg: "base", base: "base", sm: "sm", xs: "xs",
};
const TEXT_ARBITRARY = {
  "[11px]": "xs", "[13px]": "xs", "[15px]": "sm",
  "[2.6rem]": "2xl", "[2.75rem]": "2xl", "[3rem]": "2xl", "[3.25rem]": "2xl",
};

const MAXW = {
  studio: "page", "6xl": "page", "5xl": "page", "4xl": "page",
  "3xl": "measure", "2xl": "measure", xl: "measure",
  lg: "measure-narrow", md: "measure-narrow",
  sm: "measure-narrow", xs: "measure-narrow",
};

const SHADOW = {
  "[0_30px_80px_-40px_rgba(24,21,17,0.4)]": "e1",
  "[0_1px_0_0_rgba(43,38,32,0.12)]": "e2",
  sm: "e1",
  lg: "e2",
  xl: "e2",
};

let edits = 0;
const count = (n) => {
  edits += n;
};

for (const file of walk(SRC).filter((f) => /\.tsx?$/.test(f))) {
  const before = readFileSync(file, "utf8");
  let s = before;

  // --- max-width -------------------------------------------------
  s = s.replace(/\bmax-w-([a-z0-9]+)\b/g, (m, key) => {
    if (!(key in MAXW)) return m;
    count(1);
    return `max-w-${MAXW[key]}`;
  });

  // --- shadows ---------------------------------------------------
  s = s.replace(/\bshadow-(\[[^\]]*\]|[a-z]+)\b/g, (m, key) => {
    if (!(key in SHADOW)) return m;
    count(1);
    return `shadow-${SHADOW[key]}`;
  });

  // --- font sizes ------------------------------------------------
  s = s.replace(/\btext-(\[[^\]]*\])/g, (m, key) => {
    if (!(key in TEXT_ARBITRARY)) return m;
    count(1);
    return `text-${TEXT_ARBITRARY[key]}`;
  });
  s = s.replace(/\btext-(8xl|7xl|6xl|5xl|4xl|3xl|2xl|xl|lg|base|sm|xs)\b/g, (m, key) => {
    if (TEXT[key] === key) return m;
    count(1);
    return `text-${TEXT[key]}`;
  });
  // A responsive pair that collapsed to the same step is noise.
  s = s.replace(
    /\btext-(xs|sm|base|lg|xl|2xl|3xl)\s+(sm|md|lg):text-\1\b/g,
    (m, size) => {
      count(1);
      return `text-${size}`;
    }
  );

  // --- line-height: comes from the scale now ---------------------
  s = s.replace(/\s\b(?:sm|md|lg):?leading-(?:\[[^\]]*\]|[a-z]+)\b/g, () => {
    count(1);
    return "";
  });
  s = s.replace(/\s\bleading-(?:\[[^\]]*\]|[a-z]+)\b/g, () => {
    count(1);
    return "";
  });

  // --- spacing ---------------------------------------------------
  const spacingRe = new RegExp(
    `(?<![\\w-])(-?)(${SPACE_PREFIXES.join("|")})-(\\d+(?:\\.5)?)(?![\\w./\\[])`,
    "g"
  );
  s = s.replace(spacingRe, (m, neg, prefix, key) => {
    if (!(key in SPACE)) {
      throw new Error(`${relative(process.cwd(), file)}: off-ramp value ${m}`);
    }
    if (SPACE[key] === key) return m;
    count(1);
    return `${neg}${prefix}-${SPACE[key]}`;
  });

  if (s !== before) writeFileSync(file, s, "utf8");
}

console.log(`Rewrote ${edits} hardcoded values onto the token scales.`);
