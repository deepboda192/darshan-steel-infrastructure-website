import { Building2, CalendarDays, Factory, Layers, Lightbulb, TrendingUp } from 'lucide-react'
import { company } from '@/data/company'
import { Counter } from '@/components/animations/Counter'
import { Reveal } from '@/components/animations/Reveal'
import { SectionHeader } from '@/components/site/SectionHeader'
import { cn } from '@/lib/cn'

import type { LucideIcon } from 'lucide-react'

/**
 * About + Scale — the company introduction, then a data plate of one ruled row
 * of four figures that stands as its evidence.
 *
 * The About half is two columns on desktop: who DSI is on the left (heading
 * and positioning paragraph), vision and mission on the right. All copy comes
 * from data/company.ts.
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
 * Each figure sits in its own fully bordered card (icon chip, numeral, label).
 * The per-metric `note` strings are deliberately not rendered here — the label
 * alone carries the meaning; the about page still shows the full annotated
 * list.
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
    <section className="relative bg-white" aria-label="About Darshan Steel Infrastructure">
      <div className="container-site w-full py-20 lg:py-24">
        {/* ------------------------------------------------------ about us */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader
              index="01"
              eyebrow="About us"
              title={
                <>
                  Darshan Steel
                  {' '}<br />
                  Infrastructure
                </>
              }
              lead={company.about}
            />
          </div>

          {/* Vision and mission sit as a pair, aligned to the heading's top so
              the two columns read as one composition. */}
          <div className="flex flex-col gap-10 lg:col-span-5 lg:pt-[3.75rem]">
            {[
              { icon: Lightbulb, label: 'Vision', text: company.vision },
              { icon: TrendingUp, label: 'Mission', text: company.mission },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.label} delay={0.1 + 0.08 * i}>
                  <div className="border-t border-charcoal/10 pt-7">
                    <div className="flex items-center gap-3">
                      <Icon aria-hidden="true" className="h-5 w-5 text-brand" strokeWidth={1.5} />
                      <h3 className="font-display wdth-wide text-display-4 text-charcoal">
                        {item.label}
                      </h3>
                    </div>
                    <p className="mt-4 text-body text-charcoal/80">{item.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* One joined plate: a single bordered rectangle whose cells share
            1px hairlines (the `gap-px` over a tinted ground technique, as on
            the client logo wall) — no gaps between cells. Stacked on phones,
            paired on tablets, one row of four on desktop. */}
        <dl className="mt-16 grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {metrics.map((metric, i) => {
            // Every current figure is live, so TS narrows this to `false` —
            // the cast keeps the pending path for future unsupplied stats.
            const pending = (metric.value as number) === 0
            const Icon = METRIC_ICONS[metric.key]
            return (
              <Reveal key={metric.key} delay={0.05 * (i % 4)} className="h-full bg-white">
                <div
                  className="flex h-full flex-col bg-white p-6 lg:p-7"
                  data-placeholder={metric.placeholder}
                >
                  {/* The pictogram sits in a soft brand-tint chip so the card
                      reads at a glance before the numeral is parsed. */}
                  {Icon && (
                    <span
                      aria-hidden="true"
                      className="order-0 mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint"
                    >
                      <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} />
                    </span>
                  )}
                  <dd className="order-1 m-0">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span
                        className={cn(
                          'font-display wdth-wide tabular text-display-3 leading-none',
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

                  <dt className="order-2 mt-3">
                    <span className="block text-small font-medium text-charcoal">
                      {metric.label}
                    </span>
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
