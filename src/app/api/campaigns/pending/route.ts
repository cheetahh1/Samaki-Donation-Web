import { NextResponse } from 'next/server'
import { supabaseServer } from '@utils/supabase/server'

export async function GET() {
  const { data, error } = await supabaseServer
    .from('campaigns')
    .select('*')
    .eq('status', 'pending')
    .order('id', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ campaigns: data })
}
