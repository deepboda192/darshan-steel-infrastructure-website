import { processSteps } from '@/data/capabilities'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Reveal } from '@/components/animations/Reveal'

/**
 * Project delivery, end to end.
 *
 * Deliberately the quietest block on the page: a single hairline with seven
 * marks on it, read like a drawing legend. The detailed, interactive version
 * of this idea is the capabilities rail higher up — repeating that treatment
 * here would dilute both.
 */
export function Process() {
  return (
    <section className="bg-white py-24 md:py-32" aria-label="How a project runs">
      <div className="container-site">
        <SectionHeader
          index="10"
          eyebrow="Process"
          title="How a project runs."
          lead="Seven stages from first conversation to handover, with a single point of responsibility across all of them."
          size="md"
          className="mb-16 md:mb-20"
        />

        <ol className="relative grid grid-cols-2 gap-y-10 border-t border-charcoal/15 pt-10 sm:grid-cols-4 lg:grid-cols-7 lg:gap-y-0">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={0.05 * i} as="li" className="relative pr-6">
              {/* mark on the rule */}
              <span
                aria-hidden="true"
                className="absolute -top-10 left-0 h-2.5 w-px bg-charcoal/30"
              />
              <span className="tech block text-brand tabular">{step.index}</span>
              <h3 className="mt-4 text-body font-medium text-charcoal">{step.title}</h3>
              <p className="mt-2.5 text-small text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
