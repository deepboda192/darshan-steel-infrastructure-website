import { createFileRoute } from '@tanstack/react-router'

import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { shopCapabilities, workflowStages } from '@/data/capabilities'

import { PageHero } from '@/components/layout/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { Section } from '@/components/site/Section'
import { Container } from '@/components/site/Container'
import { SectionHeader } from '@/components/site/SectionHeader'
import { TechLabel } from '@/components/site/TechLabel'
import { Button } from '@/components/site/Button'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'

/* -------------------------------------------------------------------------- */
/* Shop principles — how the work is organised, not what it produces.          */
/* -------------------------------------------------------------------------- */

const SHOP_PRINCIPLES = [
  {
    title: 'Model-driven geometry',
    note: 'Cut profiles and hole positions come from the detailing model, not from a tape on the floor.',
  },
  {
    title: 'Fixed hold points',
    note: 'Dimensional, weld and coating checks are recorded against each mark before it moves on.',
  },
  {
    title: 'Marked for erection',
    note: 'Members are bundled and loaded in the order the site actually needs them.',
  },
]

/**
 * Plant and equipment slots. The process categories are real — they mirror the
 * shop capabilities. Every machine make, capacity and quantity is a bracketed
 * placeholder until DSI supplies the verified equipment schedule.
 */
const EQUIPMENT_SLOTS = [
  { process: 'Cutting', spec: '[CUTTING MACHINE — MAKE / CAPACITY / QTY]' },
  { process: 'Welding', spec: '[WELDING PLANT — PROCESS / MAKE / QTY]' },
  { process: 'Drilling', spec: '[DRILL LINE — MAKE / CAPACITY / QTY]' },
  { process: 'Surface preparation', spec: '[BLAST UNIT — TYPE / THROUGHPUT]' },
  { process: 'Material handling', spec: '[CRANE CAPACITY — MT / SPAN]' },
]

