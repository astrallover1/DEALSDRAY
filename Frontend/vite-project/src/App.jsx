import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Create from './Create'
import Employee from './Employee'
 import UpdateEmployee from './UpdateEmployee'


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<Create/>} />
      {/* <Route path="/emp" element={<Employee/>} /> */}
      <Route path="/employ" element={<Employee/>} />
        <Route path="/updateEmployee/:id" element={<UpdateEmployee />} /> 
     

    </Routes>
   
    
    
    </>
  )
}

export default App