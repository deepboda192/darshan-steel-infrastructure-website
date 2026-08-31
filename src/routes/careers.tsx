import { createFileRoute } from '@tanstack/react-router'

import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { safetyPractices } from '@/data/capabilities'

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
import { JsonLd, breadcrumbSchema } from '@/lib/schema'

/* -------------------------------------------------------------------------- */
/* Content                                                                     */
/* -------------------------------------------------------------------------- */

/** The four stages a member passes through, described as work rather than as a service. */
const WORK = [
  {
    index: '01',
    title: 'Detailing',
    description:
      'Connections, splices, base plates and bracing drawn member by member. Every plate, hole and weld is decided at a desk before anything is cut.',
  },
  {
    index: '02',
    title: 'Fabrication',
    description:
      'Cutting, built-up section assembly, welding, drilling and fit-up on the shop floor, with each member marked to the erection drawing it belongs to.',
  },
  {
    index: '03',
    title: 'Quality',
    description:
      'Dimensional checks, weld inspection and coating thickness recorded at fixed hold points. Nothing leaves the yard with an open non-conformance.',
  },
  {
    index: '04',
    title: 'Erection',
    description:
      'Setting out, column erection, rafter lifts, bracing and sheeting, run in a planned sequence with the frame surveyed as it goes up.',
  },
]

/** Disciplines DSI recruits against. `base` states where the work happens. */
const DISCIPLINES = [
  {
    index: '01',
    title: 'Design & Detailing',
    base: 'Office',
    description:
      'Analysis models, member sizing, connection design and shop-ready geometry. The output is drawings the floor can build from without asking questions.',
  },
  {
    index: '02',
    title: 'Fabrication',
    base: 'Shop',
    description:
      'Cutting, fit-up and assembly of built-up sections against the shop drawing, on time for the loading plan.',
  },
  {
    index: '03',
    title: 'Welding',
    base: 'Shop',
    description:
      'Manual and automatic welding to qualified procedures, with weld size, profile and continuity recorded per member.',
  },
  {
    index: '04',
    title: 'Quality',
    base: 'Shop & site',
    description:
      'Material, dimensional, weld and coating inspection at defined hold points, documented against each mark.',
  },
  {
    index: '05',
    title: 'Erection',
    base: 'Site',
    description:
      'Lifting, alignment, bolting and sheeting on live construction sites, working to the lift plan and the exclusion zone.',
  },
  {
    index: '06',
    title: 'Project Management',
    base: 'Office & site',
    description:
      'Programme, drawing release, material readiness and site coordination held together so the sequence does not break.',
  },
  {
    index: '07',
    title: 'Procurement',
    base: 'Office',
    description:
      'Plate, sections, fasteners and sheeting bought against released drawings, with mill documentation retained for traceability.',
  },
]

/** What an unsolicited application should carry. */
const APPLICATION = [
  { index: '01', text: 'The discipline you work in, from the list above.' },
  { index: '02', text: 'A CV naming the structures and building types you have worked on.' },
  { index: '03', text: 'Drawings, weld qualifications or site photographs, where you have them.' },
  { index: '04', text: 'Notice period, and whether you can work at site locations.' },
]

/** Three practices drawn from the shared safety data — the full list lives on the quality page. */
const CAREERS_SAFETY: string[] = ['PPE Compliance', 'Safe Erection Practice', 'Trained Workforce']
const careersSafety = safetyPractices.filter((p) => CAREERS_SAFETY.includes(p.title))

/* -------------------------------------------------------------------------- */

