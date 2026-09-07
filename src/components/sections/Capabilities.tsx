
import { workflowStages } from '@/data/capabilities'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Button } from '@/components/site/Button'
import { Reveal } from '@/components/animations/Reveal'

/**
 * The integrated workflow, shown whole.
 *
 * Eight stages on a single hairline — number, node and name, all visible at
 * once. No pinning, no scroll stepping, no per-stage detail panel: the rail
 * states the sequence and the capability pages carry the depth. The only
 * motion is the site's standard entrance reveal, staggered across the rail.
 */
export function Capabilities() {
  return (
    <section className="bg-white py-20 lg:py-24" aria-label="Our integrated workflow">
      <div className="container-site">
        <SectionHeader
          index="04"
          eyebrow="Capabilities"
          title={
            <>
              From engineering to erection.
              {' '}<br />
              One integrated system.
            </>
          }
          lead="From engineering and detailing to fabrication, quality inspection, dispatch, and site erection, every stage is managed by our integrated team — keeping quality, coordination, and timelines under control."
          aside={
            <Button href="/manufacturing" variant="secondary" arrow>
              View Capabilities
            </Button>
          }
          className="mb-12 md:mb-16"
        />

        {/* The rail scrolls sideways on narrow screens rather than wrapping —
            eight stages read as one line or not at all. */}
        <div className="-mx-gutter overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative min-w-[860px] lg:min-w-0">
            {/* the hairline through every node */}
            <div aria-hidden="true" className="absolute inset-x-0 top-[62px] h-px bg-charcoal/15" />

            <ol className="relative grid grid-cols-8 gap-3">
              {workflowStages.map((stage, i) => (
                <li key={stage.index}>
                  <Reveal delay={0.05 * i} className="pr-2">
                    <span className="font-display wdth-wide block text-display-4 text-charcoal tabular">
                      {stage.index}
                    </span>

                    {/* node on the rail */}
                    <span
                      aria-hidden="true"
                      className="mt-[18px] block h-2.5 w-2.5 rounded-full border-2 border-brand bg-white"
                    />

                    <span className="mt-6 block text-small font-medium leading-snug text-charcoal/70">
                      {stage.title}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
