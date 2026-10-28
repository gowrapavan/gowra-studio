import type { ReactNode } from "react";
import { salonDisplay, salonBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { SalonNav } from "./SalonNav";

/** Wrapper shared by every Maison Form route: font variables, nav, footer. */
export function SalonShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${salonDisplay.variable} ${salonBody.variable} textured bg-maison-alt font-salon-body text-maison-ink md:pl-8`}>
      <SalonNav />
      {children}
      <SalonFooter />
    </div>
  );
}

export function SalonFooter() {
  return (
    <>
      <DemoFooter
        variant="centered"
        brand="Maison Form"
        blurb="A cutting and colour studio in Newcastle — consultations first, scissors second."
        columns={[
          { title: "Studio", links: [{ label: "Services & pricing", href: "/demos/salon/services" }, { label: "The work", href: "/demos/salon#craft" }, { label: "The studio", href: "/demos/salon#studio" }, { label: "Book", href: "/demos/salon#book" }] },
        ]}
        facts={["18 Pilgrim Street, Newcastle upon Tyne NE1 6QE", "Tue – Fri 9:00–19:00"]}
        theme={{
          root: "bg-maison-bg text-white",
          muted: "text-white/60",
          line: "border-white/10",
          hover: "hover:text-white",
          display: "font-salon-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-maison-bg text-white border-white/10 font-salon-body"
        accentClass="bg-white text-maison-ink hover:bg-white/90"
      />
    </>
  );
}
