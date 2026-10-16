import Image from '@/components/media/NextImage'
import Link from '@/components/site/NextLink'
import { company } from '@/data/company'
import { cn } from '@/lib/cn'

/**
 * The DSI logo.
 *
 * The master artwork (public/brand/dsi-logo.png) is used exactly as supplied —
 * never recoloured, stretched or rebuilt. Two derived files exist for surfaces
 * the master cannot serve:
 *
 *   dsi-logo-white.png   standard mono-white reverse, for charcoal surfaces
 *   dsi-monogram.png     square crop of the "dsi" mark, for tight spaces
 *
 * Both are produced by scripts/derive-brand-assets.mjs, which only crops and
 * applies a flat white fill. If DSI has official reversed artwork, replace the
 * white files in place — nothing here needs to change.
 *
 * The page serves the small WebP renditions of these (360 px wordmark, 120 px
 * monogram) written by scripts/optimize-images.mjs; the PNG masters stay in
 * public/brand untouched.
 */

const MASTER_RATIO = 2815 / 616

type LogoProps = {
  /** `full` = mark + wordmark. `mark` = square monogram only. */
  variant?: 'full' | 'mark'
  /** Surface the logo sits on. `dark` switches to the reversed artwork. */
  tone?: 'light' | 'dark'
  /** Rendered height in px. Width follows the master aspect ratio. */
  height?: number
  className?: string
  /** Wraps the logo in a link to the homepage. */
  href?: string | null
  priority?: boolean
}

export function Logo({
  variant = 'full',
  tone = 'light',
  height = 38,
  className,
  href = '/',
  priority = false,
}: LogoProps) {
  const isFull = variant === 'full'

  const src = isFull
    ? tone === 'dark'
      ? '/brand/dsi-logo-white.webp'
      : '/brand/dsi-logo.webp'
    : tone === 'dark'
      ? '/brand/dsi-monogram-white.webp'
      : '/brand/dsi-monogram.webp'

  const width = Math.round(isFull ? height * MASTER_RATIO : height)

  // The 1x and 2x renditions beside the masters (scripts/optimize-images.mjs).
  const small = src.replace(/\.webp$/, isFull ? '-180.webp' : '-60.webp')
  const srcSet = `${small} ${isFull ? 180 : 60}w, ${src} ${isFull ? 360 : 120}w`

  const image = (
    <Image
      src={src}
      srcSet={srcSet}
      sizes={`${width}px`}
      alt={`${company.name} logo`}
      width={width}
      height={height}
      priority={priority}
      className={cn('h-auto w-auto select-none', className)}
      style={{ height, width }}
    />
  )

  if (!href) return image

  return (
    <Link
      href={href}
      aria-label={`${company.name} — home`}
      className="inline-flex shrink-0 items-center rounded-[2px] transition-opacity duration-300 hover:opacity-80"
    >
      {image}
    </Link>
  )
}
