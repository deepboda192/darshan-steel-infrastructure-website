/**
 * Copy for the Mezzanine Floors page — the intermediate floor built inside
 * a pre-engineered building, part by part: beams and columns, deck sheet,
 * handrails and staircase. Everything here describes general PEB practice.
 * No floor loads, spans, thicknesses or rail heights are quoted because the
 * catalogue does not give them; the only catalogue facts used are the two
 * details it draws (the section through the floor and the edge at the
 * sidewall) and its note that the concrete slab is not provided by DSI.
 */

export const mezzanineMeta = {
  title: 'PEB Mezzanine Floors: Beams, Deck Sheet, Handrails & Stairs | DSI',
  description:
    'Mezzanine floors in a pre-engineered building: steel beams, joists and columns, profiled deck sheet under a concrete slab or chequered plate, handrails and staircases, designed and built with the frame.',
}

export const mezzanineIntro = {
  lead:
    'A mezzanine is an intermediate floor built inside the height of the building: steel beams and joists on their own columns or on the main frame, a deck sheet over them, and the handrails and stairs that make it usable.',
  paragraphs: [
    'Industrial buildings are tall, and most of that height is used only by the crane or the racking. A mezzanine puts a second floor in the volume already enclosed, for offices, stores, light assembly or plant rooms, without adding to the footprint or the roof. It is the cheapest floor area in the building, because the walls and the roof over it are already paid for.',
    'DSI designs the mezzanine as part of the building. Its columns share the foundations, its beams connect to the main-frame columns where the layout allows, and its loads are in the frame analysis from the start. Beams, joists, columns, deck sheet, edge trims, handrails and staircases are fabricated in the same shop and erected by the same crew as the frame. The reinforced concrete slab on the deck is by the client’s civil contractor.',
  ],
}

