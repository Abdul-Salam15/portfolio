"use client"

import { useState } from "react"
import { ArrowUpRight, type LucideIcon } from "lucide-react"
import { LogoImage } from "@/components/logo-image"

export interface HighlightItem {
  href: string
  logo?: string
  icon?: LucideIcon // fallback mark when no logo (or logo fails to load)
  title: string
  label: string
}

function HighlightLogo({ logo, icon: Icon, alt }: { logo?: string; icon?: LucideIcon; alt: string }) {
  const [error, setError] = useState(false)
  if (logo && !error) {
    return (
      <LogoImage
        src={logo}
        alt={alt}
        width={160}
        height={48}
        sizes="160px"
        className="max-h-12 w-auto max-w-[160px] object-contain object-left"
        onError={() => setError(true)}
      />
    )
  }
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
      {Icon && <Icon className="h-5 w-5 text-primary" />}
    </span>
  )
}

/** Editorial row used across Home + About: logo, title, right-aligned label, ↗, white-card hover lift. */
export function HighlightRow({ item }: { item: HighlightItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-slate-200 px-1.5 py-6 transition-[background-color,padding,box-shadow,border-radius] duration-300 hover:z-10 hover:rounded-2xl hover:border-transparent hover:bg-white hover:px-6 hover:shadow-[0_24px_50px_-38px_rgba(16,18,40,0.5)] md:grid-cols-[96px_1fr_auto] md:gap-6"
    >
      <span className="flex h-14 items-center">
        <HighlightLogo logo={item.logo} icon={item.icon} alt={item.title} />
      </span>
      <span className="order-last col-span-2 font-display text-lg font-medium leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-primary md:order-none md:col-span-1 md:text-xl">
        {item.title}
      </span>
      <span className="flex items-center justify-end gap-3 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-slate-500">
        {item.label}
        <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
      </span>
    </a>
  )
}
