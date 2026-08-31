import type { ReactElement } from 'react'
import type { PlateKind } from '@/data/images'
import { cn } from '@/lib/cn'

/**
 * ============================================================================
 * TECHNICAL PLATES
 * ============================================================================
 * Procedurally drawn engineering scenes used wherever DSI photography is not
 * yet available. These are brand artwork, not grey "image missing" boxes: pure
 * technical line work in the DSI palette, drawn from real PEB geometry.
 *
 * Every plate is a plain server-rendered SVG — no client JS, a few KB each,
 * and resolution independent. The moment a real photograph is added to
 * data/images.ts, ImageFrame renders the photograph instead and the plate
 * simply stops being used.
 * ============================================================================
 */

type Tone = 'light' | 'dark'

type PlateProps = {
  kind: PlateKind
  tone?: Tone
  /** Small caption drawn into the plate, e.g. "FIG. 01 — PRIMARY FRAMING". */
  label?: string
  className?: string
}

const VB = { w: 1600, h: 1000 }

/* -------------------------------------------------------------------------- */
/* Palette                                                                     */
/* -------------------------------------------------------------------------- */

/** Gradient id scoped by tone — same tone means an identical definition. */
const skyId = (tone: Tone) => `plate-sky-${tone}`

const palette = (tone: Tone) => ({
  skyTop: tone === 'dark' ? '#5b6873' : '#eef1f4',
  skyBottom: tone === 'dark' ? '#2d3238' : '#dde2e7',
  ground: tone === 'dark' ? '#1c2025' : '#cdd4da',
  line: tone === 'dark' ? '#ffffff' : '#262324',
  solid: tone === 'dark' ? '#0f1215' : '#262324',
  brand: tone === 'dark' ? '#3d90e0' : '#0055a5',
  text: tone === 'dark' ? '#ffffff' : '#262324',
})

/* -------------------------------------------------------------------------- */
/* Geometry helpers                                                            */
/* -------------------------------------------------------------------------- */

type Pt = [number, number]

/** One-point perspective: move a point toward the vanishing point by scale s. */
const persp = (p: Pt, s: number, vp: Pt): Pt => [
  vp[0] + (p[0] - vp[0]) * s,
  vp[1] + (p[1] - vp[1]) * s,
]

const path = (pts: Pt[], close = false) =>
  pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') +
  (close ? ' Z' : '')

/** Points along a polyline at n evenly spaced parameter steps. */
function subdivide(a: Pt, b: Pt, n: number): Pt[] {
  return Array.from({ length: n + 1 }, (_, i): Pt => [
    a[0] + (b[0] - a[0]) * (i / n),
    a[1] + (b[1] - a[1]) * (i / n),
  ])
}

/* -------------------------------------------------------------------------- */
/* SCENE 01 — PORTAL FRAMES IN PERSPECTIVE (the signature scene)               */
/* -------------------------------------------------------------------------- */

