# Projects

The project content exactly as it appears on the website (cards and project detail modals).

---

## FarmBuddy

- **Tag line:** Full-stack · AI, Backend & Frontend
- **Timeline:** Dec 2025 – Aug 2026
- **Built for:** Undergraduate Thesis
- **Categories:** Full-stack, AI & Backend
- **Featured on homepage:** Yes
- **Tech stack:** Next.js, Django, OpenAI, YarnGPT, PWA, Telegram Bot

### Card summary

Most AI tools ship English-first and assume fast internet. FarmBuddy gives Nigerian smallholder farmers advice grounded in their own soil, crops and local weather, built to work in low-data areas. It's multimodal and multilingual: farmers can type, speak or send a leaf photo in Nigerian English, Hausa, Igbo or Yoruba.

### Impact

- **89.56**: System Usability Scale score, rated Excellent
- **80**: Participants in the usability study, 72.5% of them with farming experience
- **1.2–2.8s**: Time until the first words of a reply appear

### The problem

Smallholders do most of Nigeria's farming, but there aren't nearly enough extension officers to advise them. When a farmer spots a pest or a sick crop, help can take days to arrive, and acting too late can cost a whole planting season. The digital tools that exist rarely fit them either. Most solve a single problem and expect a recent phone and a fast connection that many rural farmers don't have. AI platforms in particular tend to ship English first, leaving out farmers who speak Hausa, Igbo or Yoruba, and most only work by text, which shuts out anyone who would rather speak or show the problem. Generic advice isn't much help anyway: what works for one farm can be wrong for the next, depending on the soil, the crop and the weather that week.

### The solution

I built FarmBuddy around the three things most AI tools leave out: low-data access, local languages and more than one way to ask. Farmers reach it through an installable web app or a Telegram bot, so it stays usable on a weak connection without downloading a native app. It's multimodal, so they can type a question, speak it or send a photo of a leaf, and multilingual from the ground up, working in Hausa, Igbo and Yoruba as well as Nigerian English. Every answer is grounded in the farmer's own soil, location and crops, along with live local weather, rather than generic tips, and it can be read aloud in a Nigerian voice on either channel. Behind it, a Django backend coordinates four models: GPT-4o-mini for conversation, GPT-4o Vision for diagnosing crop disease, Whisper for transcribing speech and YarnGPT for speaking the answers.

### Edge cases I covered

- **The model isn't sure what's wrong with a crop**: Every diagnosis comes with a confidence level. When it's low, the advisor says it isn't sure and recommends speaking to an expert.
- **The farmer has no email address**: Password resets use a security question, so a farmer can recover their account without email.
- **Browser speech recognition fails**: The recording is sent to OpenAI Whisper as a fallback, and voice input keeps working in all four languages.
- **The connection drops**: The installed app loads from its cache and shows a proper offline page rather than a browser error.
- **A large photo on a weak network**: Photos are scaled down to a maximum of 1024px before analysis, keeping them light enough for a poor connection.
- **The same farmer uses the web app and Telegram**: A link token from their profile connects the two, giving them one account and one shared history.

### Links

- **View code (GitHub):** https://github.com/Abdul-Salam15/Farm-Buddy-v2
- **Live demo:** https://farmbuddy-orcin.vercel.app/

---

## AI Proposal Generator

- **Tag line:** Full-stack · AI Document Generation
- **Timeline:** 2026
- **Built for:** Koya Talent
- **Categories:** Full-stack, AI & Backend
- **Featured on homepage:** Yes
- **Tech stack:** Next.js, Claude API, Supabase, Postgres RLS, Puppeteer

### Card summary

An internal tool that turns discovery-call notes into a client-ready proposal, with Claude drafting one section at a time. A proposal can't reach the client until both the salesperson and a separate admin have approved it.

### The problem

Every deal at Koya Talent needs a proposal built from the discovery-call notes, covering scope, deliverables, timeline and pricing. AI can write a first draft quickly, but there are two catches. A wrong price or timeline can't reach a client without someone checking it, and when the notes have gaps, a model tends to fill them with details nobody agreed to.

