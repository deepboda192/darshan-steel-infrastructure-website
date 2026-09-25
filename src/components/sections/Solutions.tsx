import { Building2, Factory, PencilRuler, Snowflake, Store, Warehouse } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { solutions } from '@/data/solutions'
import { SectionIntro } from '@/components/site/SectionIntro'

// One pictogram per building type, keyed by slug. Presentation only, so the
// mapping lives here rather than in data/solutions.ts.
const ICONS: Record<string, LucideIcon> = {
  'industrial-sheds': Factory,
  warehouses: Warehouse,
  'factory-buildings': Building2,
  'cold-storage': Snowflake,
  commercial: Store,
  custom: PencilRuler,
}

/**
 * What we build — the six building types as the reference's service grid.
 *
 * A dark band carrying a 3×2 plate of cells divided by hairlines. Each
 * cell holds its photograph beneath a dark wash, an accent icon plate and the
 * type name; on hover the one-line summary unfolds.
 * Below 992px the summary is always shown, since there is no hover.
 */
export function Solutions() {
  return (
    <section id="solutions" className="m-section bg-secondary text-white" aria-label="What we build">
      <div className="m-container">
        <div className="flex flex-col gap-20 max-xs:gap-[72px]">
          <div data-reveal="up">
            <SectionIntro
              tone="light"
              align="center"
              subtitle="What we build"
              title="PEB Structures Built for Every Industry"
              className="max-w-[850px]"
            />
          </div>

          <div data-reveal="fade">
            <ul className="grid grid-cols-3 border-l border-t border-white/20 max-lg:grid-cols-2 max-md:grid-cols-1">
              {solutions.map((solution) => {
                const Icon = ICONS[solution.slug]
                return (
                  <li
                    key={solution.slug}
                    id={solution.slug}
                    className="group relative isolate flex min-h-[400px] flex-col justify-between overflow-hidden border-b border-r border-white/20 p-8 max-md:min-h-[364px] max-md:p-7 max-xs:min-h-[350px]"
                  >
                    <span className="m-icon-box h-[70px] w-[70px]">
                      {Icon && <Icon size={30} strokeWidth={1.8} aria-hidden="true" />}
                    </span>

                    <div className="flex flex-col gap-4">
                      <h3 className="max-w-[250px] font-heading text-[36px] font-semibold leading-(--lh-lg) text-neutral-1 max-md:text-[24px] max-md:leading-(--lh-sm) max-xs:text-[30px]">
                        {solution.title}
                      </h3>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="pr-2.5 pt-2 leading-[1.6] text-neutral-1">{solution.short}</p>
                        </div>
                      </div>
                    </div>

                    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
                      <img
                        src={solution.image.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-[#141414a6]" />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex justify-center">
            <p className="max-w-[760px] text-center text-[18px] leading-[1.5] text-white max-md:text-[16px] max-md:leading-[1.6]">
              One pre-engineered building system, adapted to the industry it serves — from factories
              and warehouses to cold storage and commercial spaces, each structure is designed
              around what happens inside it.{' '}
              <a href="/#contact" className="m-link light">
                Start your project
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
