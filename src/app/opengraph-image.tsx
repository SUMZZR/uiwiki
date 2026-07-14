import { ImageResponse } from "next/og";

export const alt = "UIWiki — UI patterns for AI coding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 48, background: "#f7f7f8", color: "#111", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", borderRadius: 34, padding: 48, background: "#111", color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 700 }}><span style={{ display: "flex", width: 46, height: 46, alignItems: "center", justifyContent: "center", borderRadius: 99, background: "#d8f34e", color: "#111" }}>UI</span> UIWiki</div>
        <div style={{ display: "flex", maxWidth: 900, flexDirection: "column", fontSize: 82, lineHeight: .9, letterSpacing: -5, fontWeight: 800 }}>See it. Prompt it. <span style={{ color: "#d8f34e" }}>Ship it.</span></div>
        <div style={{ display: "flex", fontSize: 22, color: "#aaa" }}>Live UI patterns with precise AI prompts and paste-ready source.</div>
      </div>
    </div>,
    size,
  );
}
