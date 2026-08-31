import { createFileRoute } from '@tanstack/react-router'
import { company } from '@/data/company'

import { PageHero } from '@/components/layout/PageHero'
import { CTASection } from '@/components/sections/CTASection'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { Arrow } from '@/components/site/Arrow'
import { Button } from '@/components/site/Button'
import { Container } from '@/components/site/Container'
import { Section } from '@/components/site/Section'
import { SectionHeader } from '@/components/site/SectionHeader'
import { siteImages } from '@/data/images'
import { solutions, framingSystems } from '@/data/solutions'
import {
  pebAdvantages,
  pebApplications,
  industriesServed,
  processSteps,
} from '@/data/capabilities'
import { JsonLd, serviceCatalogSchema } from '@/lib/schema'
import { cn } from '@/lib/cn'

/* -------------------------------------------------------------------------- */
/* Scope of supply — the four client-facing stages of the delivery process.    */
/* Titles and copy come straight from data/capabilities.ts, not rewritten.     */
/* -------------------------------------------------------------------------- */

const SCOPE_STAGES = ['Design', 'Fabricate', 'Deliver', 'Erect']
const scopeOfSupply = processSteps.filter((step) => SCOPE_STAGES.includes(step.title))

/** Attribute values DSI has not yet confirmed arrive wrapped in [BRACKETS]. */
const isPlaceholder = (value: string) => value.includes('[')

