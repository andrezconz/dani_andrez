import { useCallback, useMemo } from 'react'
import { eachMonthOfInterval, endOfMonth, format, startOfMonth, subMonths } from 'date-fns'
import { es } from 'date-fns/locale'
import { TIPO_MOVIMIENTO, getFondoDisplay, getPersonaDisplay } from '../constants'
import { getMovimientosEnRango } from '../services/reportesService'
import { useAsyncData } from './useAsyncData'
import { useFondos } from './useFondos'
import { useCategorias } from './useCategorias'
import { usePersonas } from './usePersonas'

export function useReportes(mesesAtras = 6) {
  const { fondos } = useFondos()
  const { categorias } = useCategorias()
  const { personas } = usePersonas()

  const rango = useMemo(() => {
    const hoy = new Date()
    const desde = startOfMonth(subMonths(hoy, mesesAtras - 1))
    const hasta = endOfMonth(hoy)
    return {
      desdeISO: format(desde, 'yyyy-MM-dd'),
      hastaISO: format(hasta, 'yyyy-MM-dd'),
      meses: eachMonthOfInterval({ start: desde, end: hoy }),
    }
  }, [mesesAtras])

  const fetcher = useCallback(
    () => getMovimientosEnRango(rango.desdeISO, rango.hastaISO),
    [rango.desdeISO, rango.hastaISO],
  )

  const { data: movimientos, loading, error, refetch } = useAsyncData(fetcher, [fetcher])

  const evolucionMensual = useMemo(() => {
    if (!movimientos) return []
    return rango.meses.map((mesDate) => {
      const mesKey = format(mesDate, 'yyyy-MM')
      const delMes = movimientos.filter((mov) => mov.fecha.startsWith(mesKey))
      const ingresos = delMes
        .filter((m) => m.tipo === TIPO_MOVIMIENTO.APORTE)
        .reduce((sum, m) => sum + Number(m.valor), 0)
      const gastos = delMes
        .filter((m) => m.tipo === TIPO_MOVIMIENTO.GASTO)
        .reduce((sum, m) => sum + Number(m.valor), 0)
      return {
        mes: format(mesDate, 'MMM yyyy', { locale: es }),
        ingresos,
        gastos,
      }
    })
  }, [movimientos, rango.meses])

  const gastosPorCategoria = useMemo(() => {
    if (!movimientos) return []
    const mesActualKey = format(new Date(), 'yyyy-MM')
    const gastosDelMes = movimientos.filter(
      (m) => m.tipo === TIPO_MOVIMIENTO.GASTO && m.fecha.startsWith(mesActualKey),
    )
    const totales = new Map()
    for (const mov of gastosDelMes) {
      const key = mov.categoria || 'Sin categoría'
      totales.set(key, (totales.get(key) || 0) + Number(mov.valor))
    }
    return Array.from(totales.entries())
      .map(([categoria, valor]) => ({ categoria, valor }))
      .sort((a, b) => b.valor - a.valor)
  }, [movimientos])

  const evolucionPorFondo = useMemo(() => {
    if (!movimientos) return []
    const saldosPorFondo = new Map(fondos.map((f) => [f.fondo_id, 0]))
    return rango.meses.map((mesDate) => {
      const mesKey = format(mesDate, 'yyyy-MM')
      const delMes = movimientos.filter((mov) => mov.fecha.startsWith(mesKey))
      for (const mov of delMes) {
        const signo = mov.tipo === TIPO_MOVIMIENTO.APORTE ? 1 : -1
        saldosPorFondo.set(
          mov.fondo_id,
          (saldosPorFondo.get(mov.fondo_id) || 0) + signo * Number(mov.valor),
        )
      }
      const punto = { mes: format(mesDate, 'MMM yyyy', { locale: es }) }
      for (const fondo of fondos) {
        punto[getFondoDisplay(fondo).nombre] = saldosPorFondo.get(fondo.fondo_id) || 0
      }
      return punto
    })
  }, [movimientos, fondos, rango.meses])

  const aportesPorPersona = useMemo(() => {
    if (!movimientos) return []
    const totales = new Map()
    for (const mov of movimientos) {
      if (mov.tipo !== TIPO_MOVIMIENTO.APORTE) continue
      totales.set(mov.persona_id, (totales.get(mov.persona_id) || 0) + Number(mov.valor))
    }
    return personas.map((persona) => ({
      persona: `${getPersonaDisplay(persona).avatar} ${getPersonaDisplay(persona).nombre}`,
      valor: totales.get(persona.id) || 0,
    }))
  }, [movimientos, personas])

  return {
    evolucionMensual,
    gastosPorCategoria,
    evolucionPorFondo,
    aportesPorPersona,
    categorias,
    loading,
    error,
    refetch,
  }
}
