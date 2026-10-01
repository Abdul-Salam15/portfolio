"use client"

import { useState } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"
import { LogoImage } from "@/components/logo-image"
import { type Recommendation } from "@/lib/data"

function Avatar({ rec }: { rec: Recommendation }) {
  const [error, setError] = useState(false)
  if (rec.photo && !error) {
    return (
      <Image
        src={rec.photo}
        alt={rec.name}
        width={48}
        height={48}
        sizes="48px"
        className="h-12 w-12 shrink-0 rounded-full object-cover"
        onError={() => setError(true)}
      />
    )
  }
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
      {rec.initials}
    </span>
  )
}

/**
 * Testimonial card: pull-quote plus attribution (photo/initials, name, role and
 * how they worked with me), with a link out to the recommender's LinkedIn so a
 * reader can verify it. Mirrors the ProjectCard visual language.
 */
export function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <Quote className="h-8 w-8 shrink-0 text-primary/20" aria-hidden="true" />
      <p className="mt-4 flex-1 leading-relaxed text-slate-600">{rec.quote}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-6">
        <Avatar rec={rec} />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-slate-900">{rec.name}</p>
          <p className="text-sm leading-snug text-slate-500">{rec.title}</p>
          <p className="mt-0.5 text-xs font-medium text-primary">{rec.relationship}</p>
        </div>
        <a
          href={rec.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${rec.name} on LinkedIn`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-primary/10"
        >
          <LogoImage src="/linkedin-logo.svg" alt="LinkedIn" className="h-5 w-5" />
        </a>
      </div>
    </div>
  )
}
