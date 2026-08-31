import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Suspense } from 'react'
import Link from '@/components/site/NextLink'

import { company, formattedAddress } from '@/data/company'
import { siteImages } from '@/data/images'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/site/Section'
import { Container } from '@/components/site/Container'
import { SectionHeader } from '@/components/site/SectionHeader'
import { TechLabel } from '@/components/site/TechLabel'
import { Arrow } from '@/components/site/Arrow'
import { Reveal } from '@/components/animations/Reveal'
import { ContactForm } from '@/components/site/ContactForm'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'

/* -------------------------------------------------------------------------- */
/* Hero aside — what makes a first message useful                              */
/* -------------------------------------------------------------------------- */

const BRIEF_ITEMS = [
  'What the building is used for',
  'Site location and plot constraints',
  'Approximate span, length and eave height',
  'Crane, mezzanine or process loads',
  'Target start and handover dates',
]

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                       */
/* -------------------------------------------------------------------------- */

/** One row of the direct-contact panel. */
function PanelRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-charcoal/10 py-7">
      <dt className="tech mb-3.5 text-muted">{label}</dt>
      <dd className="text-body text-charcoal">{children}</dd>
    </div>
  )
}

const panelLink =
  'inline-block break-words text-charcoal transition-colors duration-300 hover:text-brand'

/** Strips a display number down to something a dialler accepts. */
const dialable = (value: string) => value.replace(/[^+\d]/g, '')

