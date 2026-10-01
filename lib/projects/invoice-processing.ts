import { Receipt } from "lucide-react"
import type { Project } from "./types"

// Sources: card description and Notion (no README). Text last updated from projects.md.
export const invoiceProcessing: Project = {
  slug: "invoice-processing",
  title: "Intelligent Invoice Processing",
  icon: Receipt,
  categories: ["Automation", "AI & Backend"],
  featured: false,
  tagLine: "Workflow Automation & AI Integration",
  timeline: "2026",
  builtFor: "Novus Realty",
  techStack: ["n8n", "Claude API", "Gmail API", "Google Sheets"],
  summary:
    "Novus Realty receives invoices by email in all sorts of layouts, sometimes attached and sometimes written into the message. I built an n8n workflow that identifies the real invoices, extracts the key details with Claude and logs every outcome to a Google Sheet, failures included.",

  problem:
    "Invoices reach Novus Realty by email in every format, as PDF attachments or typed into the message body, and they arrive alongside emails that only mention billing. Each invoice has to be recorded exactly once, with its vendor, amount, dates and currency. Vendors don't use reliable invoice numbers, which makes it easy to log the same invoice twice.",
  solution:
    "An n8n workflow monitors the inbox and asks Claude whether each email is actually an invoice. If it is, Claude extracts the vendor, amount, dates and currency. Duplicates are checked both before and after the Claude call, and every outcome is written as its own row in a Google Sheet. Failures get a row too, with a status and a reason.",
  edgeCases: [
    {
      title: "The invoice is in the email body",
      handling: "When there's no attachment, the body text is used as the source, so these invoices still get processed.",
    },
    {
      title: "One email has several attachments",
      handling: "Each attachment is split out and processed separately.",
    },
    {
      title: "An email mentions billing but isn't an invoice",
      handling: "Claude classifies it as not an invoice, and it's logged along with the reason.",
    },
    {
      title: "A corrupt or unreadable PDF",
      handling: "The failed extraction is caught and logged with its own status, and the rest of the run continues.",
    },
    {
      title: "The same invoice arrives twice",
      handling: "Before Claude is called, the workflow checks the sender and every attachment name. After extraction, it also checks for a match on the extracted fields.",
    },
    {
      title: "Extracted text is garbage",
      handling: "Text quality is checked first, so Claude is never called on unreadable input.",
    },
  ],

  videoUrl: "https://www.loom.com/share/e298a98890f64874bbb67ccd35a9ec0a",
  onePagerUrl: "https://docs.google.com/document/d/1Y-ptWii39rM7HGcOMSe13q-BrAB_aeS4Px18Z3jJpzw/edit?usp=sharing",
}
