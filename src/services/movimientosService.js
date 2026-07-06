import { supabase } from '../lib/supabaseClient'

const SELECT_CON_RELACIONES = `
  id, fecha, tipo, categoria, descripcion, valor, comprobante_url, created_at,
  persona:personas ( id, nombre, color ),
  fondo:fondos ( id, nombre, tipo )
`

function monthRange(mes) {
  const [year, month] = mes.split('-').map(Number)
  const start = new Date(Date.UTC(year, month - 1, 1))
  const end = new Date(Date.UTC(year, month, 1))
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}

export async function getMovimientos(filters = {}) {
  let query = supabase
    .from('movimientos')
    .select(SELECT_CON_RELACIONES)
    .order('fecha', { ascending: false })
    .order('created_at', { ascending: false })

  if (filters.mes) {
    const { start, end } = monthRange(filters.mes)
    query = query.gte('fecha', start).lt('fecha', end)
  }
  if (filters.personaId) query = query.eq('persona_id', filters.personaId)
  if (filters.tipo) query = query.eq('tipo', filters.tipo)
  if (filters.fondoId) query = query.eq('fondo_id', filters.fondoId)

  const { data, error } = await query

  if (error) throw new Error(`No se pudo cargar el historial de movimientos: ${error.message}`)
  return data
}

export async function createAporte({ fecha, personaId, fondoId, valor, descripcion }) {
  const { data, error } = await supabase
    .from('movimientos')
    .insert({
      tipo: 'aporte',
      fecha,
      persona_id: personaId,
      fondo_id: fondoId,
      valor,
      descripcion,
    })
    .select(SELECT_CON_RELACIONES)
    .single()

  if (error) throw new Error(`No se pudo registrar el aporte: ${error.message}`)
  return data
}

export async function createGasto({ fecha, personaId, fondoId, categoria, valor, descripcion }) {
  const { data, error } = await supabase
    .from('movimientos')
    .insert({
      tipo: 'gasto',
      fecha,
      persona_id: personaId,
      fondo_id: fondoId,
      categoria,
      valor,
      descripcion,
    })
    .select(SELECT_CON_RELACIONES)
    .single()

  if (error) throw new Error(`No se pudo registrar el gasto: ${error.message}`)
  return data
}

export async function deleteMovimiento(id) {
  const { error } = await supabase.from('movimientos').delete().eq('id', id)
  if (error) throw new Error(`No se pudo eliminar el movimiento: ${error.message}`)
}
