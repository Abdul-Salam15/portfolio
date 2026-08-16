"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  BrainCircuit,
  Server,
  Sparkles,
  Cloud,
  ExternalLink,
  Mic,
  Building2,
  Award,
  type LucideIcon,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { IntroLoader } from "@/components/intro-loader"
import { LogoImage } from "@/components/logo-image"
import { ContactModal } from "@/components/contact-modal"
import { ImageCarousel } from "@/components/image-carousel"
import { HighlightRow } from "@/components/highlight-row"
import { work, WorkCard } from "@/components/work-card"
import { Marquee } from "@/components/marquee"
import { FadeIn, SlideInLeft, SlideInRight, StaggerIn } from "@/components/animations/reveal-animations"
import { profile, experience, speakingImages } from "@/lib/data"

const GITHUB_URL = profile.github
const LINKEDIN_URL = profile.linkedin
const EMAIL = profile.email

const capabilities = [
  "Applied AI",
  "LLM Systems",
  "RAG Pipelines",
  "Agentic AI",
  "Forward-Deployed Engineering",
  "Backend Engineering",
  "API Design",
  "SaaS",
  "Cloud & DevOps",
  "LLM Safety",
  "Fine-Tuning",
  "ML Engineering",
]

const heroStats = [
  { value: `${work.length}`, label: "Products shipped" },
  { value: "23K+", label: "Users reached" },
  { value: "4", label: "Continents" },
]

const services = [
  {
    no: "01",
    title: "AI Research & Development",
    icon: BrainCircuit,
    desc: "Building and evaluating ML, NLP and computer-vision systems with a focus on correctness and real-world use.",
    tags: ["NLP", "Computer Vision", "Fine-tuning"],
  },
  {
    no: "02",
    title: "Backend Engineering",
    icon: Server,
    desc: "Scalable, high-performance APIs and services that stay reliable under real production load.",
    tags: ["Django", "Node.js", "PostgreSQL"],
  },
  {
    no: "03",
    title: "LLM, RAG & Agentic Systems",
    icon: Sparkles,
    desc: "LLM assistants and agents using RAG, the Model Context Protocol and multi-model orchestration.",
    tags: ["RAG", "Agents", "MCP"],
  },
  {
    no: "04",
    title: "Cloud & DevOps",
    icon: Cloud,
    desc: "Containerised deployments and CI/CD pipelines on AWS and GCP, built for scale and repeatability.",
    tags: ["AWS", "GCP", "Docker"],
  },
]

const highlights: { logo?: string; icon: LucideIcon; title: string; label: string; href: string }[] = [
  {
    logo: "/gdg-logo.png",
    icon: Mic,
    title: "Google DevFest · From Lagos to the World: Building Scalable AI Systems That Deliver Impact.",
    label: "Talk · 3K+ attendees",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7406264295312945153/",
  },
  {
    logo: "/linkedin-logo.svg",
    icon: FileText,
    title: "Shipping AI Solutions from Lagos to the World",
    label: "Article · 4K+ impressions",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7344298946644574209/",
  },
  {
    logo: "/nyp-logo.jpg",
    icon: Mic,
    title: "Nigeria Youth Parliament: AI & the Future of Work",
    label: "Talk · 150+ attendees",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7425463424467464193/",
  },
  {
    logo: "/nacos-logo.jpg",
    icon: Award,
    title: "Nigeria Association of Computing Students, Bowen University · President",
    label: "Leadership · 800+ members",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7231974579848531968/",
  },
  {
    logo: "/axiomfuse-logo.png",
    icon: Building2,
    title: "Meet Abdul-Malik Adebayo: Software Engineer at Axiom Fuse",
    label: "Feature",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7426573116140773376/",
  },
  {
    logo: "/brdge-logo.png",
    icon: Building2,
    title: "Tech Journeys That Inspire: Abdul-Malik at Bowen Tech Week 2.0",
    label: "Feature",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7335357587925688321/",
  },
]

function CompanyIdentity({
  company,
  logo,
  website,
  logoType,
}: {
  company: string
  logo?: string
  website?: string
  logoType?: string // "wordmark" = logo already includes the name; otherwise a square mark
}) {
  const [error, setError] = useState(false)
  const showLogo = Boolean(logo) && !error
  const wordmark = logoType === "wordmark"
  const showName = !showLogo || !wordmark

  const mark = !showLogo ? (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
      <Building2 className="h-5 w-5 text-primary" />
    </span>
  ) : wordmark ? (
    <span className="inline-flex items-center">
      <LogoImage
        src={logo!}
        alt={`${company} logo`}
        width={160}
        height={44}
        sizes="160px"
        className="h-7 w-auto"
        onError={() => setError(true)}
      />
    </span>
  ) : (
    <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
      <LogoImage
        src={logo!}
        alt={`${company} logo`}
        width={44}
        height={44}
        sizes="44px"
        className="h-full w-full object-contain"
        onError={() => setError(true)}
      />
    </span>
  )

  const inner = (
    <>
      {mark}
      {showName && (
        <span className="text-xl font-bold text-slate-900 transition-colors group-hover/link:text-primary">
          {company}
        </span>
      )}
      {website && (
        <ExternalLink className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover/link:text-primary" />
      )}
    </>
  )

  if (website) {
    return (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link inline-flex items-center gap-3"
      >
        {inner}
      </a>
    )
  }
  return <div className="flex items-center gap-3">{inner}</div>
}

