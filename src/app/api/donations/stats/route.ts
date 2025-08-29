import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../../utils/supabase/server'

export async function GET() {
  try {
    // Get all campaigns
    const { data: campaigns, error: campaignsError } = await supabaseServer
      .from('campaigns')
      .select('*')

    if (campaignsError) {
      return NextResponse.json({ error: campaignsError.message }, { status: 400 })
    }

    // Get all donations
    const { data: donations, error: donationsError } = await supabaseServer
      .from('donations')
      .select('*')

    if (donationsError) {
      return NextResponse.json({ error: donationsError.message }, { status: 400 })
    }

    // Calculate statistics
    const totalRaised = campaigns.reduce((sum, campaign) => sum + (campaign.current_amount || 0), 0)
    const totalDonors = donations.length
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length
    const averageDonation = totalDonors > 0 ? totalRaised / totalDonors : 0

    // Get top donors
    const topDonors = donations
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10)
      .map(donation => ({
        id: donation.id,
        amount: donation.amount,
        campaign_id: donation.campaign_id,
        user_id: donation.user_id,
        created_at: donation.created_at
      }))

    // Get campaign progress
    const campaignProgress = campaigns.map(campaign => ({
      id: campaign.id,
      title: campaign.title,
      category: campaign.category,
      goal_amount: campaign.goal_amount,
      current_amount: campaign.current_amount,
      status: campaign.status,
      funded_percentage: campaign.goal_amount > 0 
        ? Math.round((campaign.current_amount / campaign.goal_amount) * 100) 
        : 0
    }))

    return NextResponse.json({
      stats: {
        totalRaised,
        totalDonors,
        activeCampaigns,
        averageDonation
      },
      topDonors,
      campaignProgress,
      campaigns: campaigns.length,
      donations: donations.length
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
