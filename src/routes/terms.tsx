import { createFileRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import Link from '@/components/site/NextLink'

import { Container } from '@/components/site/Container'
import { Section } from '@/components/site/Section'
import { TechLabel } from '@/components/site/TechLabel'
import { Reveal } from '@/components/animations/Reveal'
import { CTASection } from '@/components/sections/CTASection'
import { company, formattedAddress } from '@/data/company'
import { JsonLd, breadcrumbSchema } from '@/lib/schema'

/* -------------------------------------------------------------------------- */
/* Prose primitives — local to the legal pages                                 */
/* -------------------------------------------------------------------------- */

/** A short blue rule stands in for a bullet — the site uses no icon set. */
function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map((item, i) => (
        <li key={i} className="relative pl-7">
          <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-4 bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  )
}

type Clause = { index: string; id: string; title: string; body?: ReactNode }

function ClauseBlock({ index, id, title, body }: Clause) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-t border-charcoal/10 pt-10 md:pt-12"
    >
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-[3.5rem_1fr]">
        <p className="tabular tech pt-2 text-muted/70">{index}</p>
        <div>
          <h2
            id={`${id}-heading`}
            className="font-display wdth-wide text-display-4 text-charcoal"
          >
            {title}
          </h2>
          <div className="measure mt-6 flex flex-col gap-5 text-body text-muted">{body}</div>
        </div>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Content                                                                     */
/* -------------------------------------------------------------------------- */

const CLAUSES: Clause[] = [
  {
    index: '01',
    id: 'acceptance',
    title: 'Acceptance of these terms',
    body: (
      <>
        <p>
          This website is operated by {company.name} (&ldquo;{company.shortName}&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing or using it you accept these terms.
        </p>
        <p>
          If you do not accept them, do not use the site. Where you use the site on behalf of an
          organisation, you confirm you are authorised to accept these terms for that organisation.
        </p>
      </>
    ),
  },
  {
    index: '02',
    id: 'what-this-site-is',
    title: 'What this website is',
    body: (
      <>
        <p>
          This site describes the building types we engineer and manufacture, how the work is
          organised, and the sectors we build for. It is published for information.
        </p>
        <p>
          Descriptions, frame types, drawings, plates, dimensions and figures shown here are
          indicative. They illustrate the kind of work we do; they are not a structural design, a
          calculation, a specification, or a design proposal for any specific building.
        </p>
        <p>
          Nothing on this site may be relied on for construction. Structural design for a project is
          issued only as a drawing set produced for that project under a written contract.
        </p>
      </>
    ),
  },
  {
    index: '03',
    id: 'enquiries',
    title: 'Enquiries, quotations and contracts',
    body: (
      <>
        <p>
          Sending an enquiry through this site does not create a contract and does not oblige either
          party to proceed. It starts a conversation.
        </p>
        <p>
          A quotation is valid only in the form and for the period in which we issue it in writing,
          and is subject to the scope, exclusions and commercial terms stated in it. Work begins only
          against a signed order or contract.
        </p>
        <p data-placeholder="true">
          [STANDARD TERMS OF SALE, ORDER ACCEPTANCE AND QUOTATION VALIDITY TO BE SUPPLIED BY DSI AND
          CROSS-REFERENCED HERE.]
        </p>
      </>
    ),
  },
  {
    index: '04',
    id: 'intellectual-property',
    title: 'Intellectual property',
    body: (
      <>
        <p>
          The content of this site — text, drawings, technical plates, photographs, layout and code —
          together with the {company.shortName} name, logo and marks, belongs to{' '}
          {company.legalName} or its licensors.
        </p>
        <p>
          You may view pages, and print or download a copy, for your own reference and for evaluating{' '}
          {company.shortName} for a project. You may not otherwise copy, republish, distribute,
          modify, sell or exploit any part of the site, or use our name or marks, without our written
          permission.
        </p>
      </>
    ),
  },
  {
    index: '05',
    id: 'acceptable-use',
    title: 'Acceptable use',
    body: (
      <>
        <p>When using this site you agree not to:</p>
        <Bullets
          items={[
            'Attempt to gain unauthorised access to the site, its server, or any connected system.',
            'Interfere with the site’s operation, introduce malicious code, or place an unreasonable load on it.',
            'Scrape, harvest or systematically extract content, including for training or resale.',
            'Submit unlawful, misleading or infringing material, or another person’s details without their consent.',
            'Misrepresent your identity or your association with any organisation.',
          ]}
        />
        <p>
          We may restrict or withdraw access where the site is used in breach of these terms or in a
          way that affects other users.
        </p>
      </>
    ),
  },
  {
    index: '06',
    id: 'information-you-submit',
    title: 'Information you submit',
    body: (
      <>
        <p>
          You confirm that the information you send through this site is accurate and that you are
          entitled to send it. We use it to respond to you and to progress the enquiry, as set out in
          our{' '}
          <Link href="/privacy" className="text-charcoal underline-offset-4 hover:text-brand">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          Do not send confidential drawings, tender documents or commercially sensitive material
          through the enquiry form. If an enquiry requires them, we will agree a route for their
          exchange first.
        </p>
      </>
    ),
  },
  {
    index: '07',
    id: 'third-party-links',
    title: 'Links to other sites',
    body: (
      <p>
        This site may link to websites we do not control. Those links are provided for convenience.
        We are not responsible for the content, accuracy or availability of a linked site, and a link
        is not an endorsement of it or of anything it offers.
      </p>
    ),
  },
  {
    index: '08',
    id: 'availability',
    title: 'Availability of the site',
    body: (
      <p>
        We aim to keep the site available, but we do not guarantee uninterrupted or error-free
        access. Pages, content and features may be changed, suspended or withdrawn at any time
        without notice, including for maintenance.
      </p>
    ),
  },
  {
    index: '09',
    id: 'no-warranty',
    title: 'Accuracy of content',
    body: (
      <>
        <p>
          Content is checked before publication, but it is provided as it stands, without warranty of
          any kind as to accuracy, completeness or fitness for a particular purpose. Standards,
          codes, specifications and our own capabilities change over time.
        </p>
        <p>
          Before acting on anything published here, confirm it with us in writing for your project.
        </p>
      </>
    ),
  },
  {
    index: '10',
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <>
        <p>
          To the extent permitted by applicable law, {company.legalName} is not liable for any
          indirect or consequential loss, or for loss of profit, contract, production or data,
          arising from the use of this website or from reliance on its content.
        </p>
        <p>
          Nothing in these terms excludes or limits liability that cannot lawfully be excluded or
          limited, including liability for death or personal injury caused by negligence, or for
          fraud.
        </p>
        <p data-placeholder="true">
          [LIABILITY CAP, EXCLUSIONS AND INDEMNITY WORDING TO BE SETTLED BY DSI&rsquo;S LEGAL
          ADVISOR.]
        </p>
      </>
    ),
  },
  {
    index: '11',
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may revise these terms as the site or the law changes. The version published on this page
        is the one that applies, and continued use of the site after a change means you accept the
        revised terms. Check this page before relying on anything here.
      </p>
    ),
  },
  {
    index: '12',
    id: 'governing-law',
    title: 'Governing law and jurisdiction',
    body: (
      <>
        <p>
          These terms and any dispute arising from them or from use of this website are governed by
          the laws of India.
        </p>
        <p>
          The courts at{' '}
          <span data-placeholder={company.address.city.placeholder}>
            {company.address.city.value}
          </span>
          , {company.address.state.value}, shall have exclusive jurisdiction.
        </p>
        <p data-placeholder="true">
          [JURISDICTION, SEAT AND ANY ARBITRATION CLAUSE TO BE CONFIRMED BY DSI&rsquo;S LEGAL
          ADVISOR.]
        </p>
      </>
    ),
  },
]

