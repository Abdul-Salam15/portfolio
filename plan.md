# Content migration — status

Most of the original checklist is done: the site now runs on your resume and
LinkedIn data (`lib/data.ts`, `components/work-card.tsx`, the Home/About
inline arrays, footers, metadata, intro loader, contact form templates). Old
owner's photos, employer/client logos and private notes have been deleted.
`npm run build` passes clean.

What's still open — these need something only you can provide:

## 1. Profile photo (temporary right now)
`profile.headshot` in `lib/data.ts` points at a **signed LinkedIn CDN URL**
that expires around **mid-October 2026**. It also renders as a square photo
being force-cropped into the hero's portrait frame (see the comment above
the `<Image>` in `app/page.tsx`), so it doesn't fill the frame the way a
purpose-shot photo would.
- [ ] Upload a permanent photo somewhere (Cloudinary, S3, or just drop it in
      `public/` and reference it as `/your-photo.jpg`) and update
      `profile.headshot`
- [ ] Once you do, you can remove the temporary `media.licdn.com`
      `remotePatterns` entry in `next.config.mjs`

## 2. Resume PDF
There's no CV file in `public/` anymore — the old one was literally a
different person's private résumé, so I deleted it rather than leave it
live under your name. The `/resume` page's hero currently shows a "Request
my CV" button (opens the contact modal) instead of a download link.
- [ ] Drop your CV PDF into `public/`
- [ ] In `app/resume/page.tsx`, restore a `CV_PDF`/`CV_FILENAME` const and
      swap the "Request my CV" button back for Download/Open-in-new-tab
      buttons (the old version is in git history — commit before this
      session's changes — if you want to copy the pattern)
- [ ] Optionally restore the `headers()` canonical-link rule in
      `next.config.mjs` (see the comment left in its place)

## 3. Site logo
`public/logo.png` (nav bar, top-left) is still the previous owner's logo
file. Replace it with your own, or a text/initials wordmark.

## 4. Deploy settings
- [ ] `NEXT_PUBLIC_SITE_URL` — set this once you have a real domain/deploy
      URL. It currently falls back to a placeholder
      (`https://abdul-salam-adebayo.vercel.app`) that isn't necessarily live.
- [ ] Contact form env vars (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, optionally
      `CONTACT_TO_EMAIL`) — none are set yet, so the "Get in touch" form will
      500 until you add a Gmail App Password. See the comment block at the top
      of `app/api/contact/route.ts`.

## 5. Content you may want to add later
These sections are coded to gracefully hide themselves while empty, rather
than show fabricated placeholder content — add real entries whenever you
have them:
- [ ] `recommendations` in `lib/data.ts` — empty until you get LinkedIn
      recommendations (Home's "What people say" section stays hidden)
- [ ] `speakingImages` in `lib/data.ts` — empty until you have event/talk
      photos (the carousel on Home/About stays hidden)
- [ ] `writing` / `featured` arrays in `app/about/page.tsx` — empty until you
      have published articles or press mentions to link to (no fabricated
      titles were used — I only had unlabeled LinkedIn post IDs to go on)

## 6. Worth double-checking
- [ ] `experience` in `lib/data.ts` — I merged your resume + LinkedIn export
      into 3 companies (4orge, Merrowgate, Synergy Solutions IMC LTD, with
      Synergy split into its two LinkedIn-listed internships). Skim the
      bullets/tags for accuracy.
- [ ] `work` in `components/work-card.tsx` — FarmBuddy, Nexus, CardioXAI,
      VitalWatch, written from your LinkedIn project descriptions. No
      `caseStudyUrl` is set for any of them (I didn't have confirmed live
      links) — add one per project if you have a deployed URL or GitHub repo
      to link to.
- [ ] Leadership rows (GDG, Bowen Tech Week, Machine Learning Lagos, Bowen
      Tech Hub) all link to your LinkedIn profile as a fallback, since I
      didn't have a specific post URL per item — swap in more specific links
      if you have them.
