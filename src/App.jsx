import React from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Input from './pages/input.jsx'

export default function App() {

  return (
        <BrowserRouter>
          <Routes> 
            <Route path='/' element={<Input />}>
            </Route>
          </Routes> 
        </BrowserRouter>
  )
  
}

