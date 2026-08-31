import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

type TechLabelProps = {
  children: ReactNode
  /** Section index, e.g. "03". Rendered before a slash separator. */
  index?: string
  className?: string
  /** Draws a short rule before the label — used at the head of sections. */
  rule?: boolean
  tone?: 'dark' | 'light' | 'brand'
}

/**
 * The engineering annotation used throughout the site:
 *
 *   ──── 03 / MANUFACTURING
 *
 * Small, uppercase, monospaced, widely tracked. This is the single element
 * that most sets the technical tone, so it is used consistently and never
 * decorated further.
 */
export function TechLabel({ children, index, className, rule = false, tone = 'dark' }: TechLabelProps) {
  const toneClass =
    tone === 'light' ? 'text-white/55' : tone === 'brand' ? 'text-brand' : 'text-muted'

  return (
    <p className={cn('tech flex items-center gap-3', toneClass, className)}>
      {rule && (
        <span
          aria-hidden="true"
          className={cn('h-px w-8 shrink-0', tone === 'light' ? 'bg-white/30' : 'bg-charcoal/25')}
        />
      )}
      {index && (
        <>
          <span className={cn('tabular', tone === 'light' ? 'text-white' : 'text-charcoal')}>
            {index}
          </span>
          <span aria-hidden="true" className="opacity-40">
            /
          </span>
        </>
      )}
      <span>{children}</span>
    </p>
  )
}
