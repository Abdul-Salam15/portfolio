// Kept in sync with `siteUrl` in lib/data.ts (next.config can't import TS).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abdul-salam-adebayo.vercel.app"

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
    // and are optimized to AVIF/WebP.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      // TEMP: profile.headshot is a signed LinkedIn CDN URL that expires ~Oct 2026.
      // Remove this once it's replaced with a permanently hosted photo.
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
  // Once a real CV PDF is added back to public/, add a headers() rule here
  // pointing its `Link: <${siteUrl}/resume>; rel="canonical"` so Search Console
  // doesn't flag it as a duplicate of the /resume page (a PDF can't carry
  // a <link rel="canonical"> tag itself).
}

export default nextConfig
