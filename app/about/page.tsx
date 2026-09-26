"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, FileText, Github, Linkedin, Mail, GraduationCap, Award } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { IntroLoader } from "@/components/intro-loader"
import { ContactModal } from "@/components/contact-modal"
import { ImageCarousel } from "@/components/image-carousel"
import { HighlightRow, type HighlightItem } from "@/components/highlight-row"
import { TechStack } from "@/components/tech-stack"
import { FadeIn, SlideInLeft, SlideInRight, StaggerIn } from "@/components/animations/reveal-animations"
import { profile, speakingImages } from "@/lib/data"

const GITHUB_URL = profile.github
const LINKEDIN_URL = profile.linkedin
const EMAIL = profile.email

const education = {
  school: "Bowen University",
  degree: "BSc Computer Science · First Class Honours",
  location: "Osun State, Nigeria",
  coursework:
    "Statistical Methods, Discrete Structures, Data Structures and Algorithms, Programming in Low-Level Languages, Foundations of Sequential Programs, Knowledge Acquisition, System Analysis and Design",
  award: "DataCamp Certifications",
  awardDesc: "Working with the OpenAI API · Google: Agent Fundamentals · Introduction to AI Agents",
}

const leadership: HighlightItem[] = [
  {
    logo: "/gdg-logo.png",
    title: "GDG On Campus Bowen University, Co-Organizer",
    label: "25 execs · 500+ students",
    href: "https://www.linkedin.com/in/abdul-salam-adebayo",
  },
  {
    logo: "/btw-logo.jpg",
    title: "Bowen Tech Week, President",
    label: "1,000+ attendees",
    href: "https://www.linkedin.com/in/abdul-salam-adebayo",
  },
  {
    logo: "/mllagos-logo.jpg",
    title: "Machine Learning Lagos, Study/Research Group Lead",
    label: "500+ students",
    href: "https://www.linkedin.com/in/abdul-salam-adebayo",
  },
  {
    logo: "/bowentechhub-logo.jpg",
    title: "Bowen Tech Hub, Data Science & AI Community Lead",
    label: "Grew community 7 → 46",
    href: "https://www.linkedin.com/in/abdul-salam-adebayo",
  },
  {
    logo: "/theudaraproject-logo.png",
    title: "TheUdaraProject, Campus Ambassador",
    label: "Feb 2026 – May 2026",
    href: "https://www.linkedin.com/in/abdul-salam-adebayo",
  },
  {
    logo: "/dingpay-logo.png",
    title: "Dingpay, Campus Ambassador",
    label: "Sep 2025 – Jul 2026",
    href: "https://www.linkedin.com/in/abdul-salam-adebayo",
  },
]

// No published articles/press yet — kept empty rather than fabricated titles.
// Add real links here once you have them; the "Writing" / "Featured" subsections
// below only render when their array is non-empty.
const writing: HighlightItem[] = []

const featured: HighlightItem[] = []

