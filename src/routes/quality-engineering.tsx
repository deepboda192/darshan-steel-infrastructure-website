import { createFileRoute } from '@tanstack/react-router'

import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { engineeringCapabilities, qualityChecks, safetyPractices } from '@/data/capabilities'

import { PageHero } from '@/components/layout/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Section } from '@/components/site/Section'
import { Container } from '@/components/site/Container'
import { SectionHeader } from '@/components/site/SectionHeader'
import { TechLabel } from '@/components/site/TechLabel'
import { Button } from '@/components/site/Button'
import { Reveal } from '@/components/animations/Reveal'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'

/* -------------------------------------------------------------------------- */
/* Metadata                                                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Page-local content                                                          */
/* -------------------------------------------------------------------------- */

/** In-page index, matching the section ids below. */
const PAGE_INDEX = [
  { index: '01', label: 'Engineering', href: '#engineering' },
  { index: '02', label: 'Design Codes', href: '#design-codes' },
  { index: '03', label: 'Quality Control', href: '#quality' },
  { index: '04', label: 'Certification', href: '#certification' },
  { index: '05', label: 'Safety', href: '#safety' },
]

/**
 * Records issued with a project. These mirror the stage outputs already
 * defined in data/capabilities.ts (procurement, fabrication and inspection) —
 * no additional claim is made here.
 */
const PROJECT_RECORDS = [
  'Mill test certificates',
  'Weld records',
  'Fit-up checks',
  'Inspection records',
  'DFT readings',
  'Release note',
]

/** Two-digit section counts, read from the data rather than written by hand. */
const pad = (n: number) => String(n).padStart(2, '0')

const HERO_SPEC: { term: string; detail: string; numeric: boolean }[] = [
  { term: 'Engineering disciplines', detail: pad(engineeringCapabilities.length), numeric: true },
  { term: 'Inspection hold points', detail: pad(qualityChecks.length), numeric: true },
  { term: 'Design codes', detail: 'Confirmed per project', numeric: false },
]

/**
 * Splits a data string on [BRACKETED PLACEHOLDERS] so the unconfirmed part is
 * flagged for `?audit=1` without breaking the sentence around it.
 */
