/**
 * Product catalogue for the Fielding & Rye retail demo.
 *
 * Kept as plain data (not hardcoded into JSX) so the PLP, PDP and cart can
 * all read from one source, and so a non-developer could eventually swap
 * this for a CMS/DB call without touching any component.
 */
import { retail } from "@/config/images";
import type { Photo } from "@/config/images";

export type Product = {
  slug: string;
  name: string;
  category: "Outerwear" | "Footwear" | "Bags" | "Knitwear" | "Accessories";
  price: number; // USD, whole dollars
  description: string;
  details: string[];
  sizes: string[];
  /** Sizes that are demo-flagged as low stock — not a fake urgency stat, a UI state. */
  lowStock?: string[];
  gallery: Photo[];
  grade: "retail";
};

export const products: Product[] = [
  {
    slug: "waxed-field-jacket",
    name: "Waxed Field Jacket",
    category: "Outerwear",
    price: 248,
    description:
      "A waxed-cotton field jacket cut for layering, with a corduroy collar and four bellows pockets.",
    details: [
      "12oz waxed cotton shell, cotton twill lining",
      "Corduroy collar, brass hardware",
      "Re-waxing kit included",
    ],
    sizes: ["S", "M", "L", "XL"],
    lowStock: ["S"],
    gallery: [retail.jacket, retail.model, retail.studioFloor],
    grade: "retail",
  },
  {
    slug: "heritage-leather-boots",
    name: "Heritage Leather Boots",
    category: "Footwear",
    price: 195,
    description:
      "Full-grain leather boots on a Goodyear-welted sole, built to be resoled rather than replaced.",
    details: [
      "Full-grain leather upper, Goodyear welt",
      "Oil-resistant rubber sole",
      "Resole service available",
    ],
    sizes: ["7", "8", "9", "10", "11"],
    gallery: [retail.boots, retail.model, retail.studioFloor],
    grade: "retail",
  },
  {
    slug: "canvas-rucksack",
    name: "Canvas Rucksack",
    category: "Bags",
    price: 128,
    description:
      "A 22-litre waxed-canvas rucksack with a padded laptop sleeve and leather roll-top closure.",
    details: [
      "22L, waxed 16oz canvas",
      "Padded 15\" laptop sleeve",
      "Leather roll-top closure",
    ],
    sizes: ["One size"],
    gallery: [retail.pack, retail.studioFloor],
    grade: "retail",
  },
  {
    slug: "merino-crew-knit",
    name: "Merino Crew Knit",
    category: "Knitwear",
    price: 98,
    description:
      "A mid-weight merino crewneck, fully fashioned with no bulky side seams.",
    details: [
      "100% merino wool, 14-gauge knit",
      "Fully fashioned — no side seams",
      "Machine washable on wool cycle",
    ],
    sizes: ["S", "M", "L", "XL"],
    lowStock: ["XL"],
    gallery: [retail.knit, retail.studioFloor, retail.model],
    grade: "retail",
  },
  {
    slug: "full-grain-leather-belt",
    name: "Full-Grain Leather Belt",
    category: "Accessories",
    price: 58,
    description:
      "A 35mm full-grain leather belt with a solid brass buckle, made to age with wear.",
    details: [
      "35mm full-grain leather",
      "Solid brass buckle",
      "Trim to fit at any cobbler",
    ],
    sizes: ["S/M", "L/XL"],
    gallery: [retail.belt, retail.studioFloor],
    grade: "retail",
  },
  {
    slug: "wool-blend-scarf",
    name: "Wool Blend Scarf",
    category: "Accessories",
    price: 52,
    description:
      "A brushed wool-blend scarf, woven in a small mill run so colourways sell out and don't return.",
    details: [
      "80% wool, 20% recycled nylon",
      "180cm × 30cm",
      "Dry clean recommended",
    ],
    sizes: ["One size"],
    gallery: [retail.scarf, retail.studioFloor],
    grade: "retail",
  },
];

export const categories = Array.from(
  new Set(products.map((p) => p.category))
);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatUSD(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
