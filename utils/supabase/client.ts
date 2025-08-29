// utils/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
if (!url || !anon) throw new Error('Missing SUPABASE anon env vars')

export const supabase = createClient(url, anon)
