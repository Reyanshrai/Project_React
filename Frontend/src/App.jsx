import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Registration from './pages/registerPage'
import Login from './pages/loginPage'
import ForgotPassword from './pages/ForgotPssword'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Registration></Registration>}></Route>
        <Route path='/ForgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>

      </Routes>
    </>
  )
}

export default App