### The solution

The salesperson fills in an intake form, and Claude drafts the proposal section by section, from the introduction through to pricing. Any section can be edited or regenerated on its own without affecting the others. Once the salesperson submits it, an admin reviews it, and only after approval can it be exported as a hosted page and PDF and emailed to the client. The approval rule is enforced twice, once in the API and again with Postgres Row-Level Security, and every step is logged.

### Edge cases I covered

- **Notes say "TBD" or leave a field blank**: That section is marked [NEEDS INPUT] and Claude isn't called at all. Nothing gets made up, and no API call is wasted.
- **Someone tries to send before approval**: The server rejects the export with a 409 error, even if the UI is bypassed.
- **A salesperson double-clicks Regenerate**: The button disables after the first click and a server-side lock blocks the second request, so one action can't trigger two paid calls.
- **Two sections are regenerated at once**: Each write goes through an atomic database function that only touches its own section, so neither can overwrite the other.
- **A proposal is edited after it's submitted**: Any edit sends it back to draft, so an admin can never approve a version that has since changed.
- **The client's email is malformed**: The address is validated before sending. If it's invalid, the error shows on the proposal and in the log, rather than failing inside the email provider.

### Links

- **View code (GitHub):** https://github.com/Abdul-Salam15/AI-Proposal-Document-Application
- **Live demo:** https://ai-proposal-generator-iota.vercel.app/
- **Video walkthrough:** https://www.loom.com/share/3f2e84cdbced4cf488b0499c6d628fd9
- **One-pager:** https://docs.google.com/document/d/1Z8L1gRWC8JkBs08ozbJCKfT35NXXkHpJHRsvnsNmCZ4/edit?usp=sharing

---

## Lead Triage System

- **Tag line:** Full-stack · Data Pipeline & Applied ML
- **Timeline:** 2026
- **Built for:** Koya Talent
- **Categories:** Full-stack, AI & Backend
- **Featured on homepage:** Yes
- **Tech stack:** Django, React, OpenAI GPT-4o-mini, Unsupervised Clustering, Rule-Based NLP

### Card summary

Inbound leads arrive as messy CSVs with no consistent format. This pipeline cleans them, removes spam and non-buyers before spending anything on AI, and gives sales a ranked list with the reasoning behind every score.

### The problem

Inbound leads come in as CSV exports in whatever format the source produced. Column names vary, names, budgets and notes are inconsistent, and real prospects are mixed in with spam, competitors and people who can't make a purchase. Before sales can make a single call, someone has to clean the data, remove the bad leads and decide who matters most. Sending every row to an LLM would do the job, but the cost adds up quickly.

### The solution

A Django and React app that accepts the CSV exactly as it comes. It maps each column to a known field using exact and fuzzy header matching, cleans every value, and uses rules to disqualify spam, competitors and non-decision-makers before any AI is involved. Similar leads are then grouped into clusters, and GPT-4o-mini analyses two or three representatives from each cluster rather than every row. Each lead is scored and placed into one of five tiers. Without an API key, the whole pipeline runs on heuristics at no cost.

### Edge cases I covered

- **Column names don't match anything expected**: Headers are matched exactly first, then ignoring case, then fuzzily. The user can review the result and correct any mapping.
- **The upload isn't really a CSV**: Files are checked for type, size and binary content, and the text encoding is detected before anything is parsed.
- **The same company appears several times**: Company names are normalised to a slug, which makes duplicates easy to catch.
- **Spam, competitors and non-buyers**: Rule-based checks remove them before any LLM call, so none of the AI budget is spent on them.
- **No OpenAI key is set**: The pipeline switches to deterministic heuristics and still produces a complete ranking.
- **A large file on free hosting**: Processing runs in the background while the UI polls for progress, which keeps requests clear of the host's timeout.

### Links

