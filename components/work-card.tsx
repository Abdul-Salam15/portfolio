"use client"

import {
  ArrowUpRight,
  Baby,
  Compass,
  DraftingCompass,
  HeartHandshake,
  LineChart,
  Scale,
  Wallet,
  Stethoscope,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoImage } from "@/components/logo-image"

export type WorkCategory = "AI & Backend" | "Full-stack"

export type WorkItem = {
  clientLogo?: string // shown only where public / permitted
  clientLogoClass?: string // per-logo size override, for marks that read small at the default cap
  icon?: LucideIcon // mark shown when there is no client logo
  confidential?: boolean // NDA client: show the "Confidential" label beside the icon
  title: string
  desc: string
  role: string
  period?: string // when the work happened; rendered in the footer, not crammed into `role`
  featured?: string[] // press / media mentions, shown as an "As featured in" line
  category: WorkCategory
  stack: string[]
  employer: string
  employerLogo: string
  caseStudyUrl?: string // if the client is public (e.g. an employer case study), link it
}

const BRDGE_LOGO = "/brdge-logo.png"
const AXIOMFUSE_LOGO = "/axiomfuse-logo.png"

export const workCategories: WorkCategory[] = ["AI & Backend", "Full-stack"]

export const work: WorkItem[] = [
  {
    clientLogo: "/djp-logo.svg",
    icon: Compass,
    title: "Pocket Coach · D Jungle People",
    desc: "Backend and AI for a voice-first leadership coach, live on iOS and Android, built for D Jungle People, a respected 20-year Southeast Asian coaching firm, and modelled on the founder's own coaching cadence. An LLM runs a strict T-GROW protocol from their proprietary frameworks: one question per turn, exploration before advice, and a confidence-scored close, with speech-to-text in, neural text-to-speech out, and vector retrieval over the coaching corpus. It reached £100k+ in new revenue within four months of launch, with a 20% lift in post-workshop retention.",
    role: "Backend & AI",
    period: "2025",
    category: "AI & Backend",
    stack: ["Django", "Whisper", "ElevenLabs", "RAG", "AWS", "S3", "Docker", "GitHub Actions"],
    employer: "BRDGE",
    employerLogo: BRDGE_LOGO,
    caseStudyUrl: "https://www.brdge.ai/case-pocket-coach",
  },
  {
    clientLogo: "/shyft-logo.png",
    icon: Stethoscope,
    title: "Shyft",
    desc: "Contributed to the backend and AI behind Shyft, a cross-platform NHS healthcare-staffing ecosystem of four connected products: a mobile app for professionals plus internal, agency and hospital dashboards, all on one shared backend. Worked on the real-time data sync, automated compliance tracking and smart job-matching that connect 1,492+ medical professionals to 4,990+ jobs at an 87% satisfaction rate.",
    role: "Backend & AI",
    period: "2026 – present",
    category: "AI & Backend",
    stack: ["Python", "Django", "PostgreSQL", "OpenAI", "AWS", "Docker", "GitHub Actions"],
    employer: "Axiomfuse",
    employerLogo: AXIOMFUSE_LOGO,
    caseStudyUrl: "https://axiomfuse.com/case-studies/shyft-healthcare",
  },
  {
    clientLogo: "/apprentago-logo.png",
    title: "Apprentago",
    desc: "AI-powered apprenticeship platform. I built the complete backend and API layer for 22,000+ users and 10,000+ job listings, powering multiple dashboards for students and employers on one central backend.",
    role: "Backend & AI",
    period: "2024 – 2025",
    featured: ["BBC", "Channel 4"],
    category: "AI & Backend",
    stack: ["Django", "PostgreSQL", "OpenAI", "Google Cloud Console", "Docker", "GitHub Actions"],
    employer: "BRDGE",
    employerLogo: BRDGE_LOGO,
    caseStudyUrl: "https://apprentago.co.uk/",
  },
  {
    clientLogo: "/mlg-logo.png",
    icon: HeartHandshake,
    title: "Memory Lane Games",
    desc: "I built the AI voice companion for Memory Lane Games, an established dementia-care app, adding an empathic conversational layer to their existing product. It reads emotional prosody in the voice, not just the words, and paces itself for elderly listeners. When someone reminisces it tool-calls into a photo memory quiz, read aloud and scored with error-less learning that never says the word wrong. Distress cues escalate to a human carer, and the whole behaviour is bound to a clinical safeguarding spec drawn from Validation Therapy.",
    role: "AI & Backend",
    period: "2025",
    category: "AI & Backend",
    stack: ["Hume EVI 3", "Claude Sonnet 4.5", "Tool calling", "Next.js", "TypeScript", "GitHub Actions"],
    employer: "BRDGE",
    employerLogo: BRDGE_LOGO,
    caseStudyUrl: "https://www.memorylanegames.com/",
  },
  {
    clientLogo: "/foresight-logo.png",
    icon: LineChart,
    title: "ForeSight",
    desc: "As one of a two-person team, I built ForeSight full-stack, frontend, backend and AI: R&D tax report-writing software and CRM. I owned it end to end, from the data model and API layer through to the interface, with an LLM drafting the technical R&D tax reports at its core.",
    role: "Full-stack · AI, Backend & Frontend",
    period: "2026 – present",
    category: "Full-stack",
    stack: ["Django", "LLM", "React", "PostgreSQL", "AWS", "Docker", "GitHub Actions"],
    employer: "Axiomfuse",
    employerLogo: AXIOMFUSE_LOGO,
    caseStudyUrl: "https://axiomfuse.com/case-studies/foresight-tax",
  },
  {
    clientLogo: "/snugsbaby-logo.png",
    icon: Baby,
    title: "Snugs Baby",
    desc: "An AI weaning assistant for breastfeeding and early-stage mothers, built full-stack into the brand's existing Shopify store. Runs on OpenAI, grounded in NHS and WHO guidance via a RAG pipeline (FAISS + embeddings), with per-baby profiles and age-aware advice, voice, photo and document input, automatic safety checks on every response, food-introduction tracking and matched product recommendations from the Shopify catalogue.",
    role: "Full-stack · AI, Backend & Frontend",
    period: "2025",
    category: "Full-stack",
    stack: ["Django", "OpenAI", "RAG", "FAISS", "Whisper", "React", "Shopify", "AWS", "Docker", "GitHub Actions"],
    employer: "BRDGE",
    employerLogo: BRDGE_LOGO,
    caseStudyUrl: "https://snugsbaby.com/",
  },
  {
    clientLogo: "/xcare-logo.svg",
    icon: Wallet,
    title: "XCARE Capital",
    desc: "Core member of the two-person backend & blockchain team. Built the self-custodial wallet infrastructure from inception, integrating Aave, Morpho, Kamino & Jito with real-time position tracking across Ethereum & Solana, plus in-app calls and messaging.",
    role: "Backend & Blockchain",
    period: "2025 – present",
    category: "AI & Backend",
    stack: ["Ethereum", "Solana", "WebSockets", "Django", "Celery", "Redis", "AWS", "Docker", "GitHub Actions"],
    employer: "Axiomfuse",
    employerLogo: AXIOMFUSE_LOGO,
    caseStudyUrl: "https://axiomfuse.com/case-studies/xcare-capital",
  },
  {
    icon: Scale,
    confidential: true,
    title: "Arabic–English Legal Chatbot",
    desc: "A bilingual English and Arabic legal assistant, built full-stack for a client with strict data-sovereignty needs, handling 200+ queries a day. Llama 3 on AWS Bedrock answers questions, grounded in documents users upload through a LlamaIndex RAG pipeline, with on-the-fly translation and a fully right-to-left Arabic interface. Owned it end to end: Django backend, the retrieval and language pipeline, and the React frontend.",
    role: "Full-stack · AI, Backend & Frontend",
    period: "2025",
    category: "Full-stack",
    stack: ["AWS Bedrock", "Llama 3", "LlamaIndex", "Django", "React", "PostgreSQL", "Docker", "GitHub Actions"],
    employer: "BRDGE",
    employerLogo: BRDGE_LOGO,
  },
  {
    icon: DraftingCompass,
    confidential: true,
    title: "Engineering AI Assistant",
    desc: "I took this from an exhibition prototype to a working product, built full-stack: an AI assistant for a building-services engineering firm. Engineers upload PDF drawings for entity recognition and CAD-readable conversion, then ask questions answered from the CIBSE guides and the client's own documentation. I built the retrieval on an in-process FAISS index of Titan embeddings, with Llama 3 on AWS Bedrock answering only from retrieved context and citing the source guide and page.",
    role: "Full-stack · AI, Backend & Frontend",
    period: "2025",
    category: "Full-stack",
    stack: ["AWS Bedrock", "Llama 3", "Titan Embeddings", "FAISS", "Django", "React", "Docker", "GitHub Actions"],
    employer: "BRDGE",
    employerLogo: BRDGE_LOGO,
  },

]

