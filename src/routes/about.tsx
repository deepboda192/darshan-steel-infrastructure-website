import { createFileRoute } from '@tanstack/react-router'
import Link from '@/components/site/NextLink'

import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { workflowStages } from '@/data/capabilities'

import { PageHero } from '@/components/layout/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { Section } from '@/components/site/Section'
import { Container } from '@/components/site/Container'
import { SectionHeader } from '@/components/site/SectionHeader'
import { TechLabel } from '@/components/site/TechLabel'
import { Button } from '@/components/site/Button'
import { Arrow } from '@/components/site/Arrow'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { Counter } from '@/components/animations/Counter'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'

/* -------------------------------------------------------------------------- */
/* The integrated model — the eight workflow stages grouped into four bands.   */
/* The full stage-by-stage breakdown lives on /manufacturing.                  */
/* -------------------------------------------------------------------------- */

type Band = { index: string; title: string; stages: string[]; body: string }

const MODEL: Band[] = [
  {
    index: '01',
    title: 'Engineering',
    stages: ['01', '02', '03'],
    body: 'Geometry, loading and site conditions are fixed with the client and the consultant. The frame is modelled and checked against the governing design codes, then detailed member by member — every plate, bolt and weld drawn before anything reaches the shop floor.',
  },
  {
    index: '02',
    title: 'Manufacturing',
    stages: ['04', '05'],
    body: 'Plate, sections and fasteners are procured against released drawings, with mill documentation retained. Cutting, built-up section assembly, welding, drilling and fitting are carried out in the shop under controlled conditions.',
  },
  {
    index: '03',
    title: 'Inspection & Dispatch',
    stages: ['06', '07'],
    body: 'Dimensional checks, weld inspection, surface preparation and coating thickness are recorded at defined hold points. Members are then bundled and loaded so that what is needed first comes off the truck first.',
  },
  {
    index: '04',
    title: 'Execution',
    stages: ['08'],
    body: 'Setting out, column erection, rafter lifting, bracing, purlins and sheeting follow a planned sequence. The structure is surveyed, bolted to specification and handed over with its documentation.',
  },
]

const stageTitle = (index: string) => workflowStages.find((s) => s.index === index)?.title ?? ''

/* -------------------------------------------------------------------------- */
/* How we work — operating principles, written as technical statements.        */
/* -------------------------------------------------------------------------- */

const PRINCIPLES = [
  {
    index: '01',
    title: 'Engineer before quoting.',
    body: 'A price that is not backed by a load case is a guess. Span, height, loading and site access are established first, the structure is sized second, and the number follows from both.',
  },
  {
    index: '02',
    title: 'One model, one truth.',
    body: 'Analysis, shop drawings, erection drawings and material schedules come from the same coordinated model. What arrives on site is what was designed, marked the way the drawing says.',
  },
  {
    index: '03',
    title: 'Inspect at hold points, not at the gate.',
    body: 'Dimensional accuracy, weld quality, blast profile and film thickness are recorded while the member is being built. Nothing is signed off retrospectively.',
  },
  {
    index: '04',
    title: 'Load the truck in erection order.',
    body: 'Dispatch is planned around the lift sequence rather than around truck convenience. Packing lists match the erection drawings mark for mark.',
  },
  {
    index: '05',
    title: 'The people who drew it answer for it.',
    body: 'Detailing queries from site go back to the team that produced the drawing. Alignment is surveyed, snags are closed, and the as-built set goes with the handover.',
  },
  {
    index: '06',
    title: 'Publish only what is measured.',
    body: 'Capacities, tonnages and project figures are stated once they are verified. Where a number has not been confirmed, it is marked as pending instead of rounded up.',
  },
]

/* -------------------------------------------------------------------------- */