- **View code (GitHub):** https://github.com/Abdul-Salam15/LeadTriage
- **Live demo:** https://lead-triage-addg.onrender.com/
- **Video walkthrough:** https://www.loom.com/share/693afd7504a4496fb763eb5467ecae86
- **One-pager:** https://docs.google.com/document/d/1Q2csRj8T2uS1fpxPmrapvpFQTo96TNGrz6yDIH07CVQ/edit?usp=drivesdk

---

## AI Operations Reporting System

- **Tag line:** Workflow Automation & Analytics
- **Timeline:** 2026
- **Built for:** Koya AI Academy
- **Categories:** Automation, AI & Backend
- **Featured on homepage:** No
- **Tech stack:** n8n, Claude API, Supabase, Google Sheets API, Airtable API

### Card summary

Koya AI Academy's sales, delivery and people-ops data lived in three separate systems. I built an n8n workflow that calculates every metric in code, then has Claude write the executive summary from the finished numbers.

### The problem

Leadership at Koya AI Academy wanted one report covering sales, project delivery and people operations. The data was spread across Google Sheets, Airtable and a people-ops API, none of them connected. Handing the arithmetic to an AI wasn't an option, because it can produce figures that sound confident and are simply wrong.

### The solution

Leadership picks a reporting period and runs the n8n workflow. It pulls records from all three sources, cleans them and calculates every metric in code. Claude only receives the finished figures, and uses them to write the executive summary, risks, recommended actions and notes on data quality. The results are saved to Supabase, where a public dashboard reads them.

### Edge cases I covered

- **The same period is requested twice**: The workflow finds the existing report in Supabase and returns it without calling Claude again.
- **Records with blank or invalid dates**: They're excluded from date-based metrics and listed as data-quality warnings, and the run carries on.
- **Missing amounts or statuses**: The record stays in, and a structured warning is logged so the gap is visible.
- **Headcount doesn't fit a date range**: It's counted across the full dataset as of the last day of the period, so staff with no recent hire or exit are still included.
- **A source sheet comes back empty**: The node is set to always return output, so an empty sheet doesn't stop the workflow.
- **Unexpected status values**: They're flagged as data-quality warnings instead of being counted under the wrong status.

### Links

- **Live demo:** https://koya-operation-report.netlify.app/
- **Video walkthrough:** https://www.loom.com/share/f438640a02c4496f885bf0662b94239c
- **One-pager:** https://docs.google.com/document/d/1JHFuq33TfIOh6jw9PNch3gQRsg4oIhZaGH0rMWBIOnE/edit?usp=sharing

---

## AI Content Research & Publishing Agent

- **Tag line:** Workflow Automation · AI Content Pipeline
- **Timeline:** 2026
- **Built for:** Koya Talent
- **Categories:** Automation, AI & Backend
- **Featured on homepage:** No
- **Tech stack:** n8n, Claude API, Supabase, Postgres RLS, Realtime

### Card summary

Koya Talent's content team produced every piece by hand, one slow step at a time. I built an event-driven system that turns an idea into source-backed drafts and channel-ready posts, with a manager signing off before anything is queued.

### The problem

Koya Talent's content team followed the same manual process for every piece: brainstorm, research, write an SEO article, adapt it for each channel, review it and publish. It worked, but it couldn't scale. Each step was slow, quality and accuracy depended on who did the work that day, and nothing recorded which sources supported the claims in a piece.

### The solution

A web app built on Supabase, with n8n workflows that react to every change in the data. A strategist submits an idea, and Claude researches it and writes two article options based on the sources it found. Each draft is scored against a quality rubric, and weak drafts are revised automatically, up to three times. The strategist chooses one and a manager approves it. Only then is it adapted for LinkedIn, X and a newsletter and added to the publishing queue.

### Edge cases I covered

