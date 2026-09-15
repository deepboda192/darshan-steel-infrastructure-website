import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react'
import { useSearchParams } from '@/lib/next-navigation'
import { company } from '@/data/company'
import { solutions } from '@/data/solutions'
import { Button } from '@/components/site/Button'
import { cn } from '@/lib/cn'

/* -------------------------------------------------------------------------- */
/* Configuration                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Where the enquiry is posted. Set VITE_ENQUIRY_ENDPOINT to hand the
 * submission to a CRM or form service instead of the built-in route handler.
 */
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT || '/api/public/enquiry'

/** Project types come from the solutions data so the two never drift apart. */
const PROJECT_TYPES: string[] = [...solutions.map((s) => s.title), 'Other']

const DEFAULT_SUBJECT = 'General Enquiry'

const MESSAGE_MAX = 4000

/** `?intent=` presets the subject line and the note above the fields. */
const INTENTS = {
  quote: {
    subject: 'Request a Quote',
    note: 'Span, length, eave height and site location are enough for a first pass. Drawings help but are not required.',
  },
  consult: {
    subject: 'Talk to Our Experts',
    note: 'Describe what the building has to do. The framing approach is worked back from the operation inside it.',
  },
  vendor: {
    subject: 'Vendor Registration',
    note: 'Use the message field to list what you supply — material, consumables or services — and where you are based.',
  },
} as const

type IntentKey = keyof typeof INTENTS

const isIntent = (value: string | null): value is IntentKey =>
  value !== null && Object.prototype.hasOwnProperty.call(INTENTS, value)

/* -------------------------------------------------------------------------- */
/* Field model                                                                 */
/* -------------------------------------------------------------------------- */

type FieldName =
  | 'name'
  | 'company'
  | 'phone'
  | 'email'
  | 'projectType'
  | 'location'
  | 'area'
  | 'message'

type FormValues = Record<FieldName, string>

const EMPTY: FormValues = {
  name: '',
  company: '',
  phone: '',
  email: '',
  projectType: '',
  location: '',
  area: '',
  message: '',
}

/** Error-summary order — matches the visual order of the fields. */
const FIELD_ORDER: FieldName[] = [
  'name',
  'company',
  'phone',
  'email',
  'projectType',
  'location',
  'area',
  'message',
]

const LABELS: Record<FieldName, string> = {
  name: 'Name',
  company: 'Company',
  phone: 'Phone',
  email: 'Email',
  projectType: 'Project type',
  location: 'Location',
  area: 'Approx. built-up area',
  message: 'Message',
}

const fid = (name: FieldName) => `enq-${name}`

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/

function validate(values: FormValues): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Enter the name we should address the reply to.'
  }

  const digits = values.phone.replace(/\D/g, '')
  if (!values.phone.trim()) {
    errors.phone = 'Enter a number we can reach you on.'
  } else if (digits.length < 8 || digits.length > 15) {
    errors.phone = 'Enter a complete number, including the country or STD code.'
  }

  if (!values.email.trim()) {
    errors.email = 'Enter an email address for the written reply.'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'That address is missing an @ or a domain.'
  }

  if (values.message.length > MESSAGE_MAX) {
    errors.message = `Keep the message under ${MESSAGE_MAX} characters.`
  }

  return errors
}

/* -------------------------------------------------------------------------- */
/* Field shell                                                                 */
/* -------------------------------------------------------------------------- */

