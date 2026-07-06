import { useCallback } from 'react'
import { getMovimientos } from '../services/movimientosService'
import { useAsyncData } from './useAsyncData'

export function useMovimientos(filters = {}) {
  // Depende de los campos individuales (no del objeto `filters`) para evitar
  // refetch en cada render cuando el llamador pasa un literal `{ ... }` inline.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetcher = useCallback(() => getMovimientos(filters), [
    filters.mes,
    filters.personaId,
    filters.tipo,
    filters.fondoId,
  ])

  const { data, loading, error, refetch } = useAsyncData(fetcher, [fetcher])
  return { movimientos: data ?? [], loading, error, refetch }
}
