import { company } from '@/data/company'
import { Counter } from '@/components/animations/Counter'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/ui/TechLabel'

/**
 * Scale band, directly under the hero.
 *
 * Reads as a data plate on a drawing sheet: rules top and bottom, hairline
 * dividers between figures, counters that run once on entry. Every figure here
 * is a placeholder from data/company.ts and is flagged as such — see the
 * `placeholder` field and ?audit=1.
 */
export function Metrics() {
  // The capacity metric has no value yet; it is shown on /manufacturing as a
  // bracketed placeholder rather than as a counter reading zero.
  const metrics = company.metrics.filter((m) => m.value > 0)

  return (
    <section className="relative bg-white" aria-label="Scale and experience">
      <div className="container-site">
        <div className="flex flex-col gap-10 border-b border-charcoal/10 py-16 md:py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal>
            <TechLabel index="01" rule className="lg:mb-0">
              Scale
            </TechLabel>
          </Reveal>

          <Reveal delay={0.08} className="lg:max-w-md">
            <p className="text-lead text-muted">
              Delivered across manufacturing, warehousing and cold chain — from single-bay
              sheds to multi-bay crane-served plants.
            </p>
          </Reveal>
        </div>

        {/* Stacked on phones, paired on tablets, and a single ruled row on
            desktop where the vertical dividers line up with the page grid. */}
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 lg:border-b lg:border-charcoal/10">
          {metrics.map((metric, i) => (
            <Reveal
              key={metric.key}
              delay={0.06 * i}
              className="border-b border-charcoal/10 py-9 sm:py-11 lg:border-b-0 lg:border-l lg:border-charcoal/10 lg:py-14 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <div data-placeholder={metric.placeholder}>
                <dd className="font-display wdth-wide text-display-3 text-charcoal">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </dd>
                <dt className="mt-4 text-small font-medium text-charcoal">{metric.label}</dt>
                <p className="tech mt-2.5 text-muted">{metric.note}</p>
              </div>
            </Reveal>
          ))}
        </dl>

        {/*
          Every figure above carries `placeholder: true` in data/company.ts.
          Rendering them as bare numerals with no visible qualifier would state
          four unverified claims about a real business — the one thing this site
          must not do. The note stays until DSI supplies real figures and the
          flags are cleared; delete it in the same commit.
        */}
        {metrics.some((m) => m.placeholder) && (
          <Reveal delay={0.18}>
            <p
              className="measure mt-10 flex items-start gap-4 text-small text-muted"
              data-placeholder="true"
            >
              <span aria-hidden="true" className="mt-2.5 h-px w-8 shrink-0 bg-brand" />
              <span>
                Figures shown are placeholders awaiting confirmation by DSI. Each will be
                replaced with a verified value before launch — no project count, area or
                capacity is claimed until it can be evidenced.
              </span>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
