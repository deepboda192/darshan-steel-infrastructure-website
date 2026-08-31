import { siteImages, type SiteImage } from './images'

/**
 * ============================================================================
 * SOLUTIONS
 * ============================================================================
 * Technical attributes are taken from the Darshan Steel Group product
 * catalogue (Edition 3): the primary framing system table (practical width per
 * frame type), the PEB advantages page (clear span and bay spacing), the crane
 * beam system page (capacity, span and girder types) and the cladding system
 * page (coverage width, core thickness and steel grade).
 *
 * Anything the catalogue does not state stays in [SQUARE BRACKETS].
 * ============================================================================
 */

export type Solution = {
  index: string
  slug: string
  title: string
  short: string
  description: string
  /** Technical characteristics. Bracketed values are still unconfirmed. */
  attributes: { label: string; value: string }[]
  features: string[]
  image: SiteImage
}

export const solutions: Solution[] = [
  {
    index: '01',
    slug: 'industrial-sheds',
    title: 'Industrial Sheds',
    short: 'Clear-span working volume, engineered around the process inside it.',
    description:
      'Column-free floor area for production lines, assembly and storage. Frame geometry, eave height and bay spacing are set by the equipment and material flow the building has to carry — not by a catalogue.',
    attributes: [
      { label: 'Clear span', value: 'Up to 50 m (clear-span frame)' },
      { label: 'Bay spacing', value: 'Up to 8–10 m without jack beams' },
      { label: 'Crane provision', value: 'Optional EOT gantry up to 50 MT' },
    ],
    features: [
      'Clear-span or multi-span portal framing',
      'Crane-ready columns and bracket detailing',
      'Ridge ventilators, turbo vents and roof monitors',
      'Daylight panels and translucent roof sheeting',
    ],
    image: siteImages.whatWeBuild.industrialSheds,
  },
  {
    index: '02',
    slug: 'warehouses',
    title: 'Warehouses',
    short: 'Long spans and high eaves for racking density and vehicle movement.',
    description:
      'Storage and distribution structures planned around racking layout, turning circles and dock positions. Bay spacing is coordinated with rack lines so that a column never lands in an aisle.',
    attributes: [
      { label: 'Building width', value: 'Up to 120 m in multi-span framing' },
      { label: 'Bay spacing', value: 'Up to 8–10 m without jack beams' },
      { label: 'Dock provision', value: 'Levellers, shelters and canopies' },
    ],
    features: [
      'Rack-coordinated bay spacing',
      'High-eave framing for vertical storage',
      'Dock levellers, shelters and canopies',
      'Fire-safety and sprinkler coordination',
    ],
    image: siteImages.whatWeBuild.warehouses,
  },
  {
    index: '03',
    slug: 'factory-buildings',
    title: 'Factory Buildings',
    short: 'Crane-carrying structures designed around production loads.',
    description:
      'Manufacturing plants where the structure carries more than its own roof. Crane loads, service platforms, ducting and process equipment are designed into the frame from the first analysis run.',
    attributes: [
      { label: 'Crane capacity', value: 'EOT up to 50 MT on column brackets' },
      { label: 'Crane span', value: 'Up to 40 m standard' },
      { label: 'Crane types', value: 'Single girder (I) and double girder (II)' },
    ],
    features: [
      'Crane gantry girders and corbel detailing',
      'Independent support system above 50 MT duty',
      'Structural mezzanines on galvanized steel deck',
      'Expansion-ready end-bay design',
    ],
    image: siteImages.whatWeBuild.factoryBuildings,
  },
  {
    index: '04',
    slug: 'cold-storage',
    title: 'Cold Storage',
    short: 'Thermally sealed envelopes on a corrosion-conscious frame.',
    description:
      'Temperature-controlled structures where the steel frame and the insulated envelope are detailed together. Thermal bridging, vapour sealing and panel support are resolved at drawing stage, not on site.',
    attributes: [
      { label: 'Insulation', value: 'XLPE or fibreglass blanket' },
      { label: 'Sheeting', value: 'S550, 0.50–0.80 mm core thickness' },
      { label: 'Finish', value: 'Optional 100-micron corrosion coat' },
    ],
    features: [
      'Insulated panel support detailing',
      'Thermal break and vapour barrier coordination',
      'Liner panels and sealants for full weatherproofing',
      'Corrosion protection specified to environment',
    ],
    image: siteImages.whatWeBuild.coldStorage,
  },
  {
    index: '05',
    slug: 'commercial',
    title: 'Commercial Structures',
    short: 'Steel that is meant to be seen as well as to carry load.',
    description:
      'Showrooms, sales offices, workshops and mixed-use blocks where the structure is part of the architecture. Exposed steelwork is detailed for finish quality as much as for capacity.',
    attributes: [
      { label: 'Frame type', value: 'Clear-span, multi-gable or single slope' },
      { label: 'Roofing', value: 'Standing seam or long-span ribbed panel' },
      { label: 'Finish', value: 'Seven-colour coated cladding range' },
    ],
    features: [
      'Exposed structural steelwork detailing',
      'Facade and glazing support systems',
      'Canopies, mezzanines and staircases',
      'Architect and consultant coordination',
    ],
    image: siteImages.whatWeBuild.commercial,
  },
  {
    index: '06',
    slug: 'custom',
    title: 'Custom Steel Buildings',
    short: 'Structures that do not fit a standard frame.',
    description:
      'Non-standard geometry, unusual loading, constrained sites or staged construction. Where a catalogue building will not work, the structure is engineered from first principles.',
    attributes: [
      { label: 'Frame systems', value: 'Multi-gable, lean-to, roof system' },
      { label: 'Analysis', value: 'Project-specific 3D modelling' },
      { label: 'Delivery', value: 'Staged or phased possible' },
    ],
    features: [
      'First-principles structural analysis',
      'Irregular geometry and transfer structures',
      'Multi-storey steel frames with bracing or RC cores',
      'Retrofit, extension and strengthening work',
    ],
    image: siteImages.whatWeBuild.custom,
  },
]

/**
 * Primary framing systems and their practical building widths, exactly as
 * tabulated in the catalogue's "Types of Primary Framing System" page.
 */
export const framingSystems: { code: string; name: string; width: string }[] = [
  { code: 'CS',   name: 'Clear Span',    width: 'Practical width 50 m' },
  { code: 'MS-1', name: 'Multi-Span 1',  width: 'Practical width module 70 m' },
  { code: 'MS-2', name: 'Multi-Span 2',  width: 'Practical width module 90 m' },
  { code: 'MS-3', name: 'Multi-Span 3',  width: 'Practical width module 120 m' },
  { code: 'MG',   name: 'Multi-Gable',   width: 'Practical width module 80 m' },
  { code: 'RS',   name: 'Roof System',   width: 'Practical width 30 m' },
  { code: 'SS',   name: 'Single Slope',  width: 'Practical width 50 m' },
  { code: 'LT',   name: 'Lean-To',       width: 'Practical width 24 m' },
]

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug)
