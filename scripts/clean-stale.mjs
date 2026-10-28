// Runs before every build (see "prebuild" in package.json).
// Deletes files under src/ that are NOT part of this version of the project
// (listed in src-manifest.txt). Leftovers from older zips can survive when a new
// version is extracted over an old folder, and they break the build (for example
// HeroPicker.tsx or DemoShowcase.tsx importing exports that no longer exist).
//
// If you add your own new files under src/, either add their paths to
// src-manifest.txt or set CLEAN_STALE=off in Netlify to skip this cleanup.
import { existsSync, readFileSync, readdirSync, rmSync, statSync, rmdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

if (process.env.CLEAN_STALE === "off") {
  console.log("[clean] skipped (CLEAN_STALE=off)");
  process.exit(0);
}

const root = process.cwd();
const manifestPath = join(root, "src-manifest.txt");
if (!existsSync(manifestPath)) {
  console.log("[clean] src-manifest.txt not found, nothing to do");
  process.exit(0);
}

const keep = new Set(
  readFileSync(manifestPath, "utf8").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
);

let removed = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
      if (readdirSync(full).length === 0) rmdirSync(full);
    } else {
      const rel = relative(root, full).split(sep).join("/");
      if (!keep.has(rel)) {
        rmSync(full, { force: true });
        console.log(`[clean] removed stale file: ${rel}`);
        removed++;
      }
    }
  }
}
walk(join(root, "src"));
console.log(removed ? `[clean] removed ${removed} stale file(s)` : "[clean] no stale files found");
