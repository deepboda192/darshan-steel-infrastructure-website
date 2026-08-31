import Link from 'next/link'
import { company, formattedAddress, activeSocials } from '@/data/company'
import { footerNav, legalNav } from '@/data/nav'
import { Logo } from './Logo'
import { Arrow } from '@/components/site/Arrow'
import { TechLabel } from '@/components/site/TechLabel'

export function Footer() {
  const year = new Date().getFullYear()
  const socials = activeSocials()

  return (
    <footer className="relative overflow-hidden bg-charcoal on-dark">
      {/* structural grid backdrop */}
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.035]"
      />

      <div className="container-site relative">
        {/* ---------------- top band ---------------- */}
        <div className="grid gap-14 border-b border-white/10 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-4">
            <Logo tone="dark" height={40} />

            <p className="measure mt-8 text-small text-white/60">{company.summary}</p>

            <div className="mt-10">
              <TechLabel tone="light" className="mb-4">
                Registered Office
              </TechLabel>
              <address
                className="not-italic text-small leading-relaxed text-white/75"
                data-placeholder={company.address.city.placeholder}
              >
                {formattedAddress()}
              </address>
            </div>
          </div>

          {/* ---------------- link columns ---------------- */}
          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-5 lg:col-start-6">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <TechLabel tone="light" className="mb-6">
                  {group.heading}
                </TechLabel>
                <ul className="flex flex-col gap-3.5">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="text-small text-white/65 transition-colors duration-300 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ---------------- contact ---------------- */}
          <div className="lg:col-span-2 lg:col-start-11">
            <TechLabel tone="light" className="mb-6">
              Direct
            </TechLabel>
            <ul className="flex flex-col gap-5 text-small">
              <li>
                <span className="tech mb-1.5 block text-white/55">Phone</span>
                <a
                  href={`tel:${company.phone.primary.value.replace(/[^+\d]/g, '')}`}
                  className="text-white/80 transition-colors hover:text-white"
                  data-placeholder={company.phone.primary.placeholder}
                >
                  {company.phone.primary.value}
                </a>
              </li>
              <li>
                <span className="tech mb-1.5 block text-white/55">Email</span>
                <a
                  href={`mailto:${company.email.general.value}`}
                  className="break-all text-white/80 transition-colors hover:text-white"
                  data-placeholder={company.email.general.placeholder}
                >
                  {company.email.general.value}
                </a>
              </li>
              <li>
                <span className="tech mb-1.5 block text-white/55">Hours</span>
                <span className="text-white/80" data-placeholder={company.hours.placeholder}>
                  {company.hours.value}
                </span>
              </li>
            </ul>

            {socials.length > 0 && (
              <ul className="mt-8 flex flex-col gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-2 text-small text-white/65 transition-colors hover:text-white"
                    >
                      {s.label}
                      <Arrow
                        size={13}
                        angle={-45}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ---------------- legal band ---------------- */}
        <div className="flex flex-col gap-5 py-8 tech text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="hidden text-white/55 sm:inline">
              PEB · Structural Steel · Gujarat, India
            </span>
            <ul className="flex items-center gap-6">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white/80">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
