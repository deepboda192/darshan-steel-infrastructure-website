import {
  BadgeCheck,
  ClipboardCheck,
  Expand,
  Factory,
  Headphones,
  Layers,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { whyChooseDsi } from '@/data/capabilities'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Reveal } from '@/components/animations/Reveal'
import { cn } from '@/lib/cn'

import type { LucideIcon } from 'lucide-react'

/**
 * Why DSI — the eight reasons, set as a ruled 4×2 plate.
 *
 * Each cell carries a thin brand-blue pictogram, then the reason and its
 * explanation. The dividers live on the <Reveal>
 * because it is the grid child (see Metrics.tsx for why that matters); cell 1
 * of each row opens the row, so 4n+1 drops the left rule.
 */
// One pictogram per reason, keyed by index. Presentation only, so the mapping
// lives here rather than in data/capabilities.ts.
const ICONS: Record<string, LucideIcon> = {
  '01': Layers,
  '02': ShieldCheck,
  '03': BadgeCheck,
  '04': Expand,
  '05': Truck,
  '06': Factory,
  '07': ClipboardCheck,
  '08': Headphones,
}

export function WhyDSI() {
  return (
    <section className="bg-offwhite py-20 lg:py-24" aria-label="Why DSI">
      <div className="container-site">
        <SectionHeader
          index="02"
          eyebrow="Why DSI"
          title="Why DSI?"
          lead="Eight reasons clients choose DSI for their pre-engineered buildings — from the first consultation to the final bolt."
          className="mb-12 md:mb-16"
        />

        {/* One column on phones, two on tablets, four across on desktop. */}
        <ul className="grid border-t border-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseDsi.map((item, i) => {
            const Icon = ICONS[item.index]
            return (
              <Reveal
                key={item.index}
                as="li"
                delay={0.05 * (i % 4)}
                className={cn(
                  'border-b border-charcoal/10 py-8 sm:pr-8 lg:py-10',
                  'sm:border-l sm:pl-8 sm:odd:border-l-0 sm:odd:pl-0',
                  'lg:odd:border-l lg:odd:pl-8 lg:nth-[4n+1]:border-l-0 lg:nth-[4n+1]:pl-0',
                )}
              >
                {Icon && <Icon aria-hidden="true" className="h-6 w-6 text-brand" strokeWidth={1.5} />}
                <h3 className="mt-6 text-lead font-medium leading-snug text-charcoal">{item.title}</h3>
                <p className="mt-3 text-small text-muted">{item.description}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
