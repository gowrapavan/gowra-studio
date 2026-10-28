import type { ReactNode } from "react";
import { autoDisplay, autoBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { AutoNav } from "./AutoNav";

/** Wrapper shared by every Ridgeline Motors route: font variables, nav, footer. */
export function AutoShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${autoDisplay.variable} ${autoBody.variable} bg-auto-bg font-auto-body text-auto-ink`}>
      <AutoNav />
      {children}
      <AutoFooter />
    </div>
  );
}

export function AutoFooter() {
  return (
    <>
      <DemoFooter
        variant="ledger"
        brand="Ridgeline Motors"
        blurb="Every price on the sticker. No haggling."
        columns={[
          { title: "Buy", links: [{ label: "Inventory", href: "/demos/auto#inventory" }, { label: "Compare", href: "/demos/auto#compare" }] },
          { title: "Pay", links: [{ label: "Financing estimator", href: "/demos/auto/financing" }, { label: "Financing overview", href: "/demos/auto#financing" }] },
        ]}
        facts={[]}
        theme={{
          root: "bg-auto-panel text-auto-ink",
          muted: "text-auto-ink/60",
          line: "border-auto-line",
          hover: "hover:text-auto-accent",
          display: "font-auto-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-auto-panel text-auto-ink border-auto-line font-auto-body"
        accentClass="bg-auto-accent text-white hover:brightness-95"
      />
    </>
  );
}