function withPlaceholders(text: string) {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith('[') ? (
      <span key={i} data-placeholder="true">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

/* -------------------------------------------------------------------------- */

function QualityEngineeringPage() {
  const verifiedCertifications = company.certifications.filter((c) => c.verified)

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Quality & Engineering', path: '/quality-engineering' },
        ])}
      />

      <PageHero
        index="05"
        eyebrow="Quality & Engineering"
        title={
          <>
            Drawn, checked,
            {' '}<br />
            then built.
          </>
        }
        lead="Engineering, detailing and inspection are one continuous chain. The drawing that leaves the office is the drawing the shop builds to, and every member is verified against it before it is released."
        image={siteImages.pageBanners.quality}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Quality & Engineering' }]}
        aside={
          <dl className="border-y border-white/10">
            {HERO_SPEC.map((item) => (
              <div
                key={item.term}
                className="flex items-baseline justify-between gap-6 border-t border-white/10 py-5 first:border-t-0"
              >
                <dt className="tech text-white/55">{item.term}</dt>
                <dd
                  className={
                    item.numeric
                      ? 'font-display tabular text-display-4 text-white'
                      : 'tech-lg text-right text-white/80'
                  }
                >
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* ================================================================== */}
      {/* IN-PAGE INDEX                                                       */}
      {/* ================================================================== */}
      <Section tone="offwhite" space="none" ariaLabel="Page contents">
        <Container>
          <nav aria-label="On this page" className="py-5 md:py-6">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {PAGE_INDEX.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 tech text-muted transition-colors hover:text-brand"
                  >
                    <span className="tabular text-charcoal">{item.index}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="ml-auto hidden lg:block">
                <span className="tech text-muted">Darshan Steel Infrastructure</span>
              </li>
            </ul>
          </nav>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 01 — ENGINEERING                                                    */}
      {/* ================================================================== */}
      <Section tone="ink" space="lg" id="engineering" ariaLabel="Engineering">
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-white/10"
        />

        <Container className="relative">
          <SectionHeader
            index="01"
            eyebrow="Engineering"
            tone="light"
            title={
              <>
                Engineering every
                {' '}<br />
                connection.
              </>
            }
            lead="Nothing is cut before it is drawn. Loads are resolved into members, members into connections, and connections into plates, holes and welds that carry a mark number all the way to site."
            aside={
              <Button href="/manufacturing" variant="secondary" tone="dark" arrow>
                Inside the shop
              </Button>
            }
          />

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            {/* ---------------- drawing office ---------------- */}
            <div className="lg:col-span-5">
              <ImageFrame
                image={siteImages.engineering}
                tone="dark"
                ratio="4/5"
                grain
                revealDelay={0.08}
                sizes="(min-width: 1024px) 38vw, 100vw"
              />

              <Reveal delay={0.16} className="mt-8">
                <dl className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                  <div className="bg-ink p-5">
                    <dt className="tech text-white/55">Issued to shop</dt>
                    <dd className="mt-3 text-small text-white/75">
                      Shop drawings · Bolt and plate schedules
                    </dd>
                  </div>
                  <div className="bg-ink p-5">
                    <dt className="tech text-white/55">Issued to site</dt>
                    <dd className="mt-3 text-small text-white/75">
                      Erection drawings · Mark numbers
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            {/* ---------------- disciplines ---------------- */}
            <ol className="lg:col-span-6 lg:col-start-7">
              {engineeringCapabilities.map((capability, i) => (
                <li key={capability.index} className="border-t border-white/10 first:border-t-0">
                  <Reveal
                    delay={0.05 * i}
                    y={18}
                    className="grid grid-cols-[2.25rem_1fr] gap-x-5 py-7 md:py-8"
                  >
                    <span className="tech tabular pt-2 text-brand">{capability.index}</span>
                    <div>
                      <h3 className="font-display text-display-4 text-white">{capability.title}</h3>
                      <p className="measure mt-3 text-small text-white/60">
                        {capability.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 02 — DESIGN CODES                                                   */}
      {/* ================================================================== */}
      <Section tone="white" space="md" id="design-codes" ariaLabel="Design codes">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                index="02"
                eyebrow="Design codes"
                size="md"
                title={
                  <>
                    Designed to
                    {' '}<br />
                    code.
                  </>
                }
                lead="The applicable code set is fixed per project and agreed with the client's consultant before analysis begins. The references below are indicative and still to be confirmed by DSI."
              />

              <Reveal delay={0.2} className="mt-10 border-t border-charcoal/15 pt-6">
                <p className="tech text-muted">Project inputs</p>
                <p className="measure mt-3 text-small text-muted">
                  Loading, exposure category, crane duty and seismic zone are inputs to the design.
                  The governing code set follows from them, not the other way round.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <caption className="sr-only">
                      Design codes referenced on DSI projects. Every entry is awaiting
                      confirmation.
                    </caption>
                    <thead>
                      <tr className="border-y border-charcoal/15">
                        <th
                          scope="col"
                          className="tech hidden w-14 py-4 pr-4 font-medium text-muted sm:table-cell"
                        >
                          Ref
                        </th>
                        <th scope="col" className="tech py-4 pr-6 font-medium text-muted">
                          Code
                        </th>
                        <th scope="col" className="tech py-4 pr-6 font-medium text-muted">
                          Scope
                        </th>
                        <th
                          scope="col"
                          className="tech hidden py-4 text-right font-medium text-muted md:table-cell"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {company.designCodes.map((entry, i) => (
                        <tr key={entry.code} className="border-b border-charcoal/10 align-baseline">
                          <td className="tech tabular hidden py-6 pr-4 text-muted sm:table-cell">
                            {pad(i + 1)}
                          </td>
                          <td className="py-6 pr-6">
                            <span
                              className="font-display text-display-4 text-charcoal"
                              data-placeholder="true"
                            >
                              {entry.code}
                            </span>
                          </td>
                          <td className="py-6 pr-6 text-small text-muted">{entry.scope}</td>
                          <td className="hidden py-6 text-right md:table-cell">
                            <span className="tech text-brand" data-placeholder="true">
                              To confirm
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="tech mt-8 text-muted" data-placeholder="true">
                  [DESIGN CODE SCHEDULE — TO BE CONFIRMED BY DSI]
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 03 — QUALITY CONTROL                                                */}
      {/* ================================================================== */}
      <Section tone="charcoal" space="lg" id="quality" ariaLabel="Quality control">
        <div
          aria-hidden="true"
          className="dotgrid pointer-events-none absolute inset-0 text-white opacity-[0.05]"
        />

        <Container className="relative">
          <SectionHeader
            index="03"
            eyebrow="Quality control"
            tone="light"
            title={
              <>
                Precision is
                {' '}<br />
                not optional.
              </>
            }
            lead="Inspection is scheduled, not improvised. Six hold points sit inside the fabrication route, and a member does not move to the next operation until the one before it is signed off."
          />

          <Reveal delay={0.14} className="mt-14 md:mt-20">
            <blockquote className="border-l-2 border-brand pl-6 md:pl-10">
              <p className="font-display wdth-wide text-display-3">
                <span className="text-white">Quality is built into the process</span>{' '}
                <span className="text-brand">— not inspected into the product.</span>
              </p>
            </blockquote>
          </Reveal>

          <ol className="mt-16 border-t border-white/10 md:mt-20">
            {qualityChecks.map((check, i) => (
              <li key={check.index} className="border-b border-white/10">
                <Reveal
                  delay={0.04 * i}
                  y={16}
                  className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
                >
                  <div className="flex items-center gap-4 md:col-span-3">
                    <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-brand" />
                    <span className="tech tabular text-white/55">Hold point {check.index}</span>
                  </div>
                  <h3 className="font-display text-display-4 text-white md:col-span-4">
                    {check.title}
                  </h3>
                  <p className="text-small text-white/60 md:col-span-5">{check.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <p className="tech mt-10 text-white/55">
              Non-conformances are closed before dispatch.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 04 — CERTIFICATION                                                  */}
      {/* ================================================================== */}
      <Section tone="offwhite" space="md" id="certification" ariaLabel="Certification">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                index="04"
                eyebrow="Certification"
                size="md"
                title={
                  <>
                    Nothing claimed
                    {' '}<br />
                    before it is certified.
                  </>
                }
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {verifiedCertifications.length > 0 ? (
                <Reveal>
                  <dl className="border-t border-charcoal/15">
                    {verifiedCertifications.map((certification) => (
                      <div
                        key={certification.label}
                        className="flex flex-wrap items-baseline justify-between gap-4 border-b border-charcoal/10 py-6"
                      >
                        <dt className="font-display text-display-4 text-charcoal">
                          {certification.label}
                        </dt>
                        <dd className="tech text-muted">{certification.issuer}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ) : (
                <Reveal>
                  <p className="measure text-lead text-muted">
                    DSI does not list a certification until the certificate is issued, current and
                    verifiable. Standard, scope and issuing body will be published on this page once
                    confirmed.
                  </p>

                  <div className="mt-9 border border-charcoal/15 bg-white p-6 md:p-8">
                    <TechLabel rule tone="brand">
                      Status
                    </TechLabel>
                    <p
                      className="font-display mt-5 text-display-4 text-charcoal"
                      data-placeholder="true"
                    >
                      [CERTIFICATION DETAILS — TO BE SUPPLIED BY DSI]
                    </p>
                    <p className="mt-5 text-small text-muted">
                      Until then, what follows is what every project is documented with — issued
                      with the structure, not on request.
                    </p>
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.12}>
                <ul className="mt-8 grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2">
                  {PROJECT_RECORDS.map((record) => (
                    <li
                      key={record}
                      className="tech flex items-center gap-3 bg-offwhite px-5 py-5 text-charcoal"
                    >
                      <span aria-hidden="true" className="h-px w-4 shrink-0 bg-brand" />
                      {record}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 05 — SAFETY                                                         */}
      {/* ================================================================== */}
      <Section tone="white" space="md" id="safety" ariaLabel="Safety">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                index="05"
                eyebrow="Safety"
                size="md"
                title={
                  <>
                    Built safely.
                    {' '}<br />
                    Delivered responsibly.
                  </>
                }
                lead="Most of the risk in a steel building is removed by doing the work in a shop instead of at height. What is left is planned before anyone leaves the ground."
              />

              <div className="mt-10">
                <ImageFrame
                  image={siteImages.safety}
                  tone="light"
                  ratio="3/2"
                  revealDelay={0.12}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="grid gap-x-12 sm:grid-cols-2">
                {safetyPractices.map((practice, i) => (
                  <li key={practice.title} className="border-t border-charcoal/15">
                    <Reveal delay={0.05 * i} y={16} className="py-7">
                      <h3 className="tech-lg text-charcoal">{practice.title}</h3>
                      <p className="mt-3 text-small text-muted">
                        {withPlaceholders(practice.description)}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Have a specification
            {' '}<br />
            to work against?
          </>
        }
        lead="Send us the loading, the spans and the site. We will come back with a structural approach, a drawing schedule and the checks it will be built against."
        primaryLabel="Talk to Engineering"
      />
    </>
  )
}

export const Route = createFileRoute('/quality-engineering')({
  head: () => ({
    meta: [
      { title: "Quality & Engineering | DSI" },
      { name: 'description', content: "Structural engineering, detailing and quality control at Darshan Steel Infrastructure \u2014 analysis, connection design, shop and erection drawings, documented inspection hold points and safe erection practice." },
      { property: 'og:title', content: "Quality & Engineering | DSI" },
      { property: 'og:description', content: "Structural engineering, detailing and quality control at Darshan Steel Infrastructure \u2014 analysis, connection design, shop and erection drawings, documented inspection hold points and safe erection practice." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://darshansteel.in/quality-engineering' }],
  }),
  component: QualityEngineeringPage,
})
