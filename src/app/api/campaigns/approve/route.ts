import { NextResponse } from 'next/server'
import { supabaseServer } from '@utils/supabase/server'
import { requireAdminById } from '@utils/supabase/middleware'

export async function POST(req: Request) {
  try {
    const { campaignId, adminUserId } = await req.json()
    if (!campaignId || !adminUserId) 
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    // Check admin
    const admin = await requireAdminById(adminUserId)
    if (!admin) 
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Update campaign and return updated row
    const { data, error } = await supabaseServer
      .from('campaigns')
      .update({ status: 'active', approved_by: adminUserId })
      .eq('id', campaignId)
      .select() // important! returns the updated row

    if (error) 
      return NextResponse.json({ error: error.message }, { status: 400 })

    if (!data || data.length === 0)
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })

    return NextResponse.json({ message: 'Campaign approved', campaign: data[0] })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
