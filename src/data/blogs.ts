import { siteImages, type SiteImage } from '@/data/images'

/**
 * The blog: articles on pre-engineered buildings, kept as data so the pages
 * stay static and render on the server. Each post is a list of typed blocks
 * rather than markdown, so the renderer (components/blogs/BlogBody.tsx)
 * controls the typography. Reading time and word count are derived from the
 * blocks, and dates are formatted from the parts of date-only ISO strings, so
 * the server and every browser print the same calendar day.
 *
 * Copy describes general PEB practice. The only figures quoted are DSI's
 * own catalogue figures: frames 20–30% lighter than conventional steel,
 * clear spans to 50 m, 8–10 m bays, EOT cranes to 50 MT, 345 MPa plate,
 * S550 sheeting, and XLPE or fibreglass insulation.
 */

export type BlogCategory = { slug: string; name: string; description: string }

/** The categories a post can belong to. Only those with posts show as filters. */
export const blogCategories: BlogCategory[] = [
  { slug: 'peb-basics', name: 'PEB Basics', description: 'What pre-engineered buildings are and how they compare.' },
  { slug: 'design-engineering', name: 'Design & Engineering', description: 'Frames, loads, spans and the systems inside a PEB.' },
  { slug: 'cost-planning', name: 'Cost & Planning', description: 'Budgets, timelines and decisions before the first drawing.' },
  { slug: 'project-stories', name: 'Project Stories', description: 'What DSI built, and what the site taught us.' },
]

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; caption: string; head: string[]; rows: string[][] }
  | { type: 'image'; image: SiteImage; caption: string }
  | { type: 'callout'; title: string; text: string }

export type BlogFaq = { question: string; answer: string }

