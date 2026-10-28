import type { ReactNode } from "react";
import { travelDisplay, travelBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { TravelNav } from "./TravelNav";

/** Wrapper shared by every Wayfare & Co route: font variables, nav, footer. */
export function TravelShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${travelDisplay.variable} ${travelBody.variable} bg-travel-bg font-travel-body text-travel-ink`}>
      <TravelNav />
      {children}
      <TravelFooter />
    </div>
  );
}

export function TravelFooter() {
  return (
    <>
      <DemoFooter
        variant="band"
        brand="Wayfare & Co"
        blurb="Slower trips, planned properly."
        columns={[
          { title: "Trips", links: [{ label: "Journeys", href: "/demos/travel#journeys" }, { label: "Itineraries", href: "/demos/travel/trips" }, { label: "Plan a trip", href: "/demos/travel#enquire" }] },
        ]}
        facts={[]}
        cta={{ lead: "Tell us where you’d like to go — or that you’re not sure yet.", label: "Plan a trip", href: "/demos/travel#enquire" }}
        theme={{
          root: "bg-travel-panel text-travel-ink",
          muted: "text-travel-ink/60",
          line: "border-travel-line",
          hover: "hover:text-travel-accent",
          display: "font-travel-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-travel-panel text-travel-ink border-travel-line font-travel-body"
        accentClass="bg-travel-accent text-white hover:brightness-95"
      />
    </>
  );
}
