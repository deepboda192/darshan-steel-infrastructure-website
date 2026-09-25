import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { ImageFrame } from '@/components/media/ImageFrame'

/**
 * The tagline band — the reference's outlined marquee with the building
 * rising into it: the company line as hollow display type running across
 * the page, and the portal-frame photograph standing at the foot of it.
 */
export function TaglineBand() {
  const line = `${company.tagline}.`

  return (
    <section
      className="relative overflow-hidden pb-20 pt-[140px] max-md:pb-16 max-md:pt-20 max-xs:pt-11"
      aria-label={company.tagline}
    >
      <div className="m-marquee" data-marquee="left" data-marquee-speed="40" aria-hidden="true">
        {[0, 1].map((track) => (
          <div key={track} className="m-marquee-track gap-16 pr-16 max-xs:gap-10 max-xs:pr-10" data-marquee-track>
            {Array.from({ length: 4 }, (_, i) => (
              <p
                key={i}
                className="whitespace-nowrap font-heading text-[150px] font-bold leading-none text-transparent [-webkit-text-stroke:1.2px_var(--color-neutral-8)] max-lg:text-[100px] max-md:text-[90px] max-xs:text-[64px] max-xs:[-webkit-text-stroke:1px_var(--color-neutral-8)]"
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">{line}</p>

      <div
        className="mx-auto -mt-16 w-1/2 max-lg:w-[62%] max-md:w-[64%] max-xs:-mt-8 max-xs:w-[74%]"
        data-reveal="up"
      >
        <ImageFrame image={siteImages.aboutBand} ratio="16/9" sizes="(min-width: 1024px) 50vw, 74vw" />
      </div>
    </section>
  )
}
