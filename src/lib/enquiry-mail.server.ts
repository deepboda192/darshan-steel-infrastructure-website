import nodemailer from 'nodemailer'
// Relative, not the @ alias, so scripts/mail-test.mts can run this under plain Node.
import { serverEnv } from './server-env.ts'

/**
 * The notification sent to DSI when the contact form is submitted.
 *
 * Delivery goes through the company's own mail server over SMTP. Every
 * setting is read from the environment (in development, `.env.local` as a
 * fallback — see lib/server-env.ts) — nothing is written into the code:
 *
 *   SMTP_USER            the mailbox that sends — a Gmail address is fine
 *   SMTP_PASS            its App Password (Google refuses the sign-in password);
 *                        spaces in the 16-letter code are ignored
 *   SMTP_HOST            mail server; optional for Gmail (smtp.gmail.com)
 *   SMTP_PORT            465 (SSL) or 587 (STARTTLS); defaults to 465
 *   ENQUIRY_NOTIFY_TO    where enquiries go, e.g. shrey.kanani@darshansteelinfra.com
 *   ENQUIRY_FROM         optional display From; defaults to the sending mailbox
 *
 * When SMTP_HOST, SMTP_USER, SMTP_PASS or ENQUIRY_NOTIFY_TO is missing the
 * function returns false without sending, so the form keeps working and the
 * enquiry is still stored — it just is not e-mailed.
 */

export type EnquiryMail = {
  id?: string | null
  name: string
  company: string
  phone: string
  email: string
  projectType: string
  location: string
  area: string
  message: string
  subject: string
  receivedAt: Date
}

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c)

const dialable = (value: string) => value.replace(/[^+\d]/g, '')

const BRAND = '#03599e'
const DARK = '#141414'

function rows(enquiry: EnquiryMail): { label: string; value: string; html?: string }[] {
  return [
    { label: 'Name', value: enquiry.name },
    { label: 'Company', value: enquiry.company || '—' },
    {
      label: 'Phone',
      value: enquiry.phone,
      html: `<a href="tel:${dialable(enquiry.phone)}" style="color:${BRAND};text-decoration:none">${escape(enquiry.phone)}</a>`,
    },
    {
      label: 'Email',
      value: enquiry.email,
      html: `<a href="mailto:${escape(enquiry.email)}" style="color:${BRAND};text-decoration:none">${escape(enquiry.email)}</a>`,
    },
    { label: 'Project type', value: enquiry.projectType || '—' },
    { label: 'Location', value: enquiry.location || '—' },
    { label: 'Built-up area', value: enquiry.area || '—' },
  ]
}

