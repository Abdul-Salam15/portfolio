import { UserSearch } from "lucide-react"
import type { Project } from "./types"

// Sources: card description, README and Notion. Text last updated from projects.md.
export const casefile: Project = {
  slug: "casefile",
  title: "Casefile · AI Lead Research & Outreach Agent",
  icon: UserSearch,
  categories: ["Full-stack", "AI & Backend"],
  featured: false,
  tagLine: "Full-stack · AI Agent Engineering",
  timeline: "2026",
  builtFor: "Koya Talent",
  techStack: ["Claude Agent SDK", "TypeScript", "Express", "Postgres", "Supabase", "MCP Tools", "Zod"],
  summary:
    "Koya Talent researched outbound leads and wrote every message by hand, one company at a time. I built an agent that turns a one-line objective into an evidence-backed lead list with outreach already drafted. It can't send anything on its own.",

  problem:
    "Outbound sales at Koya Talent was entirely manual. Someone had to define the target customer, search for companies, read each website to judge the fit, then write personalised outreach for every one. It was slow, it didn't scale, and quality depended on who was doing it. Automating it carries real risk, though. An agent could email the wrong people, make up facts about a company or run up a bill with no ceiling.",
  solution:
    "A research agent built on the Claude Agent SDK. Given a one-line objective, it drafts an Ideal Customer Profile, then pauses so a person can review and edit it before any money is spent. Next, it finds companies through a LinkedIn search API, scrapes their websites and qualifies each one with cited sources and a confidence score. For every qualified lead, it drafts a three-email sequence and a LinkedIn message. The agent has no way to send anything, and every guardrail lives in code, not just in the prompt.",
  edgeCases: [
    {
      title: "The agent cites evidence it never collected",
      handling: "If a lead cites the company's own website but that site wasn't scraped during the run, the lead is rejected.",
    },
    {
      title: "A website contains hidden instructions",
      handling: "Scraped text is wrapped and labelled as untrusted data, so the agent reads it as content, not as instructions to follow.",
    },
    {
      title: "A scrape target points at an internal address",
      handling: "Only http(s) links are allowed, and private, loopback and cloud-metadata addresses are blocked.",
    },
    {
      title: "Parallel tool calls race past a limit",
      handling: "Usage counters are checked and updated before each call starts, not after it finishes, so simultaneous calls can't slip past the cap.",
    },
    {
      title: "A search result is too large",
      handling: "Results are trimmed to a size limit, with a note saying how many were left out, so the agent still has something to work with.",
    },
    {
      title: "The same company is saved twice",
      handling: "Leads are keyed by run and domain, so saving the same company again updates the existing row. Totals are recalculated from the actual rows.",
    },
  ],

  videoUrl: "https://drive.google.com/file/d/1XJraQps9qfJtIy-KdchqpubqTURRYdQe/view?usp=sharing",
  onePagerUrl: "https://docs.google.com/document/d/1SJvrtFwH2b73yltrEqq0ce4vd9c4U5anZz0ViOVNBjA/edit?usp=sharing",
  githubUrl: "https://github.com/Abdul-Salam15/AI-Lead-Research-and-Outreach-Agent",
  liveUrl: "https://casefile-on5n.onrender.com/",
}
