import type { Metadata } from "next";
import type { ReactNode } from "react";
import { withSocial } from "@/lib/seo";

export const metadata: Metadata = withSocial({
  title: "Shop all — Fielding & Rye",
  description: "Browse and filter the full Fielding & Rye range in this demo online shop: outerwear, footwear, bags and knitwear, with a working cart.",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
