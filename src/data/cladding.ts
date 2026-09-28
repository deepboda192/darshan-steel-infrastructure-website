/**
 * Copy for the Cladding System page — the skin of a pre-engineered building,
 * part by part: roof cladding, wall cladding, standing seam roofing and the
 * components that close the envelope. Everything here describes general PEB
 * practice. The only figures quoted are the catalogue's own: S550 sheeting
 * at 0.50–0.80 mm core, standing seam in 300 MPa steel at 0.50–0.80 mm core,
 * the seven-colour coated range, and XLPE or fibreglass insulation. The
 * material table on the page is read from company.materialStandards.
 */

export const claddingMeta = {
  title: 'PEB Cladding System: Roof & Wall Sheeting, Standing Seam | DSI',
  description:
    'The cladding system of a pre-engineered building: roof and wall sheeting in S550 high-tensile steel, standing seam roofing, and the flashings, fasteners, sealants and insulation that close the envelope.',
}

export const claddingIntro = {
  lead:
    'The cladding system is the skin of the building: the roof and wall sheets fixed to the purlins and girts, and the flashings, trims, fasteners, sealants and insulation that turn them into a weathertight envelope.',
  paragraphs: [
    'Everything under the roof, the crane, the stock, the machines and the people, depends on the cladding keeping the weather out. In a pre-engineered building the cladding is a system: profiled sheets roll-formed from high-tensile coated steel, laid to the purlin and girt spacing the frame was designed with, and closed at every edge, ridge, corner and opening by a matching trim.',
    'DSI supplies the cladding with the frame, so the sheet profile, the purlin spacing, the insulation and the fixings are decided together. The roof and wall sheets, the standing seam system where it is specified, and every flashing, fastener and sealant come from one source and go up with the same crew.',
  ],
}

/** The rows of company.materialStandards that belong to the cladding. */
export const claddingMaterialLabels = [
  'Roof & wall sheeting',
  'Standing seam roofing',
  'Bare Galvalume',
  'Colour-coated Galvalume',
  'Colour-coated Galvanized',
]

