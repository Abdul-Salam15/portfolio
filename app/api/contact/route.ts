import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { profile } from "@/lib/data"

/**
 * Contact endpoint. On a valid submission it sends TWO emails via Resend:
 *   1. a notification to the site owner (with the sender's message, reply-to set
 *      to the sender so a reply goes straight back to them), and
 *   2. a confirmation to the sender echoing what they wrote.
 *
 * Required env: RESEND_API_KEY.
 * Recommended env:
 *   CONTACT_FROM_EMAIL  e.g. "Adebayo Abdul-Malik <hello@your-domain.com>"
 *                       Must be an address on a domain verified in Resend, otherwise
 *                       the confirmation email to arbitrary senders will not deliver.
 *                       Falls back to Resend's shared onboarding@resend.dev, which can
 *                       only deliver to the Resend account owner (fine for local testing).
 *   CONTACT_TO_EMAIL    where owner notifications go (defaults to the profile email).
 */

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("A valid email is required").max(200),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
  // Honeypot: real users never fill this hidden field; bots often do.
  company: z.string().optional(),
})

const FROM = process.env.CONTACT_FROM_EMAIL || `${profile.name} <onboarding@resend.dev>`
const TO = process.env.CONTACT_TO_EMAIL || profile.email
const BLUE = "#034694"

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function shell(heading: string, bodyHtml: string) {
  return `
  <div style="margin:0;padding:24px;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:${BLUE};padding:20px 28px;">
        <p style="margin:0;color:#ffffff;font-size:18px;font-weight:800;letter-spacing:-0.3px;">${escapeHtml(
          profile.name,
        )}</p>
      </div>
      <div style="padding:28px;">
        <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">${heading}</h1>
        ${bodyHtml}
      </div>
      <div style="padding:16px 28px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">
        Sent from the portfolio contact form · ${escapeHtml(profile.location)}
      </div>
    </div>
  </div>`
}

function messageBlock(message: string) {
  return `<div style="white-space:pre-wrap;line-height:1.6;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;color:#334155;">${escapeHtml(
    message,
  )}</div>`
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured. Set RESEND_API_KEY." },
      { status: 500 },
    )
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 })
  }

  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message || "Invalid submission."
    return NextResponse.json({ ok: false, error: first }, { status: 400 })
  }

  const { name, email, subject, message, company } = parsed.data
  // Honeypot tripped: pretend success so bots get no signal, but send nothing.
  if (company && company.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(apiKey)

  try {
    // 1. Notify the owner.
    const ownerRes = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New portfolio message: ${subject}`,
      html: shell(
        "You have a new message",
        `<p style="margin:0 0 8px;color:#334155;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(
          email,
        )}&gt;</p>
         <p style="margin:0 0 16px;color:#334155;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
         ${messageBlock(message)}`,
      ),
    })

    if (ownerRes.error) {
      console.error("Resend owner-notification failed:", ownerRes.error)
      const detail =
        process.env.NODE_ENV === "development"
          ? ownerRes.error.message || "Resend rejected the send."
          : "Could not send your message. Please try again."
      return NextResponse.json({ ok: false, error: detail }, { status: 502 })
    }

    // 2. Confirm to the sender. Best-effort: if this one fails (e.g. no verified
    // domain configured yet) we don't fail the whole request, the owner still got it.
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Thanks for reaching out, ${name.split(" ")[0]}`,
      html: shell(
        `Thanks, ${escapeHtml(name.split(" ")[0])}. I got your message`,
        `<p style="margin:0 0 16px;color:#334155;line-height:1.6;">Thanks for getting in touch. I typically respond within 24 hours. Here's a copy of what you sent:</p>
         <p style="margin:0 0 8px;color:#334155;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
         ${messageBlock(message)}
         <p style="margin:16px 0 0;color:#334155;line-height:1.6;">Talk soon,<br/>${escapeHtml(profile.name)}</p>`,
      ),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: "Something went wrong sending your message." }, { status: 500 })
  }
}
