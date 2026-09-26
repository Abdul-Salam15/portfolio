/**
 * Single source of truth for content shared across pages (home, about, resume,
 * portfolio, nav, footer, contact modal). Keeping this here stops the pages from
 * drifting apart, e.g. the experience skill tags used to differ between the home
 * page and the resume because each page held its own copy.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abdul-salam-adebayo.vercel.app"

export const profile = {
  name: "Abdul-Salam Adebayo",
  /** Sitewide role label. Deliberately not "Senior" — let the work argue seniority. */
  title: "Software Engineer · AI Automation",
  location: "Lagos, Nigeria",
  email: "asalamadebayo@gmail.com",
  phone: "+2348071261492",
  github: "https://github.com/Abdul-Salam15",
  linkedin: "https://www.linkedin.com/in/abdul-salam-adebayo",
  /** TEMP: signed LinkedIn CDN URL — expires ~Oct 2026. Replace with a permanently hosted photo. */
  headshot:
    "https://media.licdn.com/dms/image/v2/D4E03AQG3fqpLkJqqsg/profile-displayphoto-crop_800_800/B4EZ_Gy1yFJYAI-/0/1785746647182?e=1792022400&v=beta&t=c8a5tfVi5lGIlZlJZ9e7JDaUrnpfPHoWJq50HPM7TcU",
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
    company: "4orge",
    website: "https://www.linkedin.com/company/4orge/",
    employment: "Full-time",
    location: "Lagos, Nigeria · Hybrid",
    period: "Dec 2025 – Present",
    roles: [
      {
        title: "Software Engineer",
        period: "Dec 2025 – Present",
        summary:
          "QA and backend engineering on a live consumer app and a secure voting platform, inside a fast-paced startup engineering team.",
        bullets: [
          "Performed QA testing on \"The Gaffer\" application, identifying and documenting bugs to improve application reliability and code quality.",
          "Collaborated on backend development of a secure voting platform, implementing accurate vote-handling logic within a fast-paced startup engineering team.",
        ],
      },
    ],
    tags: ["Backend Engineering", "QA Testing"],
  },
  {
    company: "Merrowgate",
    website: "https://www.linkedin.com/company/merrowgate/",
    employment: "Internship",
    location: "Nigeria · Remote",
    period: "Feb 2026 – Apr 2026",
    roles: [
      {
        title: "Software Engineering Intern",
        period: "Feb 2026 – Apr 2026",
        summary:
          "Market and competitor research feeding technical specs and delivery roadmaps ahead of development.",
        bullets: [
          "Conducted competitor and market research to inform product positioning and technical strategy.",
          "Applied project scoping and roadmapping to structure development timelines, defining milestones and delivery phases.",
          "Authored technical specifications detailing system architecture and implementation requirements ahead of development.",
        ],
      },
    ],
    tags: ["Project Scoping", "Technical Specifications"],
  },
  {
    company: "Synergy Solutions IMC LTD",
    employment: "Internship",
    location: "Lagos, Nigeria · On-site",
    period: "Jul 2024 – Sep 2025",
    roles: [
      {
        title: "Data Science Intern",
        period: "Jul 2024 – Jul 2025",
        summary:
          "Built a churn-prediction model from raw HR data through to stakeholder-ready retention recommendations.",
        bullets: [
          "Developed a Logistic Regression model to predict employee churn, applying exploratory data analysis, feature engineering and hyperparameter tuning to improve model accuracy by 20%.",
          "Cleaned and preprocessed datasets to ensure high-quality inputs for analysis and modelling, translating outputs into actionable retention recommendations for stakeholders.",
        ],
      },
      {
        title: "Backend Engineering Intern",
        period: "Jul 2025 – Sep 2025",
        summary: "Built a Task Management System with a RESTful API and Gemini-powered task recommendations.",
        bullets: [
          "Built a Task Management System with RESTful API architecture, integrating the Gemini API for LLM-powered task recommendations.",
          "Collaborated with senior engineers to design and implement scalable applications, optimising backend processes and reducing API response times.",
        ],
      },
    ],
    tags: ["Python", "Django", "Gemini API", "Scikit-Learn", "RESTful APIs"],
  },
]

export type CarouselImage = {
  src: string
  alt: string
  caption?: string
  fit?: "cover" | "contain"
}

/**
 * No event/speaking photos yet — kept empty rather than reusing the previous
 * owner's. ImageCarousel renders nothing when this is empty, so the Home and
 * About "Speaking & Community" sections gracefully drop that block. Add
 * entries here once you have your own photos (Cloudinary transform note:
 * always include `f_auto,q_auto:good,c_limit,w_1280`, or next/image's remote
 * fetch can time out on large originals).
 */
export const speakingImages: CarouselImage[] = []

export type Recommendation = {
  name: string
  /** Their own role / headline. */
  title: string
  /** How they worked with me: shown as the small primary-coloured line. */
  relationship: string
  /** Condensed pull-quote from the full LinkedIn recommendation. */
  quote: string
  /** Self-hosted headshot in public/. Falls back to `initials` if absent/broken. */
  photo?: string
  initials: string
  linkedin: string
}

/**
 * No LinkedIn recommendations received yet — kept empty rather than reusing
 * the previous owner's testimonials (real people vouching for someone else).
 * The Home page hides the "Recommendations" section entirely while this is
 * empty. Add entries here once you have testimonials to show.
 */
export const recommendations: Recommendation[] = []
