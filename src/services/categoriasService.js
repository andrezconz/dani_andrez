import { supabase } from '../lib/supabaseClient'

export async function getCategorias() {
  const { data, error } = await supabase
    .from('categorias_gasto')
    .select('*')
    .eq('activa', true)
    .order('nombre')

  if (error) throw new Error(`No se pudieron cargar las categorías: ${error.message}`)
  return data
}
