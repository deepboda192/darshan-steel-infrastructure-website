import { siteImages, type SiteImage } from '@/data/images'

/**
 * Copy and data for the Manufacturing page: the works at Chhattar, its
 * capacity, its three TÜV SÜD certifications, and every machine on the shop
 * floor. The machine list is DSI's own "Machine List.xlsx" (supplied
 * 2026-09-29), grouped by machine type: identical units (the thirteen MIG
 * sets, the two radial drills) share a card and carry a unit count. Codes,
 * makes, operation and specifications are the list's own; the page adds
 * only the plain-English line under each machine. The certification copy
 * describes what each standard requires and how a certified fabrication
 * shop applies it; the registration numbers, scope and validity are read
 * from the scanned certificates in public/images/certifications/.
 */

export const manufacturingMeta = {
  title: 'Manufacturing: Works, Capacity & Machines | DSI',
  description:
    'Inside the Darshan Steel Infrastructure works at Rajkot: 15,000 MT annual capacity, ISO 9001, 14001 and 45001 certification by TÜV SÜD, and the CNC cutting, welding, drilling, blasting and roll-forming machines on the floor.',
}

export const manufacturingIntro = {
  lead:
    'Every DSI building is made under one roof at Chhattar, on the Rajkot–Morbi highway: plate in at one end, numbered, painted members out at the other, from a 15,000 square metre works with a fully enclosed, automated production line.',
  paragraphs: [
    'Work done under a roof is work that can be measured. Plate is cut on CNC plasma and shears, built-up sections are welded on an automatic pull-through line, holes are drilled and punched to the detailing model, and every member is shot-blasted and primed before it is bundled for the erection sequence. Purlins, girts, roof and wall sheet, standing seam panels and deck sheet are roll-formed on the same floor, so the frame and its skin leave together.',
    'The shop runs to management systems certified by TÜV SÜD for quality, environment and safety, with inspection hold points recorded against every mark number. What follows is the capacity, the certifications and the machines, one by one.',
  ],
}

/** The company.metrics keys shown as the capacity tiles, in order. */
export const capacityMetricKeys = ['capacity', 'facility', 'years', 'projects'] as const

export type Certification = {
  /** The standard and its edition, as printed on the certificate. */
  standard: string
  title: string
  issuer: string
  badge: string
  /** The scanned certificate, as supplied by DSI on 2026-09-29. */
  document: string
  /** Certificate registration number, as printed. */
  registration: string
  summary: string
  /** What the standard asks of a management system. */
  covers: string[]
  /** How a certified fabrication shop applies it, and what a client gets from that. */
  applied: string[]
}

/**
 * What the three certificates have in common, read from the scans: one
 * certification body, one scope, one validity period.
 */
export const certificateCommon = {
  body: 'TÜV SÜD South Asia Private Limited',
  scope: 'Manufacturing and supply of pre-engineered building and fabricated steel structure',
  validFrom: '2025-03-31',
  validUntil: '2028-03-30',
  validFromLabel: '31 March 2025',
  validUntilLabel: '30 March 2028',
  condition: 'Subject to successful completion of annual periodic audits',
}

