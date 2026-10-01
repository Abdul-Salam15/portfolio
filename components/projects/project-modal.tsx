"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Link2, X } from "lucide-react"
import type { Project } from "@/lib/projects"
import { cn } from "@/lib/utils"
import { EdgeCases, ImpactRow, Links, OnePager, ProblemSolution, Video } from "./project-sections"

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

/** clip-path that crops the (already positioned) panel down to `rect`, so it looks like the card. */
function clipTo(panel: DOMRect, rect: DOMRect) {
  const top = Math.max(0, rect.top - panel.top)
  const left = Math.max(0, rect.left - panel.left)
  const right = Math.max(0, panel.right - rect.right)
  const bottom = Math.max(0, panel.bottom - rect.bottom)
  return `inset(${top}px ${right}px ${bottom}px ${left}px round 24px)`
}

const inViewport = (r: DOMRect) => r.bottom > 0 && r.top < window.innerHeight && r.width > 0

export function ProjectModal({
  project,
  navList,
  originRect,
  closing,
  onRequestClose,
  onExited,
  onNavigate,
}: {
  project: Project
  /** The projects prev/next move through (the list visible on the page). */
  navList: Project[]
  /** Card position when opened from a click; null for deep links. */
  originRect: DOMRect | null
  closing: boolean
  onRequestClose: () => void
  onExited: () => void
  onNavigate: (slug: string) => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const [copied, setCopied] = useState(false)

  const index = navList.findIndex((p) => p.slug === project.slug)
  const prev = navList[(index - 1 + navList.length) % navList.length]
  const next = navList[(index + 1) % navList.length]
  const canStep = navList.length > 1

  // ── Open animation: the panel grows out of the card it was opened from ──
  useLayoutEffect(() => {
    const panel = panelRef.current
    const overlay = overlayRef.current
    if (!panel || !overlay || reducedMotion()) return
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: "ease-out" })
    if (isMobile()) {
      panel.animate([{ transform: "translateY(100%)" }, { transform: "translateY(0)" }], { duration: 380, easing: EASE })
      return
    }
    if (originRect) {
      const from = clipTo(panel.getBoundingClientRect(), originRect)
      panel.animate([{ clipPath: from }, { clipPath: "inset(0px 0px 0px 0px round 24px)" }], {
        duration: 460,
        easing: EASE,
      })
      innerRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: 140, easing: "ease-out", fill: "backwards" })
    } else {
      panel.animate(
        [
          { opacity: 0, transform: "scale(0.97)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 260, easing: EASE },
      )
    }
    // Only on mount: switching projects inside the modal uses its own fade below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Close animation: shrink back into the current project's card if it's on screen ──
  useEffect(() => {
    if (!closing) return
    const panel = panelRef.current
    const overlay = overlayRef.current
    if (!panel || !overlay || reducedMotion()) {
      onExited()
      return
    }
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: "ease-in", fill: "forwards" })
    let anim: Animation
    const card = document.querySelector(`[data-project-card="${project.slug}"]`)
    const cardRect = card?.getBoundingClientRect()
    if (isMobile()) {
      anim = panel.animate([{ transform: "translateY(0)" }, { transform: "translateY(100%)" }], {
        duration: 300,
        easing: "ease-in",
        fill: "forwards",
      })
    } else if (cardRect && inViewport(cardRect)) {
      innerRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: "forwards" })
      anim = panel.animate(
        [
          { clipPath: "inset(0px 0px 0px 0px round 24px)", opacity: 1 },
          { clipPath: clipTo(panel.getBoundingClientRect(), cardRect), opacity: 0.6 },
        ],
        { duration: 340, easing: EASE, fill: "forwards" },
      )
    } else {
      anim = panel.animate(
        [
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0.97)" },
        ],
        { duration: 200, easing: "ease-in", fill: "forwards" },
      )
    }
    anim.onfinish = onExited
    return () => anim.cancel()
  }, [closing, onExited, project.slug])

  // ── Switching project with prev/next: back to the top, quick fade ──
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    scrollRef.current?.scrollTo({ top: 0 })
    if (!reducedMotion())
      innerRef.current?.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 240, easing: "ease-out" },
      )
  }, [project.slug])


  const copyLink = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}?project=${project.slug}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked (e.g. insecure context); the URL bar already holds the link
    }
  }, [project.slug])

  const Icon = project.icon

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onRequestClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          ref={overlayRef}
          className="home-redesign fixed inset-0 z-[60] bg-[#081a3d]/55 backdrop-blur-sm"
        />
        <DialogPrimitive.Content
          ref={panelRef}
          aria-describedby="project-modal-summary"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            titleRef.current?.focus()
          }}
          // The gallery returns focus to the card itself once the exit animation ends.
          onCloseAutoFocus={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => {
            e.preventDefault()
            onRequestClose()
          }}
          onPointerDownOutside={(e) => {
            e.preventDefault()
            onRequestClose()
          }}
          onFocusOutside={(e) => e.preventDefault()}
          className={cn(
            "home-redesign font-body fixed inset-0 z-[60] flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl outline-none",
            "md:m-auto md:h-[min(90vh,960px)] md:w-[min(1080px,calc(100vw-3rem))] md:rounded-3xl",
            closing && "pointer-events-none",
          )}
        >
          {/* Header: stays put while the body scrolls */}
          <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:gap-4 md:px-7 md:py-4">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:flex">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <DialogPrimitive.Title
                ref={titleRef}
                tabIndex={-1}
                className="truncate font-display text-lg font-bold text-slate-900 outline-none md:text-xl"
              >
                {project.title}
              </DialogPrimitive.Title>
              <p className="truncate text-[11px] font-bold uppercase tracking-widest text-primary md:text-xs">
                {project.tagLine}
              </p>
            </div>
            <DialogPrimitive.Description id="project-modal-summary" className="sr-only">
              {project.summary}
            </DialogPrimitive.Description>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={copyLink}
                className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex"
              >
                {copied ? <Check className="h-4 w-4 text-primary" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
                <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
              </button>
              {canStep && (
                <div className="flex items-center rounded-full border border-slate-200">
                  <IconButton label={`Previous project: ${prev.title}`} onClick={() => onNavigate(prev.slug)}>
                    <ChevronLeft className="h-5 w-5" />
                  </IconButton>
                  <span className="hidden px-1 text-xs tabular-nums text-slate-500 sm:inline" aria-hidden="true">
                    {index + 1} / {navList.length}
                  </span>
                  <IconButton label={`Next project: ${next.title}`} onClick={() => onNavigate(next.slug)}>
                    <ChevronRight className="h-5 w-5" />
                  </IconButton>
                </div>
              )}
              <IconButton label="Close project details" onClick={onRequestClose} className="ml-1 bg-slate-100 hover:bg-slate-200">
                <X className="h-5 w-5" />
              </IconButton>
            </div>
          </header>

          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div ref={innerRef} className="space-y-10 px-5 py-7 md:px-10 md:py-9">
              <Links project={project} />
              <ImpactRow project={project} />
              <ProblemSolution project={project} />
              <EdgeCases project={project} />
              <Video project={project} />
              <OnePager project={project} />

              {canStep && (
                <div className="grid gap-3 border-t border-slate-200 pt-8 sm:grid-cols-2">
                  <StepLink direction="prev" project={prev} onClick={() => onNavigate(prev.slug)} />
                  <StepLink direction="next" project={next} onClick={() => onNavigate(next.slug)} />
                </div>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function IconButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string
  onClick: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      {children}
    </button>
  )
}

function StepLink({ direction, project, onClick }: { direction: "prev" | "next"; project: Project; onClick: () => void }) {
  const isNext = direction === "next"
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        isNext && "sm:flex-row-reverse sm:text-right",
      )}
    >
      {isNext ? (
        <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      ) : (
        <ArrowLeft className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      )}
      <span className="min-w-0">
        <span className="block text-xs font-bold uppercase tracking-widest text-slate-500">
          {isNext ? "Next project" : "Previous project"}
        </span>
        <span className="block truncate font-display font-bold text-slate-900">{project.title}</span>
      </span>
    </button>
  )
}
