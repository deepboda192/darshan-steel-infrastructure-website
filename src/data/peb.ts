/**
 * Copy for the About PEB page — what a pre-engineered building is, in plain
 * words. Every figure quoted (spans, bays, weight saving, the six-week
 * programme) comes from the catalogue content in capabilities.ts; the rest
 * describes general PEB practice, not a DSI claim.
 */

export const pebMeta = {
  title: 'About PEB: Pre-Engineered Buildings Explained | DSI',
  description:
    'What a pre-engineered building (PEB) is, how it is built, its advantages over conventional construction and where it is used. By DSI, PEB manufacturer in Rajkot.',
}

/** The definition, kept short enough to read in one pass. */
export const pebDefinition = {
  lead:
    'A pre-engineered building (PEB) is a steel building that is designed, engineered and fabricated in a factory, then delivered to site as a kit of numbered parts and bolted together.',
  paragraphs: [
    'The structure is a row of rigid steel frames. Each column and rafter is a built-up section tapered to follow the bending moment, so steel is placed where the load is and saved where it is not. Cold-formed purlins and girts span between the frames and carry the roof and wall sheeting.',
    'Every member is cut, drilled, welded and painted under factory control against the building’s own drawings. On site there is no cutting or welding: the frames are lifted, bolted and braced in a planned sequence, and the cladding, doors, ventilation and insulation follow.',
    'Compared with conventional steel or concrete construction, a PEB is lighter, quicker to erect and easier to extend, with one supplier accountable for the frame, the envelope and the accessories.',
  ],
}

export type PebFaq = { question: string; answer: string }

export const pebFaq: PebFaq[] = [
  {
    question: 'What does PEB stand for?',
    answer:
      'PEB stands for pre-engineered building. The building is engineered and fabricated before it reaches the site, so the work on site is assembly rather than construction.',
  },
  {
    question: 'How is a PEB different from a conventional steel building?',
    answer:
      'A conventional steel building uses standard hot-rolled sections of constant depth. A PEB uses built-up sections tapered to the load, with standardised bolted connections. The frame is typically 20–30% lighter, the foundations are smaller, and erection is faster because nothing is cut or welded on site.',
  },
  {
    question: 'How wide can a PEB span without columns?',
    answer:
      'Clear spans of 50–60 m are routine, with bays of 8–10 m between frames without jack beams. Wider buildings use one or more lines of intermediate columns, and eave height is set by what the building has to hold, such as cranes or racking.',
  },
  {
    question: 'Can a PEB carry overhead cranes?',
    answer:
      'Yes. Crane beams, rails and brackets are part of the primary system and are designed into the columns from the start, so the crane load path is resolved in the analysis rather than added afterwards.',
  },
  {
    question: 'Can a PEB be extended later?',
    answer:
      'Length grows by adding bays at either end. Width and height can also grow when the building is pre-designed for it. Because the joints are bolted, extension work is non-destructive and the building can stay in use.',
  },
  {
    question: 'How long does a PEB take?',
    answer:
      'Fabrication runs in the factory while the foundations cure on site, so the two happen in parallel rather than one after the other. DSI designs, details, fabricates and ships a standard building in under six weeks; erection then follows the planned lift sequence.',
  },
]
