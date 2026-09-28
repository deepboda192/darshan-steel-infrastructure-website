/**
 * Copy for the Primary System page — the load-carrying skeleton of a
 * pre-engineered building, part by part. Everything here describes general
 * PEB engineering practice. The only figures quoted (50–60 m clear spans,
 * 8–10 m bays, 345 MPa plate, 50 MT cranes to 40 m span, SA 2.5 blast with
 * an 80–120 micron primer) are the catalogue's own; the crane beam part
 * follows the catalogue's "Crane Beam System" page.
 */

export const primarySystemMeta = {
  title: 'PEB Primary Framing System: Frames, Cranes & Bracing | DSI',
  description:
    'The primary system of a pre-engineered building: the six rigid frame types, built-in crane systems, canopies and fascia, and the bracing that keeps it square.',
}

export const primarySystemIntro = {
  lead:
    'The primary system is the skeleton of a pre-engineered building: the rigid frames that carry every load to the foundations, and the crane runways, canopies and bracing that hang off them.',
  paragraphs: [
    'Everything else in the building, the purlins and girts, the sheeting, the mezzanine and the accessories, is attached to the primary system. Its geometry sets the span, bay spacing, eave height and roof slope, and its members are sized for the dead, live, wind, seismic, crane and collateral loads the building will see.',
    'DSI designs the primary system first, from the operation inside the building outward. The frame type, the crane duty and the openings are fixed before a single member is sized, so the crane brackets, canopy cantilevers and bracing are part of the analysis rather than additions to it.',
  ],
}

export type Part = {
  slug: string
  eyebrow: string
  title: string
  summary: string
  paragraphs: string[]
  /** Short factual points shown as a checklist. */
  points?: string[]
  /** What DSI supplies with this part, as a checklist. */
  supply?: string[]
  /** Headline figures, as label / value rows. */
  specs?: { label: string; value: string }[]
  /** Why having DSI build this part together with the frame pays off. */
  advantages?: { title: string; text: string }[]
}

export type FrameType = {
  code: string
  name: string
  description: string
  bestFor: string
  /** The catalogue's practical width for the type. */
  width: string
}

/** The eight rigid-frame configurations in the DSI catalogue, with its practical widths. */
export const frameTypes: FrameType[] = [
  {
    code: 'CS',
    name: 'Clear span',
    width: 'Practical width 50 m',
    description:
      'A single rigid frame from sidewall to sidewall with no interior columns. Tapered columns and rafters put steel where the bending moment is greatest, at the knee and the ridge.',
    bestFor: 'Column-free floors: production halls, warehouses, hangars and sports halls.',
  },
  {
    code: 'MS-1',
    name: 'Multi-span 1',
    width: 'Practical width module 70 m',
    description:
      'One line of interior columns under the ridge divides the building into two width modules, so each rafter is shorter and lighter than a clear span of the same width.',
    bestFor: 'Wide buildings where a central column line suits the layout.',
  },
  {
    code: 'MS-2',
    name: 'Multi-span 2',
    width: 'Practical width module 90 m',
    description:
      'Two lines of interior columns give three width modules under one gabled roof. The interior columns are straight and pinned at the base.',
    bestFor: 'Large plants and logistics parks planned on a column grid.',
  },
  {
    code: 'MS-3',
    name: 'Multi-span 3',
    width: 'Practical width module 120 m',
    description:
      'Three lines of interior columns give four width modules, the widest standard configuration under a single ridge.',
    bestFor: 'The widest buildings, laid out as repeated bays of equal span.',
  },
  {
    code: 'MG',
    name: 'Multi-gable',
    width: 'Practical width module 80 m',
    description:
      'Two gabled frames side by side sharing a valley column, with a ridge line over each and an internal gutter at the valley. Each gable is a modest span, so the members stay light.',
    bestFor: 'Very wide buildings where a multi-span rafter would be too deep, or where a gabled profile is required.',
  },
  {
    code: 'RS',
    name: 'Roof system',
    width: 'Practical width 30 m',
    description:
      'A gabled roof frame alone, bearing on supports that are not by DSI: masonry or concrete walls and columns already standing.',
    bestFor: 'Roofing over existing walls, or a concrete-framed building that needs a steel roof.',
  },
  {
    code: 'SS',
    name: 'Single slope',
    width: 'Practical width 50 m',
    description:
      'The roof falls in one direction, from a tall sidewall to a low one, so all rainwater drains to one side. Columns differ in height on the two walls.',
    bestFor: 'Sites with a height limit on one boundary, and buildings that must drain away from a neighbour.',
  },
  {
    code: 'LT',
    name: 'Lean-to',
    width: 'Practical width 24 m',
    description:
      'A single-slope frame that borrows one line of support from an existing building or a main frame, with its own columns only on the outer wall.',
    bestFor: 'Adding covered area beside a building already standing: loading, storage or plant rooms.',
  },
]

