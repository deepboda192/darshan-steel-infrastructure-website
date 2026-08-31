import Image from '@/components/media/NextImage'
import { type SiteImage } from '@/data/images'
import { cn } from '@/lib/cn'
import { TechnicalPlate } from './TechnicalPlate'
import { Reveal } from '@/components/animations/Reveal'

type ImageFrameProps = {
  image: SiteImage
  /** Surface the frame sits on — drives the plate palette. */
  tone?: 'light' | 'dark'
  /** CSS aspect-ratio, e.g. '16/9'. Use `fill` to stretch to the parent. */
  ratio?: string | 'fill'
  className?: string
  /** Darkening scrim, 0–100, for text placed over the image. */
  scrim?: number
  /**
   * `bottom`    — even wash from the foot, for captions
   * `editorial` — heavy on the left where headline copy sits, clearing to the
   *               right so the structure in the picture stays readable
   */
  scrimStyle?: 'bottom' | 'editorial'
  /** Adds film grain — stops large flat fills reading as vector art. */
  grain?: boolean
  /** Zooms on hover of an ancestor `.group`. */
  zoom?: boolean
  /** Clip-path reveal on scroll. Disable inside an already-revealing parent. */
  reveal?: boolean
  revealDelay?: number
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
  scrimStyle = 'bottom',
  grain = false,
  zoom = false,
  reveal = true,
  revealDelay = 0,
  priority = false,
  sizes = '100vw',
  showLabel = true,
  captioned = false,
}: ImageFrameProps) {
  const hasPhoto = image.src.trim().length > 0

  const inner = (
    <>
      <div
        className={cn(
          'absolute inset-0',
          zoom && 'transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.045]',
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
            background:
              scrimStyle === 'editorial'
                ? // Two passes: a lateral wash that keeps the headline side
                  // legible, and a light foot so the bottom strip reads.
                  // The lateral pass holds a floor rather than clearing to zero
                  // — PageHero places a spec list in the right-hand columns, and
                  // over a bright photograph white text there needs a ground.
                  `linear-gradient(100deg, rgba(15,17,19,${(scrim / 100) * 1.02}) 0%, rgba(15,17,19,${
                    (scrim / 100) * 0.8
                  }) 40%, rgba(15,17,19,${(scrim / 100) * 0.45}) 100%),` +
                  `linear-gradient(to top, rgba(15,17,19,${(scrim / 100) * 0.8}) 0%, rgba(15,17,19,0) 42%)`
                : `linear-gradient(to top, rgba(17,17,17,${scrim / 100}) 0%, rgba(17,17,17,${
                    (scrim / 100) * 0.55
                  }) 45%, rgba(17,17,17,${(scrim / 100) * 0.2}) 100%)`,
          }}
        />
      )}

      {grain && (
        <div
          aria-hidden="true"
          className="grain-layer pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        />
      )}
    </>
  )

  const frameClass = cn(
    'relative overflow-hidden bg-steel-light',
    ratio === 'fill' && 'absolute inset-0 h-full w-full',
    className,
  )
  const style = ratio !== 'fill' ? { aspectRatio: ratio } : undefined

  if (!reveal) {
    return (
      <div className={frameClass} style={style}>
        {inner}
      </div>
    )
  }

  // The reveal wrapper carries the frame so the clip-path animates the frame
  // itself; a single child keeps the `> *` settle-scale on one element.
  return (
    <Reveal variant="image" delay={revealDelay} className={frameClass} style={style}>
      <div className="absolute inset-0">{inner}</div>
    </Reveal>
  )
}
