import { supabase } from '../lib/supabaseClient'

export async function getMovimientosEnRango(desde, hasta) {
  const { data, error } = await supabase
    .from('movimientos')
    .select('id, fecha, tipo, categoria, valor, persona_id, fondo_id')
    .gte('fecha', desde)
    .lt('fecha', hasta)
    .order('fecha')

  if (error) throw new Error(`No se pudieron cargar los datos para el reporte: ${error.message}`)
  return data
}