- **There isn't enough source material**: The request is marked "needs more context" and the strategist is told, rather than letting the model fill the gaps.
- **A draft keeps scoring badly**: Revisions stop after three passes, so a weak draft can't loop endlessly or keep adding cost.
- **Approval arrives before every channel is ready**: Writes to the queue are de-duplicated, so running approval again fills in the missing channels without doubling the ones already there.
- **A Claude reply is cut off at its token limit**: The parser checks why Claude stopped and raises a clear error, instead of trying to read incomplete JSON.
- **A strategist submits too many requests**: Anything over the limit is marked "rate limited" so it doesn't sit silently in the queue.
- **A step fails anywhere in the pipeline**: A global error handler records the workflow, the step and the input in the audit log.

### Links

- **View code (GitHub):** https://github.com/Abdul-Salam15/-AI-Content-Research-and-Publishing-Agent
- **Live demo:** https://ai-content-pipeline.netlify.app/
- **Video walkthrough:** https://www.loom.com/share/53d7c52d2844493c82c8625620e75a88
- **One-pager:** https://docs.google.com/document/d/1ef3vU9WIZI_8s9p7grQCzlkubfjYAcaT5C8Sud5G0OA/edit?usp=sharing

---

## Intelligent Invoice Processing

- **Tag line:** Workflow Automation & AI Integration
- **Timeline:** 2026
- **Built for:** Novus Realty
- **Categories:** Automation, AI & Backend
- **Featured on homepage:** No
- **Tech stack:** n8n, Claude API, Gmail API, Google Sheets

### Card summary

Novus Realty receives invoices by email in all sorts of layouts, sometimes attached and sometimes written into the message. I built an n8n workflow that identifies the real invoices, extracts the key details with Claude and logs every outcome to a Google Sheet, failures included.

### The problem

Invoices reach Novus Realty by email in every format, as PDF attachments or typed into the message body, and they arrive alongside emails that only mention billing. Each invoice has to be recorded exactly once, with its vendor, amount, dates and currency. Vendors don't use reliable invoice numbers, which makes it easy to log the same invoice twice.

### The solution

An n8n workflow monitors the inbox and asks Claude whether each email is actually an invoice. If it is, Claude extracts the vendor, amount, dates and currency. Duplicates are checked both before and after the Claude call, and every outcome is written as its own row in a Google Sheet. Failures get a row too, with a status and a reason.

### Edge cases I covered

- **The invoice is in the email body**: When there's no attachment, the body text is used as the source, so these invoices still get processed.
- **One email has several attachments**: Each attachment is split out and processed separately.
- **An email mentions billing but isn't an invoice**: Claude classifies it as not an invoice, and it's logged along with the reason.
- **A corrupt or unreadable PDF**: The failed extraction is caught and logged with its own status, and the rest of the run continues.
- **The same invoice arrives twice**: Before Claude is called, the workflow checks the sender and every attachment name. After extraction, it also checks for a match on the extracted fields.
- **Extracted text is garbage**: Text quality is checked first, so Claude is never called on unreadable input.

### Links

- **Video walkthrough:** https://www.loom.com/share/e298a98890f64874bbb67ccd35a9ec0a
- **One-pager:** https://docs.google.com/document/d/1Y-ptWii39rM7HGcOMSe13q-BrAB_aeS4Px18Z3jJpzw/edit?usp=sharing

---

## Casefile · AI Lead Research & Outreach Agent

- **Tag line:** Full-stack · AI Agent Engineering
- **Timeline:** 2026
- **Built for:** Koya Talent
- **Categories:** Full-stack, AI & Backend
- **Featured on homepage:** No
- **Tech stack:** Claude Agent SDK, TypeScript, Express, Postgres, Supabase, MCP Tools, Zod

### Card summary

Koya Talent researched outbound leads and wrote every message by hand, one company at a time. I built an agent that turns a one-line objective into an evidence-backed lead list with outreach already drafted. It can't send anything on its own.

### The problem

Outbound sales at Koya Talent was entirely manual. Someone had to define the target customer, search for companies, read each website to judge the fit, then write personalised outreach for every one. It was slow, it didn't scale, and quality depended on who was doing it. Automating it carries real risk, though. An agent could email the wrong people, make up facts about a company or run up a bill with no ceiling.

