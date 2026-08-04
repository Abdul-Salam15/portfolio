"use client"

import { useState } from "react"
import { StaggerIn } from "@/components/animations/reveal-animations"
import { LogoImage } from "@/components/logo-image"

export interface Tech {
  name: string
  logo: string
}

export const techGroups: { label: string; items: Tech[] }[] = [
  {
    label: "Languages & Frameworks",
    items: [
      { name: "Python", logo: "/tech/python.svg" },
      { name: "Django", logo: "/tech/django.svg" },
      { name: "Flask", logo: "/tech/flask.svg" },
      { name: "FastAPI", logo: "/tech/fastapi.svg" },
      { name: "JavaScript", logo: "/tech/javascript.svg" },
      { name: "Electron", logo: "/tech/electron.svg" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", logo: "/tech/postgresql.svg" },
      { name: "MySQL", logo: "/tech/mysql.svg" },
      { name: "MongoDB", logo: "/tech/mongodb.svg" },
      { name: "Redis", logo: "/tech/redis.svg" },
    ],
  },
  {
    label: "AI & ML",
    items: [
      { name: "OpenAI", logo: "/tech/openai.svg" },
      { name: "Claude", logo: "/tech/claude.svg" },
      { name: "Llama", logo: "/tech/meta.svg" },
      { name: "LangChain", logo: "/tech/langchain.svg" },
      { name: "LangGraph", logo: "/tech/langgraph.png" },
      { name: "Hugging Face", logo: "/tech/huggingface.svg" },
      { name: "PyTorch", logo: "/tech/pytorch.svg" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Docker", logo: "/tech/docker.svg" },
      { name: "Git", logo: "/tech/git.svg" },
      { name: "AWS", logo: "/tech/amazonwebservices.svg" },
      { name: "Google Cloud", logo: "/tech/googlecloud.svg" },
      { name: "Celery", logo: "/tech/celery.svg" },
    ],
  },
]

function TechTile({ tech }: { tech: Tech }) {
  const [error, setError] = useState(false)
  return (
    <div
      className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center transition-shadow hover:shadow-md"
      title={tech.name}
    >
      <span className="flex h-9 w-9 items-center justify-center md:h-11 md:w-11">
        {error ? (
          <span className="flex h-full w-full items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
            {tech.name.slice(0, 2)}
          </span>
        ) : (
          <LogoImage
            src={tech.logo}
            alt={tech.name}
            width={44}
            height={44}
            sizes="44px"
            className="h-full w-full object-contain"
            onError={() => setError(true)}
          />
        )}
      </span>
      <span className="text-[11px] font-medium leading-tight text-slate-600">{tech.name}</span>
    </div>
  )
}

/** Shared 4-group tech logo grid used on About (Toolkit) and Resume (Skills). Each page supplies its own section wrapper/heading/background. */
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
