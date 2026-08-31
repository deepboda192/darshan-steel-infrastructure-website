import { createFileRoute } from '@tanstack/react-router'
import Link from '@/components/site/NextLink'

import { company } from '@/data/company'
import { industries, type Industry } from '@/data/industries'
import { processSteps } from '@/data/capabilities'
import { siteImages, type SiteImage } from '@/data/images'

import { PageHero } from '@/components/layout/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { Section } from '@/components/site/Section'
import { Container } from '@/components/site/Container'
import { SectionHeader } from '@/components/site/SectionHeader'
import { TechLabel } from '@/components/site/TechLabel'
import { Button } from '@/components/site/Button'
import { Arrow } from '@/components/site/Arrow'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'

/* -------------------------------------------------------------------------- */
/* Metadata                                                                    */
/* -------------------------------------------------------------------------- */

const META_DESCRIPTION =
  'Pre-engineered buildings and structural steel for manufacturing, warehousing and logistics, automotive, food processing, cold chain, pharmaceutical, textile, commercial and infrastructure facilities.'

/* -------------------------------------------------------------------------- */
/* What actually moves from one sector to the next                             */
/* -------------------------------------------------------------------------- */

const SECTOR_VARIABLES = [
  {
    index: '01',
    term: 'Loads',
    detail:
      'Crane duty, racking, process equipment and stored material set the frame long before the roof does. Two buildings on the same footprint rarely carry the same steel.',
  },
  {
    index: '02',
    term: 'Envelope',
    detail:
      'Insulation, vapour control, daylight and ventilation follow the process inside. The envelope decides the detailing at every eave, gutter, louvre and penetration.',
  },
  {
    index: '03',
    term: 'Tolerance',
    detail:
      'Machine bases, rack lines and cleanroom interfaces set how tight the erected geometry has to be. Tolerance is agreed before fabrication, not discovered after it.',
  },
  {
    index: '04',
    term: 'Programme',
    detail:
      'Some sectors work to a fixed commissioning date, others to phased handover. Dispatch and erection sequence are planned around that date from the first drawing.',
  },
]

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Industries carry a plate kind rather than a full image record, so the frame
 * is assembled here. The moment DSI supplies sector photography, only the
 * `src` below needs to point at it.
 */
const industryImage = (industry: Industry): SiteImage => ({
  src: industry.photo,
  alt: `${industry.name} — pre-engineered steel structure`,
  plate: industry.plate,
  label: `${industry.index} — ${industry.name.toUpperCase()}`,
})

/* -------------------------------------------------------------------------- */
/* One row of the sector index                                                 */
/* -------------------------------------------------------------------------- */

type RowProps = {
  industry: Industry
  /** Every fourth row opens up with the full description and a plate. */
  expanded: boolean
  delay: number
}

