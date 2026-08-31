import { galleryFor, type PlateKind } from './images'

/**
 * ============================================================================
 * PROJECTS
 * ============================================================================
 * SOURCE: the "Gratified Clients" pages of the Darshan Steel Group product
 * catalogue (Edition 3). Client name, sector and built-up area are reproduced
 * exactly as published there.
 *
 * WHAT IS REAL AND WHAT IS NOT
 * ----------------------------
 * REAL, per record — client name, building type, location and built-up area.
 * REAL, company-wide — the scope of supply and the material/finish standards
 * in `technical`, which are DSI's standard supply as stated in the catalogue.
 *
 * NOT PER-SITE REPORTAGE — the `study` narrative. The catalogue publishes no
 * commentary on individual projects, so the case-study body is written at the
 * level of the SECTOR: what this class of building has to solve for, and how
 * DSI's delivery chain addresses it. It contains no invented dates, tonnages,
 * spans, incidents or measured outcomes. Sector copy is shared by projects in
 * the same sector by design — see `sectorStudy` below.
 *
 * `year` is intentionally EMPTY. The catalogue dates none of these projects and
 * a guessed year would be a fabricated fact. Components skip the Year row when
 * it is empty, so no bracketed placeholder is published. Fill it in per record
 * when DSI supplies commissioning dates.
 *
 * TO ADD REAL PROJECT PHOTOGRAPHY
 * -------------------------------
 * `photo` currently cycles the six stock cover images under /public/images.
 * The catalogue contains a real photograph of every project below; drop each
 * one into /public/images and point `photo` at it, then replace `gallery` with
 * per-project plates instead of the shared pool in data/images.ts.
 * ============================================================================
 */

export type ProjectImage = { src: string; alt: string; plate: PlateKind; label: string }

export type Project = {
  index: string
  slug: string
  /** Client / project name as published in the company catalogue. */
  name: string
  /** Category label shown on the card. */
  buildingType: string
  location: string
  /** Commissioning year. Empty string = not published; the row is omitted. */
  year: string
  area: string
  scope: string[]
  /** True when name, type, location and area are real, checked values. */
  verified: boolean
  /** Cover photograph under /public. See data/images.ts to swap it. */
  photo: string
  /** Fallback scene used only if `photo` is emptied. */
  plate: PlateKind
  /** Case-study body. Sector-level engineering narrative, not site reportage. */
  study: {
    overview: string
    challenge: string
    approach: string
    execution: string
    result: string
  }
  technical: { label: string; value: string }[]
  gallery: ProjectImage[]
}

/** Scope of supply — the catalogue's "single window solution". */
const SCOPE = ['Design & Engineering', 'Fabrication', 'Supply', 'Erection']

/**
 * Standard supply specification, identical across records because it describes
 * how DSI builds rather than anything particular to one site. Grades are those
 * printed in the catalogue.
 */
const STANDARD_SPEC = [
  { label: 'Scope', value: 'Design, fabrication, supply & erection' },
  { label: 'Structural steel', value: '345 MPa primary & secondary members' },
  { label: 'Roof & wall sheeting', value: 'S550 high-tensile, 0.50–0.80 mm' },
  { label: 'Surface treatment', value: 'Shot-blasted to SA 2.5' },
  { label: 'Primer', value: '80–120 microns' },
]

type Sector =
  | 'paper'
  | 'forging'
  | 'beverage'
  | 'logistics'
  | 'laminates'
  | 'appliances'
  | 'metal'
  | 'machinery'
  | 'chemical'
  | 'decorative'
  | 'hygiene'
  | 'film'
  | 'valves'

/**
 * Sector-level case-study copy. Describes the structural problem the sector
 * sets and how the PEB system answers it. No project-specific claims.
 */
