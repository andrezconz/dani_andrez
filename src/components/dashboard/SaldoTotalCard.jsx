import { Card } from '../ui/Card'
import { formatCurrency } from '../../utils/formatters'

export function SaldoTotalCard({ saldoTotal }) {
  return (
    <Card className="bg-indigo-600 text-white dark:bg-indigo-700">
      <p className="text-sm text-indigo-100">Saldo total de la pareja</p>
      <p className="mt-1 text-3xl font-bold">{formatCurrency(saldoTotal)}</p>
    </Card>
  )
}
