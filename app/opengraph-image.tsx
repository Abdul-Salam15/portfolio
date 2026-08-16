import { ImageResponse } from "next/og"
import { profile } from "@/lib/data"

// Branded social-share card, generated at build/request time. Picked up
// automatically by Next for OpenGraph and Twitter tags across the site.
export const alt = `${profile.name} · ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #034694 0%, #081a3d 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "14px", height: "14px", borderRadius: "9999px", background: "#4f9cf9" }} />
          <div style={{ fontSize: "26px", fontWeight: 700, letterSpacing: "6px", color: "#cbd5e1" }}>PORTFOLIO</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "88px", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px" }}>
            {profile.name}
          </div>
          <div style={{ fontSize: "42px", fontWeight: 600, color: "#93c5fd", marginTop: "12px" }}>
            {profile.title}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "28px", color: "#cbd5e1" }}>
          {`Production LLM systems · RAG · Agentic AI · Scalable backends · ${profile.location}`}
        </div>
      </div>
    ),
    { ...size },
  )
}
