import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Blocks, Check, Fan, Layers, LayoutPanelTop, Rows3, Warehouse, type LucideIcon } from 'lucide-react'
import { company } from '@/data/company'
import { siteImages } from '@/data/images'
import { solutions } from '@/data/solutions'
import {
  industriesServed,
  pebAdvantages,
  pebApplications,
  pebIncludes,
  structuralSystems,
} from '@/data/capabilities'
import { pebDefinition, pebFaq, pebMeta } from '@/data/peb'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd, type Json } from '@/lib/schema'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { Button } from '@/components/site/Button'
import { ImageFrame } from '@/components/media/ImageFrame'
import Image from '@/components/media/NextImage'
import Link from '@/components/site/NextLink'

const PATH = '/about-peb'

/** One icon per structural system. */
const SYSTEM_ICONS: Record<string, LucideIcon> = {
  'Primary System': Warehouse,
  'Secondary System': Rows3,
  'Mezzanine System': Layers,
  'Cladding System': LayoutPanelTop,
  Accessories: Fan,
}

/** Systems that have a page of their own. */
const SYSTEM_PAGES: Record<string, string> = {
  'Primary System': '/about-peb/primary-system',
  'Secondary System': '/about-peb/secondary-system',
  'Mezzanine System': '/about-peb/mezzanine-floors',
  'Cladding System': '/about-peb/cladding-system',
  Accessories: '/about-peb/accessories',
}

/** Rich results: the FAQ as a FAQPage, the page as an Article by the company. */
function faqSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pebFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

function articleSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'About PEB: pre-engineered buildings explained',
    description: pebMeta.description,
    mainEntityOfPage: `${company.siteUrl}${PATH}`,
    author: { '@type': 'Organization', name: company.name },
    publisher: { '@type': 'Organization', name: company.name, url: company.siteUrl },
  }
}

/**
 * About PEB — a plain explanation of pre-engineered buildings for visitors
 * and search engines: what a PEB is, what it is made of, why it is chosen
 * and where it is used, closed by the questions people ask and the way to
 * the enquiry form. Every list comes from the catalogue content in
 * data/capabilities.ts; the copy lives in data/peb.ts.
 */
