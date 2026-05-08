import { useEmployeesMirror } from '../hooks/useEmployeesMirror'

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

export default function EmployeesMirrorPage() {
  const { rows, loading } = useEmployeesMirror()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-h1 text-on-surface font-bold">Employees Mirror</h1>
            <span className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-purple-700 text-caption font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Kafka Synced
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant">
            Read-only mirror of the employees table. Synced via Upstash Kafka — any change to the original table propagates here automatically.
          </p>
        </div>
        <div className="card bg-surface-container-low text-right min-w-[180px]">
          <p className="text-caption text-on-surface-variant mb-1">Total Mirrored</p>
          {loading ? (
            <div className="h-8 w-12 bg-surface-container animate-pulse rounded ml-auto" />
          ) : (
            <p className="text-h2 text-on-surface font-bold">{rows.length}</p>
          )}
        </div>
      </div>

      {/* Kafka flow diagram */}
      <div className="card bg-surface-container-low mb-6">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {[
            { icon: 'table', label: 'employees', sub: 'Source table' },
            { icon: 'arrow_forward', label: '', sub: '' },
            { icon: 'webhook', label: 'DB Webhook', sub: 'Supabase trigger' },
            { icon: 'arrow_forward', label: '', sub: '' },
            { icon: 'send', label: 'kafka-producer', sub: 'Edge Function' },
            { icon: 'arrow_forward', label: '', sub: '' },
            { icon: 'hub', label: 'Upstash Kafka', sub: 'employee-changes topic' },
            { icon: 'arrow_forward', label: '', sub: '' },
            { icon: 'download', label: 'kafka-consumer', sub: 'Edge Function' },
            { icon: 'arrow_forward', label: '', sub: '' },
            { icon: 'content_copy', label: 'employees_mirror', sub: 'Mirror table' },
          ].map((step, i) =>
            step.label === '' ? (
              <span key={i} className="material-symbols-outlined text-outline text-lg">arrow_forward</span>
            ) : (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-base">{step.icon}</span>
                </div>
                <p className="text-caption font-medium text-on-surface text-center leading-tight">{step.label}</p>
                <p className="text-[10px] text-on-surface-variant text-center leading-tight">{step.sub}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mirror table */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-h3 text-on-surface font-semibold">Mirrored Records</h2>
          <div className="flex items-center gap-1.5 text-caption text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live via Supabase Realtime
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-surface-container animate-pulse rounded" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-outline mb-3">hub</span>
            <p className="text-body-md text-on-surface-variant font-medium">No mirrored records yet</p>
            <p className="text-caption text-on-surface-variant mt-1 max-w-sm">
              Add an employee from the Add Employee page. The Kafka pipeline will sync it here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant">
                  {['Employee', 'Role', 'Department', 'Joined', 'Synced At'].map((h) => (
                    <th key={h} className="text-left text-caption font-semibold text-on-surface-variant uppercase tracking-wide pb-3 pr-6">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {rows.map((emp) => (
                  <tr key={emp.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 pr-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-semibold flex-shrink-0">
                          {initials(emp.full_name)}
                        </div>
                        <div>
                          <p className="text-body-md font-medium text-on-surface">{emp.full_name}</p>
                          <p className="text-caption text-on-surface-variant">{emp.employee_id ?? '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-6 text-body-md text-on-surface">{emp.role ?? '—'}</td>
                    <td className="py-3 pr-6 text-body-md text-on-surface">{emp.department ?? '—'}</td>
                    <td className="py-3 pr-6 text-body-md text-on-surface">{formatDate(emp.date_of_joining)}</td>
                    <td className="py-3 pr-6">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span className="text-caption text-on-surface-variant">{formatTime(emp.synced_at)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
