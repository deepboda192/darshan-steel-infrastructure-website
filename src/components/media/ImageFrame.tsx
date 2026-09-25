import Image from '@/components/media/NextImage'
import { type SiteImage } from '@/data/images'
import { cn } from '@/lib/cn'
import { TechnicalPlate } from './TechnicalPlate'

type ImageFrameProps = {
  image: SiteImage
  /** Surface the frame sits on — drives the fallback plate palette. */
  tone?: 'light' | 'dark'
  /** CSS aspect-ratio, e.g. '16/9'. Use `fill` to stretch to the parent. */
  ratio?: string | 'fill'
  className?: string
  /** Darkening wash, 0–100, for text placed over the image. */
  scrim?: number
  /** Zooms on hover of an ancestor `.group`. */
  zoom?: boolean
  /** Set on the LCP image only. */
  priority?: boolean
  sizes?: string
  /** Shows the plate caption. Off for decorative background use. */
  showLabel?: boolean
  /**
   * Set when a visible <figcaption> beside the frame already states what the
   * image shows. Suppresses the screen-reader-only description so assistive
   * technology does not announce the same sentence twice.
   */
  captioned?: boolean
}

/**
 * The single image primitive for the whole site.
 *
 * Renders the photograph at `image.src`. If that is ever empty it falls back to
 * a procedurally drawn TechnicalPlate, so a missing file degrades to brand
 * artwork rather than a broken image. See data/images.ts to swap a photo out.
 */
export function ImageFrame({
  image,
  tone = 'light',
  ratio = '16/9',
  className,
  scrim = 0,
  zoom = false,
  priority = false,
  sizes = '100vw',
  showLabel = false,
  captioned = false,
}: ImageFrameProps) {
  const hasPhoto = image.src.trim().length > 0

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-neutral-1',
        ratio === 'fill' && 'absolute inset-0 h-full w-full',
        className,
      )}
      style={ratio !== 'fill' ? { aspectRatio: ratio } : undefined}
    >
      <div
        className={cn(
          'absolute inset-0',
          zoom && 'transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]',
        )}
      >
        {hasPhoto ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes={sizes}
            style={{ objectFit: 'cover', objectPosition: image.focus ?? '50% 50%' }}
          />
        ) : (
          <>
            <TechnicalPlate
              kind={image.plate}
              tone={tone}
              label={showLabel ? image.label : undefined}
            />
            {/* The plate is decorative SVG, so the meaning lives in text for
                assistive tech — unless a visible caption already says it. */}
            {!captioned && <span className="sr-only">{image.alt}</span>}
          </>
        )}
      </div>

      {scrim > 0 && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,${scrim / 100}) 0%, rgba(0,0,0,${
              (scrim / 100) * 0.55
            }) 45%, rgba(0,0,0,${(scrim / 100) * 0.2}) 100%)`,
          }}
        />
      )}
    </div>
  )
}
