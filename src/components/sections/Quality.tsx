import { qualityChecks } from '@/data/capabilities'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/ui/TechLabel'
import { Button } from '@/components/ui/Button'

/**
 * Quality control.
 *
 * Charcoal band with the six hold points where work is verified before it
 * moves on. The pull quote carries the argument; the list carries the proof.
 */
export function Quality() {
  return (
    <section className="relative overflow-hidden bg-charcoal on-dark py-24 md:py-32 lg:py-40" aria-label="Quality control">
      <div
        aria-hidden="true"
        className="dotgrid pointer-events-none absolute inset-0 text-white opacity-[0.07]"
      />

      <div className="container-site relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <TechLabel index="09" rule tone="light" className="mb-7">
                Quality
              </TechLabel>
            </Reveal>

            <h2 className="font-display wdth-wide text-display-3 uppercase text-white">
              <Reveal variant="line" delay={0.06}>
                Precision is
              </Reveal>
              <Reveal variant="line" delay={0.14}>
                not optional.
              </Reveal>
            </h2>
          </div>

          <Reveal delay={0.2} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            <blockquote className="border-l-2 border-brand pl-7">
              <p className="text-display-4 font-display text-white/90">
                Quality is built into the process — not inspected into the product.
              </p>
            </blockquote>
            <p className="measure mt-8 text-body text-white/60">
              Verification happens at fixed hold points, and work does not move to the next stage
              until the record for the current one is closed. Every member carries its mark back
              to the drawing it was made from.
            </p>
          </Reveal>
        </div>

        {/* ---------------- hold points ---------------- */}
        <div className="mt-20 grid border-t border-white/12 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {qualityChecks.map((check, i) => (
            <Reveal key={check.index} delay={0.05 * i}>
              <article className="h-full border-b border-white/12 py-9 pr-8 md:pr-12 lg:[&:nth-child(3n+2)]:pl-10 lg:[&:nth-child(3n+3)]:pl-10 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+3)]:border-l lg:[&:nth-child(3n+2)]:border-l-white/12 lg:[&:nth-child(3n+3)]:border-l-white/12">
                <div className="flex items-baseline gap-4">
                  <span className="tech text-brand tabular">{check.index}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
                </div>
                <h3 className="mt-6 text-display-4 font-display text-white">{check.title}</h3>
                <p className="mt-3.5 text-small text-white/60">{check.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14">
            <Button href="/quality-engineering" variant="secondary" tone="dark" arrow>
              Quality & Engineering
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