function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <PageHero
        index="06"
        eyebrow="About DSI"
        title={
          <>
            Built on steel.
            {' '}<br />
            Driven by engineering.
          </>
        }
        lead="Darshan Steel Infrastructure engineers, manufactures and erects pre-engineered steel buildings for industrial and commercial use — one drawing set, one line of responsibility, concept to handover."
        image={siteImages.pageBanners.about}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        aside={
          <dl className="divide-y divide-white/12 border-y border-white/12">
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="tech text-white/55">Discipline</dt>
              <dd className="text-small text-white/85">PEB &amp; Structural Steel</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="tech text-white/55">Scope</dt>
              <dd className="text-small text-white/85">Design · Fabrication · Erection</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="tech text-white/55">Base</dt>
              <dd
                className="text-small text-white/85"
                data-placeholder={company.address.city.placeholder}
              >
                {company.address.city.value}, {company.address.state.value}
              </dd>
            </div>
          </dl>
        }
      />

      {/* ================================================================== */}
      {/* 02 — POSITIONING                                                    */}
      {/* ================================================================== */}
      <Section tone="white" space="lg" ariaLabel="Who we are">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader
                index="01"
                eyebrow="Who we are"
                size="md"
                title={
                  <>
                    One team,
                    {' '}<br />
                    one structure.
                  </>
                }
              />
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
              <Reveal delay={0.1}>
                <p className="measure text-lead text-charcoal/85">{company.about}</p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="measure mt-7 text-body body-muted">
                  Every building starts as a set of constraints — span, eave height, loading, site
                  access, programme. Engineering decides what the structure has to be. The shop
                  decides how accurately it gets built. The site decides whether the drawings hold
                  up. We are answerable for all three.
                </p>
              </Reveal>
            </div>
          </div>

          {/* discipline strip */}
          <Reveal delay={0.22}>
            <ul className="mt-16 flex flex-col border-t border-charcoal/12 sm:flex-row md:mt-24">
              {[
                { label: 'Engineering', note: 'Analysis, connection design, detailing' },
                { label: 'Manufacturing', note: 'Built-up sections, welding, coating' },
                { label: 'Execution', note: 'Dispatch, erection, alignment, handover' },
              ].map((item, i) => (
                <li
                  key={item.label}
                  className={
                    'flex-1 border-b border-charcoal/12 py-7 sm:border-b-0 sm:py-8 ' +
                    (i > 0 ? 'sm:border-l sm:border-charcoal/12 sm:pl-8' : 'sm:pr-8')
                  }
                >
                  <p className="font-display wdth-wide text-display-4 text-charcoal">
                    {item.label}
                  </p>
                  <p className="tech mt-3 text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Vision and mission, as published in the company catalogue. */}
          <div className="mt-16 grid gap-12 border-t border-charcoal/12 pt-14 md:mt-24 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <TechLabel rule className="mb-7">
                Vision
              </TechLabel>
              <p className="measure text-lead text-charcoal/85">{company.vision}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <TechLabel rule className="mb-7">
                Mission
              </TechLabel>
              <p className="measure text-lead text-charcoal/85">{company.mission}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 03 — WHAT WE DO                                                     */}
      {/* ================================================================== */}
      <Section tone="charcoal" space="lg" className="overflow-hidden" ariaLabel="What we do">
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.05]"
        />

        <Container className="relative">
          <SectionHeader
            index="02"
            eyebrow="What we do"
            tone="light"
            title={
              <>
                Designed, built,
                {' '}<br />
                erected in-house.
              </>
            }
            lead="A steel building usually passes through several companies between concept and completion. Ours does not. The team that sizes the frame is the team that fabricates it, inspects it and erects it, so nothing is lost at a handover point."
            aside={
              <Button href="/manufacturing" variant="secondary" tone="dark" arrow>
                The full process
              </Button>
            }
          />

          <ol className="mt-16 md:mt-20">
            {MODEL.map((band, i) => (
              <Reveal
                as="li"
                key={band.index}
                delay={0.06 * i}
                className="grid gap-6 border-t border-white/12 py-9 lg:grid-cols-12 lg:gap-10 lg:py-12"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-5">
                    <span className="tabular font-display wdth-wide text-display-4 text-brand">
                      {band.index}
                    </span>
                    <h3 className="font-display wdth-wide text-display-4 uppercase text-white">
                      {band.title}
                    </h3>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-body text-white/65">{band.body}</p>
                </div>

                <div className="lg:col-span-2 lg:col-start-11">
                  <p className="tech mb-4 text-white/55">Stages</p>
                  <ul className="flex flex-col gap-2.5">
                    {band.stages.map((s) => (
                      <li key={s} className="flex items-baseline gap-3 tech text-white/70">
                        <span className="tabular text-brand">{s}</span>
                        <span>{stageTitle(s)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 04 — METRICS                                                        */}
      {/* ================================================================== */}
      <Section tone="offwhite" space="md" ariaLabel="Company figures">
        <Container>
          <SectionHeader
            index="03"
            eyebrow="By the numbers"
            size="md"
            title={<>Scale of work.</>}
          />

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {company.metrics.map((metric, i) => {
              const unset = metric.value === 0
              return (
                <Reveal
                  as="li"
                  key={metric.key}
                  delay={0.05 * i}
                  className="border-t border-charcoal/15 pt-7"
                >
                  <div data-placeholder={metric.placeholder}>
                    {unset ? (
                      <p className="tech-lg pb-2 text-muted">{metric.note}</p>
                    ) : (
                      <p className="font-display wdth-wide text-display-3 text-charcoal">
                        <Counter value={metric.value} suffix={metric.suffix} />
                      </p>
                    )}
                    <p className="mt-4 text-body text-charcoal">{metric.label}</p>
                    {!unset && <p className="tech mt-3 text-muted">{metric.note}</p>}
                  </div>
                </Reveal>
              )
            })}
          </ul>

          <Reveal delay={0.28}>
            <div className="mt-14 border-t border-brand/40 pt-7">
              <p className="tech text-brand">Note</p>
              <p className="measure mt-4 text-small body-muted">
                Every figure above is awaiting confirmation by DSI and is published here as a
                placeholder. Each will be replaced with a verified value before launch — no
                capacity, tonnage or project count is claimed until it can be evidenced.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 05 — SHOP AND SITE                                                  */}
      {/* ================================================================== */}
      <Section tone="white" space="lg" ariaLabel="The works and the site">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <ImageFrame
                image={siteImages.aboutPrimary}
                tone="light"
                ratio="4/5"
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="rounded-[4px]"
              />
              <Reveal delay={0.1}>
                <p className="tech mt-5 text-muted">Fig. 01 — Fabrication facility</p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
              <Reveal>
                <TechLabel index="04" rule className="mb-7">
                  Shop and site
                </TechLabel>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="font-display wdth-wide text-display-3 text-charcoal">
                  The shop decides
                  {' '}<br />
                  what the site can do.
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="measure mt-7 text-body body-muted">
                  Work done under a roof is work that can be measured. Cutting, built-up assembly,
                  welding, blast cleaning and coating happen in controlled conditions, and every
                  member is checked against its drawing before it is cleared for dispatch.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="measure mt-5 text-body body-muted">
                  By the time steel reaches site, the engineering questions are closed. Erection
                  becomes assembly — setting out, lifting in sequence, bolting to specification and
                  surveying the result.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <dl className="mt-10 divide-y divide-charcoal/12 border-y border-charcoal/12">
                  {[
                    { label: 'Established', field: company.established },
                    { label: 'Facility area', field: company.facilityArea },
                    { label: 'Workforce', field: company.employees },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                    >
                      <dt className="tech text-muted">{row.label}</dt>
                      <dd
                        className="text-small text-charcoal"
                        data-placeholder={row.field.placeholder}
                      >
                        {row.field.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <div className="mt-10">
                <ImageFrame
                  image={siteImages.aboutSecondary}
                  tone="light"
                  ratio="3/2"
                  revealDelay={0.1}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="rounded-[4px]"
                />
                <Reveal delay={0.16}>
                  <p className="tech mt-5 text-muted">Fig. 02 — Erection in progress</p>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 06 — HOW WE WORK                                                    */}
      {/* ================================================================== */}
      <Section tone="ink" space="lg" className="overflow-hidden" ariaLabel="How we work">
        <div
          aria-hidden="true"
          className="dotgrid pointer-events-none absolute inset-0 text-white opacity-[0.07]"
        />

        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                index="05"
                eyebrow="How we work"
                tone="light"
                size="md"
                title={
                  <>
                    Six rules
                    {' '}<br />
                    we hold to.
                  </>
                }
                lead="Operating discipline, not values. Each of these is a decision that has already been made, so it does not have to be argued on every project."
              />
            </div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {PRINCIPLES.map((principle, i) => (
                <Reveal
                  as="li"
                  key={principle.index}
                  delay={0.05 * i}
                  className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-white/12 py-8 sm:gap-x-10"
                >
                  <span className="tabular tech pt-2 text-brand">{principle.index}</span>
                  <div>
                    <h3 className="font-display text-display-4 text-white">{principle.title}</h3>
                    <p className="mt-4 text-body text-white/60">{principle.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 07 — LEADERSHIP                                                     */}
      {/* ================================================================== */}
      <Section tone="white" space="lg" ariaLabel="Leadership and team">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                index="06"
                eyebrow="Leadership"
                size="md"
                title={
                  <>
                    The people
                    {' '}<br />
                    behind it.
                  </>
                }
                lead="Engineering, fabrication and erection are staffed as one organisation, which is what keeps responsibility for the structure in a single place."
              />
            </div>

            <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
              <div className="relative overflow-hidden rounded-[4px] border border-charcoal/15 bg-offwhite p-8 md:p-12">
                <div
                  aria-hidden="true"
                  className="blueprint-fine pointer-events-none absolute inset-0 text-charcoal opacity-[0.05]"
                />

                <div className="relative">
                  <TechLabel rule tone="brand">
                    Pending
                  </TechLabel>

                  <p
                    className="font-display wdth-wide mt-7 text-display-4 text-charcoal"
                    data-placeholder="true"
                  >
                    [LEADERSHIP PROFILES TO BE SUPPLIED BY DSI]
                  </p>

                  <p className="measure mt-6 text-body body-muted">
                    Names, roles, qualifications and photographs will be published here once DSI
                    supplies them. This block is deliberately left open rather than filled with
                    copy that cannot be checked.
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Button href="/contact" variant="secondary" arrow>
                      Talk to our team
                    </Button>
                    <Link
                      href="/careers"
                      className="group inline-flex items-center gap-3 tech-lg text-charcoal/75 transition-colors hover:text-brand"
                    >
                      <span className="rule-grow">Careers at DSI</span>
                      <Arrow
                        angle={-45}
                        className="transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Tell us what
            {' '}<br />
            you need to build.
          </>
        }
        lead="Send us the span, the height, the loading and the site. We will come back with a structural approach and a programme."
        primaryLabel="Start Your Project"
        primaryHref="/contact"
      />
    </>
  )
}

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: "About Us | DSI" },
      { name: 'description', content: "Darshan Steel Infrastructure designs, manufactures and erects pre-engineered steel buildings. Structural engineering, fabrication, inspection and site erection handled by one team in Gujarat, India." },
      { property: 'og:title', content: "About Us | DSI" },
      { property: 'og:description', content: "Darshan Steel Infrastructure designs, manufactures and erects pre-engineered steel buildings. Structural engineering, fabrication, inspection and site erection handled by one team in Gujarat, India." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/about` }],
  }),
  component: AboutPage,
})
