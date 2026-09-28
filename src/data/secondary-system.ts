/**
 * Copy for the Secondary System page — the cold-formed members that span
 * between the main frames and carry the roof and wall sheeting: purlins,
 * girts and eave struts. Everything here describes general PEB engineering
 * practice. The only figures quoted (345 MPa steel for secondary members and
 * 8–10 m bays) are the catalogue's own; no section depths, thicknesses or
 * spacings are given because the catalogue does not quote them.
 */

export const secondarySystemMeta = {
  title: 'PEB Secondary System: Purlins, Girts & Eave Struts | DSI',
  description:
    'The secondary system of a pre-engineered building: cold-formed Z and C purlins, wall girts and eave struts that span between the frames, carry the sheeting and brace the primary members.',
}

export const secondarySystemIntro = {
  lead:
    'The secondary system is the layer between the frames and the skin: purlins on the roof, girts on the walls and an eave strut where the two meet, spanning from frame to frame and carrying the sheeting.',
  paragraphs: [
    'Purlins, girts and eave struts are light members, roll-formed from high-tensile steel into Z and C profiles rather than welded from plate. They span the bay between one main frame and the next, commonly 8–10 m, take the load from the roof and wall sheeting into the frames, and in doing so brace the rafters and columns against buckling. They are also the ties that hold the frames in line during erection, before the sheeting goes on.',
    'DSI sizes the secondary system together with the primary system, not after it. The bay spacing, the sheeting profile, the wind zone and the openings fix the purlin and girt spacing, the section and the thickness, so the cleats, flange braces and sag rods are on the shop drawings before any steel is cut.',
  ],
}

export type LegendItem = { label: string; text: string }

/** The secondary members and their neighbours, listed beside the profile drawing. */
export const drawingLegend: LegendItem[] = [
  { label: 'Roof purlin', text: 'Z-section spanning rafter to rafter, carrying the roof sheeting' },
  { label: 'Wall girt', text: 'Z-section spanning column to column, carrying the wall sheeting' },
  { label: 'Eave strut', text: 'The corner member, seated on an eave strut clip at the column top' },
  { label: 'Flange brace', text: 'Angle from a purlin or girt to the inner flange of the rafter or column' },
  { label: 'Cable bracing', text: 'Diagonals in the roof and the wall of a braced bay' },
  { label: 'Rigid frame', text: 'The primary rafter and column the secondary members bear on' },
]

export type SecondaryPart = {
  slug: string
  eyebrow: string
  title: string
  summary: string
  paragraphs: string[]
  /** Short factual points shown as a checklist. */
  points: string[]
  /** Headline facts, as label / value rows. */
  specs: { label: string; value: string }[]
}

