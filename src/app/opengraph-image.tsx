import { ImageResponse } from "next/og";

export const alt = "Vibehoarder — UI patterns for vibe coding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 48, background: "#f7f7f8", color: "#111", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", borderRadius: 34, padding: 48, background: "#111", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 700 }}><span style={{ display: "flex", width: 46, height: 46, flexWrap: "wrap", gap: 4, padding: 9, borderRadius: 12, background: "#111", color: "#111" }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "#fff" }} /><span style={{ width: 12, height: 12, borderRadius: 3, background: "#d8f34e" }} /><span style={{ width: 12, height: 12, borderRadius: 3, background: "#fff" }} /><span style={{ width: 12, height: 12, borderRadius: 3, background: "#777" }} /></span> Vibehoarder</div>
        <div style={{ display: "flex", maxWidth: 900, flexDirection: "column", fontSize: 82, lineHeight: .9, letterSpacing: -5, fontWeight: 800 }}>See it. Prompt it. <span style={{ color: "#d8f34e" }}>Ship it.</span></div>
        <div style={{ display: "flex", fontSize: 22, color: "#aaa" }}>Live UI patterns with precise AI prompts and paste-ready source.</div>
      </div>
    </div>,
    size,
  );
}