function CareersPage() {
  const careersEmail = company.email.careers
  const mailto = `mailto:${careersEmail.value}`

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ])}
      />

      <PageHero
        index="07"
        eyebrow="Careers"
        title={
          <>
            Every drawing
            {' '}<br />
            ends up as
            {' '}<br />
            a building.
          </>
        }
        lead="Detailing desk, shop floor, erection site — the same structure passes through all three. We hire people who want their work measured against a drawing and a date."
        image={siteImages.pageBanners.careers}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
        aside={
          <dl className="divide-y divide-white/10 border-y border-white/10">
            <div className="py-6">
              <dt className="tech mb-2.5 text-white/55">Apply to</dt>
              <dd>
                <a
                  href={mailto}
                  className="group flex items-center justify-between gap-6 text-white/85 transition-colors hover:text-white"
                >
                  <span className="break-all" data-placeholder={careersEmail.placeholder}>
                    {careersEmail.value}
                  </span>
                  <Arrow
                    angle={-45}
                    className="shrink-0 text-white/55 transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </dd>
            </div>
            <div className="py-6">
              <dt className="tech mb-2.5 text-white/55">Based at</dt>
              <dd className="text-white/85" data-placeholder={company.address.city.placeholder}>
                {company.address.city.value}, {company.address.state.value}
              </dd>
            </div>
          </dl>
        }
      />

      {/* ==================================================== 01 — THE WORK */}
      <Section tone="white" space="lg" ariaLabel="The work">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                index="01"
                eyebrow="The work"
                size="md"
                title={
                  <>
                    What the
                    {' '}<br />
                    work actually
                    {' '}<br />
                    is.
                  </>
                }
                lead="No two projects are identical, but the sequence is. A member is detailed, cut, welded, inspected, then lifted into place. Everyone here sits somewhere on that line."
              />
            </div>

            <dl className="lg:col-span-6 lg:col-start-7">
              {WORK.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={0.06 * i}
                  className="border-t border-charcoal/10 py-8 first:border-t-0 first:pt-0 lg:py-10"
                >
                  <dt className="flex items-baseline gap-4">
                    <span className="tech tabular shrink-0 text-brand">{item.index}</span>
                    <span className="font-display text-display-4 text-charcoal">{item.title}</span>
                  </dt>
                  <dd className="measure mt-4 text-body body-muted">{item.description}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ================================================= 02 — DISCIPLINES */}
      <Section tone="charcoal" space="lg" ariaLabel="Disciplines we hire for">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="Disciplines"
            tone="light"
            title={
              <>
                Disciplines
                {' '}<br />
                we hire for.
              </>
            }
            lead="Seven trades and functions carry a project from enquiry to handover. Applications are read against all of them."
          />

          <ol className="mt-16 border-t border-white/10 lg:mt-20">
            {DISCIPLINES.map((d, i) => (
              <Reveal
                as="li"
                key={d.title}
                delay={0.04 * i}
                className="border-b border-white/10"
              >
                <div className="grid gap-x-8 gap-y-4 py-8 md:grid-cols-12 md:items-baseline lg:py-10">
                  <span className="tech tabular text-brand md:col-span-1">{d.index}</span>
                  <h3 className="font-display text-display-4 text-white md:col-span-4">
                    {d.title}
                  </h3>
                  <p className="text-body md:col-span-5">{d.description}</p>
                  <span className="tech text-white/55 md:col-span-2 md:text-right">{d.base}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ==================================================== 03 — OPENINGS */}
      <Section tone="offwhite" space="lg" ariaLabel="Current openings">
        <Container>
          <SectionHeader
            index="03"
            eyebrow="Current openings"
            title={
              <>
                Current
                {' '}<br />
                openings.
              </>
            }
            lead="There is no live vacancy list on this site yet. Applications are still read, and they are read against the disciplines above."
          />

          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
            {/* ---- the honest placeholder panel ---- */}
            <Reveal className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[4px] border border-charcoal/15 bg-white">
                <div
                  aria-hidden="true"
                  className="blueprint-fine pointer-events-none absolute inset-0 text-charcoal opacity-[0.05]"
                />
                <div className="relative px-7 py-14 sm:px-12 sm:py-20">
                  <TechLabel rule tone="brand" className="mb-8">
                    Vacancy list
                  </TechLabel>
                  <p
                    className="font-display wdth-wide text-display-4 uppercase text-charcoal"
                    data-placeholder="true"
                  >
                    [CURRENT OPENINGS TO BE SUPPLIED BY DSI]
                  </p>
                  <p className="measure mt-7 text-body body-muted">
                    Role title, discipline, shop or site location and required experience will be
                    listed here once DSI supplies them. Nothing is listed today because nothing has
                    been confirmed.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ---- the fallback route in ---- */}
            <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
              <TechLabel rule className="mb-7">
                Apply directly
              </TechLabel>

              <p className="text-body body-muted">
                Send a CV to the careers address. Tell us which discipline you work in and where you
                have done it.
              </p>

              <a
                href={mailto}
                className="group mt-8 flex items-center justify-between gap-6 border-y border-charcoal/15 py-5 transition-colors hover:border-charcoal/35"
              >
                <span className="tech-lg break-all text-charcoal" data-placeholder={careersEmail.placeholder}>
                  {careersEmail.value}
                </span>
                <Arrow
                  angle={-45}
                  className="shrink-0 text-muted transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <p className="tech mt-10 mb-5 text-muted">What to include</p>
              <ol className="space-y-4">
                {APPLICATION.map((item) => (
                  <li key={item.index} className="flex gap-4 text-small body-muted">
                    <span className="tech tabular shrink-0 pt-1 text-charcoal/45">
                      {item.index}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ol>

              <Button href={mailto} size="md" arrow className="mt-10">
                Email Your CV
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ========================================== 04 — SAFETY & TRAINING */}
      <Section tone="white" space="lg" ariaLabel="Safety and training">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ImageFrame
                image={siteImages.safety}
                tone="light"
                ratio="4/5"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeader
                index="04"
                eyebrow="Safety & training"
                size="md"
                title={
                  <>
                    Safety is part
                    {' '}<br />
                    of the method
                    {' '}<br />
                    statement.
                  </>
                }
                lead="Site work is planned before it starts. Crews are briefed on the method statement for the job in front of them, and the lift is agreed before a member leaves the ground."
              />

              <dl className="mt-12 border-t border-charcoal/10">
                {careersSafety.map((practice, i) => (
                  <Reveal
                    key={practice.title}
                    delay={0.06 * i}
                    className="border-b border-charcoal/10 py-7"
                  >
                    <dt className="tech-lg text-charcoal">{practice.title}</dt>
                    <dd className="measure mt-3 text-body body-muted">{practice.description}</dd>
                  </Reveal>
                ))}
              </dl>

              <Reveal delay={0.1}>
                <p className="tech-lg mt-10 text-muted" data-placeholder="true">
                  [TRAINING &amp; INDUCTION PROGRAMME — TO BE SUPPLIED BY DSI]
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Send us
            {' '}<br />
            your CV.
          </>
        }
        lead="Tell us which part of the work you do — detailing, fabrication, welding, quality, erection or delivery — and where you have done it."
        primaryLabel="Email Your CV"
        primaryHref={mailto}
      />
    </>
  )
}

export const Route = createFileRoute('/careers')({
  head: () => ({
    meta: [
      { title: "Careers | DSI" },
      { name: 'description', content: "Detailing, fabrication, welding, quality, erection, project management and procurement roles at Darshan Steel Infrastructure \u2014 pre-engineered buildings and structural steel, Gujarat." },
      { property: 'og:title', content: "Careers | DSI" },
      { property: 'og:description', content: "Detailing, fabrication, welding, quality, erection, project management and procurement roles at Darshan Steel Infrastructure \u2014 pre-engineered buildings and structural steel, Gujarat." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://darshansteel.in/careers' }],
  }),
  component: CareersPage,
})
