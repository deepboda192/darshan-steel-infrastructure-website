import { type PlateKind } from './images'

export type Industry = {
  index: string
  slug: string
  name: string
  short: string
  description: string
  /** What the structure has to solve for in this sector. */
  drivers: string[]
  /** Photograph under /public. See data/images.ts for the swap procedure. */
  photo: string
  /** Fallback scene used only if `photo` is emptied. */
  plate: PlateKind
}

export const industries: Industry[] = [
  {
    index: '01',
    slug: 'manufacturing',
    name: 'Manufacturing',
    short: 'Production halls that carry cranes, services and change.',
    description:
      'Plants where the building is part of the production system. Crane loads, equipment foundations and service routing are resolved in the structural model before fabrication begins.',
    drivers: ['Crane and equipment loads', 'Column-free production area', 'Future line reconfiguration'],
    photo: '/images/industry-manufacturing.jpg',
    plate: 'plant',
  },
  {
    index: '02',
    slug: 'warehousing-logistics',
    name: 'Warehousing & Logistics',
    short: 'Span, height and dock geometry driven by throughput.',
    description:
      'Distribution and storage facilities where rack layout, vehicle movement and dock count set the grid. Structure follows the material handling plan.',
    drivers: ['Rack-coordinated grid', 'High-eave storage volume', 'Dock and yard circulation'],
    photo: '/images/industry-warehousing.jpg',
    plate: 'warehouse',
  },
  {
    index: '03',
    slug: 'automotive',
    name: 'Automotive',
    short: 'Assembly, press and paint environments under one frame.',
    description:
      'Structures for component manufacture and vehicle assembly, where heavy crane duty, vibration and strict floor tolerances all bear on the frame.',
    drivers: ['Heavy crane duty cycles', 'Vibration-sensitive equipment', 'Paint shop enclosure'],
    photo: '/images/industry-automotive.jpg',
    plate: 'plant',
  },
  {
    index: '04',
    slug: 'engineering',
    name: 'Engineering & Fabrication',
    short: 'Workshops built for heavy handling.',
    description:
      'Fabrication and machining shops where material movement is constant and the crane is the primary tool. Gantry geometry and bay length come first.',
    drivers: ['Multi-crane bays', 'Long material handling runs', 'Heavy floor loading'],
    photo: '/images/industry-engineering.jpg',
    plate: 'plant',
  },
  {
    index: '05',
    slug: 'food-processing',
    name: 'Food Processing',
    short: 'Hygienic envelopes on a cleanable structure.',
    description:
      'Processing and packing facilities where wash-down regimes, hygiene zoning and thermal separation define the envelope and the steel protection specification.',
    drivers: ['Wash-down corrosion resistance', 'Hygiene zoning', 'Thermal separation'],
    photo: '/images/industry-food.jpg',
    plate: 'coldstore',
  },
  {
    index: '06',
    slug: 'cold-chain',
    name: 'Cold Chain & Storage',
    short: 'Sealed, insulated volume held at temperature.',
    description:
      'Cold rooms, freezer stores and ripening chambers where the frame, the insulated panel and the vapour barrier are one detailed system.',
    drivers: ['Thermal bridging control', 'Vapour sealing', 'Dock and airlock structures'],
    photo: '/images/industry-cold-chain.jpg',
    plate: 'coldstore',
  },
  {
    index: '07',
    slug: 'pharmaceutical',
    name: 'Pharmaceutical',
    short: 'Controlled environments with documented execution.',
    description:
      'Facilities where cleanroom zoning, service coordination and documentation discipline matter as much as the structure itself.',
    drivers: ['Cleanroom and service coordination', 'Tight dimensional tolerance', 'Documented traceability'],
    photo: '/images/industry-pharma.jpg',
    plate: 'blueprint',
  },
  {
    index: '08',
    slug: 'textile',
    name: 'Textile',
    short: 'Wide, well-lit floors for continuous machinery.',
    description:
      'Spinning, weaving and processing units needing large uninterrupted floor plates, controlled daylight and provision for humidification and dust extraction.',
    drivers: ['Large clear-span floors', 'Daylight and ventilation', 'Humidification services'],
    photo: '/images/industry-textile.jpg',
    plate: 'warehouse',
  },
  {
    index: '09',
    slug: 'commercial',
    name: 'Commercial',
    short: 'Structures the public actually sees.',
    description:
      'Showrooms, retail blocks and workspaces where exposed steel, facade interface and finish quality carry equal weight with capacity.',
    drivers: ['Exposed steel finish quality', 'Facade interface', 'Architectural coordination'],
    photo: '/images/industry-commercial.jpg',
    plate: 'frames',
  },
  {
    index: '10',
    slug: 'infrastructure',
    name: 'Infrastructure',
    short: 'Support structures for public and utility assets.',
    description:
      'Terminals, depots, utility buildings and covered yards, typically built to programme against fixed operational deadlines.',
    drivers: ['Fixed programme dates', 'Phased handover', 'Public-use load cases'],
    photo: '/images/industry-infrastructure.jpg',
    plate: 'aerial',
  },
]

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug)
