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
    id: 'scope',
    title: 'Scope of this policy',
    body: (
      <>
        <p>
          This policy explains how {company.name} (&ldquo;{company.shortName}&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information collected through this
          website. It applies to this website only.
        </p>
        <p>
          Information exchanged under a signed order or contract — drawings, schedules,
          correspondence and commercial terms — is governed by that contract, not by this policy.
        </p>
      </>
    ),
  },
  {
    index: '02',
    id: 'information-we-collect',
    title: 'Information we collect',
    body: (
      <>
        <p>We collect information in three ways.</p>
        <Bullets
          items={[
            <>
              <strong className="font-semibold text-charcoal">Information you send us.</strong>{' '}
              Details entered into the enquiry form — your name, organisation, email address,
              telephone number, project location, building type and anything written into the
              message field. Applications for a role include the contact details and career history
              you choose to send.
            </>,
            <>
              <strong className="font-semibold text-charcoal">
                Information collected automatically.
              </strong>{' '}
              Standard server and browser data such as IP address, device and browser type,
              referring page, the pages you view and the time of the request.
            </>,
            <>
              <strong className="font-semibold text-charcoal">Correspondence.</strong> Email and
              telephone exchanges that follow an enquiry, kept as a record of what was discussed and
              quoted.
            </>,
          ]}
        />
        <p>
          We do not ask for financial account details, government identification numbers or any
          special category of personal data through this website. Please do not send them.
        </p>
      </>
    ),
  },
  {
    index: '03',
    id: 'how-we-use-it',
    title: 'How we use the information',
    body: (
      <>
        <p>Information sent through this site is used to:</p>
        <Bullets
          items={[
            'Respond to an enquiry and understand the structural requirement well enough to advise on it.',
            'Prepare budgetary and firm quotations, and issue the drawings and documents an enquiry calls for.',
            'Administer a project once it is awarded, and keep a record of what was supplied.',
            'Assess applications for employment or vendor registration.',
            'Maintain business, tax and statutory records.',
            'Keep the site secure and understand which pages are used, so it can be improved.',
          ]}
        />
        <p>
          We do not use enquiry information for automated decision-making or profiling, and we do
          not send marketing material to an address you gave us for a specific enquiry unless you
          asked us to.
        </p>
      </>
    ),
  },
  {
    index: '04',
    id: 'consent',
    title: 'Consent and your choices',
    body: (
      <>
        <p>
          Personal information reaches us from this website only when you choose to send it. Fields
          marked as required are the minimum we need to reply usefully; everything else is optional.
        </p>
        <p>
          You can withdraw consent at any time by writing to the address in section 12. Withdrawal
          does not affect anything already done with your consent, and it may mean we can no longer
          progress an open enquiry.
        </p>
        <p data-placeholder="true">
          [LAWFUL BASIS AND CONSENT LANGUAGE TO BE CONFIRMED BY DSI&rsquo;S LEGAL ADVISOR AGAINST THE
          APPLICABLE INDIAN DATA PROTECTION LEGISLATION.]
        </p>
      </>
    ),
  },
  {
    index: '05',
    id: 'cookies',
    title: 'Cookies and site measurement',
    body: (
      <>
        <p>
          Cookies are small files a site stores in your browser. This website uses them only where
          they are needed for a page to work correctly or to keep the site secure.
        </p>
        <p data-placeholder="true">
          [COOKIES, ANALYTICS AND ANY THIRD-PARTY MEASUREMENT TOOLS IN USE AT LAUNCH TO BE LISTED AND
          CONFIRMED BY DSI.]
        </p>
        <p>
          Most browsers let you see, block or delete cookies from their settings. Blocking cookies
          that a page depends on may stop parts of this site working.
        </p>
      </>
    ),
  },
  {
    index: '06',
    id: 'sharing',
    title: 'Sharing and third parties',
    body: (
      <>
        <p>We share personal information only where there is a reason to:</p>
        <Bullets
          items={[
            'Service providers who host this website, deliver our email, or maintain our systems, working under contract and only on our instructions.',
            'Professional advisers — legal, accounting, insurance — where their advice requires it.',
            'Government or statutory authorities, where disclosure is required by law or by a valid order.',
            'A purchaser or successor, if the business or part of it is transferred.',
          ]}
        />
        <p>
          We do not sell personal information. We do not pass enquiry details to other fabricators,
          contractors or advertising networks.
        </p>
        <p data-placeholder="true">
          [NAMED PROCESSORS AND ANY CROSS-BORDER TRANSFER ARRANGEMENTS TO BE CONFIRMED BY DSI.]
        </p>
      </>
    ),
  },
  {
    index: '07',
    id: 'retention',
    title: 'How long we keep it',
    body: (
      <>
        <p>
          Enquiry records are kept while the enquiry is live, and afterwards for as long as we need
          them for contractual, tax and statutory purposes. Project records are kept for the life of
          the structure&rsquo;s documentation requirements.
        </p>
        <p data-placeholder="true">
          [RETENTION PERIODS FOR ENQUIRIES, QUOTATIONS AND JOB APPLICATIONS TO BE SET BY DSI.]
        </p>
        <p>
          Information we no longer need is deleted or anonymised so it can no longer be linked to
          you.
        </p>
      </>
    ),
  },
  {
    index: '08',
    id: 'security',
    title: 'Security',
    body: (
      <>
        <p>
          We take reasonable technical and organisational measures to protect the information you
          send us, and access is limited to the people who need it to do their work.
        </p>
        <p data-placeholder="true">
          [SPECIFIC TECHNICAL AND ORGANISATIONAL SECURITY MEASURES TO BE DESCRIBED BY DSI.]
        </p>
        <p>
          No transmission over the internet is completely secure. Please do not send commercially
          sensitive drawings or documents by email unless we have agreed a route for them.
        </p>
      </>
    ),
  },
  {
    index: '09',
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Subject to applicable law, you may ask us to:</p>
        <Bullets
          items={[
            'Confirm what personal information we hold about you and give you a copy of it.',
            'Correct information that is inaccurate, incomplete or out of date.',
            'Delete information we no longer have a reason to keep.',
            'Stop using your information for a purpose you have withdrawn consent for.',
          ]}
        />
        <p>
          Write to the contact in section 12. We may need to verify who you are before we act on a
          request.
        </p>
        <p data-placeholder="true">
          [RESPONSE TIMEFRAME AND GRIEVANCE ESCALATION PROCEDURE TO BE CONFIRMED BY DSI.]
        </p>
      </>
    ),
  },
  {
    index: '10',
    id: 'children',
    title: 'Children',
    body: (
      <p>
        This website is aimed at businesses and professionals. It is not directed at children, and
        we do not knowingly collect personal information from anyone under 18. If you believe a
        child has sent us information, contact us and we will remove it.
      </p>
    ),
  },
  {
    index: '11',
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy as our systems or the law change. The current version is always
        the one published on this page, and the review date shown at the top of the page tells you
        when it was last checked.
      </p>
    ),
  },
]

