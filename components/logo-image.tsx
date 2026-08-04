"use client"

import Image from "next/image"

/**
 * Logo renderer used by every brand/company mark on the site.
 *
 * Why this exists: the logos used to be plain <img> tags, which bypass next/image
 * entirely, so a 256x256 68KB PNG was downloaded to paint a 40px square. Routed
 * through the optimizer the same file comes back as ~1.6KB AVIF/WebP.
 *
 * The catch is SVG: next/image REJECTS it with 400 ("image type is not allowed")
 * unless `dangerouslyAllowSVG` is enabled, which we don't want for third-party
 * marks since SVG can carry scripts. Vector files are already 1-15KB and lose
 * nothing by being served directly, so they stay on a plain <img>.
 *
 * `width`/`height` are nominal: actual display size comes from `className`
 * (typically `h-full w-full object-contain`, or `h-7 w-auto` for wordmarks).
 * They set the aspect hint and give the optimizer a ceiling to resize from.
 */
export function LogoImage({
  src,
  alt,
  className,
  onError,
  width = 160,
  height = 160,
  sizes = "160px",
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  onError?: () => void
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}) {
  if (src.toLowerCase().endsWith(".svg")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={onError} />
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      onError={onError}
      priority={priority}
    />
  )
}
