import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export interface MirrorEmployee {
  id: string
  full_name: string
  employee_id: string | null
  role: string | null
  department: string | null
  date_of_joining: string | null
  created_at: string
  synced_at: string
}

export function useEmployeesMirror() {
  const [rows, setRows] = useState<MirrorEmployee[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchRows() {
    const { data } = await supabase
      .from('employees_mirror')
      .select('*')
      .order('synced_at', { ascending: false })
    setRows(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchRows()

    const channel = supabase
      .channel('mirror-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employees_mirror' }, fetchRows)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return { rows, loading }
}
