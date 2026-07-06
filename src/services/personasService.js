import { supabase } from '../lib/supabaseClient'

export async function getPersonas() {
  const { data, error } = await supabase.from('personas').select('*').order('created_at')

  if (error) throw new Error(`No se pudieron cargar las personas: ${error.message}`)
  return data
}
