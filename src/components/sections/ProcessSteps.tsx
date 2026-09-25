import {
  Calculator,
  ClipboardCheck,
  DraftingCompass,
  Factory,
  HardHat,
  Package,
  PencilRuler,
  Truck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { workflowStages } from '@/data/capabilities'
import { SectionIntro } from '@/components/site/SectionIntro'

// One pictogram per stage, keyed like the data. Presentation only.
const ICONS: Record<string, LucideIcon> = {
  '01': DraftingCompass,
  '02': Calculator,
  '03': PencilRuler,
  '04': Package,
  '05': Factory,
  '06': ClipboardCheck,
  '07': Truck,
  '08': HardHat,
}

/**
 * The integrated workflow — eight stages as the reference's process cards.
 *
 * A neutral band: the heading beside its lead across the top, then a grid of
 * white cards, each headed by an accent icon plate and the stage's large,
 * faint step number, followed by the stage name and its one-line summary.
 */
export function ProcessSteps() {
  return (
    <section id="process" className="m-section bg-neutral-1" aria-label="Our integrated workflow">
      <div className="m-container">
        <div className="flex flex-col gap-20 max-xs:gap-[72px]">
          <div
            className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start"
            data-reveal="up"
          >
            <div className="max-w-[600px]">
              <SectionIntro
                subtitle="Workflow"
                title="End-to-End Execution. Driven by One Integrated Team."
              />
            </div>
            <div className="mb-2.5 max-w-[470px]">
              <p className="m-paragraph medium">
                From initial design concepts to final site erection, every phase of your project
                is handled under one roof—ensuring full accountability, seamless coordination, and
                strict timeline adherence at every step.
              </p>
            </div>
          </div>

          <ol className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1" data-reveal-stagger>
            {workflowStages.map((stage) => {
              const Icon = ICONS[stage.index]
              return (
                <li
                  key={stage.index}
                  className="border border-secondary/15 bg-white px-8 pb-8 pt-7 max-lg:px-6 max-lg:pb-6 max-lg:pt-5"
                >
                  <div className="mb-16 flex items-center justify-between max-lg:mb-[54px]">
                    <span className="m-icon-box h-16 w-16">
                      {Icon && <Icon size={28} strokeWidth={1.8} aria-hidden="true" />}
                    </span>
                    <span
                      className="font-heading text-[100px] font-semibold leading-none text-neutral-2 max-xs:text-[80px]"
                      aria-hidden="true"
                    >
                      {stage.index}
                    </span>
                  </div>
                  <h3 className="mb-2.5 font-heading text-[28px] font-bold leading-(--lh-sm) text-neutral-10 max-xs:text-[24px]">
                    {stage.title}
                  </h3>
                  <p className="m-paragraph medium">{stage.short}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
