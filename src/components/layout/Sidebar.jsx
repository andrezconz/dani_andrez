import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

const LINKS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/aportes', label: 'Aportes' },
  { to: '/gastos', label: 'Gastos' },
  { to: '/movimientos', label: 'Movimientos' },
  { to: '/reportes', label: 'Reportes' },
]

export function Sidebar({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            clsx(
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
