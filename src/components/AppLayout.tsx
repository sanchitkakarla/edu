import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-nav-width min-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
