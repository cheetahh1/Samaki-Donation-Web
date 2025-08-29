import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../utils/supabase/server'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    let campaignId = url.searchParams.get('campaignId')
    if (!campaignId) return NextResponse.json({ error: 'Missing campaignId' }, { status: 400 })

    // Trim any extra spaces/newlines
    campaignId = campaignId.trim()

    const { data: donations, error } = await supabaseServer
      .from('donations')
      .select('user_id, amount, profiles(name)')
      .eq('campaign_id', campaignId)

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ donations })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}


// ========================
// POST /api/donations
// Create a new donation
// ========================
export async function POST(req: Request) {
  try {
    const { userId, campaignId, amount } = await req.json()
    if (!userId || !campaignId || !amount) 
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    // Verify user exists
    const { data: user, error: userError } = await supabaseServer
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Insert donation
    const { data: donation, error: donationError } = await supabaseServer
      .from('donations')
      .insert({ user_id: userId, campaign_id: campaignId, amount })
      .select()
    if (donationError) return NextResponse.json({ error: donationError.message }, { status: 400 })

    // Get current campaign amount
    const { data: campaignData, error: campaignGetError } = await supabaseServer
      .from('campaigns')
      .select('current_amount')
      .eq('id', campaignId)
      .single()
    if (campaignGetError) return NextResponse.json({ error: campaignGetError.message }, { status: 400 })

    const newAmount = Number(campaignData.current_amount) + Number(amount)

    // Update campaign current_amount
    const { data: updatedCampaign, error: campaignUpdateError } = await supabaseServer
      .from('campaigns')
      .update({ current_amount: newAmount })
      .eq('id', campaignId)
      .select()
    if (campaignUpdateError) return NextResponse.json({ error: campaignUpdateError.message }, { status: 400 })

    return NextResponse.json({
      message: 'Donation successful',
      donation: donation[0],
      campaign: updatedCampaign[0]
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
