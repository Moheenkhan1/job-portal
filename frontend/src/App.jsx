import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Admindashboard from './pages/Admindashboard'
import StudentDashboard from './pages/StudentDashboard'
import Recruiterdashboard from './pages/Recruiterdashboard'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login/> } />
        <Route path='/register' element={ <Register/> } />

        <Route
          path="/studentdashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiterdashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <Recruiterdashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admindashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App