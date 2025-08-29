import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../../utils/supabase/server'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { data: authData, error: signUpError } = await supabaseServer.auth.admin.createUser({ 
      email, 
      password,
      email_confirm: true
    })
    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    const { error: profileError } = await supabaseServer
      .from('profiles')
      .insert([{ id: authData.user.id, name, email, role: 'general' }])

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    return NextResponse.json({ 
      message: 'User created successfully', 
      user: authData.user 
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}