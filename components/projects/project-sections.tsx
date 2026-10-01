"use client"

import { useState, type ReactNode } from "react"
import { Check, ExternalLink, FileText, Github, Loader2, Lock, PlayCircle } from "lucide-react"
import type { Project } from "@/lib/projects"
import { documentThumbnailUrl, videoEmbedUrl } from "@/lib/projects/embed"
import { cn } from "@/lib/utils"

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">{title}</h3>
      {children}
    </section>
  )
}

export function ImpactRow({ project: p }: { project: Project }) {
  if (!p.impact?.length) return null
  return (
    <Section title="Impact">
      <dl className={cn("grid gap-3", p.impact.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
        {p.impact.map((i) => (
          <div key={i.label} className="flex flex-col-reverse justify-end rounded-2xl border border-primary/10 bg-primary/5 p-5">
            <dt className="mt-1 text-sm leading-snug text-slate-600">{i.label}</dt>
            <dd className="font-display text-3xl font-extrabold text-[#081a3d]">{i.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export function ProblemSolution({ project: p }: { project: Project }) {
  const card = "rounded-2xl border p-6"
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className={cn(card, "border-slate-200 bg-slate-50/70")}>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">The problem</h3>
        <p className="text-[15px] leading-relaxed text-slate-700">{p.problem}</p>
      </section>
      <section className={cn(card, "border-primary/20 bg-white")}>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">The solution</h3>
        <p className="text-[15px] leading-relaxed text-slate-700">{p.solution}</p>
      </section>
    </div>
  )
}

export function EdgeCases({ project: p }: { project: Project }) {
  if (!p.edgeCases.length) return null
  return (
    <Section title="Edge cases I covered">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {p.edgeCases.map((e) => (
          <li key={e.title} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="flex gap-2 font-display text-[15px] font-bold leading-snug text-slate-900">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {e.title}
            </p>
            <p className="mt-2 pl-6 text-sm leading-relaxed text-slate-600">{e.handling}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Video({ project: p }: { project: Project }) {
  const [loaded, setLoaded] = useState(false)
  if (!p.videoUrl) return null
  const embed = videoEmbedUrl(p.videoUrl)
  return (
    <Section title="Video walkthrough">
      {embed ? (
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center" role="status">
              <Loader2 className="h-8 w-8 animate-spin text-white/70" aria-hidden="true" />
              <span className="sr-only">Loading video…</span>
            </div>
          )}
          <iframe
            src={embed}
            title={`${p.title} video walkthrough`}
            className="relative h-full w-full"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <a
          href={p.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <PlayCircle className="h-4 w-4" aria-hidden="true" /> Watch the walkthrough
        </a>
      )}
    </Section>
  )
}

export function OnePager({ project: p }: { project: Project }) {
  const [thumbFailed, setThumbFailed] = useState(false)
  if (!p.onePagerUrl) return null
  const thumb = documentThumbnailUrl(p.onePagerUrl)
  return (
    <Section title="One-pager">
      <div className="flex items-center gap-5 rounded-2xl border border-slate-200 p-5">
        <div className="flex aspect-[8.5/11] w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm">
          {thumb && !thumbFailed ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote Google thumbnail, not worth an optimizer entry
            <img
              src={thumb}
              alt=""
              className="h-full w-full object-cover object-top"
              loading="lazy"
              onError={() => setThumbFailed(true)}
            />
          ) : (
            <FileText className="h-8 w-8 text-slate-300" aria-hidden="true" />
          )}
        </div>
        <div className="space-y-3">
          <p className="text-sm text-slate-600">A one-page summary of the project.</p>
          <a
            href={p.onePagerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            View / Download <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </Section>
  )
}

export function Links({ project: p }: { project: Project }) {
  const showCode = !!p.githubUrl && !p.repoPrivate
  if (!showCode && !p.liveUrl && !p.repoPrivate) return null
  return (
    <div className="flex flex-wrap items-center gap-3">
      {showCode && (
        <a
          href={p.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#081a3d] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <Github className="h-4 w-4" aria-hidden="true" /> View code
          <span className="sr-only">(opens GitHub in a new tab)</span>
        </a>
      )}
      {p.liveUrl && (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
      {p.repoPrivate && (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Private repo
        </span>
      )}
    </div>
  )
}
