import { useEffect, useRef, useState } from 'react'
import { usePathname } from '@/lib/next-navigation'
import { primaryNav } from '@/data/nav'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'
import { Button } from '@/components/site/Button'
import Link from '@/components/site/NextLink'

/**
 * Site navigation, laid over the top of the hero as in the reference: a
 * transparent 78px bar with a hairline beneath, caps links that underline in
 * the accent on hover, and one solid CTA. Below 992px the links collapse
 * behind a three-line trigger into a white panel that drops from the bar.
 */
export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

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
    <header className="absolute inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:font-heading focus:font-bold focus:uppercase focus:text-white"
      >
        Skip to content
      </a>

      {/* The hairline runs edge to edge; only the contents sit in the container. */}
      <div className="border-b border-white/30 max-xs:border-b-0">
        <div className="m-container">
          <div className="flex h-[78px] items-center justify-between">
            <Logo tone="dark" height={36} priority />

            {/* ---------- desktop links ---------- */}
            <nav aria-label="Primary" className="hidden items-center gap-2.5 p-[5px] lg:flex">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className="m-nav-link">
                  {item.label}
                </Link>
              ))}
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
              className="-mr-2 flex h-11 w-11 flex-col items-center justify-center text-white lg:hidden"
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
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-black/10 py-3 font-heading text-[20px] font-medium uppercase text-neutral-9 transition-colors hover:text-accent max-xs:text-[16px]"
            >
              {item.label}
            </Link>
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
