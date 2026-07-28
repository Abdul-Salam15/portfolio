/**
 * Single source of truth for content shared across pages (home, about, resume,
 * portfolio, nav, footer, contact modal). Keeping this here stops the pages from
 * drifting apart, e.g. the experience skill tags used to differ between the home
 * page and the resume because each page held its own copy.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abdulmalikadebayo.com"

export const profile = {
  name: "Adebayo Abdul-Malik",
  /** Sitewide role label. Deliberately not "Senior" — let the work argue seniority. */
  title: "AI & Backend Engineer",
  location: "Lagos, Nigeria",
  email: "abdulmalikadebayo1@gmail.com",
  github: "https://github.com/abdulmalikadebayo",
  linkedin: "https://www.linkedin.com/in/abdul-malik-adebayo-294161174/",
  headshot: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756197152/OBD_1829_puui1n.jpg",
}

export type ExperienceRole = {
  title: string
  period: string
  /** One-line version used by the condensed home timeline. */
  summary: string
  /** Full bullets used by the resume timeline. */
  bullets: string[]
}

export type Experience = {
  company: string
  website?: string
  logo?: string
  logoType?: "mark" | "wordmark"
  employment?: string
  location: string
  period: string
  roles: ExperienceRole[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    company: "Supernomics",
    website: "https://www.supernomics.ai",
    logo: "/supernomics-logo.svg",
    logoType: "wordmark",
    employment: "Contract",
    location: "San Francisco, US · Remote",
    period: "Jan 2026 – Present",
    roles: [
      {
        title: "AI Engineer (LLM & Applied ML)",
        period: "Jan 2026 – Present",
        summary:
          "Building LLM safety pipelines on Anthropic's Claude API and modernising desktop infrastructure for AI feature deployment.",
        bullets: [
          "Built an LLM safety pipeline on Anthropic's Claude API with custom prompt-injection detection and content filtering, reducing harmful outputs at low latency.",
          "Modernised Electron.js desktop infrastructure for AI features: refactoring, activity tracking for ML training data, and standards for embedding LLM capabilities.",
        ],
      },
    ],
    tags: ["Claude API", "LLM Safety", "Prompt Injection", "Content Filtering", "Electron.js", "Python"],
  },
  {
    company: "Axiomfuse",
    website: "https://axiomfuse.com",
    logo: "/axiomfuse-logo.png",
    employment: "Full-time",
    location: "London, UK · Remote",
    period: "Nov 2025 – Present",
    roles: [
      {
        title: "Software Engineer (AI & Backend)",
        period: "Nov 2025 – Present",
        summary:
          "Self-custodial DeFi wallet infrastructure across Ethereum & Solana, plus AI features for an NHS healthcare-staffing platform.",
        bullets: [
          "Core member of a two-person backend and blockchain team, building self-custodial DeFi wallet infrastructure from inception: Aave, Morpho, Kamino and Jito integrations with real-time WebSocket position tracking across Ethereum and Solana, plus in-app calls and messaging.",
          "Contributing to the backend and AI features of a UK-based healthcare staffing platform serving the NHS Trusts, including an intelligent job matching system, real-time staffing insights dashboard, and scheduling functionality serving 1,492+ medical professionals and 4,990+ filled jobs across the UK at an 87% satisfaction rate.",
          "Built an R&D tax report-writing platform and CRM full-stack as one of a two-person team, owning it end to end from the data model and API layer through to the interface, with an LLM drafting the technical R&D tax reports at its core.",
        ],
      },
    ],
    tags: [
      "Django",
      "PostgreSQL",
      "Ethereum",
      "Solana",
      "WebSockets",
      "Celery",
      "Redis",
      "OpenAI",
      "React",
      "AWS",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    company: "BRDGE",
    website: "https://www.brdge.ai",
    logo: "/brdge-logo.png",
    employment: "Full-time",
    location: "London, UK · Remote",
    period: "Jun 2024 – Nov 2025",
    roles: [
      {
        title: "AI Development Analyst",
        period: "Feb 2025 – Nov 2025",
        summary:
          "Shipped an Arabic–English legal chatbot on AWS Bedrock (Llama 3, 200+ queries/day) for a Saudi client, and delivered custom AI for clients across Europe, Asia and Africa.",
        bullets: [
          "Led an end-to-end Arabic-English legal chatbot using Llama 3 and Legal GPT via AWS Bedrock, handling 200+ queries a day for a Saudi client with strict data-sovereignty needs.",
          "Delivered custom AI implementations for clients across Europe (Ireland, UK), Asia (China, Malaysia) and Africa (Nigeria).",
          "Aligned deployments with client and stakeholder goals around compliance, governance and real-time decision intelligence.",
        ],
      },
      {
        title: "AI Researcher & Engineer",
        period: "Jun 2024 – Feb 2025",
        summary:
          "Built Apprentago's entire backend and API layer (22,000+ users, 10,000+ job listings) with RAG-powered AI assistants shipped on AWS & GCP.",
        bullets: [
          "Built the complete backend and API layer for Apprentago, an apprenticeship platform with 22,000+ users and 10,000+ job listings, through to live deployment.",
          "Developed LLM assistants using RAG pipelines and fine-tuned models, containerised with Docker for scalable deployment.",
          "Deployed on AWS and GCP with CI/CD via GitHub Actions, maintaining security and NDA compliance across confidential client projects.",
        ],
      },
    ],
    tags: [
      "Django",
      "RAG",
      "Llama 3",
      "AWS Bedrock",
      "LlamaIndex",
      "FAISS",
      "OpenAI",
      "Whisper",
      "React",
      "PostgreSQL",
      "GCP",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    company: "Synergy Solutions",
    location: "Remote",
    period: "Sep 2023 – Oct 2023",
    roles: [
      {
        title: "Data Scientist",
        period: "Sep 2023 – Oct 2023",
        summary:
          "Introduced AI-powered tooling at a marketing agency to speed up campaign creation and content generation.",
        bullets: [
          "Led technical initiatives at a growing marketing agency, introducing AI-powered tools to support campaign creation, automate routine tasks and boost client engagement.",
          "Developed custom internal systems for AI-generated captions, ad copy and campaign briefs, helping non-technical staff create content faster.",
          "Worked closely with non-technical staff to make AI accessible and practical, reducing content turnaround time and scaling output without adding headcount.",
        ],
      },
    ],
    tags: ["Python", "NLP"],
  },
  {
    company: "KPMG",
    logo: "/kpmg-logo.svg",
    logoType: "wordmark",
    location: "Remote",
    period: "Sep 2020 – Oct 2020",
    roles: [
      {
        title: "Data Analyst Intern",
        period: "Sep 2020 – Oct 2020",
        summary: "Completed KPMG's virtual data analytics internship: data quality, insights and presentation.",
        bullets: [
          "Completed the Data Quality Assessment, Data Insights and Presentation tasks as part of the KPMG virtual internship.",
        ],
      },
    ],
    tags: [],
  },
]

export type CarouselImage = {
  src: string
  alt: string
  caption?: string
  fit?: "cover" | "contain"
}

export const speakingImages: CarouselImage[] = [
  {
    src: "https://res.cloudinary.com/x78tb87x/image/upload/f_auto,q_auto:good,c_limit,w_1920/v1782981329/_80A8658_Original_x4gywk.jpg",
    alt: "Adebayo speaking at Google DevFest, Ibadan",
    caption: "Google DevFest, Ibadan",
    fit: "contain",
  },
  {
    src: "https://res.cloudinary.com/x78tb87x/image/upload/f_auto,q_auto:good,c_limit,w_1920/v1782980810/IMG_2766_x8id0d.jpg",
    alt: "Adebayo speaking at Google DevFest, Ibadan",
    caption: "Google DevFest, Ibadan",
  },
  {
    src: "https://res.cloudinary.com/x78tb87x/image/upload/f_auto,q_auto:good,c_limit,w_1920/nyp1_eazyrn",
    alt: "Adebayo speaking at the Nigeria Youth Parliament",
    caption: "Nigeria Youth Parliament",
  },
  {
    src: "https://res.cloudinary.com/x78tb87x/image/upload/f_auto,q_auto:good,c_limit,w_1920/v1782980354/nyp2_tnqmfs.jpg",
    alt: "Adebayo speaking at the Nigeria Youth Parliament",
    caption: "Nigeria Youth Parliament",
  },
  {
    src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196080/IMG_0711_cbcnks.jpg",
    alt: "Adebayo speaking at Bowen Tech Week",
    caption: "Bowen Tech Week",
  },
  {
    src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196078/IMG_0713_zfi7bj.jpg",
    alt: "Adebayo speaking at Bowen Tech Week",
    caption: "Bowen Tech Week",
  },
  {
    src: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1756196078/IMG_0712_hdy03t.jpg",
    alt: "Adebayo speaking at Bowen Tech Week",
    caption: "Bowen Tech Week",
  },
]
