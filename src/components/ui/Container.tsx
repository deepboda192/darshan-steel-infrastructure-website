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
 * The site's horizontal rhythm. Every content block sits inside a Container so
 * that text, images and the structural grid overlay share one set of edges.
 */
export function Container({ children, className, as: Tag = 'div', bleed = false }: ContainerProps) {
  return (
    <Tag className={cn(bleed ? 'w-full px-gutter' : 'container-site', className)}>{children}</Tag>
  )
}