const CONTACT_CLAUSE = {
  index: '13',
  id: 'contact',
  title: 'Contact',
}

const NAV_ITEMS = [...CLAUSES, CONTACT_CLAUSE]

/* -------------------------------------------------------------------------- */

function TermsPage() {
  const tel = company.phone.primary.value.replace(/[^+\d]/g, '')

  const contactRows = [
    {
      label: 'Entity',
      value: company.legalName,
      href: undefined,
      placeholder: false,
    },
    {
      label: 'Email',
      value: company.email.general.value,
      href: `mailto:${company.email.general.value}`,
      placeholder: company.email.general.placeholder,
    },
    {
      label: 'Telephone',
      value: company.phone.primary.value,
      href: `tel:${tel}`,
      placeholder: company.phone.primary.placeholder,
    },
    {
      label: 'Registered office',
      value: formattedAddress(),
      href: undefined,
      placeholder: company.address.city.placeholder,
    },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms of Use', path: '/terms' },
        ])}
      />

      {/* ================= header band ================= */}
      <section className="relative overflow-hidden bg-charcoal on-dark" aria-label="Terms of use">
        <div
          aria-hidden="true"
          className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.05]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-brand/70" />

        <Container className="relative z-10 pb-16 pt-[168px] md:pb-20 md:pt-[208px]">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="flex flex-wrap items-center gap-2.5 tech text-white/55">
                <li>
                  <Link href="/" className="transition-colors hover:text-white/80">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="text-white/55">
                    /
                  </span>
                  <span className="text-white/70">Terms of Use</span>
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <TechLabel rule tone="light" className="mb-7">
              Legal
            </TechLabel>
          </Reveal>

          <h1 className="font-display wdth-wide text-display-2 uppercase text-white">
            <Reveal variant="line" delay={0.12}>
              Terms of Use
            </Reveal>
          </h1>

          <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal delay={0.22} className="lg:col-span-6">
              <p className="measure text-lead text-white/65">
                The terms on which {company.name} makes this website available, what its content is
                and is not, and the law that governs it.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 tech">
                <dt className="text-white/55">Document</dt>
                <dd className="text-white/80">Terms of Use</dd>
                <dt className="text-white/55">Applies to</dt>
                <dd className="text-white/80">This website</dd>
                <dt className="text-white/55">Last reviewed</dt>
                <dd className="text-white/80" data-placeholder="true">
                  [DATE]
                </dd>
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ================= terms ================= */}
      <Section tone="white" space="md" ariaLabel="Terms of use text">
        <Container>
          {/* legal review notice */}
          <Reveal>
            <aside
              data-placeholder="true"
              aria-label="Review notice"
              className="rounded-[4px] border border-brand/25 border-l-2 border-l-brand bg-brand-tint px-6 py-6 md:px-8 md:py-7"
            >
              <p className="tech mb-3 text-brand">Review required before publication</p>
              <p className="measure text-small text-charcoal/80">
                [LEGAL COPY TO BE REVIEWED BY DSI&rsquo;S LEGAL ADVISOR BEFORE PUBLICATION] — the
                text below is a working scaffold written to cover the sections terms of this kind
                normally carry. It is not legal advice and has not been checked against the statutes
                that apply to {company.legalName}.
              </p>
            </aside>
          </Reveal>

          <div className="mt-16 grid gap-x-16 gap-y-14 md:mt-20 lg:grid-cols-12">
            {/* ---- contents ---- */}
            <nav aria-label="Contents" className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
              <TechLabel rule className="mb-7">
                Contents
              </TechLabel>
              <ol className="flex flex-col gap-3.5">
                {NAV_ITEMS.map((clause) => (
                  <li key={clause.id}>
                    <a
                      href={`#${clause.id}`}
                      className="flex items-baseline gap-3.5 text-small text-muted transition-colors duration-300 hover:text-brand"
                    >
                      <span className="tabular tech shrink-0 text-charcoal/35">{clause.index}</span>
                      <span>{clause.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* ---- clauses ---- */}
            <div className="flex flex-col gap-12 md:gap-14 lg:col-span-8 lg:col-start-5">
              {CLAUSES.map((clause) => (
                <ClauseBlock key={clause.id} {...clause} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= contact ================= */}
      <Section tone="offwhite" space="md" ariaLabel="Legal contact">
        <Container>
          <div id={CONTACT_CLAUSE.id} className="scroll-mt-28 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <TechLabel index={CONTACT_CLAUSE.index} rule className="mb-7">
                  Legal contact
                </TechLabel>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-display wdth-wide text-display-3 text-charcoal">
                  Questions about these terms
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="measure mt-7 text-body text-muted">
                  Notices under these terms, and any question about permitted use of this
                  site&rsquo;s content, should be sent to the contact below and marked for the
                  attention of the management.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.18} className="lg:col-span-6 lg:col-start-7">
              <dl className="flex flex-col divide-y divide-charcoal/10 border-y border-charcoal/10">
                {contactRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:py-7"
                  >
                    <dt className="tech pt-1 text-muted">{row.label}</dt>
                    <dd className="text-body text-charcoal">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="break-words transition-colors duration-300 hover:text-brand"
                          data-placeholder={row.placeholder}
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="break-words" data-placeholder={row.placeholder}>
                          {row.value}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-small text-muted">
                See also our{' '}
                <Link href="/privacy" className="text-charcoal underline-offset-4 hover:text-brand">
                  Privacy Policy
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  )
}

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: "Terms of Use | DSI" },
      { name: 'description', content: "The terms on which Darshan Steel Infrastructure makes this website available \u2014 scope of the content, intellectual property, liability and governing law." },
      { property: 'og:title', content: "Terms of Use | DSI" },
      { property: 'og:description', content: "The terms on which Darshan Steel Infrastructure makes this website available \u2014 scope of the content, intellectual property, liability and governing law." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://darshansteel.in/terms' }],
  }),
  component: TermsPage,
})