export const certifications: Certification[] = [
  {
    standard: 'ISO 9001:2015',
    title: 'Quality management system',
    issuer: 'TÜV SÜD',
    badge: '/images/certifications/tuv-sud-iso-9001.png',
    document: '/images/certifications/certificate-tuv-sud-iso-9001.png',
    registration: '99 100 24683',
    summary:
      'The international standard for a quality management system: a documented way of working that starts from what the customer needs, controls every process that delivers it, checks the result, and corrects the process when something goes wrong.',
    covers: [
      'Documented procedures from enquiry to handover, with responsibilities fixed',
      'Control of design, purchasing, production and inspection as defined processes',
      'Traceability of material and records against each order',
      'Internal audits, management review and corrective action',
      'Measurement of customer satisfaction and continual improvement',
    ],
    applied: [
      'Incoming plate and sections are checked against mill certificates and the material schedule',
      'Six inspection hold points on every member: material, dimensions, welds, blast profile, coating thickness and final release',
      'Measuring instruments are calibrated and records are kept by mark number',
      'Non-conformances are recorded, contained and closed with a corrective action',
    ],
  },
  {
    standard: 'ISO 14001:2015',
    title: 'Environmental management system',
    issuer: 'TÜV SÜD',
    badge: '/images/certifications/tuv-sud-iso-14001.png',
    document: '/images/certifications/certificate-tuv-sud-iso-14001.png',
    registration: '99 104 01966',
    summary:
      'The standard for managing the environmental impact of an operation: identifying where the work touches air, water, land and resources, meeting the law that applies, setting objectives to do better, and proving it with records.',
    covers: [
      'Identification of environmental aspects and their impacts',
      'Compliance with applicable environmental law and permits',
      'Objectives, controls and monitoring for waste, emissions and resource use',
      'Emergency preparedness for spills and releases',
      'Audits, management review and continual improvement',
    ],
    applied: [
      'Plate is nested on the CNC cutter to cut offcut, and steel scrap is segregated and recycled',
      'Abrasive is reclaimed inside the enclosed shot-blast machine rather than blown into the yard',
      'Paints, solvents and their containers are stored, used and disposed of under control',
      'Energy and water use are monitored against targets',
    ],
  },
  {
    standard: 'ISO 45001:2018',
    title: 'Occupational health and safety management system',
    issuer: 'TÜV SÜD',
    badge: '/images/certifications/tuv-sud-iso-45001.png',
    document: '/images/certifications/certificate-tuv-sud-iso-45001.png',
    registration: '99 117 01401',
    summary:
      'The standard for keeping people safe at work: finding the hazards in every task, reducing the risk before the work starts, involving the workers themselves, and learning from every incident and near miss.',
    covers: [
      'Hazard identification and risk assessment for every activity',
      'Worker consultation and participation in safety decisions',
      'Operational controls, permits and emergency plans',
      'Training and competence for the task in hand',
      'Incident investigation, audits and continual improvement',
    ],
    applied: [
      'PPE is standard in the shop and on site: helmets, eye protection, harnesses at height and safety footwear',
      'Lifting plans, exclusion zones and temporary bracing are agreed before a member leaves the ground',
      'Machine guarding, hot-work control and fume and dust management on the cutting, welding and blasting lines',
      'Every crew is briefed on the method statement for the work in front of it',
    ],
  },
]

export type MachineProcess = 'cutting' | 'forming' | 'drilling' | 'welding' | 'surface' | 'roll-forming'

export const machineProcesses: { slug: MachineProcess; name: string }[] = [
  { slug: 'cutting', name: 'Cutting & shearing' },
  { slug: 'forming', name: 'Bending & pressing' },
  { slug: 'drilling', name: 'Drilling, punching & threading' },
  { slug: 'welding', name: 'Welding' },
  { slug: 'surface', name: 'Surface preparation' },
  { slug: 'roll-forming', name: 'Roll forming' },
]

export type MachineUnit = { code: string; make: string; note?: string }

export type Machine = {
  slug: string
  name: string
  process: MachineProcess
  /** What the machine does in the flow of a building, in one line. */
  role: string
  /** Every unit of this type on the floor, with its code from the machine list. */
  units: MachineUnit[]
  /** Make and model shared by the units, where they share one. */
  make?: string
  /** Automatic, CNC, semi-automatic or manual, as the list records it. */
  operation: string
  specs: { label: string; value: string }[]
  /** Flagged "critical" in DSI's list: a machine the production line cannot run without. Kept for the record; not shown. */
  critical: boolean
  image: SiteImage
}

