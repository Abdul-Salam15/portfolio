import { BarChart3 } from "lucide-react"
import type { Project } from "./types"

// Sources: card description and Notion (no README). Text last updated from projects.md.
export const aiOperationsReporting: Project = {
  slug: "ai-operations-reporting",
  title: "AI Operations Reporting System",
  icon: BarChart3,
  categories: ["Automation", "AI & Backend"],
  featured: false,
  tagLine: "Workflow Automation & Analytics",
  timeline: "2026",
  builtFor: "Koya AI Academy",
  techStack: ["n8n", "Claude API", "Supabase", "Google Sheets API", "Airtable API"],
  summary:
    "Koya AI Academy's sales, delivery and people-ops data lived in three separate systems. I built an n8n workflow that calculates every metric in code, then has Claude write the executive summary from the finished numbers.",

  problem:
    "Leadership at Koya AI Academy wanted one report covering sales, project delivery and people operations. The data was spread across Google Sheets, Airtable and a people-ops API, none of them connected. Handing the arithmetic to an AI wasn't an option, because it can produce figures that sound confident and are simply wrong.",
  solution:
    "Leadership picks a reporting period and runs the n8n workflow. It pulls records from all three sources, cleans them and calculates every metric in code. Claude only receives the finished figures, and uses them to write the executive summary, risks, recommended actions and notes on data quality. The results are saved to Supabase, where a public dashboard reads them.",
  edgeCases: [
    {
      title: "The same period is requested twice",
      handling: "The workflow finds the existing report in Supabase and returns it without calling Claude again.",
    },
    {
      title: "Records with blank or invalid dates",
      handling: "They're excluded from date-based metrics and listed as data-quality warnings, and the run carries on.",
    },
    {
      title: "Missing amounts or statuses",
      handling: "The record stays in, and a structured warning is logged so the gap is visible.",
    },
    {
      title: "Headcount doesn't fit a date range",
      handling: "It's counted across the full dataset as of the last day of the period, so staff with no recent hire or exit are still included.",
    },
    {
      title: "A source sheet comes back empty",
      handling: "The node is set to always return output, so an empty sheet doesn't stop the workflow.",
    },
    {
      title: "Unexpected status values",
      handling: "They're flagged as data-quality warnings instead of being counted under the wrong status.",
    },
  ],

  videoUrl: "https://www.loom.com/share/f438640a02c4496f885bf0662b94239c",
  onePagerUrl: "https://docs.google.com/document/d/1JHFuq33TfIOh6jw9PNch3gQRsg4oIhZaGH0rMWBIOnE/edit?usp=sharing",
  liveUrl: "https://koya-operation-report.netlify.app/",
}
