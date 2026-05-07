import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/add-student', icon: 'person_add', label: 'Add Student' },
  { to: '/add-employee', icon: 'badge', label: 'Add Employee' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="fixed left-0 top-0 h-full w-nav-width bg-navy flex flex-col z-30">
      <div
        className="px-6 py-5 border-b border-white/10 cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white text-2xl">school</span>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">EduManage</p>
            <p className="text-white/50 text-xs">Academic Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'nav-item-active' : 'nav-item'
            }
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-semibold">
            AD
          </div>
          <div>
            <p className="text-white text-xs font-medium">Admin User</p>
            <p className="text-white/50 text-xs">admin@university.edu</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
