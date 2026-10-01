"use client"

import type React from "react"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/lib/projects"

/**
 * Shared project card for the home page (featured) and the portfolio grid.
 * The whole card is clickable via a stretched "View details" link, which keeps a
 * real href (?project=slug) so cmd/ctrl-click and copy-link still work.
 *
 * The outer div is what StaggerIn animates (GSAP writes an inline transform on it),
 * so the hover lift lives on the inner <article> and the two never fight.
 */
export function ProjectCard({
  project,
  showStack = false,
  onOpen,
}: {
  project: Project
  showStack?: boolean
  onOpen: (project: Project, origin: HTMLElement) => void
}) {
  const Icon = project.icon

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks open the deep link in a new tab as normal.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    const card = e.currentTarget.closest("article")
    onOpen(project, (card as HTMLElement) ?? e.currentTarget)
  }

  return (
    <div className="h-full">
      <article
        data-project-card={project.slug}
        className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg has-[a:focus-visible]:border-primary has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-primary has-[a:focus-visible]:ring-offset-2 motion-reduce:hover:translate-y-0"
      >
        <div className="mb-5 flex h-12 items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{project.summary}</p>

        {/* Everything below is pinned to the bottom so dividers and footers line up across a row. */}
        <div className="mt-auto pt-5">
          {showStack && (
            <ul className="mb-5 flex flex-wrap gap-2" aria-label="Tech stack">
              {project.techStack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{project.tagLine}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-200 pt-4">
            <BuiltFor project={project} />
            <span className="ml-auto text-xs text-slate-500">{project.timeline}</span>
          </div>

          <a
            href={`?project=${project.slug}`}
            onClick={handleClick}
            aria-haspopup="dialog"
            data-project-trigger={project.slug}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none after:absolute after:inset-0 after:rounded-3xl after:content-['']"
          >
            View details
            <span className="sr-only">: {project.title}</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </article>
    </div>
  )
}

function BuiltFor({ project }: { project: Project }) {
  if (project.personal) return <span className="text-xs font-semibold text-slate-900">Personal project</span>
  if (!project.builtFor) return null
  return (
    <span className="text-xs text-slate-500">
      Built for <span className="font-semibold text-slate-900">{project.builtFor}</span>
    </span>
  )
}
