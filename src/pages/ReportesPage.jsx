import { useReportes } from '../hooks/useReportes'
import { useFondos } from '../hooks/useFondos'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { GastosPorCategoriaChart } from '../components/reportes/GastosPorCategoriaChart'
import { IngresosGastosChart } from '../components/reportes/IngresosGastosChart'
import { EvolucionFondosChart } from '../components/reportes/EvolucionFondosChart'

export function ReportesPage() {
  const { evolucionMensual, gastosPorCategoria, evolucionPorFondo, loading, error, refetch } =
    useReportes(6)
  const { fondos } = useFondos()

  if (loading) return <Spinner label="Generando reportes..." />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Reportes</h1>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <IngresosGastosChart data={evolucionMensual} />
        <GastosPorCategoriaChart data={gastosPorCategoria} />
      </div>

      <EvolucionFondosChart data={evolucionPorFondo} fondos={fondos} />
    </div>
  )
}
