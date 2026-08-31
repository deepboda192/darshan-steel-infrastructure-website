/**
 * Capability, process and quality content.
 * All statements describe how PEB work is done in general and how DSI
 * organises it. No capacity figures, machine models, certifications or
 * headcounts are claimed — those appear as bracketed placeholders only.
 */

/* -------------------------------------------------------------------------- */
/* WHY PEB — four advantages                                                   */
/* -------------------------------------------------------------------------- */

export type Advantage = {
  index: string
  title: string
  description: string
}

export const pebAdvantages: Advantage[] = [
  {
    index: '01',
    title: 'Faster Construction',
    description:
      'Fabrication runs in the shop while foundations are cast on site. Two critical paths run in parallel instead of one after the other, and members arrive cut, drilled and marked for assembly.',
  },
  {
    index: '02',
    title: 'Optimised Steel Usage',
    description:
      'Tapered built-up sections put material where the bending moment actually is. Sections vary along their length instead of carrying a constant profile sized for the worst point.',
  },
  {
    index: '03',
    title: 'Flexible Design',
    description:
      'Spans, eave heights, bay spacing and crane provision are set per project. End bays can be detailed for future extension so the building grows without structural rework.',
  },
  {
    index: '04',
    title: 'Efficient Lifecycle',
    description:
      'Bolted connections make members replaceable, coatings are specified to the operating environment, and the structure can be extended, relocated or reconfigured later.',
  },
]

/* -------------------------------------------------------------------------- */
/* INTEGRATED WORKFLOW — eight stages                                          */
/* -------------------------------------------------------------------------- */

export type Stage = {
  index: string
  title: string
  short: string
  description: string
  outputs: string[]
}

export const workflowStages: Stage[] = [
  {
    index: '01',
    title: 'Design & Engineering',
    short: 'Requirements become a structural concept.',
    description:
      'Building geometry, loading and site conditions are established with the client and consultant. Frame type, span arrangement and eave height are fixed against how the building will actually be used.',
    outputs: ['Concept framing plan', 'Load criteria', 'Preliminary GA drawings'],
  },
  {
    index: '02',
    title: 'Structural Analysis',
    short: 'The frame is modelled and checked against code.',
    description:
      'Dead, live, wind, crane and seismic cases are applied to the analytical model. Member sizes and deflections are checked against the governing design codes for the project.',
    outputs: ['Analysis model', 'Design calculations', 'Member schedule'],
  },
  {
    index: '03',
    title: 'Detailing',
    short: 'Analysis becomes shop-ready geometry.',
    description:
      'Connections, splices, base plates and bracing are detailed member by member. Every plate, bolt and weld is drawn and marked before anything reaches the shop floor.',
    outputs: ['Shop drawings', 'Erection drawings', 'Bolt and plate schedules'],
  },
  {
    index: '04',
    title: 'Procurement',
    short: 'Material is bought against the schedule.',
    description:
      'Plate, sections, fasteners, sheeting and accessories are procured against the released drawings, with mill documentation retained for traceability.',
    outputs: ['Material schedule', 'Mill test certificates', 'Delivery plan'],
  },
  {
    index: '05',
    title: 'Fabrication',
    short: 'Plate becomes structure.',
    description:
      'Cutting, built-up section assembly, welding, drilling and fitting are carried out in the shop under controlled conditions, with members marked to the erection drawings.',
    outputs: ['Fabricated members', 'Weld records', 'Fit-up checks'],
  },
  {
    index: '06',
    title: 'Quality Inspection',
    short: 'Verified before it ships.',
    description:
      'Dimensional checks, weld inspection, surface preparation and coating thickness are recorded at defined hold points. Non-conformances are closed before dispatch.',
    outputs: ['Inspection records', 'DFT readings', 'Release note'],
  },
  {
    index: '07',
    title: 'Dispatch',
    short: 'Loaded in erection sequence.',
    description:
      'Members are bundled and loaded so that what is needed first comes off the truck first. Packing lists match the erection drawings mark for mark.',
    outputs: ['Packing lists', 'Loading plan', 'Dispatch clearance'],
  },
  {
    index: '08',
    title: 'Site Erection',
    short: 'Assembled to the drawings.',
    description:
      'Setting out, column erection, rafter lifting, bracing, purlins and sheeting are executed in planned sequence with the structure surveyed and bolted to specification.',
    outputs: ['Erected structure', 'Alignment survey', 'Handover documentation'],
  },
]

/* -------------------------------------------------------------------------- */
/* MANUFACTURING CAPABILITIES                                                  */
/* -------------------------------------------------------------------------- */

export type ShopCapability = {
  index: string
  title: string
  description: string
}

