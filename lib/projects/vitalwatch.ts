import { Activity } from "lucide-react"
import type { Project } from "./types"

// Sources: card description and README. Text last updated from projects.md.
export const vitalwatch: Project = {
  slug: "vitalwatch",
  title: "VitalWatch",
  icon: Activity,
  categories: ["Full-stack", "AI & Backend"],
  featured: false,
  tagLine: "Full-stack · AI, Backend & Frontend",
  timeline: "May 2026 – Jul 2026",
  personal: true,
  techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "Brevo"],
  summary:
    "A health-monitoring app for logging daily vitals and keeping track of medication. It flags readings outside healthy ranges and emails a caregiver when a dose is missed.",

  problem:
    "People managing their health at home have to keep track of their own vitals and medication. The people caring for them often don't hear about a missed dose or a worrying reading until much later.",
  solution:
    "A Next.js app for logging heart rate, SpO2, temperature and steps. Every reading is checked against healthy ranges and flagged straight away if it falls outside them. When a dose is late, the app sounds a reminder. If the dose still isn't confirmed, the patient receives a reminder email and their caregiver gets an alert. Caregivers can follow along through a read-only link, with no account needed.",
  edgeCases: [
    {
      title: "The patient is in a different timezone from the server",
      handling: "Due times and the start and end of each day are calculated in the patient's own timezone.",
    },
    {
      title: "Several checks fire for the same missed dose",
      handling: "Each reminder and caregiver email goes out at most once per dose per day, no matter how often the check runs.",
    },
    {
      title: "Scheduled jobs run late",
      handling: "While the app is open, it runs the reminder check itself, so emails still go out on time if the scheduled job is delayed.",
    },
    {
      title: "An alarm would ring again after a reload",
      handling: "Taken, snoozed and dismissed states are saved in the browser, so alarms don't go off a second time.",
    },
    {
      title: "A step count lower than earlier the same day",
      handling: "It's rejected, because steps are recorded as a running total for the day.",
    },
    {
      title: "A caregiver without an account",
      handling: "They use a private link with a token, and the patient can generate a new one at any time.",
    },
  ],

  githubUrl: "https://github.com/Abdul-Salam15/VitalWatch",
  liveUrl: "https://vitalwatch-5hgr.onrender.com",
}
