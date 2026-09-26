import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Abdul-Salam Adebayo's career: software engineering at 4orge, product strategy at Merrowgate, and backend & data science at Synergy Solutions IMC LTD.",
  alternates: { canonical: "/resume" },
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
