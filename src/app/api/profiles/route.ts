import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../utils/supabase/server'

export async function GET(req: Request) {
  try {
    const { data: profiles, error } = await supabaseServer
      .from('profiles')
      .select('*')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ profiles })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
