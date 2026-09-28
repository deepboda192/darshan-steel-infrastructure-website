import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Cable, Check, DoorOpen, Factory, Layers, Link2, Triangle } from 'lucide-react'
import { company } from '@/data/company'
import { siteImages, type SiteImage } from '@/data/images'
import {
  drawingLegend,
  secondaryDetails,
  secondaryParts,
  secondarySystemFaq,
  secondarySystemIntro,
  secondarySystemMeta,
  sectionProfiles,
} from '@/data/secondary-system'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd, type Json } from '@/lib/schema'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { Button } from '@/components/site/Button'
import { ImageFrame } from '@/components/media/ImageFrame'
import Image from '@/components/media/NextImage'
import Link from '@/components/site/NextLink'
import { cn } from '@/lib/cn'

/** A photograph for each part, shown beside the copy with a caption. */
const PART_PHOTO: Record<string, { image: SiteImage; caption: string }> = {
  purlins: {
    image: siteImages.secondaryParts.purlins,
    caption: 'Z-purlins lapped over the rafters of a DSI building under erection, with the crane beams below them.',
  },
  girts: {
    image: siteImages.secondaryParts.girts,
    caption: 'Girts running between the columns behind the wall sheeting, with the eave strut along the top of the wall.',
  },
  'eave-struts': {
    image: siteImages.secondaryParts.eaveStrut,
    caption: 'The eave line under erection: the strut along the column tops carries the first purlin and the top girt.',
  },
}

/** One icon per detail, in the order the data lists them. */
const DETAIL_ICONS = [Layers, Link2, Cable, Triangle, DoorOpen, Factory]

const PATH = '/about-peb/secondary-system'

function articleSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The secondary system of a pre-engineered building',
    description: secondarySystemMeta.description,
    mainEntityOfPage: `${company.siteUrl}${PATH}`,
    author: { '@type': 'Organization', name: company.name },
    publisher: { '@type': 'Organization', name: company.name, url: company.siteUrl },
  }
}

function faqSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: secondarySystemFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/**
 * Secondary System — the cold-formed members between the frames and the
 * sheeting, part by part: purlins, girts and eave struts, then the two
 * profiles they are made from and the details that connect them. A page
 * under About PEB, a sibling of Primary System; the copy lives in
 * data/secondary-system.ts.
 */
