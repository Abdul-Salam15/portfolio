"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * First-load intro: cycles a few words, reveals the brand, then a four-panel
 * curtain lifts to expose the page. Plays once per session, and is skipped
 * entirely for reduced-motion users.
 *
 * Rendered on every top-level page, not just home, because plenty of visitors
 * arrive on a shared deep link (/portfolio, /resume) and would otherwise never
 * see it. The `introSeen` session flag means only the FIRST page opened plays
 * it; every later page in that session renders nothing.
 *
 * Timing mirrors brdge.ai's intro (wordDur 780, out lead 240, brand 560).
 */
const WORDS = ["Backend.", "Agentic AI.", "LLMs.", "RAG.", "Cloud & DevOps."]
const CLOSER = "Abdul-Malik Adebayo" // final brand beat; blue period is appended

const SETTLE_MS = 120 // small buffer after fonts/paint are ready before the first word
const WORD_MS = 780 // each word's visible window (brdge: wordDur)
const OUT_LEAD = 240 // start leaving this long before the next word (brdge: wordDur - 240)
const BRAND_MS = 560 // brand frame hold before the curtain (brdge: brandDur)
const CURTAIN_MS = 1600 // panel slide duration (brdge: 1.6s)

type WordState = "idle" | "in" | "out"
type Phase = "words" | "brand" | "curtain" | "hidden"

function withAccentDot(text: string) {
  return text.endsWith(".") ? (
    <>
      {text.slice(0, -1)}
      <span className="text-accent-teal">.</span>
    </>
  ) : (
    <>{text}</>
  )
}

/**
 * Module scope, so it resets on a real document load but survives client-side
 * navigation. Without it, moving from /about to /portfolio would remount this
 * component and paint the opaque curtain for one frame before the effect could
 * hide it, i.e. a blue flash on every in-app link.
 */
let mountedThisDocument = false

export function IntroLoader() {
  // Captured at first render: is this the entry page of this document, or a
  // later client-side navigation within it?
  const [isEntryPage] = useState(() => !mountedThisDocument)
  const [phase, setPhase] = useState<Phase>(isEntryPage ? "words" : "hidden")
  const [states, setStates] = useState<WordState[]>(() => WORDS.map(() => "idle"))

  useEffect(() => {
    mountedThisDocument = true
    if (!isEntryPage) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let seen = false
    try {
      seen = sessionStorage.getItem("introSeen") === "1"
    } catch {}

    if (reduced || seen) {
      setPhase("hidden")
      return
    }

    try {
      sessionStorage.setItem("introSeen", "1")
    } catch {}

    document.body.style.overflow = "hidden"

    const set = (i: number, s: WordState) =>
      setStates((prev) => {
        const next = [...prev]
        next[i] = s
        return next
      })

    const timers: ReturnType<typeof setTimeout>[] = []
    let cancelled = false
    let rafId = 0

    const schedule = () => {
      if (cancelled) return
      WORDS.forEach((_, i) => {
        timers.push(setTimeout(() => set(i, "in"), i * WORD_MS))
        timers.push(setTimeout(() => set(i, "out"), i * WORD_MS + (WORD_MS - OUT_LEAD)))
      })

      const afterWords = WORDS.length * WORD_MS
      timers.push(setTimeout(() => setPhase("brand"), afterWords))
      timers.push(setTimeout(() => setPhase("curtain"), afterWords + BRAND_MS))
      timers.push(
        setTimeout(() => {
          setPhase("hidden")
          document.body.style.overflow = ""
        }, afterWords + BRAND_MS + CURTAIN_MS + 300),
      )
    }

    // Start only once fonts are loaded and we've painted a frame, so slow
    // mobile loads don't fire (and batch) the early word timers before the
    // words can actually render. The words use var(--font-display).
    const begin = () => {
      if (cancelled) return
      // one rAF ensures the first paint has happened before timing starts
      rafId = requestAnimationFrame(() => {
        if (cancelled) return
        timers.push(setTimeout(schedule, SETTLE_MS))
      })
    }

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    if (fonts?.ready) {
      fonts.ready.then(begin, begin)
    } else {
      begin()
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      timers.forEach(clearTimeout)
      document.body.style.overflow = ""
    }
  }, [isEntryPage])

  const skip = () => {
    if (phase === "hidden" || phase === "curtain") return
    setPhase("curtain")
    setTimeout(() => {
      setPhase("hidden")
      document.body.style.overflow = ""
    }, CURTAIN_MS + 300)
  }

  if (phase === "hidden") return null

  const lifting = phase === "curtain"
  const showBrand = phase === "brand" || phase === "curtain"

  return (
    <div
      className="home-redesign font-body fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
      onClick={skip}
      aria-hidden
    >
      <style>{`
        @keyframes introWordIn { from { opacity: 0; transform: translate(-50%, 34px); filter: blur(6px); } to { opacity: 1; transform: translate(-50%, 0); filter: blur(0); } }
        @keyframes introWordOut { from { opacity: 1; transform: translate(-50%, 0); filter: blur(0); } to { opacity: 0; transform: translate(-50%, -34px); filter: blur(6px); } }
        .intro-w {
          position: absolute; left: 50%; transform: translate(-50%, 34px);
          font-family: var(--font-display); font-weight: 800; letter-spacing: -2.5px; line-height: 1;
          font-size: clamp(40px, 7vw, 88px); white-space: nowrap; color: #fff; opacity: 0;
          will-change: transform, opacity, filter;
        }
        .intro-w--in { animation: introWordIn .7s cubic-bezier(.22,1,.36,1) forwards; }
        .intro-w--out { animation: introWordOut .55s cubic-bezier(.22,1,.36,1) forwards; }
        /* the brand/name beat: smaller than the single words, wraps on narrow screens */
        .intro-w--brand { font-size: clamp(34px, 6vw, 72px); white-space: normal; max-width: min(92vw, 820px); text-align: center; line-height: 1.05; }
      `}</style>

      {/* Curtain panels — the opaque cover that lifts to reveal the page */}
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((n) => (
          <div
            key={n}
            className={cn(
              "h-full flex-1 bg-[#034694] transition-transform ease-[cubic-bezier(0.85,0,0.15,1)]",
              lifting && "-translate-y-[101%]",
            )}
            style={{ transitionDuration: `${CURTAIN_MS}ms`, transitionDelay: `${n * 50}ms` }}
          />
        ))}
      </div>

      {/* Word / brand stage */}
      <div
        className={cn(
          "relative z-10 flex h-[120px] w-full max-w-[900px] items-center justify-center px-12 transition-all duration-500",
          lifting && "-translate-y-12 opacity-0",
        )}
      >
        {WORDS.map((word, i) => (
          <p
            key={word}
            className={cn(
              "intro-w",
              states[i] === "in" && "intro-w--in",
              states[i] === "out" && "intro-w--out",
            )}
          >
            {withAccentDot(word)}
          </p>
        ))}

        {showBrand && (
          <p className="intro-w intro-w--brand intro-w--in">
            {CLOSER}
            <span className="text-accent-teal">.</span>
          </p>
        )}
      </div>
    </div>
  )
}
