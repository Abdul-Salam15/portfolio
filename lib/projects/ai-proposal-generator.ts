import { FileSignature } from "lucide-react"
import type { Project } from "./types"

// Sources: card description, README and Notion. Text last updated from projects.md.
export const aiProposalGenerator: Project = {
  slug: "ai-proposal-generator",
  title: "AI Proposal Generator",
  icon: FileSignature,
  categories: ["Full-stack", "AI & Backend"],
  featured: true,
  tagLine: "Full-stack · AI Document Generation",
  timeline: "2026",
  builtFor: "Koya Talent",
  techStack: ["Next.js", "Claude API", "Supabase", "Postgres RLS", "Puppeteer"],
  summary:
    "An internal tool that turns discovery-call notes into a client-ready proposal, with Claude drafting one section at a time. A proposal can't reach the client until both the salesperson and a separate admin have approved it.",

  problem:
    "Every deal at Koya Talent needs a proposal built from the discovery-call notes, covering scope, deliverables, timeline and pricing. AI can write a first draft quickly, but there are two catches. A wrong price or timeline can't reach a client without someone checking it, and when the notes have gaps, a model tends to fill them with details nobody agreed to.",
  solution:
    "The salesperson fills in an intake form, and Claude drafts the proposal section by section, from the introduction through to pricing. Any section can be edited or regenerated on its own without affecting the others. Once the salesperson submits it, an admin reviews it, and only after approval can it be exported as a hosted page and PDF and emailed to the client. The approval rule is enforced twice, once in the API and again with Postgres Row-Level Security, and every step is logged.",
  edgeCases: [
    {
      title: "Notes say \"TBD\" or leave a field blank",
      handling: "That section is marked [NEEDS INPUT] and Claude isn't called at all. Nothing gets made up, and no API call is wasted.",
    },
    {
      title: "Someone tries to send before approval",
      handling: "The server rejects the export with a 409 error, even if the UI is bypassed.",
    },
    {
      title: "A salesperson double-clicks Regenerate",
      handling: "The button disables after the first click and a server-side lock blocks the second request, so one action can't trigger two paid calls.",
    },
    {
      title: "Two sections are regenerated at once",
      handling: "Each write goes through an atomic database function that only touches its own section, so neither can overwrite the other.",
    },
    {
      title: "A proposal is edited after it's submitted",
      handling: "Any edit sends it back to draft, so an admin can never approve a version that has since changed.",
    },
    {
      title: "The client's email is malformed",
      handling: "The address is validated before sending. If it's invalid, the error shows on the proposal and in the log, rather than failing inside the email provider.",
    },
  ],

  videoUrl: "https://www.loom.com/share/3f2e84cdbced4cf488b0499c6d628fd9",
  onePagerUrl: "https://docs.google.com/document/d/1Z8L1gRWC8JkBs08ozbJCKfT35NXXkHpJHRsvnsNmCZ4/edit?usp=sharing",
  githubUrl: "https://github.com/Abdul-Salam15/AI-Proposal-Document-Application",
  liveUrl: "https://ai-proposal-generator-iota.vercel.app/",
}
