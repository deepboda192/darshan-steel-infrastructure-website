import { Building2, CalendarDays, Factory, Layers } from 'lucide-react'
import { company } from '@/data/company'
import { Counter } from '@/components/animations/Counter'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/site/TechLabel'
import { cn } from '@/lib/cn'

import type { LucideIcon } from 'lucide-react'

/**
 * Scale band — a data plate of one ruled row of four figures. A single row
 * doesn't earn a full viewport, so the band sits on its own padding rather
 * than min-h-screen.
 *
 * The homepage shows a curated four of the full metric set (established,
 * projects, capacity, industries) in that order; the about page still renders
 * the complete list from data/company.ts.
 *
 * The numeral carries the weight; its unit is set on its own line beneath it
 * rather than inside the counter. Baked into the counter, "MT / Month" and
 * "Sq. Mt." wrapped those numerals onto a second line while the bare figures
 * stayed on one, so the row sat at four heights and nothing aligned.
 *
 * The two figures DSI has not yet supplied (years, lifetime projects) render
 * as flagged pending slots, not as counters reading zero — and the note at the
 * foot of the band says so. Both go live by filling `value` in
 * data/company.ts; the pending state and the note retire themselves.
 *
 * Layout note: the divider classes live on the <Reveal>, because the Reveal is
 * the grid child. Put on the inner div, `nth-child` arithmetic sees only that
 * div inside its own wrapper and every divider silently disappears.
 */
// The four figures the homepage leads with, in band order.
const HOME_METRIC_KEYS = ['years', 'projects', 'capacity', 'industries']

// One pictogram per figure, keyed like the data. Presentation only, so the
// mapping lives here rather than in data/company.ts.
const METRIC_ICONS: Record<string, LucideIcon> = {
  years: CalendarDays,
  projects: Building2,
  capacity: Factory,
  industries: Layers,
}

export function Metrics() {
  const metrics = HOME_METRIC_KEYS.flatMap((key) =>
    company.metrics.filter((m) => m.key === key),
  )

  return (
    <section className="relative bg-white" aria-label="Scale and experience">
      <div className="container-site w-full py-20 lg:pb-15 lg:pt-24">
        <Reveal>
          <TechLabel index="01" rule>
            Scale
          </TechLabel>
        </Reveal>

        {/* Stacked on phones, paired on tablets, one ruled row of four on
            desktop. Cell 1 opens the row, so 4n+1 drops the divider. */}
        <dl className="mt-8 grid sm:grid-cols-2 md:mt-10 lg:grid-cols-4 lg:border-b lg:border-charcoal/10">
          {metrics.map((metric, i) => {
            // Every current figure is live, so TS narrows this to `false` —
            // the cast keeps the pending path for future unsupplied stats.
            const pending = (metric.value as number) === 0
            const Icon = METRIC_ICONS[metric.key]
            return (
              <Reveal
                key={metric.key}
                delay={0.05 * (i % 4)}
                className={cn(
                  'border-b border-charcoal/10 py-6 sm:py-8 lg:border-b-0 lg:border-charcoal/10 lg:py-9 lg:pl-8',
                  'lg:border-l lg:[&:nth-child(4n+1)]:border-l-0 lg:[&:nth-child(4n+1)]:pl-0',
                  'lg:[&:nth-child(n+5)]:border-t',
                )}
              >
                <div className="flex h-full flex-col" data-placeholder={metric.placeholder}>
                  {/* A quiet pictogram, not a badge — thin stroke, brand blue,
                      sitting on the cell's own baseline grid above the numeral. */}
                  {Icon && (
                    <span aria-hidden="true" className="order-0 mb-5 block">
                      <Icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
                    </span>
                  )}
                  <dd className="order-1 m-0">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span
                        className={cn(
                          'font-display wdth-wide tabular text-display-3 leading-[0.9]',
                          pending ? 'text-steel' : 'text-charcoal',
                        )}
                      >
                        {pending ? (
                          '—'
                        ) : (
                          <Counter
                            value={metric.value}
                            grouping={'grouping' in metric ? metric.grouping : true}
                          />
                        )}
                      </span>
                      {!pending && metric.suffix && (
                        <span
                          aria-hidden="true"
                          className="font-display wdth-wide text-display-4 leading-none text-brand"
                        >
                          {metric.suffix}
                        </span>
                      )}
                      {/* The unit rides the numeral's baseline — small, in
                          brand blue, part of the figure rather than a caption
                          beneath it. */}
                      {!pending && metric.unit && (
                        <span className="text-lead font-medium leading-none text-brand">{metric.unit}</span>
                      )}
                    </span>
                  </dd>

                  <dt className="order-2 mt-5">
                    <span className="block text-small font-medium text-charcoal">
                      {metric.label}
                    </span>
                    <span className="tech mt-2.5 block text-muted">{metric.note}</span>
                  </dt>
                </div>
              </Reveal>
            )
          })}
        </dl>

        {/*
          Shown while any figure on the band is still unconfirmed. Rendering an
          unsupplied figure as a bare numeral would state a claim about a real
          business that cannot be evidenced — the one thing this site must not
          do. Filling the pending values in data/company.ts retires this note.
        */}
        {metrics.some((m) => m.placeholder) && (
          <Reveal delay={0.2}>
            <p
              className="measure mt-8 flex items-start gap-4 text-small text-muted"
              data-placeholder="true"
            >
              <span aria-hidden="true" className="mt-2.5 h-px w-8 shrink-0 bg-brand" />
              <span>
                Figures marked — are awaiting confirmation by DSI and will be published once
                they can be evidenced.
              </span>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
