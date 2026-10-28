/**
 * Image integrity check — makes a real HTTP request to every photo URL
 * referenced in src/config/images.ts and reports which ones don't resolve.
 *
 * This requires actual network access to images.unsplash.com, so it can
 * only be run somewhere that has it (i.e. by you, not by an AI sandbox
 * with a restricted egress allowlist — that restriction is exactly why
 * some of these went unverified for as long as they did). Run this after
 * `npm install`, before showing the site to anyone:
 *
 *   npm run check:images
 *
 * A non-zero exit code means at least one photo 404'd. For any that fail,
 * either replace the ID in src/config/images.ts with a verified one, or
 * leave it — Photo.tsx will automatically fall back to that photo's own
 * locally-bundled graphic (see public/img/generated/) rather than showing
 * a broken image, so a stale ID degrades gracefully either way.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

function loadIds() {
  const srcPath = join(process.cwd(), "src", "config", "images.ts");
  const source = readFileSync(srcPath, "utf8");
  const ids = [];
  const re = /photo\(\s*"([^"]+)"\s*,/g;
  let m;
  while ((m = re.exec(source))) {
    ids.push(m[1]);
  }
  return [...new Set(ids)];
}

async function checkOne(id) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=60`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    return { id, ok: res.ok, status: res.status };
  } catch (err) {
    return { id, ok: false, status: "network-error", error: String(err) };
  }
}

async function main() {
  const ids = loadIds();
  console.log(`Checking ${ids.length} photo IDs against images.unsplash.com ...\n`);

  const results = [];
  const concurrency = 8;
  let i = 0;
  async function worker() {
    while (i < ids.length) {
      const id = ids[i++];
      results.push(await checkOne(id));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  const unreachable = results.filter((r) => r.status === "network-error");
  if (unreachable.length === results.length) {
    console.error(
      "Could not reach images.unsplash.com from this machine (every request failed at the network level),\n" +
        "so NOTHING was verified. Check your connection/proxy and run this again — this is not a list of dead photos."
    );
    process.exit(2);
  }
  const failed = results.filter((r) => !r.ok);
  for (const r of failed) {
    console.error(`✗ ${r.id} — ${r.status}`);
  }

  console.log(`\n${results.length - failed.length}/${results.length} resolved.`);
  if (failed.length > 0) {
    console.error(
      `\n${failed.length} photo ID(s) are dead. Each will fall back to its local` +
        ` generated graphic automatically, but replacing the ID in` +
        ` src/config/images.ts with a verified real photo is the better fix.`
    );
    process.exit(1);
  }
}

main();
