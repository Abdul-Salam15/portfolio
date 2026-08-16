"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { IntroLoader } from "@/components/intro-loader"
import { ContactModal } from "@/components/contact-modal"
import { work, workCategories, WorkCard, type WorkCategory } from "@/components/work-card"
import { FadeIn, SlideInLeft, StaggerIn } from "@/components/animations/reveal-animations"
import { profile } from "@/lib/data"

const GITHUB_URL = profile.github
const LINKEDIN_URL = profile.linkedin
const EMAIL = profile.email

const stats = [
  { value: `${work.length}`, label: "Products shipped" },
  { value: "23K+", label: "Users reached" },
  { value: "4", label: "Continents" },
]

type Filter = WorkCategory | "All"
const filters: Filter[] = ["All", ...workCategories]

export default function PortfolioPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [filter, setFilter] = useState<Filter>("All")
  const openContact = () => setIsContactModalOpen(true)

  const visible = filter === "All" ? work : work.filter((item) => item.category === filter)

  return (
    <div className="home-redesign font-body">
      <IntroLoader />
      <Navigation />

      <main className="pt-20">
        {/* 1. INTRO (dark) */}
        <section className="relative overflow-hidden bg-[#081a3d] text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative mx-auto max-w-3xl px-6 py-24">
            <SlideInLeft className="space-y-8">
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-accent-teal">
                <span className="h-px w-8 bg-accent-teal" /> Portfolio
              </p>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">
                The work, <br />
                <span className="text-primary italic">end to end.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                Production AI and backend systems I've built for teams in London, the Gulf and Southeast Asia, from
                Lagos. Some clients are public, others stay confidential, so a few of these are described without the
                name attached.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/resume"
                  className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <FileText className="h-4 w-4" /> View Resume
                </Link>
                <button
                  onClick={openContact}
                  className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold transition-colors hover:border-white/60"
                >
                  Work with me <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <dl className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-3xl font-extrabold text-white md:text-4xl">{s.value}</dt>
                    <dd className="mt-1 text-xs uppercase tracking-widest text-slate-400">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </SlideInLeft>
          </div>
        </section>

        {/* 2. ALL WORK (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Selected Work</p>
              <h2 className="mb-8 font-display text-4xl font-bold text-slate-900 md:text-5xl">
                Everything I've shipped.
              </h2>
            </FadeIn>

            <FadeIn>
              <div className="mb-12 flex flex-wrap gap-3">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={
                      filter === f
                        ? "rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors"
                        : "rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary"
                    }
                  >
                    {f}
                  </button>
                ))}
              </div>
            </FadeIn>

            <StaggerIn key={filter} staggerDelay={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <WorkCard key={item.title} item={item} showStack />
              ))}
            </StaggerIn>
          </div>
        </section>

        {/* 3. HOW I WORK (light) */}
        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">A note on confidentiality</p>
              <h2 className="mb-6 font-display text-4xl font-bold text-slate-900 md:text-5xl">
                Some of the best work stays quiet.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
                Client engagements come with NDAs, so a few systems here are described by what they do rather than who
                they were for. Where an employer has published a case study naming the client, I link straight to it.
                Happy to talk through the architecture and trade-offs of any of them in a conversation.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                On the full-stack builds I own the AI and backend end to end, then build the interface myself, driving
                coding assistants like Claude Code and Cursor to translate the Figma designs into working UI. It keeps
                the delivery fast without handing off the parts that matter: the architecture, the model behaviour and
                the API contract stay mine.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={openContact}
                  className="flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Ask me about a project <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="/about"
                  className="flex items-center gap-2 rounded-full border border-slate-200 px-7 py-3.5 font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary"
                >
                  More about me
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 4. CONTACT CTA (dark) */}
        <section className="relative overflow-hidden bg-[#081a3d] py-28 px-6 text-center text-white">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative mx-auto max-w-3xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent-teal">Let's talk</p>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
                Let's build something <span className="text-primary">ambitious.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
                Whether it's an AI system, a backend platform or a research collaboration, let's start a conversation.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button
                  onClick={openContact}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Get in touch <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 font-semibold transition-colors hover:border-white/60"
                >
                  <Linkedin className="h-4 w-4" /> Connect on LinkedIn
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* 5. FOOTER (dark) */}
      <footer className="bg-[#081a3d] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold">Adebayo Abdul-Malik</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              AI &amp; Backend Engineer building production LLM systems, backends and cloud infrastructure.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Explore</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/resume" className="hover:text-primary">Resume</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Connect</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">
          <span>© {new Date().getFullYear()} Adebayo Abdul-Malik.</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
