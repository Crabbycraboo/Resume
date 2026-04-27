
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '[Supabase] VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in your .env file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Profile ────────────────────────────────────────────────────────
export async function fetchProfile() {
  const { data, error } = await supabase.from('profile').select('*').single()
  if (error) throw error
  return data
}

// ── Niches ─────────────────────────────────────────────────────────
export async function fetchNiches() {
  const { data, error } = await supabase
    .from('niches')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

// ── Projects — all rows, joined with niche slug ────────────────────
export async function fetchAllProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

// ── Certificates — all rows ────────────────────────────────────────
export async function fetchAllCertificates() {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('date_issued', { ascending: false })
  if (error) throw error
  return data
}