const CONTACT_CLAUSE = {
  index: '12',
  id: 'contact',
  title: 'Contact and data requests',
}

const NAV_ITEMS = [...CLAUSES, CONTACT_CLAUSE]

/* -------------------------------------------------------------------------- */

function PrivacyPage() {
  const tel = company.phone.primary.value.replace(/[^+\d]/g, '')

  const contactRows = [
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
      label: 'Postal address',
      value: formattedAddress(),
      href: undefined,
      placeholder: company.address.city.placeholder,
    },
    {
      label: 'Grievance officer',
      value: '[GRIEVANCE OFFICER — NAME AND DESIGNATION]',
      href: undefined,
      placeholder: true,
    },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />

      {/* ================= header band ================= */}
      <section className="relative overflow-hidden bg-charcoal on-dark" aria-label="Privacy policy">
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
                  <span className="text-white/70">Privacy Policy</span>
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
              Privacy Policy
            </Reveal>
          </h1>

          <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal delay={0.22} className="lg:col-span-6">
              <p className="measure text-lead text-white/65">
                What {company.name} does with the information you send through this website, how
                long it is kept, and how to ask for a copy or its removal.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 tech">
                <dt className="text-white/55">Document</dt>
                <dd className="text-white/80">Privacy Policy</dd>
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

      {/* ================= policy ================= */}
      <Section tone="white" space="md" ariaLabel="Privacy policy text">
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
                text below is a working scaffold written to cover the sections a policy of this kind
                normally carries. It is not legal advice and has not been checked against the
                statutes that apply to {company.legalName}.
              </p>
            </aside>
          </Reveal>

          <div className="mt-16 grid gap-x-16 gap-y-14 md:mt-20 lg:grid-cols-12">
            {/* ---- contents ---- */}
            <nav
              aria-label="Contents"
              className="lg:col-span-3 lg:sticky lg:top-28 lg:self-start"
            >
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
      <Section tone="offwhite" space="md" ariaLabel="Contact for data requests">
        <Container>
          <div
            id={CONTACT_CLAUSE.id}
            className="scroll-mt-28 grid gap-12 lg:grid-cols-12 lg:gap-16"
          >
            <div className="lg:col-span-5">
              <Reveal>
                <TechLabel index={CONTACT_CLAUSE.index} rule className="mb-7">
                  Data requests
                </TechLabel>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-display wdth-wide text-display-3 text-charcoal">
                  {CONTACT_CLAUSE.title}
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="measure mt-7 text-body text-muted">
                  Questions about this policy, a request for a copy of what we hold, or a complaint
                  about how information has been handled — send them to the contact below and mark
                  the subject line &ldquo;Data request&rdquo;.
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
                <Link href="/terms" className="text-charcoal underline-offset-4 hover:text-brand">
                  Terms of Use
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

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: "Privacy Policy | DSI" },
      { name: 'description', content: "How Darshan Steel Infrastructure collects, uses, stores and shares the personal information submitted through this website, and how to make a data request." },
      { property: 'og:title', content: "Privacy Policy | DSI" },
      { property: 'og:description', content: "How Darshan Steel Infrastructure collects, uses, stores and shares the personal information submitted through this website, and how to make a data request." },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://darshansteel.in/privacy' }],
  }),
  component: PrivacyPage,
})
