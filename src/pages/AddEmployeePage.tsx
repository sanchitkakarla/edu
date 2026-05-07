import { useNavigate } from 'react-router-dom'
import { departments, employeeRoles } from '../data/mockData'
import { useEmployeeForm } from '../hooks/useEmployeeForm'

export default function AddEmployeePage() {
  const navigate = useNavigate()
  const { form, update, saving, saved, error, handleSave } = useEmployeeForm()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-9 h-9 rounded flex items-center justify-center hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
        </button>
        <div>
          <h1 className="text-h2 text-on-surface font-semibold">Add Employee Record</h1>
          <p className="text-body-md text-on-surface-variant">Register a new faculty or staff member.</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="card">
          <h2 className="text-h3 text-on-surface font-semibold mb-5 pb-4 border-b border-outline-variant">
            Personal Details
          </h2>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <label className="block text-label-md text-on-surface mb-1.5">Full Name *</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="e.g. Dr. Eleanor Vance"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-1.5">Employee ID</label>
              <input
                type="text"
                value={form.employeeId}
                onChange={(e) => update('employeeId', e.target.value)}
                placeholder="e.g. EMP-2026-0087"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-1.5">Role *</label>
              <select
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                className="input-field"
              >
                <option value="">Select role…</option>
                {employeeRoles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-1.5">Department *</label>
              <select
                value={form.department}
                onChange={(e) => update('department', e.target.value)}
                className="input-field"
              >
                <option value="">Select department…</option>
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-label-md text-on-surface mb-1.5">Date of Joining</label>
              <input
                type="date"
                value={form.dateOfJoining}
                onChange={(e) => update('dateOfJoining', e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-5 border-t border-outline-variant flex items-center gap-3">
            {saved ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded px-4 py-2.5">
                <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                <span className="text-body-md text-emerald-700 font-medium">Employee added!</span>
              </div>
            ) : (
              <button
                onClick={() => handleSave(() => navigate('/dashboard'))}
                disabled={saving}
                className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-lg">{saving ? 'hourglass_top' : 'save'}</span>
                {saving ? 'Saving…' : 'Save Record'}
              </button>
            )}
            <button onClick={() => navigate('/dashboard')} className="btn-secondary flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">close</span>
              Cancel
            </button>
            {error && (
              <p className="text-caption text-error ml-2">{error}</p>
            )}
          </div>
        </div>

        {/* Record Integrity notice */}
        <div className="card bg-surface-container-low border-l-4 border-l-navy">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-navy text-xl mt-0.5">policy</span>
            <div>
              <p className="text-label-md text-on-surface font-semibold mb-1">Record Integrity</p>
              <p className="text-body-md text-on-surface-variant">
                Accurate identification numbers and department assignments are required per HR policies.
                Incorrect entries must be corrected within 48 hours of submission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
