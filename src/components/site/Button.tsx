import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Arrow } from './Arrow'

type Variant = 'primary' | 'secondary' | 'ghost'
type Tone = 'light' | 'dark'

type ButtonProps = {
  children: ReactNode
  variant?: Variant
  /** `light` = sits on a light surface. `dark` = sits on charcoal. */
  tone?: Tone
  /** Appends the technical arrow and animates it on hover. */
  arrow?: boolean
  size?: 'md' | 'lg'
  className?: string
  /** Renders an anchor / next Link instead of a button. */
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: ComponentPropsWithoutRef<'button'>['onClick']
  'aria-label'?: string
}

const base =
  'group/btn relative inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-[4px] tech-lg ' +
  'transition-colors duration-300 ease-[var(--ease-power)] disabled:opacity-45 disabled:pointer-events-none'

const sizes: Record<'md' | 'lg', string> = {
  md: 'px-6 py-3.5',
  lg: 'px-8 py-[1.15rem]',
}

function variantClasses(variant: Variant, tone: Tone) {
  if (variant === 'primary') {
    // Blue is the site's only saturated fill — reserved for the main action.
    return 'bg-brand text-white hover:bg-brand-hi active:bg-brand-deep'
  }
  if (variant === 'secondary') {
    return tone === 'dark'
      ? 'border border-white/25 text-white hover:border-white/60 hover:bg-white/[0.06]'
      : 'border border-charcoal/20 text-charcoal hover:border-charcoal/45 hover:bg-charcoal/[0.03]'
  }
  return tone === 'dark'
    ? 'text-white/75 hover:text-white'
    : 'text-charcoal/75 hover:text-brand'
}

export function Button({
  children,
  variant = 'primary',
  tone = 'light',
  arrow = false,
  size = 'md',
  className,
  href,
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(
    base,
    variant === 'ghost' ? 'py-1' : sizes[size],
    variantClasses(variant, tone),
    className,
  )

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Arrow className="transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover/btn:translate-x-1.5" />
      )}
    </>
  )

  if (href) {
    const isExternal = /^(https?:)/.test(href)
    const isProtocol = /^(mailto:|tel:)/.test(href)

    if (isExternal || isProtocol) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          {inner}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  )
}
