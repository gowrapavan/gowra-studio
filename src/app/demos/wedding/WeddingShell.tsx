import type { ReactNode } from "react";
import { weddingDisplay, weddingBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { WeddingNav } from "./WeddingNav";

/** Wrapper shared by every Linden & Rose route: font variables, nav, footer. */
export function WeddingShell({ children }: { children: ReactNode }) {
  return (
    <div
      id="top"
      className={`${weddingDisplay.variable} ${weddingBody.variable} bg-wedding-bg font-wedding-body text-wedding-ink`}
    >
      <WeddingNav />
      {children}
      <WeddingFooter />
    </div>
  );
}

export function WeddingFooter() {
  return (
    <>
      <DemoFooter
        variant="centered"
        brand="Linden & Rose Events"
        blurb="Wedding planning for couples who want one planner from the first call to the last dance."
        columns={[
          {
            title: "Explore",
            links: [
              { label: "Celebrations", href: "/demos/wedding/weddings" },
              { label: "Planning", href: "/demos/wedding/packages" },
              { label: "Enquire", href: "/demos/wedding#enquire" },
              { label: "Home", href: "/demos/wedding" },
            ],
          },
        ]}
        facts={["Savannah, Georgia", "Consultations by appointment"]}
        theme={{
          root: "bg-wedding-panel text-wedding-ink",
          muted: "text-wedding-ink/60",
          line: "border-wedding-line",
          hover: "hover:text-wedding-accent",
          display: "font-wedding",
        }}
      />
      <BackToStudioCTA
        theme="bg-wedding-bg text-wedding-ink border-wedding-line font-wedding-body"
        accentClass="bg-wedding-accent text-white hover:brightness-95"
      />
    </>
  );
}
