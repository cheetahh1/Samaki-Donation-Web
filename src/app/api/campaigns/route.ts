import { NextResponse } from 'next/server'
import { supabaseServer } from '@utils/supabase/server'
import { requireAuthById } from '@utils/supabase/middleware'

// ========================
// GET /api/campaigns
// List all campaigns
// ========================
export async function GET() {
  try {
    const { data: campaigns, error } = await supabaseServer
      .from('campaigns')
      .select('*') // removed .order()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ campaigns })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// ========================
// POST /api/campaigns
// Create a new campaign
// ========================
export async function POST(req: Request) {
  try {
    const { title, description, goalAmount, userId } = await req.json()

    if (!title || !goalAmount || !userId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Optional: verify user exists
    const user = await requireAuthById(userId)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabaseServer
      .from('campaigns')
      .insert({
        title,
        description,
        goal_amount: goalAmount,
        created_by: userId,
        status: 'pending', // default
        current_amount: 0
      })
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ message: 'Campaign created', campaigns: data })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
