import { getCategorias } from '../services/categoriasService'
import { useAsyncData } from './useAsyncData'

export function useCategorias() {
  const { data, loading, error, refetch } = useAsyncData(getCategorias, [])
  return { categorias: data ?? [], loading, error, refetch }
}
