import { supabase } from '../lib/supabaseClient'

export async function getFondos() {
  const { data, error } = await supabase.from('fondos').select('*').order('orden')

  if (error) throw new Error(`No se pudieron cargar los fondos: ${error.message}`)
  return data
}

export async function getFondosSaldos() {
  const { data, error } = await supabase.from('fondos_saldos').select('*').order('orden')

  if (error) throw new Error(`No se pudieron calcular los saldos de los fondos: ${error.message}`)
  return data
}