function IndustryRow({ industry, expanded, delay }: RowProps) {
  return (
    <li id={industry.slug} className="border-b border-charcoal/12">
      <Reveal delay={delay}>
        <Link
          href={`/contact?intent=consult&sector=${industry.slug}`}
          aria-label={`Discuss a ${industry.name} project`}
          className="group relative block py-10 md:py-12 lg:py-14"
        >
          {/* the blue rule that draws itself along the row on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-[800ms] ease-[var(--ease-expo)] group-hover:scale-x-100"
          />

          <div className="grid gap-7 lg:grid-cols-12 lg:gap-10">
            {/* ---- index ---- */}
            <div className="lg:col-span-1">
              <span className="tech-lg tabular text-muted transition-colors duration-300 group-hover:text-brand">
                {industry.index}
              </span>
            </div>

            {/* ---- name, short line, description ---- */}
            <div className="lg:col-span-5">
              <h3 className="flex items-start gap-4 font-display wdth-wide text-display-4 uppercase text-charcoal">
                <span>{industry.name}</span>
                <Arrow
                  angle={-45}
                  size={18}
                  className="mt-[0.4em] text-charcoal/25 transition-all duration-[400ms] ease-[var(--ease-expo)] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-brand"
                />
              </h3>

              <p className="measure mt-4 text-body text-charcoal/75">{industry.short}</p>

              {expanded && (
                <p className="measure mt-4 text-small text-muted">{industry.description}</p>
              )}
            </div>

            {/* ---- what the structure has to solve for ---- */}
            <div className="lg:col-span-3">
              <p className="tech mb-4 text-muted/70">Design drivers</p>
              <ul className="tech grid gap-3 text-muted" style={{ lineHeight: 1.7 }}>
                {industry.drivers.map((driver) => (
                  <li key={driver} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-px w-4 shrink-0 bg-charcoal/25 transition-colors duration-300 group-hover:bg-brand"
                    />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ---- plate, on expanded rows only ---- */}
            {expanded && (
              <div className="lg:col-span-3">
                <ImageFrame
                  image={industryImage(industry)}
                  tone="light"
                  ratio="3/2"
                  reveal={false}
                  zoom
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 45vw, 100vw"
                />
              </div>
            )}
          </div>
        </Link>
      </Reveal>
    </li>
  )
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

function IndustriesPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Industries served by ${company.name}`,
    itemListElement: industries.map((industry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: industry.name,
      description: industry.short,
      url: `${company.siteUrl}/industries#${industry.slug}`,
    })),
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Industries', path: '/industries' },
          ]),
          itemList,
        ]}
      />

      <PageHero
        index="02"
        eyebrow="Industries"
        title={
          <>
            Built for the industries
            {' '}<br />
            that keep business moving.
          </>
        }
        lead={
          <>
            {industries.length} sectors, one engineering discipline. What changes between them is
            the loading, the envelope and the tolerance the frame has to hold — not the way it is
            designed, fabricated or erected.
          </>
        }
        image={siteImages.pageBanners.industries}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
        aside={
          <dl className="divide-y divide-white/10 border-y border-white/15">
            {[
              { term: 'Sectors listed', detail: String(industries.length) },
              { term: 'Scope per sector', detail: 'Design · Fabrication · Delivery · Erection' },
              {
                term: 'Based in',
                detail: `${company.address.state.value}, ${company.address.country.value}`,
              },
            ].map((item) => (
              <div key={item.term} className="py-5">
                <dt className="tech mb-2.5 text-white/55">{item.term}</dt>
                <dd className="tabular text-small text-white/85">{item.detail}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* ==================================================================== */}
      {/* SECTOR INDEX                                                          */}
      {/* ==================================================================== */}
      <Section tone="white" space="lg" id="sectors" ariaLabel="Sector index">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="Sector index"
            title={
              <>
                Where the structures
                {' '}<br />
                go to work.
              </>
            }
            lead="These are groupings of demand, not a catalogue. What a building actually needs — span, crane duty, envelope, programme — is settled project by project, against how the space will be used."
            aside={
              <Button href="/peb-solutions" variant="secondary" arrow>
                See Building Types
              </Button>
            }
          />

          <ol className="mt-16 border-t border-charcoal/12 md:mt-20">
            {industries.map((industry, i) => (
              <IndustryRow
                key={industry.slug}
                industry={industry}
                expanded={i % 4 === 1}
                delay={(i % 3) * 0.06}
              />
            ))}
          </ol>

          <Reveal delay={0.08}>
            <p className="mt-10 max-w-[52ch] text-small text-muted">
              Working in a sector that is not listed? The engineering is the same. Tell us what the
              building has to do and we will size the structure around it.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ==================================================================== */}
      {/* WHAT CHANGES                                                          */}
      {/* ==================================================================== */}
      <Section tone="charcoal" space="lg" ariaLabel="What changes between sectors">
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.045]"
        />

        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                index="02"
                eyebrow="Sector variables"
                size="md"
                tone="light"
                title={
                  <>
                    What changes
                    {' '}<br />
                    between sectors.
                  </>
                }
                lead="Four things move from one industry to the next. Each of them moves the structure with it, which is why the frame is engineered per project rather than pulled from a range."
              />
            </div>

            <dl className="lg:col-span-6 lg:col-start-7 lg:self-end">
              {SECTOR_VARIABLES.map((item, i) => (
                <Reveal
                  key={item.term}
                  delay={0.06 + i * 0.06}
                  className="grid gap-4 border-t border-white/12 py-8 last:border-b md:grid-cols-12 md:gap-8 md:py-10"
                >
                  <dt className="md:col-span-4">
                    <span className="tech tabular mb-3 block text-white/55">{item.index}</span>
                    <span className="font-display wdth-wide text-display-4 uppercase text-white">
                      {item.term}
                    </span>
                  </dt>
                  <dd className="text-small text-white/65 md:col-span-8">{item.detail}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ==================================================================== */}
      {/* WHAT DOES NOT CHANGE                                                  */}
      {/* ==================================================================== */}
      <Section tone="offwhite" space="lg" ariaLabel="The process that does not change">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                index="03"
                eyebrow="Constant"
                size="md"
                title={
                  <>
                    What does not
                    {' '}<br />
                    change.
                  </>
                }
                lead="Whatever the sector, the route from brief to handover runs through the same seven stages, held by one team from the first drawing to the alignment survey."
              />

              <Reveal delay={0.16}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                  <Button href="/manufacturing" variant="secondary" arrow>
                    Inside the Works
                  </Button>
                  <Button href="/quality-engineering" variant="ghost">
                    Engineering &amp; Quality
                  </Button>
                </div>
              </Reveal>
            </div>

            <dl className="lg:col-span-7 lg:col-start-6">
              {processSteps.map((step, i) => (
                <Reveal
                  key={step.index}
                  delay={0.04 + (i % 4) * 0.05}
                  className="grid grid-cols-12 gap-4 border-t border-charcoal/12 py-6 last:border-b md:gap-8 md:py-7"
                >
                  <dt className="col-span-12 flex items-baseline gap-4 md:col-span-5">
                    <span className="tech tabular text-brand">{step.index}</span>
                    <span className="tech-lg text-charcoal">{step.title}</span>
                  </dt>
                  <dd className="col-span-12 text-small text-muted md:col-span-7">
                    {step.description}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-16 border-t border-charcoal/12 pt-8">
              <TechLabel rule tone="brand">
                One team · Drawing to handover
              </TechLabel>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Building for a sector
            {' '}<br />
            with its own rules?
          </>
        }
        lead="Tell us what happens inside the building — the loads, the environment and the date it has to be running. We will engineer the structure around it."
      />
    </>
  )
}

export const Route = createFileRoute('/industries')({
  head: () => ({
    meta: [
      { title: "Industries We Build For | DSI" },
      { name: 'description', content: "Darshan Steel Infrastructure \u2014 pre-engineered buildings and structural steel solutions." },
      { property: 'og:title', content: "Industries We Build For | DSI" },
      { property: 'og:description', content: "Darshan Steel Infrastructure \u2014 pre-engineered buildings and structural steel solutions." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/industries` }],
  }),
  component: IndustriesPage,
})