function renderHtml(enquiry: EnquiryMail): string {
  const when = enquiry.receivedAt.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  })
  const detailRows = rows(enquiry)
    .map(
      (row, i) => `
        <tr>
          <td style="padding:12px 16px;border-top:1px solid #ececec;font:600 12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#606062;width:150px;vertical-align:top;${i === 0 ? 'border-top:0;' : ''}">${escape(row.label)}</td>
          <td style="padding:12px 16px;border-top:1px solid #ececec;font:15px/1.5 Arial,Helvetica,sans-serif;color:${DARK};vertical-align:top;${i === 0 ? 'border-top:0;' : ''}">${row.html ?? escape(row.value)}</td>
        </tr>`,
    )
    .join('')
  const message = enquiry.message
    ? escape(enquiry.message).replace(/\n/g, '<br>')
    : '<span style="color:#8e8e8f">No message left.</span>'

  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f5f5f5">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f5f5;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e6e6e6">
        <tr>
          <td style="background:${DARK};padding:22px 28px">
            <div style="font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:#ffffff;border-left:4px solid ${BRAND};padding-left:10px">Darshan Steel Infrastructure</div>
            <div style="margin-top:14px;font:700 22px/1.25 Arial,Helvetica,sans-serif;color:#ffffff">New enquiry: ${escape(enquiry.subject)}</div>
            <div style="margin-top:6px;font:13px/1.4 Arial,Helvetica,sans-serif;color:#d2d2d2">Received ${escape(when)} IST via darshansteelinfra.com</div>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px 0">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${detailRows}</table>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 28px 24px">
            <div style="font:600 12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#606062">Message</div>
            <div style="margin-top:8px;padding:14px 16px;background:#f5f5f5;font:15px/1.6 Arial,Helvetica,sans-serif;color:${DARK}">${message}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 26px">
            <a href="mailto:${escape(enquiry.email)}?subject=${encodeURIComponent(`Re: ${enquiry.subject} — Darshan Steel Infrastructure`)}" style="display:inline-block;background:${BRAND};color:#ffffff;font:700 13px/1 Arial,Helvetica,sans-serif;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;padding:14px 20px;border-radius:2px">Reply to ${escape(enquiry.name)}</a>
            <span style="display:inline-block;margin-left:14px;font:13px/1.4 Arial,Helvetica,sans-serif;color:#606062">or open the admin panel → Enquiries</span>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 28px;border-top:1px solid #ececec;font:12px/1.5 Arial,Helvetica,sans-serif;color:#8e8e8f">
            Sent automatically by the DSI website${enquiry.id ? ` · Enquiry ${escape(enquiry.id)}` : ''}. Replying to this e-mail replies to the visitor.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function renderText(enquiry: EnquiryMail): string {
  const lines = rows(enquiry).map((row) => `${row.label}: ${row.value}`)
  return [
    `New enquiry: ${enquiry.subject}`,
    `Received ${enquiry.receivedAt.toISOString()} via darshansteelinfra.com`,
    '',
    ...lines,
    '',
    'Message:',
    enquiry.message || 'No message left.',
    '',
    enquiry.id ? `Enquiry ${enquiry.id}` : '',
  ]
    .join('\n')
    .trim()
}

export type MailSettings = { host: string; port: number; user: string; pass: string; to: string; from: string }

/**
 * The SMTP settings, or null when the essentials are missing. A Gmail or
 * Google Workspace sender needs no SMTP_HOST: smtp.gmail.com is assumed.
 * Google accepts only an App Password here, never the sign-in password.
 */
export function mailSettings(): MailSettings | null {
  const user = serverEnv('SMTP_USER')?.trim()
  const pass = serverEnv('SMTP_PASS')?.replace(/s+/g, '')
  const to = serverEnv('ENQUIRY_NOTIFY_TO')?.trim()
  if (!user || !pass || !to) return null
  const googleSender = /@(gmail.com|googlemail.com)$/i.test(user)
  const host = serverEnv('SMTP_HOST')?.trim() || (googleSender ? 'smtp.gmail.com' : '')
  if (!host) return null
  const port = Number(serverEnv('SMTP_PORT') ?? 465)
  const from = serverEnv('ENQUIRY_FROM')?.trim() || `Darshan Steel Infrastructure <${user}>`
  return { host, port, user, pass, to, from }
}

export function createTransport(settings: MailSettings) {
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.port === 465,
    auth: { user: settings.user, pass: settings.pass },
  })
}

/** Sends the notification; resolves true when it was handed to the mail server. */
export async function sendEnquiryMail(enquiry: EnquiryMail): Promise<boolean> {
  const settings = mailSettings()
  if (!settings) {
    console.warn('[DSI ENQUIRY] mail not sent: SMTP_USER, SMTP_PASS or ENQUIRY_NOTIFY_TO is not set')
    return false
  }
  const { user, to, from } = settings
  const transport = createTransport(settings)

  await transport.sendMail({
    from,
    to,
    replyTo: `${enquiry.name} <${enquiry.email}>`,
    subject: `New enquiry — ${enquiry.subject} — ${enquiry.name}${enquiry.company ? `, ${enquiry.company}` : ''}`,
    text: renderText(enquiry),
    html: renderHtml(enquiry),
  })
  return true
}