type FieldShellProps = {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  /** Right-aligned slot beside the label — used for the message counter. */
  meta?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Label, control slot, hint and inline error — one rhythm for every field.
 * Only required fields carry a mark; an "optional" tag on every other label
 * was more noise than signal, so the rule is stated once above the form.
 */
function FieldShell({ id, label, required, error, hint, meta, children, className }: FieldShellProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-small font-medium text-charcoal">
          {label}
          {required && (
            <>
              <span aria-hidden="true" className="ml-1 text-brand">
                *
              </span>
              <span className="sr-only">(required)</span>
            </>
          )}
        </label>
        {meta}
      </div>

      {children}

      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-caption leading-relaxed text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-caption leading-relaxed text-error"
        >
          <AlertCircle aria-hidden="true" className="mt-[3px] h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

/**
 * Boxed control. A quiet hairline at rest, darker on hover, brand blue with a
 * soft halo on focus; invalid fields swap to the error colour so they never
 * read as "focused".
 */
function controlClass(invalid: boolean, extra?: string) {
  return cn(
    'w-full rounded-md border bg-white px-4 py-3 text-body text-charcoal placeholder:text-muted/70',
    'transition-[border-color,box-shadow,background-color] duration-200 ease-[var(--ease-power)]',
    'focus:outline-none focus-visible:outline-none focus:ring-[3px]',
    invalid
      ? 'border-error bg-error-tint/50 focus:border-error focus:ring-error/15'
      : 'border-charcoal/15 hover:border-charcoal/35 focus:border-brand focus:ring-brand/15',
    'disabled:cursor-not-allowed disabled:opacity-50',
    extra,
  )
}

/* -------------------------------------------------------------------------- */
/* Form                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * The enquiry form.
 *
 * Uses `useSearchParams`, so every page that renders it must wrap it in a
 * <Suspense> boundary. Validation runs client-side for the inline messages and
 * again server-side in routes/api/public/enquiry.ts — the client check is a
 * courtesy, not a gate.
 */
export function ContactForm() {
  const searchParams = useSearchParams()
  const intentParam = searchParams.get('intent')
  const intent = isIntent(intentParam) ? INTENTS[intentParam] : null
  const subject = intent?.subject ?? DEFAULT_SUBJECT

  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  /** Spam trap. A real person never sees this field, so anything in it is a bot. */
  const [website, setWebsite] = useState('')

  const summaryRef = useRef<HTMLDivElement>(null)

  const errorList = useMemo(
    () =>
      FIELD_ORDER.filter((name) => errors[name]).map(
        (name) => [name, errors[name] as string] as const,
      ),
    [errors],
  )

  const submitting = status === 'submitting'

  function update(name: FieldName) {
    return (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const next = event.target.value
      setValues((prev) => ({ ...prev, [name]: next }))
      setErrors((prev) => {
        if (!prev[name]) return prev
        const rest = { ...prev }
        delete rest[name]
        return rest
      })
    }
  }

  function describedBy(name: FieldName, hasHint = false) {
    const ids: string[] = []
    if (errors[name]) ids.push(`${fid(name)}-error`)
    else if (hasHint) ids.push(`${fid(name)}-hint`)
    return ids.length > 0 ? ids.join(' ') : undefined
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    setSubmitError('')
    const found = validate(values)
    setErrors(found)

    const firstInvalid = FIELD_ORDER.find((name) => found[name])
    if (firstInvalid) {
      setStatus('idle')
      // Announce the summary first, then hand focus to the offending control.
      requestAnimationFrame(() => {
        summaryRef.current?.focus()
        document.getElementById(fid(firstInvalid))?.scrollIntoView({ block: 'center' })
      })
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, subject, website }),
      })

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null

      if (!response.ok || payload?.ok === false) {
        throw new Error(payload?.message || 'The enquiry could not be delivered.')
      }

      setStatus('success')
    } catch (error) {
      setStatus('error')
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : 'The enquiry could not be delivered.',
      )
    }
  }

  function reset() {
    setValues(EMPTY)
    setErrors({})
    setWebsite('')
    setSubmitError('')
    setStatus('idle')
  }

  const card =
    'rounded-lg border border-charcoal/10 bg-white p-6 shadow-[0_12px_48px_-20px_rgba(38,35,36,0.22)] sm:p-8 lg:p-10'

  /* ---------------------------------------------------------------- success */

  if (status === 'success') {
    return (
      <div role="status" className={card}>
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
            <CheckCircle2 aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div>
            <p className="tech text-brand">Enquiry received</p>
            <h3 className="font-display wdth-wide mt-2 text-display-4 text-charcoal">
              Thank you — we have your brief.
            </h3>
            {/* Deliberately states only what is true at submit time. Delivery is
                wired in routes/api/public/enquiry.ts — see the TODO block there. */}
            <p className="measure mt-3 text-body text-muted">
              Your enquiry has been submitted. An engineer will review it and reply on the
              phone number or email address you gave us.
            </p>
          </div>
        </div>

        <ol className="mt-8 grid gap-4 border-t border-charcoal/10 pt-8 sm:grid-cols-3">
          {[
            {
              index: '01',
              title: 'Review',
              note: 'An engineer reads the brief and notes what the structure still depends on.',
            },
            {
              index: '02',
              title: 'Clarify',
              note: 'We come back with the questions that change the framing — span, loads, programme.',
            },
            {
              index: '03',
              title: 'Respond',
              note: 'Once the scope is settled, a structural approach and a quotation follow.',
            },
          ].map((step) => (
            <li key={step.index} className="rounded-md bg-offwhite p-5">
              <span className="tabular tech text-brand">{step.index}</span>
              <span className="mt-2 block text-body font-medium text-charcoal">{step.title}</span>
              <span className="mt-1 block text-small text-muted">{step.note}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="secondary" onClick={reset}>
            Send another enquiry
          </Button>
          <Button href="/projects" variant="ghost" arrow>
            Look at the work
          </Button>
        </div>
      </div>
    )
  }

  /* ------------------------------------------------------------------- form */

  const messageLength = values.message.length

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="enq-subject" className={card}>
      {/* ---------------- heading ---------------- */}
      <div className="mb-8 border-b border-charcoal/10 pb-6">
        <h3 id="enq-subject" className="font-display wdth-wide text-display-4 text-charcoal">
          {subject}
        </h3>
        <p className="mt-3 text-body text-muted">
          {intent?.note ?? (
            <>
              Fields marked <span className="text-brand">*</span> are required. Everything else
              helps us give a sharper first answer.
            </>
          )}
        </p>
      </div>

      {/* ---------------- error summary ---------------- */}
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 flex gap-3 rounded-md border border-error/25 bg-error-tint px-5 py-4"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-error" strokeWidth={1.75} />
          <div>
            <p className="text-small font-medium text-charcoal">
              {errorList.length === 1
                ? 'One field needs attention'
                : `${errorList.length} fields need attention`}
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {errorList.map(([name, message]) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => document.getElementById(fid(name))?.focus()}
                    className="text-left text-small text-charcoal/80 underline decoration-error/40 underline-offset-4 transition-colors hover:text-error hover:decoration-error"
                  >
                    {LABELS[name]} — {message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ---------------- fields ---------------- */}
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <FieldShell id={fid('name')} label="Name" required error={errors.name}>
          <input
            id={fid('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            value={values.name}
            onChange={update('name')}
            disabled={submitting}
            placeholder="Full name"
            className={controlClass(Boolean(errors.name))}
          />
        </FieldShell>

        <FieldShell id={fid('company')} label="Company" error={errors.company}>
          <input
            id={fid('company')}
            name="company"
            type="text"
            autoComplete="organization"
            aria-describedby={describedBy('company')}
            value={values.company}
            onChange={update('company')}
            disabled={submitting}
            placeholder="Organisation name"
            className={controlClass(false)}
          />
        </FieldShell>

        <FieldShell id={fid('phone')} label="Phone" required error={errors.phone}>
          <input
            id={fid('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy('phone')}
            value={values.phone}
            onChange={update('phone')}
            disabled={submitting}
            placeholder="+91 98765 43210"
            className={controlClass(Boolean(errors.phone))}
          />
        </FieldShell>

        <FieldShell id={fid('email')} label="Email" required error={errors.email}>
          <input
            id={fid('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
            value={values.email}
            onChange={update('email')}
            disabled={submitting}
            placeholder="name@company.com"
            className={controlClass(Boolean(errors.email))}
          />
        </FieldShell>
        <FieldShell
          id={fid('projectType')}
          label="Project type"
          error={errors.projectType}
          className="sm:col-span-2"
        >
          <div className="relative">
            <select
              id={fid('projectType')}
              name="projectType"
              aria-describedby={describedBy('projectType')}
              value={values.projectType}
              onChange={update('projectType')}
              disabled={submitting}
              className={controlClass(
                false,
                cn('appearance-none pr-11', values.projectType === '' && 'text-muted/70'),
              )}
            >
              <option value="">Select a building type</option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/60"
              strokeWidth={2}
            />
          </div>
        </FieldShell>

        <FieldShell
          id={fid('location')}
          label="Location"
          error={errors.location}
          hint="City or district where the building will stand."
        >
          <input
            id={fid('location')}
            name="location"
            type="text"
            autoComplete="address-level2"
            aria-describedby={describedBy('location', true)}
            value={values.location}
            onChange={update('location')}
            disabled={submitting}
            placeholder="Site city / district"
            className={controlClass(false)}
          />
        </FieldShell>

        <FieldShell
          id={fid('area')}
          label="Approx. built-up area"
          error={errors.area}
          hint="Sq. ft. or sq. m — an estimate is fine."
        >
          <input
            id={fid('area')}
            name="area"
            type="text"
            inputMode="numeric"
            aria-describedby={describedBy('area', true)}
            value={values.area}
            onChange={update('area')}
            disabled={submitting}
            placeholder="e.g. 40,000 sq. ft."
            className={controlClass(false)}
          />
        </FieldShell>

        <FieldShell
          id={fid('message')}
          label="Message"
          error={errors.message}
          className="sm:col-span-2"
          hint="Span, eave height, crane duty, programme — whatever you already know."
          meta={
            <span
              aria-live="polite"
              className={cn(
                'tabular text-caption',
                messageLength > MESSAGE_MAX ? 'text-error' : 'text-muted',
              )}
            >
              {messageLength.toLocaleString('en-IN')} / {MESSAGE_MAX.toLocaleString('en-IN')}
            </span>
          }
        >
          <textarea
            id={fid('message')}
            name="message"
            rows={5}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy('message', true)}
            value={values.message}
            onChange={update('message')}
            disabled={submitting}
            placeholder="Tell us about the structure and what it has to carry."
            className={controlClass(Boolean(errors.message), 'min-h-[8.5rem] resize-y')}
          />
        </FieldShell>
      </div>

      {/* ---------------- honeypot: hidden from people, visible to bots ------- */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="enq-website">Website</label>
        <input
          id="enq-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {/* ---------------- submit ---------------- */}
      <div className="mt-10 border-t border-charcoal/10 pt-8">
        <Button
          type="submit"
          size="lg"
          arrow
          disabled={submitting}
          className="w-full sm:w-auto"
        >
          {submitting ? 'Sending…' : 'Send Enquiry'}
        </Button>
      </div>

      {/* ---------------- delivery failure ---------------- */}
      {status === 'error' && (
        <div
          role="alert"
          className="mt-6 flex gap-3 rounded-md border border-error/25 bg-error-tint px-5 py-4"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-error" strokeWidth={1.75} />
          <div>
            <p className="text-small font-medium text-charcoal">Not sent</p>
            <p className="mt-1 text-small text-muted">
              {submitError} Try again in a moment, or write to us directly at{' '}
              <a
                href={`mailto:${company.email.enquiries.value}`}
                data-placeholder={company.email.enquiries.placeholder}
                className="break-all text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors hover:decoration-brand"
              >
                {company.email.enquiries.value}
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </form>
  )
}
