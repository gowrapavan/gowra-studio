import type { ReactNode } from "react";
import { clinicDisplay, clinicBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { ClinicNav } from "./ClinicNav";

/** Wrapper shared by every Willowmere Dental Care route: font variables, nav, footer. */
export function ClinicShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${clinicDisplay.variable} ${clinicBody.variable} bg-clinic-bg font-clinic-body text-clinic-ink`}>
      <ClinicNav />
      {children}
      <ClinicFooter />
    </div>
  );
}

export function ClinicFooter() {
  return (
    <>
      <DemoFooter
        variant="columns"
        brand="Willowmere Dental Care"
        blurb="Calm, unhurried dentistry for adults and children, with the cost explained before treatment starts."
        columns={[
          { title: "Care", links: [{ label: "Treatments", href: "/demos/clinic/treatments" }, { label: "Our dentist", href: "/demos/clinic#doctor" }] },
          { title: "Visit", links: [{ label: "Hours & location", href: "/demos/clinic#visit" }, { label: "Book an appointment", href: "/demos/clinic#book" }] },
        ]}
        facts={["4420 Willowmere Ave, Portland, OR 97214", "Mon – Thu: 8am – 5pm"]}
        theme={{
          root: "bg-clinic-panel text-clinic-ink",
          muted: "text-clinic-ink/60",
          line: "border-clinic-line",
          hover: "hover:text-clinic-accent",
          display: "font-clinic-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-clinic-bg text-clinic-ink border-clinic-line font-clinic-body"
        accentClass="bg-clinic-accent text-white hover:brightness-95"
      />
    </>
  );
}
