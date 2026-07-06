import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { Spinner } from '../components/ui/Spinner'

// Tras un deploy, el index.html viejo puede apuntar a chunks que ya no
// existen (el build nuevo los renombra). En vez de mostrar el error de
// React Router, recargamos una sola vez para traer el index.html actual.
const RELOAD_FLAG = 'chunk-reload-attempted'

function lazyWithReload(importer) {
  return lazy(async () => {
    try {
      return await importer()
    } catch (error) {
      if (sessionStorage.getItem(RELOAD_FLAG)) {
        sessionStorage.removeItem(RELOAD_FLAG)
        throw error
      }
      sessionStorage.setItem(RELOAD_FLAG, '1')
      window.location.reload()
      return new Promise(() => {})
    }
  })
}

const DashboardPage = lazyWithReload(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const RegistrarPage = lazyWithReload(() =>
  import('../pages/RegistrarPage').then((m) => ({ default: m.RegistrarPage })),
)
const MovimientosPage = lazyWithReload(() =>
  import('../pages/MovimientosPage').then((m) => ({ default: m.MovimientosPage })),
)
const ReportesPage = lazyWithReload(() =>
  import('../pages/ReportesPage').then((m) => ({ default: m.ReportesPage })),
)
const AjustesPage = lazyWithReload(() =>
  import('../pages/AjustesPage').then((m) => ({ default: m.AjustesPage })),
)

function withSuspense(element) {
  return <Suspense fallback={<Spinner />}>{element}</Suspense>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(<DashboardPage />) },
      { path: 'registrar', element: withSuspense(<RegistrarPage />) },
      { path: 'movimientos', element: withSuspense(<MovimientosPage />) },
      { path: 'reportes', element: withSuspense(<ReportesPage />) },
      { path: 'ajustes', element: withSuspense(<AjustesPage />) },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