### The solution

A research agent built on the Claude Agent SDK. Given a one-line objective, it drafts an Ideal Customer Profile, then pauses so a person can review and edit it before any money is spent. Next, it finds companies through a LinkedIn search API, scrapes their websites and qualifies each one with cited sources and a confidence score. For every qualified lead, it drafts a three-email sequence and a LinkedIn message. The agent has no way to send anything, and every guardrail lives in code, not just in the prompt.

### Edge cases I covered

- **The agent cites evidence it never collected**: If a lead cites the company's own website but that site wasn't scraped during the run, the lead is rejected.
- **A website contains hidden instructions**: Scraped text is wrapped and labelled as untrusted data, so the agent reads it as content, not as instructions to follow.
- **A scrape target points at an internal address**: Only http(s) links are allowed, and private, loopback and cloud-metadata addresses are blocked.
- **Parallel tool calls race past a limit**: Usage counters are checked and updated before each call starts, not after it finishes, so simultaneous calls can't slip past the cap.
- **A search result is too large**: Results are trimmed to a size limit, with a note saying how many were left out, so the agent still has something to work with.
- **The same company is saved twice**: Leads are keyed by run and domain, so saving the same company again updates the existing row. Totals are recalculated from the actual rows.

### Links

- **View code (GitHub):** https://github.com/Abdul-Salam15/AI-Lead-Research-and-Outreach-Agent
- **Live demo:** https://casefile-on5n.onrender.com/
- **Video walkthrough:** https://drive.google.com/file/d/1XJraQps9qfJtIy-KdchqpubqTURRYdQe/view?usp=sharing
- **One-pager:** https://docs.google.com/document/d/1SJvrtFwH2b73yltrEqq0ce4vd9c4U5anZz0ViOVNBjA/edit?usp=sharing

---

## Nexus

- **Tag line:** Full-stack · AI, Backend & Frontend
- **Timeline:** Aug 2025 – Jul 2026
- **Built for:** Personal project
- **Categories:** Full-stack, AI & Backend
- **Featured on homepage:** No
- **Tech stack:** React, TypeScript, Express, Gemini API, JWT

### Card summary

A task manager that plans your week for you. It fits pending tasks into the coming weekdays based on deadline, priority and effort, and uses Gemini to suggest what to work on next.

### The problem

A to-do list shows what's pending, but not when to do it. Working out how tasks with different deadlines, priorities and effort fit into the days ahead is planning you still have to do yourself, and it's easy to overload a single day.

### The solution

A full-stack task manager built with React and Express. The auto-scheduler fits pending tasks into the coming weekdays, ordered by deadline, then priority, then effort. No day goes over 8 hours, and you get a warning when the plan is overloaded. The app also tracks completion rate, streaks and daily workload, and uses Gemini to recommend what to tackle next. Accounts use JWT access and refresh tokens, and passwords can be reset with a code sent by email.

### Edge cases I covered

- **A day has more work than fits**: Each day is capped at 8 hours, and the scheduler warns you when the plan is overloaded.
- **No Gemini API key is configured**: Recommendations switch to built-in heuristics, so the feature keeps working.
- **The access token expires mid-session**: The app catches the 401 response, refreshes the token and retries the request.
- **A category with tasks in it is deleted**: Its tasks are moved to another category, so nothing is lost.
- **A user forgets their password**: They get a 6-digit code by email that expires after 5 minutes. Entering it gives them a reset token that lasts 10 minutes.
- **One account reaching another's data**: Every route verifies the token, and every query is limited to the signed-in user's data.

### Links

- **View code (GitHub):** https://github.com/Abdul-Salam15/Nexus-Task-Manager
- **Live demo:** https://nexus-frontend-2hy5.onrender.com

---

## CardioXAI

