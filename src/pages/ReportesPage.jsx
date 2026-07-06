import { useReportes } from '../hooks/useReportes'
import { useFondos } from '../hooks/useFondos'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { GastosPorCategoriaChart } from '../components/reportes/GastosPorCategoriaChart'
import { IngresosGastosChart } from '../components/reportes/IngresosGastosChart'
import { EvolucionFondosChart } from '../components/reportes/EvolucionFondosChart'
import { AportesPorPersonaChart } from '../components/reportes/AportesPorPersonaChart'

export function ReportesPage() {
  const { evolucionMensual, gastosPorCategoria, evolucionPorFondo, aportesPorPersona, loading, error, refetch } =
    useReportes(6)
  const { fondos } = useFondos()

  if (loading) return <Spinner label="Generando reportes..." />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />

  return (
    <div className="flex flex-col gap-4 pb-6">
      <h1 className="text-xl font-bold text-ink">Reportes</h1>

      <IngresosGastosChart data={evolucionMensual} />
      <GastosPorCategoriaChart data={gastosPorCategoria} />
      <AportesPorPersonaChart data={aportesPorPersona} />
      <EvolucionFondosChart data={evolucionPorFondo} fondos={fondos} />
    </div>
  )
}
