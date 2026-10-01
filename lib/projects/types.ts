import type { LucideIcon } from "lucide-react"

export type ProjectCategory = "AI & Backend" | "Full-stack" | "Automation"

/** A measurable result, shown in the modal's "Impact" row. */
export type Impact = { value: string; label: string }

/** One edge case: a short title and one sentence on how the system handles it. */
export type EdgeCase = { title: string; handling: string }

export type Project = {
  // ── Card ──────────────────────────────────────────────
  slug: string
  title: string
  icon: LucideIcon
  categories: ProjectCategory[]
  featured: boolean
  tagLine: string
  timeline: string
  /** Client or context. Leave out and set `personal` for personal projects. */
  builtFor?: string
  personal?: boolean
  techStack: string[]
  /** 1–2 sentences for the card: the problem and what I built. */
  summary: string

  // ── Modal ─────────────────────────────────────────────
  /** Only for projects with measurable results; leave out otherwise and the row is hidden. */
  impact?: Impact[]
  problem: string
  solution: string
  edgeCases: EdgeCase[]
  /** Loom, Google Drive or YouTube share link. Hidden when left out. */
  videoUrl?: string
  /** Google Doc (or any URL), opened in a new tab. Hidden when left out. */
  onePagerUrl?: string
  githubUrl?: string
  /** Shows a "Private repo" note instead of the GitHub button. */
  repoPrivate?: boolean
  liveUrl?: string
}