/** Skeleton shown while the search-param-aware form hydrates. */
function FormFallback() {
  return (
    <div role="status" className="mt-12">
      <span className="sr-only">Loading the enquiry form.</span>
      <div aria-hidden="true">
        <div className="mb-10 border-b border-charcoal/10 pb-8">
          <div className="h-3 w-44 bg-charcoal/10" />
        </div>
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="h-2.5 w-24 bg-charcoal/10" />
              <div className="mt-8 h-px w-full bg-charcoal/15" />
            </div>
          ))}
          <div className="sm:col-span-2">
            <div className="h-2.5 w-24 bg-charcoal/10" />
            <div className="mt-8 h-px w-full bg-charcoal/15" />
          </div>
        </div>
        <div className="mt-12 border-t border-charcoal/10 pt-9">
          <div className="h-[54px] w-52 rounded-[4px] bg-charcoal/10" />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <PageHero
        index="08"
        eyebrow="Contact"
        title={
          <>
            Tell us what
            {' '}<br />
            you are building.
          </>
        }
        lead="Use, span, site and programme are enough to start. Send those and an engineer will come back to you on the structure — not with a brochure."
        image={siteImages.pageBanners.contact}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        aside={
          <div className="border-t border-white/15 pt-8">
            <TechLabel tone="light" className="mb-6">
              Useful in a first message
            </TechLabel>
            <ul className="flex flex-col gap-4">
              {BRIEF_ITEMS.map((item) => (
                <li key={item} className="flex gap-4 text-small text-white/70">
                  <span
                    aria-hidden="true"
                    className="mt-[0.75em] h-px w-4 shrink-0 bg-brand"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* ==================================================================== */}
      {/* ENQUIRY                                                              */}
      {/* ==================================================================== */}
      <Section tone="white" space="lg" ariaLabel="Send an enquiry">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            {/* ---------------- form ---------------- */}
            <div className="lg:col-span-7">
              <SectionHeader
                index="01"
                eyebrow="Enquiry"
                size="md"
                title={
                  <>
                    Send us
                    {' '}<br />
                    the brief.
                  </>
                }
                lead="Three fields are required so we can reply. Everything else sharpens the first answer you get back."
              />

              <Suspense fallback={<FormFallback />}>
                <div className="mt-14">
                  <ContactForm />
                </div>
              </Suspense>
            </div>

            {/* ---------------- direct routes ---------------- */}
            <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
              <aside aria-label="Direct contact details" className="lg:sticky lg:top-32">
                <TechLabel index="02" rule className="mb-9">
                  Direct
                </TechLabel>

                <dl className="border-t border-charcoal/10">
                  <PanelRow label="Call us">
                    <ul className="flex flex-col gap-2.5">
                      <li>
                        <a
                          href={`tel:${dialable(company.phone.primary.value)}`}
                          className={panelLink}
                          data-placeholder={company.phone.primary.placeholder}
                        >
                          {company.phone.primary.value}
                        </a>
                      </li>
                      <li>
                        <a
                          href={`tel:${dialable(company.phone.secondary.value)}`}
                          className={panelLink}
                          data-placeholder={company.phone.secondary.placeholder}
                        >
                          {company.phone.secondary.value}
                        </a>
                      </li>
                    </ul>
                    <p className="mt-3.5 text-small text-muted">
                      If the enquiry is urgent, call rather than write.
                    </p>
                  </PanelRow>

                  <PanelRow label="Email us">
                    <ul className="flex flex-col gap-2.5">
                      <li>
                        <a
                          href={`mailto:${company.email.enquiries.value}`}
                          className={panelLink}
                          data-placeholder={company.email.enquiries.placeholder}
                        >
                          {company.email.enquiries.value}
                        </a>
                        <span className="tech mt-1.5 block text-muted/70">Projects</span>
                      </li>
                      <li>
                        <a
                          href={`mailto:${company.email.general.value}`}
                          className={panelLink}
                          data-placeholder={company.email.general.placeholder}
                        >
                          {company.email.general.value}
                        </a>
                        <span className="tech mt-1.5 block text-muted/70">General</span>
                      </li>
                      <li>
                        <a
                          href={`mailto:${company.email.careers.value}`}
                          className={panelLink}
                          data-placeholder={company.email.careers.placeholder}
                        >
                          {company.email.careers.value}
                        </a>
                        <span className="tech mt-1.5 block text-muted/70">Careers</span>
                      </li>
                    </ul>
                  </PanelRow>

                  <PanelRow label="Visit us">
                    <address
                      className="not-italic leading-relaxed"
                      data-placeholder={company.address.line1.placeholder}
                    >
                      {formattedAddress()}
                    </address>
                  </PanelRow>

                  <PanelRow label="Hours">
                    <span data-placeholder={company.hours.placeholder}>
                      {company.hours.value}
                    </span>
                  </PanelRow>
                </dl>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ==================================================================== */}
      {/* LOCATION                                                             */}
      {/* ==================================================================== */}
      <Section tone="offwhite" space="md" ariaLabel="Location">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionHeader
                index="03"
                eyebrow="Location"
                size="md"
                as="h2"
                title={
                  <>
                    Works and
                    {' '}<br />
                    registered office.
                  </>
                }
              />

              <Reveal delay={0.14}>
                <address
                  className="mt-9 not-italic text-body leading-relaxed text-muted"
                  data-placeholder={company.address.line1.placeholder}
                >
                  {formattedAddress()}
                </address>

                <dl className="mt-9 border-t border-charcoal/10">
                  <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-charcoal/10 py-4">
                    <dt className="tech text-muted">State</dt>
                    <dd className="text-small text-charcoal">{company.address.state.value}</dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-charcoal/10 py-4">
                    <dt className="tech text-muted">Directions</dt>
                    <dd
                      className="text-small text-charcoal"
                      data-placeholder={company.address.mapsQuery.placeholder}
                    >
                      <a
                        href={company.address.mapsQuery.value}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand underline-offset-4 hover:underline"
                      >
                        Open in Google Maps
                      </a>
                    </dd>
                  </div>
                </dl>

                {/* Two works units, both on the Rajkot-Morbi highway. */}
                <div className="mt-10 border-t border-charcoal/10 pt-8">
                  <p className="tech text-muted">Manufacturing units</p>
                  <ul className="mt-6 grid gap-7 sm:grid-cols-2">
                    {company.works.map((unit) => (
                      <li key={unit.unit} className="border-l-2 border-brand pl-5">
                        <p className="tech text-brand">{unit.unit}</p>
                        <p className="mt-2.5 text-small font-medium text-charcoal">{unit.name}</p>
                        <p className="mt-1.5 text-small leading-relaxed text-muted">{unit.address}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="measure mt-8 text-small text-muted">
                  Site visits to the fabrication shop are arranged by appointment. Call the
                  number above before travelling.
                </p>
              </Reveal>
            </div>

            {/* ---------------- map placeholder ---------------- */}
            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <figure>
                <div
                  data-placeholder="true"
                  className="relative overflow-hidden rounded-[4px] border border-charcoal/15 bg-white"
                  style={{ aspectRatio: '16/10' }}
                >
                  <div
                    aria-hidden="true"
                    className="blueprint pointer-events-none absolute inset-0 text-brand opacity-[0.16]"
                  />
                  <div
                    aria-hidden="true"
                    className="blueprint-fine pointer-events-none absolute inset-0 text-brand opacity-[0.07]"
                  />

                  {/* corner ticks — the frame reads as a drawing sheet, not a broken embed */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-4 h-5 w-5 border-l border-t border-charcoal/30"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 h-5 w-5 border-r border-t border-charcoal/30"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-charcoal/30"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-charcoal/30"
                  />

                  {/* centre crosshair where the pin will sit */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-brand/45"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-brand/45"
                  />

                  <div className="absolute inset-0 flex items-end p-6 md:p-10">
                    <p className="tech-lg max-w-[38ch] text-charcoal/75">
                      [GOOGLE MAPS EMBED — LOCATION TO BE SUPPLIED BY DSI]
                    </p>
                  </div>
                </div>

                <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 tech text-muted">
                  <span className="h-px w-8 shrink-0 bg-charcoal/25" aria-hidden="true" />
                  <span>Map embed pending — no location is claimed until DSI confirms it</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ==================================================================== */}
      {/* ELSEWHERE                                                            */}
      {/* ==================================================================== */}
      <Section tone="charcoal" space="sm" ariaLabel="Elsewhere on the site">
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.04]"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <TechLabel index="04" rule tone="light" className="mb-7">
                  Before you write
                </TechLabel>
              </Reveal>
              <h2 className="font-display wdth-wide text-display-3 uppercase text-white">
                <Reveal variant="line" delay={0.08}>
                  Two pages worth reading first.
                </Reveal>
              </h2>
            </div>

            <Reveal delay={0.16} className="lg:col-span-7 lg:col-start-6">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {[
                  {
                    href: '/projects',
                    label: 'Projects',
                    note: 'Case studies by building type — the structural problem in each one, and how the frame answered it.',
                  },
                  {
                    href: '/manufacturing',
                    label: 'Manufacturing',
                    note: 'Cutting, welding, surface preparation and dispatch, in the order the steel moves through them.',
                  },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-start justify-between gap-8 py-8"
                    >
                      <span>
                        <span className="font-display wdth-wide block text-display-4 uppercase text-white">
                          {item.label}
                        </span>
                        <span className="mt-3 block max-w-[48ch] text-small text-white/55">
                          {item.note}
                        </span>
                      </span>
                      <Arrow
                        angle={-45}
                        className="mt-2 shrink-0 text-white/55 transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: "Contact | DSI" },
      { name: 'description', content: "Start a pre-engineered building project with Darshan Steel Infrastructure. Send the building use, span, eave height, site location and programme, and our engineering team will respond with a structural approach." },
      { property: 'og:title', content: "Contact | DSI" },
      { property: 'og:description', content: "Start a pre-engineered building project with Darshan Steel Infrastructure. Send the building use, span, eave height, site location and programme, and our engineering team will respond with a structural approach." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/contact` }],
  }),
  component: ContactPage,
})
