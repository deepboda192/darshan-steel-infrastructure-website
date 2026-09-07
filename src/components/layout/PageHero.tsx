import type { ReactNode } from 'react'
import type { SiteImage } from '@/data/images'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { cn } from '@/lib/cn'

type PageHeroProps = {
  /** Names the banner for assistive tech; not rendered visually. */
  eyebrow: string
  title: ReactNode
  image: SiteImage
  className?: string
}

/**
 * Standard inner-page banner: dark, image-led, and carrying the page title
 * alone — no label, breadcrumb, lead or side panel, by request. Shorter than
 * the homepage hero so the page's real content starts above the fold on a
 * laptop. Every page except the homepage opens with this, which is what lets
 * the navbar rely on always starting over a dark surface.
 */
export function PageHero({ eyebrow, title, image, className }: PageHeroProps) {
  return (
    <section
      className={cn('relative overflow-hidden bg-charcoal on-dark', className)}
      aria-label={eyebrow}
    >
      <div className="absolute inset-0">
        <ImageFrame
          image={image}
          tone="dark"
          ratio="fill"
          reveal={false}
          priority
          grain
          scrim={78}
          scrimStyle="editorial"
          sizes="100vw"
          showLabel={false}
        />
      </div>

      <div className="container-site relative z-10 pb-16 pt-[150px] md:pb-20 md:pt-[184px]">
        <h1 className="font-display wdth-wide text-display-2 uppercase text-white">
          <Reveal variant="line" delay={0.12}>
            {title}
          </Reveal>
        </h1>
      </div>
    </section>
  )
}
