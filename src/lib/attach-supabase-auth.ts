import { createMiddleware } from '@tanstack/react-start'

/**
 * Attaches the signed-in staff member's bearer token to server-function calls,
 * like the generated integrations/supabase/auth-attacher, but without putting
 * the Supabase client into every page's bundle: the client is imported only
 * when this browser holds a stored session, which only happens after a
 * sign-in at /auth. Public visitors never pay for it.
 */
const hasStoredSession = () => {
  try {
    return Object.keys(localStorage).some((key) => key.startsWith('sb-') && key.endsWith('-auth-token'))
  } catch {
    return false
  }
}

export const attachSupabaseAuth = createMiddleware({ type: 'function' }).client(async ({ next }) => {
  if (typeof window === 'undefined' || !hasStoredSession()) return next()
  const { supabase } = await import('@/integrations/supabase/client')
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} })
})
