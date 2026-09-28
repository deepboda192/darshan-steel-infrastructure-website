import { createFileRoute } from '@tanstack/react-router'
import {
  Activity,
  ArrowRight,
  Blocks,
  Cable,
  Check,
  Container,
  DraftingCompass,
  Footprints,
  PackageCheck,
  Ruler,
  Weight,
  Wind,
} from 'lucide-react'
import { structuralSystems } from '@/data/capabilities'
import { company } from '@/data/company'
import { siteImages, type SiteImage } from '@/data/images'
import {
  designChain,
  designLoads,
  frameTypes,
  parts,
  primarySystemFaq,
  primarySystemIntro,
  primarySystemMeta,
} from '@/data/primary-system'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd, type Json } from '@/lib/schema'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { Button } from '@/components/site/Button'
import { ImageFrame } from '@/components/media/ImageFrame'
import Image from '@/components/media/NextImage'
import Link from '@/components/site/NextLink'
import { cn } from '@/lib/cn'

type FrameCode = keyof typeof siteImages.pebFrames

/** A photograph for each part, shown beside the copy with a caption. */
const PART_PHOTO: Record<string, { image: SiteImage; caption: string }> = {
  'primary-framing': {
    image: siteImages.pebParts.framing,
    caption: 'Main frames under erection: tapered columns, rafters and the purlins and girts spanning between the frames.',
  },
  'crane-system': {
    image: siteImages.craneSystem,
    caption: 'Inside a DSI building: a double-girder EOT crane running on its crane beams.',
  },
  'canopies-and-fascia': {
    image: siteImages.pebParts.canopy,
    caption: 'A curved canopy cantilevered over the rolling-shutter door of a DSI shed keeps the doorway and the goods dry.',
  },
  'bracing-systems': {
    image: siteImages.pebParts.bracing,
    caption: 'Rod X-bracing in the sidewall bays carries wind and braking forces along the building to the foundations.',
  },
}

/** A catalogue drawing shown beneath a part's photograph. */
const PART_DRAWING: Record<string, { image: SiteImage; caption: string }> = {
  'crane-system': {
    image: siteImages.craneDrawing,
    caption: 'Top running crane: the crane bridge on crane beams, carried by brackets on the rigid-frame columns.',
  },
}

/** One icon per crane advantage, in the order the data lists them. */
const ADVANTAGE_ICONS = [Blocks, PackageCheck, Ruler, DraftingCompass]

/** One icon per design load, in the order the data lists them. */
const LOAD_ICONS = [Weight, Cable, Footprints, Wind, Container, Activity]

const PATH = '/about-peb/primary-system'

function articleSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The primary system of a pre-engineered building',
    description: primarySystemMeta.description,
    mainEntityOfPage: `${company.siteUrl}${PATH}`,
    author: { '@type': 'Organization', name: company.name },
    publisher: { '@type': 'Organization', name: company.name, url: company.siteUrl },
  }
}

function faqSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: primarySystemFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/**
 * Primary System — the load-carrying skeleton of a PEB, part by part: the
 * primary framing (with the standard frame types), the crane system,
 * canopies and fascia, and the bracing. A page under About PEB; the copy
 * lives in data/primary-system.ts.
 */
