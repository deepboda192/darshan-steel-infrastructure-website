import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/site/Button'

const LABEL = 'font-heading text-[14px] font-semibold uppercase tracking-[0.5px] text-neutral-8'

/**
 * Staff sign-in — a tool, not a page of the site, so it renders without the
 * marketing chrome: the dark surface, a white card with the brand, the form
 * in the site's field dress and the way to create an account (which only
 * becomes useful once an administrator grants the role).
 */
function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ tone: 'error' | 'info'; text: string } | null>(null)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setMessage(null)

    const result =
      mode === 'signin'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          })

    setBusy(false)

    if (result.error) {
      setMessage({ tone: 'error', text: result.error.message })
      return
    }

    if (result.data.session) {
      navigate({ to: '/admin' })
    } else {
      setMessage({
        tone: 'info',
        text: 'Check your inbox to confirm your email address, then sign in.',
      })
    }
  }

  return (
    <section className="flex min-h-svh items-center justify-center bg-secondary px-4 py-16">
      <div className="w-full max-w-[440px] bg-white p-10 shadow-[0_10px_25px_#0000004d] max-xs:p-6">
        <div>
          <Logo tone="light" height={36} />
        </div>

        <div className="mt-8">
          <p className="m-subtitle">Staff sign in</p>
        </div>
        <h1 className="mt-4 font-heading text-[28px] font-bold leading-(--lh-sm) text-neutral-10">
          {mode === 'signin' ? 'Sign in to manage the site.' : 'Create a staff account.'}
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-neutral-7">
          Access to the site administration panel is restricted to authorised staff.
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="auth-email" className={`${LABEL} mb-2`}>
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={busy}
              placeholder="name@darshansteelinfra.com"
              className="m-field"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="auth-password" className={`${LABEL} mb-2`}>
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={busy}
              placeholder={mode === 'signin' ? 'Your password' : 'At least 6 characters'}
              className="m-field"
            />
          </div>

          {message && (
            <p
              role={message.tone === 'error' ? 'alert' : 'status'}
              className={`flex items-start gap-2 border px-4 py-3 text-[14px] leading-[1.5] ${
                message.tone === 'error'
                  ? 'border-error/40 bg-error/5 text-error'
                  : 'border-accent/40 bg-accent/5 text-neutral-9'
              }`}
            >
              {message.tone === 'error' ? (
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
              ) : (
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
              )}
              <span>{message.text}</span>
            </p>
          )}

          <Button type="submit" disabled={busy} arrow={false} className="w-full justify-center">
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </Button>
        </form>

        <div className="mt-6 border-t border-black/10 pt-5">
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin')
              setMessage(null)
            }}
            className="m-link"
          >
            {mode === 'signin' ? 'Create a staff account' : 'I already have an account'}
          </button>
        </div>
      </div>
    </section>
  )
}

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [
      { title: 'Staff Sign In — Darshan Steel Infrastructure' },
      { name: 'description', content: 'Sign in to manage Darshan Steel Infrastructure website content.' },
      { name: 'robots', content: 'noindex, nofollow' },
      { property: 'og:title', content: 'Staff Sign In — Darshan Steel Infrastructure' },
      { property: 'og:description', content: 'Restricted staff access to the DSI website administration panel.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: AuthPage,
})
