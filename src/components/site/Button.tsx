import Link from '@/components/site/NextLink'
import { ArrowRight } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'link'
type Tone = 'light' | 'dark'

type ButtonProps = {
  children: ReactNode
  /** `primary` = solid accent. `outline` = hairline that fills on hover.
      `link` = underlined accent text. */
  variant?: Variant
  /** `light` = sits on a light surface. `dark` = sits on a dark one. */
  tone?: Tone
  /** Trailing arrow with the swap-on-hover motion. On by default. */
  arrow?: boolean
  className?: string
  /** Renders an anchor / router Link instead of a button. */
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: ComponentPropsWithoutRef<'button'>['onClick']
  'aria-label'?: string
}

/**
 * The site's button: a 2px-radius accent block set in Radio Canada Big caps,
 * with the reference's double-arrow hover. In-page anchors and external
 * targets render plain anchors; internal paths go through the router.
 */
export function Button({
  children,
  variant = 'primary',
  tone = 'light',
  arrow = true,
  className,
  href,
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(
    variant === 'primary' && 'm-btn',
    variant === 'outline' && cn('m-btn-outline', tone === 'dark' && 'light'),
    variant === 'link' && 'm-link inline-flex items-center gap-2',
    className,
  )

  const inner = (
    <>
      <span>{children}</span>
      {arrow && variant !== 'link' && (
        <span className="m-btn-arrows" aria-hidden="true">
          <ArrowRight size={16} strokeWidth={2.2} />
          <ArrowRight size={16} strokeWidth={2.2} />
        </span>
      )}
      {arrow && variant === 'link' && <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />}
    </>
  )

  if (href) {
    const isExternal = /^(https?:)/.test(href)
    const isProtocol = /^(mailto:|tel:)/.test(href)
    const isAnchor = href.includes('#')

    if (isExternal || isProtocol || isAnchor) {
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
