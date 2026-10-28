import type { ReactNode } from "react";
import { fitnessDisplay, fitnessBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { FitnessNav } from "./FitnessNav";

/** Wrapper shared by every Vantage route: font variables, nav, footer. */
export function FitnessShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${fitnessDisplay.variable} ${fitnessBody.variable} bg-fitness-bg font-fitness-body text-fitness-ink`}>
      <FitnessNav />
      {children}
      <FitnessFooter />
    </div>
  );
}

export function FitnessFooter() {
  return (
    <>
      <DemoFooter
        variant="wordmark"
        brand="Vantage"
        blurb="Coached strength and conditioning in Austin. One free session, no card required."
        columns={[
          { title: "Train", links: [{ label: "Programs", href: "/demos/fitness#programs" }, { label: "Weekly schedule", href: "/demos/fitness/schedule" }, { label: "Trainers", href: "/demos/fitness#trainers" }] },
          { title: "Join", links: [{ label: "Membership", href: "/demos/fitness#membership" }, { label: "Free trial", href: "/demos/fitness#membership" }] },
        ]}
        facts={["412 Barton Springs Rd, Austin, TX", "Mon–Fri 5am–9pm · Sat 7am–4pm · Sun 8am–2pm"]}
        theme={{
          root: "bg-fitness-bg text-fitness-ink",
          muted: "text-fitness-ink/60",
          line: "border-fitness-line",
          hover: "hover:text-fitness-accent",
          display: "font-fitness-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-fitness-panel text-fitness-ink border-fitness-line font-fitness-body"
        accentClass="bg-fitness-accent text-fitness-bg hover:brightness-110"
      />
    </>
  );
}
