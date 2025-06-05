import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Reset from './pages/Reset'

function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to='/login' />
}


function App() {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signUp') {
        navigate('./home', { replace: false })
      }
    }
  }, [navigate, location])



  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute >} />
      </Routes>
    </>
  )
}

export default App
