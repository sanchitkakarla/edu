import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AddStudentPage from './pages/AddStudentPage'
import AddEmployeePage from './pages/AddEmployeePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="/add-employee" element={<AddEmployeePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
