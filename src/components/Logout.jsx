import React from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  function clearData() {
    setAuth('')
    localStorage.removeItem('refreshToken')
    navigate('/')
  }
  return (
    <div onClick={clearData} style={{cursor:"pointer"}}>Logout</div>
  )
}

export default Logout