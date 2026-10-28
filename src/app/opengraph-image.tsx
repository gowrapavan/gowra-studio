import { ImageResponse } from "next/og";

export const alt = "Gowra Studio — websites built around your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The default social preview, drawn at build time. No external assets. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E3B43",
          color: "#F3F7F6",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 56, background: "#F4A22D", display: "flex" }} />
          <div style={{ fontSize: 40, fontWeight: 700 }}>Gowra Studio</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
            See the website we would build for your business.
          </div>
          <div style={{ fontSize: 34, color: "#F4A22D" }}>
            14 working demo websites · concept is free
          </div>
        </div>
      </div>
    ),
    size
  );
}
