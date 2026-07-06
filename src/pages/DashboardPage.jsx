import { useDashboard } from '../hooks/useDashboard'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { SaldoTotalCard } from '../components/dashboard/SaldoTotalCard'
import { FondoCard } from '../components/dashboard/FondoCard'
import { ResumenMesCard } from '../components/dashboard/ResumenMesCard'
import { UltimosMovimientos } from '../components/dashboard/UltimosMovimientos'

export function DashboardPage() {
  const {
    fondos,
    saldoTotal,
    ingresosMes,
    gastosMes,
    ultimosMovimientos,
    mesActual,
    loading,
    error,
    refetch,
  } = useDashboard()

  if (loading) return <Spinner label="Cargando dashboard..." />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SaldoTotalCard saldoTotal={saldoTotal} />
        {fondos.map((fondo) => (
          <FondoCard key={fondo.id} fondo={fondo} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ResumenMesCard mesActual={mesActual} ingresosMes={ingresosMes} gastosMes={gastosMes} />
        <UltimosMovimientos movimientos={ultimosMovimientos} />
      </div>
    </div>
  )
}
