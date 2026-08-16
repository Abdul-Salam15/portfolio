import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { profile, siteUrl } from "@/lib/data"

// Two families cover the whole site: Jakarta for display/headings, Inter for
// body + base sans. (Was 5 families; Geist/Manrope/JetBrains added blocking
// font downloads for near-zero usage.)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const description =
  "Adebayo Abdul-Malik · AI & Backend Engineer. Production LLM systems, RAG pipelines and scalable backends serving 23K+ users across four continents."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} · Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "AI Engineer",
    "Backend Engineer",
    "LLM",
    "RAG",
    "Agentic AI",
    "Machine Learning",
    "Django",
    "Python",
    "AWS",
    "Lagos",
    "Nigeria",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${profile.name} · Portfolio`,
    title: `${profile.name} · ${profile.title}`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.title}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  image: profile.headshot,
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  sameAs: [profile.github, profile.linkedin],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${inter.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