function PebSolutionsPage() {
  return (
    <>
      <JsonLd data={serviceCatalogSchema()} />

      {/* ================================================================== */}
      {/* 01 — PAGE HERO                                                      */}
      {/* ================================================================== */}
      <PageHero
        index="01"
        eyebrow="PEB Solutions"
        title={
          <>
            Buildings sized by
            {' '}<br />
            what they carry.
          </>
        }
        lead="Six building types, one engineering process. Every structure is sized from its own loading, span and operating conditions — then fabricated and erected by the team that designed it."
        image={siteImages.pageBanners.solutions}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'PEB Solutions' }]}
        aside={
          <nav aria-label="Solution types" className="border-t border-white/15">
            <ul>
              {solutions.map((solution) => (
                <li key={solution.slug} className="border-b border-white/10">
                  <a
                    href={`#${solution.slug}`}
                    className="group flex items-center gap-4 py-3.5 tech text-white/60 transition-colors hover:text-white"
                  >
                    <span className="tabular text-white/55 transition-colors group-hover:text-brand">
                      {solution.index}
                    </span>
                    <span className="flex-1">{solution.title}</span>
                    <Arrow
                      size={13}
                      className="text-white/55 transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:text-white/60"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* ================================================================== */}
      {/* 02 — WHY PEB                                                        */}
      {/* ================================================================== */}
      <Section tone="ink" space="lg" ariaLabel="Why pre-engineered buildings">
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.045]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-brand/70" />

        <Container className="relative">
          <SectionHeader
            index="01"
            eyebrow="Why PEB"
            tone="light"
            title={
              <>
                Why the structure
                {' '}<br />
                is pre-engineered.
              </>
            }
            lead="A pre-engineered building is not a lighter version of a conventional steel structure. It is a different route to one: the frame is analysed, detailed and fabricated as a single sequence, so material follows load and the shop runs while the site is still curing."
            aside={
              <Button href="/manufacturing" variant="secondary" tone="dark" arrow>
                Inside the works
              </Button>
            }
          />

          <div className="mt-16 md:mt-24">
            {pebAdvantages.map((advantage, i) => (
              <Reveal key={advantage.index} delay={i * 0.05}>
                <article className="grid gap-y-5 border-t border-white/12 py-9 md:grid-cols-12 md:gap-x-10 md:py-14">
                  {/* A <div>, not a <p> — `.on-dark p` outranks text-white/15. */}
                  <div
                    aria-hidden="true"
                    className="font-display wdth-wide tabular text-display-2 leading-[0.78] text-white/15 md:col-span-3"
                  >
                    {advantage.index}
                  </div>

                  <h3 className="font-display wdth-wide text-display-4 uppercase text-white md:col-span-4">
                    {advantage.title}
                  </h3>

                  <p className="measure text-body md:col-span-5">{advantage.description}</p>
                </article>
              </Reveal>
            ))}
            <div aria-hidden="true" className="border-t border-white/12" />
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* 03 — WHAT WE BUILD (catalogue opening)                              */}
      {/* ================================================================== */}
      <Section tone="white" space="md" ariaLabel="Building types">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="What we build"
            title={
              <>
                Six building types,
                {' '}<br />
                engineered per project.
              </>
            }
            lead="Span, eave height, bay spacing and crane provision are set by the operation the building has to house. The types below are where a conversation starts — not a standard frame waiting to be ordered."
            aside={
              <Button href="/industries" variant="secondary" arrow>
                Industries we serve
              </Button>
            }
          />
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* THE SIX SOLUTIONS — alternating full-width blocks                   */}
      {/* ================================================================== */}
      {solutions.map((solution, i) => {
        const reversed = i % 2 === 1
        const tone = reversed ? 'white' : 'offwhite'

        return (
          <Section
            key={solution.slug}
            id={solution.slug}
            tone={tone}
            space="md"
            ariaLabel={solution.title}
          >
            <Container>
              <article className="group grid items-center gap-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
                {/* ---------------------------------------------- imagery */}
                <figure
                  className={cn(
                    'lg:col-span-7 lg:row-start-1',
                    reversed ? 'lg:col-start-6' : 'lg:col-start-1',
                  )}
                >
                  <ImageFrame
                    image={solution.image}
                    tone="light"
                    ratio="3/2"
                    zoom
                    grain
                    revealDelay={0.05}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className={cn(
                      'ml-[calc(var(--spacing-gutter)*-1)] mr-[calc(var(--spacing-gutter)*-1)]',
                      reversed ? 'lg:ml-0' : 'lg:mr-0',
                    )}
                  />

                  <figcaption className="mt-5 flex items-center gap-4 tech text-muted">
                    <span className="tabular">FIG. {solution.index}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-charcoal/15" />
                    <span>{solution.title}</span>
                  </figcaption>
                </figure>

                {/* ---------------------------------------------- content */}
                <div
                  className={cn(
                    'lg:col-span-5 lg:row-start-1',
                    reversed ? 'lg:col-start-1' : 'lg:col-start-8',
                  )}
                >
                  <Reveal delay={0.08}>
                    <div className="flex items-start gap-5 sm:gap-7">
                      <p
                        aria-hidden="true"
                        className="font-display wdth-wide tabular text-display-2 leading-[0.76] text-charcoal/15"
                      >
                        {solution.index}
                      </p>
                      <h2 className="mt-1 font-display wdth-wide text-display-3 uppercase text-charcoal">
                        {solution.title}
                      </h2>
                    </div>
                  </Reveal>

                  <Reveal delay={0.14}>
                    <p className="mt-8 text-lead text-charcoal">{solution.short}</p>
                    <p className="measure mt-5 text-body body-muted">{solution.description}</p>
                  </Reveal>

                  {/* ------------------------------------ specification */}
                  <Reveal delay={0.2}>
                    <dl className="mt-10 border-t border-charcoal/10">
                      {solution.attributes.map((attribute) => (
                        <div
                          key={attribute.label}
                          className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-charcoal/10 py-4"
                        >
                          <dt className="tech text-muted">{attribute.label}</dt>
                          <dd
                            className="tech-lg tabular text-charcoal"
                            data-placeholder={isPlaceholder(attribute.value) ? 'true' : undefined}
                          >
                            {attribute.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>

                  {/* ------------------------------------------- features */}
                  <Reveal delay={0.26}>
                    <p className="mt-10 tech text-muted">Included in scope</p>
                    <ul className="mt-5">
                      {solution.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex gap-4 py-2 text-small text-charcoal/80"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.72em] h-px w-4 shrink-0 bg-brand"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9">
                      <Button
                        href="/contact?intent=quote"
                        variant="ghost"
                        arrow
                        aria-label={`Enquire about ${solution.title}`}
                      >
                        Enquire about this build
                      </Button>
                    </div>
                  </Reveal>
                </div>
              </article>
            </Container>
          </Section>
        )
      })}

      {/* ================================================================== */}
      {/* 04 — SCOPE OF SUPPLY                                                */}
      {/* ================================================================== */}
      <Section tone="charcoal" space="lg" ariaLabel="Scope of supply">
        <div
          aria-hidden="true"
          className="dotgrid pointer-events-none absolute inset-0 text-white opacity-[0.07]"
        />

        <Container className="relative">
          <SectionHeader
            index="03"
            eyebrow="Scope of supply"
            tone="light"
            title={
              <>
                Design, fabricate,
                {' '}<br />
                deliver, erect.
              </>
            }
            lead="Responsibility for the structure stays with one team from drawing to handover. The engineer who sizes the member, the shop that welds it and the crew that bolts it on site all work from the same coordinated model."
            aside={
              <Button href="/quality-engineering" variant="secondary" tone="dark" arrow>
                Engineering & quality
              </Button>
            }
          />

          <ol className="mt-16 grid md:mt-24 md:grid-cols-4">
            {scopeOfSupply.map((stage, i) => (
              <Reveal
                key={stage.title}
                as="li"
                delay={i * 0.06}
                className={cn(
                  'border-t border-white/15 py-8 md:border-t-0 md:py-0',
                  i > 0 && 'md:border-l md:border-white/15 md:pl-8',
                  i < scopeOfSupply.length - 1 && 'md:pr-8',
                )}
              >
                <div className="mb-7 flex items-center gap-4">
                  <span className="tech tabular text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
                  {i < scopeOfSupply.length - 1 && (
                    <Arrow size={13} className="hidden text-white/55 md:block" />
                  )}
                </div>

                <h3 className="font-display wdth-wide text-display-4 uppercase text-white">
                  {stage.title}
                </h3>
                <p className="mt-4 text-small">{stage.description}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.3}>
            <p className="mt-16 border-t border-white/15 pt-8 text-lead md:mt-20">
              Scope can be taken as supply-only or as a supply-and-erect package. Where the
              structure interfaces with civil works, MEP or an existing building, those
              interfaces are resolved on the model before the first plate is cut.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ==================================================== FRAMING SYSTEMS */}
      <Section tone="white" space="md" ariaLabel="Primary framing systems">
        <Container>
          <SectionHeader
            index="04"
            eyebrow="Framing systems"
            size="md"
            title={
              <>
                Eight primary
                {' '}<br />
                frame types.
              </>
            }
            lead="The frame type sets the practical building width. Clear span keeps the floor uninterrupted; multi-span carries greater width on interior columns; lean-to and roof systems extend or cover structures that already exist."
          />

          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {framingSystems.map((system, i) => (
              <Reveal
                as="li"
                key={system.code}
                delay={0.04 * i}
                className="border-t border-charcoal/15 py-7"
              >
                <div className="flex items-baseline gap-3">
                  <span className="tech tabular text-brand">{system.code}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-charcoal/12" />
                </div>
                <h3 className="mt-4 text-body font-medium text-charcoal">{system.name}</h3>
                <p className="tech mt-2.5 text-muted">{system.width}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* =============================================== APPLICATIONS & SECTORS */}
      <Section tone="offwhite" space="md" ariaLabel="Applications and industries served">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            {/* ---------------------------------------------- applications */}
            <div className="lg:col-span-5">
              <SectionHeader
                index="05"
                eyebrow="Applications"
                size="md"
                title={
                  <>
                    Where a PEB
                    {' '}<br />
                    gets used.
                  </>
                }
                lead="The same framing logic covers far more than a factory shed."
              />

              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
                {pebApplications.map((application, i) => (
                  <Reveal
                    as="li"
                    key={application}
                    delay={0.03 * i}
                    className="flex items-center gap-4 border-b border-charcoal/10 py-3.5"
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-brand" />
                    <span className="text-small text-charcoal">{application}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* ------------------------------------------------- industries */}
            <div className="lg:col-span-7">
              <SectionHeader
                index="06"
                eyebrow="Industries we serve"
                size="md"
                title={
                  <>
                    Fourteen sectors,
                    {' '}<br />
                    one delivery chain.
                  </>
                }
                lead="Each sector loads the building differently — crane duty, wash-down, dust, heat or storage height. The frame is specified for the one in front of it."
              />

              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2">
                {industriesServed.map((industry, i) => (
                  <Reveal
                    as="li"
                    key={industry}
                    delay={0.025 * i}
                    className="flex items-center gap-4 border-b border-charcoal/10 py-3.5 sm:odd:sm:pr-8"
                  >
                    <span className="tech tabular text-charcoal/35">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-small text-charcoal">{industry}</span>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={0.2}>
                <p className="measure mt-10 text-small text-muted">
                  Working in a sector that is not listed? The engineering approach does not
                  change — send us the process and the loads it puts on the building.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Know the span.
            {' '}<br />
            Not sure of the frame?
          </>
        }
        lead="Send us the process, the site and the loads you need to carry. We will come back with a framing approach before anything is priced."
        primaryLabel="Discuss Your Building"
      />
    </>
  )
}

export const Route = createFileRoute('/peb-solutions')({
  head: () => ({
    meta: [
      { title: "PEB Solutions \u2014 Industrial Sheds, Warehouses & Factories | DSI" },
      { name: 'description', content: "Pre-engineered building solutions from Darshan Steel Infrastructure: industrial sheds, warehouses, factory buildings, cold storage, commercial and custom steel structures \u2014 designed, fabricated and erected by one team." },
      { property: 'og:title', content: "PEB Solutions \u2014 Industrial Sheds, Warehouses & Factories | DSI" },
      { property: 'og:description', content: "Pre-engineered building solutions from Darshan Steel Infrastructure: industrial sheds, warehouses, factory buildings, cold storage, commercial and custom steel structures \u2014 designed, fabricated and erected by one team." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}/peb-solutions` }],
  }),
  component: PebSolutionsPage,
})
