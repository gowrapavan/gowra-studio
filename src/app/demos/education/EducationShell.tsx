import type { ReactNode } from "react";
import { eduDisplay, eduBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { EducationNav } from "./EducationNav";

/** Wrapper shared by every Cobalt Institute route: font variables, nav, footer. */
export function EducationShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${eduDisplay.variable} ${eduBody.variable} bg-education-bg font-edu-body text-education-ink`}>
      <EducationNav />
      {children}
      <EducationFooter />
    </div>
  );
}

export function EducationFooter() {
  return (
    <>
      <DemoFooter
        variant="columns"
        brand="Cobalt University"
        blurb="Small cohorts, taught by people who still practise."
        columns={[
          { title: "Study", links: [{ label: "Undergraduate degrees", href: "/demos/education/programs#ba-design" }, { label: "Postgraduate degrees", href: "/demos/education/programs#ma-design" }, { label: "Short courses", href: "/demos/education/programs#cert-ux" }, { label: "Find a programme", href: "/demos/education#finder" }] },
          { title: "Apply", links: [{ label: "Key dates", href: "/demos/education#dates" }, { label: "How to apply", href: "/demos/education#admissions" }] },
          { title: "University", links: [{ label: "Schools", href: "/demos/education#schools" }, { label: "Teaching staff", href: "/demos/education#staff" }] },
        ]}
        facts={[]}
        theme={{
          root: "bg-education-panel text-education-ink",
          muted: "text-education-ink/60",
          line: "border-education-line",
          hover: "hover:text-education-accent",
          display: "font-edu-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-education-bg text-education-ink border-education-line font-edu-body"
        accentClass="bg-education-accent text-white hover:brightness-95"
      />
    </>
  );
}
