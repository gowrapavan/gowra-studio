/**
 * Generates the site's actual imagery: one unique, deterministic abstract
 * SVG per photo ID referenced in src/config/images.ts, written to
 * public/img/generated/<id>.svg.
 *
 * These replace what used to be live Unsplash CDN requests. That meant the
 * whole site's imagery depended on specific external photo IDs staying
 * live — several had already gone 404 in practice. Generating locally
 * means every image ships in the build, can never 404, and needs no
 * network access to verify. Each ID hashes to its own palette and
 * composition, so images stay visually distinct from each other rather
 * than collapsing to one flat placeholder per vertical.
 *
 * Run with: node scripts/generate-photos.mjs
 * (npm run make:photos)
 */
import { readFileSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const SRC = join(process.cwd(), "src", "config", "images.ts");
const OUT = join(process.cwd(), "public", "img", "generated");

function loadIds() {
  const source = readFileSync(SRC, "utf8");
  const ids = new Set();
  const re = /photo\(\s*"([^"]+)"\s*,/g;
  let m;
  while ((m = re.exec(source))) ids.add(m[1]);
  return [...ids];
}

function hashToInt(str) {
  const hex = createHash("sha1").update(str).digest("hex");
  return BigInt("0x" + hex);
}

function hsl(h, s, l) {
  return `hsl(${((h % 360) + 360) % 360},${s}%,${l}%)`;
}

function rndFactory(n) {
  return (i) => Number((n * (BigInt(i) * 2654435761n + 1n)) % 1000n) / 1000;
}

function genSvg(id) {
  const n = hashToInt(id);
  const rnd = rndFactory(n);
  const baseHue = Number(n % 360n);
  const variant = Number((n >> 8n) % 6n);
  const hue2 = (baseHue + 35 + Number((n >> 16n) % 60n)) % 360;
  const c1 = hsl(baseHue, 55, 30);
  const c3 = hsl((baseHue + 200) % 360, 45, 20);
  const w = 1600;
  const h = 1200;
  let shapes = "";

  if (variant === 0) {
    for (let i = 0; i < 6; i++) {
      const x = rnd(i) * w;
      shapes += `<rect x="${x.toFixed(0)}" y="-200" width="${(60 + rnd(i + 10) * 120).toFixed(
        0
      )}" height="${h + 400}" fill="${hsl((baseHue + i * 20) % 360, 50, 40 + rnd(i) * 15)}" opacity="0.5" transform="rotate(20 ${x.toFixed(
        0
      )} ${h / 2})"/>`;
    }
  } else if (variant === 1) {
    const cx = w * (0.3 + rnd(1) * 0.4);
    const cy = h * (0.3 + rnd(2) * 0.4);
    for (let i = 0; i < 7; i++) {
      const r = 80 + i * 90;
      shapes += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r}" fill="none" stroke="${hsl(
        (baseHue + i * 15) % 360,
        55,
        55
      )}" stroke-width="26" opacity="${(0.85 - i * 0.09).toFixed(2)}"/>`;
    }
  } else if (variant === 2) {
    for (let i = 0; i < 9; i++) {
      const cx = rnd(i) * w;
      const cy = rnd(i + 5) * h;
      const r = 100 + rnd(i + 2) * 220;
      shapes += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${hsl(
        (baseHue + i * 22) % 360,
        55,
        45
      )}" opacity="0.55"/>`;
    }
  } else if (variant === 3) {
    const cols = 6;
    const rows = 4;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (rnd(i * rows + j) > 0.4) {
          const x = (i * w) / cols;
          const y = (j * h) / rows;
          shapes += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(w / cols).toFixed(
            0
          )}" height="${(h / rows).toFixed(0)}" fill="${hsl(
            (baseHue + (i + j) * 18) % 360,
            50,
            35 + rnd(i + j) * 20
          )}" opacity="0.6"/>`;
        }
      }
    }
  } else if (variant === 4) {
    for (let i = 0; i < 8; i++) {
      const amp = 40 + rnd(i) * 80;
      const yoff = (i * h) / 8;
      let path = `M0,${yoff.toFixed(0)} `;
      for (let x = 0; x <= w + 100; x += 100) {
        const y = yoff + amp * Math.sin((x / w) * 6.28 + i);
        path += `L${x},${y.toFixed(0)} `;
      }
      shapes += `<path d="${path}" fill="none" stroke="${hsl(
        (baseHue + i * 20) % 360,
        50,
        50
      )}" stroke-width="14" opacity="0.6"/>`;
    }
  } else {
    const pts = Array.from({ length: 6 }, (_, i) => [rnd(i) * w, rnd(i + 1) * h]);
    for (let i = 0; i < 10; i++) {
      const p = [0, 1, 2].map((k) => pts[(i + k) % pts.length]);
      const poly = p.map(([x, y]) => `${x.toFixed(0)},${y.toFixed(0)}`).join(" ");
      shapes += `<polygon points="${poly}" fill="${hsl((baseHue + i * 25) % 360, 50, 40)}" opacity="0.45"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  ${shapes}
</svg>`;
}

function main() {
  rmSync(OUT, { recursive: true, force: true }); // drop fallbacks for IDs no longer referenced
  mkdirSync(OUT, { recursive: true });
  const ids = loadIds();
  for (const id of ids) {
    writeFileSync(join(OUT, `${id}.svg`), genSvg(id));
  }
  console.log(`Generated ${ids.length} local images in ${OUT}`);
}

main();
