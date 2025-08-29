import { NextResponse } from 'next/server'
import { supabaseServer } from '@utils/supabase/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { data, error } = await supabaseServer.auth.signInWithPassword({ email, password })
    if (error || !data.user) return NextResponse.json({ error: error?.message || 'Login failed' }, { status: 400 })

    return NextResponse.json({ message: 'Login successful', userId: data.user.id })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
