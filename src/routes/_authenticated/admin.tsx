import { createFileRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import Link from '@/components/site/NextLink'
import { supabase } from '@/integrations/supabase/client'
import { Container } from '@/components/site/Container'
import { cn } from '@/lib/cn'

const NAV = [
  { label: 'Overview', href: '/admin' },
  { label: 'Projects', href: '/admin/projects' },
]

function AdminLayout() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ['admin', 'is-admin'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser()
      const uid = userData.user?.id
      if (!uid) return false
      const { data, error } = await supabase.rpc('has_role', { _user_id: uid, _role: 'admin' })
      if (error) return false
      return Boolean(data)
    },
  })

  async function signOut() {
    await supabase.auth.signOut()
    navigate({ to: '/auth' })
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-charcoal/15 pb-6">
          <div>
            <p className="tech text-muted">Admin</p>
            <h1 className="mt-3 font-display text-display-3 uppercase text-charcoal">
              Site management
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="tech text-muted hover:text-charcoal">
              View site
            </Link>
            <button type="button" onClick={signOut} className="tech text-brand hover:underline">
              Sign out
            </button>
          </div>
        </div>

        <nav className="mt-6 flex gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'tech border-b-2 pb-2',
                pathname === item.href
                  ? 'border-brand text-charcoal'
                  : 'border-transparent text-muted hover:text-charcoal',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12">
          {isLoading ? (
            <p className="tech text-muted">Checking access…</p>
          ) : isAdmin ? (
            <Outlet />
          ) : (
            <div className="border border-charcoal/15 p-10">
              <h2 className="font-display text-display-4 uppercase text-charcoal">
                Access not enabled
              </h2>
              <p className="measure mt-4 text-small text-muted">
                Your account is signed in but has not been granted the admin role yet. Ask an
                existing administrator to add it, then reload this page.
              </p>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}

export const Route = createFileRoute('/_authenticated/admin')({
  head: () => ({
    meta: [
      { title: 'Admin — Darshan Steel Infrastructure' },
      { name: 'description', content: 'Manage Darshan Steel Infrastructure website content.' },
      { name: 'robots', content: 'noindex, nofollow' },
      { property: 'og:title', content: 'Admin — Darshan Steel Infrastructure' },
      { property: 'og:description', content: 'Internal content management for the DSI website.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: AdminLayout,
})
