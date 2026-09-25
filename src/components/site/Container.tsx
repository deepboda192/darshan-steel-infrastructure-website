import { cn } from '@/lib/cn'
import type { ElementType, ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Removes the max-width cap for full-bleed compositions. */
  bleed?: boolean
}

/**
 * The site's horizontal rhythm — the 1370px container with responsive side
 * padding. Marketing sections use the `m-container` class directly; this
 * wrapper serves the admin screens.
 */
export function Container({ children, className, as: Tag = 'div', bleed = false }: ContainerProps) {
  return (
    <Tag className={cn(bleed ? 'w-full px-[var(--container-pad)]' : 'm-container', className)}>
      {children}
    </Tag>
  )
}
