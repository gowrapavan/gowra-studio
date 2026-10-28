import type { ReactNode } from "react";
import { constructionDisplay, constructionBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { ConstructionNav } from "./ConstructionNav";

/** Wrapper shared by every Marrow & Stone route: font variables, nav, footer. */
export function ConstructionShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${constructionDisplay.variable} ${constructionBody.variable} bg-construction-bg font-construction-body text-construction-ink`}>
      <ConstructionNav />
      {children}
      <ConstructionFooter />
    </div>
  );
}

export function ConstructionFooter() {
  return (
    <>
      <DemoFooter
        variant="ledger"
        brand="Marrow & Stone"
        blurb="Design-build for homes and small commercial spaces."
        columns={[
          { title: "Work", links: [{ label: "Projects", href: "/demos/construction/projects" }, { label: "Process", href: "/demos/construction#process" }] },
          { title: "Services", links: [{ label: "What we build", href: "/demos/construction#services" }] },
        ]}
        facts={[""]}
        theme={{
          root: "bg-construction-panel text-construction-ink",
          muted: "text-construction-ink/60",
          line: "border-construction-line",
          hover: "hover:text-construction-accent",
          display: "font-construction-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-construction-bg text-construction-ink border-construction-line font-construction-body"
        accentClass="bg-construction-accent text-white hover:brightness-95"
      />
    </>
  );
}
