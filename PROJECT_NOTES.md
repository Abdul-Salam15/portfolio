# Project Notes — Adebayo Abdul-Malik Portfolio

Working reference / source of truth for **content** across the site. Kept so answers stay consistent.
Last updated after the home-page rebuild + CV cross-reference.

---

## 1. Résumé — SOURCE OF TRUTH

From `Abdul-Malik_Adebayo_Professional_Resume.pdf` (the newest CV the user provided). When any page disagrees with this, this wins.

### Identity
- **Name:** Adebayo Abdul-Malik
- **Title:** **Senior AI & Backend Engineer**
- **Location:** Lagos, Nigeria
- **Phone:** +2348036561316
- **Email:** abdulmalikadebayo1@gmail.com
- **GitHub:** `github.com/abdulmalikadebayo` ⚠️ (resume page currently shows a different handle — unresolved, see §5)
- **LinkedIn:** https://www.linkedin.com/in/abdul-malik-adebayo-294161174/

### Professional summary
AI engineer building production LLM systems and scalable backend infrastructure for clients across the **United States, Europe, Asia, the Gulf, and Africa**. Strong background in RAG pipelines, agentic AI workflows, API-driven architectures, and cloud infrastructure. Delivered systems serving thousands of users with a focus on reliability, security, and scalability.

### Experience
**Supernomics** — San Francisco, US (Remote) — *Senior AI Engineer (LLM & Applied ML), Contract* — **Jan 2026 – Present**
- LLM safety pipeline on Anthropic's **Claude API** with custom prompt-injection detection + content filtering (reduce harmful outputs, low latency).
- Modernising **Electron.js** desktop infra for AI features: refactoring, activity tracking for ML training data, standards for embedding LLM capabilities.

**Axiomfuse** — London, UK (Remote) — *Software Engineer (AI & Backend)* — **Nov 2025 – Present**
- Core of a 2-person backend/blockchain team building **self-custodial DeFi wallet infrastructure** from inception (Aave, Morpho, Kamino, Jito) with real-time WebSocket position tracking across **Ethereum & Solana**, plus in-app calls and messaging. (User count deliberately removed 2026-07-28 — do NOT re-add a "5,000+ users" figure to this bullet.)
- Backend + AI for a UK **NHS** healthcare-staffing platform: intelligent job matching, real-time staffing insights dashboard, scheduling — **1,400+ medical professionals**, **4,900+ filled jobs**.
- Adaptive personality assessment platform using **GPT-4o** with confidence-based trait scoring across **35 attributes** (intelligent question selection vs fixed questionnaires).

**BRDGE** — London, UK (Remote) — *AI Development Analyst* — **Feb 2025 – Nov 2025**
- Led end-to-end **Arabic–English legal chatbot** using **Llama 3 + Legal GPT via AWS Bedrock**, **200+ queries/day**, Saudi client, strict data-sovereignty.
- Custom AI for clients across Europe (Ireland, UK), Asia (China, Malaysia), Africa (Nigeria).
- Client/stakeholder alignment on compliance, governance, real-time decision intelligence.

**BRDGE** — London, UK (Remote) — *AI Researcher & Engineer* — **Jun 2024 – Feb 2025**
- Built complete backend + API for **Apprentago**, apprenticeship platform — **22,000+ users**, **10,000+ job listings**, live deployment.
- LLM assistants via **RAG** pipelines + fine-tuned models, containerised with Docker.
- AWS + GCP, **CI/CD via GitHub Actions**, security/NDA compliance.

**Synergy Solutions** — Remote — *Data Scientist* — **Sep 2023 – Oct 2023** — earlier role, NOT on the newest CV but kept on the **Résumé page** for full history (user confirmed). Marketing-agency AI tooling: campaign creation, AI-generated captions/ad copy/briefs, making AI accessible to non-technical staff.

**KPMG** — Remote — *Data Analyst Intern* — **Sep 2020 – Oct 2020** — virtual internship: Data Quality Assessment, Data Insights and Presentation. Earliest role; Résumé page only.

