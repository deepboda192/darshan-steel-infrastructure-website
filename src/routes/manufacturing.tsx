import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CalendarCheck, Check, ExternalLink, FileCheck2, Layers3, X } from 'lucide-react'
import { company, yearsOfExperience } from '@/data/company'
import { qualityChecks, shopCapabilities } from '@/data/capabilities'
import { siteImages } from '@/data/images'
import {
  capacityMetricKeys,
  certificateCommon,
  certifications,
  type Certification,
  machineProcesses,
  machines,
  manufacturingIntro,
  manufacturingMeta,
  type Machine,
  type MachineProcess,
} from '@/data/manufacturing'
import { useMotion } from '@/lib/motion'
import { breadcrumbSchema, JsonLd, type Json } from '@/lib/schema'
import { cn } from '@/lib/cn'
import { InnerHero } from '@/components/site/InnerHero'
import { SectionIntro } from '@/components/site/SectionIntro'
import { Button } from '@/components/site/Button'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Counter } from '@/components/sections/Counter'
import Image from '@/components/media/NextImage'
import Link from '@/components/site/NextLink'

const PATH = '/manufacturing'

/** Value of the machine filter that shows every type. */
const ALL = 'all'

/** The capacity tiles alternate accent, dark, light, dark. */
const TILE_TONES = ['accent', 'dark', 'light', 'dark'] as const