export const machines: Machine[] = [
  {
    slug: 'plasma-cnc-cutting',
    name: 'CNC Plasma Cutting Machine',
    process: 'cutting',
    role: 'Cuts webs, flanges, stiffeners and gusset plates from plate to the nested CNC programme.',
    units: [{ code: 'PLS-1', make: 'Primo' }],
    make: 'Primo',
    operation: 'Automatic, CNC',
    specs: [
      { label: 'Cutting thickness', value: '20 mm recommended, 32 mm piercing' },
      { label: 'Bed size', value: '4,000 mm × 15,500 mm' },
    ],
    critical: true,
    image: siteImages.machines.plasmaCnc,
  },
  {
    slug: 'cnc-shearing',
    name: 'CNC Shearing Machine',
    process: 'cutting',
    role: 'Straight cuts in plate and sheet to programmed length, for flange strips, cleats and flashings.',
    units: [{ code: 'SRG-1', make: 'Energy Mission' }],
    make: 'Energy Mission',
    operation: 'Automatic, CNC',
    specs: [
      { label: 'Cutting length', value: '6 m' },
      { label: 'Thickness', value: 'Up to 20 mm' },
    ],
    critical: true,
    image: siteImages.machines.shearingCnc,
  },
  {
    slug: 'shearing-machines',
    name: 'Shearing Machines',
    process: 'cutting',
    role: 'Three semi-automatic shears for lighter plate, sheet and trim, sized so the CNC shear is kept for heavy work.',
    units: [
      { code: 'SRG-2', make: 'Alfa', note: '3 m × 14 mm' },
      { code: 'SRG-3', make: 'Kawa', note: '3 m × 4 mm' },
      { code: 'SRG-4', make: 'Alfa', note: '1 m × 12 mm' },
    ],
    operation: 'Semi-automatic',
    specs: [
      { label: 'Cutting lengths', value: '3 m, 3 m and 1 m' },
      { label: 'Thickness', value: '14 mm, 4 mm and 12 mm' },
    ],
    critical: true,
    image: siteImages.machines.shearing,
  },
  {
    slug: 'cnc-press-brake',
    name: 'CNC Press Brake',
    process: 'forming',
    role: 'Bends sheet into flashings, trims, closures, gutters and brackets to the programmed angle.',
    units: [{ code: 'CNC PB-1', make: 'Energy Mission' }],
    make: 'Energy Mission',
    operation: 'Automatic, CNC',
    specs: [
      { label: 'Capacity', value: '80 tonnes' },
      { label: 'Sheet thickness', value: '0.5 mm to 3 mm' },
    ],
    critical: true,
    image: siteImages.machines.pressBrake,
  },
  {
    slug: 'mechanical-power-press',
    name: 'Mechanical Power Press',
    process: 'forming',
    role: 'Presses and blanks small fittings, cleats and washers in volume.',
    units: [{ code: 'MPP-1', make: 'Alfa' }],
    make: 'Alfa',
    operation: 'Manual',
    specs: [{ label: 'Capacity', value: '150 tonnes' }],
    critical: true,
    image: siteImages.machines.powerPress,
  },
  {
    slug: 'hydraulic-punching',
    name: 'Hydraulic Punching Machines',
    process: 'drilling',
    role: 'Punches bolt holes and slots in cleats, plates and cold-formed sections faster than drilling.',
    units: [
      { code: 'HPH-1', make: 'Alfa', note: 'Punch hole, 240 tonnes' },
      { code: 'HPH-2', make: 'Alfa', note: 'Four-punch hole, 60 tonnes' },
      { code: 'HPH-3', make: 'Alfa', note: 'Slot hole, 100 tonnes' },
    ],
    make: 'Alfa',
    operation: 'Semi-automatic',
    specs: [
      { label: 'Capacities', value: '240, 100 and 60 tonnes' },
      { label: 'Tooling', value: 'Single punch, four-punch and slot' },
    ],
    critical: true,
    image: siteImages.machines.hydraulicPunch,
  },
  {
    slug: 'radial-drills',
    name: 'Radial Drill Machines',
    process: 'drilling',
    role: 'Drills bolt holes in end plates, base plates and flanges where punching is not suitable.',
    units: [
      { code: 'RDM-1', make: 'CSEPEL, Hungary' },
      { code: 'RDM-2', make: 'CSEPEL, Hungary' },
    ],
    make: 'CSEPEL RF50, Hungary',
    operation: 'Semi-automatic',
    specs: [
      { label: 'Hole diameter', value: 'Up to 50 mm' },
      { label: 'Bed and reach', value: '1 m × 1 m bed, 1 mm to 600 mm thickness' },
    ],
    critical: true,
    image: siteImages.machines.radialDrill,
  },
  {
    slug: 'thread-rolling',
    name: 'Hydraulic Thread Rolling Machine',
    process: 'drilling',
    role: 'Rolls threads on sag rods, bracing rods and anchor bolts, which are stronger than cut threads.',
    units: [{ code: 'HTM-1', make: 'Dipesh' }],
    make: 'Dipesh',
    operation: 'Semi-automatic',
    specs: [{ label: 'Rod diameter', value: '10 mm to 12 mm' }],
    critical: false,
    image: siteImages.machines.threadRolling,
  },
  {
    slug: 'pull-through-welding',
    name: 'PHI Pull-Through Automatic Welding Line',
    process: 'welding',
    role: 'Welds web to flanges on built-up tapered sections in one continuous pass, both sides at once.',
    units: [{ code: 'PHI-1', make: 'Primo' }],
    make: 'Primo',
    operation: 'Semi-automatic',
    specs: [
      { label: 'Travel speed', value: '0.5 to 1.8 m/min' },
      { label: 'Welding power', value: '90 kVA' },
    ],
    critical: true,
    image: siteImages.machines.beamWelding,
  },
  {
    slug: 'mig-welding',
    name: 'MIG Welding Sets',
    process: 'welding',
    role: 'Fit-up, stiffeners, end plates, cleats and every weld the automatic line does not reach.',
    units: Array.from({ length: 13 }, (_, i) => ({ code: `MIG-${i + 1}`, make: 'Lincoln' })),
    make: 'Lincoln 400i PWF',
    operation: 'Manual, three-phase',
    specs: [
      { label: 'Rating', value: '10 kVA' },
      { label: 'Travel speed', value: 'Up to about 1 m/min' },
    ],
    critical: false,
    image: siteImages.machines.migWelding,
  },
  {
    slug: 'shot-blasting',
    name: 'Shot Blasting Machine',
    process: 'surface',
    role: 'Blasts every member to the specified surface profile before the primer goes on.',
    units: [{ code: 'SBT-1', make: 'Imported, China' }],
    make: 'Imported, China',
    operation: 'Automatic',
    specs: [
      { label: 'Conveyor speed', value: '0.5 to 5 m/min' },
      { label: 'Abrasive throughput', value: '2,400 to 4,000 lb/min' },
      { label: 'Air volume', value: '18,000 m³/h' },
    ],
    critical: true,
    image: siteImages.machines.shotBlasting,
  },
  {
    slug: 'purlin-roll-forming',
    name: 'C/Z Purlin Roll Forming Machine',
    process: 'roll-forming',
    role: 'Forms the cold-formed Z and C purlins and girts that span between the frames.',
    units: [{ code: 'RFP-1', make: 'Imported, China' }],
    make: 'Imported, China',
    operation: 'Automatic',
    specs: [{ label: 'Material thickness', value: 'Up to 2.5 mm' }],
    critical: false,
    image: siteImages.machines.purlinRollForming,
  },
  {
    slug: 'sheet-forming',
    name: 'Roof & Wall Sheet Forming Machine',
    process: 'roll-forming',
    role: 'Roll-forms the trapezoidal roof and wall sheet from coil, in single lengths to order.',
    units: [{ code: 'RFS-1', make: 'Imported, China' }],
    make: 'Imported, China',
    operation: 'Automatic',
    specs: [{ label: 'Sheet thickness', value: '0.6 mm' }],
    critical: false,
    image: siteImages.machines.sheetForming,
  },
  {
    slug: 'standing-seam-forming',
    name: 'Standing Seam Roll Forming Machine',
    process: 'roll-forming',
    role: 'Forms the clip-fixed standing seam roof panel with no fastener through the sheet.',
    units: [{ code: 'SSR-1', make: 'Jupiter' }],
    make: 'Jupiter',
    operation: 'Automatic',
    specs: [{ label: 'Sheet thickness', value: '0.6 mm' }],
    critical: false,
    image: siteImages.machines.standingSeam,
  },
  {
    slug: 'deck-sheet-forming',
    name: 'Deck Sheet Forming Machine',
    process: 'roll-forming',
    role: 'Forms the profiled deck sheet that carries the concrete slab on a mezzanine floor.',
    units: [{ code: 'DSF-1', make: 'Jupiter' }],
    make: 'Jupiter',
    operation: 'Automatic',
    specs: [{ label: 'Sheet thickness', value: '1.6 mm' }],
    critical: false,
    image: siteImages.machines.deckForming,
  },
]

/** Every unit on the floor, across all machine types. */
export const machineUnitCount = machines.reduce((n, m) => n + m.units.length, 0)