- **Tag line:** Applied Machine Learning
- **Timeline:** Jun 2026 – Jul 2026
- **Built for:** Personal project
- **Categories:** AI & Backend
- **Featured on homepage:** No
- **Tech stack:** Python, Scikit-Learn, XGBoost, SHAP, LIME, SMOTE

### Card summary

Most heart-disease risk tools rely on lab tests that many people can't easily get. I built an explainable model that estimates coronary heart disease risk from self-reported answers alone, reaching 0.815 AUC-ROC.

### Impact

- **0.815**: AUC-ROC on the held-out test set
- **0.413**: F1 score, the highest of all the models tested
- **253,680**: CDC survey records in the source dataset

### The problem

Standard risk tools like Framingham and QRISK3 depend on clinical measurements such as cholesterol, blood pressure readings and fasting glucose. People without regular access to healthcare can't easily get those numbers, which leaves many of them out, particularly in low- and middle-income countries.

### The solution

A Django web app that estimates coronary heart disease risk from 16 self-reported answers covering demographics, medical history and lifestyle. I trained Logistic Regression, Random Forest and XGBoost models on the CDC's BRFSS survey data, used SMOTE to balance the classes, and combined the three into a weighted consensus ensemble. Each result includes SHAP and LIME explanations, a confidence tier, a knowledge graph of risk factors and up to five lifestyle recommendations based on cardiovascular guidelines.

### Edge cases I covered

- **Only 12.2% of records are positive cases**: SMOTE is applied to the training set only, so validation and test scores reflect real-world data.
- **The models disagree on a person**: Disagreement and uncertainty push the result into a low confidence tier, which directs the user to a doctor rather than showing a score that could mislead them.
- **One explanation method could mislead**: SHAP and LIME appear side by side, so users can compare the two.
- **Advice that sounds right but isn't**: Recommendations come from established cardiovascular guidelines, not from a language model.
- **Sensitive health answers**: Nothing is stored beyond the browser session, and nothing is shared with third parties.
- **Users treating it as a diagnosis**: Clear disclaimers appear before, during and after the assessment.

### Links

- **View code (GitHub):** https://github.com/Abdul-Salam15/CardioXAI
- **Live demo:** https://cardioxai-rovx.onrender.com

---

## VitalWatch

- **Tag line:** Full-stack · AI, Backend & Frontend
- **Timeline:** May 2026 – Jul 2026
- **Built for:** Personal project
- **Categories:** Full-stack, AI & Backend
- **Featured on homepage:** No
- **Tech stack:** Next.js, TypeScript, Prisma, PostgreSQL, Auth.js, Brevo

### Card summary

A health-monitoring app for logging daily vitals and keeping track of medication. It flags readings outside healthy ranges and emails a caregiver when a dose is missed.

### The problem

People managing their health at home have to keep track of their own vitals and medication. The people caring for them often don't hear about a missed dose or a worrying reading until much later.

### The solution

A Next.js app for logging heart rate, SpO2, temperature and steps. Every reading is checked against healthy ranges and flagged straight away if it falls outside them. When a dose is late, the app sounds a reminder. If the dose still isn't confirmed, the patient receives a reminder email and their caregiver gets an alert. Caregivers can follow along through a read-only link, with no account needed.

### Edge cases I covered

- **The patient is in a different timezone from the server**: Due times and the start and end of each day are calculated in the patient's own timezone.
- **Several checks fire for the same missed dose**: Each reminder and caregiver email goes out at most once per dose per day, no matter how often the check runs.
- **Scheduled jobs run late**: While the app is open, it runs the reminder check itself, so emails still go out on time if the scheduled job is delayed.
- **An alarm would ring again after a reload**: Taken, snoozed and dismissed states are saved in the browser, so alarms don't go off a second time.
- **A step count lower than earlier the same day**: It's rejected, because steps are recorded as a running total for the day.
- **A caregiver without an account**: They use a private link with a token, and the patient can generate a new one at any time.

### Links

- **View code (GitHub):** https://github.com/Abdul-Salam15/VitalWatch
- **Live demo:** https://vitalwatch-5hgr.onrender.com