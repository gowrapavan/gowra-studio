// Runs before every build (see "prebuild" in package.json).
// Removes files that belonged to OLDER versions of this project and no longer
// match the current code. If you extracted a new zip over an old folder, these
// can survive and break the build (for example: DemoShowcase.tsx importing an
// export that no longer exists). Only the files listed below are ever touched.
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const stale = [
  "src/components/home/DemoShowcase.tsx",
];

let removed = 0;
for (const rel of stale) {
  const file = join(root, rel);
  if (existsSync(file)) {
    rmSync(file, { force: true });
    console.log(`[clean] removed stale file from an older version: ${rel}`);
    removed++;
  }
}
if (!removed) console.log("[clean] no stale files found");