export type BlogPost = {
  slug: string
  /** The headline on the page. */
  title: string
  /** The <title> and og:title, kept under 60 characters. */
  seoTitle: string
  /** The meta description, kept under 160 characters. */
  description: string
  /** A one-paragraph direct answer, shown under the title and read by answer engines. */
  answer: string
  /** A blogCategories slug. */
  category: string
  tags: string[]
  /** Date-only ISO strings. */
  publishedAt: string
  updatedAt?: string
  author: string
  cover: SiteImage
  /** Short statements a reader can take away without reading the whole piece. */
  takeaways: string[]
  blocks: BlogBlock[]
  faq: BlogFaq[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'peb-building-vs-conventional-building',
    title: 'PEB Building vs Conventional Building: Which Is Right for Your Project?',
    seoTitle: 'PEB vs Conventional Building: Cost, Time & Strength | DSI',
    description:
      'PEB and conventional buildings compared on cost, construction time, strength, clear spans, expansion and maintenance, with a guide to choosing the right one.',
    answer:
      'A pre-engineered building (PEB) is a steel building whose frames, purlins, sheeting and accessories are designed and fabricated in a factory and bolted together on site. A conventional building is designed and built member by member on site, in reinforced concrete or hot-rolled steel. For factories, warehouses and other single-storey industrial buildings a PEB is usually faster to build, lighter on its foundations and easier to extend. Conventional construction still suits multi-storey, irregular or very heavily loaded buildings where a standard frame does not fit.',
    category: 'peb-basics',
    tags: ['PEB', 'conventional building', 'RCC', 'structural steel', 'industrial buildings', 'construction cost', 'construction time'],
    publishedAt: '2026-09-29',
    author: 'DSI Engineering Team',
    cover: siteImages.blog.pebVsConventional.cover,
    takeaways: [
      'A PEB is engineered and fabricated in a factory and bolted together on site; a conventional building is built member by member on site in reinforced concrete or hot-rolled steel.',
      'Fabrication runs while the foundations cure, so a PEB is usually closed in and occupied sooner than a conventional building of the same size.',
      'Tapered built-up frames are 20–30% lighter than conventional steel, so the footings are smaller and simpler.',
      'Clear spans to 50 m and bays of 8–10 m give a column-free floor that a concrete frame cannot match without deep, costly beams.',
      'Choose a PEB for single-storey industrial volumes; choose conventional construction for multi-storey, irregular or very heavily loaded buildings.',
    ],
    blocks: [
      { type: 'h2', id: 'what-is-a-peb', text: 'What is a pre-engineered building?' },
      {
        type: 'p',
        text: 'A pre-engineered building is a steel building that is designed, detailed and fabricated in a factory before it reaches the site. The main frames are built-up I-sections, cut from plate and welded with the web depth tapered to follow the bending moment, so steel sits where the load is and is saved where it is not. Cold-formed purlins and girts span between the frames, roof and wall sheeting fixes to them, and the doors, ventilators, daylight panels and insulation are chosen with the building rather than added to it.',
      },
      {
        type: 'p',
        text: 'Every member is drawn, cut, drilled, welded and painted against the building’s own drawings under factory control. On site there is no cutting and no welding: the frames are lifted, bolted through end plates with high-strength bolts, braced and clad in a planned sequence. The whole building, from the anchor bolts to the ridge cap, comes from one supplier as one designed system.',
      },
      { type: 'image', image: siteImages.blog.pebVsConventional.steel, caption: 'A pre-engineered building under erection: tapered main frames bolted together on site, with the purlins and girts that carry the sheeting spanning between them.' },
      { type: 'h2', id: 'what-is-a-conventional-building', text: 'What is a conventional building?' },
      {
        type: 'p',
        text: 'A conventional building is designed and constructed on site, member by member. In India that most often means a reinforced cement concrete (RCC) frame: columns and beams cast in formwork around steel reinforcement, with masonry infill walls, plastered and painted, under a concrete or sheeted roof on steel trusses. The other conventional route is a structural steel building made from hot-rolled sections such as ISMB beams and ISMC channels, cut and welded on site or in a local workshop.',
      },
      {
        type: 'p',
        text: 'Conventional construction is flexible in shape and familiar to every contractor, but it is sequential. Formwork is built, reinforcement is tied, concrete is poured and cured, and only then does the next lift begin. Quality depends on the crew and the weather on the day, and the finished structure is heavy, which the foundations have to carry.',
      },
      { type: 'image', image: siteImages.blog.pebVsConventional.concrete, caption: 'A conventional reinforced concrete frame under construction: every column and beam is formed, reinforced, poured and cured on site before the next stage can start.' },
      { type: 'h2', id: 'comparison', text: 'PEB vs conventional building: side-by-side comparison' },
      {
        type: 'p',
        text: 'The table below sets the two methods against each other on the points that decide most industrial projects. The pattern is consistent: a PEB wins where speed, span, weight and predictability matter, and a conventional building wins where the shape, the storeys or the loads fall outside what a standard steel frame does well.',
      },
      {
        type: 'table',
        caption: 'PEB and conventional construction compared',
        head: ['Factor', 'Pre-engineered building (PEB)', 'Conventional building'],
        rows: [
          ['Design', 'Standard frame types engineered for the specific building; tapered built-up sections sized to the bending moment.', 'Designed from scratch for each building; uniform RCC or hot-rolled sections sized to the worst case.'],
          ['Materials', 'High-tensile steel plate, cold-formed purlins and girts, coated steel sheeting, all from one source.', 'Cement, aggregate, reinforcing steel, bricks or blocks, plaster, or hot-rolled steel sections.'],
          ['Where the work happens', 'In the factory; the site only bolts, braces and clads.', 'On site, member by member, in the open.'],
          ['Construction time', 'Fabrication runs while the foundations cure; erection is bolted and fast.', 'Sequential: form, reinforce, pour, cure, repeat for every lift.'],
          ['Structural weight', '20–30% lighter than a conventional steel frame.', 'Heavy; concrete carries its own dead load before any live load.'],
          ['Foundations', 'Smaller, simpler footings because the frame is light.', 'Larger footings sized for the weight of the structure.'],
          ['Clear span', 'Column-free clear spans to 50 m, with 8–10 m bays.', 'Short spans; wide floors need deep beams or rows of columns.'],
          ['Expansion', 'Bays are added at the end; width and height grow when pre-designed. Bolted joints make the work non-destructive.', 'Extension means breaking into the structure, drilling dowels and matching old to new.'],
          ['Quality control', 'Cut, drilled and welded on CNC lines under factory control; site matches the drawing mark for mark.', 'Depends on the site crew, the formwork and the curing on the day.'],
          ['Weather during construction', 'Fabrication is unaffected; erection continues in most weather.', 'Concreting and curing stop for rain and suffer in heat.'],
          ['Maintenance', 'Blast-cleaned and painted steel, coated sheeting; repaint cycles are the main cost.', 'Plaster cracks, water ingress and rebar corrosion need periodic repair.'],
          ['End of life', 'Bolted steel can be dismantled, relocated or recycled.', 'Demolition; concrete rubble has little recovery value.'],
        ],
      },
      { type: 'h2', id: 'cost', text: 'Which is cheaper: PEB or conventional?' },
      {
        type: 'p',
        text: 'For a single-storey industrial building the PEB is usually the lower total cost, and the gap widens as the span, the height and the floor area grow. Three things drive that. The frame uses less steel because the sections are tapered to the load instead of being uniform. The foundations are smaller because the frame is lighter. And the building is finished sooner, so the money tied up in construction starts earning earlier and the site overheads run for fewer months.',
      },
      {
        type: 'p',
        text: 'The PEB cost is also more predictable. The quantity of steel, sheeting and fasteners is fixed at the drawing stage, and one supplier is responsible for all of it, so there are fewer variations on site. A conventional building can still be the cheaper choice for a small span in a place where local labour and materials are cheap, or where the design needs the mass and the shape that concrete gives.',
      },
      {
        type: 'callout',
        title: 'Ask for the total, not the rate',
        text: 'A per-square-metre rate for the frame alone hides the difference. Compare the cost of the foundations, the frame, the envelope, the time to occupancy and the maintenance over ten years, and the picture is clear.',
      },
      { type: 'h2', id: 'speed', text: 'Which is faster to build?' },
      {
        type: 'p',
        text: 'A PEB is faster, and the reason is parallel work. While the civil contractor is casting the foundations, the steel is being cut, welded and painted in the factory. When the footings have cured the frames arrive numbered, and a crew with a crane bolts them up bay by bay; the sheeting follows the frames along the building. There is no formwork to strike and no concrete to wait for above the plinth.',
      },
      {
        type: 'p',
        text: 'A conventional building cannot escape its curing cycles. Each lift of columns and beams has to be formed, poured and left to gain strength before the next is loaded, and the sequence stops for rain. The same floor area that a PEB closes in within weeks of the foundations being ready takes a conventional site months, and the finishing trades wait for the structure before they can begin.',
      },
      { type: 'h2', id: 'strength', text: 'Which is stronger and safer?' },
      {
        type: 'p',
        text: 'Both are designed to the same codes for the same wind, seismic, crane and live loads, so a properly engineered building of either kind is safe. The difference is in how they behave. Steel is ductile: it bends and absorbs energy before it fails, which is what a structure needs in an earthquake, and a lighter building attracts less seismic force to begin with. A PEB is also engineered as a whole system, so the crane brackets, the bracing and the canopies are part of the analysis rather than additions to it. DSI frames carry EOT cranes of up to 50 MT on brackets welded to the columns.',
      },
      {
        type: 'p',
        text: 'Concrete is strong in compression and inherently fire-resistant, which is why it is chosen for multi-storey buildings and where fire regulations demand it. It is brittle unless the reinforcement is detailed and placed well, and its weight works against it in an earthquake. Steel needs corrosion protection, which a PEB gets by shot blasting and priming every member in the factory and by using coated sheeting, and it needs fire protection where the use calls for it.',
      },
      { type: 'h2', id: 'space', text: 'Which gives more usable space?' },
      {
        type: 'p',
        text: 'The PEB does, by a wide margin. A rigid frame with tapered rafters spans from sidewall to sidewall with no interior column, to 50 m in the standard range and further as a multi-span, and the bays between frames are 8–10 m. Racking, machines, cranes and forklift aisles can be laid out without working around a column grid. A concrete frame needs a column every few metres or beams deep enough to eat into the headroom, and a hot-rolled steel truss roof brings its own depth.',
      },
      {
        type: 'p',
        text: 'Height is cheap in a PEB as well. Raising the eave adds a little to the columns and the wall sheeting, not to the structure as a whole, so tall racking and overhead cranes are easy to accommodate. A mezzanine floor, a canopy over the loading dock or a crane runway is added to the design rather than built around it.',
      },
      { type: 'h2', id: 'expansion', text: 'Which is easier to expand or modify?' },
      {
        type: 'p',
        text: 'A PEB grows by adding bays. The endwall of a building designed for expansion is a full rigid frame, so the sheeting comes off, new frames bolt on and the building is longer without any demolition. Width and height can grow too when the frame was designed for it from the start. Because every connection is bolted, a PEB can even be dismantled and re-erected on another site.',
      },
      {
        type: 'p',
        text: 'Extending a conventional building means breaking into it. Reinforcement has to be exposed and spliced, new concrete has to be bonded to old, and the join is always the weak point. Openings cut later in a concrete wall need lintels; a door or louver cut later in a PEB wall is a matter of re-framing the girts.',
      },
      { type: 'h2', id: 'maintenance', text: 'Which lasts longer and costs less to maintain?' },
      {
        type: 'p',
        text: 'Both last for decades when they are built and looked after properly. Steel does not creep, crack or spall, and its properties do not change with age; what it needs is a sound coating. A PEB leaves the factory shot-blasted and primed, its sheeting is galvanized or colour-coated, and the maintenance that follows is inspection and repainting on a known cycle. A concrete building needs its plaster, its expansion joints and its waterproofing kept up, and any water that reaches the reinforcement starts corrosion that is expensive to arrest.',
      },
      { type: 'h2', id: 'choose-conventional', text: 'When should you choose a conventional building?' },
      {
        type: 'ul',
        items: [
          'Multi-storey buildings such as offices, hostels and hospitals, where floor after floor of concrete slab is the economical structure.',
          'Architecture with curved, stepped or irregular plans that a rectangular portal frame cannot follow.',
          'Very heavy or vibrating floor loads, such as large presses on upper floors, where concrete mass is an advantage.',
          'Where fire regulations or the use require an inherently fire-resistant structure without added protection.',
          'A small building at a short span, in a place where local RCC construction is cheap and a steel supplier is far away.',
        ],
      },
      { type: 'h2', id: 'choose-peb', text: 'When should you choose a PEB?' },
      {
        type: 'ul',
        items: [
          'Factories, warehouses, workshops, cold stores and logistics hubs: single-storey industrial volumes with a clear floor.',
          'Any building with an overhead crane, a wide column-free span, tall racking or a mezzanine.',
          'A project on a deadline, where the months saved in construction are worth more than any difference in rate.',
          'A building that will grow, or that may one day move.',
          'A client who wants one supplier responsible for the design, the fabrication and the erection.',
        ],
      },
      { type: 'h2', id: 'how-dsi-builds', text: 'How DSI builds a pre-engineered building' },
      {
        type: 'p',
        text: 'Darshan Steel Infrastructure designs, fabricates and erects pre-engineered buildings from its works at Rajkot, Gujarat. The frame is engineered for the operation inside the building, cut and welded from 345 MPa plate on CNC lines, shot-blasted and primed, and delivered with its purlins, girts, S550 sheeting, insulation and accessories as one package. The same team that draws the building erects it, so the drawing and the site agree mark for mark.',
      },
      {
        type: 'p',
        text: 'If you are weighing a PEB against conventional construction for a specific building, send us the plot size, the use inside and the target date. A first sizing and a frame recommendation cost nothing, and they turn the comparison above into figures for your project.',
      },
    ],
    faq: [
      {
        question: 'Is a PEB cheaper than a conventional building?',
        answer:
          'For a single-storey industrial building, usually yes, and the saving grows with the span and the height. The frame uses less steel, the foundations are smaller because the structure is 20–30% lighter than conventional steel, and the building is finished sooner. A small building at a short span in a place where RCC labour is cheap can still be cheaper in concrete, so compare the total cost of foundations, structure, envelope and time rather than the frame rate alone.',
      },
      {
        question: 'How long does it take to build a PEB?',
        answer:
          'Far less time than a conventional building of the same size, because fabrication in the factory runs while the foundations are cast and cured on site. Once the footings are ready the frames are bolted up bay by bay and the sheeting follows, without formwork or curing time. The exact programme depends on the size of the building and the site, and DSI gives a schedule with the proposal.',
      },
      {
        question: 'Can a PEB carry an overhead crane?',
        answer:
          'Yes. Crane beams, rails and brackets are designed as part of the frame. DSI buildings carry electric overhead travelling cranes of up to 50 MT on brackets welded to the main-frame columns, with an independent support system for heavier duties. The crane must be in the design from the start, because it changes the columns, the brackets and the foundations.',
      },
      {
        question: 'Is a PEB safe in earthquakes and high wind?',
        answer:
          'Yes. A PEB is designed to the same codes for wind and seismic loads as any other building. Steel is ductile, so it absorbs shock rather than cracking, and a lighter structure attracts less seismic force. Roof and wall bracing carry wind and earthquake forces along the building to the foundations, and the frames are checked for uplift as well as gravity.',
      },
      {
        question: 'Can a PEB be extended later?',
        answer:
          'Yes. A building designed for expansion has a full rigid frame at the endwall, so new bays bolt on after the sheeting is removed, with no demolition. Width and height can also be increased when they were allowed for in the original design, and because every joint is bolted, a PEB can be dismantled and re-erected elsewhere.',
      },
      {
        question: 'How long does a pre-engineered building last?',
        answer:
          'Decades, with ordinary maintenance. Steel does not lose strength with age; what it needs is a sound coating. DSI frames are shot-blasted and primed in the factory, the sheeting is galvanized or colour-coated, and a repainting cycle keeps the structure as good as new. Many PEBs are extended or relocated long after they were first erected.',
      },
    ],
  },
]

