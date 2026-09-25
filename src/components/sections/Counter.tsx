import type { company } from '@/data/company'

type Metric = (typeof company.metrics)[number]

/**
 * A figure that counts up when scrolled into view (see lib/motion.ts).
 * The server renders the final value, so the number is right without
 * JavaScript and there is nothing to mismatch on hydration; the count-up
 * only ever runs after mount. Figures are proportional, not tabular, so they
 * set exactly like the hero figure.
 */
export function Counter({ metric }: { metric: Metric }) {
  const grouping = 'grouping' in metric ? metric.grouping : true
  const shown = grouping ? metric.value.toLocaleString('en-IN') : String(metric.value)
  return (
    <span
      data-counter={metric.value}
      data-suffix={metric.suffix}
      data-grouping={grouping ? 'true' : 'false'}
    >
      {shown}
      {metric.suffix}
    </span>
  )
}
