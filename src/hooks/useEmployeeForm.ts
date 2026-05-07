import { useState } from 'react'
import { supabase } from '../lib/supabase'

export interface EmployeeFormData {
  fullName: string
  employeeId: string
  role: string
  department: string
  dateOfJoining: string
  photo: File | null
}

const initial: EmployeeFormData = {
  fullName: '',
  employeeId: '',
  role: '',
  department: '',
  dateOfJoining: '',
  photo: null,
}

export function useEmployeeForm() {
  const [form, setForm] = useState<EmployeeFormData>(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function update(field: keyof EmployeeFormData, value: string | File | null) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave(onSuccess: () => void) {
    if (!form.fullName || !form.role || !form.department) {
      setError('Full name, role, and department are required.')
      return
    }
    setError('')
    setSaving(true)

    const { error: dbError } = await supabase.from('employees').insert({
      full_name: form.fullName,
      employee_id: form.employeeId || null,
      role: form.role,
      department: form.department,
      date_of_joining: form.dateOfJoining || null,
    })

    setSaving(false)

    if (dbError) {
      setError(dbError.message)
      return
    }

    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setForm(initial)
      onSuccess()
    }, 1200)
  }

  return { form, update, saving, saved, error, handleSave }
}