const sectorStudy: Record<Sector, Project['study']> = {
  paper: {
    overview:
      'A paper mill is a continuous-process building. Machine lines run the length of the hall, stock and reels move by overhead crane, and the structure has to stay clear of both. The frame is sized around the machine envelope rather than the other way round.',
    challenge:
      'Paper machines are long, heavy and intolerant of movement. Crane duty is constant, humidity is high, and any column landing inside the machine line would force the process to work around the building.',
    approach:
      'Clear-span portal frames keep the machine hall column-free. Crane brackets and gantry beams are designed into the columns as part of the same analysis, so the crane load path is resolved before fabrication rather than bolted on afterwards.',
    execution:
      'Members are cut, drilled and welded on CNC lines, blast-cleaned to SA 2.5 and primed before dispatch. Steel leaves the shop bundled in erection sequence so the frame goes up in the order the drawings assume.',
    result:
      'A column-free process hall with the crane system integrated into the building structure, supplied and erected under single-point responsibility.',
  },
  forging: {
    overview:
      'A forging plant puts more into its building than most. Hammers and presses transmit shock into the floor and frame, material moves overhead continuously, and radiant heat drives the ventilation strategy.',
    challenge:
      'Impact loading and heavy crane duty govern the frame, while heat and scale demand a roof that can ventilate and a coating system that survives the environment.',
    approach:
      'Frames are checked for crane, wind and seismic combinations together rather than in isolation. Ridge ventilation and roof monitors are set into the roof geometry, and the coating specification is chosen for the operating environment.',
    execution:
      'Built-up sections are fabricated from plate so depth follows the bending moment, then inspected at fixed hold points for weld quality and coating thickness before release.',
    result:
      'A crane-served forging bay engineered for impact duty and ventilated through the roof structure itself.',
  },
  beverage: {
    overview:
      'Beverage production combines wet processing, filling lines and finished-goods storage under one roof, each with a different demand on the envelope.',
    challenge:
      'Wash-down areas need corrosion-conscious steelwork, filling halls need clear floor for line changes, and the warehouse end needs height for pallet storage — inside a single continuous structure.',
    approach:
      'The frame is zoned: clear spans over the process floor, higher eaves over storage, and the coating specification stepped to match the wet and dry zones.',
    execution:
      'Fabrication is sequenced by erection bay so the structure closes in the order the fit-out needs it. Sheeting and flashing are supplied with the frame as one package.',
    result:
      'A single structure carrying process, filling and storage, each zone detailed for the conditions it actually operates in.',
  },
  logistics: {
    overview:
      'A logistics building is a machine for moving pallets. Rack lines, aisle widths, turning circles and dock positions are fixed before the structure is, and the grid has to agree with all of them.',
    challenge:
      'A column in an operating aisle costs storage positions for the life of the building. Eave height is set by vertical storage, and high, light structures are governed by wind uplift rather than gravity load.',
    approach:
      'Bay spacing is taken from the racking layout before the frame is sized. High-eave framing is checked for uplift and for the deflection limits the cladding system needs, and dock canopies are detailed with the main frame.',
    execution:
      'Members are fabricated and bundled by erection bay. Dock structures and canopies are dispatched alongside the frame so the envelope closes in one pass.',
    result:
      'A distribution facility whose grid matches its racking layout, with docks and canopies delivered as part of the same structural package.',
  },
  laminates: {
    overview:
      'Plywood and laminate production runs presses, dryers and long panel lines under a single large-span roof, with dust and heat extraction routed through the structure.',
    challenge:
      'Panel lines demand uninterrupted floor length, presses concentrate load, and extraction ductwork needs support points that were planned rather than improvised.',
    approach:
      'Long clear spans keep the panel line uninterrupted. Duct and equipment support points are carried by the frame and designed in at detailing stage rather than added on site.',
    execution:
      'A single coordinated model drives shop drawings, erection drawings and material lists, so what is fabricated matches what is erected.',
    result:
      'A large-span production hall with service and equipment supports designed into the frame.',
  },
  appliances: {
    overview:
      'Appliance manufacturing mixes press work, assembly and finished-goods storage, with material moving between them throughout the shift.',
    challenge:
      'Assembly layouts change more often than buildings do, so usable clear area and the ability to reconfigure matter more than any single fixed arrangement.',
    approach:
      'Clear-span framing maximises usable floor within the permitted footprint, with end bays detailed so the building can be extended by adding bays rather than by structural rework.',
    execution:
      'Components are produced in-house on CNC cutting, welding and forming lines, then dispatched with packing lists that match the erection drawings mark for mark.',
    result:
      'A flexible production and storage envelope with provision for future extension built into the end bays.',
  },
  metal: {
    overview:
      'Metal and tube production is a material-handling problem first. Long stock arrives, moves through the line and leaves, and the crane runs almost continuously.',
    challenge:
      'Long material runs need bay length and unobstructed crane travel; heavy stock loads the floor and the gantry alike.',
    approach:
      'Bay spacing and crane span are optimised together for cost efficiency, with crane rail beams designed as part of the building system rather than as a separate structure.',
    execution:
      'Crane beams are supplied with all fixing components, cleats and fasteners, together with static calculations and erection drawings.',
    result:
      'A crane-served production bay with the rail beams integrated into the building frame from the first analysis run.',
  },
  machinery: {
    overview:
      'A machine-tool plant needs stable, well-lit floor area and dependable overhead handling to move workpieces between stations.',
    challenge:
      'Machining tolerances make the plant sensitive to vibration and to poor light, while assembly needs clear height for lifting.',
    approach:
      'Clear-span frames give unobstructed floor for machine layout, with daylight panels and ridge ventilation set into the roof to cut reliance on artificial light.',
    execution:
      'Members are shot-blasted to SA 2.5 and primed to 80–120 microns for protection through transport and erection, then assembled with high-tensile bolted connections.',
    result:
      'A column-free machining and assembly hall lit through the roof and served by overhead cranes.',
  },
  chemical: {
    overview:
      'Chemical and ceramic-surface production places a corrosive, often humid load on everything the structure is made of.',
    challenge:
      'Standard industrial coatings do not survive a chemical environment, and every fixing, flashing and support point is a place for corrosion to start.',
    approach:
      'The coating specification is set for the operating environment rather than to a general industrial default, with optional corrosion-protection paint over the standard primer.',
    execution:
      'Dry film thickness is measured and recorded across each coated member before it leaves the shop, and non-conformances are closed prior to dispatch.',
    result:
      'A production building specified and coated for the environment it has to stand in.',
  },
  decorative: {
    overview:
      'A decorative-surfaces plant is part factory and part showroom: production behind, a client-facing frontage in front, both carried by the same structure.',
    challenge:
      'Steel that is visible in the finished building has to meet a finish standard as well as a strength standard, and the frontage has to carry glazing without compromising the production span behind it.',
    approach:
      'Facade and glazing support systems are coordinated with the architect while the production hall behind is framed for clear span. Exposed connections are detailed to be seen.',
    execution:
      'Exposed members are handled and packed to protect the coating in transit, and erected with the same care the finish standard implies.',
    result:
      'A production facility with an architectural frontage, both delivered by one structural package.',
  },
  hygiene: {
    overview:
      'Hygiene-product manufacture runs high-speed converting lines under clean, dust-controlled conditions, with bulky finished goods stored on site.',
    challenge:
      'Converting lines need continuous clear floor, air handling needs support from the roof structure, and the storage end needs height that the production end does not.',
    approach:
      'Long clear spans carry the converting hall, with roof-mounted plant supported on designed points and eave height stepped to suit storage.',
    execution:
      'Insulation, liner panels and sealants are supplied with the frame so the envelope is closed as a single specified system rather than assembled from parts.',
    result:
      'A clean, well-sealed production and storage envelope built as one integrated package.',
  },
  film: {
    overview:
      'A BOPP film line is one of the longest continuous machines in plastics processing, and the building is effectively wrapped around it.',
    challenge:
      'The line dictates the building length, the orientation and the crane run. Nothing structural can interrupt it, and the roof has to carry extraction and services along its full length.',
    approach:
      'Multi-span framing carries the length the line needs while keeping the machine envelope clear, with service and duct supports designed into the rafters.',
    execution:
      'Fabrication is programmed against the erection sequence so the frame advances along the line in one direction without rework.',
    result:
      'A long-span process building planned around the machine it exists to house.',
  },
  valves: {
    overview:
      'Valve manufacture combines machining, assembly, testing and despatch, each needing different handling and floor conditions.',
    challenge:
      'Heavy castings move constantly between stations, so crane coverage and floor loading matter across the whole footprint, not just in one bay.',
    approach:
      'Crane provision is designed across the bays that need it, with columns detailed for brackets from the outset and bay spacing optimised against crane span.',
    execution:
      'All fixing components, cleats and fasteners are supplied with the structure, and rail alignment is surveyed during erection before the crane is commissioned.',
    result:
      'A multi-station manufacturing building with crane coverage designed across the working footprint.',
  },
}