function AboutPebPage() {
  useMotion()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About PEB', path: PATH },
          ]),
          articleSchema(),
          faqSchema(),
        ]}
      />

      <InnerHero
        title="About PEB"
        image={siteImages.pebHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About PEB' }]}
      />

      {/* ---------------- what a PEB is ---------------- */}
      <section className="m-section" aria-labelledby="peb-what">
        <div className="m-container">
          <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-12">
            <div className="w-full max-w-[540px] lg:sticky lg:top-12" data-reveal="up">
              <SectionIntro subtitle="Pre-engineered buildings" title={<span id="peb-what">What is a pre-engineered building?</span>} />
              <p className="m-paragraph large mt-8 text-neutral-10">{pebDefinition.lead}</p>
            </div>
            <div className="flex w-full max-w-[640px] flex-col gap-10 max-lg:max-w-none" data-reveal="up">
              <div className="flex flex-col gap-5">
                {pebDefinition.paragraphs.map((text) => (
                  <p key={text.slice(0, 24)} className="m-paragraph">
                    {text}
                  </p>
                ))}
              </div>
              <div className="border border-black/10 bg-neutral-1 p-8 max-xs:p-6">
                <h3 className="font-heading text-[22px] font-bold leading-(--lh-sm) text-neutral-10">
                  What a DSI pre-engineered building includes
                </h3>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {pebIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.5] text-neutral-8">
                      <Check size={18} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- inside a PEB ---------------- */}
      <section className="m-section" aria-labelledby="peb-systems">
        <div className="m-container">
          <div className="grid grid-cols-[1fr_1.15fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
            <div className="flex flex-col gap-10 lg:sticky lg:top-12" data-reveal="up">
              <SectionIntro
                subtitle="Inside a PEB"
                title={<span id="peb-systems">Five systems make one building.</span>}
                className="max-w-[560px]"
              />
              <ol className="flex flex-col gap-3">
                {structuralSystems.map((system) => {
                  const detail = SYSTEM_PAGES[system.name]
                  const Icon = SYSTEM_ICONS[system.name] ?? Blocks
                  const body = (
                    <>
                      <span className="m-icon-box h-12 w-12">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-heading text-[20px] font-semibold leading-(--lh-sm) text-neutral-10">
                            {system.name}
                          </h3>
                          {detail && (
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-accent">
                              Read more
                              <ArrowRight
                                size={16}
                                aria-hidden="true"
                                className="transition-[translate] duration-300 group-hover:translate-x-1"
                              />
                            </span>
                          )}
                        </div>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {system.components.map((component) => (
                            <li
                              key={component}
                              className="border border-black/10 bg-white px-3 py-1.5 text-[14px] leading-[1.4] text-neutral-8"
                            >
                              {component}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )
                  const frame = 'flex items-start gap-5 border border-black/10 bg-neutral-1 p-6 max-xs:flex-col max-xs:gap-4 max-xs:p-5'
                  return (
                    <li key={system.name}>
                      {detail ? (
                        <Link
                          href={detail}
                          className={`group ${frame} transition-[border-color,background-color] duration-300 hover:border-accent hover:bg-white`}
                        >
                          {body}
                        </Link>
                      ) : (
                        <div className={frame}>{body}</div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* The catalogue poster: a cut-out on a transparent background, so it goes
                straight onto the page rather than into a framed plate. */}
            <figure className="flex flex-col items-center gap-4 self-center" data-reveal="up">
              <Image
                src={siteImages.structuralSystems.src}
                alt={siteImages.structuralSystems.alt}
                width={1390}
                height={1890}
                className="h-auto w-full"
              />
              <figcaption className="text-[13px] leading-[1.5] text-neutral-6">
                The five structural systems of a DSI pre-engineered building and the components each one supplies.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------- advantages ---------------- */}
      <section className="m-section bg-neutral-1" aria-labelledby="peb-advantages">
        <div className="m-container">
          <div className="flex flex-col gap-16 max-xs:gap-12">
            <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start" data-reveal="up">
              <div className="max-w-[600px]">
                <SectionIntro subtitle="Advantages" title={<span id="peb-advantages">Why buildings are pre-engineered.</span>} />
              </div>
              <p className="mb-2.5 max-w-[440px] text-[18px] leading-[1.5] text-neutral-8 max-md:text-[16px]">
                Ten reasons a PEB is chosen over conventional steel or concrete, from the drawing
                board to the day the building is extended.
              </p>
            </div>
            <ol className="grid grid-cols-2 gap-5 max-md:grid-cols-1" data-reveal-stagger>
              {pebAdvantages.map((advantage) => (
                <li
                  key={advantage.index}
                  className="flex gap-6 border border-secondary/15 bg-white p-7 max-xs:flex-col max-xs:gap-4 max-xs:p-6"
                >
                  <span className="m-icon-box h-12 w-12 shrink-0 font-heading text-[16px] font-bold tabular-nums">
                    {advantage.index}
                  </span>
                  <div>
                    <h3 className="font-heading text-[22px] font-bold leading-(--lh-sm) text-neutral-10">
                      {advantage.title}
                    </h3>
                    <p className="m-paragraph medium mt-2">{advantage.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- applications ---------------- */}
      <section className="m-section" aria-labelledby="peb-applications">
        <div className="m-container">
          <div className="flex flex-col gap-16 max-xs:gap-12">
            <div data-reveal="up">
              <SectionIntro
                align="center"
                subtitle="Applications"
                title={<span id="peb-applications">Where pre-engineered buildings are used.</span>}
                className="max-w-[700px]"
              />
            </div>

            <ul className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-xs:grid-cols-1" data-reveal-stagger>
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/#${solution.slug}`}
                    className="group relative block h-[300px] overflow-hidden bg-neutral-1 text-white max-xs:h-[240px]"
                  >
                    <div className="absolute inset-0 transition-[scale] duration-700 ease-out group-hover:scale-[1.04]">
                      <ImageFrame image={solution.image} ratio="fill" sizes="(min-width: 1024px) 30vw, 100vw" />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,#141414e6,#14141433_60%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 max-xs:p-6">
                      <div>
                        <h3 className="font-heading text-[24px] font-semibold leading-(--lh-sm)">{solution.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-[1.5] text-neutral-2">{solution.short}</p>
                      </div>
                      <ArrowRight
                        size={20}
                        aria-hidden="true"
                        className="shrink-0 transition-[translate] duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="grid gap-10 border-t border-black/10 pt-12 md:grid-cols-2" data-reveal="up">
              <div>
                <h3 className="font-heading text-[22px] font-bold leading-(--lh-sm) text-neutral-10">
                  Also built as PEB
                </h3>
                <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 max-xs:grid-cols-1">
                  {pebApplications.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[16px] text-neutral-8">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-[22px] font-bold leading-(--lh-sm) text-neutral-10">
                  Industries that build with PEB
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {industriesServed.map((industry) => (
                    <li key={industry} className="m-chip">
                      {industry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="m-section bg-neutral-1" aria-labelledby="peb-faq">
        <div className="m-container">
          <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-12">
            <div className="w-full max-w-[440px] lg:sticky lg:top-12" data-reveal="up">
              <SectionIntro subtitle="FAQ" title={<span id="peb-faq">Questions about PEB.</span>} />
              <p className="m-paragraph mt-8">
                Not answered here? Tell us about the building and an engineer will reply.
              </p>
              <div className="mt-8">
                <Button href="/#contact">Ask a question</Button>
              </div>
            </div>
            <dl className="w-full max-w-[760px] max-lg:max-w-none" data-reveal="up">
              {pebFaq.map((item, i) => (
                <details key={item.question} className="group border-b border-black/10" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-[20px] font-semibold leading-(--lh-sm) text-neutral-10 marker:hidden [&::-webkit-details-marker]:hidden max-xs:text-[18px]">
                    <dt>{item.question}</dt>
                    <span
                      aria-hidden="true"
                      className="relative h-6 w-6 shrink-0 before:absolute before:left-1/2 before:top-1/2 before:h-[2px] before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-accent after:absolute after:left-1/2 after:top-1/2 after:h-4 after:w-[2px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-accent after:transition-[rotate] after:duration-300 group-open:after:rotate-90"
                    />
                  </summary>
                  <dd className="m-paragraph pb-7 pr-12 max-xs:pr-0">{item.answer}</dd>
                </details>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- closing ---------------- */}
      <section className="m-section" aria-label="Start a PEB project">
        <div className="m-container">
          <div className="flex flex-col items-center gap-8 text-center" data-reveal="up">
            <SectionIntro
              align="center"
              subtitle="Next step"
              title="Planning a pre-engineered building?"
              className="max-w-[640px]"
            />
            <p className="max-w-[560px] text-[18px] leading-[1.5] text-neutral-8 max-md:text-[16px]">
              Span, length, eave height and site location are enough for a first pass. DSI designs,
              fabricates and erects the building under one roof, from Rajkot, Gujarat.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/?intent=quote#contact">Request a quote</Button>
              <Button href="/projects" variant="outline">
                See our projects
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/about-peb')({
  head: () => ({
    meta: [
      { title: pebMeta.title },
      { name: 'description', content: pebMeta.description },
      { property: 'og:title', content: pebMeta.title },
      { property: 'og:description', content: pebMeta.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `${company.siteUrl}${PATH}` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}${PATH}` }],
  }),
  component: AboutPebPage,
})
