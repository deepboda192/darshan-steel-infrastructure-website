import Link from '@/components/site/NextLink'
import type { ReactNode } from 'react'
import type { SiteImage } from '@/data/images'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/site/TechLabel'
import { cn } from '@/lib/cn'

type Crumb = {
  label: string
  href?: string
  /** Marks a crumb whose label is still a bracketed placeholder. */
  placeholder?: boolean
}

type PageHeroProps = {
  /** Section index shown in the technical label, e.g. "04". */
  index?: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  image: SiteImage
  breadcrumbs?: Crumb[]
  /** Right-hand slot for a spec list or CTA. */
  aside?: ReactNode
  className?: string
}

/**
 * Standard inner-page banner: dark, image-led, shorter than the homepage hero
 * so the page's real content starts above the fold on a laptop. Every page
 * except the homepage opens with this, which is what lets the navbar rely on
 * always starting over a dark surface.
 */
export function PageHero({
  index,
  eyebrow,
  title,
  lead,
  image,
  breadcrumbs,
  aside,
  className,
}: PageHeroProps) {
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

      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.05]"
      />

      <div className="container-site relative z-10 pb-16 pt-[168px] md:pb-24 md:pt-[220px]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="flex flex-wrap items-center gap-2.5 tech text-white/55">
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2.5">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-white/55">
                        /
                      </span>
                    )}
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-white/80">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white/70" data-placeholder={crumb.placeholder}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <div className={cn('grid gap-12', aside && 'lg:grid-cols-12 lg:gap-16')}>
          <div className={cn(aside && 'lg:col-span-7')}>
            <Reveal delay={0.05}>
              <TechLabel index={index} rule tone="light" className="mb-7">
                {eyebrow}
              </TechLabel>
            </Reveal>

            <h1 className="font-display wdth-wide text-display-2 uppercase text-white">
              <Reveal variant="line" delay={0.12}>
                {title}
              </Reveal>
            </h1>

            {lead && (
              <Reveal delay={0.24}>
                <div className="measure mt-8 text-lead text-white/65">{lead}</div>
              </Reveal>
            )}
          </div>

          {aside && (
            <Reveal delay={0.32} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
