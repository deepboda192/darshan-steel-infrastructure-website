import { company } from '@/data/company'
import { Counter } from '@/components/animations/Counter'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/site/TechLabel'
import { cn } from '@/lib/cn'

/**
 * Scale band — a full-height data plate, two ruled rows of four figures.
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
export function Metrics() {
  const metrics = company.metrics

  return (
    <section
      className="relative flex min-h-screen items-center bg-white"
      aria-label="Scale and experience"
    >
      <div className="container-site w-full py-10 md:py-12">
        <Reveal>
          <TechLabel index="01" rule>
            Scale
          </TechLabel>
        </Reveal>

        {/* Stacked on phones, paired on tablets, two ruled rows of four on
            desktop. Cells 1 and 5 open each row, so 4n+1 drops the divider. */}
        <dl className="mt-8 grid sm:grid-cols-2 md:mt-10 lg:grid-cols-4 lg:border-b lg:border-charcoal/10">
          {metrics.map((metric, i) => {
            // Every current figure is live, so TS narrows this to `false` —
            // the cast keeps the pending path for future unsupplied stats.
            const pending = (metric.value as number) === 0
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
                  <dd className="order-1 m-0">
                    <span className="flex items-start gap-1">
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
                    </span>

                    {/* The unit belongs to the figure, so it is set at body
                        scale in the numeral's own colour — not as tech caps,
                        which were unreadable under a 60px numeral. The line is
                        reserved even when empty so every label in the row
                        lands on the same baseline. */}
                    <span
                      className={cn(
                        'mt-2.5 block text-lead font-medium leading-none',
                        metric.unit ? 'text-charcoal/60' : 'invisible',
                      )}
                      aria-hidden={metric.unit ? undefined : 'true'}
                    >
                      {metric.unit || '—'}
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
