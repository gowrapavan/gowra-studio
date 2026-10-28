/**
 * Generates the bundled placeholder artwork used by <Photo> when an image
 * URL fails. These are committed to `public/img` so the fallback never
 * depends on the network.
 *
 * Run with: node scripts/make-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "img");

const tones = {
  ember: { a: "#241C17", b: "#14100D", line: "#C7A24A", alpha: 0.16 },
  aurelia: { a: "#EAE3D3", b: "#D8CFBA", line: "#A9885A", alpha: 0.2 },
  maison: { a: "#E8E8E8", b: "#CFCFCF", line: "#111111", alpha: 0.14 },
  northline: { a: "#E6EBF1", b: "#CFD9E4", line: "#0F2A44", alpha: 0.16 },
  retail: { a: "#F2EFE8", b: "#E7E2D6", line: "#C1512E", alpha: 0.18 },
  realestate: { a: "#F3F4F2", b: "#DDE1DE", line: "#12233B", alpha: 0.16 },
  fitness: { a: "#2A2A2A", b: "#121212", line: "#C6FF3D", alpha: 0.22 },
  clinic: { a: "#EDF4F1", b: "#DCE7E3", line: "#2E8B78", alpha: 0.16 },
  photo: { a: "#F2F2EE", b: "#E5E5E0", line: "#1A1A1A", alpha: 0.1 },
  travel: { a: "#F6ECDD", b: "#EAD9C4", line: "#C1652F", alpha: 0.18 },
  auto: { a: "#E7E9EB", b: "#DADDE0", line: "#14181C", alpha: 0.14 },
  wedding: { a: "#F7ECE7", b: "#EFE3DE", line: "#C98A93", alpha: 0.16 },
  education: { a: "#F1EEE3", b: "#E3DFD3", line: "#B8862E", alpha: 0.16 },
  construction: { a: "#E7E5DF", b: "#D8D6D0", line: "#E0592A", alpha: 0.2 },
  neutral: { a: "#EDEAE2", b: "#DCD7C9", line: "#181511", alpha: 0.14 },
};

/** A quiet diagonal-hatch card — reads as "image pending", not as an error. */
function svg({ a, b, line, alpha }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200" role="presentation">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${b}"/>
    </linearGradient>
    <pattern id="h" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <line x1="0" y1="0" x2="0" y2="28" stroke="${line}" stroke-opacity="${alpha}" stroke-width="1.5"/>
    </pattern>
  </defs>
  <rect width="1600" height="1200" fill="url(#g)"/>
  <rect width="1600" height="1200" fill="url(#h)"/>
  <rect x="40" y="40" width="1520" height="1120" fill="none" stroke="${line}" stroke-opacity="${alpha * 1.6}" stroke-width="2"/>
</svg>
`;
}

mkdirSync(OUT, { recursive: true });
for (const [name, tone] of Object.entries(tones)) {
  const file = join(OUT, `placeholder-${name}.svg`);
  writeFileSync(file, svg(tone), "utf8");
  console.log("wrote", file);
}
