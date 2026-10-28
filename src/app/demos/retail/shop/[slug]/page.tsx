import type { Metadata } from "next";
import { withSocial } from "@/lib/seo";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/config/retail-products";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { ProductDetail } from "./ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found — Fielding & Rye" };
  return withSocial({
    title: `${product.name} — Fielding & Rye`,
    description: product.description,
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <div id="top">
      <main id="main"><ProductDetail product={product} /></main>
      <footer className="px-3 py-8 md:px-4 md:py-12">
        <p className="text-sm text-retail-ink/50">
          © {new Date().getFullYear()} Fielding &amp; Rye. This is a demo website concept.
        </p>
      </footer>
      <BackToStudioCTA
        theme="bg-retail-panel text-retail-ink border-retail-line font-retail-body"
        accentClass="bg-retail-ink text-retail-bg hover:bg-black"
      />
    </div>
  );
}