export const shopCapabilities: ShopCapability[] = [
  { index: '01', title: 'CNC Cutting', description: 'Profile and plate cutting to drawing geometry, with nesting to reduce offcut.' },
  { index: '02', title: 'CNC Drilling', description: 'Hole positions driven from the detailing model so bolt groups line up at assembly.' },
  { index: '03', title: 'Automatic Welding', description: 'Submerged-arc welding of built-up sections for consistent, repeatable weld profiles.' },
  { index: '04', title: 'Built-Up Section Fabrication', description: 'Tapered I-sections assembled from plate so depth follows the bending moment diagram.' },
  { index: '05', title: 'Surface Preparation', description: 'Blast cleaning to the specified surface profile before any coating is applied.' },
  { index: '06', title: 'Coating & Painting', description: 'Primer and finish systems selected for the operating environment, with film thickness recorded.' },
  { index: '07', title: 'Quality Inspection', description: 'Dimensional and weld inspection at fixed hold points, documented against each mark.' },
  { index: '08', title: 'Material Handling', description: 'Crane-served bays and staging areas that keep members moving through the shop in sequence.' },
  { index: '09', title: 'Dispatch Management', description: 'Bundling and loading planned around the erection sequence, not around truck convenience.' },
]

/* -------------------------------------------------------------------------- */
/* ENGINEERING CAPABILITIES                                                    */
/* -------------------------------------------------------------------------- */

export const engineeringCapabilities = [
  { index: '01', title: 'Structural Analysis', description: 'Frames analysed for dead, live, wind, crane and seismic load combinations.' },
  { index: '02', title: 'Connection Design', description: 'Bolted and welded connections designed for the forces they actually carry.' },
  { index: '03', title: '3D Modelling & Detailing', description: 'A single coordinated model drives shop drawings, erection drawings and material lists.' },
  { index: '04', title: 'Shop Drawings', description: 'Member-level drawings with every plate, hole and weld dimensioned and marked.' },
  { index: '05', title: 'Erection Drawings', description: 'Assembly sequence, mark numbers and bolt schedules issued to the site team.' },
  { index: '06', title: 'Design Coordination', description: 'Interfaces with architects, MEP consultants and civil contractors resolved on the model.' },
]

/* -------------------------------------------------------------------------- */
/* QUALITY CONTROL POINTS                                                      */
/* -------------------------------------------------------------------------- */

export const qualityChecks = [
  { index: '01', title: 'Material Inspection', description: 'Incoming plate and sections checked against mill documentation and the material schedule.' },
  { index: '02', title: 'Dimensional Accuracy', description: 'Member length, depth, camber and hole position verified against the shop drawing.' },
  { index: '03', title: 'Welding Quality', description: 'Weld size, profile and continuity inspected; procedures and welders qualified to the project specification.' },
  { index: '04', title: 'Surface Preparation', description: 'Blast profile and cleanliness confirmed before coating is applied.' },
  { index: '05', title: 'Coating Inspection', description: 'Dry film thickness measured and recorded across each coated member.' },
  { index: '06', title: 'Final Quality Check', description: 'Fit-up, marking and completeness verified against the packing list before release.' },
]

/* -------------------------------------------------------------------------- */
/* SAFETY                                                                      */
/* -------------------------------------------------------------------------- */

export const safetyPractices = [
  { title: 'PPE Compliance', description: 'Helmets, harnesses, eye protection and safety footwear are standard in the shop and on site.' },
  { title: 'Safe Erection Practice', description: 'Lifting plans, exclusion zones and temporary bracing are agreed before a member leaves the ground.' },
  { title: 'Trained Workforce', description: 'Fabrication and erection crews are briefed on the method statement for the work in front of them.' },
  { title: 'Controlled Fabrication', description: 'Shop work happens in a managed environment rather than at height, removing risk from the site.' },
  { title: 'Site Coordination', description: 'Work is sequenced with the main contractor so trades are not stacked in the same airspace.' },
  { title: 'Documented Procedures', description: 'Method statements and checklists are issued per project. [SAFETY POLICY DOCUMENT — TO BE SUPPLIED BY DSI]' },
]

/* -------------------------------------------------------------------------- */
/* PROJECT DELIVERY PROCESS — seven stages                                     */
/* -------------------------------------------------------------------------- */

export const processSteps = [
  { index: '01', title: 'Understand', description: 'Use case, site constraints, programme and budget established with the client.' },
  { index: '02', title: 'Design', description: 'Building geometry and framing concept developed against the operational brief.' },
  { index: '03', title: 'Engineer', description: 'Structure analysed, members sized, connections designed and drawings released.' },
  { index: '04', title: 'Fabricate', description: 'Members cut, welded, drilled, finished and inspected in the shop.' },
  { index: '05', title: 'Deliver', description: 'Material dispatched in erection sequence with matching documentation.' },
  { index: '06', title: 'Erect', description: 'Structure assembled, aligned, bolted and sheeted on site.' },
  { index: '07', title: 'Complete', description: 'Final inspection, snag closure and handover with as-built documentation.' },
]
