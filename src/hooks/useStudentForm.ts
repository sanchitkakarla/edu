import { useState } from 'react'
import { supabase } from '../lib/supabase'

export interface StudentFormData {
  fullName: string
  studentId: string
  department: string
  email: string
  enrollmentDate: string
  phone: string
  status: string
  photo: File | null
  transcript: File | null
  idDoc: File | null
}

const initial: StudentFormData = {
  fullName: '',
  studentId: '',
  department: '',
  email: '',
  enrollmentDate: '',
  phone: '',
  status: 'Active',
  photo: null,
  transcript: null,
  idDoc: null,
}

export function useStudentForm() {
  const [form, setForm] = useState<StudentFormData>(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function update(field: keyof StudentFormData, value: string | File | null) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave(onSuccess: () => void) {
    if (!form.fullName || !form.department) {
      setError('Full name and department are required.')
      return
    }
    setError('')
    setSaving(true)

    const { error: dbError } = await supabase.from('students').insert({
      full_name: form.fullName,
      student_id: form.studentId || null,
      department: form.department,
      email: form.email || null,
      phone: form.phone || null,
      enrollment_date: form.enrollmentDate || null,
      status: form.status,
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
