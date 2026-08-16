# Portfolio Reimagine — Creative Plan for Assessment

**Instructions for Claude Code:** Don't build anything yet. Read this plan against the current codebase and give me an honest assessment first:
- Which ideas are realistic given the current stack/structure, and which would need a rebuild of a section
- Where the actual "wow" will land vs. where an idea sounds cool but will read as gimmicky in practice
- Effort/complexity ranking (quick win / moderate / heavy lift) for each section below
- Anything here you'd cut, and why
- A recommended MVP subset — the smallest set of these that would still feel like a genuine step-change, so I'm not trying to build all of this in one pass

---

## The Core Idea

Right now the site reads as a well-organized resume. The reimagine treats it as a **narrative journey** — the page answers a sequence of implicit questions as you scroll, and the animation style itself is a metaphor for what I actually do (AI systems, distributed/remote engineering across continents), not generic portfolio flash.

Loose narrative arc:
1. **Who is Abdul-Malik?** (hero)
2. **Where I've worked** (experience, framed as a build log / journey, not a list)
3. **What I build** (research vs. production, selected work)
4. **How I think** (philosophy / approach section)
5. **Where I am** (the global/remote dimension — Lagos, London, SF)
6. **Let's talk** (contact, closing)

---

## Visual Theme: Dark Mode

Switching to a dark theme — this isn't just aesthetic, it's what makes most of the animation ideas above actually land (particle systems, glowing connection lines, shader distortion, the node-graph hero all read far better against dark than light; light backgrounds wash subtle motion out).

**Base palette**
- Background: near-black with a hint of blue/violet undertone (e.g. `#0A0A0F` / `#0B0E14`) — not pure black, which tends to look flat/cheap.
- Surface/card background: a step up from base (e.g. `#12141C`) so cards feel like they sit slightly above the base plane.
- Primary text: off-white (e.g. `#E8E8EC`), not pure white.
- Secondary/muted text: a mid gray (e.g. `#8A8D98`) for captions, timestamps, tags.

**Accent color(s)**
- One signature accent used consistently across every "wow" moment — node-graph glow, timeline draw-line, hover states, count-up numbers — so the effects read as one designed system, not scattered one-offs.
- Leaning toward electric cyan/blue (`#4EE1FF`-ish) or violet (`#9D7CFF`-ish) — technical without being an overused neon-hacker green.
- Optional secondary warm accent (amber/orange) used sparingly, CTA/emphasis only, so it doesn't compete with the primary accent.

**Build notes for Claude Code**
- Implement as CSS variables/design tokens from the start (`--bg-base`, `--bg-surface`, `--text-primary`, `--text-secondary`, `--accent-primary`, `--accent-secondary`) rather than hardcoded hex values — makes it trivial to tune once things are built and being eyeballed.
- Maintain WCAG AA contrast on body text even at dark-theme muted-gray levels — easy to accidentally go too low-contrast.
- Treat this as Phase 0.5: theme tokens should land before any of the animation phases, since every effect below will be designed against these colors.

**Assessment question for Claude Code:** confirm whether the existing site is already using a design-token/CSS-variable setup or hardcoded colors — flag how much rework converting to dark mode requires before we scope the animation phases on top of it.

---

## Section 1 — Hero: "Who is Abdul-Malik?"

Concept: the headline itself asks the question, and the page "answers" it live in front of you.

- On load, a monospace/terminal-style line types itself out character by character — something like a query being run — before resolving into the actual headline in your normal type. This nods to your actual work (you build AI systems) without being a literal chatbot gimmick.
- Behind/around this, a sparse animated node-graph (a handful of connected dots drifting slowly, occasionally pulsing a connection between two nodes) — evokes a neural net / knowledge graph without being a busy screensaver. Low element count, slow motion, dark and restrained.
- Stats (28K+, 7, 4) count up as before, but consider representing them as small animated "graph nodes" lighting up in sequence rather than plain numbers — ties the whole hero together visually.

**Assessment question for Claude Code:** is the typing-terminal effect going to feel fresh or cliché given how common it's become in dev portfolios? Give me your honest read, and an alternative if you think it's tired.

