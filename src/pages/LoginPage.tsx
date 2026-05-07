import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

export default function LoginPage() {
  const navigate = useNavigate()
  const { email, setEmail, password, setPassword, showPassword, setShowPassword, remember, setRemember, error, handleSubmit } = useLogin()

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-navy flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-white text-3xl">school</span>
          <div>
            <p className="text-white font-semibold text-lg leading-tight">EduManage</p>
            <p className="text-white/50 text-xs">Academic Administration Portal</p>
          </div>
        </div>

        <div>
          <h1 className="text-h1 text-white font-bold leading-tight mb-4">
            Manage your campus smarter.
          </h1>
          <p className="text-body-lg text-white/60 max-w-sm">
            One secure platform for student records, faculty management, and academic operations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '12,842', label: 'Students' },
            { value: '845', label: 'Faculty & Staff' },
            { value: '312', label: 'Active Courses' },
            { value: '99.9%', label: 'Uptime' },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-lg p-4">
              <p className="text-white font-bold text-h3">{s.value}</p>
              <p className="text-white/50 text-caption">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="material-symbols-outlined text-navy text-2xl">school</span>
            <span className="font-semibold text-navy text-h3">EduManage</span>
          </div>

          <div className="mb-8">
            <h2 className="text-h2 text-on-surface font-semibold mb-1">Welcome back</h2>
            <p className="text-body-md text-on-surface-variant">Sign in to your admin account</p>
          </div>

          {/* Test credentials hint */}
          <div className="mb-6 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded px-4 py-3">
            <span className="material-symbols-outlined text-blue-500 text-lg mt-0.5">key</span>
            <div>
              <p className="text-label-md text-blue-800 font-semibold mb-1">Test Account</p>
              <p className="text-caption text-blue-700">Email: <span className="font-mono font-semibold">admin@university.edu</span></p>
              <p className="text-caption text-blue-700">Password: <span className="font-mono font-semibold">admin123</span></p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(() => navigate('/dashboard'))
            }}
            className="space-y-5"
          >
            {error && (
              <div className="flex items-center gap-2 bg-error-container border border-error/30 rounded px-4 py-3">
                <span className="material-symbols-outlined text-error text-sm">error</span>
                <p className="text-body-md text-on-error-container">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-label-md text-on-surface mb-1.5">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@university.edu"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-label-md text-on-surface">Password</label>
                <span className="text-caption text-navy cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-outline-variant accent-navy"
              />
              <label htmlFor="remember" className="text-body-md text-on-surface-variant cursor-pointer">
                Remember this device for 30 days
              </label>
            </div>

            <button type="submit" className="btn-primary w-full text-center justify-center flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">login</span>
              Sign In
            </button>
          </form>

          {/* Security footer */}
          <div className="mt-8 pt-6 border-t border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant text-base">shield</span>
              <span className="text-caption text-on-surface-variant">AES-256 Encryption</span>
            </div>
            <span className="text-caption text-on-surface-variant">v4.2.1-stable</span>
          </div>
          <p className="text-caption text-on-surface-variant mt-3 text-center">
            Having trouble?{' '}
            <span className="text-navy cursor-pointer hover:underline">Contact IT Helpdesk</span>
          </p>
        </div>
      </div>
    </div>
  )
}
