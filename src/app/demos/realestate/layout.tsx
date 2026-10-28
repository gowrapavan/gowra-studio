import type { ReactNode } from "react";
import { estateDisplay, estateBody } from "@/lib/fonts";
import { RealEstateNav } from "./RealEstateNav";

export default function RealEstateLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${estateDisplay.variable} ${estateBody.variable} bg-realestate-bg font-estate-body text-realestate-navy`}
    >
      <RealEstateNav />
      {children}
    </div>
  );
}
