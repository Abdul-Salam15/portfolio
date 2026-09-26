"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContactModal } from "@/components/contact-modal"
import { profile } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Resume", href: "/resume" },
  { name: "Portfolio", href: "/portfolio" },
]

// Real brand marks as currentColor paths so they sit monochrome with the rest of
// the nav and pop to their brand colour on hover (see the wrapper's hover:text-*).
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const iconLinkClass =
  "flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-primary/10"

export function Navigation() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex shrink-0 items-center" aria-label={`${profile.name}, home`}>
              <Image src="/logo.png" alt={`${profile.name} logo`} width={44} height={44} className="h-11 w-11" priority />
            </Link>

            {/* Pill + icons grouped on the right so the bar reads as one unit
                instead of three widely-spaced zones with a hollow centre. */}
            <div className="flex items-center gap-3">
              {/* Always-visible segmented pill: every page is one tap away on all
                  screen sizes, active page highlighted, no hidden hamburger. */}
              <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-1">
                {navigation.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>

              {/* Contact + social: monochrome by default, brand colour on hover.
                  Desktop only; mobile relies on each page's "Get in touch" CTA
                  and the footer. */}
              <div className="hidden items-center gap-1 md:flex">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className={cn(iconLinkClass, "hover:text-primary")}
                  aria-label="Contact via Email"
                >
                  <Mail className="h-[18px] w-[18px]" />
                </button>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={cn(iconLinkClass, "hover:text-[#181717]")}
                >
                  <GitHubIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={cn(iconLinkClass, "hover:text-[#0A66C2]")}
                >
                  <LinkedInIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  )
}
