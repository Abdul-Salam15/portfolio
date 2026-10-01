import { Newspaper } from "lucide-react"
import type { Project } from "./types"

// Sources: card description, README and Notion. Text last updated from projects.md.
export const aiContentPipeline: Project = {
  slug: "ai-content-pipeline",
  title: "AI Content Research & Publishing Agent",
  icon: Newspaper,
  categories: ["Automation", "AI & Backend"],
  featured: false,
  tagLine: "Workflow Automation · AI Content Pipeline",
  timeline: "2026",
  builtFor: "Koya Talent",
  techStack: ["n8n", "Claude API", "Supabase", "Postgres RLS", "Realtime"],
  summary:
    "Koya Talent's content team produced every piece by hand, one slow step at a time. I built an event-driven system that turns an idea into source-backed drafts and channel-ready posts, with a manager signing off before anything is queued.",

  problem:
    "Koya Talent's content team followed the same manual process for every piece: brainstorm, research, write an SEO article, adapt it for each channel, review it and publish. It worked, but it couldn't scale. Each step was slow, quality and accuracy depended on who did the work that day, and nothing recorded which sources supported the claims in a piece.",
  solution:
    "A web app built on Supabase, with n8n workflows that react to every change in the data. A strategist submits an idea, and Claude researches it and writes two article options based on the sources it found. Each draft is scored against a quality rubric, and weak drafts are revised automatically, up to three times. The strategist chooses one and a manager approves it. Only then is it adapted for LinkedIn, X and a newsletter and added to the publishing queue.",
  edgeCases: [
    {
      title: "There isn't enough source material",
      handling: "The request is marked \"needs more context\" and the strategist is told, rather than letting the model fill the gaps.",
    },
    {
      title: "A draft keeps scoring badly",
      handling: "Revisions stop after three passes, so a weak draft can't loop endlessly or keep adding cost.",
    },
    {
      title: "Approval arrives before every channel is ready",
      handling: "Writes to the queue are de-duplicated, so running approval again fills in the missing channels without doubling the ones already there.",
    },
    {
      title: "A Claude reply is cut off at its token limit",
      handling: "The parser checks why Claude stopped and raises a clear error, instead of trying to read incomplete JSON.",
    },
    {
      title: "A strategist submits too many requests",
      handling: "Anything over the limit is marked \"rate limited\" so it doesn't sit silently in the queue.",
    },
    {
      title: "A step fails anywhere in the pipeline",
      handling: "A global error handler records the workflow, the step and the input in the audit log.",
    },
  ],

  videoUrl: "https://www.loom.com/share/53d7c52d2844493c82c8625620e75a88",
  onePagerUrl: "https://docs.google.com/document/d/1ef3vU9WIZI_8s9p7grQCzlkubfjYAcaT5C8Sud5G0OA/edit?usp=sharing",
  githubUrl: "https://github.com/Abdul-Salam15/-AI-Content-Research-and-Publishing-Agent",
  liveUrl: "https://ai-content-pipeline.netlify.app/",
}
