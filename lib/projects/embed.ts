/** Turns a Loom / Google Drive / YouTube share link into an embeddable player URL. */
export function videoEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.endsWith("loom.com")) {
      const id = u.pathname.match(/\/(?:share|embed)\/([a-zA-Z0-9]+)/)?.[1]
      return id ? `https://www.loom.com/embed/${id}` : null
    }
    if (u.hostname === "drive.google.com") {
      const id = u.pathname.match(/\/file\/d\/([^/]+)/)?.[1]
      return id ? `https://drive.google.com/file/d/${id}/preview` : null
    }
    if (u.hostname.endsWith("youtube.com")) {
      const id = u.searchParams.get("v")
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`
    }
  } catch {
    // not a valid URL; fall through
  }
  return null
}

/** First-page thumbnail for a publicly shared Google Doc / Drive file; null for other hosts. */
export function documentThumbnailUrl(url: string): string | null {
  const id = url.match(/\/(?:document|file|presentation|spreadsheets)\/d\/([^/]+)/)?.[1]
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : null
}
