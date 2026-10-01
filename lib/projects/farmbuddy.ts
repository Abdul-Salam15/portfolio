import { Sprout } from "lucide-react"
import type { Project } from "./types"

// Sources: card description, README, and the write-up kept in farmbuddy.md (Notes). Text last updated from projects.md.
export const farmbuddy: Project = {
  slug: "farmbuddy",
  title: "FarmBuddy",
  icon: Sprout,
  categories: ["Full-stack", "AI & Backend"],
  featured: true,
  tagLine: "Full-stack · AI, Backend & Frontend",
  timeline: "Dec 2025 – Aug 2026",
  builtFor: "Undergraduate Thesis",
  techStack: ["Next.js", "Django", "OpenAI", "YarnGPT", "PWA", "Telegram Bot"],
  summary:
    "Most AI tools ship English-first and assume fast internet. FarmBuddy gives Nigerian smallholder farmers advice grounded in their own soil, crops and local weather, built to work in low-data areas. It's multimodal and multilingual: farmers can type, speak or send a leaf photo in Nigerian English, Hausa, Igbo or Yoruba.",

  impact: [
    { value: "89.56", label: "System Usability Scale score, rated Excellent" },
    { value: "80", label: "Participants in the usability study, 72.5% of them with farming experience" },
    { value: "1.2–2.8s", label: "Time until the first words of a reply appear" },
  ],
  problem:
    "Smallholders do most of Nigeria's farming, but there aren't nearly enough extension officers to advise them. When a farmer spots a pest or a sick crop, help can take days to arrive, and acting too late can cost a whole planting season. The digital tools that exist rarely fit them either. Most solve a single problem and expect a recent phone and a fast connection that many rural farmers don't have. AI platforms in particular tend to ship English first, leaving out farmers who speak Hausa, Igbo or Yoruba, and most only work by text, which shuts out anyone who would rather speak or show the problem. Generic advice isn't much help anyway: what works for one farm can be wrong for the next, depending on the soil, the crop and the weather that week.",
  solution:
    "I built FarmBuddy around the three things most AI tools leave out: low-data access, local languages and more than one way to ask. Farmers reach it through an installable web app or a Telegram bot, so it stays usable on a weak connection without downloading a native app. It's multimodal, so they can type a question, speak it or send a photo of a leaf, and multilingual from the ground up, working in Hausa, Igbo and Yoruba as well as Nigerian English. Every answer is grounded in the farmer's own soil, location and crops, along with live local weather, rather than generic tips, and it can be read aloud in a Nigerian voice on either channel. Behind it, a Django backend coordinates four models: GPT-4o-mini for conversation, GPT-4o Vision for diagnosing crop disease, Whisper for transcribing speech and YarnGPT for speaking the answers.",
  edgeCases: [
    {
      title: "The model isn't sure what's wrong with a crop",
      handling: "Every diagnosis comes with a confidence level. When it's low, the advisor says it isn't sure and recommends speaking to an expert.",
    },
    {
      title: "The farmer has no email address",
      handling: "Password resets use a security question, so a farmer can recover their account without email.",
    },
    {
      title: "Browser speech recognition fails",
      handling: "The recording is sent to OpenAI Whisper as a fallback, and voice input keeps working in all four languages.",
    },
    {
      title: "The connection drops",
      handling: "The installed app loads from its cache and shows a proper offline page rather than a browser error.",
    },
    {
      title: "A large photo on a weak network",
      handling: "Photos are scaled down to a maximum of 1024px before analysis, keeping them light enough for a poor connection.",
    },
    {
      title: "The same farmer uses the web app and Telegram",
      handling: "A link token from their profile connects the two, giving them one account and one shared history.",
    },
  ],

  githubUrl: "https://github.com/Abdul-Salam15/Farm-Buddy-v2",
  liveUrl: "https://farmbuddy-orcin.vercel.app/",
}
