import { formatCurrency } from '../../utils/formatters'

export function BalanceCard({ saldoTotal }) {
  return (
    <div className="rounded-app bg-sage p-6 text-white shadow-soft">
      <p className="text-sm font-medium text-white/80">💰 Patrimonio Familiar</p>
      <p className="mt-2 text-4xl font-bold tracking-tight">{formatCurrency(saldoTotal)}</p>
      <p className="mt-2 text-xs text-white/70">Actualizado en tiempo real</p>
    </div>
  )
}