function SecondarySystemPage() {
  useMotion()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About PEB', path: '/about-peb' },
            { name: 'Secondary System', path: PATH },
          ]),
          articleSchema(),
          faqSchema(),
        ]}
      />

      <InnerHero
        title="Secondary System"
        image={siteImages.secondarySystemHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About PEB', href: '/about-peb' }, { label: 'Secondary System' }]}
      />

      {/* ---------------- intro + contents ---------------- */}
      <section className="m-section" aria-labelledby="ss-intro">
        <div className="m-container">
          <div className="grid grid-cols-[1fr_1.3fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
            <div className="flex flex-col gap-10 lg:sticky lg:top-12" data-reveal="up">
              <div>
                <SectionIntro subtitle="Secondary system" title={<span id="ss-intro">Between the frames and the skin.</span>} />
                <p className="m-paragraph large mt-8 text-neutral-10">{secondarySystemIntro.lead}</p>
              </div>
              <div className="flex flex-col gap-5">
                {secondarySystemIntro.paragraphs.map((text) => (
                  <p key={text.slice(0, 24)} className="m-paragraph">
                    {text}
                  </p>
                ))}
              </div>
              <nav aria-label="On this page" className="border border-black/10 bg-neutral-1 p-6 max-xs:p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">On this page</p>
                <ol className="mt-4 flex flex-col gap-2">
                  {secondaryParts.map((part, i) => (
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
                  <li>
                    <a
                      href="#ss-sections"
                      className="group flex items-center gap-4 border border-black/10 bg-white px-5 py-3.5 transition-[border-color] duration-300 hover:border-accent"
                    >
                      <span className="font-heading text-[13px] font-semibold text-neutral-5 tabular-nums">04</span>
                      <span className="flex-1 font-heading text-[17px] font-semibold text-neutral-10 transition-colors group-hover:text-accent">
                        Sections &amp; details
                      </span>
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 text-neutral-4 transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </a>
                  </li>
                </ol>
              </nav>
            </div>

            {/* The catalogue's Z and C profile drawing: a cut-out on a transparent
                background, so it goes straight onto the page rather than into a framed plate. */}
            <figure className="flex flex-col gap-5" data-reveal="up">
              <div className="flex justify-center border border-black/10 bg-neutral-1 px-8 py-10 max-xs:px-5 max-xs:py-8">
                <Image
                  src={siteImages.secondarySections.src}
                  alt={siteImages.secondarySections.alt}
                  width={250}
                  height={542}
                  className="h-auto w-full max-w-[300px]"
                />
              </div>
              <figcaption className="text-[13px] leading-[1.5] text-neutral-6">
                The two cold-formed profiles the secondary members are formed from: Z for the purlins and
                sidewall girts, C for the endwall girts and framed openings. The{' '}
                <Link href="/about-peb/primary-system" className="m-link">
                  primary system
                </Link>{' '}
                has a page of its own.
              </figcaption>
              {/* The members made from these profiles, and what they bear on. */}
              <dl className="grid grid-cols-2 gap-x-8 border border-black/10 bg-neutral-1 px-6 py-3 max-sm:grid-cols-1 max-xs:px-5">
                {drawingLegend.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-0.5 border-b border-black/10 py-3 max-sm:last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <dt className="font-heading text-[15px] font-bold leading-[1.35] text-accent">{item.label}</dt>
                    <dd className="text-[14px] leading-[1.5] text-neutral-8">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------- the three parts ---------------- */}
      {secondaryParts.map((part, i) => {
        const dark = i % 2 === 1
        const photo = PART_PHOTO[part.slug]
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
                    <div className={cn('mt-4 border p-6', dark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-neutral-1')}>
                      <h3 className={cn('font-heading text-[18px] font-semibold', dark ? 'text-white' : 'text-neutral-10')}>
                        At a glance
                      </h3>
                      <dl className="mt-2 grid grid-cols-2 gap-x-8 max-sm:grid-cols-1">
                        {part.specs.map((row) => (
                          <div
                            key={row.label}
                            className={cn('flex flex-col gap-0.5 border-b py-3', dark ? 'border-white/15' : 'border-black/10')}
                          >
                            <dt className={cn('text-[13px] font-semibold', dark ? 'text-neutral-3' : 'text-neutral-6')}>{row.label}</dt>
                            <dd className={cn('text-[15px] leading-[1.5]', dark ? 'text-white' : 'text-neutral-10')}>{row.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5" data-reveal="up">
                    {photo && (
                      <figure className={cn('border p-3', dark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-white')}>
                        <ImageFrame image={photo.image} ratio="16/10" sizes="(min-width: 1024px) 34vw, 100vw" captioned />
                        <figcaption className={cn('mt-3 px-2 text-[13px] leading-[1.5]', dark ? 'text-neutral-2' : 'text-neutral-6')}>
                          {photo.caption}
                        </figcaption>
                      </figure>
                    )}
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ---------------- sections and details ---------------- */}
      <section className="m-section scroll-mt-6 bg-neutral-1" id="ss-sections" aria-labelledby="ss-sections-title">
        <div className="m-container">
          <div className="flex flex-col gap-14 max-xs:gap-10">
            <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6" data-reveal="up">
              <div className="max-w-[640px]">
                <SectionIntro subtitle="Sections & details" title={<span id="ss-sections-title">Two profiles, and the parts that join them.</span>} />
              </div>
              <p className="mb-2 max-w-[440px] text-[18px] leading-[1.5] text-neutral-8 max-md:text-[16px]">
                Every purlin, girt and eave strut is roll-formed into one of two profiles, and the same
                handful of details connects all of them to the frame.
              </p>
            </div>

            {/* The two profiles. */}
            <ol className="grid grid-cols-2 gap-5 max-md:grid-cols-1" data-reveal-stagger>
              {sectionProfiles.map((profile) => (
                <li key={profile.code} className="flex flex-col border border-secondary/15 bg-white">
                  <div className="flex items-start justify-between gap-6 border-b border-black/10 p-7 max-xs:p-6">
                    <div>
                      <h3 className="font-heading text-[24px] font-bold leading-(--lh-sm) text-neutral-10 max-xs:text-[22px]">
                        {profile.name}
                      </h3>
                      <p className="mt-1.5 text-[14px] font-semibold text-accent">{profile.use}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="m-icon-box h-14 w-14 shrink-0 font-heading text-[28px] font-bold leading-none"
                    >
                      {profile.code}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-7 max-xs:p-6">
                    <p className="m-paragraph medium">{profile.text}</p>
                    <ul className="mt-auto flex flex-col gap-2.5 border-t border-black/10 pt-5">
                      {profile.where.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.5] text-neutral-8">
                          <Check size={17} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            {/* The connecting details. */}
            <ul className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1" data-reveal-stagger aria-label="Connection details">
              {secondaryDetails.map((detail, n) => {
                const Icon = DETAIL_ICONS[n] ?? Check
                return (
                  <li
                    key={detail.title}
                    className="flex flex-col gap-5 border border-secondary/15 bg-white p-7 transition-colors duration-300 hover:border-accent max-xs:p-6"
                  >
                    <span className="m-icon-box h-12 w-12">
                      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-[19px] font-bold leading-(--lh-sm) text-neutral-10">{detail.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.55] text-neutral-8">{detail.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="m-section" aria-labelledby="ss-faq">
        <div className="m-container">
          <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-12">
            <div className="w-full max-w-[440px] lg:sticky lg:top-12" data-reveal="up">
              <SectionIntro subtitle="FAQ" title={<span id="ss-faq">Questions about the secondary system.</span>} />
              <p className="m-paragraph mt-8">
                For the frames the purlins and girts span between, see the{' '}
                <Link href="/about-peb/primary-system" className="m-link">
                  Primary System
                </Link>
                . For cladding and accessories, see{' '}
                <Link href="/about-peb" className="m-link">
                  About PEB
                </Link>
                .
              </p>
            </div>
            <dl className="w-full max-w-[760px] max-lg:max-w-none" data-reveal="up">
              {secondarySystemFaq.map((item, i) => (
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
              title="Tell us what the roof and walls have to carry."
              className="max-w-[640px]"
            />
            <p className="max-w-[560px] text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]">
              The sheeting, insulation, openings and site location are enough for DSI to fix the purlin
              and girt layout with the frame.
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

export const Route = createFileRoute('/about-peb_/secondary-system')({
  head: () => ({
    meta: [
      { title: secondarySystemMeta.title },
      { name: 'description', content: secondarySystemMeta.description },
      { property: 'og:title', content: secondarySystemMeta.title },
      { property: 'og:description', content: secondarySystemMeta.description },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `${company.siteUrl}${PATH}` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}${PATH}` }],
  }),
  component: SecondarySystemPage,
})
