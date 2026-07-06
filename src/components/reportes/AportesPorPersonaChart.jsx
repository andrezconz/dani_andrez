import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from './ChartCard'
import { formatCurrency } from '../../utils/formatters'

export function AportesPorPersonaChart({ data }) {
  return (
    <ChartCard title="🤍 Aportes por persona" subtitle="Últimos meses">
      <div className="h-56 w-full">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ left: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} tick={{ fontSize: 10 }} />
            <YAxis type="category" dataKey="persona" width={90} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="valor" fill="#7D9D7C" radius={[0, 8, 8, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
