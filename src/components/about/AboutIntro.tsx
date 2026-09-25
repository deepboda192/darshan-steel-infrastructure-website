import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, X } from 'lucide-react'
import { company, yearsOfExperience } from '@/data/company'
import { emphasise } from '@/lib/emphasise'
import { heroVideo, siteImages } from '@/data/images'
import Link from '@/components/site/NextLink'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Counter } from '@/components/sections/Counter'
import { cn } from '@/lib/cn'

type Metric = (typeof company.metrics)[number]

/**
 * Who we are — the reference's about block.
 *
 * The eyebrow beside the positioning statement and the company paragraph;
 * beneath, a still with the way to the projects on the left and the two big
 * figures (years of experience, projects delivered) on the right; then the
 * film box with its play button and the two figure plates. Every figure is
 * a `company.metrics` entry or derived from the establishment year.
 */
export function AboutIntro() {
  const projects = company.metrics.find((m) => m.key === 'projects')
  const capacity = company.metrics.find((m) => m.key === 'capacity')
  const area = company.metrics.find((m) => m.key === 'area')

  return (
    <section className="m-section overflow-hidden" aria-label="Who we are">
      <div className="m-container">
        <div className="flex flex-col gap-20 max-xs:gap-[72px]">
          {/* ---------------- statement ---------------- */}
          <div
            className="flex items-start justify-between gap-4 max-lg:flex-col max-lg:gap-8 max-xs:gap-6"
            data-reveal="up"
          >
            <p className="m-subtitle">Who we are</p>
            <div className="w-full max-w-[800px]">
              <h2 className="m-h2">One team, one structure.</h2>
              <p className="mt-6 border-b border-black/20 pb-12 text-[18px] leading-[1.5] text-neutral-8">
                {emphasise(company.about, company.aboutEmphasis)}
              </p>
            </div>
          </div>

          {/* ---------------- still + big figures ---------------- */}
          <div
            className="flex items-start justify-between gap-4 max-lg:flex-col max-lg:gap-16"
            data-reveal="up"
          >
            <div className="flex flex-col items-start gap-4">
              <div className="relative h-[180px] w-[280px] bg-neutral-1 max-xs:w-full">
                <ImageFrame image={siteImages.aboutProjects} ratio="fill" sizes="280px" />
              </div>
              <Link
                href="/projects"
                className="group relative flex items-center gap-2 pb-1.5 font-heading text-[16px] font-semibold uppercase text-neutral-10"
              >
                Our projects
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-300 group-hover:scale-x-50"
                />
              </Link>
            </div>

            <div className="flex w-full max-w-[800px] justify-between gap-6 pt-9 max-md:pt-8 max-xs:flex-col max-xs:gap-[54px]">
              <BigStat value={yearsOfExperience} suffix="+" label="Years of experience" />
              {projects && (
                <BigStat
                  value={projects.value}
                  suffix={projects.suffix}
                  label={projects.label}
                  placeholder={projects.placeholder}
                />
              )}
            </div>
          </div>

          {/* ---------------- film + figure plates ---------------- */}
          <div className="flex flex-col gap-5">
            <FilmBox />
            <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1 max-xs:gap-3.5">
              {capacity && <FigurePlate metric={capacity} tone="accent" reveal="right" />}
              {area && <FigurePlate metric={area} tone="dark" reveal="left" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** A figure at display size with its suffix in the accent — `big-stat-box`. */
function BigStat({
  value,
  suffix,
  label,
  placeholder,
}: {
  value: number
  suffix: string
  label: string
  placeholder?: boolean
}) {
  return (
    <div className="flex flex-col" data-placeholder={placeholder ? 'true' : undefined}>
      <div className="flex items-start gap-1.5">
        <p className="font-heading text-[160px] font-semibold leading-none text-neutral-10 max-md:text-[90px] max-xs:text-[70px]">
          <span data-counter={value}>{value.toLocaleString('en-IN')}</span>
        </p>
        {suffix && (
          <p className="font-heading text-[80px] font-semibold leading-none text-accent max-md:text-[48px] max-xs:text-[40px]">
            {suffix}
          </p>
        )}
      </div>
      <p className="mt-2 uppercase text-neutral-8">{label}</p>
    </div>
  )
}

/** A filled plate carrying a figure and its note — `about-bottom-stat-box`. */
function FigurePlate({
  metric,
  tone,
  reveal,
}: {
  metric: Metric
  tone: 'accent' | 'dark'
  reveal: 'left' | 'right'
}) {
  return (
    <div
      className={cn(
        'px-12 py-10 text-white max-md:p-8 max-xs:p-6',
        tone === 'accent' ? 'bg-accent' : 'bg-secondary',
      )}
      data-reveal={reveal}
      data-placeholder={metric.placeholder ? 'true' : undefined}
    >
      <p className="mb-10 flex flex-wrap items-baseline gap-x-3 font-heading text-[90px] font-semibold leading-none max-md:mb-8 max-md:text-[80px] max-xs:mb-6 max-xs:text-[64px]">
        <Counter metric={metric} />
        {metric.unit && <span className="text-[28px] font-medium max-xs:text-[22px]">{metric.unit}</span>}
      </p>
      <p className="max-w-[500px] text-[18px] leading-[1.5] max-md:text-[16px] max-xs:text-[14px]">
        {metric.label} — {metric.note.charAt(0).toLowerCase() + metric.note.slice(1)}.
      </p>
    </div>
  )
}

/**
 * The film box — a still of the works with the reference's pulsing play
 * button; the film opens in a native <dialog> with its own controls.
 */
function FilmBox() {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && dialog && !dialog.open) dialog.showModal()
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const close = () => {
    videoRef.current?.pause()
    dialogRef.current?.close()
    setOpen(false)
  }
  const onClose = () => {
    videoRef.current?.pause()
    if (!dialogRef.current?.open) setOpen(false)
  }

  return (
    <>
      <div
        className="relative flex h-[650px] items-center justify-center overflow-hidden bg-neutral-1 max-md:h-[420px] max-xs:h-[320px]"
        data-reveal="up"
      >
        <div className="absolute inset-0">
          <ImageFrame image={siteImages.aboutFilm} ratio="fill" sizes="(min-width: 1370px) 1310px, 100vw" />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play the film"
          className="relative z-10 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white text-accent"
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-white/50 motion-safe:animate-ping" />
          <Play size={26} className="relative ml-1.5" fill="currentColor" aria-hidden="true" />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        onCancel={() => setOpen(false)}
        onClose={onClose}
        aria-label="The film"
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
      >
        {open && (
          <div
            className="relative flex h-full w-full items-center justify-center p-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) close()
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-white/60 text-white transition-colors duration-[250ms] hover:border-accent hover:bg-accent"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <video
              ref={videoRef}
              src={heroVideo.src}
              controls
              playsInline
              autoPlay
              className="max-h-[80vh] max-w-[92vw] bg-black"
            />
          </div>
        )}
      </dialog>
    </>
  )
}
