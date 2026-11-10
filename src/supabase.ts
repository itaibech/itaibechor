import { createClient } from '@supabase/supabase-js'

// Publishable key: public by design, RLS protects the data (supabase/migrations).
export const supabase = createClient(
  'https://hyeslwlewvvjiyizoduf.supabase.co',
  'sb_publishable_de6tynv8AkIVfS9U5HYxyA_8NMR4tLo',
  // PKCE returns ?code= instead of tokens in the hash, which the #/admin route needs.
  { auth: { flowType: 'pkce' } },
)

export interface Item {
  id: string
  kind: 'habit' | 'favorite'
  title_en: string
  title_he: string
  description_en: string
  description_he: string
  url: string | null
  icon: string
  sort: number
}

export interface Message {
  id: string
  name: string
  email: string
  body: string
  created_at: string
}

export interface Stats {
  views: number
  likes: number
}

export async function fetchItems(): Promise<Item[]> {
  const { data, error } = await supabase.from('items').select('*').order('sort').order('created_at')
  if (error) throw error
  return data as Item[]
}

export async function bump(field: 'views' | 'likes'): Promise<Stats> {
  const { data, error } = await supabase.rpc('bump', { field })
  if (error) throw error
  return data as Stats
}
