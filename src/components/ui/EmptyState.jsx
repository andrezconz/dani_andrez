export function EmptyState({ title = 'Sin datos', description, icon }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
      {icon}
      <p className="font-medium text-slate-700 dark:text-slate-300">{title}</p>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
  )
}
