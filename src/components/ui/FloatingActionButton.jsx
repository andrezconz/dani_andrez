import { Link } from 'react-router-dom'
import clsx from 'clsx'

export function FloatingActionButton({ to, onClick, icon = '➕', label, className }) {
  const classes = clsx(
    'fixed bottom-24 right-5 z-30 flex h-14 items-center gap-2 rounded-full bg-sage px-5 text-white shadow-soft',
    'transition-transform duration-[250ms] active:scale-95',
    className,
  )

  const content = (
    <>
      <span className="text-xl leading-none">{icon}</span>
      {label && <span className="text-sm font-semibold">{label}</span>}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={label || 'Acción rápida'}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={label || 'Acción rápida'}>
      {content}
    </button>
  )
}
