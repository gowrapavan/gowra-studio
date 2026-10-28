/**
 * Static content audit.
 *
 * These are the defects that make a site read as generated rather than
 * built, expressed as assertions so they can't quietly come back:
 *
 *   1. No placeholder contact values anywhere in rendered output.
 *   2. No invented credibility — stat strips, star ratings, named
 *      testimonials, "N years in business".
 *   3. No banned copy vocabulary.
 *   4. Every photo key referenced by a page exists in the registry, and
 *      every key in the registry is used by at least one page (no dead
 *      entries, no unresolved references).
 *   5. Photographs are only rendered through <Photo>, which binds alt text
 *      to the photo record — no hand-written alt that can drift.
 *
 *   npm run audit:content
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(SRC).filter((f) => /\.(ts|tsx)$/.test(f));
const failures = [];

function fail(file, message) {
  failures.push(`${relative(ROOT, file)}: ${message}`);
}

/** Strips /* *\/ and // comments so explanatory prose isn't audited. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

/* --- 1 & 2 & 3: forbidden strings in rendered code ----------------- */
const forbidden = [
  { re: /\(000\)\s*000-0000/, why: "placeholder phone number" },
  { re: /\+?1?0{7,}/, why: "placeholder phone digits" },
  { re: /lorem ipsum/i, why: "placeholder copy" },
  { re: /\byears in business\b/i, why: "invented statistic" },
  { re: /\bwould rebook\b/i, why: "invented statistic" },
  { re: /\bhappy clients\b/i, why: "invented statistic" },
  { re: /\bjobs completed\b/i, why: "invented statistic" },
  { re: /\baverage rating\b/i, why: "invented rating" },
  { re: /\b\d[\d,]*\+\s*(reviews|clients|jobs|customers)\b/i, why: "invented statistic" },
  { re: /\btestimonial/i, why: "testimonial block" },
  { re: /\bwhere hair becomes\b/i, why: "banned copy" },
  { re: /\bsavor every moment\b/i, why: "banned copy" },
  { re: /luxury dining and stillness/i, why: "banned copy" },
  { re: /<Star\b/, why: "star-rating widget" },
];

/* --- 4: image registry cross-check --------------------------------- */
const registrySource = readFileSync(join(SRC, "config", "images.ts"), "utf8");
const registryKeys = new Map(); // group -> Set(name)
for (const groupMatch of registrySource.matchAll(
  /export const (restaurant|hotel|salon|service|studio) = \{([\s\S]*?)\n\};/g
)) {
  const [, group, body] = groupMatch;
  const names = new Set(
    [...body.matchAll(/^\s{2}([A-Za-z][A-Za-z0-9]*)\s*:/gm)].map((m) => m[1])
  );
  registryKeys.set(group, names);
}

const usedKeys = new Set();

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const code = stripComments(raw);
  const isRegistry = file.endsWith(join("config", "images.ts"));

  if (!isRegistry) {
    for (const { re, why } of forbidden) {
      if (re.test(code)) fail(file, `${why} (${re})`);
    }
  }

  // 5: no raw <img>/<Image> outside the Photo primitive.
  // ProjectImage is the one other place allowed: its alt text is a required field
  // of the project record in src/config/projects.ts, so it is still bound to data.
  if (!file.endsWith(join("components", "Photo.tsx")) && !file.endsWith(join("home", "ProjectImage.tsx"))) {
    if (/<Image\b/.test(code)) {
      fail(file, "renders <Image> directly — use <Photo> so alt text stays bound to the photo record");
    }
    if (/<img\b/.test(code)) {
      fail(file, "renders a raw <img> — use <Photo>");
    }
  }

  // 4: collect group.key references such as `restaurant.shortRib`.
  for (const m of code.matchAll(
    /\b(restaurant|hotel|salon|service|studio)\.([A-Za-z][A-Za-z0-9]*)\b/g
  )) {
    const [, group, name] = m;
    const known = registryKeys.get(group);
    if (!known) continue;
    if (isRegistry) continue;
    if (!known.has(name)) {
      // Could be an unrelated identifier (e.g. `service.hero` vs
      // `contact.phone`); only flag when the group object is imported here.
      if (new RegExp(`\\b${group}\\b`).test(code.split("\n")[0]) || /@\/config\/images/.test(code)) {
        fail(file, `references ${group}.${name}, which is not in the photo registry`);
      }
      continue;
    }
    usedKeys.add(`${group}.${name}`);
  }
}

for (const [group, names] of registryKeys) {
  for (const name of names) {
    if (!usedKeys.has(`${group}.${name}`)) {
      failures.push(
        `src/config/images.ts: ${group}.${name} is defined but never rendered — remove it or use it`
      );
    }
  }
}

/* ------------------------------------------------------------------ */
const total = [...registryKeys.values()].reduce((n, s) => n + s.size, 0);
console.log(`Audited ${files.length} source files and ${total} photo entries.`);

if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n`);
  for (const f of failures) console.error("  • " + f);
  process.exit(1);
}
console.log("No problems found.");