*(Synergy + KPMG appear ONLY on the Résumé page — Home's Experience stays the 3 current companies. This is the resume's unique content, the reason it isn't pure duplication of Home.)*

### Leadership
- **Nigeria Youth Parliament** — Speaker, Jan 2026 — "AI and the Future of Work" to 150+ young professionals (Lagos West Senatorial District).
- **Google Dev Fest**, Ibadan — Speaker, Nov 2025 — "From Lagos to the World: Building Scalable AI Systems That Deliver Impact", 3,000+ attendees; Q&A + post-session discussions.
- **Bowen Tech Week** — Co-Founder & Head, Sponsorships and Partnerships, Feb–May 2024 — secured MTN, Nexascale, Cardify Africa; coordinated 5+ universities; exceeded fundraising goals.
- **Nigeria Association of Computing Students (NACS), Bowen University chapter** — President, Jun 2023 – Jun 2024 — led 800+ members; drove recognition as Bowen's Best Student Association of the Year.

### Education
- **Bowen University**, Osun State, Nigeria — **BSc Computer Science (4.11/5.00)**, 2020–2024
- Thesis: **Development of a Nigerian Sign Language Recognition System**
- Honors: **Student Icon 360** — *(Awarded to outstanding students excelling in academics, leadership, and Community Impact)* ← always include this description verbatim.

### Skills (verbatim groupings)
- **Languages & Frameworks:** Python, Django, Django REST Framework, Flask, JavaScript, Electron.js
- **Databases:** PostgreSQL, MySQL, MongoDB
- **AI & ML:** LLM-based systems (GPT-4, Claude, Llama), RAG, agentic AI workflows, Model Context Protocol (MCP), NLP
- **DevOps & Cloud:** Docker, Git, CI/CD, AWS, GCP, Celery

---

## 2. Tech / architecture

- **Next.js 15** App Router, React 19, TypeScript. Routes: `/` (home), `/about`, `/resume`, `/portfolio`. No backend/db.
- **Tailwind v4**, no config file — theme via CSS vars in `app/globals.css`. Base theme is **navy** (`--primary` navy).
- **Home-only teal scope:** `.home-redesign` class in `app/globals.css` overrides `--primary: #0D9488`, `--accent-teal: #2DD4BF`. Only the home page opts in.
- **Fonts** (`app/layout.tsx`, next/font): Geist + Manrope (site default), plus **Plus Jakarta Sans** (`--font-display`), **Inter** (`--font-body`/`--font-inter`), **JetBrains Mono** (`--font-code`/`--font-jetbrains`) used by the home redesign.
- **Dark mode:** `ThemeProvider` (next-themes) still wired in `app/layout.tsx` (`defaultTheme="light"`), but the **nav toggle was REMOVED** — the home page uses fixed section colors so the toggle did nothing there, and the site is unifying on the fixed teal design. Everything renders light.
- **Reusable animation wrappers:** `components/animations/reveal-animations.tsx` — `FadeIn`, `SlideInLeft/Right`, `ScaleIn`, `StaggerIn`, `HeroTextAnimation`, `FloatingAnimation` (GSAP + ScrollTrigger).
- **Reusable carousel:** `components/image-carousel.tsx` (auto-advance, arrows, dots) — used on home Speaking section.
- **Contact:** `components/contact-modal.tsx` — NO backend; fakes a 2s delay then opens `mailto:`. Triggered from nav + home hero/CTA.
- **Icons:** lucide-react everywhere (no Material Symbols).

### Local assets (Experience company logos)
- `public/supernomics-logo.svg` — SuperNomics **colored wordmark** (from supernomics.ai `/Logo-Light.svg`; `logoType: "wordmark"` → rendered inline on the light card, no chip, name is in the logo), links to https://www.supernomics.ai.
- `public/axiomfuse-logo.png` — Axiomfuse **square app-icon** (carved from their favicon.ico; shown in the icon box + "Axiomfuse" name), links to https://axiomfuse.com.
- `public/brdge-logo.png` — BRDGE **blue square app-icon** (256×256, white rings mark on blue gradient) = their `apple-touch-icon` webclip from brdge.ai head (`.../Brdge Webclicp.png`; square-mark → icon box + "BRDGE" name), links to https://www.brdge.ai. (The 32×32 "favicon" and the `Icon.svg` are a different swirl/spinner mark — not this.)
- Mechanism: `CompanyIdentity` (`app/page.tsx`) takes `logo` + `website` + `logoType`. `logoType: "wordmark"` = wide logo incl. name, rendered inline on light; otherwise a square mark in the icon box beside the name. Missing/broken logo → teal building icon + name.

### Tech-stack logos (`public/tech/*.svg`, used by About Tech stack section)
- All logos were visually verified by rasterizing them with `sharp` onto white tiles (contact-sheet in scratchpad) — not just checked that they 200. Re-run that check after swapping any logo.
- **Colored** (devicon, via jsdelivr `gh/devicons/devicon`): `python`, `django`, `flask`, `fastapi`, `javascript`, `electron`, `postgresql`, `mysql`, `mongodb`, `redis` (classic red stacked-cubes), `git`, `googlecloud`, `amazonwebservices` (square 128×128 viewBox), `pytorch`.
- **Simple Icons base** (via jsdelivr `npm/simple-icons`), then **recolored** (Simple Icons ships flat black; we inject `fill` on the `<svg>` root): `docker`=`#2496ED` (official whale silhouette; the old devicon `docker-original` looked muddy/busy), `meta`=`#0467DF`, `celery`=`#37814A` (official — sourced from Celery's own repo favicon, the green rounded-square "C"), `langchain`=`#7FC8FF` (its light-blue chain mark). `openai` left black on purpose (its brand mark is monochrome). Do NOT "fix" it back to a color.
- **`claude.svg`** = the **Claude sunburst** mark (Simple Icons `claude`, NOT the Anthropic corporate "A"), recolored to Claude coral **`#D97757`**. The old `anthropic.svg` (black angular company mark) was removed — it read as the wrong logo for a tile labeled "Claude".
- **`django.svg`** = devicon "dj" mark, recolored `#092e20`→**`#0F7B4F`** (the official bottle-green was so dark it read as black on a white tile).
- **`langgraph.png`** (NOT svg) = LangGraph's **official app-icon** (dark rounded square + light-blue petals) from langchain.com's `apple-touch-icon` (`webclip lg.png`). Used because the LangGraph mark is light-blue (same family as LangChain) and only reads on its dark background; the dark square also makes it visually distinct from the LangChain parrot. Do not swap for a flat light-blue SVG (invisible on white).
- **`electron.svg`** = devicon teal atom (`#47848f`), the light-background Electron logo. NOTE: electronjs.org's own `logo.svg` is the **light-cyan** variant for their dark header (mostly `#A2ECFB`) and is nearly invisible on a white tile, so we deliberately do NOT use it.
- **`huggingface.svg`** = the **official multicolor** logo from huggingface.co (`huggingface_logo-noborder.svg`), not the flat Simple Icon (which was a black silhouette). Keeps the yellow face + orange/red hands.
- **AI & ML group** (7 logos): OpenAI · Claude · Llama · LangChain · LangGraph · Hugging Face · PyTorch. **Logos only — no text note line.** (We tried a `RAG · pgvector · Agentic AI · MCP · NLP` caption; user found text-next-to-logos weird. Rule: if a tool has no usable logo, leave it off this section entirely rather than listing it as text. pgvector/RAG/MCP/NLP therefore don't appear here — they can live on the Résumé skills list instead.)
- To add a tech: drop its SVG in `public/tech/`, add a `{ name, logo }` to the right group in `techGroups` (`app/about/page.tsx`). `TechTile` falls back to a 2-letter monogram if the file is missing.

### Employment types (home Experience)
- Supernomics = **Contract**; Axiomfuse & BRDGE = **Full-time**. Shown as a neutral pill next to the date pill (`employment` field per company).

### Cloudinary images in use
- Home hero portrait: `.../v1756197152/OBD_1829_puui1n.jpg`
- About avatar: `.../v1756197152/OBD_1848_cvlyxt.jpg`
- Speaking / "BTW" carousel: `.../IMG_0711_cbcnks.jpg`, `.../IMG_0713_zfi7bj.jpg`, `.../IMG_0712_hdy03t.jpg`

---

## 3. Home page (`app/page.tsx`) — CURRENT, rebuilt from CV

Multi-section design modeled on the Saachin Bhatt reference (https://saachinbhatt.com/), teal theme, alternating dark/light sections. Current section order:
1. **Hero** (dark) — headline "Where AI meets real-world impact.", portrait + name overlay, CTAs (View Resume → `/resume`; Work with me → contact modal). Hero stats: **28K+ Users reached · 5 Regions worldwide · 3 Global companies**.
*(Removed: the old "Selected Impact / Outcomes, not slideware" stat band — its numbers were redundant with the hero + project cards, and out of sync with the NDA-aligned XCARE/Shyft figures. Also earlier removed: the empty "As featured in" strip.)*
4. **Experience** (light) — timeline of **3 company cards** (Supernomics, Axiomfuse, BRDGE). BRDGE stacks its **two roles** as a sub-timeline showing progression; each role is a one-line summary + tags + "See full résumé →" link. (Trimmed from full bullets on purpose; deep detail is meant to live on the Resume page once synced.)
*(Education section REMOVED from home — it belongs on the About page. Content (Bowen, thesis, Student Icon 360) is in §1 above; drop it onto About when rebuilt.)*
6. **Why I build** (dark) — research-rigour/production-reality narrative.
7. **What I do** (light) — "Four ways I help teams ship AI" service cards.
8. **Selected Work** (**light** — bg-slate-50, white cards, matches Experience/Saachin) — **client × employer** card grid (`work` array in `app/page.tsx`). Each card: client/product logo (or teal "Confidential" monogram icon) + title + desc + role, and a **"Built at [employer logo] Employer"** footer. Public clients (logo + case-study link, ↗ corner icon): **Apprentago** (`public/apprentago-logo.png`, BRDGE), **XCARE Capital** (`public/xcare-logo.svg`, DeFi super-app, `axiomfuse.com/case-studies/xcare-capital`), **Shyft** (`public/shyft-logo.png` shield, NHS healthcare-staffing, `axiomfuse.com/case-studies/shyft-healthcare`, 1,492+ pros / 4,990+ jobs from the public page). `work` order = Apprentago, XCARE, Shyft, Legal Chatbot, LLM Safety, Personality → **home `slice(0,3)` = the three logo'd/public ones**. Legal chatbot / LLM-safety / Personality-assessment stay **Confidential** (NDA — see §5). **Rule established:** if the employer publishes a public case study naming the client, it's no longer confidential → set `clientLogo` + `caseStudyUrl` on that `work` item. Employers credited: BRDGE, Axiomfuse, Supernomics (footer uses their **square marks** — `brdge-logo.png`, `axiomfuse-logo.png`, `supernomics-mark.png` — reads "Built at {Company} [mark]"). Home shows only the **top 3** (`work.slice(0,3)`) + a **"See more of my work → /portfolio"** button. ⚠️ `/portfolio` is still an empty stub — it should be built to show the **full `work` grid** (all 6).
9. **Speaking & Community** (light) — "Ideas worth sharing": carousel + talks list + **"Writing"** block (4 LinkedIn posts: retrospective 4k+, DevFest 3,965, NACOS 3,450, Future-of-Work 1,437 impressions) + **"Featured"** block (2 employer posts about him: Axiom Fuse, Brdge). Both use the shared `PostRow` component — an editorial **divider-line list** (like the talks list): logo box → title → right-aligned uppercase label → ↗ arrow. Writing rows = **LinkedIn** glyph on a blue box + impressions as the label; Featured rows = **company logo** + "Feature" label. Data in `writing` + `featured` arrays. Kept separate on purpose (his writing vs recognition about him). Talks list overlaps thematically with some posts (same events) — acceptable.
10. **Contact CTA** (dark) + **Footer** (dark).

---

## 4. Other pages — STALE (still pre-CV; contradict home)

- **`app/about/page.tsx`** — ✅ **REBUILT** in the teal home UI (`.home-redesign`). Section order (alternating dark/slate-50/white rhythm): 1 Intro (dark, single-column hero), 2 My story (bio + OBD_1848 portrait), 3 **Tech stack** (logo grid), 4 Education (Student Icon 360 only), 5 Leadership & Community (speaking carousel + NACOS/Bowen Tech Week/Youth Parliament/Dev Fest), 6 Writing & Features (4 LinkedIn posts + Axiom/Brdge features), 7 Contact, 8 Footer. Destination for the home "More talks, writing & impact →" link. No em dashes.
  - **Terminal card REMOVED** (the `npm info adebayo-stack` card): it duplicated the tech stack and dropped languages. Replaced by a proper **Tech stack section** — 4 grouped cards (Languages & Frameworks · Databases · AI & ML · Cloud & DevOps), each a responsive grid of **`TechTile`s** (logo + name, `grid-cols-3 sm:grid-cols-4 md:grid-cols-5`). Logos live in `public/tech/*.svg` (see §2 asset list). AI & ML card carries a `note` text line (`RAG · Agentic AI · MCP · NLP`) for the method skills that have no logo. `TechTile` has an `onError` → initials fallback.
- **`app/resume/page.tsx`** — ✅ **REBUILT** as an on-brand **HTML CV** in the teal `.home-redesign` design (matches Home/About). (Superseded an interim PDF-viewer version the user rejected.) **Deliberately LEAN — 3 sections only:** Intro (dark — headline "The full career history." NOT the name (nav/footer already carry it; Home+About open with the name too), title · location line, contact chips incl. **phone** (phone appears nowhere else on the site), professional summary, **Download PDF** + Open buttons), Experience (dense teal-node timeline, **all 5 roles** Supernomics/Axiomfuse/BRDGE×2/**Synergy**/**KPMG** with FULL bullets + tags), Skills (`<TechStack />` logo grid + a pointer line "Education, talks and community work live on the About page").
  - **Education and Leadership sections were REMOVED from the resume by user decision** (About owns both; Leadership was also on Home's Speaking = doubly redundant). Do NOT re-add them here.
  - **Avoids duplication by depth + format:** Home shows one teaser line per role, resume shows full bullets + the two earlier roles Home omits; no Why-I-build / What-I-do / Selected-Work / carousel here.
  - `CV_PDF = "/Adebayo_Abdul-Malik.pdf"` powers the **Download PDF** button. ⚠️ **That PDF is still the OLD one** (Dec 2025, wrong jobs/numbers/GitHub handle) — user must overwrite that exact file (keep the name) with the current CV. The on-page HTML is already accurate.
- **`components/tech-stack.tsx`** — NEW shared component: `TechStack` (the 4-group logo grid) + `techGroups` + `Tech`, extracted from About so About (Toolkit) and Résumé (Skills) render the same grid from **one source**. Each page supplies its own section wrapper/eyebrow/heading.
- **`app/portfolio/page.tsx`** — ✅ **REBUILT** in the teal `.home-redesign` design (matches Home/About). Sections: 1 Intro (dark, "The work, end to end." + Resume/Work-with-me CTAs + 3 stats: 28K+ users · 6 products · 3 companies), 2 **Selected Work** (slate-50, **all 8** `work` items with a category filter: All · AI & LLM · Backend & Platform · Full-stack; `key={filter}` on `StaggerIn` replays the reveal on filter change), 3 "A note on confidentiality" (white, explains the NDA cards + links to About), 4 Contact CTA (dark), 5 Footer (dark). No `ProjectModal` — cards link to public case studies directly, same as Home.
- **`components/work-card.tsx`** — NEW shared module: `work` (the 8 items), `WorkItem`, `WorkCategory`, `workCategories`, and the `WorkCard` component. Extracted from `app/page.tsx` so **Home (`work.slice(0,3)`) and Portfolio (all 6) render the same card from one source** (same pattern as `components/tech-stack.tsx`). `WorkCard` takes `showStack` — Portfolio passes it to add the tech-tag row; Home leaves it off to keep the teaser cards light. Each `WorkItem` now also carries `category`, `stack`, `period`, `confidential`.
  - **`period` is its own field, never appended to `role`.** It renders **right-aligned in the footer row**, opposite "Built at {employer}", in `text-xs text-slate-400`. Cramming the date onto the end of the uppercase teal `role` line produced an ugly 2-line wrap ("FULL-STACK · AI, BACKEND & FRONTEND · APR–OCT 2024"). All 9 cards carry one. ⚠️ **Snugs Baby ("2025") and Gustav ("2025") are INFERRED** from artefact dates inside their docs (Snugs doc "Last updated Dec 2025"; GMF corpus zip dated 2025-05-12), not confirmed by the user. Same for the "2025 – present" on the three Axiomfuse items, derived from the Nov 2025 start date. Confirm before treating as fact.
  - **Pocket Coach · D Jungle People** (BRDGE ⚠️ employer assumed, confirm; position 7, `AI & LLM`, period 2025): **backend + AI only**, not full-stack. Live on the App Store (`id6752876235`) and Play Store; card links to the App Store listing. Client = **D Jungle People**, a HRD Corp registered training provider, Malaysia's top corporate-training firm, **25+ years** in leadership development, `public/djp-logo.svg` (official green/black "D JUNGLE PEOPLE" wordmark from their site). Stack: Django 5.1 + DRF on AWS App Runner, **GPT-4o driving a ~2,500-word T-GROW coaching prompt** built from the client's own corpus (one question per turn, exploration before advice, micro-summaries with a mandatory validation question, micro-tips, a suggestion gate, and a confidence-scored final summary with a 10-turn auto-close), **Whisper STT in / ElevenLabs TTS out** with per-language voices, an EN↔MS Malay translation pipeline, **pgvector RAG** over T-GROW + Coaching Skills, S3 presigned audio, org access codes for B2B, RevenueCat client-side for B2C. (Doc note: the RAG retrieval is ingested but not wired into the chat path. Not mentioned on the card.)
  - **Categories:** `AI & LLM` · `Backend & Platform` · `Full-stack`. **Full-stack** = projects where he owned the AI + backend himself and also built the frontend (replicating Figma designs with AI assistants). Currently only **Snugs Baby**; more of these exist and can be added.
  - **Snugs Baby** (BRDGE, position 4 in `work`, so it is NOT on home's `slice(0,3)` — move it up if it should be): AI weaning chatbot for breastfeeding / early-stage mothers, **integrated into their existing Shopify store** (snugsbaby.com). Django REST + GPT-4o, RAG over NHS/WHO guidance (FAISS + `text-embedding-3-small`), per-baby profiles with age-aware weaning stages, multimodal input (Google Speech-to-Text / Whisper audio, GPT-4o Vision for food photos, PDF/DOCX), NHS/WHO safety checks on every response, food-introduction progress tracking, Shopify product recommendations, Supabase Postgres + OTP auth, AWS S3 media, Docker/Gunicorn. Public site is the link (no employer case study). Logo: `public/snugsbaby-logo.png` (bird + script wordmark, pulled from their Shopify CDN at `600x`, **trimmed of its transparent padding** with sharp, verified on white). It uses `clientLogoClass: "max-h-12"` — a new optional `WorkItem` field that overrides the default `max-h-9` cap, because a wordmark reads smaller than the square marks at the same height.
  - **Gustav** (BRDGE, position 5, **Confidential styling on purpose**): AI assistant for a building-services engineering firm. Started as an exhibition prototype (PDF drawing upload, OCR, entity recognition like pipe/pump/switch, CAD-readable conversion preview) and became a RAG chatbot over the **CIBSE building-services guides + the client's internal documentation**. Stack: Django 5 + DRF, **AWS Bedrock** (`amazon.titan-embed-text-v2:0` @256-d for embeddings, `meta.llama3-8b-instruct-v1:0` @temp 0.3 for generation), **in-process FAISS** `IndexFlatIP` loaded at Django start-up via `AppConfig.ready()` (k=4, 3000-char chunks / 400 overlap), grounded prompt that cites `{pdf_name}_p{page}` and refuses outside the context, auto-titled chats, Postgres, S3 presigned URLs, Docker → ECR → App Runner. ⚠️ **The client (GMF Technologies) is NOT named on the card** — no public case study exists, so the §5 rule keeps it confidential. Ask the user before naming them / adding a logo.

---

## 5. Open questions / decisions pending

1. **MTN Foundation Scholarship** + **"Most Outstanding Student"** appear on About/Resume but NOT on the new CV. Keep (still true) or remove (dropped)? — needs user.
2. **GitHub username mismatch:** nav/home use `abdulmalikadebayo`; resume page shows `github.com/AdebayoAbdulmalik`. Which is correct? — needs user.
3. **Press placeholders are duplicated** (home #2 "As featured in" + home #9 "Publications & press"). Decide: keep one, both, or neither. *(User paused an edit that would have removed "As featured in".)*
4. **Selected Work vs Experience redundancy:** same 4 projects appear in Impact + Experience + Selected Work. Recommendation on the table: **remove Selected Work**, keep a "View all → /portfolio" button on Experience. *(Not yet done.)*
5. **Résumé PDF** in `public/` is outdated vs the new CV — needs re-export/replace.
6. **Theme consistency:** home is teal + dark premium; About/Resume/Portfolio are navy + light. Decide whether to extend the new look.
7. **Stale content sync:** whether to update About/Resume/Portfolio to the new CV (the user originally chose "home page only" but that predates giving the real CV).

## Speaking / writing archive (home shows only curated Highlights; full lists go on About later)

**Talks & leadership**
- Nigeria Youth Parliament — Speaker, Jan 2026 — "AI and the Future of Work" to 150+ young professionals (Lagos West Senatorial District).
- Google Dev Fest, Ibadan — Speaker, Nov 2025 — "From Lagos to the World: Building Scalable AI Systems That Deliver Impact", 3,000+ attendees.
- Bowen Tech Week — Co-Founder & Head, Sponsorships and Partnerships, 2024 — MTN, Nexascale, Cardify Africa; 5+ universities.
- NACOS Bowen — President, 2023–2024 — 800+ members; Best Student Association of the Year.

**Writing (LinkedIn)**
- Shipping AI Solutions from Lagos to the World: A One-Year Retrospective — 4k+ impressions — https://www.linkedin.com/feed/update/urn:li:activity:7344298946644574209/
- Lessons from Google DevFest Ibadan: Building Scalable AI Systems — 3,965 impressions — https://www.linkedin.com/feed/update/urn:li:activity:7406264295312945153/
- A Year as President of NACOS Bowen: Innovation & Excellence — 3,450 impressions — https://www.linkedin.com/feed/update/urn:li:activity:7231974579848531968/
- AI and the Future of Work: Adapt, Don't Resist — 1,437 impressions — https://www.linkedin.com/feed/update/urn:li:activity:7425463424467464193/

**Featured (employer posts about him)**
- Axiom Fuse — "Meet Abdul-Malik Adebayo: Software Engineer at Axiom Fuse" — https://www.linkedin.com/feed/update/urn:li:activity:7426573116140773376/
- Brdge — "Tech Journeys That Inspire: Abdul-Malik at Bowen Tech Week 2.0" — https://www.linkedin.com/feed/update/urn:li:ugcPost:7335357587925688321/

**Home "Highlights" curated set** (`highlights` array in `app/page.tsx`, 5 rows): DevFest (Talk · 3,000+), Retrospective (Article · 4k+), Nigeria Youth Parliament (Talk · Jan 2026), **Axiom Fuse (Feature)**, **Brdge (Feature)** → each links to its LinkedIn post; section ends with "View more → /about". NACOS + standalone "Bowen Tech Week" leadership rows were swapped out for the two employer features (the Brdge feature post IS the Bowen Tech Week 2.0 post). Logos are 48px (prominent, Saachin-style). `nacos-logo.jpg` + `btw-logo.jpg` are now unused on home (kept in `public/` for the About rebuild).

**Shared row component:** `components/highlight-row.tsx` exports `HighlightRow` + `HighlightItem` — the editorial row (logo → title → label → ↗ with white-card hover lift). Used by **both** the home Speaking Highlights and the About Leadership/Writing/Featured lists (same design everywhere).

**Highlights UI** = cloned from Saachin's `.research-item` (checked their `css/site.css`): big divided rows (190px logo col, 26px padding, ~21px title); hover lifts row into a white rounded card (bg + padding-inline + shadow transition) and the ↗ arrow translates (3px,-3px). `HighlightLogo` renders a per-row logo with icon fallback.

**Highlights logo assets (all in `public/`):** `gdg-logo.png` (GDG chevron, from gdg.community.dev favicon), `linkedin-logo.svg` (LinkedIn blue "in", hand-built), `nyp-logo.jpg` (Nigeria Youth Parliament seal), `nacos-logo.jpg` (NACOS Bowen), `btw-logo.jpg` (Bowen Tech Week) — the last three were user-supplied JPGs (white bg). `HighlightLogo` still falls back to a teal icon if any file is missing.

## 6. Priorities (recommended)
1. ~~Portfolio page~~ ✅ done (rebuilt on the shared `work` data).
2. ~~Resume page~~ ✅ rebuilt — but the **PDF in `public/` is still the old one** and must be replaced.
3. ~~About page~~ ✅ rebuilt.
4. Resolve the open questions in §5 (MTN scholarship, GitHub handle, press placeholders).
