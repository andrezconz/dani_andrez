import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ChartCard } from './ChartCard'
import { EmptyState } from '../ui/EmptyState'
import { CHART_COLORS } from '../../constants'
import { formatCurrency } from '../../utils/formatters'

export function GastosPorCategoriaChart({ data }) {
  return (
    <ChartCard title="🏡 Gastos por categoría" subtitle="Mes actual">
      {data.length === 0 ? (
        <EmptyState title="Sin gastos este mes" description="" />
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="valor"
                nameKey="categoria"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.categoria} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  )
}