---

## Section 2 — "Where I've Worked": Build-Log Timeline

Concept: instead of a static vertical timeline, frame it like a **git commit / build log** — reinforces "engineer" identity directly.

- Each role appears as a "commit" — a monospace timestamp/hash-style marker, a one-line commit-message-style summary, then the fuller card content beneath it.
- The connecting line draws itself as you scroll (as previously planned), but consider it "typing out" a dotted/dashed line like a terminal progress indicator rather than a plain solid line.
- Tech-tag pills appear like tags being applied to a commit.

**Assessment question:** does the git-log framing actually read as clever, or does it risk feeling try-hard/cute? Be honest — if a plainer timeline with strong motion design would land better, say so.

---

## Section 3 — "What I Build": Research vs. Production + Selected Work

- Research/Production two-column: keep the mouse-tilt interaction, but consider a visual toggle/switch feel — as if flipping between two "modes," reinforcing the dual nature of the work (rigor vs. shipped reality).
- Selected work cards (Shyft, Apprentago, XCARE): the hover distortion/ripple idea stands — this is a good spot for one contained WebGL moment. Additionally: consider each project card briefly "building itself" on scroll-into-view — wireframe/outline state resolving into the full card, like a UI assembling in real time. This is a strong, on-brand wow moment if it can be done performantly.

**Assessment question:** is the "card assembles itself" effect worth the build cost, or is it a lot of engineering for a subtle payoff? Give me a complexity estimate.

---

## Section 4 — "How I Think": Philosophy / Approach

New section idea (may not exist yet — flag if it doesn't and needs to be created, or if this should just enhance existing "research rigour / production reality" copy):

- A short set of principles/beliefs about how you approach AI/engineering work, revealed one at a time as the user scrolls — each one fading the previous out as the next fades in (a single fixed viewport with content cycling, not a long scroll of stacked text). Creates a moment of calm/confidence in the middle of the page.

**Assessment question:** do we have real content for this (do I actually have 3-5 genuine principles to state), or is this manufacturing a section that doesn't need to exist? Tell me honestly if this feels additive or like filler.

---

## Section 5 — "Where I Am": Global/Remote Dimension

Concept: you work across Lagos, London (AxiomFuse), and San Francisco (Supernomics) simultaneously — this is genuinely distinctive and nothing on the current site conveys it visually.

- A minimal, stylized world map/globe (not photorealistic — abstract dot-matrix style) with the three locations marked, subtle arcing connection lines pulsing between them, maybe a live-feeling "local time" readout for each city.
- This could be a small persistent widget (e.g., in a footer or sidebar) rather than a full section if a full section feels like too much real estate for the payoff.

**Assessment question:** full section or small persistent widget — which serves the "wow but not bloated" goal better? Also flag if a 3D globe (vs. flat abstract map) is worth the added weight/complexity here, or overkill.

---

## Section 6 — Contact / Closing

- Simple, confident, not over-animated — this is where restraint matters most. A closing line that types out (echoing the hero's opening) and a clean CTA. The wow has already happened by this point; closing should land calm, not busy.

---

## Cross-cutting Notes

- Dark theme (see above) lands first, as design tokens, before any animation work — everything else is designed against it.
- Keep Lenis smooth scroll + prefers-reduced-motion support from the earlier foundation plan — that still applies to all of this.
- Terminal/monospace/code motifs should be used consistently if used at all (hero + timeline + closing) rather than once — otherwise it reads as random rather than a deliberate visual language.
- I'd rather cut 2-3 of these ideas and execute the remainder really well than build all six sections at "pretty good."

---

## What I want back from you (Claude Code)

1. A short written assessment of the plan above — honest, not just agreement.
2. Effort ranking per section (quick win / moderate / heavy lift).
3. Your recommended MVP: which 3-4 elements would deliver 80% of the "wow" for 20% of the effort.
4. Any technical red flags given the current codebase/stack (performance, existing structure conflicts, etc.) before we commit to a build order.
