import type { ReactNode } from "react";
import { hotelDisplay, hotelBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { HotelNav } from "./HotelNav";

/** Wrapper shared by every The Aurelia House route: font variables, nav, footer. */
export function HotelShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${hotelDisplay.variable} ${hotelBody.variable} textured bg-aurelia-bg font-hotel-body text-aurelia-ink`}>
      <HotelNav />
      {children}
      <HotelFooter />
    </div>
  );
}

export function HotelFooter() {
  return (
    <>
      <DemoFooter
        variant="columns"
        brand="The Aurelia House"
        blurb="A small hotel in the old quarter — quiet rooms, a desk by the window, and a front desk that never closes."
        columns={[
          { title: "Stay", links: [{ label: "Rooms", href: "/demos/hotel/rooms" }, { label: "The house", href: "/demos/hotel#house" }, { label: "Gallery", href: "/demos/hotel#gallery" }] },
          { title: "Plan", links: [{ label: "Check availability", href: "/demos/hotel#contact" }, { label: "Contact", href: "/demos/hotel#contact" }] },
        ]}
        facts={["Check-in 3pm · Check-out 11am", "Front desk staffed 24 hours"]}
        theme={{
          root: "bg-aurelia-bg text-aurelia-ink",
          muted: "text-aurelia-ink/60",
          line: "border-aurelia-ink/10",
          hover: "hover:text-aurelia-gold",
          display: "font-hotel-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-aurelia-bg text-aurelia-ink border-aurelia-ink/10 font-hotel-body"
        accentClass="bg-aurelia-deep text-white hover:brightness-110"
      />
    </>
  );
}
