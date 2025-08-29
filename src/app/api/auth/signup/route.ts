import { NextResponse } from 'next/server'
import { supabaseServer } from '@utils/supabase/server'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseServer.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })
    if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

    const userId = authData.user?.id
    if (!userId) return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })

    // 2. Insert profile with role 'user'
    const { error: profileError } = await supabaseServer
      .from('profiles')
      .insert({ id: userId, name, email, role: 'user' })

    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 400 })

    return NextResponse.json({ message: 'User created', userId })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
