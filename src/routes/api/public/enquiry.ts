import { createFileRoute } from '@tanstack/react-router'
import type { Database } from '@/integrations/supabase/types'
import { solutions } from '@/data/solutions'

/**
 * ENQUIRY ENDPOINT — POST /api/public/enquiry
 *
 * Receives the contact form payload, validates and sanitises it server-side,
 * then stores it in the database. Nothing from the client is trusted: the
 * browser-side checks in ContactForm exist for the inline messages only.
 */

const MAX = {
  name: 120,
  company: 160,
  phone: 32,
  email: 254,
  projectType: 80,
  location: 160,
  area: 80,
  message: 4000,
  subject: 80,
} as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/

const ALLOWED_PROJECT_TYPES = new Set<string>([...solutions.map((s) => s.title), 'Other'])

const ALLOWED_SUBJECTS = new Set<string>([
  'Request Quote',
  'General Enquiry',
  'Request a Quote',
  'Talk to Our Experts',
  'Vendor Registration',
])

const DEFAULT_SUBJECT = 'Request Quote'

/* Rate limiting — in-process, per instance. Stops casual hammering only. */
const RATE_WINDOW_MS = 60_000
const RATE_MAX_PER_WINDOW = 5
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

function takeRateToken(ip: string): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now()

  if (rateBuckets.size > 500) {
    for (const [key, bucket] of rateBuckets) {
      if (bucket.resetAt <= now) rateBuckets.delete(key)
    }
  }

  const bucket = rateBuckets.get(ip)

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return { ok: true, retryAfterSeconds: 0 }
  }

  bucket.count += 1
  if (bucket.count > RATE_MAX_PER_WINDOW) {
    return { ok: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  return { ok: true, retryAfterSeconds: 0 }
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]
    if (first && first.trim()) return first.trim()
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

const CODE_LINE_FEED = 10
const CODE_SPACE = 32
const CODE_DELETE = 127

function stripControlCharacters(input: string, keepLineFeed: boolean): string {
  let out = ''
  for (const character of input) {
    const code = character.codePointAt(0) ?? 0
    if (code === CODE_LINE_FEED) {
      out += keepLineFeed ? character : ' '
    } else if (code < CODE_SPACE || code === CODE_DELETE) {
      out += ' '
    } else {
      out += character
    }
  }
  return out
}

function cleanLine(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return ''
  return stripControlCharacters(input, false)
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLength)
}

function cleanText(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return ''
  return stripControlCharacters(input, true)
    .replace(/ {2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength)
}

type FieldErrors = Partial<Record<'name' | 'phone' | 'email', string>>

function json(body: unknown, status: number, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  })
}

function badRequest(message: string, fields?: FieldErrors) {
  return json({ ok: false, message, fields }, 400)
}

export const Route = createFileRoute('/api/public/enquiry')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = clientIp(request)

        const limit = takeRateToken(ip)
        if (!limit.ok) {
          return json(
            {
              ok: false,
              message: `Too many enquiries from this connection. Try again in ${limit.retryAfterSeconds} seconds.`,
            },
            429,
            { 'Retry-After': String(limit.retryAfterSeconds) },
          )
        }

        let body: unknown
        try {
          body = await request.json()
        } catch {
          return badRequest('The enquiry could not be read. Please resubmit the form.')
        }

        if (typeof body !== 'object' || body === null || Array.isArray(body)) {
          return badRequest('The enquiry could not be read. Please resubmit the form.')
        }

        const raw = body as Record<string, unknown>

        // Hidden honeypot field — only automated clients fill it.
        if (cleanLine(raw.website, 200).length > 0) {
          return badRequest('The enquiry could not be accepted.')
        }

        const enquiry = {
          name: cleanLine(raw.name, MAX.name),
          company: cleanLine(raw.company, MAX.company),
          phone: cleanLine(raw.phone, MAX.phone),
          email: cleanLine(raw.email, MAX.email).toLowerCase(),
          projectType: cleanLine(raw.projectType, MAX.projectType),
          location: cleanLine(raw.location, MAX.location),
          area: cleanLine(raw.area, MAX.area),
          message: cleanText(raw.message, MAX.message),
          subject: cleanLine(raw.subject, MAX.subject),
        }

        if (!ALLOWED_PROJECT_TYPES.has(enquiry.projectType)) enquiry.projectType = ''
        if (!ALLOWED_SUBJECTS.has(enquiry.subject)) enquiry.subject = DEFAULT_SUBJECT

        const fields: FieldErrors = {}

        if (enquiry.name.length < 2) {
          fields.name = 'Enter the name we should address the reply to.'
        }

        const phoneDigits = enquiry.phone.replace(/\D/g, '')
        if (!enquiry.phone) {
          fields.phone = 'Enter a number we can reach you on.'
        } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
          fields.phone = 'Enter a complete number, including the country or STD code.'
        }

        if (!enquiry.email) {
          fields.email = 'Enter an email address for the written reply.'
        } else if (!EMAIL_RE.test(enquiry.email)) {
          fields.email = 'That address is missing an @ or a domain.'
        }

        if (Object.keys(fields).length > 0) {
          return badRequest('Some required details are missing or incomplete.', fields)
        }

        // Stored by the definer function submit_enquiry (see
        // supabase/migrations/20260926120000_submit_enquiry.sql) with the
        // publishable key, so no service-role secret is needed here.
        const url = process.env['SUPABASE_URL']
        const key = process.env['SUPABASE_PUBLISHABLE_KEY']
        if (!url || !key) {
          console.error('[DSI ENQUIRY] Supabase environment variables are missing')
          return json(
            { ok: false, message: 'The enquiry could not be delivered. Please email us directly.' },
            502,
          )
        }
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient<Database>(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        })

        const { data: storedId, error } = await supabase.rpc('submit_enquiry', {
          _name: enquiry.name,
          _company: enquiry.company || null,
          _phone: enquiry.phone,
          _email: enquiry.email,
          _project_type: enquiry.projectType || null,
          _location: enquiry.location || null,
          _area: enquiry.area || null,
          _message: enquiry.message || null,
          _subject: enquiry.subject,
          _ip: ip,
          _user_agent: cleanLine(request.headers.get('user-agent'), 200) || null,
          _referer: cleanLine(request.headers.get('referer'), 300) || null,
        })

        if (error) {
          console.error('[DSI ENQUIRY] store failed', error.message)
          return json(
            { ok: false, message: 'The enquiry could not be delivered. Please email us directly.' },
            502,
          )
        }

        // Notify DSI by e-mail. The enquiry is already stored, so a mail failure
        // is logged and never shown to the visitor.
        try {
          const { sendEnquiryMail } = await import('@/lib/enquiry-mail.server')
          await sendEnquiryMail({
            id: typeof storedId === 'string' ? storedId : null,
            name: enquiry.name,
            company: enquiry.company,
            phone: enquiry.phone,
            email: enquiry.email,
            projectType: enquiry.projectType,
            location: enquiry.location,
            area: enquiry.area,
            message: enquiry.message,
            subject: enquiry.subject,
            receivedAt: new Date(),
          })
        } catch (mailError) {
          console.error('[DSI ENQUIRY] mail failed', mailError instanceof Error ? mailError.message : mailError)
        }

        return json({ ok: true, message: 'Enquiry received.' }, 200)
      },
    },
  },
})
