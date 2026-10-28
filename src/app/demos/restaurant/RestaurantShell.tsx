import type { ReactNode } from "react";
import { restaurantDisplay, restaurantBody } from "@/lib/fonts";
import { BackToStudioCTA } from "@/components/BackToStudioCTA";
import { DemoFooter } from "@/components/DemoFooter";
import { RestaurantNav } from "./RestaurantNav";

/** Wrapper shared by every Ember & Olive route: font variables, nav, footer. */
export function RestaurantShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className={`${restaurantDisplay.variable} ${restaurantBody.variable} textured bg-ember-bg font-restaurant-body text-ember-text`}>
      <RestaurantNav />
      {children}
      <RestaurantFooter />
    </div>
  );
}

export function RestaurantFooter() {
  return (
    <>
      <DemoFooter
        variant="ledger"
        brand="Ember & Olive"
        blurb="Wood-fired cooking, a short menu that changes with the market, and a room built for long dinners."
        columns={[
          { title: "Eat", links: [{ label: "Menu", href: "/demos/restaurant/menu" }, { label: "Tonight’s fire", href: "/demos/restaurant#fire" }] },
          { title: "Visit", links: [{ label: "The room", href: "/demos/restaurant#room" }, { label: "Gallery", href: "/demos/restaurant#gallery" }, { label: "Find us", href: "/demos/restaurant#visit" }] },
        ]}
        facts={["Tuesday – Sunday, 5:30pm – 11pm", "Closed Mondays"]}
        theme={{
          root: "bg-ember-panel text-ember-text",
          muted: "text-ember-text/60",
          line: "border-ember-text/10",
          hover: "hover:text-ember-brass",
          display: "font-restaurant-display",
        }}
      />
      <BackToStudioCTA
        theme="bg-ember-panel text-ember-text border-ember-text/10 font-restaurant-body pb-6"
        accentClass="bg-ember-wine text-ember-text hover:brightness-110"
      />
    </>
  );
}
