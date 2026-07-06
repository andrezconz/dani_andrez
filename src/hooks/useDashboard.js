import { useMemo } from 'react'
import { format } from 'date-fns'
import { TIPO_MOVIMIENTO } from '../constants'
import { useFondos } from './useFondos'
import { useMovimientos } from './useMovimientos'

export function useDashboard() {
  const mesActual = useMemo(() => format(new Date(), 'yyyy-MM'), [])

  const {
    fondos,
    loading: loadingFondos,
    error: errorFondos,
    refetch: refetchFondos,
  } = useFondos()

  const {
    movimientos: movimientosDelMes,
    loading: loadingMovimientos,
    error: errorMovimientos,
    refetch: refetchMovimientos,
  } = useMovimientos({ mes: mesActual })

  const saldoTotal = useMemo(
    () => fondos.reduce((total, fondo) => total + Number(fondo.saldo), 0),
    [fondos],
  )

  const { ingresosMes, gastosMes } = useMemo(() => {
    return movimientosDelMes.reduce(
      (acc, mov) => {
        if (mov.tipo === TIPO_MOVIMIENTO.APORTE) acc.ingresosMes += Number(mov.valor)
        else acc.gastosMes += Number(mov.valor)
        return acc
      },
      { ingresosMes: 0, gastosMes: 0 },
    )
  }, [movimientosDelMes])

  const ultimosMovimientos = useMemo(() => movimientosDelMes.slice(0, 5), [movimientosDelMes])

  const refetch = () => {
    refetchFondos()
    refetchMovimientos()
  }

  return {
    fondos,
    saldoTotal,
    ingresosMes,
    gastosMes,
    ultimosMovimientos,
    mesActual,
    loading: loadingFondos || loadingMovimientos,
    error: errorFondos || errorMovimientos,
    refetch,
  }
}
