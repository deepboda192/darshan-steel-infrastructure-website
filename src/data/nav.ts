export type NavItem = { label: string; href: string; description?: string }

/**
 * The home page is navigated by section anchor; About and Projects have
 * pages of their own. Every href starts with `/` so the links also resolve from the project,
 * admin and sign-in screens.
 */
export const primaryNav: NavItem[] = [
  { label: 'About', href: '/about', description: 'Who we are' },
  { label: 'Solutions', href: '/#solutions', description: 'Building types we engineer and manufacture' },
  { label: 'Projects', href: '/projects', description: 'Every project on record' },
  { label: 'Why DSI', href: '/#why-dsi', description: 'Eight reasons clients choose DSI' },
  { label: 'Process', href: '/#process', description: 'The integrated workflow' },
  { label: 'Contact', href: '/#contact', description: 'Start a project or request a quotation' },
]

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Solutions', href: '/#solutions' },
      { label: 'Projects', href: '/projects' },
      { label: 'Why DSI', href: '/#why-dsi' },
      { label: 'Process', href: '/#process' },
    ],
  },
  {
    heading: 'Enquiries',
    items: [
      { label: 'Start Your Project', href: '/#contact' },
      { label: 'Request a Quote', href: '/?intent=quote#contact' },
      { label: 'Talk to Our Experts', href: '/?intent=consult#contact' },
      { label: 'Vendor Registration', href: '/?intent=vendor#contact' },
    ],
  },
]