/**
 * The Selected Work card, shared by the home page (top 3) and the portfolio page
 * (full grid). `showStack` adds the tech tags, used only on the portfolio page
 * where the cards carry more depth.
 */
export function WorkCard({ item, showStack = false }: { item: WorkItem; showStack?: boolean }) {
  const cardClass =
    "group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"

  const body = (
    <>
      {item.caseStudyUrl && (
        <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-slate-300 transition-colors group-hover:text-primary" />
      )}
      {/* client / product */}
      <div className="mb-5 flex h-12 items-center gap-3">
        {item.clientLogo ? (
          <LogoImage
            src={item.clientLogo}
            alt={item.title}
            width={160}
            height={48}
            sizes="160px"
            className={cn("w-auto max-w-[160px] object-contain object-left", item.clientLogoClass ?? "max-h-10")}
          />
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              {item.icon && <item.icon className="h-6 w-6 text-primary" />}
            </span>
            {item.confidential && (
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Confidential</span>
            )}
          </>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
      {item.featured && item.featured.length > 0 && (
        <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-500">
          <span className="font-semibold uppercase tracking-widest text-slate-400">As featured in</span>
          <span className="font-semibold text-slate-700">{item.featured.join(" · ")}</span>
        </p>
      )}
      <div className="flex-1" />
      {showStack && (
        <div className="mt-5 flex flex-wrap gap-2">
          {item.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">{item.role}</p>
      {/* employer credit */}
      <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4">
        <span className="text-xs text-slate-500">
          Built at <span className="font-semibold text-slate-900">{item.employer}</span>
        </span>
        <LogoImage
          src={item.employerLogo}
          alt={item.employer}
          width={72}
          height={24}
          sizes="72px"
          className="h-5 w-auto max-w-[72px] object-contain"
        />
        {item.period && <span className="ml-auto text-xs text-slate-500">{item.period}</span>}
      </div>
    </>
  )

  return item.caseStudyUrl ? (
    <a href={item.caseStudyUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
      {body}
    </a>
  ) : (
    <div className={cardClass}>{body}</div>
  )
}
