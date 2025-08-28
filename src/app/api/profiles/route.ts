import { NextResponse } from 'next/server'
import { supabaseServer } from '@utils/supabase/server'
import { requireAuthById } from '@utils/supabase/middleware'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

  const user = await requireAuthById(userId)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile, error } = await supabaseServer
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ profile })
}
