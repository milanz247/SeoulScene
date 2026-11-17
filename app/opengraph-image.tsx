import { ImageResponse } from "next/og";
export const alt = "SeoulScene — Korean dramas, culture and stories that stay.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 90,
        background: "#faf7f2",
        color: "#29282a",
        borderBottom: "18px solid #842b47",
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: 7, color: "#842b47" }}>
        THE SEOULSCENE JOURNAL
      </div>
      <div style={{ fontSize: 100, marginTop: 30 }}>Stories that stay.</div>
      <div style={{ fontSize: 30, marginTop: 25, color: "#6d665f" }}>
        Korean drama · Culture · A little Seoul
      </div>
    </div>,
    size,
  );
}
