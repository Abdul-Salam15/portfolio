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
    // WebP only: AVIF encoding is far more memory-hungry and was pushing the
    // 512MB Render free instance over its limit. The size lists are trimmed
    // so fewer variants get generated (and cached) per photo.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  // Once a real CV PDF is added back to public/, add a headers() rule here
  // pointing its `Link: <${siteUrl}/resume>; rel="canonical"` so Search Console
  // doesn't flag it as a duplicate of the /resume page (a PDF can't carry
  // a <link rel="canonical"> tag itself).
}

export default nextConfig
