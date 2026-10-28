/**
 * Design-system audit.
 *
 * The spacing, type, elevation and letter-spacing scales are declared once
 * in globals.css and wired into Tailwind's theme, so an off-scale utility
 * doesn't compile. This catches the two things that check can't:
 * values smuggled in as arbitrary utilities, and raw CSS declarations that
 * bypass the tokens entirely.
 *
 *   npm run audit:design
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const walk = (d) =>
  readdirSync(d).flatMap((e) => {
    const f = join(d, e);
    return statSync(f).isDirectory() ? walk(f) : [f];
  });

/* Tailwind silently drops a utility whose value isn't in the replaced
   scales (`gap-5`, `h-10`, `text-7xl` simply emit no CSS) — it neither
   fails the build nor warns, so the layout just quietly loses the rule.
   Read the scales out of tailwind.config.ts and fail on any miss. */
const twConfig = readFileSync(join(ROOT, "tailwind.config.ts"), "utf8");
const block = (name) => {
  const start = twConfig.indexOf(`${name}: {`);
  return twConfig.slice(start, twConfig.indexOf("},", start));
};
const spacingKeys = new Set(
  [...block("spacing").matchAll(/^\s*"?([a-z0-9.]+)"?:/gm)].map((m) => m[1])
);
const fontKeys = new Set(
  [...block("fontSize").matchAll(/^\s*"?([a-z0-9]+)"?:/gm)].map((m) => m[1])
);
const SPACING_UTIL =
  /(?<![\w-])-?(?:p[trblxy]?|m[trblxy]?|gap(?:-[xy])?|space-[xy]|inset(?:-[xy])?|top|right|bottom|left|w|h|size|min-h)-(\d+(?:\.\d+)?)(?![\w/.-])/g;
const TEXT_SIZE = /(?<![\w-])text-(\d*xl|xs|sm|base|lg)(?![\w-])/g;

/* Same silent-drop problem for colours: `text-ember-brasss` or
   `bg-fitness-panell` emits nothing. Check every <utility>-<family>-<name>
   against the palette families declared in tailwind.config.ts. */
const palette = {};
{
  const start = twConfig.indexOf("colors: {");
  const colorsSrc = twConfig.slice(start, twConfig.indexOf("fontFamily", start));
  for (const m of colorsSrc.matchAll(/^\s{8}"?([a-z-]+)"?: \{([^}]*)\}/gm)) {
    palette[m[1]] = new Set([...m[2].matchAll(/"?([A-Za-z0-9-]+)"?:/g)].map((x) => x[1]));
  }
}
const COLOR_UTIL = new RegExp(
  `(?<![\\w-])(?:bg|text|border|ring|divide|outline|fill|stroke|from|via|to|decoration|placeholder)-(${Object.keys(palette).join("|")})-([a-z0-9]+)(?![\\w-])`,
  "g"
);

const failures = [];
const note = (f, m) => failures.push(`${relative(ROOT, f)}: ${m}`);

/* `sizes` on a responsive image is an HTML media-condition string, not a
   design value — a breakpoint there is correct and must stay. */
// `sizes` on a responsive image and IntersectionObserver's `rootMargin`
// are API strings with required unit syntax, not design values.
const ALLOWED_PX_CONTEXT = /sizes=|rootMargin/;

for (const file of walk(join(ROOT, "src")).filter((f) => /\.tsx?$/.test(f))) {
  const src = readFileSync(file, "utf8");
  src.split("\n").forEach((line, i) => {
    const at = `line ${i + 1}`;
    for (const m of line.matchAll(/\b([a-z-]+)-\[([^\]]+)\]/g)) {
      note(file, `${at}: arbitrary utility ${m[0]} — add a token instead`);
    }
    for (const m of line.matchAll(SPACING_UTIL)) {
      if (!spacingKeys.has(m[1])) {
        note(file, `${at}: "${m[0].trim()}" isn't in the spacing scale (${[...spacingKeys].join(", ")}) — Tailwind will silently drop it`);
      }
    }
    for (const m of line.matchAll(COLOR_UTIL)) {
      if (!palette[m[1]].has(m[2])) {
        note(file, `${at}: "${m[0]}" — "${m[2]}" isn't a colour in the ${m[1]} palette (${[...palette[m[1]]].join(", ")}) — Tailwind will silently drop it`);
      }
    }
    for (const m of line.matchAll(TEXT_SIZE)) {
      if (!fontKeys.has(m[1])) {
        note(file, `${at}: "${m[0]}" isn't in the type scale (${[...fontKeys].join(", ")}) — Tailwind will silently drop it`);
      }
    }
    if (/[0-9]+(px|rem)/.test(line) && !ALLOWED_PX_CONTEXT.test(line)) {
      note(file, `${at}: raw length in markup — use a token`);
    }
  });
}

/* Only the declared tokens may define lengths in CSS. */
const css = readFileSync(join(ROOT, "src", "app", "globals.css"), "utf8");
const tokenBlock = css.slice(0, css.indexOf("html {"));
for (const [, prop, value] of css
  .slice(css.indexOf("html {"))
  .matchAll(/(?:^|\n)\s*(margin[a-z-]*|padding[a-z-]*|gap|font-size|line-height):\s*([^;]+);/g)) {
  // `auto` and `0` are keywords, not lengths.
  if (!/var\(--/.test(value) && !/^(auto|0)$/.test(value.trim())) {
    failures.push(`globals.css: ${prop}: ${value.trim()} bypasses the tokens`);
  }
}

const tokens = [...tokenBlock.matchAll(/--([a-z0-9-]+):/g)].map((m) => m[1]);
const required = [
  "space-1", "space-2", "space-3", "space-4", "space-6", "space-8", "space-12", "space-16",
  "elevation-0", "elevation-1", "elevation-2",
  "text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl",
  "container-max", "grid-gutter", "noise",
];
for (const r of required) {
  if (!tokens.includes(r)) failures.push(`globals.css: missing token --${r}`);
}

/* Line heights must land on a 4px rhythm. */
for (const [, name, px] of css.matchAll(/--leading-([a-z0-9]+):\s*(\d+)px;/g)) {
  if (Number(px) % 4 !== 0) {
    failures.push(`globals.css: --leading-${name} (${px}px) is off the 4px baseline`);
  }
}

console.log(`Design audit: ${tokens.length} tokens declared.`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n`);
  for (const f of failures) console.error("  • " + f);
  process.exit(1);
}
console.log("No off-token values found.");
