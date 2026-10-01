# AI Content Research and Publishing Agent

An automated pipeline that turns a raw content idea or source URL into reviewed, source-grounded, channel-ready content for LinkedIn, X, and an email newsletter, with a human approving before anything is queued for publishing.

Built for the Koya Bootcamp, Week 4. See [PRD.md](PRD.md) for the original brief.

## Problem

The content team at a marketing agency (Koya Talent) runs the same manual pipeline for every piece: brainstorm, research, write an SEO article, adapt it for each channel, review it internally, then publish. It works, but it doesn't scale:

- Every step is manual and slow.
- Quality, tone, and factual accuracy depend on who does the work that day.
- There is no consistent record of why a piece says what it says, or which sources back it.

## Solution

A web app plus an event-driven automation pipeline:

1. A strategist submits an idea, target audience, and an optional source URL or supporting material.
2. The system researches the topic (scrapes the URL, or searches the web if none is given) and selects the relevant excerpts.
3. Claude plans an outline and writes **two article options**, following the [SEO best practices](assets/seo-best-practices.md).
4. Each draft is scored against the [evaluation rubric](assets/content-evaluation-rubric.md). Weak drafts are revised automatically, up to 3 passes, and every evaluation is kept as history.
5. The strategist compares the options, optionally requests a targeted rewrite, picks one, and submits it for approval.
6. A manager approves, rejects, or requests revision. A comment is required for anything except approval.
7. Only on approval is the article adapted to LinkedIn, X, and newsletter formats, checked against the [channel formatting rules](assets/channel-formatting-rules.md), and placed in the publishing queue.
8. A human posts it on the real platform and pastes the live URL back to close the loop.

Two human checkpoints (draft selection and manager approval) gate everything. The gate is enforced in the request `status` state machine, not just in the UI.

```
draft → researching → drafting → evaluating → (needs_revision ↺) → ready_for_review
      → pending_approval → approved → queued → published
                          ↘ rejected
      (exception states: rate_limited, needs_more_context, failed)
```

## Architecture

```
Browser (single static HTML/JS page)
   │  Supabase JS client
   ▼
Supabase: Postgres + RLS · Auth · Realtime · Database Webhooks
   │  (row insert triggers)
   ▼
n8n workflows: request listener · submission listener · approval listener
               regenerate-draft · user admin webhooks · global error handler
   │
   ▼
Claude API (structured JSON output at every stage)
```

There is no custom backend server. The frontend writes rows to Supabase, and n8n reacts to those inserts through webhooks.

## Edge Cases Covered

**Input and research**
- Idea-only requests (no URL) fall back to web search for source material.
- URL-based requests scrape the page and use its content as the primary source.
- Not enough usable source material sets the request to `needs_more_context` and notifies the strategist, rather than letting the model invent content.

**Generation and quality**
- Claims are constrained to retrieved excerpts, and the sources that informed the output are shown.
- Weak drafts go through a bounded generate → evaluate → revise loop. The 3-pass cap is shared with mechanical formatting retries, so a draft can't loop forever or run up cost.
- Evaluation history is versioned, so the review trail survives revisions.
- Small changes use a targeted section-level regeneration from a free-text note, not a full pipeline re-run.

**Approval and publishing**
- Nothing is queued before a manager approves.
- Reject and revise decisions require a comment, and every decision is kept in an append-only approval log.
- Duplicate webhook events are ignored, and publishing-queue writes are de-duplicated so a re-fired approval can't create duplicate rows.
- A request flips to `published` automatically once every channel has a confirmed live URL.

**Reliability and operations**
- Per-account rate limiting surfaces as an explicit `rate_limited` status, not a silent failure.
- A Global Error Handler is attached to every n8n workflow and logs the failing step, workflow name, and input to `audit_log`.
- The manager-only Audit Log page translates raw action codes into plain-language sentences, with the raw JSON available for debugging.
- Row Level Security limits strategists to their own requests, and role changes go through a privileged RPC (`set_user_role`) to prevent privilege escalation.

## Tools and Tech Stack

| Layer | Tool |
|---|---|
| Orchestration | n8n (cloud), triggered by Supabase database webhooks |
| AI | Claude API: research reasoning, outline planning, drafting, rubric evaluation, revision, channel adaptation |
| Database, auth, realtime | Supabase (Postgres, Auth, Row Level Security, Realtime, Admin API) |
| Research and retrieval | Live URL scraping and web search with excerpt selection (not an embeddings store) |
| Frontend | Single static `index.html` (no build step) using the Supabase JS client, IBM Plex fonts |
| Notifications | Gmail SMTP, sent from n8n at each handoff point |

Techniques demonstrated: multi-stage prompting, LLM-as-judge evaluation, bounded self-correction, human-in-the-loop gating, event-driven orchestration, database-enforced authorization, and structured audit logging.

## Repository Contents

| File | Purpose |
|---|---|
| [PRD.md](PRD.md) | The project brief and test scenarios |
| [frontend/index.html](frontend/index.html) | The web app |
| [assets/seo-best-practices.md](assets/seo-best-practices.md) | SEO rules for article generation |
| [assets/channel-formatting-rules.md](assets/channel-formatting-rules.md) | Formatting rules for LinkedIn, X, and newsletter |
| [assets/content-evaluation-rubric.md](assets/content-evaluation-rubric.md) | Criteria for the review and revision loop |

## How to Use

**Content strategist**
1. Sign in (a manager invites new users).
2. On the Requests page, submit an idea, audience, and optional source URL or material.
3. Watch the progress tracker. When options are ready, compare them, optionally request a targeted rewrite, then select one and submit for approval.

**Manager**
1. Open a `pending_approval` request and approve, reject, or request revision.
2. After approval, go to the Publishing Queue. Copy each channel's text, post it manually, and paste the live URL back to mark it published.
3. Use the Audit Log to debug anything stuck.

## Known Limitations

- One manager decision counts as sign-off. There is no second-reviewer step.
- Channel checks (word count, hashtag count) are computed but don't yet block an out-of-range post from the queue.
- If approval fires before all three channel adaptations finish, only the finished channels are queued, and a second approval event is needed for the rest. The newsletter is usually the slowest.
- Publishing is manual by design: the queue holds content, and a human posts it.