export const parts: Part[] = [
  {
    slug: 'primary-framing',
    eyebrow: 'Part 01',
    title: 'Primary framing system',
    summary:
      'The rigid frames, endwall frames and columns that carry the roof and walls and take every load to the ground.',
    paragraphs: [
      'A main frame is a column on each sidewall joined to a pair of rafters at the ridge, with moment-resisting connections at the knees and the ridge so the frame stands on its own. The frames repeat along the building at the bay spacing, commonly 8–10 m, and the purlins and girts span between them.',
      'Members are built-up I-sections: web and flange plates cut to size and welded, with the web depth tapered along the length so the section is deepest where the bending moment is greatest. Plate is 345 MPa structural steel, and the frames are joined on site with high-strength bolts through end plates, so nothing is welded on site.',
      'Endwall frames close the building at each end. A post-and-beam endwall, with light columns and a rafter that only spans between them, is the economical choice when the building will never grow that way. A rigid endwall, a full main frame at the end, lets the building be extended later by adding bays.',
    ],
    points: [
      'Tapered built-up columns and rafters, sized frame by frame',
      'Moment connections at knee and ridge with high-strength bolts',
      'Pinned or fixed column bases on anchor bolts cast into the foundations',
      'Post-and-beam or rigid (expandable) endwall frames',
      'Clear spans to 50–60 m and 8–10 m bays without jack beams',
    ],
  },
  {
    slug: 'crane-system',
    eyebrow: 'Part 02',
    title: 'Crane beam system',
    summary:
      'Crane beams, rails and brackets built into the frame, so an overhead crane can run the length of the building.',
    paragraphs: [
      'DSI designs pre-engineered buildings to support a wide range of crane systems. Electric overhead travelling (EOT) cranes of up to 50 MT are mounted directly on brackets welded to the main-frame columns. For heavier capacities an independent support system, with its own columns beside the frame, carries the runway so the building keeps its strength and stability.',
      'The runway is a pair of crane beams, one on each side of the aisle, resting on the column brackets. The crane rail sits on the beam, held by rail clips, with end stops and bumpers at the extremes of travel. Because the crane beams and the building come from one source, the bay spacing and the crane beam span are set together, and the rail beams are designed within the building system rather than fitted to it afterwards.',
      'A crane adds vertical wheel loads with impact, a lateral surge as the trolley brakes and a longitudinal force as the bridge brakes. The columns, brackets and foundations are designed for all three, the runway beam is checked for fatigue over its working life, and deflection is held to tighter limits than the rest of the building so the crane runs true.',
    ],
    supply: [
      'All fixing components, cleats and fasteners',
      'Shot-blasted finish to SA 2.5 with an 80–120 micron primer coat',
      'Complete static calculations and erection drawings',
    ],
    specs: [
      { label: 'Standard crane capacity', value: 'Up to 50 MT' },
      { label: 'Standard crane span', value: 'Up to 40 m' },
      { label: 'Crane types', value: 'Single girder (Type I) and double girder (Type II)' },
      { label: 'Mounting', value: 'Directly on column brackets up to 50 MT; an independent support system above that' },
    ],
    advantages: [
      { title: 'Seamless integration', text: 'The crane system is designed as part of the DSI PEB system, not added to it later.' },
      { title: 'Single-source supply', text: 'Crane beams and the building structure come from one supplier, so everything fits.' },
      { title: 'Optimised for cost', text: 'Bay spacing and crane beam span are set together, so neither is oversized.' },
      { title: 'Integrated design', text: 'Crane rail beams are designed within the building system, with its loads in the analysis.' },
    ],
  },
  {
    slug: 'canopies-and-fascia',
    eyebrow: 'Part 03',
    title: 'Canopies & fascia',
    summary:
      'Roof extensions that shelter openings and loading bays, and the vertical faces that give the building its front.',
    paragraphs: [
      'A canopy is a cantilevered extension of the roof beyond the sidewall or endwall, usually over doors, loading docks or a walkway. Short canopies cantilever from the main-frame rafter or from a bracket on the column; longer ones carry their own purlins and are propped by stub columns at the outer edge. A gutter along the free edge takes the rainwater.',
      'A fascia is a vertical or sloping face fixed above the eave or across the endwall. It hides the roof line and gutters, carries the building’s name and signage, and gives an industrial building a finished commercial front. It is framed with light sections off the main frame and clad to match the walls.',
      'Both are designed as part of the frame, because a canopy adds a bending moment at the column and a fascia adds a wind load high on the wall. Deciding them at the engineering stage keeps the columns right-sized and the connections clean.',
    ],
    points: [
      'Eave, endwall and doorway canopies, cantilevered or column-supported',
      'Front and parapet fascia clad to match the walls',
      'Gutters and downspouts along the free edge of a canopy',
      'Signage and lighting support built into the fascia framing',
      'Loads from both carried in the main-frame design',
    ],
  },
  {
    slug: 'bracing-systems',
    eyebrow: 'Part 04',
    title: 'Bracing systems',
    summary:
      'The diagonals, struts and ties that hold the frames upright and square along the length of the building.',
    paragraphs: [
      'A rigid frame is stiff in its own plane and slender out of it. Bracing supplies the stiffness in the other direction: it carries wind on the endwalls, crane braking and seismic forces along the building to the foundations, and it holds the frames in line during erection before the sheeting is on.',
      'Roof bracing is a set of diagonal rods, cables or angles in the roof plane, forming an X in selected bays, that turns the roof into a stiff diaphragm. Wall bracing does the same in the sidewalls and endwalls. Where doors or windows leave no room for a diagonal, a portal (wind) frame of stiffer members takes its place. Eave struts along the eave and struts along the ridge tie the frames together and complete the load path.',
      'Flange bracing is smaller but just as necessary: short angles from the purlins and girts to the inner flange of the rafters and columns stop the compression flange from buckling sideways, which is what lets the tapered sections stay light.',
    ],
    points: [
      'Roof X-bracing in braced bays, rods with hillside washers or angles',
      'Sidewall and endwall bracing, or portal frames where openings intervene',
      'Eave struts and ridge struts tying the frames together',
      'Flange braces to the inner flange of rafters and columns',
      'Extra bracing in crane bays for longitudinal braking forces',
    ],
  },
]

