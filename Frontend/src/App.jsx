import React from 'react'
import FaceDetection from './feature/FaceDetect/pages/FaceDetection'
import AuthRoutes from './AuthRoutes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './feature/auth/auth.context'
import './shared/global.scss'
const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
  <AuthRoutes/>
  </BrowserRouter>
  </AuthProvider>
  )
}

export default App