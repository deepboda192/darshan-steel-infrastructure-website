'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { primaryNav } from '@/data/nav'
import { company } from '@/data/company'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'
import { Arrow } from '@/components/site/Arrow'

/**
 * Sticky navigation.
 *
 * Starts transparent over the dark page hero and settles onto a white bar with
 * a hairline once the hero is behind it. The logo swaps between the master
 * artwork and the reversed variant so it stays legible in both states.
 */
export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  /* --- scroll state, rAF-throttled ------------------------------------- */
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* --- close the panel on route change --------------------------------- */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  /* --- lock scroll + Escape while the panel is open --------------------- */
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Move focus onto the control that dismisses the panel.
    toggleRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = useCallback(
    (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href)),
    [pathname],
  )

  // Solid once scrolled, or whenever the mobile panel is open.
  const solid = scrolled && !open

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-brand focus:px-5 focus:py-3 focus:text-white focus:tech-lg"
      >
        Skip to content
      </a>

      {/* z-60 keeps the bar — and therefore the close button — above the
          mobile panel (z-55), which otherwise covers its own dismiss control. */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-power)]',
          solid
            ? 'border-b border-charcoal/10 bg-white/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-site">
          <div
            className={cn(
              'flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-power)]',
              solid ? 'h-[76px]' : 'h-[100px]',
            )}
          >
            <Logo tone={solid ? 'light' : 'dark'} height={solid ? 32 : 36} priority />

            {/* ---------- desktop nav ---------- */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'group relative block py-2 text-[0.9rem] font-medium transition-colors duration-300',
                        solid
                          ? isActive(item.href)
                            ? 'text-brand'
                            : 'text-charcoal/75 hover:text-charcoal'
                          : isActive(item.href)
                            ? 'text-white'
                            : 'text-white/70 hover:text-white',
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          'absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-100',
                          isActive(item.href) && 'scale-x-100',
                          !solid && 'bg-white',
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ---------- desktop CTA ---------- */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className={cn(
                  'group/btn inline-flex items-center gap-3 rounded-[4px] px-6 py-3.5 tech-lg transition-colors duration-300',
                  solid
                    ? 'bg-brand text-white hover:bg-brand-hi'
                    : 'border border-white/30 text-white hover:border-white hover:bg-white/10',
                )}
              >
                Contact Us
                <Arrow className="transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover/btn:translate-x-1.5" />
              </Link>
            </div>

            {/* ---------- mobile trigger ---------- */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cn(
                'relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center lg:hidden',
                open || !solid ? 'text-white' : 'text-charcoal',
              )}
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
                <span
                  className={cn(
                    'block h-px w-full bg-current transition-transform duration-400 ease-[var(--ease-expo)]',
                    open && 'translate-y-[4px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'block h-px w-full bg-current transition-transform duration-400 ease-[var(--ease-expo)]',
                    open && '-translate-y-[4px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------- mobile panel ---------- */}
      <div
        id="mobile-nav"
        hidden={!open}
        className={cn(
          'fixed inset-0 z-[55] bg-charcoal on-dark lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div className="flex h-full flex-col">
          {/* The bar above supplies the logo and the close control. */}
          <div aria-hidden="true" className="h-[100px] shrink-0" />

          <nav aria-label="Mobile" className="container-site flex-1 overflow-y-auto pb-10">
            <ul className="flex flex-col">
              {primaryNav.map((item, i) => (
                <li key={item.href} className="border-t border-white/10">
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-5 py-5"
                    onClick={() => setOpen(false)}
                  >
                    <span className="tech w-6 shrink-0 text-white/55 tabular">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-display-4 text-white">{item.label}</span>
                    <Arrow className="ml-auto self-center text-white/55 transition-transform duration-400 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-white/10 pt-8">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="group/btn flex w-full items-center justify-center gap-3 rounded-[4px] bg-brand px-6 py-4 tech-lg text-white"
              >
                Start Your Project
                <Arrow className="transition-transform duration-400 group-hover/btn:translate-x-1.5" />
              </Link>

              <dl className="mt-9 grid gap-5 text-small">
                <div>
                  <dt className="tech mb-2 text-white/55">Call</dt>
                  <dd className="text-white/85" data-placeholder={company.phone.primary.placeholder}>
                    {company.phone.primary.value}
                  </dd>
                </div>
                <div>
                  <dt className="tech mb-2 text-white/55">Email</dt>
                  <dd className="text-white/85" data-placeholder={company.email.general.placeholder}>
                    {company.email.general.value}
                  </dd>
                </div>
              </dl>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
