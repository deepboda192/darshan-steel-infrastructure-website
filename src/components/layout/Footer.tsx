import { useEffect, useRef, useState } from 'react'
import { company, formattedAddress } from '@/data/company'
import { footerNav } from '@/data/nav'
import { siteImages } from '@/data/images'
import { renditionUrl } from '@/components/media/NextImage'
import { Logo } from './Logo'
import { Button } from '@/components/site/Button'
import Link from '@/components/site/NextLink'
import { SocialIcon } from '@/components/site/SocialIcon'
import { ArrowUp, ArrowUpRight } from 'lucide-react'

/** The reference's social button: a 44px hairline box that fills with the accent on hover. */
const SOCIAL_BOX =
  'flex h-11 w-11 items-center justify-center border border-black/30 text-neutral-10 max-xs:h-10 max-xs:w-10'

/** Small caps label above a footer entry — the same voice as the contact cards' hints. */
const EYEBROW = 'text-[13px] font-medium uppercase text-neutral-6'

/** A footer route: the label, the link and the site's hover. */
const FOOT_LINK =
  'inline-block text-[16px] font-medium leading-[1.5] text-neutral-8 transition-colors duration-300 hover:text-accent'

/**
 * The closing band, as in the reference: a photographic backdrop carrying a
 * centred call to action, then a raised white footer box in three columns —
 * the brand with the office and factory addresses, the two link groups under
 * their headings, and the direct routes with the social buttons — closed by
 * the copyright line and a way back to the top. Everything is left-aligned
 * and labelled so it scans as a directory. The "DSI" watermark that sat
 * beneath the box was removed at the user's request on 2026-09-29.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const ref = useRef<HTMLElement>(null)

  // The photograph is fetched once the footer is within a screen of the
  // viewport, so it never competes with a page's own images while that page
  // is loading. Until then the footer is its own near-black.
  const [near, setNear] = useState(false)
  useEffect(() => {
    const footer = ref.current
    if (!footer || typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100% 0px' },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={ref} className="relative isolate overflow-hidden bg-neutral-10 pb-20 max-md:pb-14 max-xs:pb-10">
      {/* ---------------- backdrop ---------------- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed max-md:bg-scroll"
        style={near ? { backgroundImage: `url(${renditionUrl(siteImages.footer.src, 1200)})` } : undefined}
      >
        {/* Dark wash over the whole photograph so the call to action reads. */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ---------------- call to action ---------------- */}
      <div className="m-container">
        <div
          className="flex flex-col items-center border-x border-white/30 px-5 py-20 text-center max-xs:py-[54px]"
          data-reveal="up"
        >
          <div className="max-w-[550px]">
            <h2 className="font-heading text-[64px] font-semibold leading-(--lh-lg) text-white max-lg:text-[60px] max-md:text-[48px] max-xs:text-[36px]">
              Planning your next industrial facility?
            </h2>
          </div>
          <div className="h-6" />
          <div className="max-w-[350px]">
            <p className="text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]">
              Tell us what you&apos;re building. Our team will help you explore the right structural
              solution.
            </p>
          </div>
          <div className="h-10" />
          <Button href="/#contact">Start Your Project</Button>
        </div>
      </div>

      {/* ---------------- footer box ---------------- */}
      <div className="border-y border-white/30">
        <div className="m-container">
          <div
            className="relative bg-white px-10 pb-8 pt-14 shadow-[0_10px_25px_#0000004d] max-md:px-6 max-md:pb-6 max-md:pt-10 max-xs:px-5 max-xs:pb-5 max-xs:pt-8"
            data-reveal="fade"
          >
            <div className="grid grid-cols-[1.25fr_1fr_1fr] gap-x-12 gap-y-10 max-lg:grid-cols-1 max-lg:gap-y-0">
              {/* brand + addresses */}
              <div className="flex flex-col gap-7 max-lg:border-b max-lg:border-black/10 max-lg:pb-10 max-xs:pb-8">
                <Logo tone="light" height={40} />
                <div className="flex flex-col gap-5">
                  <div>
                    <p className={EYEBROW}>Registered office</p>
                    <address
                      className="m-paragraph medium mt-1.5 max-w-[360px] not-italic"
                      data-placeholder={company.address.city.placeholder}
                    >
                      {formattedAddress()}
                    </address>
                  </div>
                  <div>
                    <p className={EYEBROW}>Factory</p>
                    <address className="m-paragraph medium mt-1.5 max-w-[360px] not-italic">
                      {company.works[0].address}
                    </address>
                  </div>
                </div>
              </div>

              {/* links */}
              <div className="grid grid-cols-2 gap-8 lg:border-l lg:border-black/10 lg:pl-12 max-lg:py-10 max-lg:border-b max-lg:border-black/10 max-xs:gap-6 max-xs:py-8">
                {footerNav.map((group) => (
                  <nav key={group.heading} aria-label={group.heading}>
                    <p className={EYEBROW}>{group.heading}</p>
                    <ul className="mt-4 flex flex-col gap-3 max-xs:gap-2.5">
                      {group.items.map((item) => (
                        <li key={item.href + item.label}>
                          <Link href={item.href} className={FOOT_LINK}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>

              {/* direct routes */}
              <div className="flex flex-col gap-7 lg:border-l lg:border-black/10 lg:pl-12 max-lg:pt-10 max-xs:pt-8">
                <div>
                  <p className={EYEBROW}>Email</p>
                  <a
                    href={`mailto:${company.email.general.value}`}
                    className="mt-1.5 inline-block break-words font-heading text-[22px] font-semibold leading-(--lh-sm) text-neutral-10 transition-colors duration-300 hover:text-accent max-xs:text-[20px]"
                    data-placeholder={company.email.general.placeholder}
                  >
                    {company.email.general.value}
                  </a>
                </div>
                <div>
                  <p className={EYEBROW}>Phone</p>
                  <div className="mt-1.5 flex flex-col gap-1">
                    {[company.phone.primary, company.phone.secondary].map((p) => (
                      <a
                        key={p.value}
                        href={`tel:${p.value.replace(/[^+\d]/g, '')}`}
                        className="inline-block font-heading text-[22px] font-semibold leading-(--lh-sm) text-neutral-10 transition-colors duration-300 hover:text-accent max-xs:text-[20px]"
                        data-placeholder={p.placeholder}
                      >
                        {p.value}
                      </a>
                    ))}
                  </div>
                </div>

                {company.social.length > 0 && (
                  <div>
                    <p className={EYEBROW}>Follow us</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {company.social.map((s) => {
                        const glyph = <SocialIcon label={s.label} fallback={<ArrowUpRight size={18} />} />
                        return (
                          <li key={s.label}>
                            {s.url.trim() ? (
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={s.label}
                                className={`${SOCIAL_BOX} transition-colors duration-[250ms] hover:border-accent hover:bg-accent hover:text-white`}
                              >
                                {glyph}
                              </a>
                            ) : (
                              // No address yet: the box keeps its place and is flagged in audit mode.
                              <span
                                role="img"
                                aria-label={`${s.label} — link to follow`}
                                className={SOCIAL_BOX}
                                data-placeholder="true"
                              >
                                {glyph}
                              </span>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-14 flex items-center justify-between gap-6 border-t border-black/10 pt-7 max-lg:mt-10 max-xs:flex-col max-xs:items-start max-xs:gap-4 max-xs:pt-6">
              <p className="text-[15px] font-medium leading-[1.5] text-neutral-7">
                © {year} {company.legalName}. All rights reserved.
              </p>
              <a
                href="#top"
                className="group inline-flex items-center gap-2 font-heading text-[14px] font-semibold uppercase text-neutral-10 transition-colors duration-300 hover:text-accent"
              >
                Back to top
                <ArrowUp
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
