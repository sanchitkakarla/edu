import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface DashboardStats {
  totalStudents: number
  totalEmployees: number
  activeCourses: number
}

export interface ActivityItem {
  id: string
  full_name: string
  department: string
  created_at: string
  type: 'Student' | 'Employee'
  role?: string
}

export interface Alert {
  id: string
  type: 'warning' | 'info'
  title: string
  body: string
  created_at: string
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ totalStudents: 0, totalEmployees: 0, activeCourses: 0 })
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchAll() {
    const [studentsRes, employeesRes, coursesRes, recentStudents, recentEmployees, alertsRes] = await Promise.all([
      supabase.from('students').select('id', { count: 'exact', head: true }),
      supabase.from('employees').select('id', { count: 'exact', head: true }),
      supabase.from('courses').select('id', { count: 'exact', head: true }).eq('active', true),
      supabase.from('students').select('id, full_name, department, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('employees').select('id, full_name, department, role, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('alerts').select('*').order('created_at', { ascending: false }).limit(5),
    ])

    setStats({
      totalStudents: studentsRes.count ?? 0,
      totalEmployees: employeesRes.count ?? 0,
      activeCourses: coursesRes.count ?? 0,
    })

    // Merge students + employees, sort by newest first, cap at 8
    const combined: ActivityItem[] = [
      ...(recentStudents.data ?? []).map((s) => ({ ...s, type: 'Student' as const })),
      ...(recentEmployees.data ?? []).map((e) => ({ ...e, type: 'Employee' as const })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8)

    setActivity(combined)
    setAlerts(alertsRes.data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchAll()

    const channel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employees' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, fetchAll)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return { stats, activity, alerts, loading }
}
