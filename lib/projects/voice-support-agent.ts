import { Headset } from "lucide-react"
import type { Project } from "./types"

// Sources: project-explanation.md and README from the repo. Text last updated from projects.md.
export const voiceSupportAgent: Project = {
  slug: "voice-support-agent",
  title: "Voice Customer Support Agent",
  icon: Headset,
  categories: ["Automation", "AI & Backend"],
  featured: false,
  tagLine: "Voice AI · Agents, RAG & Backend",
  timeline: "September 2026",
  builtFor: "Koya Talent",
  techStack: ["Claude Agent SDK", "MCP", "Vapi", "Supabase", "TypeScript", "Node.js"],
  summary:
    "A support team can't hand every call to an AI, because some questions involve a customer's money. I built a voice agent for a fictional payments company that answers routine questions, verifies callers before touching their account, and passes anything risky to a specialist.",

  impact: [
    { value: "Faster", label: "Routine questions answered on the call, so the support team isn't tied up with them" },
    { value: "Organised", label: "Every complaint is logged, prioritised and queued for a specialist with the details attached" },
    { value: "Safer", label: "No account information is shared until the caller has been verified" },
  ],
  problem:
    "The support team at RelayPay, a fictional cross-border payments company, was hard to scale. Some questions are repetitive and documented, like fees and timelines. Others involve a specific customer's money, need a human, or aren't covered anywhere. A voice channel makes this harder, because whatever the agent says is spoken aloud and can't be taken back, and speech recognition mishears names and references. A voice agent that's helpful on easy calls and wrong on hard ones would cost the business more than it saves.",
  solution:
    "A caller talks to the agent in the browser. Every reply takes one of four paths: answer from the approved knowledge base, ask a clarifying question, escalate to a person, or decline when nothing reliable is found. Account questions go through a separate MCP server that only runs once the caller has been verified with their account email plus a name or company. Anything that needs a human is collected through an on-screen contact form and added to a specialist callback queue with a priority calculated on the server. The rules that must always hold are enforced in code rather than left to the prompt, and every call, tool use and decision is logged. A staff dashboard, customer portal, email notifications and an automated test suite complete the system.",
  edgeCases: [
    {
      title: "The caller isn't verified yet",
      handling: "The lookup tools refuse before querying anything, so an unverified caller can't even learn whether a reference exists.",
    },
    {
      title: "A verified caller asks about someone else's payment",
      handling: "They get the same answer as for a reference that doesn't exist, so the reply reveals nothing about other customers.",
    },
    {
      title: "The knowledge base has no answer",
      handling: "The agent declines instead of guessing, and the unanswered question is logged for staff to review.",
    },
    {
      title: "Speech recognition mishears a name",
      handling: "Names are matched loosely, but every letter of the account email must match exactly.",
    },
    {
      title: "The agent is about to say something it shouldn't",
      handling: "A filter on the output blocks emails, amounts and internal notes before they're spoken, and references are read out character by character.",
    },
    {
      title: "A case needs a person",
      handling: "The priority is calculated from the category plus signals checked against the database, and the agent can only report times and case numbers that come back from a tool.",
    },
  ],

  videoUrl: "https://drive.google.com/file/d/1goSP0GZAoR9PVaMWdwgTvoJ8c2uN7UiY/view?usp=drivesdk",
  onePagerUrl: "https://docs.google.com/document/d/1SwCBQS3nN1etHSOHMmPDaSzdZgfv5i9aiLT6EvzVMzo/edit?usp=sharing",
  githubUrl: "https://github.com/Abdul-Salam15/Production-Customer-Support-Agent",
  liveUrl: "https://agent-backend-ct16.onrender.com/",
}
