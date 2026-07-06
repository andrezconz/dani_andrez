import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from './ChartCard'
import { getFondoDisplay, CHART_COLORS } from '../../constants'
import { formatCurrency } from '../../utils/formatters'

export function EvolucionFondosChart({ data, fondos }) {
  return (
    <ChartCard title="🌱 Movimiento neto por fondo" subtitle="Aportes menos gastos, por mes">
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(value) => formatCurrency(value)} width={80} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {fondos.map((fondo, index) => (
              <Line
                key={fondo.id}
                type="monotone"
                dataKey={getFondoDisplay(fondo).nombre}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={2.5}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
