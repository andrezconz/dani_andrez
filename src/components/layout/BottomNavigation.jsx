import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

const SIDE_LINKS_LEFT = [{ to: '/', label: 'Inicio', icon: '🏠', end: true }]

const SIDE_LINKS_RIGHT = [
  { to: '/movimientos', label: 'Movimientos', icon: '📋' },
  { to: '/reportes', label: 'Reportes', icon: '📊' },
]

const AJUSTES_LINK = { to: '/ajustes', label: 'Ajustes', icon: '⚙️' }

function NavItem({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        clsx(
          'flex flex-1 flex-col items-center gap-0.5 rounded-app px-2 py-1.5 text-[11px] font-medium transition-colors duration-[250ms]',
          isActive ? 'text-sage' : 'text-ink-muted hover:text-ink',
        )
      }
    >
      <span className="text-xl leading-none">{icon}</span>
      {label}
    </NavLink>
  )
}

export function BottomNavigation() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 mx-auto flex w-full max-w-md items-end justify-between gap-1 border-t border-border bg-card/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-soft backdrop-blur"
      aria-label="Navegación principal"
    >
      {SIDE_LINKS_LEFT.map((link) => (
        <NavItem key={link.to} {...link} />
      ))}

      <NavLink
        to="/registrar"
        className="flex flex-1 flex-col items-center gap-1"
        aria-label="Registrar movimiento"
      >
        {({ isActive }) => (
          <>
            <span
              className={clsx(
                '-mt-6 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white shadow-soft',
                'transition-transform duration-[250ms] active:scale-95',
                isActive ? 'bg-sage/90' : 'bg-sage',
              )}
            >
              ➕
            </span>
            <span className={clsx('text-[11px] font-medium', isActive ? 'text-sage' : 'text-ink-muted')}>
              Registrar
            </span>
          </>
        )}
      </NavLink>

      {SIDE_LINKS_RIGHT.map((link) => (
        <NavItem key={link.to} {...link} />
      ))}

      <NavItem {...AJUSTES_LINK} />
    </nav>
  )
}
