import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { TIPO_FONDO_COLOR, TIPO_FONDO_LABEL } from '../../constants'
import { formatCurrency } from '../../utils/formatters'
import { MetaProgress } from './MetaProgress'

export function FondoCard({ fondo }) {
  const colores = TIPO_FONDO_COLOR[fondo.tipo] ?? TIPO_FONDO_COLOR.otro

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{fondo.nombre}</p>
          <p className={`mt-1 text-2xl font-semibold ${colores.text}`}>
            {formatCurrency(fondo.saldo)}
          </p>
        </div>
        <Badge className={colores.chip}>{TIPO_FONDO_LABEL[fondo.tipo] ?? fondo.tipo}</Badge>
      </div>
      <MetaProgress saldo={fondo.saldo} meta={fondo.meta} colorClass={colores.bar} />
    </Card>
  )
}
