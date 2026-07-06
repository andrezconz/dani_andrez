import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { AportesPage } from '../pages/AportesPage'
import { GastosPage } from '../pages/GastosPage'
import { MovimientosPage } from '../pages/MovimientosPage'
import { ReportesPage } from '../pages/ReportesPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'aportes', element: <AportesPage /> },
      { path: 'gastos', element: <GastosPage /> },
      { path: 'movimientos', element: <MovimientosPage /> },
      { path: 'reportes', element: <ReportesPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
