import { NextResponse } from 'next/server'
import { supabaseServer } from '@utils/supabase/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const campaignId = searchParams.get('campaignId')
  if (!campaignId) return NextResponse.json({ error: 'Missing campaignId' }, { status: 400 })

  const { data, error } = await supabaseServer
    .from('donations')
    .select('user_id, amount')
    .eq('campaign_id', campaignId)
    .order('amount', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ leaderboard: data })
}