/** The post with this slug, or undefined for a slug that does not exist. */
export const getPost = (slug: string): BlogPost | undefined => blogPosts.find((p) => p.slug === slug)

/** The category record for a post, falling back to a bare name for an unknown slug. */
export const categoryOf = (post: BlogPost): BlogCategory =>
  blogCategories.find((c) => c.slug === post.category) ?? { slug: post.category, name: post.category, description: '' }

/** Every category that has at least one post, in registry order. */
export const categoriesInUse = (): BlogCategory[] =>
  blogCategories.filter((c) => blogPosts.some((p) => p.category === c.slug))

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length

/** Word count and reading time at a steady 200 words per minute, from every block a reader sees. */
export function postStats(post: BlogPost): { words: number; readMinutes: number } {
  let words = countWords(post.answer) + post.takeaways.reduce((n, t) => n + countWords(t), 0)
  for (const block of post.blocks) {
    switch (block.type) {
      case 'p':
      case 'h2':
      case 'h3':
        words += countWords(block.text)
        break
      case 'ul':
      case 'ol':
        words += block.items.reduce((n, t) => n + countWords(t), 0)
        break
      case 'table':
        words += block.rows.flat().reduce((n, t) => n + countWords(t), 0)
        break
      case 'image':
        words += countWords(block.caption)
        break
      case 'callout':
        words += countWords(block.title) + countWords(block.text)
        break
    }
  }
  words += post.faq.reduce((n, f) => n + countWords(f.question) + countWords(f.answer), 0)
  return { words, readMinutes: Math.max(1, Math.round(words / 200)) }
}

