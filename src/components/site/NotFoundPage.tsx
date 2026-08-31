import Link from '@/components/site/NextLink'

import { Container } from '@/components/site/Container'
import { Section } from '@/components/site/Section'
import { Button } from '@/components/site/Button'
import { TechLabel } from '@/components/site/TechLabel'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Arrow } from '@/components/site/Arrow'
import { Reveal } from '@/components/animations/Reveal'
import { CTASection } from '@/components/sections/CTASection'
import { primaryNav, type NavItem } from '@/data/nav'

/** The full set of destinations offered as a recovery route. */
const DESTINATIONS: NavItem[] = [
  ...primaryNav,
  { label: 'Careers', href: '/careers', description: 'Roles in engineering, fabrication and erection' },
  { label: 'Contact', href: '/contact', description: 'Start a project or request a quotation' },
]

/** Status readout drawn beside the headline. */
const STATUS: { term: string; detail: string }[] = [
  { term: 'Status', detail: '404 — Not Found' },
  { term: 'Response', detail: 'No matching route' },
  { term: 'Action', detail: 'Return to a listed page' },
]

export function NotFoundPage() {
  return (
    <>
      {/* ================= 404 band ================= */}
      <section
        className="relative flex min-h-[78svh] flex-col justify-center overflow-hidden bg-charcoal on-dark"
        aria-label="Page not found"
      >
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.06]"
        />
        <div
          aria-hidden="true"
          className="blueprint-fine pointer-events-none absolute inset-0 text-white opacity-[0.02]"
        />

        <Container className="relative z-10 pb-20 pt-[168px] md:pb-24 md:pt-[208px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-16">
            {/* ---- headline ---- */}
            <div className="lg:col-span-7">
              <Reveal>
                <TechLabel index="404" rule tone="light" className="mb-7">
                  Not found
                </TechLabel>
              </Reveal>

              <h1 className="font-display wdth-wide text-display-2 uppercase text-white">
                <Reveal variant="line" delay={0.1}>
                  This page is not
                </Reveal>
                <Reveal variant="line" delay={0.18}>
                  <span>in the </span>
                  <span className="text-brand">drawing set.</span>
                </Reveal>
              </h1>

              <Reveal delay={0.28}>
                <p className="measure mt-8 text-lead text-white/65">
                  The address you followed does not match a page on this site. It may have been
                  moved, renamed, or typed incorrectly.
                </p>
              </Reveal>

              <Reveal delay={0.36}>
                <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button href="/" size="lg" arrow>
                    Back to Home
                  </Button>
                  <Button href="/projects" variant="secondary" tone="dark" size="lg">
                    View Projects
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* ---- status plate ---- */}
            <Reveal delay={0.34} className="lg:col-span-4 lg:col-start-9">
              <div className="relative border border-white/15 px-6 py-7 md:px-8 md:py-8">
                {/* corner ticks */}
                <span
                  aria-hidden="true"
                  className="absolute -left-px -top-px h-4 w-4 border-l border-t border-brand"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-brand"
                />

                <p className="tabular font-display wdth-wide text-display-2 leading-none text-white/85">
                  404
                </p>

                <dl className="mt-8 flex flex-col divide-y divide-white/10 border-t border-white/10">
                  {STATUS.map((row) => (
                    <div key={row.term} className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="tech text-white/55">{row.term}</dt>
                      <dd className="tech text-right text-white/80">{row.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= recovery directory ================= */}
      <Section tone="white" space="md" ariaLabel="Site directory">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="Site directory"
            title={
              <>
                Continue from
                {' '}<br />
                one of these.
              </>
            }
            size="md"
            aside={
              <Button href="/contact" variant="secondary" size="md" arrow>
                Talk to Our Team
              </Button>
            }
          />

          <nav aria-label="Main destinations" className="mt-14 md:mt-16">
            <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map((item, i) => (
                <li key={item.href}>
                  <Reveal delay={0.04 * i}>
                    <Link
                      href={item.href}
                      className="group flex items-start justify-between gap-5 border-t border-charcoal/10 py-7 transition-colors duration-300 hover:border-charcoal/40"
                    >
                      <span>
                        <span className="tabular tech mb-4 block text-muted/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="block font-display text-display-4 text-charcoal">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="mt-2 block text-small text-muted">
                            {item.description}
                          </span>
                        )}
                      </span>
                      <Arrow
                        angle={-45}
                        className="mt-1 shrink-0 text-charcoal/30 transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Looking for something
            {' '}<br />
            we have not published?
          </>
        }
        lead="Tell us what you need and we will point you to the right drawing, specification or team."
        primaryLabel="Send an Enquiry"
      />
    </>
  )
}