function ManufacturingPage() {
  const capacityMetric = company.metrics.find((m) => m.key === 'capacity')

  const facilityFacts: { label: string; value: string; placeholder: boolean }[] = [
    {
      label: 'Facility area',
      value: company.facilityArea.value,
      placeholder: company.facilityArea.placeholder,
    },
    {
      label: 'Fabrication capacity',
      value: capacityMetric && capacityMetric.value > 0
        ? `${capacityMetric.value.toLocaleString('en-IN')}${capacityMetric.suffix} ${capacityMetric.unit}`.trim()
        : '[FABRICATION CAPACITY — MT / MONTH]',
      placeholder: capacityMetric?.placeholder ?? true,
    },
    {
      label: 'Year established',
      value: company.established.value,
      placeholder: company.established.placeholder,
    },
    {
      label: 'Workforce',
      value: company.employees.value,
      placeholder: company.employees.placeholder,
    },
    {
      label: 'Works location',
      value: `${company.address.city.value}, ${company.address.state.value}`,
      placeholder: company.address.city.placeholder,
    },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Manufacturing', path: '/manufacturing' },
        ])}
      />

      <PageHero
        index="03"
        eyebrow="Manufacturing"
        title={
          <>
            Where steel
            {' '}<br />
            becomes structure.
          </>
        }
        lead="Plate arrives, structure leaves. Cutting, welding, finishing and dispatch run as one controlled sequence, driven by the same model that produced the drawings."
        image={siteImages.pageBanners.manufacturing}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Manufacturing' }]}
        aside={
          <dl className="divide-y divide-white/10 border-y border-white/10">
            <div className="flex items-baseline justify-between gap-6 py-5">
              <dt className="tech text-white/55">Shop capabilities</dt>
              <dd className="font-display wdth-wide tabular text-display-4 text-white">
                {String(shopCapabilities.length).padStart(2, '0')}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 py-5">
              <dt className="tech text-white/55">Workflow stages</dt>
              <dd className="font-display wdth-wide tabular text-display-4 text-white">
                {String(workflowStages.length).padStart(2, '0')}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 py-5">
              <dt className="tech text-white/55">Scope</dt>
              <dd className="tech-lg text-white">Design to erection</dd>
            </div>
          </dl>
        }
      />

      {/* ================================================================== */}
      {/* 01 — FULL-BLEED FABRICATION BAND                                    */}
      {/* ================================================================== */}
      <Section tone="ink" space="none" ariaLabel="Inside the fabrication shop">
        <div className="grid lg:grid-cols-12 lg:items-stretch">
          {/* image — bleeds to the left edge of the viewport */}
          <figure className="relative col-span-full min-h-[62vh] sm:min-h-[68vh] lg:col-span-7 lg:min-h-[88vh]">
            <ImageFrame
              image={siteImages.manufacturing}
              tone="dark"
              ratio="fill"
              scrim={34}
              scrimStyle="bottom"
              grain
              revealDelay={0.05}
              sizes="(min-width: 1024px) 58vw, 100vw"
              showLabel={false}
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-gutter pb-7 lg:pb-9">
              <span className="mb-4 block h-px w-16 bg-white/35" aria-hidden="true" />
              <span className="tech text-white/70">{siteImages.manufacturing.label}</span>
            </figcaption>
          </figure>

          {/* content */}
          <div className="col-span-full flex flex-col justify-center px-gutter py-20 lg:col-span-5 lg:py-28">
            <div className="lg:max-w-[34rem]">
              <Reveal>
                <TechLabel index="01" rule tone="light" className="mb-8">
                  In the shop
                </TechLabel>
              </Reveal>

              <h2 className="font-display wdth-wide text-display-3 text-white">
                <Reveal variant="line" delay={0.06}>
                  Precision begins long before the steel reaches the site.
                </Reveal>
              </h2>

              <Reveal delay={0.14}>
                <p className="mt-8 text-lead text-white/65">
                  Every member is cut, drilled, welded and marked against a released drawing.
                  What leaves the shop is not raw steel — it is a numbered set of parts
                  detailed for one frame, in one erection sequence.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-6 text-body text-white/55">
                  Working under cover takes weather, height and improvisation out of the
                  critical work. Geometry comes from the model, weld profiles repeat, and
                  inspection happens at fixed hold points before anything is loaded.
                </p>
              </Reveal>

              <Reveal delay={0.26}>
                <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
                  {SHOP_PRINCIPLES.map((item) => (
                    <div key={item.title} className="py-6">
                      <dt className="tech-lg text-white">{item.title}</dt>
                      <dd className="mt-3 text-small text-white/55">{item.note}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mt-11">
                  <Button href="#workflow" variant="secondary" tone="dark" arrow>
                    The eight stages
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================== */}
      {/* 02 — SHOP CAPABILITIES                                              */}
      {/* ================================================================== */}
      <Section tone="white" space="lg" ariaLabel="Shop capabilities" id="capabilities">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="Shop capabilities"
            title={
              <>
                Nine operations,
                {' '}<br />
                one continuous line.
              </>
            }
            lead="Material moves through the shop in sequence — cut, assemble, weld, drill, blast, coat, inspect, bundle. Each operation hands the next one work that has already been checked."
            aside={
              <Button href="/peb-solutions" variant="secondary">
                What We Build
              </Button>
            }
          />

          <ol className="mt-16 md:mt-20">
            {shopCapabilities.map((capability) => (
              <li key={capability.index} className="border-t border-charcoal/10 last:border-b">
                <Reveal y={18}>
                  <article className="grid gap-x-10 gap-y-3 py-8 md:grid-cols-12 md:items-baseline md:py-11">
                    <span
                      aria-hidden="true"
                      className="font-display wdth-wide tabular text-display-3 leading-none text-charcoal/20 md:col-span-2"
                    >
                      {capability.index}
                    </span>
                    <h3 className="font-display text-display-4 text-charcoal md:col-span-4">
                      {capability.title}
                    </h3>
                    <p className="measure body-muted text-body md:col-span-6">
                      {capability.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 03 — INTEGRATED WORKFLOW RAIL                                       */}
      {/* ================================================================== */}
      <Section tone="charcoal" space="lg" ariaLabel="Integrated workflow" id="workflow">
        <div
          aria-hidden="true"
          className="dotgrid pointer-events-none absolute inset-0 text-white opacity-[0.06]"
        />

        <Container className="relative">
          <SectionHeader
            index="03"
            eyebrow="Integrated workflow"
            tone="light"
            title={
              <>
                Eight stages,
                {' '}<br />
                one accountable team.
              </>
            }
            lead="Design, engineering, fabrication and erection are held by the same team, so a decision taken during analysis is still traceable at the last bolt on site."
            aside={
              <Button href="/quality-engineering" variant="secondary" tone="dark">
                Engineering & Quality
              </Button>
            }
          />

          {/* Rail: vertical drawing line on mobile, horizontal datum on desktop. */}
          <ol className="mt-16 grid lg:mt-24 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-16 2xl:grid-cols-8 2xl:gap-x-7">
            {workflowStages.map((stage, i) => (
              <li
                key={stage.index}
                className="relative border-l border-white/15 pb-12 pl-8 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pt-9"
              >
                {/* node sitting astride the line */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-[7px] h-[7px] w-[7px] bg-brand lg:-top-[3px] lg:left-0"
                />

                <Reveal y={16} delay={Math.min(i * 0.05, 0.35)}>
                  <div className="flex items-center gap-3">
                    <span className="tech-lg tabular text-white">{stage.index}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-white/12" />
                  </div>

                  <h3 className="mt-5 font-display text-[1.15rem] leading-[1.2] tracking-[-0.01em] text-white">
                    {stage.title}
                  </h3>

                  <p className="mt-3 text-small text-white/55">{stage.short}</p>

                  <ul className="mt-6 flex flex-col gap-2">
                    {stage.outputs.map((output) => (
                      <li key={output} className="flex items-start gap-2.5 tech text-white/55">
                        <span
                          aria-hidden="true"
                          className="mt-[0.4em] h-px w-2.5 shrink-0 bg-white/25"
                        />
                        <span className="leading-[1.5]">{output}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 04 — FACILITY & PLANT                                               */}
      {/* ================================================================== */}
      <Section tone="offwhite" space="lg" ariaLabel="Facility and plant">
        <Container>
          <SectionHeader
            index="04"
            eyebrow="Facility & plant"
            title={
              <>
                Facility
                {' '}<br />
                and plant.
              </>
            }
            lead="Shop area, fabrication capacity and the equipment schedule are stated only from verified records. Values still awaiting confirmation are shown in brackets rather than estimated."
          />

          <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <ImageFrame
                image={siteImages.manufacturingDetail}
                ratio="4/5"
                zoom={false}
                reveal={false}
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
              <Reveal delay={0.08}>
                <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10">
                  {facilityFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="grid gap-2 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                    >
                      <dt className="tech text-muted sm:col-span-4">{fact.label}</dt>
                      <dd
                        className="font-display wdth-wide text-display-4 text-charcoal sm:col-span-8"
                        data-placeholder={fact.placeholder ? 'true' : undefined}
                      >
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-7 tech text-muted">
                  [ ] — value pending confirmation from DSI
                </p>
              </Reveal>
            </div>
          </div>

          {/* --------------------- plant & equipment schedule --------------- */}
          <Reveal delay={0.1}>
            <div className="relative mt-20 overflow-hidden border border-charcoal/12 bg-white lg:mt-28">
              <div
                aria-hidden="true"
                className="blueprint-fine pointer-events-none absolute inset-0 text-charcoal opacity-[0.045]"
              />
              <div className="relative grid gap-12 p-8 md:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16">
                <div className="lg:col-span-4">
                  <TechLabel rule>Plant &amp; equipment</TechLabel>
                  <p className="mt-6 body-muted text-small">
                    The machine schedule is listed here once DSI supplies make, capacity and
                    quantity for each unit. Until then the processes are named and the
                    equipment is not.
                  </p>
                </div>

                <dl className="divide-y divide-charcoal/10 border-y border-charcoal/10 lg:col-span-7 lg:col-start-6">
                  {EQUIPMENT_SLOTS.map((slot) => (
                    <div
                      key={slot.process}
                      className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                    >
                      <dt className="tech text-charcoal sm:col-span-4">{slot.process}</dt>
                      <dd className="tech-lg text-muted sm:col-span-8" data-placeholder="true">
                        {slot.spec}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Have a drawing set,
            {' '}<br />
            or just a footprint?
          </>
        }
        lead="Send what you have — a layout, a load list or a site plan. We will come back with a structural approach, a fabrication route and a build sequence."
        primaryLabel="Request a Quote"
        primaryHref="/contact?intent=quote"
      />
    </>
  )
}

export const Route = createFileRoute('/manufacturing')({
  head: () => ({
    meta: [
      { title: "Manufacturing & Capabilities | DSI" },
      { name: 'description', content: "Inside DSI fabrication: CNC cutting and drilling, automatic welding of built-up sections, surface preparation, coating and inspection \u2014 run through an eight-stage workflow from structural design to site erection." },
      { property: 'og:title', content: "Manufacturing & Capabilities | DSI" },
      { property: 'og:description', content: "Inside DSI fabrication: CNC cutting and drilling, automatic welding of built-up sections, surface preparation, coating and inspection \u2014 run through an eight-stage workflow from structural design to site erection." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/manufacturing` }],
  }),
  component: ManufacturingPage,
})
