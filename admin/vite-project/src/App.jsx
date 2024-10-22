import React from 'react'
import NavBar from './components/navBar/NavBar'
import SideBar from './components/sideBar/SideBar'
import Add from './pages/add/Add'
import Order from './pages/order/Order'
import List from './pages/list/list'
import { Routes,Route } from 'react-router-dom'


export default function App() {
  return (
    <div className=''>
      <NavBar/>
      <hr/>
      <div className='app-content'>
        <SideBar />
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Order/>}/>
        </Routes>
      </div>
      
    </div>
  )
}
