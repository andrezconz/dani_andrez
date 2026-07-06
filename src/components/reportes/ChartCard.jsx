export function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-app border border-border bg-card p-5 shadow-soft">
      <p className="font-semibold text-ink">{title}</p>
      {subtitle && <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  )
}
