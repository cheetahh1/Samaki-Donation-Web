import { NextResponse } from 'next/server'
import { supabase } from '../../../../../utils/supabase/client'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()
    
    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    if (profile.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied. Not an admin.' }, { status: 401 })
    }

    return NextResponse.json({ 
      message: 'Admin login successful', 
      user: profile 
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
