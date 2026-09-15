
import { workflowStages } from '@/data/capabilities'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Button } from '@/components/site/Button'
import { Reveal } from '@/components/animations/Reveal'

/**
 * The integrated workflow as a numbered plate.
 *
 * Eight stages in one joined hairline grid — two rows of four on desktop,
 * matching the metrics plate above it. Each cell carries its step number in
 * a brand chip, the stage name and the stage's one-line summary; the
 * numbering alone carries the sequence. The capability pages still carry
 * the depth.
 */
export function Capabilities() {
  return (
    <section className="bg-white py-20 lg:py-24" aria-label="Our integrated workflow">
      <div className="container-site">
        <SectionHeader
          index="05"
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

        {/* One bordered rectangle whose cells share 1px hairlines — the same
            gap-px plate as the metrics band, so the two read as one system. */}
        <ol className="grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
          {workflowStages.map((stage, i) => (
            <Reveal
              as="li"
              key={stage.index}
              delay={0.05 * (i % 4)}
              className="h-full bg-white"
            >
              <div className="flex h-full flex-col bg-white p-6 lg:p-7">
                <span className="tabular flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint text-small font-semibold text-brand">
                  {stage.index}
                </span>

                <h3 className="mt-6 font-display text-display-4 text-charcoal">{stage.title}</h3>
                <p className="mt-2 text-small text-muted">{stage.short}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
