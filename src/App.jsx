import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Todolist from './components/Todolist'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard/:username' element={<Dashboard/>}/>
      <Route path='/profile/:username' element={<Profile/>}/>
      <Route path='/todolist' element={<Todolist/>}/>
     
    </Routes>
    </BrowserRouter>
  )
}

export default App
