import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'
import { Container } from '@/components/site/Container'

function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

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
      setMessage(result.error.message)
      return
    }

    if (result.data.session) {
      navigate({ to: '/admin' })
    } else {
      setMessage('Check your inbox to confirm your email address, then sign in.')
    }
  }

  return (
    <main className="bg-charcoal py-32 text-white">
      <Container>
        <div className="mx-auto max-w-md">
          <p className="tech text-white/55">Darshan Steel Infrastructure</p>
          <h1 className="mt-4 font-display text-display-3 uppercase">Staff sign in</h1>
          <p className="mt-4 text-small text-white/60">
            Access to the site administration panel is restricted to authorised staff.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            <label className="block">
              <span className="tech text-white/55">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-white/20 bg-transparent px-4 py-3 text-white outline-none focus:border-brand"
              />
            </label>

            <label className="block">
              <span className="tech text-white/55">Password</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-white/20 bg-transparent px-4 py-3 text-white outline-none focus:border-brand"
              />
            </label>

            {message ? <p className="text-small text-brand">{message}</p> : null}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-brand px-6 py-3.5 tech uppercase text-white disabled:opacity-60"
            >
              {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin')
              setMessage(null)
            }}
            className="mt-6 tech text-white/55 underline underline-offset-4 hover:text-white"
          >
            {mode === 'signin' ? 'Create a staff account' : 'I already have an account'}
          </button>
        </div>
      </Container>
    </main>
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
