import { pebAdvantages } from '@/data/capabilities'
import { SectionHeader } from '@/components/site/SectionHeader'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/site/TechLabel'

/**
 * Why PEB.
 *
 * The ten advantages carry the argument, and the drawing beside them makes
 * the strongest one visible: in a pre-engineered frame the section depth
 * follows the bending moment, so steel sits where the load actually is.
 */
/**
 * A tapered portal frame drawn against its own bending moment envelope.
 *
 * The point of the figure is a correlation, so it draws both curves rather
 * than asserting the relationship in a caption: the blue envelope outside the
 * frame is the moment the frame has to carry, and the solid steel inside it is
 * the depth provided to carry it. The two swell and shrink together — widest
 * at the haunches, narrowest at the pinned bases.
 *
 * The frame line itself is the shared datum: steel is offset inward from it,
 * moment outward, so the two can never overlap and the drawing stays legible.
 */
function MomentDiagram() {
  /* ---------------------------------------------------------------- frame */
  const BASE = 352 // foundation level
  const EAVE = 164 // haunch level
  const RIDGE = 92 // apex
  const LX = 170 // left column, outer face
  const RX = 650 // right column, outer face
  const MX = (LX + RX) / 2

  // Web depth. A pinned base carries no moment, so it is the shallowest
  // section on the frame; the haunch is the deepest.
  const D_BASE = 9
  const D_HAUNCH = 40
  const D_RIDGE = 14

  // Moment envelope, normalised against the peak at the haunch. An envelope
  // (the worst case across load combinations) is what actually sizes a member,
  // and unlike a single load case it does not pass through zero mid-rafter.
  const M_RIDGE = 0.34
  const SCALE = 64 // px at full moment

  type Sample = { x: number; y: number; nx: number; ny: number; d: number; m: number }

  /**
   * Walks a member, returning the outward normal, the web depth and the moment
   * ordinate at each station. `flip` turns the normal to face away from the
   * inside of the frame on the right-hand members.
   */
  const walk = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    d1: number,
    d2: number,
    moment: (t: number) => number,
    flip = false,
    steps = 40,
  ): Sample[] => {
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy)
    const s = flip ? -1 : 1
    const nx = (dy / len) * s
    const ny = (-dx / len) * s
    return Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps
      return { x: x1 + dx * t, y: y1 + dy * t, nx, ny, d: d1 + (d2 - d1) * t, m: moment(t) }
    })
  }

  // Column: moment grows linearly from zero at the pin to the peak at the eave.
  const columnMoment = (t: number) => t
  // Rafter: falls away from the haunch, easing toward the apex.
  const rafterMoment = (t: number) => M_RIDGE + (1 - M_RIDGE) * Math.pow(1 - t, 1.7)

  const members = [
    walk(LX, BASE, LX, EAVE, D_BASE, D_HAUNCH, columnMoment),
    walk(LX, EAVE, MX, RIDGE, D_HAUNCH, D_RIDGE, rafterMoment),
    walk(RX, BASE, RX, EAVE, D_BASE, D_HAUNCH, columnMoment, true),
    walk(RX, EAVE, MX, RIDGE, D_HAUNCH, D_RIDGE, rafterMoment, true),
  ]

  const fx = (n: number) => n.toFixed(1)

  /** Steel: the frame line, then back along the tapered inner face. */
  const steel = (s: Sample[]) => {
    const outer = s.map((p) => `${fx(p.x)},${fx(p.y)}`)
    const inner = [...s].reverse().map((p) => `${fx(p.x - p.nx * p.d)},${fx(p.y - p.ny * p.d)}`)
    return `M${[...outer, ...inner].join(' L')} Z`
  }

  /** Moment: the frame line, then back along the envelope ordinate. */
  const envelope = (s: Sample[]) => {
    const ord = s.map((p) => `${fx(p.x + p.nx * p.m * SCALE)},${fx(p.y + p.ny * p.m * SCALE)}`)
    const datum = [...s].reverse().map((p) => `${fx(p.x)},${fx(p.y)}`)
    return `M${[...ord, ...datum].join(' L')} Z`
  }

  const mono = 'var(--font-mono), ui-monospace, monospace'

  return (
    <svg
      viewBox="0 0 820 470"
      className="h-auto w-full"
      role="img"
      aria-label="A tapered steel portal frame drawn inside its bending moment envelope. The envelope is widest at the two haunches, where the frame is also deepest, and falls to nothing at the pinned column bases, where the frame is shallowest — showing that section depth follows the moment the member has to carry."
    >
      {/* drawing grid */}
      <g stroke="#262324" strokeOpacity="0.05" strokeWidth="1">
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="470" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="820" y2={i * 50} />
        ))}
      </g>

      {/* ------------------------------- moment envelope, outside the frame */}
      <g fill="#0055A5" fillOpacity="0.11" stroke="#0055A5" strokeOpacity="0.55" strokeWidth="1.5">
        {members.map((m, i) => (
          <path key={`m${i}`} d={envelope(m)} />
        ))}
      </g>

      {/* hatching ticks across the envelope, the way a moment diagram is drawn */}
      <g stroke="#0055A5" strokeOpacity="0.28" strokeWidth="1">
        {members.flatMap((m, mi) =>
          m
            .filter((_, i) => i % 5 === 0 && i > 0)
            .map((p, i) => (
              <line
                key={`t${mi}-${i}`}
                x1={fx(p.x)}
                y1={fx(p.y)}
                x2={fx(p.x + p.nx * p.m * SCALE)}
                y2={fx(p.y + p.ny * p.m * SCALE)}
              />
            )),
        )}
      </g>

      {/* --------------------------------------- the frame, inside the line */}
      <g fill="#262324" fillOpacity="0.92">
        {members.map((m, i) => (
          <path key={`s${i}`} d={steel(m)} />
        ))}
      </g>

      {/* haunches — the deepest sections, marked in brand blue */}
      <g stroke="#0055A5" strokeWidth="3.5" strokeLinecap="square">
        <line x1={LX} y1={EAVE} x2={LX + D_HAUNCH} y2={EAVE} />
        <line x1={RX} y1={EAVE} x2={RX - D_HAUNCH} y2={EAVE} />
      </g>

      {/* ground line and pinned bases */}
      <line
        x1="96"
        y1={BASE}
        x2="724"
        y2={BASE}
        stroke="#262324"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      <g fill="none" stroke="#262324" strokeOpacity="0.45" strokeWidth="1.5">
        <path d={`M${LX + D_BASE / 2 - 13},${BASE + 21} L${LX + D_BASE / 2},${BASE} L${LX + D_BASE / 2 + 13},${BASE + 21}`} />
        <path d={`M${RX - D_BASE / 2 - 13},${BASE + 21} L${RX - D_BASE / 2},${BASE} L${RX - D_BASE / 2 + 13},${BASE + 21}`} />
      </g>

      {/* ------------------------------------------------------ annotations
          Hidden below `sm`. The SVG scales with its viewBox, so at phone width
          these 13px labels render around 4.5px — unreadable clutter. The frame
          and its envelope still read at any size, and the caption below carries
          the same point in body text. */}
      <g className="hidden sm:block" stroke="#667085" strokeOpacity="0.55" strokeWidth="1" fill="none">
        {/* envelope label, above the apex where the drawing is clear */}
        <path d={`M${MX},52 L${MX},${RIDGE - M_RIDGE * SCALE - 7}`} stroke="#0055A5" strokeOpacity="0.5" />
        {/* haunch leader, into the open middle of the frame */}
        <path d={`M${LX + D_HAUNCH + 4},${EAVE + 8} L${LX + 72},${EAVE + 62} L${LX + 128},${EAVE + 62}`} stroke="#0055A5" strokeOpacity="0.6" />
        {/* base leader */}
        <path d={`M${LX + D_BASE + 4},${BASE - 26} L${LX + 66},${BASE - 62} L${LX + 128},${BASE - 62}`} />
      </g>

      <g className="hidden sm:block" fontFamily={mono} fontSize="13" letterSpacing="1.7">
        <text x={MX} y="42" textAnchor="middle" fill="#0055A5">
          BENDING MOMENT ENVELOPE
        </text>
        <text x={LX + 134} y={EAVE + 66} fill="#0055A5">
          DEEPEST AT THE HAUNCH
        </text>
        <text x={LX + 134} y={BASE - 58} fill="#667085">
          ZERO MOMENT AT THE PIN
        </text>
      </g>

      {/* ------------------------------------------ span + eave dimensions */}
      <g className="hidden sm:block" stroke="#262324" strokeOpacity="0.3" strokeWidth="1">
        <line x1={LX} y1="424" x2={RX} y2="424" />
        <line x1={LX} y1="416" x2={LX} y2="432" />
        <line x1={RX} y1="416" x2={RX} y2="432" />
        <line x1="756" y1={EAVE} x2="756" y2={BASE} />
        <line x1="748" y1={EAVE} x2="764" y2={EAVE} />
        <line x1="748" y1={BASE} x2="764" y2={BASE} />
      </g>
      <g className="hidden sm:block" fill="#667085" fontFamily={mono} fontSize="13" letterSpacing="1.7">
        <text x={MX} y="414" textAnchor="middle">
          CLEAR SPAN
        </text>
        <text x="772" y={(EAVE + BASE) / 2} dominantBaseline="middle">
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
                  <MomentDiagram />
                </div>
                <figcaption className="mt-5 flex items-start gap-4 text-small text-muted">
                  <span className="tech mt-[0.35rem] shrink-0 text-charcoal/45">Fig. 02</span>
                  <span className="measure">
                    The blue envelope is the bending moment the frame has to carry; the solid
                    steel inside it is the depth provided to carry it. Both peak at the haunch and
                    fall away to nothing at the pinned base — steel sits where the load actually
                    is, rather than spread evenly along the member.
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* ---------------- advantages ----------------
            Ten cards sit as two rules-topped rows of five on desktop. The
            title drops to body size here because a display-4 heading in a
            fifth-width column wraps to four ragged lines. */}
        <div className="mt-20 grid gap-x-8 sm:grid-cols-2 md:mt-24 lg:grid-cols-5">
          {pebAdvantages.map((advantage, i) => (
            <Reveal key={advantage.index} delay={0.04 * i} className="h-full">
              <article className="flex h-full flex-col border-t border-charcoal/15 pb-9 pt-6">
                <span className="font-display wdth-wide block text-display-4 leading-none text-steel tabular">
                  {advantage.index}
                </span>
                <h3 className="mt-5 text-body font-medium leading-snug text-charcoal">
                  {advantage.title}
                </h3>
                <p className="mt-3 text-small text-muted">{advantage.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