export type CladdingPart = {
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

export const claddingParts: CladdingPart[] = [
  {
    slug: 'roof-cladding',
    eyebrow: 'Part 01',
    title: 'Roof cladding',
    summary:
      'Profiled steel sheets laid across the purlins, lapped and screwed down to shed water and resist wind uplift.',
    paragraphs: [
      'The roof sheet is a trapezoidal profile roll-formed from S550 high-tensile steel, bare or colour-coated, in lengths that run from ridge to eave in one piece wherever transport allows. It is laid across the purlins with its ribs down the slope, side-lapped by one rib and end-lapped only where a length has to break, and screwed through the crest of the rib into the purlin with self-drilling fasteners under sealing washers.',
      'The profile does the work. The rib height sets how much water the sheet can carry at the roof slope and how far it can span between purlins, and the high-tensile steel lets a thin sheet span that distance under wind uplift and foot traffic. Sheets are 0.50–0.80 mm core thickness, chosen for the span and the exposure.',
      'Translucent daylight panels in the same profile take the place of a steel sheet where light is wanted. A ridge cap closes the top, an eave flashing and gutter take the water at the bottom, and foam closures fill the profile at both. Insulation, an XLPE or fibreglass blanket, is laid over the purlins under the sheet, or a liner panel is added below for a finished ceiling.',
    ],
    points: [
      'Trapezoidal profile in S550 high-tensile steel',
      'Bare Galvalume or colour-coated, 0.50–0.80 mm core',
      'Single lengths ridge to eave where transport allows',
      'Self-drilling fasteners with sealing washers through the rib crest',
      'Ridge cap, eave flashing, closures and gutter to match',
      'Translucent daylight panels in the same profile',
    ],
    specs: [
      { label: 'Material', value: 'S550 high-tensile steel, Galvalume or colour-coated' },
      { label: 'Thickness', value: '0.50–0.80 mm core' },
      { label: 'Fixing', value: 'Screwed through the rib crest to the purlins' },
      { label: 'Insulation', value: 'XLPE or fibreglass blanket over the purlins' },
    ],
  },
  {
    slug: 'wall-cladding',
    eyebrow: 'Part 02',
    title: 'Wall cladding',
    summary:
      'Sheets fixed to the girts that close the sides and ends of the building, cut and trimmed around every door, window and louver.',
    paragraphs: [
      'The wall sheet is the same high-tensile profiled steel as the roof, fixed to the girts with its ribs vertical so the wall sheds water and the ribs read as clean lines on the elevation. Sheets run from the plinth to the eave in one length where they can, lapped by one rib at the sides and screwed to every girt. A base flashing closes the bottom against the plinth; the eave strut and eave flashing close the top.',
      'The wall is where the building is seen, so the sheet profile, the colour and the way the openings are trimmed decide its appearance. DSI’s colour-coated range has seven standard colours, and a two-tone wall, a band of a second colour at girt level or a fascia in a contrasting shade is only a matter of which coil goes where.',
      'Every opening is framed by the girts and finished with jamb, head and sill flashings, so the sheet edge is covered and water is led out. A liner panel inside the girts, with insulation between, gives an insulated wall with a clean inner face for offices, cold stores and clean areas.',
    ],
    points: [
      'Same S550 profiled steel as the roof, ribs vertical',
      'Colour-coated in seven standard colours, or bare Galvalume',
      'Base, corner, eave, jamb, head and sill flashings',
      'Full-height sheets from plinth to eave where possible',
      'Liner panel and insulation for an insulated wall',
      'Two-tone walls and contrasting fascias from the same range',
    ],
    specs: [
      { label: 'Material', value: 'S550 high-tensile steel, colour-coated or Galvalume' },
      { label: 'Thickness', value: '0.50–0.80 mm core' },
      { label: 'Colours', value: 'Seven standard colours' },
      { label: 'Build-up', value: 'Single skin, or liner panel with insulation between' },
    ],
  },
  {
    slug: 'standing-seam',
    eyebrow: 'Part 03',
    title: 'Standing seam roofing',
    summary:
      'A roof with no screw through the sheet: panels clipped to the purlins and seamed to each other, for long slopes and low pitches.',
    paragraphs: [
      'A standing seam roof is fixed without a single hole in the sheet. Each panel sits on concealed clips screwed to the purlins, and its upstanding edges are folded over the neighbouring panel’s edges by a seaming machine on the roof. The clips let the panel slide as it expands and contracts, so a length of many metres can run from ridge to eave without end laps and without the fastener holes that leak first on a screwed roof.',
      'DSI standing seam panels are roll-formed from 300 MPa steel in 0.50–0.80 mm core thickness, on site where the length calls for it. Because there are no laps and no exposed fasteners, the roof can be laid at a low slope, which lowers the building and its cladding area, and it stays tight through the thermal movement that a screwed sheet fights against.',
      'It is the roof for buildings that cannot afford a leak: pharmaceutical and food plants, cold stores, electronics and paper, and any building with a long slope or plant on the roof. Insulation and a liner sit below it on the same purlins, and the same flashings and gutters close it as a screwed roof.',
    ],
    points: [
      'Concealed clips on the purlins, no fastener through the sheet',
      'Panels seamed to each other on the roof',
      'Panels free to move with temperature',
      'Long lengths ridge to eave, roll-formed on site where needed',
      'Suited to low slopes and long slopes',
      '300 MPa steel, 0.50–0.80 mm core',
    ],
    specs: [
      { label: 'Material', value: '300 MPa steel' },
      { label: 'Thickness', value: '0.50–0.80 mm core' },
      { label: 'Fixing', value: 'Concealed clips and seamed edges, no exposed fasteners' },
      { label: 'Best for', value: 'Low slopes, long slopes and buildings that cannot leak' },
    ],
  },
  {
    slug: 'components',
    eyebrow: 'Part 04',
    title: 'Cladding components',
    summary: 'The flashings, trims, fasteners, sealants and insulation that turn sheets into a weathertight envelope.',
    paragraphs: [
      'Sheets alone do not make a roof. Every edge, change of direction and opening is closed by a flashing or trim folded from the same coated steel: ridge caps, eave and gable flashings, corner and base trims, jamb, head and sill trims at openings, and apron flashings where a wall meets a lower roof. Foam closures fill the profile under the ridge and at the eave, so wind, dust and birds stay out.',
      'Fasteners are self-drilling screws with sealing washers, sized for the sheet, the purlin and the exposure; stitching screws close the side laps. Sealant tape in the laps and a gun-applied sealant at the flashings finish the weatherproofing. Gutters and downspouts take the water from the eave to the ground, sized for the roof area and the rainfall.',
      'Insulation goes under the roof and behind the walls as an XLPE or fibreglass blanket, with a liner panel where a finished inner face is wanted. Daylight panels, turbo ventilators, ridge ventilators and louvers are set into the cladding and trimmed the same way; they belong to the accessories system and are chosen with the cladding.',
    ],
    points: [
      'Ridge, eave, gable, corner and base flashings',
      'Jamb, head and sill trims at every opening',
      'Self-drilling fasteners with sealing washers, and stitching screws',
      'Foam closures, sealant tape and gun sealant at the laps',
      'Gutters and downspouts sized for the roof',
      'XLPE or fibreglass insulation and liner panels',
    ],
    specs: [
      { label: 'Flashings', value: 'Folded from the same coated steel as the sheet' },
      { label: 'Fasteners', value: 'Self-drilling screws with sealing washers' },
      { label: 'Sealing', value: 'Foam closures, lap tape and gun-applied sealant' },
      { label: 'Insulation', value: 'XLPE or fibreglass blanket, with liner panels' },
    ],
  },
]

export type CladdingFaq = { question: string; answer: string }

export const claddingFaq: CladdingFaq[] = [
  {
    question: 'Screwed roof or standing seam?',
    answer:
      'A screwed trapezoidal roof is the economical choice for most sheds and warehouses at a normal slope. Standing seam costs more per square metre but has no fastener holes and no end laps, so it is chosen for low slopes, very long slopes, and buildings where a leak is expensive: food, pharmaceuticals, cold storage and electronics.',
  },
  {
    question: 'Galvalume or colour-coated?',
    answer:
      'Bare Galvalume is the aluminium-zinc coated sheet as it comes: a light grey that weathers to a matt finish and costs least. Colour-coated sheet adds a paint system over the same base for appearance and extra protection, in seven standard colours. Many buildings take a bare Galvalume roof with colour-coated walls.',
  },
  {
    question: 'How is the building insulated?',
    answer:
      'With an XLPE or fibreglass blanket laid over the purlins and girts under the sheet, held by the sheet fixings, with its facing to the inside. Where a finished inner face is wanted, a liner panel goes inside the purlins or girts with the insulation between, which also protects the blanket. Cold stores use insulated panels instead.',
  },
  {
    question: 'What about daylight and ventilation?',
    answer:
      'Translucent daylight panels in the roof profile, turbo ventilators, ridge ventilators, roof monitors and louvers are all set into the cladding and trimmed like any other opening. They belong to the accessories system and are chosen with the cladding, so the purlin and girt spacing suits them.',
  },
]
