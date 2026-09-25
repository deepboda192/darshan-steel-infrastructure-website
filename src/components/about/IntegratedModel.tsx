import { ClipboardCheck, Factory, PencilRuler, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { integratedModel, workflowStages } from '@/data/capabilities'
import { Button } from '@/components/site/Button'
import { SectionIntro } from '@/components/site/SectionIntro'
import { cn } from '@/lib/cn'

// One pictogram per band, in order: engineering, manufacturing, inspection, execution.
const ICONS: LucideIcon[] = [PencilRuler, Factory, ClipboardCheck, Wrench]

/** Desktop stagger: each card starts a step lower and sticks as the page scrolls. */
const STAGGER = ['', 'lg:mt-[60px]', 'lg:mt-[120px]', 'lg:mt-[180px]']

const stageTitle = (index: string) => workflowStages.find((s) => s.index === index)?.title ?? ''

/**
 * What we do — the reference's process section: the heading and the call to
 * action across the top, then the cards stepping down across the page and
 * sticking as you scroll. The four bands of the integrated model come from
 * data/capabilities.ts, each listing the workflow stages it covers.
 */
export function IntegratedModel() {
  return (
    <section className="m-section bg-neutral-1" aria-label="What we do">
      <div className="m-container">
        <div className="flex flex-col gap-20 max-md:gap-12">
          <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
            <div className="max-w-[560px]" data-reveal="left">
              <SectionIntro subtitle="What we do" title="Designed, built, erected in-house." />
              <p className="m-paragraph mt-6">
                A steel building usually passes through several companies between concept and
                completion. Ours does not. The team that sizes the frame is the team that
                fabricates it, inspects it and erects it, so nothing is lost at a handover point.
              </p>
            </div>
            <div className="mb-2.5" data-reveal="right">
              <Button href="/#contact">Get in touch</Button>
            </div>
          </div>

          <ol className="grid grid-cols-4 items-start gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
            {integratedModel.map((band, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <li
                  key={band.index}
                  className={cn(
                    'border border-secondary/15 bg-white px-8 pb-8 pt-7 lg:sticky lg:top-20 max-lg:px-6 max-lg:pb-6 max-lg:pt-5',
                    STAGGER[i],
                  )}
                >
                  <div className="mb-16 flex items-center justify-between max-lg:mb-[54px]">
                    <span className="m-icon-box h-16 w-16">
                      <Icon size={28} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-heading text-[100px] font-semibold leading-none text-neutral-2"
                    >
                      {band.index}
                    </span>
                  </div>
                  <h3 className="font-heading text-[36px] font-bold leading-(--lh-lg) text-neutral-10 max-xs:text-[30px]">
                    {band.title}
                  </h3>
                  <p className="m-paragraph medium mt-4">{band.body}</p>
                  <p className="mt-6 border-t border-black/10 pt-4 text-[14px] leading-[1.6] text-neutral-6">
                    <span className="font-heading font-semibold uppercase tracking-[0.5px]">Stages</span>{' '}
                    {band.stages.map(stageTitle).join(' · ')}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
