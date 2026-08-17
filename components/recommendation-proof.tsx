"use client"

import { useState } from "react"
import Image from "next/image"
import { recommendations, type Recommendation } from "@/lib/data"

/** Small overlapping avatar with initials fallback, sized for the hero proof strip. */
function MiniAvatar({ rec }: { rec: Recommendation }) {
  const [error, setError] = useState(false)
  const ring = "ring-2 ring-[#081a3d]"
  if (rec.photo && !error) {
    return (
      <Image
        src={rec.photo}
        alt={rec.name}
        width={32}
        height={32}
        sizes="32px"
        className={`h-8 w-8 rounded-full object-cover ${ring}`}
        onError={() => setError(true)}
      />
    )
  }
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary/40 text-[10px] font-bold text-white ${ring}`}
    >
      {rec.initials}
    </span>
  )
}

/**
 * Above-the-fold social proof: a row of recommender avatars plus a one-line
 * "recommended by" label, linking down to the full Recommendations section.
 * Lives in the (dark) hero, so text is light and the avatar rings match the
 * hero navy to separate the overlaps.
 */
export function RecommendationProof({
  label = "Recommended by leaders at BRDGE, Coutts & Axiomfuse",
}: {
  label?: string
}) {
  const shown = recommendations.slice(0, 3)
  if (shown.length === 0) return null

  return (
    <a
      href="#recommendations"
      className="group flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3"
      aria-label="See recommendations"
    >
      <div className="flex shrink-0 -space-x-2">
        {shown.map((rec) => (
          <MiniAvatar key={rec.linkedin} rec={rec} />
        ))}
      </div>
      <span className="text-sm leading-snug text-slate-400 transition-colors group-hover:text-slate-200">
        {label}
      </span>
    </a>
  )
}
