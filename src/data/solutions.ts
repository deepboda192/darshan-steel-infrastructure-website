import { siteImages, type SiteImage } from './images'

export type Solution = {
  index: string
  slug: string
  title: string
  short: string
  description: string
  /** Technical characteristics. Ranges are bracketed placeholders until DSI confirms. */
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
      { label: 'Typical span', value: '[SPAN RANGE — M]' },
      { label: 'Eave height', value: '[HEIGHT RANGE — M]' },
      { label: 'Crane provision', value: 'Optional EOT / HOT gantry' },
    ],
    features: [
      'Clear-span or multi-span portal framing',
      'Crane-ready columns and bracket detailing',
      'Ridge and side-wall ventilation options',
      'Translucent roof sheeting for daylight',
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
      { label: 'Typical span', value: '[SPAN RANGE — M]' },
      { label: 'Eave height', value: '[HEIGHT RANGE — M]' },
      { label: 'Dock provision', value: 'Levellers and canopies' },
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
      { label: 'Crane capacity', value: '[CAPACITY RANGE — MT]' },
      { label: 'Bay spacing', value: '[BAY RANGE — M]' },
      { label: 'Mezzanine', value: 'Structural steel mezzanine' },
    ],
    features: [
      'Crane gantry girders and corbel detailing',
      'Structural mezzanines and service platforms',
      'Equipment and duct support integration',
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
      { label: 'Panel system', value: 'PUF / PIR insulated panel' },
      { label: 'Operating range', value: '[TEMPERATURE RANGE — °C]' },
      { label: 'Finish', value: 'Corrosion-protected steelwork' },
    ],
    features: [
      'Insulated panel support detailing',
      'Thermal break and vapour barrier coordination',
      'Dock and airlock structures',
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
      { label: 'Frame type', value: 'Portal / braced / composite' },
      { label: 'Facade', value: 'Coordinated with architect' },
      { label: 'Finish', value: 'Architectural-grade coating' },
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
      { label: 'Geometry', value: 'Non-standard / irregular' },
      { label: 'Analysis', value: 'Project-specific modelling' },
      { label: 'Delivery', value: 'Staged or phased possible' },
    ],
    features: [
      'First-principles structural analysis',
      'Irregular geometry and transfer structures',
      'Phased construction sequencing',
      'Retrofit, extension and strengthening work',
    ],
    image: siteImages.whatWeBuild.custom,
  },
]

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug)
