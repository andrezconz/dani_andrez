import { getPersonas } from '../services/personasService'
import { useAsyncData } from './useAsyncData'

export function usePersonas() {
  const { data, loading, error, refetch } = useAsyncData(getPersonas, [])
  return { personas: data ?? [], loading, error, refetch }
}
