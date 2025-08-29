// /app/api/campaigns/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../utils/supabase/server'

// ========================
// GET /api/campaigns
// List all campaigns
// ========================
export async function GET() {
  try {
    const { data: campaigns, error } = await supabaseServer
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false }) // latest first

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ campaigns })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// ========================
// POST /api/campaigns
// Create a new campaign (optional, used for fundraising form)
// ========================
export async function POST(req: Request) {
  try {
    const { title, description, goalAmount, userId, category, imageUrl } = await req.json()

    if (!title || !goalAmount || !userId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Verify user exists
    const { data: user, error: userError } = await supabaseServer
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabaseServer
      .from('campaigns')
      .insert({
        title,
        description,
        goal_amount: goalAmount,
        current_amount: 0,
        created_by: userId,
        category: category || 'Well-being',
        status: 'pending',
        image_url: imageUrl || null,
      })
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ message: 'Campaign created', campaigns: data })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
