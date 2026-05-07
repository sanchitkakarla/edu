import { useNavigate } from 'react-router-dom'
import { features, benefits } from '../data/mockData'

export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav */}
      <header className="border-b border-outline-variant bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-navy text-2xl">school</span>
            <span className="font-semibold text-navy text-h3">EduManage</span>
          </div>
          <nav className="flex items-center gap-6">
            <span className="text-body-md text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors">
              University Portal
            </span>
            <span className="text-body-md text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors">
              Support
            </span>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary"
            >
              Admin Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center bg-gradient-to-br from-navy via-[#1e2d45] to-[#2a3f5f] py-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 items-center w-full">
          <div>
            <span className="inline-flex items-center gap-2 text-white/60 text-caption font-medium uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-white/40" />
              Academic Administration
            </span>
            <h1 className="text-h1 text-white font-bold leading-tight mb-5">
              The modern platform for campus management
            </h1>
            <p className="text-body-lg text-white/70 mb-8 max-w-lg">
              Streamline admissions, faculty records, and course management with a
              secure, intuitive administration suite built for universities.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-navy font-semibold px-7 py-3 rounded hover:bg-white/90 transition-colors"
              >
                Get Started
              </button>
              <button className="border border-white/30 text-white px-7 py-3 rounded hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
            {/* Uptime badge */}
            <div className="mt-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/60 text-caption">99.9% system uptime — all services operational</span>
            </div>
          </div>

          {/* Stats card */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '12,842', label: 'Students Enrolled' },
              { value: '845', label: 'Faculty & Staff' },
              { value: '312', label: 'Active Courses' },
              { value: '99.9%', label: 'System Uptime' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 border border-white/10 rounded-lg p-5">
                <p className="text-h2 text-white font-bold">{s.value}</p>
                <p className="text-white/60 text-caption mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-on-surface font-semibold mb-2">
              Everything you need to run a campus
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Purpose-built tools for academic administration teams.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-navy">{f.icon}</span>
                </div>
                <h3 className="text-h3 text-on-surface font-semibold mb-2">{f.title}</h3>
                <p className="text-body-md text-on-surface-variant">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits bar */}
      <section className="py-10 px-8 bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-6xl mx-auto flex justify-around">
          {benefits.map((b) => (
            <div key={b.label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">{b.icon}</span>
              </div>
              <div>
                <p className="text-body-md font-medium text-on-surface">{b.label}</p>
                <p className="text-caption text-on-surface-variant">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 bg-white border-t border-outline-variant">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-caption text-on-surface-variant">© 2026 EduManage. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Documentation'].map((l) => (
              <span key={l} className="text-caption text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors">
                {l}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
