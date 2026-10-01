# Casefile — AI Lead Research and Outreach Agent

Give it one plain-English sentence, such as *"Find 10 US B2B SaaS companies with 10–100 employees that may need AI automation support"*. It returns a reviewable, evidence-backed lead list with drafted outreach. **It never sends anything.**

## Problem

Koya Talent places trained AI-automation assistants with early-stage founders, operators and agency owners. Its outbound process was fully manual:

1. Define a target customer profile.
2. Search for matching companies by hand.
3. Read each company's website to judge fit.
4. Write personalized cold outreach one company at a time.

This is slow and doesn't scale. Quality also depends on who does it that day. Automating it is risky if the agent can email the wrong people, invent facts about companies, or run up an unbounded API bill. So the goal is to automate the research and drafting while a human stays in control of who is contacted.

## Solution

Casefile is a Node/Express + TypeScript app with a vanilla-JS frontend. A real tool-using agent, built on the Claude Agent SDK, runs a two-phase pipeline per request (a "run"):

1. **Refine** the objective into a structured Ideal Customer Profile (ICP): industries, geography, headcount, buyer persona, hard filters, soft preferences and disqualifiers.
2. **Human checkpoint.** The run pauses at `awaiting_confirmation` so you can edit the ICP before any money is spent.
3. **Discover** candidate companies through a LinkedIn company-search API (Apify).
4. **Scrape** each candidate's public website (Firecrawl).
5. **Qualify** each company as `qualified`, `not_qualified` or `needs_review`, with a confidence score and cited source URLs.
6. **Draft outreach** for qualified companies only: a 3-step cold email sequence plus one LinkedIn message.
7. **Persist** the run, every lead and a full tool-call audit log to Supabase (Postgres).
8. **Review** in the UI: edit leads, regenerate single messages, stop a run, and export CSV.

If the target lead count isn't reached, the run records a short plain-English explanation of why.

## Edge cases and guardrails covered

Most guardrails are enforced in code, not just requested in a prompt.

**Scope and safety**
- **No send capability.** No tool exists to email or message anyone, and personal emails are never looked up.
- **Per-phase tool allowlist.** Phase 1 can only reach `Skill` and `save_icp`. A second, independent `PreToolUse` hook re-checks and denies out-of-scope calls.
- **Prompt injection.** Scraped text is wrapped in `<untrusted_website_content>` tags and labeled as data, not instructions.
- **SSRF.** Scraping rejects non-http(s) schemes and blocks loopback, private, link-local and cloud-metadata IPs.
- **Fabricated evidence.** `save_lead` rejects a lead that cites its own domain as a source unless that domain was actually scraped this run.
- **Incomplete drafts.** A `qualified` lead is rejected unless it has all 3 emails plus a LinkedIn message.

**Cost and limits**
- **The agent can't change limits.** Lead target, candidate count, scrape count and spend caps live in server-side state and are never tool parameters. The agent never decides how many companies to pull.
- **Parallel tool-call race.** The discovery call-count ceiling is checked and incremented synchronously, before the async call. This was a real race when the model fired several calls in one turn.
- **Three discovery ceilings:** call count, discovered-domain count and real-dollar spend.
- **Self-calibrating cost model.** The app learns real cost per result from the discovery API's billing data and adjusts future caps gradually.
- **Oversized tool results.** Discovery results are trimmed to a character budget, with a note of how many were omitted. Oversized results were previously being written to disk and lost to the agent.
- **Regeneration spam.** Rewrites are rate-limited (default 3 per lead per 30 minutes).

**Data and reliability**
- **Multi-user isolation.** Row-Level Security on every Postgres table is the real data boundary.
- **Duplicates.** Leads are keyed by `run_id` + `company_domain`, so a repeat save merges instead of duplicating. Near-duplicate objectives are detected.
- **Stop vs. finish race.** Terminal writes only apply while the run is still `running`, so a stop request can't corrupt a natural completion.
- **Counter drift.** Lead and company counts are recomputed from real rows after every change.
- **Graceful degradation.** Failures in notification email, calibration writes or the primary scraper are logged and swallowed. A fallback scraper is used where possible.
- **Unmatched industries.** Free-text industries are mapped to LinkedIn taxonomy IDs by deterministic token matching, so the model never invents IDs.

## Tools

**Agent tools** (custom MCP tools with Zod-validated input and output, in [src/agent/tools.ts](src/agent/tools.ts))

| Tool | Purpose |
| --- | --- |
| `save_icp` | Save the structured ICP (phase 1) |
| `discover_companies` | Find candidate companies via LinkedIn search |
| `scrape_website` | Fetch a candidate's public site text |
| `save_lead` | Save a qualification decision and outreach drafts |

**Agent Skills** (`.claude/skills/`): `icp-refinement`, `lead-qualification`, `outbound-copywriting`, `outreach-safety`, `lead-list-quality`. Their source guides are in [assets/](assets/). This is not RAG: grounding comes from scraped text placed in context plus schemas that require cited sources.

**Models**
- Sonnet, via the Agent SDK, runs the research and drafting loop.
- Haiku 4.5, via the plain Anthropic SDK, does cheap single-message regeneration.

**Stack**
- Node 20+, Express 5, TypeScript, run with `tsx` (no build step)
- Supabase (Postgres, Auth, RLS)
- Apify, Firecrawl, Nodemailer (run-complete notification)
- Vanilla JS single-page frontend ([public/](public/))
- Render for hosting. The Agent SDK spawns a persistent subprocess, so serverless won't work.

## Project layout

```
src/server.ts          Express entry point
src/routes/            runs.ts, leads.ts (RLS-scoped via user JWT)
src/middleware/        requireAuth.ts
src/agent/             runAgent.ts, tools.ts, systemPrompt.ts, hooks.ts
src/lib/               apify, scrape, linkedinIndustries, regenerateOutreach,
                       similarity, notify, supabase, outreachFormatting
public/                Frontend SPA
supabase/migrations/   0001–0009 SQL migrations
assets/                Source guides for the agent skills
PRD.md                 Project brief
audit.md               PRD-vs-code self-audit
```

## Getting started

```bash
npm install
cp .env.example .env     # fill in keys
# run supabase/migrations/*.sql in order in your Supabase project
npm start                # tsx src/server.ts
```

Required env vars: `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`, `APIFY_TOKEN`, `APIFY_ACTOR_ID`, `FIRECRAWL_API_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `APP_BASE_URL`.

Tunable limits (defaults in [render.yaml](render.yaml)): `MAX_SCRAPES`, `MAX_TURNS`, `MAX_BUDGET_USD`, `MAX_DISCOVERY_BUDGET_USD`, `MAX_DISCOVERY_SPEND_PER_RUN_USD`, `TARGET_QUALIFIED_LEADS`, `REGENERATE_LIMIT`, `REGENERATE_WINDOW_MINUTES`.

Deploy by creating a Render Blueprint from this repo and entering the secret env vars in the dashboard.

## Known tradeoffs

- No automated test suite. Validation was manual against a 7-scenario matrix.
- No CI, ORM or bundler.
- No retry-with-backoff library.

## Further reading

- [PRD.md](PRD.md): project brief
- [project-explanation.md](project-explanation.md): deeper architecture walkthrough
- [implementation.md](implementation.md): implementation plan
- [audit.md](audit.md): security and PRD-fidelity audit
