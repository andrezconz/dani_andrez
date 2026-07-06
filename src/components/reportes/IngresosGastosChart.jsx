import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from './ChartCard'
import { formatCurrency } from '../../utils/formatters'

export function IngresosGastosChart({ data }) {
  return (
    <ChartCard title="📊 Ingresos vs. gastos" subtitle="Últimos meses">
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(value) => formatCurrency(value)} width={80} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="ingresos" name="Ingresos" fill="#81C784" radius={[8, 8, 0, 0]} />
            <Bar dataKey="gastos" name="Gastos" fill="#FFB74D" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