/** "29 Sep 2026": the same on the server and in every browser. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "12 Sep 2026" from "2026-09-12", with no time zone involved. */
export const formatPostDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

export type BlogSort = 'newest' | 'oldest'

const searchIndex = new Map<string, string>()

/** Everything a reader could search for in a post, lower-cased and built once per post. */
function searchText(post: BlogPost): string {
  const cached = searchIndex.get(post.slug)
  if (cached) return cached
  const parts: string[] = [post.title, post.description, post.answer, categoryOf(post).name, ...post.tags, ...post.takeaways]
  for (const block of post.blocks) {
    switch (block.type) {
      case 'p':
      case 'h2':
      case 'h3':
        parts.push(block.text)
        break
      case 'ul':
      case 'ol':
        parts.push(...block.items)
        break
      case 'table':
        parts.push(block.caption, ...block.head, ...block.rows.flat())
        break
      case 'image':
        parts.push(block.caption)
        break
      case 'callout':
        parts.push(block.title, block.text)
        break
    }
  }
  for (const item of post.faq) parts.push(item.question, item.answer)
  const text = parts.join(' ').toLowerCase()
  searchIndex.set(post.slug, text)
  return text
}

/**
 * Posts matching a free-text query and an optional category. Every word of
 * the query has to appear somewhere in the post: its title, description,
 * tags, category, takeaways, body or FAQ.
 */
export function filterPosts(posts: BlogPost[], query: string, category?: string): BlogPost[] {
  const q = query.trim().toLowerCase()
  return posts.filter((post) => {
    if (category && post.category !== category) return false
    if (!q) return true
    const haystack = searchText(post)
    return q.split(/\s+/).every((term) => haystack.includes(term))
  })
}

/** Posts ordered by publication date. */
export const sortPosts = (posts: BlogPost[], sort: BlogSort): BlogPost[] =>
  [...posts].sort((a, b) => (sort === 'oldest' ? a.publishedAt.localeCompare(b.publishedAt) : b.publishedAt.localeCompare(a.publishedAt)))