export default function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const openContact = () => setIsContactModalOpen(true)

  return (
    <div className="home-redesign font-body">
      <IntroLoader />
      <Navigation />

      <main className="pt-20">
        {/* 1. HERO (dark) */}
        <section className="relative overflow-hidden bg-[#081a3d] text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[140px]" />
          <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
            <SlideInLeft className="space-y-8">
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-accent-teal">
                <span className="h-px w-8 bg-accent-teal" /> Adebayo Abdul-Malik
              </p>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-7xl">
                Where AI meets <br />
                <span className="text-primary italic">real-world impact.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                AI &amp; Backend Engineer building production LLM systems and scalable infrastructure for clients
                across the US, Europe, Asia, the Gulf and Africa: RAG pipelines, agentic workflows and cloud, shipped
                with reliability, security and scale.
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
              <div className="grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-bold text-white">{s.value}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </SlideInLeft>

            <SlideInRight className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 bg-primary/20 blur-[90px]" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                {/* The Cloudinary c_crop tightens the full-length studio shot to a head-and-shoulders
                    portrait: it cuts below the chest (hands and watch sat at y~1560 of 2738) and its
                    1469x1574 output matches the 448x480 frame, so object-cover has nothing left to
                    trim. g_face/z_* are silently ignored on this account, hence the explicit crop. */}
                <Image
                  src="https://res.cloudinary.com/dlgzlrzfh/image/upload/c_crop,x_177,y_452,w_1469,h_1574/v1756197152/OBD_1829_puui1n.jpg"
                  alt="Adebayo Abdul-Malik"
                  width={448}
                  height={480}
                  priority
                  sizes="(min-width: 1024px) 448px, 100vw"
                  className="h-[30rem] w-full object-cover"
                />
              </div>
            </SlideInRight>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-slate-400">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </section>

        {/* Capabilities ticker (brand band between hero and content) */}
        <Marquee
          items={capabilities}
          className="border-y border-white/10 bg-[#081a3d] py-4 text-slate-300"
        />

        {/* 2. EXPERIENCE / CAREER (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Experience</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">Where I've built.</h2>
            </FadeIn>

            <div className="relative">
              {/* timeline line */}
              <div className="absolute bottom-6 left-[11px] top-6 w-px bg-slate-200 md:left-[15px]" />
              <StaggerIn staggerDelay={0.15} className="space-y-6">
                {experience.slice(0, 3).map((job) => (
                  <div key={`${job.company}-${job.period}`} className="relative pl-10 md:pl-14">
                    {/* teal node */}
                    <span className="absolute left-0 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 ring-4 ring-slate-50 md:h-8 md:w-8">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <CompanyIdentity
                          company={job.company}
                          logo={job.logo}
                          website={job.website}
                          logoType={job.logoType}
                        />
                        <div className="flex flex-wrap items-center gap-2">
                          {job.employment && (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                              {job.employment}
                            </span>
                          )}
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {job.period}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">{job.location}</p>
                      <div className="mt-4 space-y-0">
                        {job.roles.map((role, i) => {
                          const multi = job.roles.length > 1
                          return (
                            <div key={i} className={multi ? "relative pl-6 pb-5 last:pb-0" : ""}>
                              {multi && (
                                <>
                                  <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                                  {i < job.roles.length - 1 && (
                                    <span className="absolute left-[4px] top-4 h-full w-px bg-slate-200" />
                                  )}
                                </>
                              )}
                              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                <p className="font-semibold text-slate-900">{role.title}</p>
                                {multi && <span className="text-xs font-medium text-slate-500">{role.period}</span>}
                              </div>
                              <p className="mt-1.5 leading-relaxed text-slate-600">{role.summary}</p>
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </StaggerIn>
            </div>

            <div className="mt-10">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
              >
                See full resume <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK (light) — directly after Experience so the proof
            sits with the roles, before any positioning copy. */}
        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Selected Work</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">
                Where I put the work in.
              </h2>
            </FadeIn>

            <StaggerIn staggerDelay={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {work.slice(0, 3).map((p) => (
                <WorkCard key={p.title} item={p} />
              ))}
            </StaggerIn>

            <FadeIn>
              <div className="mt-12 flex justify-center">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  See more of my work <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 4. WHAT I DO (dark) — carries the mid-page dark break that the old
            "Why I build" section used to provide. That section was removed: it
            restated the hero H1 ("Where AI meets real-world impact") and
            duplicated About's "My story" almost line for line. */}
        <section className="relative overflow-hidden bg-[#081a3d] py-24 px-6 text-white">
          <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />
          <div className="relative mx-auto max-w-7xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent-teal">What I do</p>
              <h2 className="mb-14 max-w-2xl font-display text-4xl font-bold md:text-5xl">
                Four ways I help teams ship AI.
              </h2>
            </FadeIn>
            <StaggerIn staggerDelay={0.12} className="grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <div
                  key={s.no}
                  className="group rounded-3xl border border-white/10 bg-slate-900/60 p-8 transition-all hover:-translate-y-1 hover:border-white/25"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-accent-teal">{s.no}</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20 transition-transform group-hover:scale-110">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                  <p className="mb-5 leading-relaxed text-slate-400">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </StaggerIn>
          </div>
        </section>

        {/* 5. SPEAKING & COMMUNITY (light) */}
        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Speaking &amp; Community</p>
              <h2 className="mb-4 font-display text-4xl font-bold text-slate-900 md:text-5xl">Ideas worth sharing.</h2>
              <p className="mb-12 max-w-2xl text-lg text-slate-600">
                From keynote stages to student leadership, sharing what I learn building AI, and helping others get
                there faster.
              </p>
            </FadeIn>

            <FadeIn>
              <ImageCarousel images={speakingImages} className="mb-12" />
            </FadeIn>

            <StaggerIn staggerDelay={0.08} className="border-t border-slate-200">
              {highlights.map((item) => (
                <HighlightRow key={item.href} item={item} />
              ))}
            </StaggerIn>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
              >
                More talks, writing &amp; impact <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. CONTACT CTA (dark) */}
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

      {/* 7. FOOTER (dark) */}
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
