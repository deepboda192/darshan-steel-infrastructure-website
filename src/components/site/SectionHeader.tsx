import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { TechLabel } from './TechLabel'
import { Reveal } from '@/components/animations/Reveal'

type SectionHeaderProps = {
  index?: string
  eyebrow?: string
  /** The headline. Pass a fragment with <br/> to control line breaks. */
  title: ReactNode
  lead?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  /** Right-hand slot — usually a CTA on desktop. */
  aside?: ReactNode
  className?: string
  size?: 'lg' | 'md'
  as?: 'h1' | 'h2' | 'h3'
}

/**
 * Standard section opening: technical label, large display headline, optional
 * lead paragraph. Used on every section so headings share one rhythm.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  tone = 'dark',
  align = 'left',
  aside,
  className,
  size = 'lg',
  as: Heading = 'h2',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8',
        aside && 'lg:flex-row lg:items-end lg:justify-between lg:gap-16',
        className,
      )}
    >
      <div className={cn('flex flex-col', align === 'center' && 'items-center text-center mx-auto')}>
        {eyebrow && (
          <Reveal>
            <TechLabel index={index} rule tone={tone === 'light' ? 'light' : 'dark'} className="mb-7">
              {eyebrow}
            </TechLabel>
          </Reveal>
        )}

        <Reveal delay={0.06}>
          <Heading
            className={cn(
              'font-display wdth-wide',
              size === 'lg' ? 'text-display-2' : 'text-display-3',
              tone === 'light' ? 'text-white' : 'text-charcoal',
            )}
          >
            {title}
          </Heading>
        </Reveal>

        {lead && (
          <Reveal delay={0.12}>
            <div
              className={cn(
                'measure mt-7 text-lead',
                tone === 'light' ? 'text-white/65' : 'text-muted',
                align === 'center' && 'mx-auto',
              )}
            >
              {lead}
            </div>
          </Reveal>
        )}
      </div>

      {aside && (
        <Reveal delay={0.18} className="shrink-0">
          {aside}
        </Reveal>
      )}
    </div>
  )
}
