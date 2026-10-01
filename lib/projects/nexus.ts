import { ListChecks } from "lucide-react"
import type { Project } from "./types"

// Sources: card description and README. Text last updated from projects.md.
export const nexus: Project = {
  slug: "nexus",
  title: "Nexus",
  icon: ListChecks,
  categories: ["Full-stack", "AI & Backend"],
  featured: false,
  tagLine: "Full-stack · AI, Backend & Frontend",
  timeline: "Aug 2025 – Jul 2026",
  personal: true,
  techStack: ["React", "TypeScript", "Express", "Gemini API", "JWT"],
  summary:
    "A task manager that plans your week for you. It fits pending tasks into the coming weekdays based on deadline, priority and effort, and uses Gemini to suggest what to work on next.",

  problem:
    "A to-do list shows what's pending, but not when to do it. Working out how tasks with different deadlines, priorities and effort fit into the days ahead is planning you still have to do yourself, and it's easy to overload a single day.",
  solution:
    "A full-stack task manager built with React and Express. The auto-scheduler fits pending tasks into the coming weekdays, ordered by deadline, then priority, then effort. No day goes over 8 hours, and you get a warning when the plan is overloaded. The app also tracks completion rate, streaks and daily workload, and uses Gemini to recommend what to tackle next. Accounts use JWT access and refresh tokens, and passwords can be reset with a code sent by email.",
  edgeCases: [
    {
      title: "A day has more work than fits",
      handling: "Each day is capped at 8 hours, and the scheduler warns you when the plan is overloaded.",
    },
    {
      title: "No Gemini API key is configured",
      handling: "Recommendations switch to built-in heuristics, so the feature keeps working.",
    },
    {
      title: "The access token expires mid-session",
      handling: "The app catches the 401 response, refreshes the token and retries the request.",
    },
    {
      title: "A category with tasks in it is deleted",
      handling: "Its tasks are moved to another category, so nothing is lost.",
    },
    {
      title: "A user forgets their password",
      handling: "They get a 6-digit code by email that expires after 5 minutes. Entering it gives them a reset token that lasts 10 minutes.",
    },
    {
      title: "One account reaching another's data",
      handling: "Every route verifies the token, and every query is limited to the signed-in user's data.",
    },
  ],

  githubUrl: "https://github.com/Abdul-Salam15/Nexus-Task-Manager",
  liveUrl: "https://nexus-frontend-2hy5.onrender.com",
}
