import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardHeader } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { CHART_COLORS } from '../../constants'
import { formatCurrency } from '../../utils/formatters'

export function GastosPorCategoriaChart({ data }) {
  return (
    <Card>
      <CardHeader title="Gastos por categoría" subtitle="Mes actual" />
      {data.length === 0 ? (
        <EmptyState title="Sin gastos este mes" />
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="valor"
                nameKey="categoria"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.categoria} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