function placeSchema(): Json {
  const works = company.works[0]
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${company.name} works`,
    address: { '@type': 'PostalAddress', streetAddress: works.address, addressCountry: 'IN' },
    hasMap: works.mapsQuery,
  }
}

/**
 * Manufacturing — the works at Chhattar: the intro with the capacity tiles,
 * the shop's processes from plate to dispatch, the three TÜV SÜD
 * certifications in detail with the quality hold points, and every machine
 * on the floor as a filterable grid. Copy and data live in
 * data/manufacturing.ts; the capacity figures are company.metrics.
 */
function ManufacturingPage() {
  useMotion()
  const [process, setProcess] = useState<MachineProcess | typeof ALL>(ALL)
  const [openCert, setOpenCert] = useState<Certification | null>(null)

  const tiles = capacityMetricKeys
    .map((key) => company.metrics.find((m) => m.key === key))
    .filter((m): m is (typeof company.metrics)[number] => Boolean(m))
  const shown = process === ALL ? machines : machines.filter((m) => m.process === process)
  const processesInUse = machineProcesses.filter((p) => machines.some((m) => m.process === p.slug))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Manufacturing', path: PATH },
          ]),
          placeSchema(),
        ]}
      />

      <InnerHero
        title="Manufacturing"
        image={siteImages.manufacturingHero}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Manufacturing' }]}
      />

      {/* ---------------- intro + capacity ---------------- */}
      <section className="m-section" aria-labelledby="mf-intro">
        <div className="m-container">
          <div className="grid grid-cols-[1fr_1.15fr] items-start gap-16 max-lg:grid-cols-1 max-lg:gap-12">
            <div className="flex flex-col gap-10 lg:sticky lg:top-24" data-reveal="up">
              <div>
                <SectionIntro subtitle="The works" title={<span id="mf-intro">One roof, every process.</span>} />
                <p className="m-paragraph large mt-8 text-neutral-10">{manufacturingIntro.lead}</p>
              </div>
              <div className="flex flex-col gap-5">
                {manufacturingIntro.paragraphs.map((text) => (
                  <p key={text.slice(0, 24)} className="m-paragraph">
                    {text}
                  </p>
                ))}
              </div>
              <nav aria-label="On this page" className="border border-black/10 bg-neutral-1 p-6 max-xs:p-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">On this page</p>
                <ol className="mt-4 flex flex-col gap-2">
                  {[
                    { href: '#mf-capacity', title: 'Capacity' },
                    { href: '#mf-process', title: 'From plate to dispatch' },
                    { href: '#mf-certifications', title: 'ISO certifications' },
                    { href: '#mf-machines', title: 'Machines on the floor' },
                  ].map((item, i) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="group flex items-center gap-4 border border-black/10 bg-white px-5 py-3.5 transition-[border-color] duration-300 hover:border-accent"
                      >
                        <span className="font-heading text-[13px] font-semibold text-neutral-5 tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-heading text-[17px] font-semibold text-neutral-10 transition-colors group-hover:text-accent">
                          {item.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* the capacity tiles */}
            <div id="mf-capacity" className="scroll-mt-24" data-reveal="up">
              <ul className="grid grid-cols-2 gap-5 max-xs:grid-cols-1" aria-label="Capacity">
                {tiles.map((metric, i) => {
                  const tone = TILE_TONES[i % TILE_TONES.length]
                  return (
                    <li
                      key={metric.key}
                      className={cn(
                        'flex min-h-[240px] flex-col justify-between p-8 max-xs:min-h-0 max-xs:p-6',
                        tone === 'accent' && 'bg-accent text-white',
                        tone === 'dark' && 'bg-secondary text-white',
                        tone === 'light' && 'border border-black/10 bg-neutral-1 text-neutral-10',
                      )}
                    >
                      <p
                        className={cn(
                          'border-b pb-4 font-heading text-[18px] font-semibold leading-(--lh-sm)',
                          tone === 'light' ? 'border-black/10' : 'border-white/25',
                        )}
                      >
                        {metric.label}
                      </p>
                      <p className="mt-10 flex flex-wrap items-baseline gap-x-3 font-heading text-[64px] font-semibold leading-none max-md:text-[56px] max-xs:mt-6 max-xs:text-[48px]">
                        <Counter metric={metric} />
                        {metric.unit && <span className="text-[22px] font-medium max-xs:text-[18px]">{metric.unit}</span>}
                      </p>
                      <p className={cn('mt-3 text-[14px] leading-[1.5]', tone === 'light' ? 'text-neutral-7' : 'text-white/80')}>
                        {metric.key === 'years' ? `${yearsOfExperience}+ years of building` : metric.note}
                      </p>
                    </li>
                  )
                })}
              </ul>
              <div className="relative mt-5 overflow-hidden bg-neutral-1 pt-[56%]">
                <div className="absolute inset-0">
                  <ImageFrame image={siteImages.worksAerial} ratio="fill" sizes="(min-width: 1024px) 50vw, 100vw" captioned />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- process ---------------- */}
      <section className="m-section scroll-mt-6 bg-secondary text-white" id="mf-process" aria-labelledby="mf-process-title">
        <div className="m-container">
          <div className="flex flex-col gap-14 max-xs:gap-10">
            <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6" data-reveal="up">
              <div className="max-w-[640px]">
                <SectionIntro tone="light" subtitle="Process" title={<span id="mf-process-title">From plate to dispatch.</span>} />
              </div>
              <p className="mb-2 max-w-[440px] text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]">
                Nine things the shop does to every building, in the order they happen on the floor.
              </p>
            </div>
            <ol className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-xs:grid-cols-1" data-reveal-stagger>
              {shopCapabilities.map((step) => (
                <li key={step.index} className="flex flex-col gap-5 border border-white/20 bg-white/5 p-7 max-xs:p-6">
                  <span className="font-heading text-[40px] font-semibold leading-none text-white/25">{step.index}</span>
                  <div>
                    <h3 className="font-heading text-[20px] font-bold leading-(--lh-sm)">{step.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.55] text-neutral-2">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- certifications ---------------- */}
      <section className="m-section scroll-mt-6" id="mf-certifications" aria-labelledby="mf-cert-title">
        <div className="m-container">
          <div className="flex flex-col gap-14 max-xs:gap-10">
            <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6" data-reveal="up">
              <div className="max-w-[640px]">
                <SectionIntro subtitle="Certifications" title={<span id="mf-cert-title">Three systems, certified by TÜV SÜD.</span>} />
              </div>
              <p className="mb-2 max-w-[440px] text-[18px] leading-[1.5] text-neutral-8 max-md:text-[16px]">
                Quality, environment and safety, each run as a management system that is audited by an
                independent body. The certificates themselves are below.
              </p>
            </div>

            {/* What all three certificates say, read from the scans. */}
            <dl
              className="grid grid-cols-3 gap-5 border border-black/10 bg-neutral-1 p-7 max-lg:grid-cols-1 max-xs:p-5"
              data-reveal="up"
              aria-label="Certificate details"
            >
              <div className="flex gap-4">
                <span className="m-icon-box h-11 w-11 shrink-0">
                  <FileCheck2 size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">Certified scope</dt>
                  <dd className="mt-1 text-[15px] leading-[1.5] text-neutral-10">{certificateCommon.scope}</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="m-icon-box h-11 w-11 shrink-0">
                  <CalendarCheck size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">Validity</dt>
                  <dd className="mt-1 text-[15px] leading-[1.5] text-neutral-10">
                    <time dateTime={certificateCommon.validFrom}>{certificateCommon.validFromLabel}</time> to{' '}
                    <time dateTime={certificateCommon.validUntil}>{certificateCommon.validUntilLabel}</time>
                    <span className="block text-[13px] text-neutral-6">{certificateCommon.condition}</span>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="m-icon-box h-11 w-11 shrink-0">
                  <Check size={20} strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">Certification body</dt>
                  <dd className="mt-1 text-[15px] leading-[1.5] text-neutral-10">{certificateCommon.body}</dd>
                </div>
              </div>
            </dl>

            <ul className="grid grid-cols-3 gap-5 max-lg:grid-cols-1" data-reveal-stagger>
              {certifications.map((cert) => (
                <li key={cert.standard} className="flex flex-col border border-secondary/15 bg-white">
                  <div className="flex items-start justify-between gap-5 border-b border-black/10 p-7 max-xs:p-6">
                    <div>
                      <p className="font-heading text-[26px] font-bold leading-(--lh-sm) text-neutral-10">{cert.standard}</p>
                      <p className="mt-1.5 text-[15px] font-semibold text-accent">{cert.title}</p>
                      <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">Certified by {cert.issuer}</p>
                    </div>
                    <Image src={cert.badge} alt={`${cert.standard} certification mark, ${cert.issuer}`} width={96} height={96} className="h-[88px] w-[88px] shrink-0 object-contain max-xs:h-[72px] max-xs:w-[72px]" />
                  </div>

                  {/* The scanned certificate: a thumbnail that opens the full page. */}
                  <button
                    type="button"
                    onClick={() => setOpenCert(cert)}
                    className="group flex items-center gap-5 border-b border-black/10 bg-neutral-1 p-5 text-left transition-colors hover:bg-white"
                    aria-label={`View the ${cert.standard} certificate`}
                  >
                    <span className="block w-[64px] shrink-0 overflow-hidden border border-black/15 bg-white shadow-[0_4px_12px_#0000001f] transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Image src={cert.document} alt="" width={64} height={91} className="block h-auto w-full" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">Certificate no.</span>
                      <span className="mt-0.5 block font-heading text-[18px] font-bold leading-(--lh-sm) text-neutral-10">{cert.registration}</span>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
                        View certificate
                        <ExternalLink size={14} strokeWidth={2} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col gap-6 p-7 max-xs:p-6">
                    <p className="text-[16px] leading-[1.6] text-neutral-8">{cert.summary}</p>
                    <div>
                      <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">What the standard requires</p>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {cert.covers.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.5] text-neutral-8">
                            <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto border-t border-black/10 pt-6">
                      <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">How it works on the DSI floor</p>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {cert.applied.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.5] text-neutral-8">
                            <Check size={17} strokeWidth={2.2} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* the hold points every member passes */}
            <div className="grid grid-cols-[1fr_2fr] gap-12 border-t border-black/10 pt-12 max-lg:grid-cols-1 max-lg:gap-8" data-reveal="up">
              <div>
                <h3 className="font-heading text-[28px] font-bold leading-(--lh-sm) text-neutral-10 max-xs:text-[24px]">
                  Six hold points on every member
                </h3>
                <p className="m-paragraph mt-3">
                  The quality system in practice: a member does not move to the next stage until the
                  check for the last one is recorded against its mark number.
                </p>
              </div>
              <ol className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {qualityChecks.map((check) => (
                  <li key={check.index} className="flex gap-4 border border-black/10 bg-neutral-1 p-5">
                    <span className="m-icon-box h-10 w-10 shrink-0 font-heading text-[14px] font-bold tabular-nums">{check.index}</span>
                    <div>
                      <h4 className="font-heading text-[17px] font-bold leading-(--lh-sm) text-neutral-10">{check.title}</h4>
                      <p className="mt-1.5 text-[14px] leading-[1.5] text-neutral-7">{check.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <CertificateDialog cert={openCert} onClose={() => setOpenCert(null)} />

      {/* ---------------- machines ---------------- */}
      <section className="m-section scroll-mt-6 bg-neutral-1" id="mf-machines" aria-labelledby="mf-machines-title">
        <div className="m-container">
          <div className="flex flex-col gap-14 max-xs:gap-10">
            <div className="flex items-end justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-6" data-reveal="up">
              <div className="max-w-[640px]">
                <SectionIntro subtitle="Plant & machinery" title={<span id="mf-machines-title">Machines on the floor.</span>} />
              </div>
            </div>

            {/* filter: on phones the chips stay on one line and scroll sideways. */}
            <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:items-start max-md:gap-4" data-reveal="up">
              <div
                role="group"
                aria-label="Filter by process"
                className="flex flex-wrap gap-2.5 max-md:-mx-(--container-pad) max-md:flex-nowrap max-md:overflow-x-auto max-md:px-(--container-pad) max-md:pb-1 max-md:[scrollbar-width:none]"
              >
                <button type="button" className="m-chip" aria-pressed={process === ALL} onClick={() => setProcess(ALL)}>
                  All
                </button>
                {processesInUse.map((p) => (
                  <button key={p.slug} type="button" className="m-chip" aria-pressed={process === p.slug} onClick={() => setProcess(p.slug)}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* The entrance runs on the list, not the cards: cards come and go with the filter. */}
            <ul className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1" data-reveal="up">
              {shown.map((machine, i) => (
                <li key={machine.slug}>
                  <MachineCard machine={machine} priority={i < 3} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- closing ---------------- */}
      <section className="m-section bg-secondary text-white" aria-label="Visit the works">
        <div className="m-container">
          <div className="flex flex-col items-center gap-8 text-center" data-reveal="up">
            <SectionIntro
              tone="light"
              align="center"
              subtitle="Next step"
              title="See the works for yourself."
              className="max-w-[640px]"
            />
            <p className="max-w-[560px] text-[18px] leading-[1.5] text-neutral-1 max-md:text-[16px]">
              Clients and consultants are welcome at Chhattar to walk the floor and see their steel
              being made. Ask for a visit, or send us the building and we will send you the programme.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/?intent=consult#contact">Arrange a visit</Button>
              <Button href="/about-peb" variant="outline" tone="dark">
                About PEB
              </Button>
            </div>
            <p className="text-[14px] text-neutral-3">
              <Link href={company.works[0].mapsQuery} className="m-link light text-[14px]">
                {company.works[0].address}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

/**
 * Certificate lightbox — a native dialog with the scanned certificate at
 * reading size, its number and validity, and a link to the file itself.
 * Escape and a click on the backdrop close it.
 */
function CertificateDialog({ cert, onClose }: { cert: Certification | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (cert && !dialog.open) dialog.showModal()
    if (!cert && dialog.open) dialog.close()
  }, [cert])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-label={cert ? `${cert.standard} certificate` : 'Certificate'}
      className="m-auto w-[min(92vw,720px)] border-0 bg-white p-0 shadow-[0_24px_64px_#0006] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {cert && (
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-6 border-b border-black/10 px-6 py-5">
            <div>
              <p className="font-heading text-[20px] font-bold leading-(--lh-sm) text-neutral-10">{cert.standard}</p>
              <p className="mt-1 text-[14px] text-neutral-7">
                Certificate no. {cert.registration} · Valid {certificateCommon.validFromLabel} to {certificateCommon.validUntilLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 text-neutral-8 transition-colors hover:border-accent hover:text-accent"
            >
              <X size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
          <div className="max-h-[72vh] overflow-y-auto bg-neutral-2 p-4">
            <img src={cert.document} alt={`Scanned ${cert.standard} certificate issued to ${company.name} by ${certificateCommon.body}`} className="mx-auto block h-auto w-full max-w-[640px] shadow-[0_8px_24px_#0003]" />
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-black/10 px-6 py-4 max-xs:flex-col max-xs:items-start">
            <p className="text-[13px] text-neutral-6">Scope: {certificateCommon.scope}.</p>
            <a
              href={cert.document}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 font-heading text-[14px] font-semibold uppercase text-accent"
            >
              Open full size
              <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </dialog>
  )
}

/**
 * Machine card — the photograph (with a unit count where there are several),
 * the name, its job in one line, the operation, the headline specifications,
 * and for units that differ, each one's size. The plant codes and makes are
 * kept in the data but not shown (user's choice, 2026-09-29).
 */
function MachineCard({ machine, priority = false }: { machine: Machine; priority?: boolean }) {
  const multiple = machine.units.length > 1
  return (
    <article className="flex h-full flex-col border border-secondary/15 bg-white transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_16px_40px_#0000001a]">
      <div className="relative overflow-hidden bg-neutral-1">
        <ImageFrame image={machine.image} ratio="16/10" zoom priority={priority} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
        {multiple && <span className="m-tag absolute left-5 top-5 z-10 text-[14px]">{machine.units.length} units</span>}
      </div>
      <div className="flex flex-1 flex-col p-7 max-xs:p-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">
          {machineProcesses.find((p) => p.slug === machine.process)?.name}
        </p>
        <h3 className="mt-2 font-heading text-[22px] font-bold leading-(--lh-sm) text-neutral-10 max-xs:text-[20px]">{machine.name}</h3>
        <p className="mt-3 text-[15px] leading-[1.55] text-neutral-8">{machine.role}</p>

        {/* Makes stay in the data but are not shown (user's choice, 2026-09-29). */}
        <dl className="mt-5 flex flex-col border-t border-black/10">
          <div className="grid grid-cols-[112px_1fr] gap-3 border-b border-black/10 py-2.5 text-[14px] leading-[1.5]">
            <dt className="font-semibold text-neutral-10">Operation</dt>
            <dd className="text-neutral-8">{machine.operation}</dd>
          </div>
          {machine.specs.map((row) => (
            <div key={row.label} className="grid grid-cols-[112px_1fr] gap-3 border-b border-black/10 py-2.5 text-[14px] leading-[1.5]">
              <dt className="font-semibold text-neutral-10">{row.label}</dt>
              <dd className="text-neutral-8">{row.value}</dd>
            </div>
          ))}
        </dl>

        {multiple && (
          <div className="mt-auto pt-5">
            <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.5px] text-neutral-6">
              <Layers3 size={14} strokeWidth={2} aria-hidden="true" className="text-accent" />
              {machine.units.length} units on the floor
            </p>
            {/* Units that differ from each other are listed by size; codes and makes stay in the data only. */}
            {machine.units.some((u) => u.note) && (
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {machine.units.map(
                  (unit) =>
                    unit.note && (
                      <li key={unit.code} className="border border-black/10 bg-neutral-1 px-2.5 py-1 text-[12px] font-medium text-neutral-8">
                        {unit.note}
                      </li>
                    ),
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export const Route = createFileRoute('/manufacturing')({
  head: () => ({
    meta: [
      { title: manufacturingMeta.title },
      { name: 'description', content: manufacturingMeta.description },
      { property: 'og:title', content: manufacturingMeta.title },
      { property: 'og:description', content: manufacturingMeta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${company.siteUrl}${PATH}` },
      { property: 'og:image', content: `${company.siteUrl}/images/works-aerial.webp` },
    ],
    links: [{ rel: 'canonical', href: `${company.siteUrl}${PATH}` }],
  }),
  component: ManufacturingPage,
})
