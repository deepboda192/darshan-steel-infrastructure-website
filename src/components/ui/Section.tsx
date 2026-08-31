import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

type Tone = 'white' | 'offwhite' | 'charcoal' | 'ink'

type SectionProps = {
  children: ReactNode
  /** Surface colour. The homepage alternates these to build vertical rhythm. */
  tone?: Tone
  id?: string
  className?: string
  /** Vertical padding scale. `none` when the section manages its own spacing. */
  space?: 'none' | 'sm' | 'md' | 'lg'
  ariaLabel?: string
}

const tones: Record<Tone, string> = {
  white: 'bg-white text-charcoal',
  offwhite: 'bg-offwhite text-charcoal',
  charcoal: 'bg-charcoal text-white on-dark',
  ink: 'bg-ink text-white on-dark',
}

const spaces = {
  none: '',
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28 lg:py-32',
  lg: 'py-24 md:py-36 lg:py-44',
}

/**
 * A full-width horizontal band. Sections carry the surface colour; Containers
 * inside them carry the horizontal rhythm.
 */
export function Section({
  children,
  tone = 'white',
  id,
  className,
  space = 'md',
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('relative', tones[tone], spaces[space], className)}
    >
      {children}
    </section>
  )
}
