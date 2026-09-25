import { Calculator, ClipboardCheck, Layers, PenTool, Scale, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { operatingPrinciples } from '@/data/capabilities'
import Link from '@/components/site/NextLink'
import { SectionIntro } from '@/components/site/SectionIntro'

// One pictogram per principle, in the order they are published.
const ICONS: LucideIcon[] = [Calculator, Layers, ClipboardCheck, Truck, PenTool, Scale]

/**
 * How we work — the reference's values band: a centred heading on the dark
 * surface, then a plate of six cells divided by hairlines, each with its
 * icon, title and statement, filling with the accent on hover. The six
 * operating principles come from data/capabilities.ts.
 */
export function Principles() {
  return (
    <section className="m-section bg-secondary text-white" aria-label="How we work">
      <div className="m-container">
        <div className="flex flex-col items-center gap-20 max-xs:gap-[72px]">
          <div data-reveal="up">
            <SectionIntro
              tone="light"
              align="center"
              subtitle="How we work"
              title="Six rules we hold to."
              className="max-w-[550px]"
            />
          </div>

          <ul
            className="grid w-full grid-cols-3 border-l border-t border-white/20 max-lg:grid-cols-2 max-md:grid-cols-1"
            data-reveal="fade"
          >
            {operatingPrinciples.map((principle, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <li
                  key={principle.index}
                  className="border-b border-r border-white/20 transition-colors duration-300 hover:bg-accent"
                >
                  <div className="w-fit bg-secondary p-[34px]">
                    <Icon size={40} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div className="px-[34px] pb-[34px] pt-[42px] max-xs:px-6 max-xs:pb-6 max-xs:pt-8">
                    <h3 className="font-heading text-[32px] font-semibold leading-(--lh-sm) max-xs:text-[26px]">
                      {principle.title}
                    </h3>
                    <p className="m-paragraph medium light mt-4">{principle.body}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <p className="max-w-[760px] text-center text-[18px] leading-[1.5] text-white max-md:text-[16px]">
            Operating discipline, not values. Each of these is a decision that has already been
            made, so it does not have to be argued on every project.{' '}
            <Link href="/#process" className="m-link light">
              See the process
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
