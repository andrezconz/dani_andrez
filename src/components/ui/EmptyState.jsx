function DefaultIllustration() {
  return (
    <svg viewBox="0 0 120 100" className="h-24 w-28 text-sage/40" fill="none" aria-hidden="true">
      <ellipse cx="60" cy="88" rx="42" ry="6" fill="currentColor" opacity="0.2" />
      <rect x="24" y="34" width="72" height="48" rx="12" fill="currentColor" opacity="0.25" />
      <path d="M24 46 L60 20 L96 46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="60" cy="58" r="10" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export function EmptyState({
  title = 'Todavía no hay movimientos registrados.',
  description = 'Comencemos con el primero ❤️',
  icon,
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-app border border-dashed border-border px-6 py-12 text-center">
      {icon ?? <DefaultIllustration />}
      <p className="font-medium text-ink">{title}</p>
      {description && <p className="text-sm text-ink-muted">{description}</p>}
    </div>
  )
}
