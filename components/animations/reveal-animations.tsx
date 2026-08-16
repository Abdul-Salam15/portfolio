"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

interface AnimationProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

// Fade In Animation
export function FadeIn({ children, delay = 0, duration = 0.8, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (reduced()) {
      gsap.set(element, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Slide In From Left
export function SlideInLeft({ children, delay = 0, duration = 0.8, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (reduced()) {
      gsap.set(element, { opacity: 1, x: 0 })
      return
    }

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Slide In From Right
export function SlideInRight({ children, delay = 0, duration = 0.8, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (reduced()) {
      gsap.set(element, { opacity: 1, x: 0 })
      return
    }

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Scale In Animation
export function ScaleIn({ children, delay = 0, duration = 0.8, className = "" }: AnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (reduced()) {
      gsap.set(element, { opacity: 1, scale: 1 })
      return
    }

    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Stagger Animation for multiple children
export function StaggerIn({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
}: AnimationProps & { staggerDelay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const childElements = container.children

    if (reduced()) {
      gsap.set(childElements, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(
      childElements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        stagger: staggerDelay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [delay, staggerDelay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Hero Text Animation (for landing page)
export function HeroTextAnimation({ children, className = "" }: { children: ReactNode; className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (reduced()) {
      gsap.set(element.children, { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline()

    tl.fromTo(
      element.children,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      },
    )
  }, [])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Line-by-line mask/3D reveal for headings (SplitText). Reduced-motion renders plain text.
export function LineReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const ctx = gsap.context(() => {
      gsap.set(el, { perspective: 700 })
      const split = new SplitText(el, { type: "lines", linesClass: "aa-reveal-line" })
      gsap.from(split.lines, {
        yPercent: 120,
        opacity: 0,
        rotateX: -55,
        transformOrigin: "top center",
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.12,
        delay,
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
      })
    }, el)
    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={ref} className={`[&_.aa-reveal-line]:overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

// Floating Animation
export function FloatingAnimation({ children, className = "" }: { children: ReactNode; className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (reduced()) return

    gsap.to(element, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    })
  }, [])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
