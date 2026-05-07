import { useNavigate } from 'react-router-dom'
import { departments, studentStatuses } from '../data/mockData'
import { useStudentForm } from '../hooks/useStudentForm'

export default function AddStudentPage() {
  const navigate = useNavigate()
  const { form, update, saving, saved, error, handleSave } = useStudentForm()

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
          <h1 className="text-h2 text-on-surface font-semibold">Add Student Record</h1>
          <p className="text-body-md text-on-surface-variant">Create a new student profile in the system.</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-h3 text-on-surface font-semibold mb-5 pb-4 border-b border-outline-variant">
          Personal Information
        </h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className="block text-label-md text-on-surface mb-1.5">Full Legal Name *</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              placeholder="e.g. Julianne Marie Davis"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-label-md text-on-surface mb-1.5">Student ID</label>
            <input
              type="text"
              value={form.studentId}
              onChange={(e) => update('studentId', e.target.value)}
              placeholder="e.g. STU-2026-00142"
              className="input-field"
            />
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
            <label className="block text-label-md text-on-surface mb-1.5">Institutional Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="student@university.edu"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-label-md text-on-surface mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-label-md text-on-surface mb-1.5">Enrollment Date</label>
            <input
              type="date"
              value={form.enrollmentDate}
              onChange={(e) => update('enrollmentDate', e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-label-md text-on-surface mb-1.5">Status</label>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              className="input-field"
            >
              {studentStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-5 border-t border-outline-variant flex items-center gap-3">
          {saved ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded px-4 py-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
              <span className="text-body-md text-emerald-700 font-medium">Record saved!</span>
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
    </div>
  )
}
