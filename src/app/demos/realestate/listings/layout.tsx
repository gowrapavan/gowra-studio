import type { Metadata } from "next";
import type { ReactNode } from "react";
import { withSocial } from "@/lib/seo";

export const metadata: Metadata = withSocial({
  title: "Listings — Halyard Property",
  description: "Search and filter the sample sales and rental listings in this Halyard Property demo, with a map synced to your results.",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
