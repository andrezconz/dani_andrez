import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { Spinner } from '../components/ui/Spinner'

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const RegistrarPage = lazy(() =>
  import('../pages/RegistrarPage').then((m) => ({ default: m.RegistrarPage })),
)
const MovimientosPage = lazy(() =>
  import('../pages/MovimientosPage').then((m) => ({ default: m.MovimientosPage })),
)
const ReportesPage = lazy(() =>
  import('../pages/ReportesPage').then((m) => ({ default: m.ReportesPage })),
)
const AjustesPage = lazy(() =>
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
