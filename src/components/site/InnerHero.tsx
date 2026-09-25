import type { SiteImage } from '@/data/images'
import Link from '@/components/site/NextLink'
import { cn } from '@/lib/cn'

export type Crumb = { label: string; href?: string }

type InnerHeroProps = {
  title: string
  image: SiteImage
  /** The trail, ending in the current page (rendered as text, not a link). */
  crumbs: Crumb[]
  /** Project records run a little taller, as in the reference. */
  tall?: boolean
}

/**
 * Inner-page hero — the reference's `inner-page-hero`: a photograph under a
 * dark wash filling 65% of the viewport, the page title blurring in character
 * by character on the left and the breadcrumb trail on the right. Below 992px
 * the two stack; on phones the band settles at 300px.
 */
export function InnerHero({ title, image, crumbs, tall = false }: InnerHeroProps) {
  return (
    <section
      className={cn(
        'relative isolate flex flex-col overflow-hidden bg-secondary pt-[78px] text-white',
        'min-h-[65svh] max-xs:min-h-[300px]',
        tall && 'max-lg:min-h-[74svh]',
      )}
    >
      {/* ---------------- backdrop ---------------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {image.src && (
          <img
            src={image.src}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: image.focus }}
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="m-container flex flex-1">
        <div className="flex w-full flex-wrap items-center justify-between gap-5 pb-2.5 max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-6">
          <div className="max-w-[600px]">
            <h1 className="m-h1 light" data-animation="blur-stagger-chars">
              {title}
            </h1>
          </div>

          <nav aria-label="Breadcrumb" className="max-w-[450px] pb-1" data-reveal="fade">
            <ol className="flex flex-wrap items-center gap-3">
              {crumbs.map((crumb, i) => {
                const last = i === crumbs.length - 1
                return (
                  <li key={crumb.label} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden="true" className="mb-0.5 font-heading text-[14px] leading-none">
                        •
                      </span>
                    )}
                    {last || !crumb.href ? (
                      <span
                        className="font-heading font-semibold uppercase text-neutral-1"
                        aria-current={last ? 'page' : undefined}
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="font-heading font-medium uppercase text-neutral-1 transition-all duration-[250ms] hover:underline hover:underline-offset-[3px]"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}
