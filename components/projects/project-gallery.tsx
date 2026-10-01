"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { StaggerIn } from "@/components/animations/reveal-animations"
import { getProject, projects as allProjects, type Project } from "@/lib/projects"
import { ProjectCard } from "./project-card"
import { ProjectModal } from "./project-modal"

const PARAM = "project"

const urlWith = (slug: string | null) => {
  const u = new URL(window.location.href)
  if (slug) u.searchParams.set(PARAM, slug)
  else u.searchParams.delete(PARAM)
  return u.pathname + u.search + u.hash
}

/**
 * Card grid + project modal, kept in sync with ?project=<slug>:
 * - opening from a card pushes a history entry, so Back closes the modal;
 * - prev/next replaces the entry, so Back still closes rather than stepping through projects;
 * - a deep link opens the modal on load, and closing it just strips the param.
 */
export function ProjectGallery({
  projects,
  showStack = false,
  className,
  staggerKey,
}: {
  projects: Project[]
  showStack?: boolean
  className?: string
  /** Change to replay the stagger-in animation (e.g. when a filter changes). */
  staggerKey?: string
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [closing, setClosing] = useState(false)
  const originRef = useRef<DOMRect | null>(null)
  /** True when the current modal has its own history entry that Back should pop. */
  const pushedRef = useRef(false)
  const activeRef = useRef<string | null>(null)
  activeRef.current = activeSlug

  const show = useCallback((slug: string, origin: DOMRect | null) => {
    originRef.current = origin
    setClosing(false)
    setActiveSlug(slug)
  }, [])

  const beginClose = useCallback(() => {
    if (activeRef.current) setClosing(true)
  }, [])

  // Deep link on load, and Back/Forward while on the page.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get(PARAM)
    if (getProject(initial)) show(initial!, null)

    const onPopState = () => {
      const slug = new URLSearchParams(window.location.search).get(PARAM)
      if (slug && getProject(slug)) {
        pushedRef.current = true // Forward re-opened it; the entry behind has no param
        if (slug !== activeRef.current) show(slug, null)
      } else {
        pushedRef.current = false
        beginClose()
      }
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [show, beginClose])

  const open = (project: Project, origin: HTMLElement) => {
    window.history.pushState(window.history.state, "", urlWith(project.slug))
    pushedRef.current = true
    show(project.slug, origin.getBoundingClientRect())
  }

  const requestClose = useCallback(() => {
    if (pushedRef.current) {
      pushedRef.current = false
      window.history.back() // popstate → beginClose
    } else {
      window.history.replaceState(window.history.state, "", urlWith(null))
      beginClose()
    }
  }, [beginClose])

  const navigate = useCallback((slug: string) => {
    window.history.replaceState(window.history.state, "", urlWith(slug))
    originRef.current = null
    setActiveSlug(slug)
  }, [])

  const returnFocusTo = useRef<string | null>(null)
  const onExited = useCallback(() => {
    returnFocusTo.current = activeRef.current
    setActiveSlug(null)
    setClosing(false)
  }, [])

  // Return focus to the card of the project the reader ended on. This has to wait until
  // the dialog (and its focus trap) has unmounted, or the trap pulls focus straight back.
  useEffect(() => {
    if (activeSlug || !returnFocusTo.current) return
    const slug = returnFocusTo.current
    returnFocusTo.current = null
    const t = setTimeout(() => {
      document.querySelector<HTMLElement>(`[data-project-trigger="${slug}"]`)?.focus({ preventScroll: true })
    }, 0)
    return () => clearTimeout(t)
  }, [activeSlug])

  const active = getProject(activeSlug)
  // Prev/next walks the list shown on this page; a deep link to a project that isn't
  // on this page (e.g. a non-featured one on the home page) walks every project.
  const navList = active && projects.some((p) => p.slug === active.slug) ? projects : allProjects

  return (
    <>
      <StaggerIn key={staggerKey} staggerDelay={0.1} className={className}>
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} showStack={showStack} onOpen={open} />
        ))}
      </StaggerIn>
      {active && (
        <ProjectModal
          project={active}
          navList={navList}
          originRect={originRef.current}
          closing={closing}
          onRequestClose={requestClose}
          onExited={onExited}
          onNavigate={navigate}
        />
      )}
    </>
  )
}
