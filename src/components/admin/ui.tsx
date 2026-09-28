import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Small building blocks the admin screens share: a page header, the white
 * card, a status chip, an icon button and an empty state. They follow the
 * site's tokens (Rethink Sans headings, Inter copy, brand blue, hairlines)
 * so the panel feels like the same product as the site.
 */

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="min-w-0">
        {eyebrow && <p className="text-[12px] font-semibold uppercase tracking-[0.5px] text-neutral-5">{eyebrow}</p>}
        <h1 className="mt-1 font-heading text-[30px] font-bold leading-(--lh-sm) text-neutral-10 max-md:text-[26px]">
          {title}
        </h1>
        {description && <p className="mt-2 max-w-[640px] text-[15px] leading-[1.6] text-neutral-6">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  )
}

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-[4px] border border-black/[0.08] bg-white shadow-[0_1px_2px_#0000000a]',
        padded && 'p-6 max-xs:p-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Chip({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold leading-none',
        tone === 'neutral' && 'bg-neutral-1 text-neutral-7 ring-1 ring-inset ring-black/[0.08]',
        tone === 'accent' && 'bg-accent/10 text-accent',
        tone === 'success' && 'bg-[#e8f5ee] text-[#1f6b3a]',
      )}
    >
      {children}
    </span>
  )
}

export function IconButton({
  label,
  onClick,
  href,
  tone = 'neutral',
  disabled,
  children,
}: {
  label: string
  onClick?: () => void
  href?: string
  tone?: 'neutral' | 'danger'
  disabled?: boolean
  children: ReactNode
}) {
  const className = cn(
    'inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-transparent text-neutral-6 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40',
    tone === 'neutral' && 'hover:border-black/10 hover:bg-neutral-1 hover:text-neutral-10',
    tone === 'danger' && 'hover:border-error/20 hover:bg-error/5 hover:text-error',
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" aria-label={label} title={label} className={className}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} title={label} className={className}>
      {children}
    </button>
  )
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode
  title: string
  body?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-1 text-neutral-5">{icon}</span>
      <p className="font-heading text-[18px] font-semibold text-neutral-10">{title}</p>
      {body && <p className="max-w-[420px] text-[14px] leading-[1.6] text-neutral-6">{body}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