function PrimarySystemPage() {
  useMotion()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About PEB', path: '/about-peb' },
            { name: 'Primary System', path: PATH },
          ]),
          articleSchema(),
          faqSchema(),
        ]}
      />

      <InnerHero
        title="Primary System"
        image={siteImages.primarySystemHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About PEB', href: '/about-peb' }, { label: 'Primary System' }]}
      />

      {/* ---------------- intro + contents ---------------- */}
      <section className="m-section" aria-labelledby="ps-intro">
        <div className="m-container">
          <div className="grid grid-cols-[1fr_1.3fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
            <div className="flex flex-col gap-10 lg:sticky lg:top-12" data-reveal="up">
              <div>
                <SectionIntro subtitle="Primary system" title={<span id="ps-intro">The skeleton of the building.</span>} />
                <p className="m-paragraph large mt-8 text-neutral-10">{primarySystemIntro.lead}</p>
              </div>
              <div className="flex flex-col gap-5">
                {primarySystemIntro.paragraphs.map((text) => (
                  <p key={text.slice(0, 24)} className="m-paragraph">
                    {text}
                  </p>
                ))}
              </div>
              <nav aria-label="On this page" className="border border-black/10 bg-neutral-1 p-6 max-xs:p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">On this page</p>
                <ol className="mt-4 flex flex-col gap-2">
                  {parts.map((part, i) => (
                    <li key={part.slug}>
                      <a
                        href={`#${part.slug}`}
                        className="group flex items-center gap-4 border border-black/10 bg-white px-5 py-3.5 transition-[border-color] duration-300 hover:border-accent"
                      >
                        <span className="font-heading text-[13px] font-semibold text-neutral-5 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-heading text-[17px] font-semibold text-neutral-10 transition-colors group-hover:text-accent">
                          {part.title}
                        </span>
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="shrink-0 text-neutral-4 transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* The catalogue poster: the five structural systems, this page being the first. */}
            <figure className="flex flex-col gap-4" data-reveal="up">
              {/* The poster is a cut-out on a transparent background, so it goes straight
                  onto the page rather than into a framed plate. */}
              <Image
                src={siteImages.structuralSystems.src}
                alt={siteImages.structuralSystems.alt}
                width={1390}
                height={1890}
                className="h-auto w-full"
              />
              <figcaption className="text-[13px] leading-[1.5] text-neutral-6">
                The five structural systems of a DSI pre-engineered building and their components. This page
                covers the first of them, the primary system.
              </figcaption>
              {/* The table inside the artwork is too small to read on a phone, so it is repeated as text. */}
              <dl className="grid gap-4 border border-black/10 bg-neutral-1 p-6 md:hidden">
                {structuralSystems.map((system) => (
                  <div
                    key={system.name}
                    className="grid grid-cols-[104px_1fr] gap-4 border-b border-black/10 pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-heading text-[15px] font-bold leading-[1.35] text-accent">{system.name}</dt>
                    <dd className="text-[15px] leading-[1.5] text-neutral-8">{system.components.join(' · ')}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------- the four parts ---------------- */}
      {parts.map((part, i) => {
        const dark = i % 2 === 1
        return (
          <section
            key={part.slug}
            id={part.slug}
            className={cn('m-section scroll-mt-6', dark && 'bg-secondary text-white')}
            aria-labelledby={`${part.slug}-title`}
          >
            <div className="m-container">
              <div className="flex flex-col gap-14 max-xs:gap-10">
                <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6" data-reveal="up">
                  <div className="max-w-[640px]">
                    <SectionIntro
                      tone={dark ? 'light' : 'dark'}
                      subtitle={part.eyebrow}
                      title={<span id={`${part.slug}-title`}>{part.title}</span>}
                    />
                  </div>
                  <p
                    className={cn(
                      'mb-2 max-w-[440px] text-[18px] leading-[1.5] max-md:text-[16px]',
                      dark ? 'text-neutral-1' : 'text-neutral-8',
                    )}
                  >
                    {part.summary}
                  </p>
                </div>

                <div className="grid grid-cols-[1.4fr_1fr] gap-12 max-lg:grid-cols-1 max-lg:gap-10">
                  <div className="flex flex-col gap-5" data-reveal="up">
                    {part.paragraphs.map((text) => (
                      <p key={text.slice(0, 24)} className={cn('m-paragraph', dark && 'light')}>
                        {text}
                      </p>
                    ))}
                    {(part.supply || part.specs) && (
                      <div className="mt-4 grid grid-cols-2 gap-5 max-md:grid-cols-1">
                        {part.supply && (
                          <div className={cn('border p-6', dark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-neutral-1')}>
                            <h3 className={cn('font-heading text-[18px] font-semibold', dark ? 'text-white' : 'text-neutral-10')}>
                              Standard supply
                            </h3>
                            <ul className="mt-4 flex flex-col gap-3">
                              {part.supply.map((item) => (
                                <li
                                  key={item}
                                  className={cn('flex items-start gap-3 text-[15px] leading-[1.5]', dark ? 'text-neutral-1' : 'text-neutral-8')}
                                >
                                  <Check size={17} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {part.specs && (
                          <div className={cn('border p-6', dark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-neutral-1')}>
                            <h3 className={cn('font-heading text-[18px] font-semibold', dark ? 'text-white' : 'text-neutral-10')}>
                              Technical specifications
                            </h3>
                            <dl className="mt-2 flex flex-col">
                              {part.specs.map((row) => (
                                <div
                                  key={row.label}
                                  className={cn('flex flex-col gap-0.5 border-b py-3 last:border-b-0 last:pb-0', dark ? 'border-white/15' : 'border-black/10')}
                                >
                                  <dt className={cn('text-[13px] font-semibold', dark ? 'text-neutral-3' : 'text-neutral-6')}>{row.label}</dt>
                                  <dd className={cn('text-[15px] leading-[1.5]', dark ? 'text-white' : 'text-neutral-10')}>{row.value}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-5" data-reveal="up">
                    {PART_PHOTO[part.slug] && (
                      <figure className={cn('border p-3', dark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-white')}>
                        <ImageFrame
                          image={PART_PHOTO[part.slug].image}
                          ratio="16/10"
                          sizes="(min-width: 1024px) 34vw, 100vw"
                          captioned
                        />
                        <figcaption className={cn('mt-3 px-2 text-[13px] leading-[1.5]', dark ? 'text-neutral-2' : 'text-neutral-6')}>
                          {PART_PHOTO[part.slug].caption}
                        </figcaption>
                      </figure>
                    )}
                    {PART_DRAWING[part.slug] && (
                      <figure className={cn('border p-5', dark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-white')}>
                        <Image
                          src={PART_DRAWING[part.slug].image.src}
                          alt={PART_DRAWING[part.slug].image.alt}
                          width={591}
                          height={270}
                          className="h-auto w-full"
                        />
                        <figcaption className={cn('mt-4 text-[13px] leading-[1.5]', dark ? 'text-neutral-2' : 'text-neutral-6')}>
                          {PART_DRAWING[part.slug].caption}
                        </figcaption>
                      </figure>
                    )}
                  {part.points && (
                  <ul
                    className={cn(
                      'flex h-fit flex-col gap-3.5 border p-7 max-xs:p-6',
                      dark ? 'border-white/20' : 'border-black/10 bg-neutral-1',
                    )}
                  >
                    {part.points.map((point) => (
                      <li
                        key={point}
                        className={cn('flex items-start gap-3 text-[16px] leading-[1.5]', dark ? 'text-neutral-1' : 'text-neutral-8')}
                      >
                        <Check size={18} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  )}
                  </div>
                </div>

                {part.advantages && (
                  <div className="bg-accent p-10 text-white max-md:p-7 max-xs:p-6" data-reveal="up">
                    <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start max-md:gap-3">
                      <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-white/70">Why DSI</p>
                        <h3 className="mt-2 font-heading text-[26px] font-bold leading-(--lh-sm) max-xs:text-[22px]">
                          Advantages of the DSI crane beam system
                        </h3>
                      </div>
                      <p className="max-w-[420px] text-[15px] leading-[1.5] text-white/80">
                        The crane beams come from the same engineering team, shop and erection crew as the building.
                      </p>
                    </div>
                    <ul className="mt-8 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-xs:grid-cols-1">
                      {part.advantages.map((item, n) => {
                        const Icon = ADVANTAGE_ICONS[n] ?? Check
                        return (
                          <li key={item.title} className="flex flex-col gap-5 border border-white/20 bg-white/10 p-6">
                            <span className="flex h-12 w-12 items-center justify-center bg-white text-accent">
                              <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                            </span>
                            <div>
                              <h4 className="font-heading text-[18px] font-semibold leading-(--lh-sm)">{item.title}</h4>
                              <p className="mt-2 text-[15px] leading-[1.5] text-white/80">{item.text}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* The frame types belong to the primary framing part. */}
                {part.slug === 'primary-framing' && (
                  <div className="flex flex-col gap-8 border-t border-black/10 pt-12">
                    <div data-reveal="up">
                      <h3 className="font-heading text-[28px] font-bold leading-(--lh-sm) text-neutral-10 max-xs:text-[24px]">
                        Types of primary framing system
                      </h3>
                      <p className="m-paragraph mt-3 max-w-[640px]">
                        Eight standard configurations cover most buildings, from a column-free clear span
                        to a roof system on supports by others. The choice is made from the operation
                        inside, the site and the plan for expansion.
                      </p>
                    </div>
                    <ol
                      className="grid grid-cols-4 gap-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-xs:grid-cols-1"
                      data-reveal-stagger
                    >
                      {frameTypes.map((type) => {
                        const drawing = siteImages.pebFrames[type.code as FrameCode]
                        return (
                          <li key={type.code} className="group flex flex-col border border-secondary/15 bg-white">
                            <div className="flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-black/10 bg-neutral-1 px-6 py-7">
                              <Image
                                src={drawing.src}
                                alt={drawing.alt}
                                className="max-h-full w-full object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                              />
                            </div>
                            <div className="flex flex-1 flex-col p-6 max-xs:p-5">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h4 className="font-heading text-[20px] font-bold leading-(--lh-sm) text-neutral-10">
                                    {type.name}
                                  </h4>
                                  <p className="mt-1.5 text-[14px] font-semibold text-accent">{type.width}</p>
                                </div>
                                <span className="m-icon-box h-8 min-w-8 shrink-0 px-2 font-heading text-[12px] font-bold">
                                  {type.code}
                                </span>
                              </div>
                              <p className="m-paragraph medium mb-4 mt-3">{type.description}</p>
                              <p className="mt-auto border-t border-black/10 pt-4 text-[14px] leading-[1.55] text-neutral-7">
                                <span className="font-semibold text-neutral-10">Best for: </span>
                                {type.bestFor}
                              </p>
                            </div>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </section>
        )
      })}

      {/* ---------------- design loads ---------------- */}
      <section className="m-section bg-neutral-1" aria-labelledby="ps-loads">
        <div className="m-container">
          <div className="grid grid-cols-[1fr_1.3fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
            <div className="lg:sticky lg:top-12" data-reveal="up">
              <SectionIntro subtitle="Design" title={<span id="ps-loads">What the frames are sized for.</span>} />
              <p className="m-paragraph mt-8 max-w-[480px]">
                Every member of the primary system is checked against these load cases in
                combination, and the connections and foundations follow from the same analysis.
              </p>

              {/* The analysis chain: what happens once the cases are combined. */}
              <ol className="mt-10 max-w-[480px] border-t border-black/10">
                {designChain.map((step, n) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[44px_1fr] gap-5 border-b border-black/10 py-5 max-xs:grid-cols-[36px_1fr] max-xs:gap-4"
                  >
                    <span className="font-heading text-[14px] font-bold leading-[1.6] text-accent">
                      {String(n + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-heading text-[18px] font-semibold leading-(--lh-sm) text-neutral-10">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-[1.55] text-neutral-7">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <ul
              className="grid grid-cols-2 gap-5 max-sm:grid-cols-1"
              data-reveal-stagger
              aria-label="Design load cases"
            >
              {designLoads.map((load, n) => {
                const Icon = LOAD_ICONS[n] ?? Check
                return (
                  <li
                    key={load.name}
                    className="group flex flex-col gap-6 border border-secondary/15 bg-white p-7 transition-colors duration-300 hover:border-accent max-xs:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="m-icon-box h-12 w-12">
                        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="pt-1 font-heading text-[13px] font-bold uppercase tracking-[0.06em] text-neutral-6">
                        {String(n + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="font-heading text-[20px] font-bold leading-(--lh-sm) text-neutral-10">{load.name}</h3>
                      <p className="mt-2.5 text-[16px] leading-[1.55] text-neutral-8">{load.note}</p>
                      <p className="mt-auto border-t border-black/10 pt-4 text-[14px] leading-[1.55] text-neutral-7">
                        <span className="font-semibold text-neutral-10">Acts: </span>
                        {load.kind}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="m-section" aria-labelledby="ps-faq">
        <div className="m-container">
          <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-12">
            <div className="w-full max-w-[440px] lg:sticky lg:top-12" data-reveal="up">
              <SectionIntro subtitle="FAQ" title={<span id="ps-faq">Questions about the primary system.</span>} />
              <p className="m-paragraph mt-8">
                For the purlins, girts and eave struts that span between the frames, see the{' '}
                <Link href="/about-peb/secondary-system" className="m-link">
                  Secondary System
                </Link>
                . For cladding and accessories, see{' '}
                <Link href="/about-peb" className="m-link">
                  About PEB
                </Link>
                .
              </p>
            </div>
            <dl className="w-full max-w-[760px] max-lg:max-w-none" data-reveal="up">
              {primarySystemFaq.map((item, i) => (
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
      <section className="m-section bg-secondary text-white" aria-label="Start a project">
        <div className="m-container">
          <div className="flex flex-col items-center gap-8 text-center" data-reveal="up">
            <SectionIntro
              tone="light"
              align="center"
              subtitle="Next step"
              title="Tell us what the frame has to carry."
              className="max-w-[640px]"
            />
            <p className="max-w-[560px] text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]">
              Span, eave height, crane duty and site location are enough for DSI to propose a frame
              type and a first sizing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/?intent=quote#contact">Request a quote</Button>
              <Button href="/projects" variant="outline" tone="dark">
                See our projects
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/about-peb_/primary-system')({
  head: () => ({
    meta: [
      { title: primarySystemMeta.title },
      { name: 'description', content: primarySystemMeta.description },
      { property: 'og:title', content: primarySystemMeta.title },
      { property: 'og:description', content: primarySystemMeta.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `${company.siteUrl}${PATH}` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}${PATH}` }],
  }),
  component: PrimarySystemPage,
})