function FramesScene({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const vp: Pt = [995, 566]

  // Nearest frame profile, drawn from real PEB geometry:
  // tapered columns, haunched rafters, ridge at mid-span.
  const base: Record<string, Pt> = {
    lBase: [168, 872],
    lEave: [168, 452],
    ridge: [640, 300],
    rEave: [1112, 452],
    rBase: [1112, 872],
  }

  const BAYS = 6
  const k = 0.245
  const scales = Array.from({ length: BAYS }, (_, i) => 1 / (1 + i * k))

  const frameAt = (s: number) => ({
    lBase: persp(base.lBase, s, vp),
    lEave: persp(base.lEave, s, vp),
    ridge: persp(base.ridge, s, vp),
    rEave: persp(base.rEave, s, vp),
    rBase: persp(base.rBase, s, vp),
  })

  const frames = scales.map(frameAt)

  // Purlin runs: converge on the vanishing point along the rafter line.
  const purlinNodes: Pt[] = [
    ...subdivide(base.lEave, base.ridge, 4),
    ...subdivide(base.ridge, base.rEave, 4).slice(1),
  ]
  const girtNodes: Pt[] = [
    ...subdivide(base.lBase, base.lEave, 3).slice(1, 3),
    ...subdivide(base.rBase, base.rEave, 3).slice(1, 3),
  ]

  const far = frames[BAYS - 1]
  const farS = scales[BAYS - 1]

  return (
    <>
      {/* sky + ground */}
      <rect x="0" y="0" width={VB.w} height={VB.h} fill={`url(#${skyId(tone)})`} />
      <rect x="0" y="872" width={VB.w} height={VB.h - 872} fill={c.ground} opacity={0.5} />
      <line x1="0" y1="872" x2={VB.w} y2="872" stroke={c.line} strokeOpacity="0.22" strokeWidth="1.5" />

      {/* longitudinal members converging on the vanishing point */}
      <g stroke={c.line} strokeOpacity={tone === 'dark' ? 0.34 : 0.16} strokeWidth="1" fill="none">
        {[...purlinNodes, ...girtNodes].map((p, i) => {
          const end = persp(p, farS, vp)
          return <line key={i} x1={p[0]} y1={p[1]} x2={end[0]} y2={end[1]} />
        })}
      </g>

      {/* eave, ridge and base lines — the strongest longitudinals */}
      <g stroke={c.line} strokeOpacity={tone === 'dark' ? 0.6 : 0.34} strokeWidth="1.6" fill="none">
        {(['lEave', 'ridge', 'rEave', 'lBase', 'rBase'] as const).map((key) => (
          <line
            key={key}
            x1={base[key][0]}
            y1={base[key][1]}
            x2={far[key][0]}
            y2={far[key][1]}
          />
        ))}
      </g>

      {/* frames, far to near */}
      {frames
        .map((f, i) => ({ f, i }))
        .reverse()
        .map(({ f, i }) => {
          const s = scales[i]
          const near = i <= 1
          const opacity = near ? 1 : (tone === 'dark' ? 0.3 : 0.16) + 0.55 * s

          // Taper: columns are deeper at the haunch, rafters deeper at the
          // haunch than at the ridge — material follows the moment diagram.
          const wBase = 11 * s
          const wEave = 26 * s
          const wRidge = 12 * s

          if (!near) {
            return (
              <g key={i} fill="none" stroke={c.line} strokeOpacity={opacity} strokeWidth={1.4 * s + 0.4}>
                <path d={path([f.lBase, f.lEave, f.ridge, f.rEave, f.rBase])} />
              </g>
            )
          }

          const leftCol: Pt[] = [
            [f.lBase[0] - wBase, f.lBase[1]],
            [f.lBase[0] + wBase, f.lBase[1]],
            [f.lEave[0] + wEave, f.lEave[1]],
            [f.lEave[0] - wEave * 0.35, f.lEave[1]],
          ]
          const rightCol: Pt[] = [
            [f.rBase[0] - wBase, f.rBase[1]],
            [f.rBase[0] + wBase, f.rBase[1]],
            [f.rEave[0] + wEave * 0.35, f.rEave[1]],
            [f.rEave[0] - wEave, f.rEave[1]],
          ]
          const leftRafter: Pt[] = [
            [f.lEave[0] - wEave * 0.35, f.lEave[1]],
            [f.lEave[0] + wEave, f.lEave[1]],
            [f.ridge[0], f.ridge[1] + wRidge * 2],
            [f.ridge[0], f.ridge[1]],
          ]
          const rightRafter: Pt[] = [
            [f.rEave[0] + wEave * 0.35, f.rEave[1]],
            [f.rEave[0] - wEave, f.rEave[1]],
            [f.ridge[0], f.ridge[1] + wRidge * 2],
            [f.ridge[0], f.ridge[1]],
          ]

          return (
            <g key={i}>
              <g fill={c.solid} fillOpacity={i === 0 ? 0.92 : 0.55}>
                <path d={path(leftCol, true)} />
                <path d={path(rightCol, true)} />
                <path d={path(leftRafter, true)} />
                <path d={path(rightRafter, true)} />
              </g>
              {/* haunch stiffener marks */}
              {i === 0 && (
                <g stroke={c.brand} strokeWidth="2.5" fill="none" opacity="0.9">
                  <path d={path([[f.lEave[0] - 30, f.lEave[1] + 4], [f.lEave[0] + 30, f.lEave[1] + 4]])} />
                  <path d={path([[f.rEave[0] - 30, f.rEave[1] + 4], [f.rEave[0] + 30, f.rEave[1] + 4]])} />
                </g>
              )}
            </g>
          )
        })}

      {/* cross bracing in one bay */}
      <g stroke={c.brand} strokeWidth="1.6" strokeOpacity="0.55" fill="none">
        <line x1={frames[2].lEave[0]} y1={frames[2].lEave[1]} x2={frames[3].lBase[0]} y2={frames[3].lBase[1]} />
        <line x1={frames[2].lBase[0]} y1={frames[2].lBase[1]} x2={frames[3].lEave[0]} y2={frames[3].lEave[1]} />
      </g>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* SCENE 02 — ERECTION                                                         */
/* -------------------------------------------------------------------------- */

function ErectionScene({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const ground = 860

  return (
    <>
      <rect x="0" y="0" width={VB.w} height={VB.h} fill={`url(#${skyId(tone)})`} />
      <rect x="0" y={ground} width={VB.w} height={VB.h - ground} fill={c.ground} opacity="0.55" />
      <line x1="0" y1={ground} x2={VB.w} y2={ground} stroke={c.line} strokeOpacity="0.25" strokeWidth="1.5" />

      {/* erected bays behind */}
      <g stroke={c.line} strokeOpacity="0.28" strokeWidth="2" fill="none">
        {[0, 1, 2].map((i) => {
          const x = 150 + i * 150
          const shrink = 1 - i * 0.06
          return (
            <path
              key={i}
              d={path([
                [x, ground],
                [x, 470 + i * 26],
                [x + 260 * shrink, 372 + i * 22],
                [x + 520 * shrink, 470 + i * 26],
                [x + 520 * shrink, ground],
              ])}
            />
          )
        })}
      </g>

      {/* erected frame, foreground left */}
      <g fill={c.solid} fillOpacity="0.9">
        <path d={path([[120, ground], [146, ground], [152, 452], [120, 452]], true)} />
        <path d={path([[600, ground], [626, ground], [626, 452], [594, 452]], true)} />
        <path d={path([[120, 452], [152, 452], [378, 322], [368, 300]], true)} />
        <path d={path([[626, 452], [594, 452], [368, 322], [378, 300]], true)} />
      </g>

      {/* rafter being lifted, slung at an angle */}
      <g>
        <g stroke={c.line} strokeOpacity="0.5" strokeWidth="1.4">
          <line x1="1010" y1="196" x2="880" y2="392" />
          <line x1="1010" y1="196" x2="1130" y2="352" />
        </g>
        <g fill={c.brand} fillOpacity="0.95" transform="rotate(-11 1005 375)">
          <path d={path([[856, 366], [1156, 340], [1156, 372], [856, 402]], true)} />
        </g>
        {/* shackle */}
        <circle cx="1010" cy="188" r="9" fill="none" stroke={c.line} strokeOpacity="0.6" strokeWidth="3" />
      </g>

      {/* crane: boom + hoist line */}
      <g stroke={c.solid} strokeOpacity="0.85" fill="none">
        <path d="M1452 812 L1010 176" strokeWidth="12" strokeLinecap="square" />
        <path d="M1452 812 L1010 176" strokeWidth="3" stroke={c.line} strokeOpacity={tone === 'dark' ? 0.35 : 0.2} />
        <line x1="1010" y1="176" x2="1010" y2="188" strokeWidth="2.5" stroke={c.line} strokeOpacity="0.6" />
      </g>
      {/* crane body + outriggers */}
      <g fill={c.solid} fillOpacity="0.9">
        <path d={path([[1400, 812], [1560, 812], [1560, ground], [1380, ground]], true)} />
      </g>
      <g stroke={c.line} strokeOpacity="0.35" strokeWidth="3">
        <line x1="1340" y1={ground} x2="1600" y2={ground} />
      </g>

      {/* lift radius annotation */}
      <g stroke={c.brand} strokeWidth="1.4" strokeDasharray="8 8" fill="none" opacity="0.6">
        <line x1="1010" y1="196" x2="1010" y2={ground} />
      </g>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* SCENE 03 — FABRICATION SHOP INTERIOR                                        */
/* -------------------------------------------------------------------------- */

function PlantScene({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const vp: Pt = [820, 520]

  const bayL = 120
  const bayR = 1480
  const floor = 900
  const eave = 400
  const ridge = 250

  const depths = [1, 0.72, 0.53, 0.4, 0.31]

  return (
    <>
      <rect x="0" y="0" width={VB.w} height={VB.h} fill={`url(#${skyId(tone)})`} />

      {/* receding shell */}
      <g stroke={c.line} fill="none">
        {depths.map((s, i) => {
          const l: Pt = persp([bayL, floor], s, vp)
          const lE: Pt = persp([bayL, eave], s, vp)
          const rdg: Pt = persp([800, ridge], s, vp)
          const rE: Pt = persp([bayR, eave], s, vp)
          const r: Pt = persp([bayR, floor], s, vp)
          return (
            <path
              key={i}
              d={path([l, lE, rdg, rE, r])}
              strokeOpacity={i === 0 ? 0.4 : 0.13 + 0.25 * s}
              strokeWidth={i === 0 ? 2.4 : 1.5}
            />
          )
        })}
        {/* longitudinals */}
        {([[bayL, floor], [bayL, eave], [800, ridge], [bayR, eave], [bayR, floor]] as Pt[]).map((p, i) => {
          const e = persp(p, depths[depths.length - 1], vp)
          return <line key={i} x1={p[0]} y1={p[1]} x2={e[0]} y2={e[1]} strokeOpacity="0.28" strokeWidth="1.4" />
        })}
      </g>

      {/* crane rail + gantry crossing the bay */}
      <g>
        <g stroke={c.line} strokeOpacity="0.4" strokeWidth="2.5">
          <line x1={bayL} y1="470" x2={persp([bayL, 470], 0.31, vp)[0]} y2={persp([bayL, 470], 0.31, vp)[1]} />
          <line x1={bayR} y1="470" x2={persp([bayR, 470], 0.31, vp)[0]} y2={persp([bayR, 470], 0.31, vp)[1]} />
        </g>
        {/* gantry girder */}
        <g fill={c.solid} fillOpacity="0.85">
          <path d={path([[300, 452], [1290, 452], [1290, 476], [300, 476]], true)} />
        </g>
        {/* trolley + hook */}
        <g fill={c.brand}>
          <rect x="700" y="430" width="86" height="26" rx="2" />
        </g>
        <g stroke={c.line} strokeOpacity="0.5" strokeWidth="2">
          <line x1="743" y1="476" x2="743" y2="640" />
        </g>
        <rect x="716" y="640" width="54" height="18" rx="2" fill={c.solid} fillOpacity="0.8" />
      </g>

      {/* built-up section on trestles, foreground */}
      <g>
        <g fill={c.solid} fillOpacity="0.9">
          {/* tapered web + flanges seen in elevation */}
          <path d={path([[200, 740], [1180, 740], [1180, 760], [200, 772]], true)} />
          <path d={path([[200, 830], [1180, 812], [1180, 832], [200, 862]], true)} />
          <path d={path([[210, 760], [1170, 758], [1170, 814], [210, 832]], true)} />
        </g>
        {/* trestles */}
        <g stroke={c.line} strokeOpacity="0.45" strokeWidth="3" fill="none">
          <path d="M330 864 L296 900 M330 864 L364 900" />
          <path d="M1040 848 L1006 900 M1040 848 L1074 900" />
        </g>
        {/* weld run marker */}
        <g stroke={c.brand} strokeWidth="3">
          <line x1="240" y1="766" x2="620" y2="762" />
        </g>
      </g>

      {/* floor */}
      <rect x="0" y={floor} width={VB.w} height={VB.h - floor} fill={c.ground} opacity="0.45" />
      <line x1="0" y1={floor} x2={VB.w} y2={floor} stroke={c.line} strokeOpacity="0.22" strokeWidth="1.5" />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* SCENE 04 — HAUNCH CONNECTION DETAIL (blueprint)                             */
/* -------------------------------------------------------------------------- */

function BlueprintScene({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const L = c.line
  const dim = tone === 'dark' ? 0.45 : 0.4

  // Column: vertical, right flange at x=560. Rafter: rises to the right.
  return (
    <>
      <rect x="0" y="0" width={VB.w} height={VB.h} fill={tone === 'dark' ? '#14171a' : '#f5f7f9'} />

      {/* drawing grid */}
      <g stroke={c.brand} strokeOpacity={tone === 'dark' ? 0.13 : 0.1} strokeWidth="1">
        {Array.from({ length: 25 }, (_, i) => (
          <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2={VB.h} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 64} x2={VB.w} y2={i * 64} />
        ))}
      </g>

      {/* ---- COLUMN ---- */}
      <g fill={c.solid} fillOpacity="0.88">
        <rect x="400" y="250" width="34" height="620" />
        <rect x="546" y="250" width="34" height="620" />
        <rect x="434" y="250" width="112" height="620" fillOpacity="0.16" />
      </g>
      <g stroke={L} strokeOpacity="0.5" strokeWidth="1.5" fill="none">
        <rect x="400" y="250" width="180" height="620" />
      </g>

      {/* ---- RAFTER (sloped) ---- */}
      <g transform="rotate(-13 580 330)">
        <g fill={c.solid} fillOpacity="0.88">
          <rect x="580" y="252" width="640" height="30" />
          <rect x="580" y="392" width="640" height="30" />
          <rect x="580" y="282" width="640" height="110" fillOpacity="0.16" />
        </g>
        <g stroke={L} strokeOpacity="0.5" strokeWidth="1.5" fill="none">
          <rect x="580" y="252" width="640" height="170" />
        </g>
      </g>

      {/* ---- END PLATE + BOLT GROUP ---- */}
      <g transform="rotate(-13 580 330)">
        <rect x="566" y="232" width="26" height="210" fill={c.brand} fillOpacity="0.9" />
        <g fill="none" stroke={tone === 'dark' ? '#14171a' : '#f5f7f9'} strokeWidth="2.5">
          {[0, 1, 2, 3, 4, 5].map((r) =>
            [0, 1].map((col) => (
              <circle key={`${r}-${col}`} cx={572 + col * 14} cy={258 + r * 32} r="6" />
            )),
          )}
        </g>
      </g>

      {/* ---- HAUNCH ---- */}
      <g fill={c.solid} fillOpacity="0.7">
        <path d={path([[580, 420], [880, 470], [880, 540], [580, 470]], true)} />
      </g>

      {/* ---- STIFFENERS ---- */}
      <g fill={c.brand} fillOpacity="0.85">
        <rect x="434" y="286" width="112" height="14" />
        <rect x="434" y="432" width="112" height="14" />
      </g>

      {/* ---- DIMENSION LINES ---- */}
      <g stroke={L} strokeOpacity={dim} strokeWidth="1.2" fill="none">
        {/* overall column depth */}
        <line x1="400" y1="930" x2="400" y2="900" />
        <line x1="580" y1="930" x2="580" y2="900" />
        <line x1="400" y1="915" x2="580" y2="915" />
        <path d="M400 915 l14 -5 v10 z" fill={L} fillOpacity={dim} stroke="none" />
        <path d="M580 915 l-14 -5 v10 z" fill={L} fillOpacity={dim} stroke="none" />

        {/* height */}
        <line x1="330" y1="250" x2="368" y2="250" />
        <line x1="330" y1="870" x2="368" y2="870" />
        <line x1="349" y1="250" x2="349" y2="870" />
        <path d="M349 250 l-5 14 h10 z" fill={L} fillOpacity={dim} stroke="none" />
        <path d="M349 870 l-5 -14 h10 z" fill={L} fillOpacity={dim} stroke="none" />
      </g>

      <g
        fill={c.text}
        fillOpacity="0.6"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fontSize="19"
        letterSpacing="1.6"
      >
        <text x="452" y="962">[ D ]</text>
        <text x="262" y="566" transform="rotate(-90 262 566)">[ H ]</text>
      </g>

      {/* ---- LEADERS ---- */}
      <g stroke={L} strokeOpacity="0.42" strokeWidth="1.2" fill="none">
        <path d="M600 250 L760 150 L980 150" />
        <path d="M700 452 L820 610 L1010 610" />
        <path d="M490 293 L360 200 L200 200" />
      </g>
      <g
        fill={c.text}
        fillOpacity="0.65"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fontSize="21"
        letterSpacing="2"
      >
        <text x="992" y="144">END PLATE · [ N ] × M[ D ] HSFG</text>
        <text x="1022" y="604">HAUNCH</text>
        <text x="200" y="194">STIFFENER</text>
      </g>

      {/* section mark */}
      <g stroke={c.brand} strokeWidth="3" fill="none">
        <path d="M1180 760 h70 v70" />
      </g>
      <text
        x="1190"
        y="748"
        fill={c.brand}
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fontSize="24"
        letterSpacing="2"
      >
        A–A
      </text>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* SCENE 05 — WAREHOUSE ELEVATION                                              */
/* -------------------------------------------------------------------------- */

function WarehouseScene({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const ground = 812
  const eave = 470
  const ridge = 372
  const x0 = 90
  const x1 = 1510

  return (
    <>
      <rect x="0" y="0" width={VB.w} height={VB.h} fill={`url(#${skyId(tone)})`} />

      {/* mass */}
      <path
        d={path([[x0, ground], [x0, eave], [800, ridge], [x1, eave], [x1, ground]], true)}
        fill={c.solid}
        fillOpacity={tone === 'dark' ? 0.82 : 0.9}
      />

      {/* ribbed cladding */}
      <g stroke={tone === 'dark' ? '#ffffff' : '#ffffff'} strokeOpacity="0.09" strokeWidth="2">
        {Array.from({ length: 46 }, (_, i) => (
          <line key={i} x1={x0 + 12 + i * 31} y1={ground} x2={x0 + 12 + i * 31} y2={eave + 6} />
        ))}
      </g>

      {/* roof sheet lines */}
      <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="2">
        {Array.from({ length: 22 }, (_, i) => {
          const t = i / 21
          return <line key={i} x1={x0 + t * (800 - x0)} y1={eave - t * (eave - ridge)} x2={800} y2={ridge} />
        })}
      </g>

      {/* gutter + eave line */}
      <line x1={x0} y1={eave} x2={x1} y2={eave} stroke={c.brand} strokeWidth="5" opacity="0.9" />

      {/* ridge monitor */}
      <path
        d={path([[700, ridge - 4], [700, ridge - 52], [900, ridge - 52], [900, ridge - 4]], true)}
        fill={c.solid}
        fillOpacity="0.95"
      />
      <line x1="700" y1={ridge - 52} x2="900" y2={ridge - 52} stroke={c.brand} strokeWidth="4" />

      {/* roller shutters */}
      <g>
        {[0, 1, 2, 3].map((i) => {
          const bx = 300 + i * 290
          return (
            <g key={i}>
              <rect x={bx} y={ground - 210} width="190" height="210" fill={tone === 'dark' ? '#000' : '#111'} fillOpacity="0.5" />
              <g stroke="#ffffff" strokeOpacity="0.12" strokeWidth="2">
                {Array.from({ length: 9 }, (_, j) => (
                  <line key={j} x1={bx} y1={ground - 200 + j * 22} x2={bx + 190} y2={ground - 200 + j * 22} />
                ))}
              </g>
              <line x1={bx} y1={ground - 210} x2={bx + 190} y2={ground - 210} stroke={c.brand} strokeWidth="3" opacity="0.75" />
            </g>
          )
        })}
        {/* personnel door */}
        <rect x="180" y={ground - 112} width="58" height="112" fill={tone === 'dark' ? '#000' : '#111'} fillOpacity="0.55" />
      </g>

      {/* ground */}
      <rect x="0" y={ground} width={VB.w} height={VB.h - ground} fill={c.ground} opacity="0.55" />
      <line x1="0" y1={ground} x2={VB.w} y2={ground} stroke={c.line} strokeOpacity="0.28" strokeWidth="2" />

      {/* span dimension */}
      <g stroke={c.line} strokeOpacity="0.4" strokeWidth="1.3">
        <line x1={x0} y1={912} x2={x1} y2={912} />
        <line x1={x0} y1={896} x2={x0} y2={928} />
        <line x1={x1} y1={896} x2={x1} y2={928} />
      </g>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* SCENE 06 — COLD STORAGE                                                     */
/* -------------------------------------------------------------------------- */

function ColdstoreScene({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const ground = 820
  const top = 330
  const x0 = 150
  const x1 = 1180

  return (
    <>
      <rect x="0" y="0" width={VB.w} height={VB.h} fill={`url(#${skyId(tone)})`} />

      {/* insulated box */}
      <rect x={x0} y={top} width={x1 - x0} height={ground - top} fill={c.solid} fillOpacity={tone === 'dark' ? 0.84 : 0.92} />

      {/* insulated panel joints — horizontal, wide */}
      <g stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={x0} y1={top + 42 + i * 42} x2={x1} y2={top + 42 + i * 42} />
        ))}
      </g>

      {/* parapet accent */}
      <rect x={x0} y={top} width={x1 - x0} height="12" fill={c.brand} opacity="0.9" />

      {/* dock bays with canopies + levellers */}
      <g>
        {[0, 1, 2].map((i) => {
          const bx = 250 + i * 300
          return (
            <g key={i}>
              {/* canopy */}
              <path d={path([[bx - 26, ground - 250], [bx + 214, ground - 250], [bx + 200, ground - 226], [bx - 12, ground - 226]], true)} fill={c.solid} fillOpacity="0.98" />
              {/* opening */}
              <rect x={bx} y={ground - 218} width="188" height="218" fill={tone === 'dark' ? '#000' : '#0a0a0a'} fillOpacity="0.6" />
              {/* dock bumpers */}
              <rect x={bx - 6} y={ground - 40} width="18" height="40" fill={c.brand} opacity="0.8" />
              <rect x={bx + 176} y={ground - 40} width="18" height="40" fill={c.brand} opacity="0.8" />
            </g>
          )
        })}
      </g>

      {/* refrigeration plant deck on roof */}
      <g fill={c.solid} fillOpacity="0.9" stroke={c.line} strokeOpacity="0.25" strokeWidth="1.5">
        <rect x="880" y={top - 76} width="230" height="76" />
      </g>
      <g stroke={c.brand} strokeWidth="3" opacity="0.8">
        {[0, 1, 2].map((i) => (
          <line key={i} x1={906 + i * 70} y1={top - 62} x2={906 + i * 70} y2={top - 14} />
        ))}
      </g>

      {/* trailer standing at a dock, outline only */}
      <g stroke={c.line} strokeOpacity="0.34" strokeWidth="2.5" fill="none">
        <rect x="1240" y={ground - 200} width="300" height="150" />
        <circle cx="1310" cy={ground - 26} r="24" />
        <circle cx="1380" cy={ground - 26} r="24" />
        <circle cx="1500" cy={ground - 26} r="24" />
      </g>

      {/* ground */}
      <rect x="0" y={ground} width={VB.w} height={VB.h - ground} fill={c.ground} opacity="0.55" />
      <line x1="0" y1={ground} x2={VB.w} y2={ground} stroke={c.line} strokeOpacity="0.28" strokeWidth="2" />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* SCENE 07 — ROOF PLAN / SITE LAYOUT (aerial)                                 */
/* -------------------------------------------------------------------------- */

function AerialScene({ tone }: { tone: Tone }) {
  const c = palette(tone)
  const x0 = 210
  const x1 = 1330
  const y0 = 190
  const y1 = 790
  const mid = (y0 + y1) / 2

  return (
    <>
      <rect x="0" y="0" width={VB.w} height={VB.h} fill={tone === 'dark' ? '#14171a' : '#eef1f4'} />

      {/* site grid */}
      <g stroke={c.line} strokeOpacity={tone === 'dark' ? 0.08 : 0.07} strokeWidth="1">
        {Array.from({ length: 25 }, (_, i) => (
          <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2={VB.h} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 64} x2={VB.w} y2={i * 64} />
        ))}
      </g>

      {/* roof mass */}
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={c.solid} fillOpacity={tone === 'dark' ? 0.78 : 0.9} />

      {/* purlin lines */}
      <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5">
        {Array.from({ length: 34 }, (_, i) => (
          <line key={i} x1={x0 + i * 33} y1={y0} x2={x0 + i * 33} y2={y1} />
        ))}
      </g>

      {/* ridge */}
      <line x1={x0} y1={mid} x2={x1} y2={mid} stroke={c.brand} strokeWidth="4" />

      {/* roof monitors */}
      <g fill="#ffffff" fillOpacity="0.13">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={x0 + 110 + i * 260} y={mid - 34} width="180" height="68" />
        ))}
      </g>

      {/* skylight grid */}
      <g fill={c.brand} fillOpacity="0.28">
        {Array.from({ length: 12 }, (_, i) =>
          [0, 1].map((r) => (
            <rect key={`${i}-${r}`} x={x0 + 44 + i * 90} y={r === 0 ? y0 + 70 : y1 - 118} width="52" height="48" />
          )),
        )}
      </g>

      {/* gutter edges */}
      <g stroke={c.line} strokeOpacity="0.4" strokeWidth="2">
        <line x1={x0} y1={y0} x2={x1} y2={y0} />
        <line x1={x0} y1={y1} x2={x1} y2={y1} />
      </g>

      {/* apron + trucks at dock face */}
      <g stroke={c.line} strokeOpacity="0.28" strokeWidth="2" fill="none">
        <line x1={x0} y1={y1 + 74} x2={x1} y2={y1 + 74} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={x0 + 90 + i * 220} y={y1 + 8} width="86" height="60" />
        ))}
      </g>

      {/* dimension lines */}
      <g stroke={c.line} strokeOpacity="0.42" strokeWidth="1.3">
        <line x1={x0} y1="130" x2={x1} y2="130" />
        <line x1={x0} y1="114" x2={x0} y2="146" />
        <line x1={x1} y1="114" x2={x1} y2="146" />
        <line x1="140" y1={y0} x2="140" y2={y1} />
        <line x1="124" y1={y0} x2="156" y2={y0} />
        <line x1="124" y1={y1} x2="156" y2={y1} />
      </g>

      {/* north arrow */}
      <g transform="translate(1450 210)" stroke={c.line} strokeOpacity="0.55" fill="none" strokeWidth="2">
        <circle cx="0" cy="0" r="34" />
        <path d="M0 -26 L11 14 L0 4 L-11 14 Z" fill={c.brand} stroke="none" />
      </g>
      <text
        x="1450"
        y="292"
        textAnchor="middle"
        fill={c.text}
        fillOpacity="0.5"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fontSize="20"
        letterSpacing="2"
      >
        N
      </text>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Dispatcher + shared chrome                                                  */
/* -------------------------------------------------------------------------- */

const scenes: Record<PlateKind, (p: { tone: Tone }) => ReactElement> = {
  frames: FramesScene,
  erection: ErectionScene,
  plant: PlantScene,
  blueprint: BlueprintScene,
  warehouse: WarehouseScene,
  coldstore: ColdstoreScene,
  aerial: AerialScene,
}

export function TechnicalPlate({ kind, tone = 'light', label, className }: PlateProps) {
  const c = palette(tone)
  const Scene = scenes[kind]
  // Deterministic id: identical definitions may safely share one id.
  const uid = `plate-${kind}-${tone}`

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={skyId(tone)} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={c.skyTop} />
          <stop offset="100%" stopColor={c.skyBottom} />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <rect x="0" y="0" width={VB.w} height={VB.h} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${uid}-clip)`}>
        <Scene tone={tone} />

        {/* --- shared chrome: registration ticks --- */}
        <g stroke={c.line} strokeOpacity={tone === 'dark' ? 0.3 : 0.24} strokeWidth="1.5" fill="none">
          <path d="M40 40 h44 M40 40 v44" />
          <path d={`M${VB.w - 40} 40 h-44 M${VB.w - 40} 40 v44`} />
          <path d={`M40 ${VB.h - 40} h44 M40 ${VB.h - 40} v-44`} />
          <path d={`M${VB.w - 40} ${VB.h - 40} h-44 M${VB.w - 40} ${VB.h - 40} v-44`} />
        </g>

        {/* --- shared chrome: caption --- */}
        {label && (
          <g>
            <line
              x1="40"
              y1={VB.h - 92}
              x2="150"
              y2={VB.h - 92}
              stroke={c.brand}
              strokeWidth="3"
            />
            <text
              x="40"
              y={VB.h - 118}
              fill={c.text}
              fillOpacity={tone === 'dark' ? 0.62 : 0.5}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontSize="21"
              letterSpacing="3"
            >
              {label}
            </text>
          </g>
        )}
      </g>
    </svg>
  )
}
