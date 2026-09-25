import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type SectionIntroProps = {
  /** Eyebrow, e.g. "About us". Set in caps with the accent rule. */
  subtitle: string
  title: ReactNode
  /** `light` for dark surfaces. */
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  /** `blur` runs the word-by-word blur entrance on the heading. The title
      must then be a plain string, since the text is split into words. */
  animate?: 'blur' | 'none'
  as?: 'h1' | 'h2'
  className?: string
}

/**
 * Standard section opening: eyebrow above a caps display heading — the
 * reference's `subtitle-heading-box`. Every section uses it so the eyebrow
 * and heading share one rhythm site-wide.
 */
export function SectionIntro({
  subtitle,
  title,
  tone = 'dark',
  align = 'left',
  animate = 'none',
  as: Heading = 'h2',
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 max-md:gap-6',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <p className={cn('m-subtitle', tone === 'light' && 'light')}>{subtitle}</p>
      <Heading
        className={cn(Heading === 'h1' ? 'm-h1' : 'm-h2', tone === 'light' && 'light')}
        data-animation={animate === 'blur' ? 'blur-stagger' : undefined}
      >
        {title}
      </Heading>
    </div>
  )
}
