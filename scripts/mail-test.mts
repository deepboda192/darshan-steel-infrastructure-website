/**
 * Checks the enquiry e-mail setup without touching the website or the
 * database: logs in to the mail server with the settings from .env.local
 * (or the environment) and sends one test message to ENQUIRY_NOTIFY_TO.
 *
 *   npm run mail:test
 */
import { createTransport, mailSettings } from '../src/lib/enquiry-mail.server.ts'

const settings = mailSettings()
if (!settings) {
  console.error('Missing settings: SMTP_USER, SMTP_PASS and ENQUIRY_NOTIFY_TO must be set in .env.local')
  process.exit(1)
}

console.log(`Server  ${settings.host}:${settings.port}`)
console.log(`Sender  ${settings.user}`)
console.log(`To      ${settings.to}`)

const transport = createTransport(settings)
try {
  await transport.verify()
  console.log('Login   OK')
} catch (error) {
  console.error('Login   FAILED —', error instanceof Error ? error.message.split('\n')[0] : error)
  console.error('For Gmail: SMTP_PASS must be a 16-letter App Password from the sending account, with 2-Step Verification on.')
  process.exit(1)
}

await transport.sendMail({
  from: settings.from,
  to: settings.to,
  subject: 'DSI website — test e-mail',
  text: 'The enquiry notification e-mail is set up correctly. Real enquiries will arrive in this format with the details filled in.',
})
console.log('Sent    a test e-mail; check the inbox.')
