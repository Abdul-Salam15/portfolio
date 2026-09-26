"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { profile } from "@/lib/data"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const EMAIL = profile.email

const quickTemplates = [
  {
    label: "Collaboration",
    subject: "Collaboration Opportunity",
    message:
      "Hi Abdul-Salam,\n\nI'm interested in discussing a potential collaboration. I'd love to learn more about your work and explore how we might work together.\n\nBest regards,",
  },
  {
    label: "Job Opportunity",
    subject: "Job Opportunity",
    message:
      "Hi Abdul-Salam,\n\nI came across your portfolio and I'm impressed by your work in AI and software engineering. We have an opportunity that might interest you.\n\nBest regards,",
  },
  {
    label: "General Inquiry",
    subject: "General Inquiry",
    message: "Hi Abdul-Salam,\n\nI have a question about your work and would love to connect.\n\nBest regards,",
  },
]

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot; must stay empty for real users
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Fill from a template, but never clobber a message the user actually typed:
  // only replace the body when it's empty or still holds another template's text.
  const handleTemplateSelect = (template: (typeof quickTemplates)[0]) => {
    setFormData((prev) => {
      const untouched = prev.message === "" || quickTemplates.some((t) => t.message === prev.message)
      return { ...prev, subject: template.subject, message: untouched ? template.message : prev.message }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data?.ok) {
        setErrorMessage(data?.error || "Something went wrong. Please try again or email me directly.")
        setSubmitStatus("error")
        return
      }

      setSubmitStatus("success")
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "", company: "" })
        setSubmitStatus("idle")
        onClose()
      }, 2500)
    } catch {
      setErrorMessage("Network error. Please try again or email me directly.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isSuccess = submitStatus === "success"

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
  const labelClass = "text-sm font-semibold text-slate-700"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="home-redesign font-body max-h-[90vh] max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 sm:p-7">
        <DialogHeader className="space-y-1.5">
          <DialogTitle className="flex items-center gap-2.5 font-display text-2xl font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </span>
            {isSuccess ? "Message sent" : "Get in touch"}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            {isSuccess
              ? "Thanks. Check your inbox for a confirmation, I'll be in touch soon."
              : "Tell me about your project, role or question. I usually reply within 24 hours."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </span>
            <p className="text-sm text-slate-600">Your message is on its way.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Honeypot: hidden from users, catches bots. */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className={labelClass}>
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className={labelClass}>
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
                {/* Optional quick-start presets, right by the fields they fill. */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-slate-400">Quick start:</span>
                  {quickTemplates.map((template) => {
                    const active = formData.subject === template.subject
                    return (
                      <button
                        key={template.label}
                        type="button"
                        onClick={() => handleTemplateSelect(template)}
                        className={
                          active
                            ? "rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground transition-colors"
                            : "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary"
                        }
                      >
                        {template.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className={labelClass}>
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project, opportunity, or question..."
                  rows={4}
                  required
                  disabled={isSubmitting}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {submitStatus === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMessage || "Something went wrong. Please try again or email me directly."}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
              Prefer email?{" "}
              <a href={`mailto:${EMAIL}`} className="font-medium text-primary hover:underline">
                {EMAIL}
              </a>
              <span className="mx-1.5 text-slate-300">·</span>
              {profile.phone}
              <span className="mx-1.5 text-slate-300">·</span>
              {profile.location}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
