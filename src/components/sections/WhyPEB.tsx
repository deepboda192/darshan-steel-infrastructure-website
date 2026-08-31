import { pebAdvantages } from '@/data/capabilities'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/site/TechLabel'

/**
 * Why PEB.
 *
 * The four advantages carry the argument, and the drawing beside them makes
 * the strongest one visible: in a pre-engineered frame the section depth
 * follows the bending moment, so steel sits where the load actually is. A real
 * structural diagram rather than a row of generic icons.
 */
function TaperDiagram() {
  /* ------------------------------------------------------------------ frame */
  const L = 168 // left column centreline
  const R = 632 // right column centreline
  const MID = (L + R) / 2
  const BASE = 356 // foundation level
  const EAVE = 168 // haunch level
  const RIDGE = 96 // apex

  // Section depths. The haunch is the deepest point on the frame; the base and
  // the ridge carry the least moment and are drawn shallowest.
  const dBase = 11
  const dHaunch = 33
  const dRidge = 13

  /** Column: outer face near-vertical, inner face opening toward the haunch. */
  const column = (x: number, sign: number) =>
    `M${x - sign * dBase},${BASE} L${x + sign * dBase},${BASE} ` +
    `L${x + sign * dHaunch},${EAVE} L${x - sign * dHaunch * 0.3},${EAVE} Z`

  /** Rafter: depth tapers from the haunch down to the ridge. */
  const rafter = (from: number, to: number) => {
    const steps = Array.from({ length: 25 }, (_, i) => i / 24)
    const pt = (t: number, lower: boolean) => {
      const x = from + (to - from) * t
      const y =
        EAVE + (RIDGE - EAVE) * t + (lower ? dHaunch * 2 - (dHaunch * 2 - dRidge * 2) * t : 0)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    }
    const top = steps.map((t) => pt(t, false))
    const bottom = [...steps].reverse().map((t) => pt(t, true))
    return `M${[...top, ...bottom].join(' L')} Z`
  }

  const mono = 'var(--font-mono), ui-monospace, monospace'

  return (
    <svg
      viewBox="0 0 800 460"
      className="h-auto w-full"
      role="img"
      aria-label="A tapered steel portal frame in elevation. The section is deepest at the two haunches, where the bending moment is greatest, and shallowest at the pinned column bases, where the moment is zero."
    >
      {/* drawing grid */}
      <g stroke="#262324" strokeOpacity="0.055" strokeWidth="1">
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="460" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
        ))}
      </g>

      {/* ---------------- the frame ---------------- */}
      <g fill="#262324" fillOpacity="0.92">
        <path d={column(L, 1)} />
        <path d={column(R, -1)} />
        <path d={rafter(L, MID)} />
        <path d={rafter(R, MID)} />
      </g>

      {/* haunches — the deepest sections, marked in brand blue */}
      <g stroke="#0055A5" strokeWidth="4">
        <line x1={L - dHaunch * 0.3} y1={EAVE} x2={L + dHaunch} y2={EAVE} />
        <line x1={R - dHaunch} y1={EAVE} x2={R + dHaunch * 0.3} y2={EAVE} />
      </g>

      {/* ground line and pinned bases */}
      <line x1="80" y1={BASE} x2="720" y2={BASE} stroke="#262324" strokeOpacity="0.3" strokeWidth="1.5" />
      <g fill="none" stroke="#262324" strokeOpacity="0.4" strokeWidth="1.5">
        <path d={`M${L - 14},${BASE + 22} L${L},${BASE} L${L + 14},${BASE + 22}`} />
        <path d={`M${R - 14},${BASE + 22} L${R},${BASE} L${R + 14},${BASE + 22}`} />
      </g>

      {/* ---------------- depth callouts ---------------- */}
      <g stroke="#667085" strokeOpacity="0.6" strokeWidth="1" fill="none">
        {/* ridge — shallow */}
        <path d={`M${MID + 16},${RIDGE + dRidge} L${MID + 96},${RIDGE - 18} L${MID + 150},${RIDGE - 18}`} />
        {/* haunch — deepest */}
        <path
          d={`M${L + dHaunch + 6},${EAVE + 10} L${L + 96},${EAVE + 76} L${L + 168},${EAVE + 76}`}
          stroke="#0055A5"
          strokeOpacity="0.75"
        />
        {/* base — shallow */}
        <path d={`M${L - dBase - 6},${BASE - 22} L${L - 70},${BASE - 62} L${L - 128},${BASE - 62}`} />
      </g>

      <g fill="#667085" fontFamily={mono} fontSize="13" letterSpacing="1.6">
        {/* Pinned bases carry zero moment, so the base is the shallowest
            section; the apex retains a sagging moment and is drawn deeper.
            The geometry above (dBase 11 < dRidge 13 < dHaunch 33) matches. */}
        <text x={MID + 156} y={RIDGE - 22}>RIDGE — SHALLOW</text>
        <text x={40} y={BASE - 66}>BASE — SHALLOWEST</text>
        <text x={L + 96} y={EAVE + 98} fill="#0055A5">
          HAUNCH — DEEPEST SECTION
        </text>
      </g>

      {/* ---------------- span + eave dimensions ---------------- */}
      <g stroke="#262324" strokeOpacity="0.32" strokeWidth="1">
        <line x1={L} y1="416" x2={R} y2="416" />
        <line x1={L} y1="408" x2={L} y2="424" />
        <line x1={R} y1="408" x2={R} y2="424" />
        {/* eave height */}
        <line x1="716" y1={EAVE} x2="716" y2={BASE} />
        <line x1="708" y1={EAVE} x2="724" y2={EAVE} />
        <line x1="708" y1={BASE} x2="724" y2={BASE} />
      </g>
      <g fill="#667085" fontFamily={mono} fontSize="13" letterSpacing="1.6">
        <text x={MID} y="406" textAnchor="middle">
          CLEAR SPAN
        </text>
        <text x="736" y={(EAVE + BASE) / 2} dominantBaseline="middle">
          EAVE
        </text>
      </g>
    </svg>
  )
}

