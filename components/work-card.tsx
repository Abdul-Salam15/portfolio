"use client"

import {
  ArrowUpRight,
  Sprout,
  ListChecks,
  HeartPulse,
  Activity,
  UserSearch,
  ListFilter,
  Receipt,
  BarChart3,
  FileSignature,
  Newspaper,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoImage } from "@/components/logo-image"

export type WorkCategory = "AI & Backend" | "Full-stack" | "Automation"

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
  /** A project can span more than one filter (e.g. a full-stack app built as an automation) — the
   *  portfolio filter matches if the selected category is anywhere in this list. The item still
   *  appears only once in "All", never duplicated per category. */
  category: WorkCategory[]
  stack: string[]
  /** Omit for independent/personal projects — the footer credit line only renders when both are set. */
  employer?: string
  employerLogo?: string
  caseStudyUrl?: string // if the client is public (e.g. an employer case study), link it
}

export const workCategories: WorkCategory[] = ["AI & Backend", "Full-stack", "Automation"]

export const work: WorkItem[] = [
  {
    icon: UserSearch,
    title: "Casefile · AI Lead Research & Outreach Agent",
    desc: "An AI lead-research and outreach agent for Koya Talent's outbound sales: given a one-line objective, it refines an Ideal Customer Profile with a human-review checkpoint, discovers and scrapes candidate companies, qualifies each against the ICP with cited evidence, and drafts (never sends) a 3-email sequence plus a LinkedIn message per qualified lead. Built on the Claude Agent SDK with structured MCP tools, per-phase tool allowlisting, an SSRF guard on scraping, and a full tool-call audit log, so every guardrail is enforced in code rather than only in a prompt.",
    role: "Full-stack · AI Agent Engineering",
    period: "2026",
    category: ["Automation", "Full-stack"],
    stack: ["Claude Agent SDK", "TypeScript", "Express", "Postgres", "Supabase", "MCP Tools", "Zod"],
    employer: "Koya Talent",
  },
  {
    icon: FileSignature,
    title: "AI Proposal Generator",
    desc: "An internal tool that drafts a client-ready sales proposal section by section from discovery-call notes, so a salesperson can review, hand-edit or regenerate any one section without touching the rest. Structured sections (deliverables, timeline, pricing) are forced through Claude tool-use schemas instead of parsed from prose, and nothing reaches a client until both the salesperson and a separate admin approve it, enforced at the API layer and again by Postgres Row-Level Security.",
    role: "Full-stack · AI Document Generation",
    period: "2026",
    category: ["Automation", "Full-stack"],
    stack: ["Next.js", "Claude API", "Supabase", "Postgres RLS", "Puppeteer"],
  },
  {
    icon: ListFilter,
    title: "Lead Triage System",
    desc: "A pipeline that turns a messy inbound-leads CSV, any schema, any column names, into a ranked, explainable sales list. Fuzzy header matching and per-field cleaners normalize the data, rule-based disqualification filters out spam and non-buyers before any AI spend, and similar leads are clustered so one LLM call can characterize a whole group instead of every row, cutting LLM calls by up to 95%. Every final score ships with a plain-text breakdown of exactly how it was calculated.",
    role: "Full-stack · Data Pipeline & Applied ML",
    period: "2026",
    category: ["Automation", "Full-stack"],
    stack: ["Django", "React", "OpenAI GPT-4o-mini", "Unsupervised Clustering", "Rule-Based NLP"],
  },
  {
    icon: BarChart3,
    title: "AI Operations Reporting System",
    desc: "An n8n orchestration for Koya AI Academy leadership that pulls sales, delivery and people-ops data from three unrelated sources, computes every metric in code (never in the LLM, to keep numbers deterministic), and hands only the calculated figures to Claude for an executive narrative, plus a public dashboard that reads the results straight from Supabase. Duplicate-report detection makes the workflow safe to re-trigger, and every metric that couldn't be calculated is surfaced with a reason, not a silent zero.",
    role: "Workflow Automation & Analytics",
    period: "2026",
    category: ["Automation"],
    stack: ["n8n", "Claude API", "Supabase", "Google Sheets API", "Airtable API"],
    employer: "Koya AI Academy",
    caseStudyUrl: "https://koya-operation-report.netlify.app/",
  },
  {
    icon: Newspaper,
    title: "AI Content Research & Publishing Agent",
    desc: "An event-driven content pipeline for Koya Talent: a raw idea becomes two SEO-checked, source-grounded article drafts, each scored against a quality rubric and automatically revised if weak, capped at 3 passes. A strategist picks a draft and a manager approves it before Claude adapts it for LinkedIn, X and a newsletter and drops the results into a publishing queue, with Supabase Realtime keeping the whole team's view live and a plain-language audit log covering every success and failure.",
    role: "Workflow Automation · AI Content Pipeline",
    period: "2026",
    category: ["Automation"],
    stack: ["n8n", "Claude API", "Supabase", "Postgres RLS", "Realtime"],
    employer: "Koya Talent",
  },
  {
    icon: Receipt,
    title: "Intelligent Invoice Processing",
    desc: "An event-driven n8n workflow for Novus Realty that watches an inbox, classifies whether an email is really an invoice, extracts vendor, amount, dates and currency with Claude, and checks for duplicates twice (before and after the LLM call) before writing one auditable row per outcome to a Google Sheet. Every failure mode, not a genuine invoice, missing fields, unreadable PDF, API error, is logged with its own status and reason rather than silently dropped.",
    role: "Workflow Automation & AI Integration",
    period: "2026",
    category: ["Automation"],
    stack: ["n8n", "Claude API", "Gmail API", "Google Sheets"],
    employer: "Novus Realty",
  },
  {
    icon: Sprout,
    title: "FarmBuddy",
    desc: "A full-stack multimodal AI agricultural advisory system built for Nigerian smallholder farmers, pairing OpenAI for reasoning with YarnGPT for multilingual text-to-speech across Hausa, Igbo, Yoruba and Nigerian English. Delivered as a PWA and a Telegram bot so it stays usable in low-data areas without a native app install. Validated with 80 users, scoring 89.56/100 (Excellent) on the System Usability Scale.",
    role: "Full-stack · AI, Backend & Frontend",
    period: "Dec 2025 – Aug 2026",
    category: ["Full-stack"],
    stack: ["Next.js", "Django", "OpenAI", "YarnGPT", "PWA", "Telegram Bot"],
  },
  {
    icon: ListChecks,
    title: "Nexus",
    desc: "A full-stack task manager with an auto-scheduling engine that packs pending tasks into upcoming weekdays based on deadline, priority and effort estimate, plus productivity analytics. AI task recommendations are powered by the Gemini API with a heuristic fallback when no API key is configured, alongside JWT authentication with refresh tokens and an email-based OTP password reset flow.",
    role: "Full-stack · AI, Backend & Frontend",
    period: "Aug 2025 – Jul 2026",
    category: ["Full-stack"],
    stack: ["React", "TypeScript", "Express", "Gemini API", "JWT"],
  },
  {
    icon: HeartPulse,
    title: "CardioXAI",
    desc: "An explainable AI system that estimates coronary heart disease risk from self-reported lifestyle and demographic data alone, no lab tests required. Trained a weighted consensus ensemble (Logistic Regression, Random Forest, XGBoost) on the CDC's BRFSS dataset of 253,680 records, applying SMOTE for class imbalance and reaching 0.815 AUC-ROC. Every prediction ships with SHAP and LIME explainability, a model-disagreement confidence tier and an interactive risk-factor knowledge graph.",
    role: "Applied Machine Learning",
    period: "Jun 2026 – Jul 2026",
    category: ["AI & Backend"],
    stack: ["Python", "Scikit-Learn", "XGBoost", "SHAP", "LIME", "SMOTE"],
  },
  {
    icon: Activity,
    title: "VitalWatch",
    desc: "A personal health-monitoring web app for logging daily vitals (heart rate, SpO2, temperature, steps) with instant anomaly detection, plus a medication reminder system with escalating in-app alarms and automated email alerts to caregivers when doses are missed. Includes a tokenized, read-only caregiver view requiring no login, with timezone-aware scheduling so reminders stay accurate to the patient's local time.",
    role: "Full-stack · AI, Backend & Frontend",
    period: "May 2026 – Jul 2026",
    category: ["Full-stack"],
    stack: ["Anomaly Detection", "Medication Reminders", "Caregiver Alerts", "Timezone-aware Scheduling"],
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
      {/* employer credit — only for work done under an employer; personal projects skip this row */}
      {(item.employer || item.period) && (
        <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4">
          {item.employer && (
            <span className="text-xs text-slate-500">
              Built for <span className="font-semibold text-slate-900">{item.employer}</span>
            </span>
          )}
          {item.employerLogo && (
            <LogoImage
              src={item.employerLogo}
              alt={item.employer ?? ""}
              width={72}
              height={24}
              sizes="72px"
              className="h-5 w-auto max-w-[72px] object-contain"
            />
          )}
          {item.period && <span className="ml-auto text-xs text-slate-500">{item.period}</span>}
        </div>
      )}
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
