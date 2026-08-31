import { createServerFn } from '@tanstack/react-start'
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware'

export type AdminUser = {
  id: string
  email: string
  createdAt: string
  lastSignInAt: string | null
  isAdmin: boolean
}

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc('has_role', {
    _user_id: context.userId,
    _role: 'admin',
  })
  if (error || !data) throw new Error('Admin role required')
}

export const listAdminUsers = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminUser[]> => {
    await assertAdmin(context as any)
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 })
    if (error) throw error

    const { data: roles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('user_id, role')
      .eq('role', 'admin')
    if (rolesError) throw rolesError

    const adminIds = new Set((roles ?? []).map((r) => r.user_id))

    return data.users.map((u) => ({
      id: u.id,
      email: u.email ?? '(no email)',
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at ?? null,
      isAdmin: adminIds.has(u.id),
    }))
  })

export const setAdminRole = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { userId: string; makeAdmin: boolean }) => {
    if (!data || typeof data.userId !== 'string' || typeof data.makeAdmin !== 'boolean') {
      throw new Error('Invalid input')
    }
    return data
  })
  .handler(async ({ context, data }) => {
    await assertAdmin(context as any)
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

    if (data.makeAdmin) {
      const { error } = await supabaseAdmin
        .from('user_roles')
        .upsert({ user_id: data.userId, role: 'admin' }, { onConflict: 'user_id,role' })
      if (error) throw error
    } else {
      if (data.userId === context.userId) {
        throw new Error('You cannot remove your own admin access')
      }
      const { count } = await supabaseAdmin
        .from('user_roles')
        .select('id', { count: 'exact', head: true })
        .eq('role', 'admin')
      if ((count ?? 0) <= 1) throw new Error('At least one administrator is required')

      const { error } = await supabaseAdmin
        .from('user_roles')
        .delete()
        .eq('user_id', data.userId)
        .eq('role', 'admin')
      if (error) throw error
    }

    return { ok: true }
  })