export type DesignLoad = {
  name: string
  /** How the load acts on the frame: down through it, sideways on it, or both. */
  kind: 'Gravity' | 'Lateral' | 'Gravity + lateral'
  note: string
}

/** The loads the primary system is sized for; shown as a card grid. */
export const designLoads: DesignLoad[] = [
  { name: 'Dead load', kind: 'Gravity', note: 'Self-weight of frame, purlins, girts and sheeting' },
  { name: 'Collateral load', kind: 'Gravity', note: 'Services, sprinklers, ducting and ceilings hung from the frame' },
  { name: 'Live load', kind: 'Gravity', note: 'Roof maintenance and access' },
  { name: 'Wind load', kind: 'Lateral', note: 'Pressure and suction on roof and walls, and on the endwalls along the building' },
  { name: 'Crane load', kind: 'Gravity + lateral', note: 'Wheel loads with impact, lateral surge and longitudinal braking' },
  { name: 'Seismic load', kind: 'Lateral', note: 'Ground motion, resisted by the frames and the bracing' },
]

/** What follows once the load cases are combined: the chain the intro paragraph describes. */
export const designChain = [
  { title: 'Load cases combined', text: 'Every case above, in the combinations the code calls for.' },
  { title: 'Members sized', text: 'Columns, rafters and crane beams checked for strength and deflection.' },
  { title: 'Connections and foundations', text: 'Detailed from the same forces, so nothing is sized in isolation.' },
]

export type PrimaryFaq = { question: string; answer: string }

export const primarySystemFaq: PrimaryFaq[] = [
  {
    question: 'Which frame type should I choose?',
    answer:
      'Start from what happens inside. A column-free floor points to a clear-span frame; a very wide building with a workable column grid is cheaper as multi-span; a boundary height limit or one-sided drainage calls for single slope. DSI fixes the frame type with you before sizing any member.',
  },
  {
    question: 'Can a crane be added to a PEB later?',
    answer:
      'Only if the frame was designed for it. Crane loads change the columns, brackets and foundations, so a building meant to carry a crane one day should be engineered for that duty now, even if the crane is installed later.',
  },
  {
    question: 'Why are the columns tapered?',
    answer:
      'The bending moment in a rigid frame is greatest at the knee and small at the base, so a section that is deep at the top and shallow at the bottom uses the least steel. Straight columns are used where a vertical inside face matters more than the saving.',
  },
  {
    question: 'How many braced bays does a building need?',
    answer:
      'It depends on the building length, the wind and seismic forces and the crane duty. Bracing is normally placed in the end bays and at intervals along the length, and in the crane bays. It is designed as part of the frame analysis, not added by rule of thumb.',
  },
]
