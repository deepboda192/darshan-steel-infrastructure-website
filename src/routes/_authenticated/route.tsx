import { useState } from 'react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated')({
  ssr: false,
  beforeLoad: async () => {
    // Imported here, not at the top: a static import would put the Supabase
    // client into the bundle every public page loads.
    const { supabase } = await import('@/integrations/supabase/client')
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) throw redirect({ to: '/auth' })
    return { user: data.user }
  },
  component: Authenticated,
})

/**
 * The admin screens fetch with react-query; the public pages do not, so the
 * client is created here, inside the admin tree, rather than in the root
 * route where it would be part of the bundle every page downloads.
 */
function Authenticated() {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}
