import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Admindashboard from './pages/Admindashboard'
import Userdashboard from './pages/Userdashboard'
import Recruiterdashboard from './pages/Recruiterdashboard'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/admindashboard' element={ <Admindashboard/> } />
        <Route path='/userdashboard' element={ <Userdashboard/> } />
        <Route path='/recruiterdashboard' element={ <Recruiterdashboard/> } />
      </Routes>
    </>
  )
}

export default App