type Seed = {
  name: string
  buildingType: string
  sector: Sector
  location: string
  /** Built-up area exactly as published in the catalogue. */
  area: string
  photo: string
  plate: PlateKind
}

/** The fourteen projects documented in the catalogue, in catalogue order. */
const seeds: Seed[] = [
  { name: 'Lemit Paper LLP',                 buildingType: 'Paper Mill',                    sector: 'paper',      location: 'Morbi, Gujarat',     area: '19,920 Sq. Mt.', photo: '/images/project-01.jpg', plate: 'plant' },
  { name: 'Ambani Paper LLP',                buildingType: 'Paper Mill',                    sector: 'paper',      location: 'Morbi, Gujarat',     area: '10,490 Sq. Mt.', photo: '/images/project-02.jpg', plate: 'plant' },
  { name: 'Mascot Forge Pvt. Ltd.',          buildingType: 'Forging Plant',                 sector: 'forging',    location: 'Rajkot, Gujarat',    area: '12,020 Sq. Mt.', photo: '/images/project-03.jpg', plate: 'plant' },
  { name: 'Davat Beverages Pvt. Ltd.',       buildingType: 'Beverage Plant',                sector: 'beverage',   location: 'Gondal, Gujarat',    area: '10,140 Sq. Mt.', photo: '/images/project-04.jpg', plate: 'warehouse' },
  { name: 'Fortune Enterprise',              buildingType: 'Logistics Facility',            sector: 'logistics',  location: 'Rajkot, Gujarat',    area: '11,850 Sq. Mt.', photo: '/images/project-05.jpg', plate: 'warehouse' },
  { name: 'Shilpan Boardlam Pvt. Ltd.',      buildingType: 'Plywood & Laminates Plant',     sector: 'laminates',  location: 'Rajkot, Gujarat',    area: '12,990 Sq. Mt.', photo: '/images/project-06.jpg', plate: 'plant' },
  { name: 'Actionware India Pvt. Ltd.',      buildingType: 'Home Appliance Plant',          sector: 'appliances', location: 'Morbi, Gujarat',     area: '2,550 Sq. Mt.',  photo: '/images/project-01.jpg', plate: 'frames' },
  { name: 'Action Metal & Tubes LLP',        buildingType: 'Metal & Tube Plant',            sector: 'metal',      location: 'Rajkot, Gujarat',    area: '4,700 Sq. Mt.',  photo: '/images/project-02.jpg', plate: 'plant' },
  { name: 'Pelican Rotoflex Pvt. Ltd.',      buildingType: 'Machinery Manufacturing Plant', sector: 'machinery',  location: 'Jamnagar, Gujarat',  area: '4,650 Sq. Mt.',  photo: '/images/project-03.jpg', plate: 'plant' },
  { name: 'Sicer Italian Ceramic Surfaces',  buildingType: 'Chemical Plant',                sector: 'chemical',   location: 'Morbi, Gujarat',     area: '4,150 Sq. Mt.',  photo: '/images/project-04.jpg', plate: 'frames' },
  { name: 'Tileque Surfaces LLP',            buildingType: 'Decorative Surfaces Plant',     sector: 'decorative', location: 'Morbi, Gujarat',     area: '11,850 Sq. Mt.', photo: '/images/project-05.jpg', plate: 'frames' },
  { name: 'Honey Bunny',                     buildingType: 'Hygiene Products Plant',        sector: 'hygiene',    location: 'Morbi, Gujarat',     area: '12,990 Sq. Mt.', photo: '/images/project-06.jpg', plate: 'warehouse' },
  { name: 'Slogan Polyfilm Pvt. Ltd.',       buildingType: 'BOPP Film Plant',               sector: 'film',       location: 'Morbi, Gujarat',     area: '8,940 Sq. Mt.',  photo: '/images/project-01.jpg', plate: 'plant' },
  { name: 'G.M. Engineering Pvt. Ltd.',      buildingType: 'Industrial Valve Plant',        sector: 'valves',     location: 'Rajkot, Gujarat',    area: '7,300 Sq. Mt.',  photo: '/images/project-02.jpg', plate: 'plant' },
]

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const projects: Project[] = seeds.map((seed, i) => ({
  index: String(i + 1).padStart(2, '0'),
  slug: slugify(seed.name),
  name: seed.name,
  buildingType: seed.buildingType,
  location: seed.location,
  year: '',
  area: seed.area,
  scope: SCOPE,
  verified: true,
  photo: seed.photo,
  plate: seed.plate,
  study: sectorStudy[seed.sector],
  technical: [
    { label: 'Sector', value: seed.buildingType },
    { label: 'Built-up area', value: seed.area },
    ...STANDARD_SPEC,
  ],
  gallery: galleryFor(i, seed.buildingType),
}))

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
export const featuredProjects = projects.slice(0, 4)
