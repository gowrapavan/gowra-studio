import type { ReactNode } from "react";
import { photoFont } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { PhotographyNav } from "./PhotographyNav";

/** Wrapper shared by every Rowan & Ash route: font variables, nav, footer. */
export function PhotographyShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${photoFont.variable} bg-photo-bg font-photo text-photo-ink`}>
      <PhotographyNav />
      {children}
      <PhotographyFooter />
    </div>
  );
}

export function PhotographyFooter() {
  return (
    <>
      <DemoFooter
        variant="band"
        brand="Rowan & Ash"
        blurb="A two-person photography studio."
        columns={[
          { title: "Studio", links: [{ label: "Portfolio", href: "/demos/photography/portfolio" }, { label: "Packages", href: "/demos/photography#packages" }, { label: "Enquire", href: "/demos/photography#enquire" }] },
        ]}
        facts={[]}
        cta={{ lead: "Booking a date for this year", label: "Enquire", href: "/demos/photography#enquire" }}
        theme={{
          root: "bg-photo-bg text-photo-ink",
          muted: "text-photo-muted",
          line: "border-photo-line",
          hover: "hover:text-photo-ink",
          display: "font-photo",
        }}
      />
      <BackToStudioCTA
        theme="bg-photo-bg text-photo-ink border-photo-line font-photo"
        accentClass="bg-photo-ink text-photo-bg hover:brightness-110"
      />
    </>
  );
}
