import { Suspense } from 'react'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { ImageFrame } from '@/components/media/ImageFrame'
import { SectionIntro } from '@/components/site/SectionIntro'
import { ContactForm } from '@/components/site/ContactForm'

/** Strips a display number down to something a dialler accepts. */
const dialable = (value: string) => value.replace(/[^+\d]/g, '')

/**
 * Breaks a one-line postal address into a few short lines for the card,
 * packing its comma-separated parts up to about thirty characters a line.
 */
function addressLines(address: string, width = 30): string[] {
  const lines: string[] = []
  for (const part of address.split(/,\s*/)) {
    const last = lines.length - 1
    if (last >= 0 && `${lines[last]}, ${part}`.length <= width) lines[last] += `, ${part}`
    else lines.push(part)
  }
  return lines
}

/** Skeleton shown while the search-param-aware form hydrates. */
function FormFallback() {
  return (
    <div role="status" aria-label="Loading the enquiry form" className="flex flex-col gap-5">
      <div className="h-8 w-56 bg-black/5" />
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[54px] bg-white" />
        ))}
      </div>
      <div className="h-[140px] bg-white" />
      <div className="h-[54px] w-44 bg-accent/60" />
    </div>
  )
}

/**
 * Enquiry — the reference's contact layout.
 *
 * The heading and note across the top, three neutral information boxes for
 * the direct routes — the icon plate beside the box's name, then each
 * number, address (office and factory) or e-mail as a ruled row with a hint of what it is for
 * and an arrow that answers the hover — then the form on a light block
 * with white fields, beside a photograph carrying the company strapline.
 */
export function Contact() {
  const address = company.address
  const routes = [
    {
      icon: Phone,
      name: 'Call us',
      items: [company.phone.primary, company.phone.secondary].map((p) => ({
        hint: undefined as string | undefined,
        lines: [p.value],
        href: `tel:${dialable(p.value)}`,
        placeholder: p.placeholder,
      })),
    },
    {
      icon: Mail,
      name: 'Email us',
      items: [
        { hint: 'Enquiries', entry: company.email.enquiries },
        { hint: 'Careers', entry: company.email.careers },
      ].map(({ hint, entry }) => ({
        hint,
        lines: [entry.value],
        href: `mailto:${entry.value}`,
        placeholder: entry.placeholder,
      })),
    },
    {
      icon: MapPin,
      name: 'Visit us',
      items: [
        {
          hint: 'Office',
          lines: [
            address.line1.value,
            address.line2.value,
            [address.city.value, address.state.value].filter(Boolean).join(', '),
          ].filter(Boolean),
          href: address.mapsQuery.value,
          placeholder: address.line1.placeholder,
        },
        {
          hint: 'Factory',
          lines: addressLines(company.works[0].address),
          href: company.works[0].mapsQuery,
          placeholder: false,
        },
      ],
    },
  ]

  return (
    <section id="contact" className="m-section" aria-label="Send an enquiry">
      <div className="m-container">
        <div className="flex flex-col gap-20 max-xs:gap-[72px]">
          <div className="flex flex-col gap-6" data-reveal="up">
            <SectionIntro subtitle="Enquiry" title="Tell us what you are building." className="max-w-[700px]" />
            <p className="m-paragraph max-w-[600px]">
              Three fields are required so we can reply. Everything else sharpens the first answer
              you get back.
            </p>
          </div>

          {/* ---------------- direct routes ---------------- */}
          <ul className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1" data-reveal-stagger>
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <li key={route.name} className="flex flex-col gap-7 bg-neutral-1 p-8 max-xs:gap-6 max-xs:p-6">
                  <div className="flex items-center gap-4">
                    <span className="m-icon-box h-14 w-14">
                      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <p className="font-heading text-[24px] font-bold leading-(--lh-sm) text-neutral-10 max-xs:text-[22px]">
                      {route.name}
                    </p>
                  </div>
                  <ul className="flex flex-col border-t border-black/10">
                    {route.items.map((item) => (
                      <li key={item.href} className="border-b border-black/10">
                        <a
                          href={item.href}
                          className="group flex items-center justify-between gap-4 py-4 text-neutral-9 transition-colors duration-300 hover:text-accent"
                          data-placeholder={item.placeholder ? 'true' : undefined}
                          {...(item.href.startsWith('http')
                            ? {
                                target: '_blank',
                                rel: 'noreferrer noopener',
                                'aria-label': `${item.hint}: ${item.lines.join(', ')} — open in Google Maps`,
                              }
                            : {})}
                        >
                          <span className="flex min-w-0 flex-col gap-0.5">
                            {item.hint && (
                              <span className="text-[13px] font-medium uppercase text-neutral-6">
                                {item.hint}
                              </span>
                            )}
                            {item.lines.map((line) => (
                              <span key={line} className="break-words text-[18px] leading-[1.5] max-xs:text-[16px]">
                                {line}
                              </span>
                            ))}
                          </span>
                          <ArrowUpRight
                            size={18}
                            aria-hidden="true"
                            className="shrink-0 text-neutral-6 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>

          {/* ---------------- form + image ---------------- */}
          <div className="grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-md:gap-[54px] max-xs:gap-10">
            <div className="bg-neutral-1 p-10 max-md:p-8 max-xs:p-6" data-reveal="left">
              <Suspense fallback={<FormFallback />}>
                <ContactForm />
              </Suspense>
            </div>

            <div className="relative min-h-[560px] bg-neutral-1 max-lg:min-h-[420px] max-xs:min-h-[360px]" data-reveal="right">
              <ImageFrame
                image={siteImages.safety}
                tone="light"
                ratio="fill"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
              <div className="absolute bottom-5 left-5 max-w-[400px] bg-secondary py-6 pl-8 pr-6 max-xs:bottom-4 max-xs:left-4 max-xs:max-w-[300px] max-xs:p-5 max-xs:pl-6">
                <p className="font-heading text-[26px] font-medium leading-(--lh-sm) text-white max-xs:text-[22px]">
                  {company.strapline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
