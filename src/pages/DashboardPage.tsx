import { useNavigate } from 'react-router-dom'
import { useDashboard } from '../hooks/useDashboard'

const typeColors: Record<string, string> = {
  Student: 'bg-blue-50 text-blue-700 border-blue-200',
  Employee: 'bg-purple-50 text-purple-700 border-purple-200',
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { stats, activity, alerts, loading } = useDashboard()

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents.toLocaleString(), icon: 'school' },
    { label: 'Faculty & Staff', value: stats.totalEmployees.toLocaleString(), icon: 'groups' },
    { label: 'Active Courses', value: stats.activeCourses.toLocaleString(), icon: 'menu_book' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h1 text-on-surface font-bold">Dashboard</h1>
          <p className="text-body-md text-on-surface-variant mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live — updates in real time
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/add-student')} className="btn-secondary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">person_add</span>
            Add Student
          </button>
          <button onClick={() => navigate('/add-employee')} className="btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">badge</span>
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-caption text-on-surface-variant uppercase tracking-wide font-medium mb-2">
                  {s.label}
                </p>
                {loading ? (
                  <div className="h-10 w-20 bg-surface-container animate-pulse rounded mb-1" />
                ) : (
                  <p className="text-h1 text-on-surface font-bold">{s.value}</p>
                )}
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-navy">{s.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-h3 text-on-surface font-semibold">Recent Activity</h2>
            <div className="flex gap-2">
              <button onClick={() => navigate('/add-student')} className="text-caption text-navy font-medium hover:underline">
                + Student
              </button>
              <span className="text-outline-variant">·</span>
              <button onClick={() => navigate('/add-employee')} className="text-caption text-navy font-medium hover:underline">
                + Employee
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-surface-container animate-pulse rounded" />
              ))}
            </div>
          ) : activity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="material-symbols-outlined text-4xl text-outline mb-3">group_add</span>
              <p className="text-body-md text-on-surface-variant">No records yet.</p>
              <p className="text-caption text-on-surface-variant mt-1">Add a student or employee to get started.</p>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant">
              {activity.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      {initials(item.full_name)}
                    </div>
                    <div>
                      <p className="text-body-md font-medium text-on-surface">{item.full_name}</p>
                      <p className="text-caption text-on-surface-variant">
                        {item.type === 'Employee' && item.role ? `${item.role} · ` : ''}{item.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-caption text-on-surface-variant">{formatDate(item.created_at)}</span>
                    <span className={`text-caption px-2.5 py-0.5 rounded-full border font-medium ${typeColors[item.type]}`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="card">
          <h2 className="text-h3 text-on-surface font-semibold mb-5">Alerts</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-20 bg-surface-container animate-pulse rounded" />
              ))}
            </div>
          ) : alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span className="material-symbols-outlined text-3xl text-outline mb-2">check_circle</span>
              <p className="text-body-md text-on-surface-variant">No alerts right now.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {alerts.map((a) => (
                <div key={a.id} className={`rounded-lg p-4 border ${a.type === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="flex items-start gap-2 mb-1">
                    <span className={`material-symbols-outlined text-base mt-0.5 ${a.type === 'warning' ? 'text-amber-600' : 'text-blue-600'}`}>
                      {a.type === 'warning' ? 'warning' : 'info'}
                    </span>
                    <p className={`text-label-md font-semibold ${a.type === 'warning' ? 'text-amber-800' : 'text-blue-800'}`}>
                      {a.title}
                    </p>
                  </div>
                  <p className={`text-caption pl-6 ${a.type === 'warning' ? 'text-amber-700' : 'text-blue-700'}`}>
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
