import { supabaseServer } from './server'

export type AuthenticatedUser = {
  id: string
  role?: string
}

/**
 * Quick auth using userId (for testing / easy use)
 */
export async function requireAuthById(userId: string): Promise<AuthenticatedUser | null> {
  const { data: profile, error } = await supabaseServer
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || !profile) return null

  return {
    id: userId,
    role: profile.role
  }
}

/**
 * Admin check
 */
export async function requireAdminById(userId: string): Promise<AuthenticatedUser | null> {
  const user = await requireAuthById(userId)
  if (!user || user.role !== 'admin') return null
  return user
}
