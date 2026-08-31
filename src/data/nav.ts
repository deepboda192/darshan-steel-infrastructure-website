export type NavItem = { label: string; href: string; description?: string }

export const primaryNav: NavItem[] = [
  { label: 'Solutions', href: '/peb-solutions', description: 'Building types we engineer and manufacture' },
  { label: 'Industries', href: '/industries', description: 'Sectors we build for' },
  { label: 'Capabilities', href: '/manufacturing', description: 'Fabrication facility and process' },
  { label: 'Projects', href: '/projects', description: 'Selected work' },
  { label: 'Engineering', href: '/quality-engineering', description: 'Design, detailing and quality control' },
  { label: 'About', href: '/about', description: 'Who we are' },
]

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Solutions',
    items: [
      { label: 'Industrial Sheds', href: '/peb-solutions#industrial-sheds' },
      { label: 'Warehouses', href: '/peb-solutions#warehouses' },
      { label: 'Factory Buildings', href: '/peb-solutions#factory-buildings' },
      { label: 'Cold Storage', href: '/peb-solutions#cold-storage' },
      { label: 'Commercial Structures', href: '/peb-solutions#commercial' },
      { label: 'Custom Steel Buildings', href: '/peb-solutions#custom' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Manufacturing', href: '/manufacturing' },
      { label: 'Quality & Engineering', href: '/quality-engineering' },
      { label: 'Projects', href: '/projects' },
      { label: 'Industries', href: '/industries' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Enquiries',
    items: [
      { label: 'Start Your Project', href: '/contact' },
      { label: 'Request a Quote', href: '/contact?intent=quote' },
      { label: 'Talk to Our Experts', href: '/contact?intent=consult' },
      { label: 'Vendor Registration', href: '/contact?intent=vendor' },
    ],
  },
]

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
]