export const secondaryParts: SecondaryPart[] = [
  {
    slug: 'purlins',
    eyebrow: 'Part 01',
    title: 'Purlins',
    summary:
      'Roof members spanning from rafter to rafter, carrying the roof sheeting and bracing the rafters along their length.',
    paragraphs: [
      'Purlins run along the length of the building, parallel to the ridge, at a regular spacing across the roof slope. Each one bears on a cleat welded to the top flange of the rafter and spans the bay to the next frame. The roof sheeting fastens to the top flange of the purlin, so the purlin spacing is set by what the sheet can span under wind uplift and foot traffic, not by the purlin itself.',
      'DSI purlins are cold-formed Z-sections. A Z nests over the one behind it at every rafter, so the purlins are lapped and bolted through both webs over each support, which turns a row of simple spans into one continuous member. A continuous purlin is stiffer and carries more than the same section spanning bay by bay, and that is what lets the section stay light.',
      'Sag rods between the purlins at mid-span or third points stop the sections rolling on the slope and hold them straight until the sheeting is fixed and the roof works as a diaphragm. Where the roof is a standing seam system, the purlins also carry the clips and the insulation spacers.',
    ],
    points: [
      'Cold-formed Z-sections from 345 MPa high-tensile steel',
      'Lapped and bolted over each rafter for continuity',
      'Purlin spacing set by the roof sheeting span and wind uplift',
      'Sag rods and bridging to hold the sections in line',
      'Cleats welded to the rafter in the shop, bolted on site',
      'Flange braces from purlin to rafter inner flange where the design calls for them',
    ],
    specs: [
      { label: 'Section', value: 'Cold-formed Z, lapped over the supports' },
      { label: 'Material', value: '345 MPa high-tensile steel' },
      { label: 'Span', value: 'One bay, commonly 8–10 m' },
      { label: 'Connection', value: 'Bolted to shop-welded cleats on the rafter' },
    ],
  },
  {
    slug: 'girts',
    eyebrow: 'Part 02',
    title: 'Girts',
    summary:
      'Wall members spanning from column to column, carrying the wall sheeting and bracing the columns.',
    paragraphs: [
      'Girts are the purlins of the walls. They run horizontally along the sidewalls and endwalls between the columns, at a spacing set by the wall sheeting, and the sheet fastens to their outer flange. The lowest girt sits just above the plinth, the highest just below the eave strut, and the ones between are spaced around the doors, windows and louvers.',
      'On the sidewalls DSI uses the same cold-formed Z-section as the roof, lapped over the columns for continuity. Where an opening interrupts the run, or at the endwalls where a girt frames from one post to the next, a C-section is used because it bolts to the face of the post without a lap. Girts are framed bypass, running outside the column flange so the sheeting is clear of the frame, or flush, set between the columns so the wall build-up is thinner.',
      'Every girt braces the column it bears on. Flange braces from the girt to the inner flange of the column stop the compression flange buckling under the moment at the knee, so the girt spacing is checked against the column design and not only against the sheeting. Headers, sills and jambs of light sections frame the openings and carry the girt loads around them.',
    ],
    points: [
      'Z-section girts on the sidewalls, lapped over the columns',
      'C-section girts at the endwalls and around openings',
      'Bypass or flush framing to suit the wall build-up',
      'Framed openings for doors, windows, louvers and rolling shutters',
      'Flange braces from girt to column inner flange',
      'Sag rods to hold the girts level until the sheeting is on',
    ],
    specs: [
      { label: 'Section', value: 'Cold-formed Z on the sidewalls; C at the endwalls and openings' },
      { label: 'Material', value: '345 MPa high-tensile steel' },
      { label: 'Span', value: 'Column to column, one bay' },
      { label: 'Framing', value: 'Bypass, outside the column, or flush, between the columns' },
    ],
  },
  {
    slug: 'eave-struts',
    eyebrow: 'Part 03',
    title: 'Eave struts',
    summary:
      'The member at the corner of roof and wall that carries the first purlin line and the top girt line, and ties the frames together along the eave.',
    paragraphs: [
      'The eave strut runs along the top of each sidewall column, where the roof slope meets the wall. It is one section doing three jobs: it is the last girt, carrying the top edge of the wall sheeting; it is the first purlin, carrying the lower edge of the roof sheeting; and it is a strut, tying every frame to the next along the length of the building.',
      'Because it sits at the eave, the eave strut is a formed section with one flange set to the wall and the other to the roof slope, so both sheets land on a flat face. It bolts to the top of the column through a shop-welded cleat, and the eave gutter and its brackets hang from it.',
      'The eave strut belongs to the bracing system as much as to the secondary system. In the braced bays it is the chord where the roof and wall X-bracing meet, so wind on the endwall and crane braking forces pass through it on their way to the foundations. It is sized for that axial force as well as for the bending from the sheeting.',
    ],
    points: [
      'One section serving as top girt, first purlin and longitudinal strut',
      'Flanges formed to meet the wall and the roof slope',
      'Carries the eave gutter and its brackets',
      'Chord of the roof and wall bracing in the braced bays',
      'Sized for axial force from wind and crane braking as well as bending',
      'Bolted to the column top through a shop-welded cleat',
    ],
    specs: [
      { label: 'Section', value: 'Cold-formed eave section with flanges at the wall and roof angles' },
      { label: 'Material', value: '345 MPa high-tensile steel' },
      { label: 'Position', value: 'Along the top of the sidewall columns, at the eave' },
      { label: 'Also carries', value: 'Eave gutter, downspout brackets and the ends of the roof and wall bracing' },
    ],
  },
]

