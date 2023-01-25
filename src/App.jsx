import React from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Input from './pages/input.jsx'
import Question from './pages/question.jsx'

export default function App() {

  return (
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Input />} />
              <Route path='/question' element={<Question />} /> 
          </Routes> 
        </BrowserRouter>
  )
  
}

