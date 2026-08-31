import { siteImages } from '@/data/images'
import { shopCapabilities } from '@/data/capabilities'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/ui/TechLabel'
import { Button } from '@/components/ui/Button'

/**
 * Manufacturing.
 *
 * The image bleeds off the left edge of the viewport and a second, smaller
 * plate overlaps its lower corner — the one deliberate overlap on the page.
 * Content is held to the right-hand columns so the block reads asymmetrically.
 */
export function Manufacturing() {
  return (
    <section className="overflow-hidden bg-offwhite py-24 md:py-32 lg:py-40" aria-label="Manufacturing">
      <div className="container-site">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- imagery ---------------- */}
          <div className="relative lg:col-span-6 lg:-ml-[calc((100vw-min(100vw,var(--container-site)))/2+var(--spacing-gutter))]">
            <ImageFrame
              image={siteImages.manufacturing}
              tone="dark"
              ratio="4/3"
              grain
              scrim={22}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* overlapping detail plate */}
            <div className="relative z-10 -mt-20 ml-auto w-1/2 max-w-[280px] border-4 border-offwhite md:-mt-28 md:max-w-[340px] lg:mr-[-4rem]">
              <ImageFrame
                image={siteImages.manufacturingDetail}
                tone="light"
                ratio="1/1"
                revealDelay={0.18}
                sizes="(max-width: 1024px) 50vw, 22vw"
              />
            </div>
          </div>

          {/* ---------------- content ---------------- */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <TechLabel index="05" rule className="mb-7">
                Manufacturing
              </TechLabel>
            </Reveal>

            <h2 className="font-display wdth-wide text-display-3 uppercase text-charcoal">
              <Reveal variant="line" delay={0.06}>
                Where steel
              </Reveal>
              <Reveal variant="line" delay={0.14}>
                becomes structure.
              </Reveal>
            </h2>

            <Reveal delay={0.22}>
              <p className="measure mt-8 text-lead text-muted">
                Precision begins long before the steel reaches the site. Members are cut, welded,
                drilled and finished in the shop, then inspected and marked against the erection
                drawings — so assembly on site is bolting, not fitting.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <ul className="mt-11 grid grid-cols-1 gap-x-8 border-t border-charcoal/10 sm:grid-cols-2">
                {shopCapabilities.map((capability) => (
                  <li
                    key={capability.index}
                    className="flex items-baseline gap-4 border-b border-charcoal/10 py-4"
                  >
                    <span className="tech shrink-0 text-brand tabular">{capability.index}</span>
                    <span className="text-small text-charcoal/85">{capability.title}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-11">
                <Button href="/manufacturing" arrow>
                  Inside the Facility
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
