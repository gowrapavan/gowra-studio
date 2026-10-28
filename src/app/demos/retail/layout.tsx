import type { ReactNode } from "react";
import { retailDisplay, retailBody } from "@/lib/fonts";
import { CartProvider } from "./CartContext";
import { RetailNav } from "./RetailNav";
import { CartDrawer } from "./CartDrawer";

export default function RetailLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${retailDisplay.variable} ${retailBody.variable} bg-retail-bg font-retail-body text-retail-ink`}
    >
      <CartProvider>
        <RetailNav />
        {children}
        <CartDrawer />
      </CartProvider>
    </div>
  );
}
