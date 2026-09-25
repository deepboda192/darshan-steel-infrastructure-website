import { createFileRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import Link from '@/components/site/NextLink'
import { supabase } from '@/integrations/supabase/client'
import { Container } from '@/components/site/Container'
import { Logo } from '@/components/layout/Logo'
import { cn } from '@/lib/cn'

const NAV = [
  { label: 'Overview', href: '/admin' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Users', href: '/admin/users' },
]

/**
 * The admin shell: a white header bar with the brand, the section tabs and
 * the way out, over a neutral-1 workspace. Screens render in the outlet
 * once the signed-in account is confirmed to hold the admin role.
 */
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
    <div className="min-h-svh bg-neutral-1 text-neutral-10">
      <header className="border-b border-black/10 bg-white">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-5">
            <div className="flex items-center gap-5">
              <Logo tone="light" height={34} />
              <span aria-hidden="true" className="h-8 w-px bg-black/15 max-xs:hidden" />
              <p className="font-heading text-[16px] font-semibold text-neutral-8 max-xs:hidden">
                Site management
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="m-link">
                View site
              </Link>
              <button type="button" onClick={signOut} className="m-link">
                Sign out
              </button>
            </div>
          </div>

          <nav aria-label="Admin sections" className="-mb-px flex gap-8 overflow-x-auto">
            {NAV.map((item) => {
              const current = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  className={cn(
                    'whitespace-nowrap border-b-2 pb-4 font-heading text-[14px] font-semibold uppercase tracking-[0.5px] transition-colors duration-300',
                    current
                      ? 'border-accent text-neutral-10'
                      : 'border-transparent text-neutral-6 hover:text-neutral-10',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </Container>
      </header>

      <main className="py-12 max-md:py-8">
        <Container>
          {isLoading ? (
            <p role="status" className="text-[15px] text-neutral-6">
              Checking access…
            </p>
          ) : isAdmin ? (
            <Outlet />
          ) : (
            <div className="max-w-[640px] border border-black/10 bg-white p-10 max-xs:p-6">
              <p className="m-subtitle">Access</p>
              <h2 className="mt-4 font-heading text-[28px] font-bold leading-(--lh-sm) text-neutral-10">
                Access not enabled
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-neutral-7">
                Your account is signed in but has not been granted the admin role yet. Ask an
                existing administrator to add it, then reload this page.
              </p>
            </div>
          )}
        </Container>
      </main>
    </div>
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
