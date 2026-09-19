"use client"

import { useEffect, useRef, useState } from "react"
import { Rocket } from "lucide-react"
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap"
import { TiltCard } from "@/components/tilt-card"
import { LogoImage } from "@/components/logo-image"

export type Role = { title: string; period: string; bullets: string[] }
export type Job = {
  company: string
  logo?: string
  logoType?: "mark" | "wordmark"
  location: string
  employment?: string
  period: string
  roles: Role[]
  tags: string[]
}

function CompanyIdentity({
  company,
  logo,
  logoType,
  dark,
}: {
  company: string
  logo?: string
  logoType?: "mark" | "wordmark"
  dark: boolean
}) {
  const [error, setError] = useState(false)
  const hasLogo = Boolean(logo) && !error
  const ring = dark ? "ring-white/10" : "ring-slate-200"

  if (hasLogo && logoType === "wordmark") {
    return (
      <span className={`flex h-11 items-center rounded-xl bg-white px-3 ring-1 ${ring}`}>
        <LogoImage
          src={logo!}
          alt={company}
          width={160}
          height={44}
          sizes="160px"
          className="h-6 w-auto max-w-[160px] object-contain md:h-7"
          onError={() => setError(true)}
        />
      </span>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {hasLogo ? (
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ${ring}`}>
          <LogoImage
            src={logo!}
            alt={company}
            width={44}
            height={44}
            sizes="44px"
            className="h-full w-full object-contain"
            onError={() => setError(true)}
          />
        </span>
      ) : (
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ring-1 ${
            dark ? "bg-primary/15 text-accent-teal ring-white/10" : "bg-primary/10 text-primary ring-slate-200"
          }`}
        >
          {company.slice(0, 2).toUpperCase()}
        </span>
      )}
      <h3 className={`font-display text-xl font-bold md:text-2xl ${dark ? "text-white" : "text-slate-900"}`}>
        {company}
      </h3>
    </div>
  )
}

/**
 * Scroll-choreographed experience timeline: sticky chapter rail (desktop) +
 * scrub-revealed glass role cards (all devices) with hover tilt (desktop).
 * `variant` recolors it for a dark section ("dark", default) or a light
 * section ("light") so it can slot into either page rhythm.
 */
export function CareerTimeline({ experience, variant = "dark" }: { experience: Job[]; variant?: "light" | "dark" }) {
  const dark = variant === "dark"
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const scrub = { trigger: listRef.current, start: "top 55%", end: "bottom 70%", scrub: true }
      if (fillRef.current && listRef.current) {
        gsap.fromTo(fillRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: scrub })
      }
      // traveling marker rides the spine with scroll (down and up)
      if (markerRef.current && railRef.current && listRef.current) {
        const travel = railRef.current.offsetHeight - 24
        gsap.fromTo(markerRef.current, { y: 0 }, { y: travel, ease: "none", scrollTrigger: scrub })
      }
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        // scrub reveal -> continuous motion on scroll (works on touch)
        gsap.fromTo(
          card,
          { opacity: 0, y: 70, rotateX: -6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 92%", end: "top 52%", scrub: true },
          },
        )
        // reliable active tracking (fires even for short last card)
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
      })
    })
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [experience.length])

  return (
    <div className="grid gap-10 md:grid-cols-[240px_1fr] md:gap-16">
      {/* Sticky chapter rail (desktop) */}
      <div className="hidden md:block">
        <div className="sticky top-28">
          <p className={`mb-6 font-code text-xs font-bold uppercase tracking-widest ${dark ? "text-slate-500" : "text-slate-400"}`}>
            {String(active + 1).padStart(2, "0")} / {String(experience.length).padStart(2, "0")}
          </p>
          <div ref={railRef} className="relative pl-6">
            <div className={`absolute bottom-2 left-[3px] top-2 w-px ${dark ? "bg-white/10" : "bg-slate-200"}`} />
            <div ref={fillRef} className="absolute bottom-2 left-[3px] top-2 w-px origin-top scale-y-0 bg-primary" />
            <div
              ref={markerRef}
              className="absolute -left-[9px] top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_18px_rgba(3,70,148,0.6)]"
              aria-hidden
            >
              <Rocket className="h-3.5 w-3.5 rotate-90" />
            </div>
            <ul className="space-y-5">
              {experience.map((job, i) => (
                <li key={job.company + job.period} className="relative">
                  <span
                    className={`absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full ring-4 transition-colors ${
                      dark ? "ring-[#081a3d]" : "ring-slate-50"
                    } ${i <= active ? "bg-primary" : dark ? "bg-white/20" : "bg-slate-300"}`}
                  />
                  <p
                    className={`font-display text-sm leading-tight transition-colors ${
                      i === active
                        ? dark
                          ? "font-semibold text-white"
                          : "font-semibold text-slate-900"
                        : dark
                          ? "text-slate-500"
                          : "text-slate-400"
                    }`}
                  >
                    {job.company}
                  </p>
                  <p className={`text-xs ${dark ? "text-slate-600" : "text-slate-400"}`}>{job.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Role cards */}
      <div ref={listRef} className="space-y-6 [perspective:1200px] md:space-y-8">
        {experience.map((job, i) => (
          <div
            key={job.company + job.period}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
          >
            <TiltCard className="rounded-3xl">
              <div
                className={`rounded-3xl border p-7 md:p-9 ${
                  dark
                    ? "border-white/10 bg-white/[0.04] shadow-[0_24px_60px_-34px_rgba(0,0,0,0.7)] backdrop-blur-sm"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3">
                  <CompanyIdentity company={job.company} logo={job.logo} logoType={job.logoType} dark={dark} />
                  <div className="flex flex-wrap items-center gap-2">
                    {job.employment && (
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          dark ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {job.employment}
                      </span>
                    )}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        dark ? "bg-primary/15 text-accent-teal" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {job.period}
                    </span>
                  </div>
                </div>
                <p className={`mt-1 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{job.location}</p>

                <div className="mt-6 space-y-6">
                  {job.roles.map((role) => {
                    const multi = job.roles.length > 1
                    return (
                      <div key={role.title}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <p className={`text-balance font-semibold ${dark ? "text-white" : "text-slate-900"}`}>{role.title}</p>
                          {multi && (
                            <span className={`text-xs font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>
                              {role.period}
                            </span>
                          )}
                        </div>
                        <ul className="mt-2.5 space-y-2">
                          {role.bullets.map((b, bi) => (
                            <li
                              key={bi}
                              className={`flex gap-3 text-[15px] leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>

                {job.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          dark ? "border-white/15 text-slate-400" : "border-slate-200 text-slate-500"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </div>
  )
}
