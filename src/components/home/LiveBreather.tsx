import { Photo, Frame } from "../Photo";
import { studio } from "@/config/images";

/**
 * Composition: "full-bleed breather" — no text, a pacing pause between
 * the card-grid Services section and the darker Model section that
 * follows it.
 */
export function LiveBreather() {
  return (
    <Frame ratio="21 / 9" className="w-full">
      <Photo
        photo={studio.hotel}
        grade="aurelia"
        sizes="100vw"
        position="center 45%"
      />
    </Frame>
  );
}