export default function AboutPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const openContact = () => setIsContactModalOpen(true)

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
                <span className="h-px w-8 bg-accent-teal" /> About
              </p>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">
                The engineer <br />
                <span className="text-primary italic">behind the work.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-400">
                I'm Abdul-Salam, a Software Engineer from Lagos specializing in AI automation, building agentic
                workflows and full-stack AI systems that solve real problems end to end.
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
            </SlideInLeft>
          </div>
        </section>

        {/* 2. MY STORY (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1fr]">
            <SlideInLeft>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl" />
                <Image
                  src={profile.headshot}
                  alt={profile.name}
                  width={640}
                  height={416}
                  sizes="(min-width: 1024px) 512px, 100vw"
                  className="relative h-[26rem] w-full rounded-3xl border border-slate-200 object-cover shadow-lg"
                />
              </div>
            </SlideInLeft>
            <SlideInRight className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">My story</p>
              <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">
                Where access meets ambition.
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-slate-600">
                <p>
                  I grew up in Lagos wanting to build things, and studied Computer Science at Bowen University to
                  learn how. What stuck with me wasn't the theory. It was noticing how much good technology never
                  reaches the people who need it most: farmers priced out of AI tools, students without mentors,
                  founders without a research team.
                </p>
                <p>
                  So I've spent the last few years closing that gap from both ends. As a Software Engineer at 4orge,
                  and through backend and data work at Merrowgate and Synergy Solutions IMC LTD, I build the
                  infrastructure teams run on. Alongside that, I build AI agents and n8n workflows that automate the
                  research, outreach and reporting a small team doesn't have time for, and FarmBuddy, an AI advisor
                  that speaks to Nigerian farmers in their own languages instead of assuming English.
                </p>
                <p>
                  It all comes back to one belief: talent is everywhere, but access makes the difference. Whether
                  that's an AI system that meets someone in their own language, or the sessions I run for 500+
                  students at Machine Learning Lagos, I want to be on the access side of that equation.
                </p>
              </div>
            </SlideInRight>
          </div>
        </section>

        {/* 3. TECH STACK (light) */}
        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Toolkit</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">The tools I build with.</h2>
            </FadeIn>
            <TechStack />
          </div>
        </section>

        {/* 4. EDUCATION (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Education</p>
              <h2 className="mb-14 font-display text-4xl font-bold text-slate-900 md:text-5xl">Where it started.</h2>
            </FadeIn>
            <FadeIn>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{education.school}</h3>
                      <p className="font-medium text-primary">{education.degree}</p>
                      <p className="text-sm text-slate-500">{education.location}</p>
                    </div>
                  </div>
                </div>
                <dl className="mt-6 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Coursework</dt>
                    <dd className="mt-1 text-sm text-slate-600">{education.coursework}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Certifications</dt>
                    <dd className="mt-2 flex items-start gap-2.5">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="min-w-0">
                        <span className="block font-semibold text-slate-900">{education.award}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-slate-500">
                          {education.awardDesc}
                        </span>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 5. LEADERSHIP & COMMUNITY (light) */}
        <section className="bg-white py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Leadership &amp; Community</p>
              <h2 className="mb-4 font-display text-4xl font-bold text-slate-900 md:text-5xl">On stage, in community.</h2>
              <p className="mb-12 max-w-2xl text-lg text-slate-600">
                From keynote stages to student leadership, sharing what I learn building AI and helping others get there
                faster.
              </p>
            </FadeIn>

            <FadeIn>
              <ImageCarousel images={speakingImages} className="mb-12" />
            </FadeIn>

            <StaggerIn staggerDelay={0.08} className="border-t border-slate-200">
              {leadership.map((item) => (
                <HighlightRow key={item.title} item={item} />
              ))}
            </StaggerIn>
          </div>
        </section>

        {/* 6. WRITING & FEATURES (light) — hidden entirely until there's real
            writing/press content to show; no fabricated placeholder entries. */}
        {(writing.length > 0 || featured.length > 0) && (
          <section className="bg-slate-50 py-24 px-6">
            <div className="mx-auto max-w-6xl">
              <FadeIn>
                <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Writing &amp; Features</p>
                <h2 className="mb-12 font-display text-4xl font-bold text-slate-900 md:text-5xl">
                  Ideas worth sharing.
                </h2>
              </FadeIn>

              {writing.length > 0 && (
                <>
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Writing</p>
                  <StaggerIn staggerDelay={0.08} className="border-t border-slate-200">
                    {writing.map((item) => (
                      <HighlightRow key={item.title} item={item} />
                    ))}
                  </StaggerIn>
                </>
              )}

              {featured.length > 0 && (
                <>
                  <p className="mb-4 mt-12 text-xs font-bold uppercase tracking-widest text-slate-400">Featured</p>
                  <StaggerIn staggerDelay={0.08} className="border-t border-slate-200">
                    {featured.map((item) => (
                      <HighlightRow key={item.title} item={item} />
                    ))}
                  </StaggerIn>
                </>
              )}
            </div>
          </section>
        )}

        {/* 7. CONTACT CTA (dark) */}
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

      {/* 8. FOOTER (dark) */}
      <footer className="bg-[#081a3d] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-extrabold">Abdul-Salam Adebayo</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Software Engineer specializing in AI automation, agentic systems and full-stack backends.
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
          <span>© {new Date().getFullYear()} Abdul-Salam Adebayo.</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
