import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Input from './pages/input.jsx'
import Question from './pages/question.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import Register from './components/Register';
import Login from './components/Login';
import Error from './pages/error.jsx'

export default function App() {

  return (
        <BrowserRouter>
          <AuthProvider>
            <Routes>
                <Route path='/' element={<Input />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/question' element={<Question />} /> 
                <Route path="*" element={<Error />} />
            </Routes> 
          </AuthProvider>
        </BrowserRouter>
  )
  
}

