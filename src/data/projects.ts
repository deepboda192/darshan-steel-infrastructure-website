import { galleryFor, type PlateKind } from './images'

/**
 * ============================================================================
 * PROJECTS
 * ============================================================================
 * IMPORTANT — NOTHING HERE IS A REAL PROJECT RECORD.
 *
 * No client name, project name, area, tonnage, date or location has been
 * invented. Every factual field is a bracketed placeholder. The building
 * TYPE and SCOPE fields describe the categories of work DSI does, which the
 * brief supplied, and are safe to keep.
 *
 * TO PUBLISH A REAL PROJECT
 * -------------------------
 * 1. Replace the bracketed fields with the real values.
 * 2. Set `verified: true` — the card stops showing the "record pending" state.
 * 3. Replace `photo` with a real cover image and set `gallery` to real plates
 *    instead of the shared pool in data/images.ts.
 * ============================================================================
 */

export type ProjectImage = { src: string; alt: string; plate: PlateKind; label: string }

export type Project = {
  index: string
  slug: string
  /** Display name. Bracketed until DSI supplies the real project title. */
  name: string
  /** Category label shown on the card — safe, derived from the brief. */
  buildingType: string
  location: string
  year: string
  area: string
  scope: string[]
  /** Set true only when every field above holds real, checked data. */
  verified: boolean
  /** Cover photograph under /public. See data/images.ts to swap it. */
  photo: string
  /** Fallback scene used only if `photo` is emptied. */
  plate: PlateKind
  /** Case-study body. Written as structural narrative, not marketing copy. */
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


export const projects: Project[] = [
  {
    index: '01',
    slug: 'project-01',
    name: '[PROJECT 01 NAME]',
    buildingType: 'Industrial Manufacturing Facility',
    location: '[CITY], Gujarat',
    year: '[YEAR]',
    area: '[BUILT-UP AREA — SQ.FT.]',
    scope: ['Design & Engineering', 'Fabrication', 'Supply', 'Erection'],
    verified: false,
    photo: '/images/project-01.jpg',
    plate: 'plant',
    study: {
      overview:
        'A manufacturing facility requiring column-free production floor with provision for overhead material handling. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
      challenge:
        'Production layout demanded uninterrupted floor area while the crane duty imposed significant lateral and vertical loads on the frame. [SITE-SPECIFIC CONSTRAINTS TO BE SUPPLIED.]',
      approach:
        'Clear-span tapered portal frames were sized against combined crane, wind and gravity load cases. Crane brackets and gantry girders were integrated into the column design rather than added afterwards.',
      execution:
        'Members were fabricated as built-up sections, inspected at defined hold points and dispatched in erection sequence. Erection followed a planned lift order with temporary bracing at each stage.',
      result:
        'A column-free production hall handed over with the crane system operational. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
    },
    technical: [
      { label: 'Frame type', value: 'Clear-span tapered portal' },
      { label: 'Span', value: '[SPAN — M]' },
      { label: 'Eave height', value: '[HEIGHT — M]' },
      { label: 'Bay spacing', value: '[BAY — M]' },
      { label: 'Crane capacity', value: '[CAPACITY — MT]' },
      { label: 'Steel tonnage', value: '[TONNAGE — MT]' },
    ],
    gallery: galleryFor(0, 'Manufacturing facility'),
  },
  {
    index: '02',
    slug: 'project-02',
    name: '[PROJECT 02 NAME]',
    buildingType: 'Large-Scale Warehouse',
    location: '[CITY], Gujarat',
    year: '[YEAR]',
    area: '[BUILT-UP AREA — SQ.FT.]',
    scope: ['Design & Engineering', 'Fabrication', 'Supply', 'Erection'],
    verified: false,
    photo: '/images/project-02.jpg',
    plate: 'warehouse',
    study: {
      overview:
        'A distribution warehouse planned around racking density and dock throughput. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
      challenge:
        'The grid had to align with the racking layout so that no column landed in an operating aisle, while eave height was driven by vertical storage requirements.',
      approach:
        'Bay spacing was set from the rack line drawing before the structure was sized. High-eave framing was checked for wind uplift and for the deflection limits that the cladding system required.',
      execution:
        'Fabrication was sequenced by erection bay. Dock structures and canopies were detailed alongside the main frame so both arrived together.',
      result:
        'A warehouse with the intended racking configuration installed without structural clashes. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
    },
    technical: [
      { label: 'Frame type', value: 'Clear-span portal' },
      { label: 'Span', value: '[SPAN — M]' },
      { label: 'Eave height', value: '[HEIGHT — M]' },
      { label: 'Bay spacing', value: '[BAY — M]' },
      { label: 'Dock positions', value: '[NUMBER OF DOCKS]' },
      { label: 'Steel tonnage', value: '[TONNAGE — MT]' },
    ],
    gallery: galleryFor(1, 'Distribution warehouse'),
  },
  {
    index: '03',
    slug: 'project-03',
    name: '[PROJECT 03 NAME]',
    buildingType: 'Cold Storage Facility',
    location: '[CITY], Western India',
    year: '[YEAR]',
    area: '[BUILT-UP AREA — SQ.FT.]',
    scope: ['Design & Engineering', 'Fabrication', 'Supply', 'Erection'],
    verified: false,
    photo: '/images/project-03.jpg',
    plate: 'coldstore',
    study: {
      overview:
        'A temperature-controlled storage facility where the structural frame and insulated envelope had to work as one system. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
      challenge:
        'Thermal bridging at every point where steel crossed the insulated envelope, and vapour sealing continuity around panel supports and dock openings.',
      approach:
        'Panel support detailing and thermal breaks were resolved in the model before fabrication. Coating specification was set for a condensing environment rather than a general industrial one.',
      execution:
        'Members were coated to the cold-environment specification and inspected for film thickness before dispatch. Envelope and structure were installed in coordinated sequence.',
      result:
        'A sealed, insulated volume with the structure detailed to hold temperature. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
    },
    technical: [
      { label: 'Frame type', value: 'Portal with insulated envelope' },
      { label: 'Span', value: '[SPAN — M]' },
      { label: 'Eave height', value: '[HEIGHT — M]' },
      { label: 'Panel system', value: 'PUF / PIR insulated panel' },
      { label: 'Operating range', value: '[TEMPERATURE RANGE — °C]' },
      { label: 'Steel tonnage', value: '[TONNAGE — MT]' },
    ],
    gallery: galleryFor(2, 'Cold storage facility'),
  },
  {
    index: '04',
    slug: 'project-04',
    name: '[PROJECT 04 NAME]',
    buildingType: 'Industrial Shed',
    location: '[CITY], Gujarat',
    year: '[YEAR]',
    area: '[BUILT-UP AREA — SQ.FT.]',
    scope: ['Design & Engineering', 'Fabrication', 'Supply', 'Erection'],
    verified: false,
    photo: '/images/project-04.jpg',
    plate: 'frames',
    study: {
      overview:
        'A general-purpose industrial shed for assembly and storage. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
      challenge:
        'A constrained plot meant the building footprint was fixed, so usable volume had to come from eave height and span rather than area.',
      approach:
        'Frame geometry was optimised for maximum clear internal volume within the permitted envelope, with ridge ventilation and translucent sheeting for daylight.',
      execution:
        'Fabrication and erection were programmed around a live adjacent operation, with lifts scheduled outside working shifts.',
      result:
        'Usable industrial volume delivered within a fixed footprint. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
    },
    technical: [
      { label: 'Frame type', value: 'Clear-span portal' },
      { label: 'Span', value: '[SPAN — M]' },
      { label: 'Eave height', value: '[HEIGHT — M]' },
      { label: 'Bay spacing', value: '[BAY — M]' },
      { label: 'Ventilation', value: 'Ridge monitor' },
      { label: 'Steel tonnage', value: '[TONNAGE — MT]' },
    ],
    gallery: galleryFor(3, 'Industrial shed'),
  },
  {
    index: '05',
    slug: 'project-05',
    name: '[PROJECT 05 NAME]',
    buildingType: 'Factory Building with Crane Gantry',
    location: '[CITY], Gujarat',
    year: '[YEAR]',
    area: '[BUILT-UP AREA — SQ.FT.]',
    scope: ['Design & Engineering', 'Fabrication', 'Supply', 'Erection'],
    verified: false,
    photo: '/images/project-05.jpg',
    plate: 'plant',
    study: {
      overview:
        'A factory building carrying overhead cranes across multiple bays. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
      challenge:
        'Crane duty cycles governed fatigue and deflection checks on the gantry girders and the columns supporting them.',
      approach:
        'Gantry girders and corbels were designed with the frame as a single system. Deflection limits were set by crane rail tolerance rather than by code minimums.',
      execution:
        'Rail alignment was surveyed during erection and corrected before the crane was commissioned.',
      result:
        'A multi-bay crane-served factory within rail alignment tolerance. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
    },
    technical: [
      { label: 'Frame type', value: 'Multi-bay portal' },
      { label: 'Span', value: '[SPAN — M]' },
      { label: 'Eave height', value: '[HEIGHT — M]' },
      { label: 'Crane capacity', value: '[CAPACITY — MT]' },
      { label: 'Number of bays', value: '[BAY COUNT]' },
      { label: 'Steel tonnage', value: '[TONNAGE — MT]' },
    ],
    gallery: galleryFor(4, 'Factory building'),
  },
  {
    index: '06',
    slug: 'project-06',
    name: '[PROJECT 06 NAME]',
    buildingType: 'Commercial Steel Structure',
    location: '[CITY], Gujarat',
    year: '[YEAR]',
    area: '[BUILT-UP AREA — SQ.FT.]',
    scope: ['Design & Engineering', 'Fabrication', 'Supply', 'Erection'],
    verified: false,
    photo: '/images/project-06.jpg',
    plate: 'frames',
    study: {
      overview:
        'A commercial building with exposed structural steelwork as part of the architecture. [PROJECT SUMMARY TO BE SUPPLIED BY DSI.]',
      challenge:
        'Steel that is visible in the finished building has to meet a finish standard, not only a strength standard — weld appearance, plate edges and coating uniformity all count.',
      approach:
        'Connections were designed to be seen: bolt groups arranged deliberately, plate edges dressed, and the coating system chosen for appearance as well as protection.',
      execution:
        'Exposed members were handled and packed to avoid coating damage in transit and during erection.',
      result:
        'Exposed steelwork delivered to architectural finish standard. [MEASURED OUTCOMES TO BE SUPPLIED BY DSI.]',
    },
    technical: [
      { label: 'Frame type', value: 'Braced frame, exposed' },
      { label: 'Span', value: '[SPAN — M]' },
      { label: 'Height', value: '[HEIGHT — M]' },
      { label: 'Finish', value: 'Architectural coating system' },
      { label: 'Facade', value: 'Coordinated with architect' },
      { label: 'Steel tonnage', value: '[TONNAGE — MT]' },
    ],
    gallery: galleryFor(5, 'Commercial steel structure'),
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
export const featuredProjects = projects.slice(0, 4)
