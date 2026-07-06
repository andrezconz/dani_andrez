import { useMemo } from 'react'
import { getFondosSaldos } from '../services/fondosService'
import { useAsyncData } from './useAsyncData'

export function useFondos() {
  const { data, loading, error, refetch } = useAsyncData(getFondosSaldos, [])

  const fondos = useMemo(
    () => (data ?? []).map((fondo) => ({ ...fondo, id: fondo.fondo_id })),
    [data],
  )

  return { fondos, loading, error, refetch }
}
