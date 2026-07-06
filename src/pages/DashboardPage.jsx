import { useDashboard } from '../hooks/useDashboard'
import { Spinner } from '../components/ui/Spinner'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { EmptyState } from '../components/ui/EmptyState'
import { GreetingCard } from '../components/dashboard/GreetingCard'
import { QuoteCard } from '../components/dashboard/QuoteCard'
import { BalanceCard } from '../components/dashboard/BalanceCard'
import { FundCard } from '../components/dashboard/FundCard'
import { TransferCard } from '../components/dashboard/TransferCard'
import { TransactionCard } from '../components/movimientos/TransactionCard'

export function DashboardPage() {
  const { fondos, saldoTotal, ultimosMovimientos, loading, error, refetch } = useDashboard()

  if (loading) return <Spinner label="Cargando dashboard..." />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />

  return (
    <div className="flex flex-col gap-5 pb-6">
      <GreetingCard />
      <QuoteCard />
      <BalanceCard saldoTotal={saldoTotal} />

      <div className="flex flex-col gap-4">
        {fondos.map((fondo) => (
          <FundCard key={fondo.id} fondo={fondo} />
        ))}
      </div>

      <TransferCard />

      <div>
        <h2 className="mb-3 text-base font-semibold text-ink">Movimientos recientes</h2>
        {ultimosMovimientos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3">
            {ultimosMovimientos.map((mov) => (
              <TransactionCard key={mov.id} movimiento={mov} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
