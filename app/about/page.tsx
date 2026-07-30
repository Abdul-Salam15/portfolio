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
  degree: "BSc Computer Science",
  location: "Osun State, Nigeria",
  thesis: "Development of a Nigerian Sign Language Recognition System",
  award: "Student Icon 360",
  awardDesc: "Awarded to outstanding students excelling in academics, leadership, and Community Impact",
}

const leadership: HighlightItem[] = [
  {
    logo: "/gdg-logo.png",
    title: "Google DevFest, Ibadan, Speaker",
    label: "Talk · 3,000+",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7406264295312945153/",
  },
  {
    logo: "/nyp-logo.jpg",
    title: "Nigeria Youth Parliament, Speaker",
    label: "Talk · 150+",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7425463424467464193/",
  },
  {
    logo: "/btw-logo.jpg",
    title: "Bowen Tech Week, Co-Founder",
    label: "Co-Founder",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7335357587925688321/",
  },
  {
    logo: "/nacos-logo.jpg",
    title: "NACOS Bowen, President",
    label: "President · 800+",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7231974579848531968/",
  },
]

const writing: HighlightItem[] = [
  {
    logo: "/linkedin-logo.svg",
    title: "Shipping AI Solutions from Lagos to the World: A One-Year Retrospective",
    label: "4k+ impressions",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7344298946644574209/",
  },
  {
    logo: "/linkedin-logo.svg",
    title: "Lessons from Google DevFest Ibadan: Building Scalable AI Systems",
    label: "3,965 impressions",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7406264295312945153/",
  },
  {
    logo: "/linkedin-logo.svg",
    title: "A Year as President of NACOS Bowen: Innovation & Excellence",
    label: "3,450 impressions",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7231974579848531968/",
  },
  {
    logo: "/linkedin-logo.svg",
    title: "AI and the Future of Work: Adapt, Don't Resist",
    label: "1,437 impressions",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7425463424467464193/",
  },
]

const featured: HighlightItem[] = [
  {
    logo: "/axiomfuse-logo.png",
    title: "Meet Abdul-Malik Adebayo: Software Engineer at Axiom Fuse",
    label: "Feature",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7426573116140773376/",
  },
  {
    logo: "/brdge-logo.png",
    title: "Tech Journeys That Inspire: Abdul-Malik at Bowen Tech Week 2.0",
    label: "Feature",
    href: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7335357587925688321/",
  },
]

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
                I'm Adebayo, an AI &amp; Backend Engineer from Lagos, building production LLM systems and scalable
                backends for teams across four continents, from research all the way to reliable deployment.
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
                  src="https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756197152/OBD_1848_cvlyxt.jpg"
                  alt="Adebayo Abdul-Malik"
                  width={640}
                  height={416}
                  sizes="(min-width: 1024px) 512px, 100vw"
                  className="relative h-[26rem] w-full rounded-3xl border border-slate-200 object-cover shadow-lg"
                />
              </div>
            </SlideInLeft>
            <SlideInRight className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">My story</p>
              <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">From research to real-world.</h2>
              <div className="space-y-4 text-lg leading-relaxed text-slate-600">
                <p>
                  My path started in AI research at Bowen University, where my final-year thesis built a Nigerian Sign
                  Language recognition system, a project obsessed with correctness, evaluation and getting the details
                  right.
                </p>
                <p>
                  Since then I've shipped production AI and backend systems for companies from San Francisco to London,
                  Supernomics, Axiomfuse and BRDGE, serving clients across the US, Europe, Asia, the Gulf and Africa.
                </p>
                <p>
                  What I care about most is the space where research rigour meets production reality: systems that are
                  correct, and that also hold up at scale when real people depend on them.
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
                    <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Thesis</dt>
                    <dd className="mt-1 text-sm text-slate-600">{education.thesis}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">Honors &amp; awards</dt>
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
                <HighlightRow key={item.href} item={item} />
              ))}
            </StaggerIn>
          </div>
        </section>

        {/* 6. WRITING & FEATURES (light) */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">Writing &amp; Features</p>
              <h2 className="mb-12 font-display text-4xl font-bold text-slate-900 md:text-5xl">Ideas worth sharing.</h2>
            </FadeIn>

            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">Writing</p>
            <StaggerIn staggerDelay={0.08} className="border-t border-slate-200">
              {writing.map((item) => (
                <HighlightRow key={item.href} item={item} />
              ))}
            </StaggerIn>

            <p className="mb-4 mt-12 text-xs font-bold uppercase tracking-widest text-slate-400">Featured</p>
            <StaggerIn staggerDelay={0.08} className="border-t border-slate-200">
              {featured.map((item) => (
                <HighlightRow key={item.href} item={item} />
              ))}
            </StaggerIn>
          </div>
        </section>

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
            <p className="font-display text-2xl font-extrabold">Adebayo Abdul-Malik</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              AI &amp; Backend Engineer building production LLM systems, backends and cloud infrastructure.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Explore</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/resume" className="hover:text-primary">Resume</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Connect</p>
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
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
          <span>© {new Date().getFullYear()} Adebayo Abdul-Malik.</span>
          <span>Lagos, Nigeria</span>
        </div>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
