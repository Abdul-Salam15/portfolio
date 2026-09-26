import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "About",
  description:
    "From coursework to production: Abdul-Salam Adebayo builds AI automation and full-stack systems from Lagos, plus community leadership at GDG, Bowen Tech Week and Machine Learning Lagos.",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
