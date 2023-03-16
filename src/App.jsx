import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Input from './pages/Input.jsx'
import Question from './pages/Question.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error.jsx'
import Logout from './components/Logout.jsx'
import UserPage from './pages/UserPage.jsx'

export default function App() {

  return (
        <BrowserRouter>
          <AuthProvider>
            <Routes>
                <Route path='/' element={<Input />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path='/question' element={<Question />} /> 
                <Route path='/user' element={<UserPage />} /> 
                <Route path="*" element={<Error />} />
            </Routes> 
          </AuthProvider>
        </BrowserRouter>
  )
  
}

