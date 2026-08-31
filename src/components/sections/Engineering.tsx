import { siteImages } from '@/data/images'
import { engineeringCapabilities } from '@/data/capabilities'
import { ImageFrame } from '@/components/media/ImageFrame'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/ui/TechLabel'
import { Button } from '@/components/ui/Button'

/**
 * Engineering.
 *
 * The dark band of the page. A blueprint grid runs behind everything and a
 * drawn corner bracket strokes itself in as the section enters view — the one
 * line-drawing animation on the site, so it still reads as a detail rather
 * than a gimmick.
 */
export function Engineering() {
  return (
    <section className="relative overflow-hidden bg-ink on-dark py-24 md:py-32 lg:py-40" aria-label="Engineering">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.055]"
      />
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 opacity-[0.13]"
      />

      <div className="container-site relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- content ---------------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <TechLabel index="06" rule tone="light" className="mb-7">
                Engineering & Detailing
              </TechLabel>
            </Reveal>

            <h2 className="font-display wdth-wide text-display-3 uppercase text-white">
              <Reveal variant="line" delay={0.06}>
                Engineering
              </Reveal>
              <Reveal variant="line" delay={0.14}>
                every connection.
              </Reveal>
            </h2>

            <Reveal delay={0.22}>
              <p className="measure mt-8 text-lead text-white/65">
                A frame is only as good as the joints that hold it together. Every connection is
                analysed, detailed and drawn — bolt group, plate thickness, weld size and stiffener
                position — before a single plate is cut.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="mt-12 border-t border-white/12">
                {engineeringCapabilities.map((capability) => (
                  <div
                    key={capability.index}
                    className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-white/12 py-6"
                  >
                    <dt className="tech pt-1 text-white/55 tabular">{capability.index}</dt>
                    <dd>
                      <p className="text-small font-medium text-white">{capability.title}</p>
                      <p className="mt-1.5 text-small text-white/55">{capability.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-11">
                <Button href="/quality-engineering" variant="secondary" tone="dark" arrow>
                  Quality & Engineering
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------------- drawing ---------------- */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.12} className="relative">
              {/* drawn corner bracket, strokes itself in */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                className="dsi-bracket pointer-events-none absolute -left-4 -top-4 z-10 h-16 w-16 md:-left-7 md:-top-7 md:h-24 md:w-24"
              >
                <path
                  d="M2 78 V2 H78"
                  fill="none"
                  stroke="#0055A5"
                  strokeWidth="6"
                  pathLength={1}
                />
              </svg>

              <ImageFrame
                image={siteImages.engineering}
                tone="dark"
                ratio="4/5"
                reveal={false}
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-6 flex items-start gap-4 text-small text-white/55">
                <span className="tech mt-[0.35rem] shrink-0 text-white/55">Fig. 05</span>
                <span className="measure">
                  Haunch connection. End plate, bolt group and stiffeners detailed to the forces
                  the joint actually carries.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .dsi-bracket path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: dsi-draw 1400ms var(--ease-expo) 260ms forwards;
        }
        @keyframes dsi-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .dsi-bracket path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  )
}
