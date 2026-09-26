import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "AI automation and full-stack AI projects by Abdul-Salam Adebayo: an outbound lead-research agent, n8n-orchestrated business workflows, and applied ML products.",
  alternates: { canonical: "/portfolio" },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