export type SectionProfile = {
  code: string
  name: string
  use: string
  text: string
  /** Where the profile is used, as a short checklist. */
  where: string[]
}

/** The two cold-formed profiles the secondary system is made from. */
export const sectionProfiles: SectionProfile[] = [
  {
    code: 'Z',
    name: 'Z-section',
    use: 'Purlins and sidewall girts',
    text:
      'The flanges point in opposite directions, so one Z nests over the next at a support. Lapped and bolted over each frame, a run of Z-sections works as a continuous beam: stiffer, stronger and lighter than the same section spanning bay by bay.',
    where: ['Roof purlins on every slope', 'Sidewall girts', 'Any run that crosses more than one bay'],
  },
  {
    code: 'C',
    name: 'C-section',
    use: 'Endwall girts, framed openings, single spans',
    text:
      'Both flanges point the same way, leaving a flat web that bolts to the face of a post or a jamb without a lap. Used where a member spans one bay only, frames an opening or has to sit flush with the frame.',
    where: ['Endwall girts between the posts', 'Headers, sills and jambs of openings', 'Flush-framed girts and single-bay purlins'],
  },
]

export type Detail = { title: string; text: string }

/** The small parts that make the secondary system work; shown as a card grid. */
export const secondaryDetails: Detail[] = [
  {
    title: 'Laps',
    text: 'Z-purlins and girts overlap at each frame and bolt through both webs, so every run is continuous over its supports.',
  },
  {
    title: 'Cleats',
    text: 'Short plates welded to the rafters and columns in the shop, so purlins and girts bolt on site with no site welding.',
  },
  {
    title: 'Sag rods',
    text: 'Round bars between the purlins and girts at mid-span or third points, holding them straight and stopping them rolling on the slope.',
  },
  {
    title: 'Flange braces',
    text: 'Angles from a purlin or girt to the inner flange of the rafter or column, which are what let the tapered frame sections stay light.',
  },
  {
    title: 'Framed openings',
    text: 'Headers, sills and jambs of light sections that carry the girt loads around doors, windows, louvers and rolling shutters.',
  },
  {
    title: 'Fasteners and bridging',
    text: 'Every bolt, sag rod, bridging piece and flange brace is scheduled on the erection drawings and supplied with the frame.',
  },
]

export type SecondaryFaq = { question: string; answer: string }

export const secondarySystemFaq: SecondaryFaq[] = [
  {
    question: 'Why cold-formed Z-sections rather than hot-rolled channels?',
    answer:
      'A cold-formed Z is lighter than a hot-rolled channel of the same stiffness, and it laps over its supports so a run works as a continuous beam. Less steel goes into the roof and walls, and the frames carry less dead load. Hot-rolled sections are used only where a purlin or girt has to carry an unusual point load.',
  },
  {
    question: 'What decides the purlin spacing?',
    answer:
      'The roof sheeting. Each profile has a span it can cover under wind uplift and foot traffic, and the purlins are set at or inside that span. Insulation, daylight panels, roof monitors and the fixings of a standing seam system all narrow it. The girt spacing follows the wall sheeting in the same way.',
  },
  {
    question: 'Can the girts sit flush with the columns?',
    answer:
      'Yes. Bypass girts, which run outside the column flange, are the standard because they lap and stay continuous. Flush girts framed between the columns are used where the wall has to be thin, where a liner panel sits inside the girts, or where an opening needs a clean jamb. Both are detailed from the same drawings.',
  },
  {
    question: 'Can openings be added after the building is up?',
    answer:
      'A door or window can be cut into a wall later by re-framing the girts around it with a header and jambs, but a large opening in a braced bay moves the bracing and changes the load path. Openings planned at the design stage cost nothing extra; openings added later cost a site visit and a check of the frame.',
  },
]
