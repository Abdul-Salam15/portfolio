// Kept in sync with `siteUrl` in lib/data.ts (next.config can't import TS).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.abdulmalikadebayo.com"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Type errors now fail the build so real bugs can't ship silently.
  typescript: {
    ignoreBuildErrors: false,
  },
  // Lint runs on build too; see .eslintrc.json for the (deliberately lean) rule set.
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    // Large content images (hero, about photo, carousel) go through next/image
    // and are optimized to AVIF/WebP. Cloudinary is the only remote host used.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  async headers() {
    return [
      {
        // The CV PDF duplicates the /resume page, and a PDF can't carry a
        // <link rel="canonical"> tag, so Search Console flagged it as
        // "Duplicate without user-selected canonical". The HTTP Link header is
        // the PDF equivalent: it folds the file's signals into /resume.
        source: "/Adebayo_Abdul-Malik.pdf",
        headers: [
          { key: "Link", value: `<${siteUrl}/resume>; rel="canonical"` },
        ],
      },
    ]
  },
}

export default nextConfig