export function WhyPEB() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40" aria-label="Why pre-engineered buildings">
      <div className="container-site">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ---------------- argument ---------------- */}
          <div className="lg:col-span-5">
            <SectionHeader
              index="03"
              eyebrow="Why PEB"
              size="md"
              title={
                <>
                  Built smarter.
                  {' '}<br />
                  Built faster.
                </>
              }
              lead="Pre-engineered buildings combine engineering precision, controlled manufacturing and efficient site execution — structures that are faster to build, flexible to expand and optimised for industrial requirements."
            />
          </div>

          {/* ---------------- diagram ---------------- */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <figure>
                <div className="border border-charcoal/10 bg-offwhite p-6 md:p-10">
                  <TaperDiagram />
                </div>
                <figcaption className="mt-5 flex items-start gap-4 text-small text-muted">
                  <span className="tech mt-[0.35rem] shrink-0 text-charcoal/45">Fig. 02</span>
                  <span className="measure">
                    Section depth follows the bending moment. Steel is placed where the load
                    actually is, rather than spread evenly along the member.
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* ---------------- four advantages ---------------- */}
        <div className="mt-20 grid gap-px border-t border-charcoal/10 md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {pebAdvantages.map((advantage, i) => (
            <Reveal key={advantage.index} delay={0.06 * i}>
              <article className="h-full border-b border-charcoal/10 py-10 pr-8 md:border-b-0 md:pr-10">
                <span className="font-display wdth-wide block text-display-4 text-steel tabular">
                  {advantage.index}
                </span>
                <h3 className="mt-6 text-display-4 font-display text-charcoal">
                  {advantage.title}
                </h3>
                <p className="mt-4 text-small text-muted">{advantage.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
