import { siteImages } from '@/data/images'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/animations/Reveal'
import { Arrow } from '@/components/ui/Arrow'

const DISCIPLINES = ['PEB Manufacturing', 'Structural Steel', 'Engineering & Erection']
const CHAIN = ['Design', 'Fabrication', 'Delivery', 'Erection']

/**
 * Homepage hero.
 *
 * Full-height, dark, image-led. The headline reveals line by line behind a
 * mask, the background settles from a 1.06 scale, and the technical strip at
 * the foot states the delivery chain in four words. Everything else is
 * restraint — one blue accent word, one blue button.
 */
export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal on-dark"
      aria-label="Introduction"
    >
      {/* ---------------- background ---------------- */}
      <div className="absolute inset-0">
        <ImageFrame
          image={siteImages.hero}
          tone="dark"
          ratio="fill"
          reveal={false}
          priority
          grain
          scrim={72}
          scrimStyle="editorial"
          sizes="100vw"
          showLabel={false}
          className="dsi-hero-media"
        />
      </div>

      {/* structural grid wash over the image */}
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.05]"
      />

      {/* ---------------- content ---------------- */}
      <div className="container-site relative z-10 pb-10 pt-32 md:pb-14">
        {/* disciplines */}
        <Reveal delay={0.15}>
          <ul className="mb-8 flex flex-wrap items-center gap-x-7 gap-y-3 tech text-white/55">
            {DISCIPLINES.map((d, i) => (
              <li key={d} className="flex items-center gap-7">
                {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/25" />}
                {d}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* headline */}
        <h1 className="font-display wdth-wide text-display-1 uppercase text-white">
          <Reveal variant="line" delay={0.28}>
            Engineered
          </Reveal>
          <Reveal variant="line" delay={0.38}>
            <span>For </span>
            <span className="text-brand">Industry.</span>
          </Reveal>
        </h1>

        <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.5} className="lg:col-span-6">
            <p className="measure text-lead text-white/70">
              From design and engineering to fabrication and erection, Darshan Steel
              Infrastructure delivers complete Pre-Engineered Building solutions for modern
              industrial spaces.
            </p>
          </Reveal>

          <Reveal delay={0.58} className="lg:col-span-5 lg:col-start-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:justify-end">
              <Button href="/contact" size="lg" arrow>
                Start Your Project
              </Button>
              <Button href="/manufacturing" variant="secondary" tone="dark" size="lg">
                Explore Capabilities
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------------- delivery chain strip ---------------- */}
      <Reveal delay={0.7} className="relative z-10 border-t border-white/15">
        <div className="container-site">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-4 py-6 tech text-white/60 sm:gap-x-8">
            {CHAIN.map((step, i) => (
              <li key={step} className="flex items-center gap-5 sm:gap-8">
                {i > 0 && <Arrow size={13} className="text-brand" />}
                <span className={i === 0 ? 'text-white' : undefined}>{step}</span>
              </li>
            ))}
            <li className="ml-auto hidden items-center gap-3 text-white/55 lg:flex">
              <span className="h-px w-10 bg-white/25" aria-hidden="true" />
              Scroll
            </li>
          </ul>
        </div>
      </Reveal>

      {/* entry zoom on the background only */}
      <style>{`
        .dsi-hero-media { animation: dsi-hero-settle 2200ms var(--ease-expo) both; }
        @keyframes dsi-hero-settle {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .dsi-hero-media { animation: none; }
        }
      `}</style>
    </section>
  )
}
