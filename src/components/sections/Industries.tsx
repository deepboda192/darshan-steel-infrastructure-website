import Link from '@/components/site/NextLink'
import { industries } from '@/data/industries'
import { ImageFrame } from '@/components/media/ImageFrame'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Arrow } from '@/components/site/Arrow'
import { Button } from '@/components/site/Button'

/**
 * Industries served.
 *
 * A horizontal rail rather than a grid: ten sectors is too many for a tidy
 * grid and too few to hide. Scroll-snapped on every viewport, so the same
 * interaction works with a trackpad, a finger and a keyboard.
 */
export function Industries() {
  return (
    <section className="overflow-hidden bg-offwhite py-24 md:py-32 lg:py-40" aria-label="Industries we serve">
      <div className="container-site">
        <SectionHeader
          index="08"
          eyebrow="Industries"
          title={
            <>
              Built for the industries
              {' '}<br />
              that keep business moving.
            </>
          }
          lead="What changes between sectors is not the steel — it is the loading, the envelope, the tolerance and the programme."
          aside={
            <Button href="/industries" variant="secondary" arrow>
              All Industries
            </Button>
          }
          className="mb-14 md:mb-16"
        />

        <div className="mb-8 flex items-center gap-3 tech text-muted">
          <span aria-hidden="true" className="h-px w-10 bg-charcoal/20" />
          Scroll to explore
          <Arrow size={13} className="text-brand" />
        </div>
      </div>

      {/* full-bleed rail, first card aligned to the container edge */}
      <div className="-mb-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
        <ul className="flex snap-x snap-mandatory gap-5 px-gutter md:gap-6">
          {industries.map((industry) => (
            <li
              key={industry.slug}
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[24rem]"
            >
              <Link href={`/industries#${industry.slug}`} className="group block h-full">
                <ImageFrame
                  image={{
                    src: industry.photo,
                    alt: `${industry.name} — steel building structure`,
                    plate: industry.plate,
                    label: industry.index,
                  }}
                  tone="light"
                  ratio="4/3"
                  zoom
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 24rem"
                />

                <div className="mt-6">
                  <p className="tech text-muted tabular">{industry.index}</p>

                  <h3 className="mt-3.5 flex items-center gap-3 text-display-4 font-display text-charcoal">
                    {industry.name}
                    <Arrow
                      size={16}
                      className="text-brand opacity-0 transition-all duration-[500ms] ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </h3>

                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-full bg-charcoal/12"
                  >
                    <span className="block h-full w-full origin-left scale-x-0 bg-brand transition-transform duration-[600ms] ease-[var(--ease-expo)] group-hover:scale-x-100" />
                  </span>

                  <p className="mt-4 text-small text-muted">{industry.short}</p>
                </div>
              </Link>
            </li>
          ))}
          {/* trailing spacer so the last card can snap clear of the edge */}
          <li aria-hidden="true" className="w-px shrink-0 pr-gutter" />
        </ul>
      </div>
    </section>
  )
}
