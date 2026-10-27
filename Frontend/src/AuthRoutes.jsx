import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './feature/auth/pages/Login'
import Register from './feature/auth/pages/Register'
import Protected from './feature/auth/components/Protected'
import Home from './feature/home/Home'
const AuthRoutes = () => {
  return (
    <Routes>

        <Route path='/' element={<Protected><Home/></Protected>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default AuthRoutes

