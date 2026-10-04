import type { ProjectCategory } from "./types"
import { farmbuddy } from "./farmbuddy"
import { aiProposalGenerator } from "./ai-proposal-generator"
import { leadTriage } from "./lead-triage"
import { voiceSupportAgent } from "./voice-support-agent"
import { aiOperationsReporting } from "./ai-operations-reporting"
import { aiContentPipeline } from "./ai-content-pipeline"
import { invoiceProcessing } from "./invoice-processing"
import { casefile } from "./casefile"
import { nexus } from "./nexus"
import { cardioxai } from "./cardioxai"
import { vitalwatch } from "./vitalwatch"

export * from "./types"

/** Display order on the portfolio page. Adding a project = one file + one line here. */
export const projects = [
  farmbuddy,
  aiProposalGenerator,
  leadTriage,
  voiceSupportAgent,
  aiOperationsReporting,
  aiContentPipeline,
  invoiceProcessing,
  casefile,
  nexus,
  cardioxai,
  vitalwatch,
]

export const featuredProjects = projects.filter((p) => p.featured)

export const projectCategories: ProjectCategory[] = ["AI & Backend", "Full-stack", "Automation"]

export const getProject = (slug: string | null | undefined) => projects.find((p) => p.slug === slug)
