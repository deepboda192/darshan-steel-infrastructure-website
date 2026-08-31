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

/**
 * The advantages of building pre-engineered, from the catalogue's
 * "Advantages of Using PEB" page.
 *
 * DEDUPLICATED. The printed page lists twelve panels, but three of them make
 * the same argument: "Faster Construction" (prefabrication), "Quick & Easy
 * Erection" (standardised connections beat RCC) and "Early Occupancy
 * Advantage" (finishing sooner pays) are one point stated three ways. They are
 * merged into a single "Faster Construction" entry that keeps all three
 * reasons. The remaining ten are distinct and are kept.
 *
 * Figures quoted — 50–60 m clear span, 8–10 m bays without jack beams,
 * 20–30% lighter, XLPE / fibreglass insulation — are the catalogue's own.
 * Supporting engineering detail is general PEB practice, not a DSI claim.
 */
export const pebAdvantages: Advantage[] = [
  {
    index: '01',
    title: 'Single-Source Responsibility',
    description:
      'Frame, cladding, fasteners and accessories from a single vendor. Everything fits, and one party is accountable.',
  },
  {
    index: '02',
    title: 'Faster Construction',
    description:
      'Fabrication runs while foundations cure, and bolted connections erect faster than RCC. Finishing sooner means occupying sooner.',
  },
  {
    index: '03',
    title: 'Simplified Foundations',
    description:
      'A frame 20–30% lighter than conventional steel needs smaller, simpler and cheaper footings.',
  },
  {
    index: '04',
    title: 'Optimal & Aesthetic Designs',
    description:
      'Tapered sections put steel where the bending moment is — strength-to-weight that frees the architecture rather than constraining it.',
  },
  {
    index: '05',
    title: 'Functional Versatility',
    description:
      'Clear spans to 50–60 m and 8–10 m bays without jack beams, from a single shed to a multi-bay plant.',
  },
  {
    index: '06',
    title: 'Flexibility in Expansion',
    description:
      'Length grows by adding bays, width and height too when pre-designed. Bolted joints keep the work non-destructive.',
  },
  {
    index: '07',
    title: 'Assured Quality',
    description:
      'Cut, drilled and welded on CNC lines under factory control — site matches the drawing mark for mark.',
  },
  {
    index: '08',
    title: 'Durability & Low Maintenance',
    description:
      'Steel properties stay stable for decades; blast-cleaned, painted surfaces keep maintenance cost down.',
  },
  {
    index: '09',
    title: 'Energy-Efficient Systems',
    description:
      'Roof and wall panels take XLPE insulation or fibreglass blankets; daylight panels cut the lighting load.',
  },
  {
    index: '10',
    title: 'Earthquake Resistant',
    description:
      'Ductile steel absorbs seismic and blast shock, and a lighter structure attracts less force to begin with.',
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

/* ==========================================================================
   CATALOGUE CONTENT
   --------------------------------------------------------------------------
   Everything below is reproduced from the Darshan Steel Group product
   catalogue (Edition 3). These are published company facts, not inferences.
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/* APPLICATIONS OF PEB — catalogue "Applications of PEB"                       */
/* -------------------------------------------------------------------------- */

export const pebApplications: string[] = [
  'Metro Stations',
  'Showrooms',
  'Airport Terminal Buildings',
  'Aircraft Hangars',
  'Factory Sheds',
  'Shopping Malls',
  'Foot Over Bridges',
  'Multi-level Parking Areas',
  'Auditoriums',
]

/* -------------------------------------------------------------------------- */
/* INDUSTRIES SERVED — catalogue "Industries we serve"                         */
/* The printed grid lists Pharmaceutical twice; the duplicate is dropped here. */
/* -------------------------------------------------------------------------- */

export const industriesServed: string[] = [
  'Automobile',
  'Chemical',
  'Pharmaceutical',
  'Electrical & Electronics',
  'Food & Beverage',
  'Steel & Metal Fabrication',
  'Machinery & Equipment',
  'Packaging',
  'Dairy & Poultry',
  'Food Processing',
  'Warehousing',
  'Shipping & Freight',
  'Airports',
  'Railways',
]

/* -------------------------------------------------------------------------- */
/* WHAT A DSI PRE-ENGINEERED BUILDING INCLUDES                                 */
/* -------------------------------------------------------------------------- */

export const pebIncludes: string[] = [
  'Primary and secondary framing',
  'All connecting parts and fasteners',
  'Choice of roof and wall systems',
  'Fixings and flashing',
  'Thermal and/or acoustic insulation',
  'Sealants for complete weatherproofing',
  'Liner panels for aesthetics and performance',
  'Crane beams and rails for heavy-duty use',
  'Mezzanine floors for added functionality',
  'Integrated accessories for a complete solution',
]

/* -------------------------------------------------------------------------- */
/* STRUCTURAL SYSTEMS AND THEIR COMPONENTS                                     */
/* -------------------------------------------------------------------------- */

export type StructuralSystem = { name: string; components: string[] }

export const structuralSystems: StructuralSystem[] = [
  {
    name: 'Primary System',
    components: ['Primary framing system', 'Crane system', 'Canopies & fascia', 'Bracing systems'],
  },
  {
    name: 'Secondary System',
    components: ['Purlins', 'Girts', 'Eave struts'],
  },
  {
    name: 'Mezzanine System',
    components: ['Mezzanine beams & columns', 'Deck sheet', 'Hand rails', 'Staircase'],
  },
  {
    name: 'Cladding System',
    components: ['Roof cladding', 'Wall cladding', 'Standing seam roofing', 'Cladding components'],
  },
  {
    name: 'Accessories',
    components: [
      'Turbo ventilators',
      'Roof monitor',
      'Ridge ventilator',
      'Daylight panel',
      'Louvers',
      'Insulation',
      'Cage ladder',
    ],
  },
]

/* -------------------------------------------------------------------------- */
/* BUILDING ACCESSORIES                                                        */
/* -------------------------------------------------------------------------- */

export const buildingAccessories: string[] = [
  'Poly-carbonate sheet',
  'Turbo fan',
  'Roof monitor',
  'S-type louvers',
  'Insulation',
  'Nut-bolts',
  'Cage ladders',
]

/* -------------------------------------------------------------------------- */
/* MEZZANINE FLOOR USES                                                        */
/* -------------------------------------------------------------------------- */

export const mezzanineUses: string[] = [
  'Storage mezzanines',
  'Office mezzanines',
  'Warehouse mezzanines',
  'Retail mezzanines',
  'Production mezzanines',
  'In-situ concrete solution',
]

/* -------------------------------------------------------------------------- */
/* CLADDING COLOUR RANGE                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The seven standard cladding colours named in the catalogue.
 *
 * NOTE ON `hex`: these are approximations sampled from the printed swatches so
 * the range can be shown on screen. They are NOT specified shade references.
 * Replace each with the exact RAL / shade code before treating them as a
 * colour commitment to a client.
 */
export const claddingColours: { name: string; hex: string }[] = [
  { name: 'DSI Leaf Green', hex: '#1f5c30' },
  { name: 'DSI Galvalume', hex: '#c9cccd' },
  { name: 'DSI Off White', hex: '#f4f4ef' },
  { name: 'DSI Taurus Blue', hex: '#1b9cb0' },
  { name: 'DSI Stone Grey', hex: '#a9a48f' },
  { name: 'DSI Red', hex: '#c02128' },
  { name: 'DSI Dark Grey', hex: '#5b6270' },
]

/* -------------------------------------------------------------------------- */
/* WHY DSI — catalogue "Why to choose Darshan"                                 */
/* -------------------------------------------------------------------------- */

export type Differentiator = { index: string; title: string; description: string }

export const whyChooseDsi: Differentiator[] = [
  {
    index: '01',
    title: 'Single Window Solution',
    description:
      'Complete pre-engineered building solutions under one roof — design, detailing, fabrication and erection. One integrated team means smooth coordination, timely execution and structures customised to the brief.',
  },
  {
    index: '02',
    title: 'Fast Delivery & Erection',
    description:
      'Simplified designs and streamlined processes move a project quickly from detailing to fabrication and dispatch, so demanding delivery schedules are met without giving up quality or safety.',
  },
  {
    index: '03',
    title: 'Safe & Cost-Effective Designs',
    description:
      'Advanced design software gives precision in every structural component. Optimising steel usage while maximising strength delivers safety, durability and long-term cost savings.',
  },
  {
    index: '04',
    title: 'Advanced Manufacturing Facility',
    description:
      'A modern plant equipped with CNC-based cutting, welding and forming machines. Producing every PEB component in-house keeps quality control tight and the structure consistent.',
  },
  {
    index: '05',
    title: 'Premium-Grade Materials',
    description:
      'Primary and secondary members are made with 345 MPa steel; 550 MPa grade is used for roofing. Only high-strength, industry-standard steel goes into a building.',
  },
  {
    index: '06',
    title: 'Quality Assurance',
    description:
      'From raw material to final execution, every stage is tested for strength, finish and performance, so each structure meets the same standard before it is released.',
  },
  {
    index: '07',
    title: 'Future Expansion',
    description:
      'The bolted connection system makes expansion straightforward. Additional bays, width or height can be added later without structural rework.',
  },
  {
    index: '08',
    title: 'Customer Support & Services',
    description:
      'A dedicated project management team supports the client from concept to completion, covering quality, timely execution and service at every stage.',
  },
]

/* -------------------------------------------------------------------------- */
/* PROJECT WORK FLOW — the commercial sequence, catalogue "Project Work Flow"   */
/* This is the client-facing order of events. The engineering sequence is       */
/* `workflowStages`; the delivery summary is `processSteps`.                    */
/* -------------------------------------------------------------------------- */

export const projectWorkflow: { index: string; title: string; description: string }[] = [
  {
    index: '01',
    title: 'Identifying the requirement',
    description: 'The customer need is established, possible solutions developed and the most promising one selected.',
  },
  {
    index: '02',
    title: 'Quotation',
    description: 'A proposal is issued setting out the recommended solution for the PEB structure.',
  },
  {
    index: '03',
    title: 'Order confirmation',
    description: 'The deal is finalised and the purchase order received; design, fabrication and erection planning begins so the project completes in optimum time.',
  },
  {
    index: '04',
    title: 'General Arrangement approval',
    description: 'Once the GA drawing is approved, detailed design drawings and erection drawings are prepared.',
  },
  {
    index: '05',
    title: 'Fabrication & supply',
    description: 'All fabrication is carried out on CNC cutting, welding and forming systems, and the structural material is supplied.',
  },
  {
    index: '06',
    title: 'Erection',
    description: 'Erection is executed using advanced techniques, ensuring structural stability and precise alignment.',
  },
  {
    index: '07',
    title: 'Work completion',
    description: 'A project completion certificate is issued once the project is finished to the customer’s full satisfaction.',
  },
]
