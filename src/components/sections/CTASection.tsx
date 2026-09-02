import { company } from '@/data/company'
import { Button } from '@/components/site/Button'
import { Reveal } from '@/components/animations/Reveal'
import { TechLabel } from '@/components/site/TechLabel'
import { Arrow } from '@/components/site/Arrow'

type CTASectionProps = {
  /** Override the default headline. Use <br/> to control line breaks. */
  title?: React.ReactNode
  lead?: string
  primaryLabel?: string
  primaryHref?: string
}

/**
 * The closing conversion band, used at the foot of every page.
 * Deep charcoal, one blue button, and the direct contact routes beside it so
 * a visitor who would rather phone than fill in a form has the number.
 */
export function CTASection({
  title = (
    <>
      Planning your next
      {' '}<br />
      industrial facility?
    </>
  ),
  lead = "Tell us what you're building. Our team will help you explore the right structural solution.",
  primaryLabel = 'Start Your Project',
  primaryHref = '/contact',
}: CTASectionProps) {
  const tel = company.phone.primary.value.replace(/[^+\d]/g, '')

  return (
    <section className="relative overflow-hidden bg-ink on-dark" aria-label="Contact us">
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 text-white opacity-[0.045]"
      />
      {/* single blue rule marking the top edge of the closing band */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-brand/70" />

      <div className="container-site relative py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <TechLabel rule tone="light" className="mb-8">
                Start a conversation
              </TechLabel>
            </Reveal>

            <h2 className="font-display wdth-wide text-display-2 uppercase text-white">
              <Reveal variant="line" delay={0.08}>
                {title}
              </Reveal>
            </h2>

            <Reveal delay={0.18}>
              <p className="measure mt-8 text-lead text-white/65">{lead}</p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href={primaryHref} size="lg" arrow>
                  {primaryLabel}
                </Button>
                <Button href="/projects" variant="secondary" tone="dark" size="lg">
                  Explore Our Projects
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------------- direct routes ---------------- */}
          <Reveal delay={0.34} className="lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
              {[
                {
                  label: 'Call us',
                  value: company.phone.primary.value,
                  href: `tel:${tel}`,
                  placeholder: company.phone.primary.placeholder,
                },
                {
                  label: 'Email us',
                  value: company.email.enquiries.value,
                  href: `mailto:${company.email.enquiries.value}`,
                  placeholder: company.email.enquiries.placeholder,
                },
                {
                  label: 'Visit us',
                  value: `${company.address.city.value}, ${company.address.state.value}`,
                  href: '/contact',
                  placeholder: company.address.city.placeholder,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between gap-6 py-6 transition-colors hover:text-white"
                >
                  <span>
                    <span className="tech mb-2.5 block text-white/55">{item.label}</span>
                    <span
                      className="block text-white/85 break-all"
                      data-placeholder={item.placeholder}
                    >
                      {item.value}
                    </span>
                  </span>
                  <Arrow
                    angle={-45}
                    className="shrink-0 text-white/55 transition-transform duration-[400ms] ease-[var(--ease-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
