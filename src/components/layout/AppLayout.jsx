import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { BottomNavigation } from './BottomNavigation'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="relative mx-auto min-h-screen w-full max-w-md bg-bg pb-28 sm:shadow-soft">
        <Header />
        <main className="px-5">
          <Outlet />
        </main>
        <BottomNavigation />
      </div>
    </div>
  )
}
