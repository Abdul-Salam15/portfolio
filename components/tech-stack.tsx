"use client"

import { useState } from "react"
import { StaggerIn } from "@/components/animations/reveal-animations"
import { LogoImage } from "@/components/logo-image"

export interface Tech {
  name: string
  /** Omit for a tool with no available brand asset — renders straight to the initials fallback. */
  logo?: string
}

export const techGroups: { label: string; items: Tech[] }[] = [
  {
    label: "Languages & Frameworks",
    items: [
      { name: "Python", logo: "/tech/python.svg" },
      { name: "Django", logo: "/tech/django.svg" },
      { name: "FastAPI", logo: "/tech/fastapi.svg" },
      { name: "JavaScript", logo: "/tech/javascript.svg" },
      { name: "TypeScript", logo: "/tech/typescript.svg" },
      { name: "Next.js", logo: "/tech/nextjs.svg" },
      { name: "React", logo: "/tech/react.svg" },
      { name: "Node.js", logo: "/tech/nodejs.svg" },
      { name: "Express", logo: "/tech/express.svg" },
    ],
  },
  {
    label: "Databases & Backend",
    items: [
      { name: "PostgreSQL", logo: "/tech/postgresql.svg" },
      { name: "MySQL", logo: "/tech/mysql.svg" },
      { name: "Supabase", logo: "/tech/supabase.svg" },
    ],
  },
  {
    label: "AI & ML",
    items: [
      { name: "OpenAI", logo: "/tech/openai.svg" },
      { name: "Claude", logo: "/tech/claude.svg" },
      { name: "Gemini", logo: "/tech/gemini.svg" },
      { name: "YarnGPT", logo: "/tech/yarngpt.svg" },
      { name: "Scikit-Learn", logo: "/tech/scikitlearn.svg" },
      { name: "XGBoost", logo: "/tech/xgboost.svg" },
      { name: "SHAP", logo: "/tech/shap.png" },
      { name: "LIME" },
    ],
  },
  {
    label: "AI Automation",
    items: [
      { name: "n8n", logo: "/tech/n8n.svg" },
      { name: "Gmail API", logo: "/tech/gmail.svg" },
      { name: "Google Sheets", logo: "/tech/googlesheets.svg" },
      { name: "Airtable", logo: "/tech/airtable.svg" },
      { name: "Apify", logo: "/tech/apify.svg" },
    ],
  },
  {
    label: "Cloud & Tools",
    items: [
      { name: "Docker", logo: "/tech/docker.svg" },
      { name: "Git", logo: "/tech/git.svg" },
      { name: "GitHub", logo: "/tech/github.svg" },
      { name: "Postman", logo: "/tech/postman.svg" },
      { name: "Vercel", logo: "/tech/vercel.svg" },
      { name: "Render", logo: "/tech/render.svg" },
      { name: "Netlify", logo: "/tech/netlify.svg" },
      { name: "Puppeteer", logo: "/tech/puppeteer.svg" },
      { name: "JWT", logo: "/tech/jwt.svg" },
    ],
  },
  {
    label: "AI Coding Tools",
    items: [
      { name: "Claude Code", logo: "/tech/claude.svg" },
      { name: "Claude Design", logo: "/tech/claude.svg" },
      { name: "GitHub Copilot", logo: "/tech/githubcopilot.svg" },
      { name: "Codex", logo: "/tech/openai.svg" },
      { name: "Vercel v0", logo: "/tech/v0.svg" },
      { name: "Antigravity", logo: "/tech/antigravity.svg" },
      { name: "OpenCode", logo: "/tech/opencode.svg" },
    ],
  },
]

function TechTile({ tech }: { tech: Tech }) {
  const [error, setError] = useState(false)
  const showLogo = Boolean(tech.logo) && !error
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center transition-shadow hover:shadow-md"
      title={tech.name}
    >
      <span className="flex h-9 w-9 items-center justify-center md:h-11 md:w-11">
        {showLogo ? (
          <LogoImage
            src={tech.logo!}
            alt={tech.name}
            width={44}
            height={44}
            sizes="44px"
            className="h-full w-full object-contain"
            onError={() => setError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
            {tech.name.slice(0, 2)}
          </span>
        )}
      </span>
      <span className="text-[11px] font-medium leading-tight text-slate-600">{tech.name}</span>
    </div>
  )
}

/** Shared tech logo grid used on About (Toolkit) and Resume (Skills). Each page supplies its own section wrapper/heading/background. */
export function TechStack({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark"
  return (
    <StaggerIn staggerDelay={0.1} className="grid gap-6 lg:grid-cols-2">
      {techGroups.map((group) => (
        <div
          key={group.label}
          className={`rounded-3xl border p-6 md:p-8 ${
            dark ? "border-white/10 bg-white/[0.04] backdrop-blur-sm" : "border-slate-200 bg-slate-50"
          }`}
        >
          <p className={`mb-5 text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}>{group.label}</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {group.items.map((tech) => (
              <TechTile key={tech.name} tech={tech} />
            ))}
          </div>
        </div>
      ))}
    </StaggerIn>
  )
}