export type MezzaninePart = {
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

export const mezzanineParts: MezzaninePart[] = [
  {
    slug: 'beams-and-columns',
    eyebrow: 'Part 01',
    title: 'Mezzanine beams & columns',
    summary:
      'The steel grid that carries the floor: primary beams from column to column, joists between them, and the columns that take the load to the ground.',
    paragraphs: [
      'Mezzanine beams span between the mezzanine columns, or from a mezzanine column to a bracket on the main-frame column, and the joists span between the beams at a spacing set by the deck sheet. The joists frame into the beam web through bolted connections, so the top flanges are level and the deck lands flat.',
      'Beams and joists are hot-rolled or built-up I-sections, chosen for the span and the floor load, and checked for deflection and vibration as well as strength so an office floor feels solid underfoot. Columns are hot-rolled or built-up sections on their own base plates and anchor bolts, cast with the main-frame foundations.',
      'The layout follows the use. A store needs a clear run under the mezzanine for forklifts; an office block over it needs a column grid that suits the partitions below. The mezzanine columns are set out on the main-frame bays so nothing lands in a doorway or a crane aisle.',
    ],
    points: [
      'Primary beams from column to column, joists between them',
      'Hot-rolled or built-up sections chosen for span and floor load',
      'Bolted joist-to-beam connections with level top flanges',
      'Checked for deflection and vibration as well as strength',
      'Own columns on foundations cast with the main frame',
      'Bracing or moment connections for lateral stability where the layout needs them',
    ],
    specs: [
      { label: 'Beams and joists', value: 'Hot-rolled or built-up I-sections, bolted on site' },
      { label: 'Support', value: 'Mezzanine columns, or brackets on the main-frame columns' },
      { label: 'Foundations', value: 'Base plates on anchor bolts, cast with the frame' },
      { label: 'Design checks', value: 'Strength, deflection and vibration for the floor use' },
    ],
  },
  {
    slug: 'deck-sheet',
    eyebrow: 'Part 02',
    title: 'Deck sheet',
    summary:
      'The profiled steel sheet laid over the joists, which carries the concrete slab or forms the floor itself.',
    paragraphs: [
      'The mezzanine deck panel is a galvanized profiled steel sheet screwed to the joists, with its ribs spanning across them. Under a concrete floor it is the permanent formwork: the client’s civil contractor lays the reinforcement and pours the slab on it, with no props to set and no shuttering to strike. The deck carries the wet concrete and the working load until the slab has cured.',
      'Where a concrete slab is not wanted, for a light store or a plant platform, the floor can be a chequered plate on closer joists, or a deck sheet with a board finish. In either case the joist spacing is set by the deck profile and the load it has to carry.',
      'An edge trim closes the deck at the perimeter and along openings, holding the concrete at the slab edge and giving the sidewall a clean line. At the sidewall the deck stops short of the wall girt, so the sheeting, insulation and liner can pass behind it.',
    ],
    points: [
      'Galvanized profiled deck sheet screwed to the joists',
      'Permanent formwork for a reinforced concrete slab, laid without props',
      'Reinforced concrete slab by the client’s civil contractor',
      'Chequered plate or board finish where a slab is not wanted',
      'Edge trims at the perimeter and around openings',
      'Deck stopped clear of the wall girts and sheeting',
    ],
    specs: [
      { label: 'Deck', value: 'Galvanized profiled steel sheet, ribs across the joists' },
      { label: 'Slab', value: 'Reinforced concrete on the deck, not provided by DSI' },
      { label: 'Alternatives', value: 'Chequered plate, or deck sheet with a board finish' },
      { label: 'Edge', value: 'Steel edge trim at the perimeter and openings' },
    ],
  },
  {
    slug: 'handrails',
    eyebrow: 'Part 03',
    title: 'Hand rails',
    summary: 'Guarding along every open edge of the floor, the stair and the landings.',
    paragraphs: [
      'Every open edge of a mezzanine, at the perimeter, at the stair opening and around any hatch, is guarded by a handrail: posts bolted to the edge beam, a top rail, a mid rail and a kick plate at the floor. The kick plate stops tools and pallets being pushed over the edge; the mid rail closes the gap a person could fall through.',
      'Handrails are fabricated from hollow sections or angles, galvanized or painted, in panels sized to bolt between the posts, so a panel can be taken out where a pallet gate or a loading bay is needed. A pallet gate lets a forklift place goods on the floor without ever leaving an open edge.',
      'The height of the rails, the gaps between them and the load they resist follow the standard that applies to the building. DSI details them with the floor, so the posts land on steel rather than on the edge of the slab.',
    ],
    points: [
      'Posts, top rail, mid rail and kick plate at every open edge',
      'Hollow-section or angle rails, galvanized or painted',
      'Bolted panels between posts, removable where access is needed',
      'Pallet gates or loading bays for forklift access',
      'Posts fixed to the edge beam, not to the slab edge',
      'Heights and gaps to the applicable standard',
    ],
    specs: [
      { label: 'Make-up', value: 'Posts, top rail, mid rail and kick plate' },
      { label: 'Sections', value: 'Hollow sections or angles, galvanized or painted' },
      { label: 'Fixing', value: 'Bolted to the edge beam through base plates' },
      { label: 'Access', value: 'Pallet gates and removable panels where needed' },
    ],
  },
  {
    slug: 'staircase',
    eyebrow: 'Part 04',
    title: 'Staircase',
    summary: 'Steel stairs from the ground floor to the mezzanine, with landings, treads and handrails to match.',
    paragraphs: [
      'A steel staircase connects the two floors: a pair of channel or plate stringers carrying the treads, a landing where the flight turns or grows too long, and handrails on both sides. The stair is planned with the floor, so its opening is framed by the joists and its landing bears on the mezzanine beam.',
      'Treads are chequered plate, grating or concrete-filled pans, chosen for the traffic: grating for a plant platform, plate for a store, filled pans for an office. Every tread has the same rise and going, and the stringers bolt to a base plate at the floor and to the edge beam at the top.',
      'Where the mezzanine is a large store, a second stair gives a second way down, and a pallet gate or a goods-lift opening sits beside it so goods do not travel on the stair.',
    ],
    points: [
      'Channel or plate stringers, with a landing where needed',
      'Chequered plate, grating or concrete-filled treads',
      'Equal rise and going on every step',
      'Handrails on both sides to match the floor guarding',
      'Opening framed by the joists, landing on the edge beam',
      'Second stair where the floor area calls for a second way down',
    ],
    specs: [
      { label: 'Stringers', value: 'Channel or plate, bolted top and bottom' },
      { label: 'Treads', value: 'Chequered plate, grating or concrete-filled pans' },
      { label: 'Landings', value: 'Where the flight turns or grows too long' },
      { label: 'Guarding', value: 'Handrails both sides, matching the floor handrails' },
    ],
  },
]

export type Drawing = { key: 'section' | 'edge'; title: string; caption: string }

/** The two catalogue details, recoloured to the brand blue. */
export const mezzanineDrawings: Drawing[] = [
  {
    key: 'section',
    title: 'Section through the floor',
    caption:
      'The deck panel screwed across the joists carries the reinforced concrete slab, which is not provided by DSI. The joists bolt into the web of the mezzanine beam.',
  },
  {
    key: 'edge',
    title: 'Edge detail at the sidewall',
    caption:
      'At the sidewall the mezzanine beam frames into the main-frame column, the deck stops short of the sidewall girt and panel, and an edge trim closes the slab edge.',
  },
]

export type LegendItem = { label: string; text: string }

/** The parts labelled on the two drawings, repeated as text because the labels are small. */
export const mezzanineLegend: LegendItem[] = [
  { label: 'Mezzanine beam', text: 'Primary member from column to column, carrying the joists' },
  { label: 'Mezzanine joist', text: 'Secondary member between the beams, carrying the deck' },
  { label: 'Deck panel', text: 'Profiled steel sheet across the joists, the formwork for the slab' },
  { label: 'Concrete slab', text: 'Reinforced concrete on the deck, by the client’s civil contractor' },
  { label: 'Edge trim', text: 'Steel trim at the slab edge along the perimeter and openings' },
  { label: 'Main frame column', text: 'The primary column the mezzanine beam frames into at the sidewall' },
]

export type MezzanineUse = { title: string; text: string }

/** What mezzanines are built for, as a card grid. */
export const mezzanineUses: MezzanineUse[] = [
  { title: 'Offices', text: 'Supervision, planning and admin over the shop floor, with the work in view.' },
  { title: 'Stores', text: 'Spares, raw material and finished goods on racking, off the production floor.' },
  { title: 'Light assembly', text: 'Bench work, testing and packing where forklifts do not need to reach.' },
  { title: 'Plant rooms', text: 'Compressors, panels, air handling and utilities out of the way of production.' },
  { title: 'Packing & dispatch', text: 'A picking and packing floor above the loading bay, fed by a goods lift.' },
  { title: 'Canteen & welfare', text: 'Staff rooms, lockers and a canteen without taking ground-floor area.' },
]

export type MezzanineFaq = { question: string; answer: string }

export const mezzanineFaq: MezzanineFaq[] = [
  {
    question: 'Can a mezzanine be added to an existing DSI building?',
    answer:
      'Yes. A free-standing mezzanine on its own columns and footings is the usual answer for an existing building, because it adds nothing to the frame. One that hangs from the main-frame columns needs the frame and its foundations checked first. Either way the floor is designed to the use and load you name.',
  },
  {
    question: 'Who provides the concrete slab?',
    answer:
      'DSI supplies and fixes the deck sheet and the edge trims. The reinforcement and the concrete are by the client’s civil contractor, poured on the deck as permanent formwork. DSI states the slab the deck is designed for and the load the floor is designed to carry.',
  },
  {
    question: 'What load can a mezzanine carry?',
    answer:
      'Whatever it is designed for. Offices, stores and plant floors have very different loads, and a store’s load depends on how high the racking goes. The load is fixed with you before any beam is sized, it is written on the drawings, and it can be posted at the top of the stair.',
  },
  {
    question: 'Does a mezzanine need its own columns?',
    answer:
      'Usually. Hanging a narrow floor from the main frame is possible, but a full-width floor is cheaper on its own columns, with the main frame carrying only the roof and the crane. The mezzanine columns are set on the frame grid so they miss the aisles, the doors and the crane run.',
  },
]
