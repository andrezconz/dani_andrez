import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardHeader } from '../ui/Card'
import { CHART_COLORS } from '../../constants'
import { formatCurrency } from '../../utils/formatters'

export function EvolucionFondosChart({ data, fondos }) {
  return (
    <Card>
      <CardHeader title="Movimiento neto por fondo" subtitle="Aportes menos gastos, por mes" />
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
            <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(value) => formatCurrency(value)} width={90} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            {fondos.map((fondo, index) => (
              <Line
                key={fondo.id}
                type="monotone"
                dataKey={fondo.nombre}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
