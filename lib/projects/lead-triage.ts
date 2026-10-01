import { ListFilter } from "lucide-react"
import type { Project } from "./types"

// Sources: card description and README. Text last updated from projects.md.
export const leadTriage: Project = {
  slug: "lead-triage",
  title: "Lead Triage System",
  icon: ListFilter,
  categories: ["Full-stack", "AI & Backend"],
  featured: true,
  tagLine: "Full-stack · Data Pipeline & Applied ML",
  timeline: "2026",
  builtFor: "Koya Talent",
  techStack: ["Django", "React", "OpenAI GPT-4o-mini", "Unsupervised Clustering", "Rule-Based NLP"],
  summary:
    "Inbound leads arrive as messy CSVs with no consistent format. This pipeline cleans them, removes spam and non-buyers before spending anything on AI, and gives sales a ranked list with the reasoning behind every score.",

  problem:
    "Inbound leads come in as CSV exports in whatever format the source produced. Column names vary, names, budgets and notes are inconsistent, and real prospects are mixed in with spam, competitors and people who can't make a purchase. Before sales can make a single call, someone has to clean the data, remove the bad leads and decide who matters most. Sending every row to an LLM would do the job, but the cost adds up quickly.",
  solution:
    "A Django and React app that accepts the CSV exactly as it comes. It maps each column to a known field using exact and fuzzy header matching, cleans every value, and uses rules to disqualify spam, competitors and non-decision-makers before any AI is involved. Similar leads are then grouped into clusters, and GPT-4o-mini analyses two or three representatives from each cluster rather than every row. Each lead is scored and placed into one of five tiers. Without an API key, the whole pipeline runs on heuristics at no cost.",
  edgeCases: [
    {
      title: "Column names don't match anything expected",
      handling: "Headers are matched exactly first, then ignoring case, then fuzzily. The user can review the result and correct any mapping.",
    },
    {
      title: "The upload isn't really a CSV",
      handling: "Files are checked for type, size and binary content, and the text encoding is detected before anything is parsed.",
    },
    {
      title: "The same company appears several times",
      handling: "Company names are normalised to a slug, which makes duplicates easy to catch.",
    },
    {
      title: "Spam, competitors and non-buyers",
      handling: "Rule-based checks remove them before any LLM call, so none of the AI budget is spent on them.",
    },
    {
      title: "No OpenAI key is set",
      handling: "The pipeline switches to deterministic heuristics and still produces a complete ranking.",
    },
    {
      title: "A large file on free hosting",
      handling: "Processing runs in the background while the UI polls for progress, which keeps requests clear of the host's timeout.",
    },
  ],

  videoUrl: "https://www.loom.com/share/693afd7504a4496fb763eb5467ecae86",
  onePagerUrl: "https://docs.google.com/document/d/1Q2csRj8T2uS1fpxPmrapvpFQTo96TNGrz6yDIH07CVQ/edit?usp=drivesdk",
  githubUrl: "https://github.com/Abdul-Salam15/LeadTriage",
  liveUrl: "https://lead-triage-addg.onrender.com/",
}
