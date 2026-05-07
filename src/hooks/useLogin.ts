import { useState } from 'react'

const TEST_EMAIL = 'admin@university.edu'
const TEST_PASSWORD = 'admin123'

export function useLogin() {
  const [email, setEmail] = useState(TEST_EMAIL)
  const [password, setPassword] = useState(TEST_PASSWORD)
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(onSuccess: () => void) {
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    if (email !== TEST_EMAIL || password !== TEST_PASSWORD) {
      setError('Invalid credentials. Use the test account shown below.')
      return
    }
    onSuccess()
  }

  return { email, setEmail, password, setPassword, showPassword, setShowPassword, remember, setRemember, error, handleSubmit }
}
