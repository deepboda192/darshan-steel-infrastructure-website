import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { usePathname } from '@/lib/next-navigation'
import { primaryNav } from '@/data/nav'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'
import { Button } from '@/components/site/Button'
import Link from '@/components/site/NextLink'

/**
 * Site navigation, fixed to the top of every page (user's rule, 2026-09-28):
 * a transparent 78px bar with the reversed logo and a hairline beneath while
 * the hero is in view, turning white with the colour logo, dark links and a
 * soft shadow once the page scrolls (`data-solid`), caps links that
 * underline in the accent on hover, and one solid CTA. Below 992px the links
 * collapse behind a three-line trigger into a white panel that drops from
 * the bar.
 */
export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  /* White bar, colour logo and dark links once scrolled or with the phone menu open. */
  const solid = scrolled || open

  /* --- the bar turns solid once the page has scrolled past its top -------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* --- close the panel on route change --------------------------------- */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  /* --- Escape closes the panel ------------------------------------------ */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      data-solid={solid || undefined}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
        solid && 'bg-white shadow-[0_2px_24px_#0002]',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:font-heading focus:font-bold focus:uppercase focus:text-white"
      >
        Skip to content
      </a>

      {/* The hairline runs edge to edge; only the contents sit in the container. */}
      <div className={cn('border-b max-xs:border-b-0 transition-colors duration-300', solid ? 'border-black/10' : 'border-white/30')}>
        <div className="m-container">
          <div className="flex h-[78px] items-center justify-between">
            <Logo tone={solid ? 'light' : 'dark'} height={36} priority />

            {/* ---------- desktop links ---------- */}
            <nav aria-label="Primary" className="hidden items-center gap-2.5 p-[5px] lg:flex">
              {primaryNav.map((item) =>
                item.children ? (
                  /* A link with a submenu: the panel opens on hover and while
                     anything inside the group has keyboard focus. */
                  <div key={item.href} className="group relative">
                    <Link href={item.href} className="m-nav-link gap-1.5">
                      {item.label}
                      <ChevronDown
                        size={15}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                      />
                    </Link>
                    <div
                      aria-label={`${item.label} pages`}
                      className="invisible absolute left-0 top-full z-10 w-[400px] translate-y-2 border border-black/10 border-t-2 border-t-accent bg-white opacity-0 shadow-[0_16px_40px_#0004] transition-[opacity,translate,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                    >
                      {/* The section's own page first, as an overview row. */}
                      <Link
                        href={item.href}
                        exact
                        className="group/overview flex items-center justify-between gap-4 border-b border-black/10 px-5 py-4 transition-colors hover:bg-neutral-1 focus-visible:bg-neutral-1"
                      >
                        <span className="min-w-0">
                          <span
                            className={cn(
                              'block font-heading text-[16px] font-bold uppercase leading-[1.3] transition-colors group-hover/overview:text-accent',
                              pathname === item.href ? 'text-accent' : 'text-neutral-10',
                            )}
                          >
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-[1.45] text-neutral-7">{item.description}</span>
                        </span>
                        <ArrowRight
                          size={17}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="shrink-0 text-accent transition-transform duration-300 group-hover/overview:translate-x-1"
                        />
                      </Link>

                      <p className="px-5 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.6px] text-neutral-6">
                        The five systems
                      </p>
                      <ul className="p-2 pt-1">
                        {item.children.map((child, i) => {
                          const active = pathname === child.href
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  'group/item flex items-start gap-3 border-l-2 px-3 py-2.5 transition-colors hover:bg-neutral-1 focus-visible:bg-neutral-1',
                                  active ? 'border-accent bg-neutral-1' : 'border-transparent',
                                )}
                              >
                                <span className="pt-[3px] font-heading text-[12px] font-bold tabular-nums text-neutral-5">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span
                                    className={cn(
                                      'block font-heading text-[15px] font-semibold uppercase leading-[1.3] transition-colors group-hover/item:text-accent',
                                      active ? 'text-accent' : 'text-neutral-9',
                                    )}
                                  >
                                    {child.label}
                                  </span>
                                  <span className="mt-0.5 block text-[13px] leading-[1.45] text-neutral-7">{child.description}</span>
                                </span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link key={item.href} href={item.href} className="m-nav-link">
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            {/* ---------- desktop CTA ---------- */}
            <div className="hidden pr-4 lg:block">
              <Button href="/#contact">Contact Us</Button>
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
                '-mr-2 flex h-11 w-11 flex-col items-center justify-center transition-colors duration-300 lg:hidden',
                solid ? 'text-neutral-10' : 'text-white',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'block h-[1.5px] w-6 bg-current transition-transform duration-300',
                  open && 'translate-y-[7.5px] rotate-45',
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'my-1.5 block h-[1.5px] w-6 bg-current transition-opacity duration-300',
                  open && 'opacity-0',
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'block h-[1.5px] w-6 bg-current transition-transform duration-300',
                  open && '-translate-y-[7.5px] -rotate-45',
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- mobile panel ---------- */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-[78px] bg-white shadow-[0_2px_20px_#0003] lg:hidden"
      >
        <nav aria-label="Mobile" className="m-container flex flex-col py-2.5">
          {primaryNav.map((item) => (
            <div key={item.href} className="border-b border-black/10">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-heading text-[20px] font-medium uppercase text-neutral-9 transition-colors hover:text-accent max-xs:text-[16px]"
              >
                {item.label}
              </Link>
              {item.children && (
                /* The submenu is always open on the phone: one tap fewer than a disclosure. */
                <ul className="mb-3 ml-3 border-l-2 border-accent/40 pl-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 font-heading text-[16px] font-medium uppercase text-neutral-8 transition-colors hover:text-accent max-xs:text-[14px]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="py-4">
            <Button href="/#contact" className="w-full justify-center">
              Contact Us
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
